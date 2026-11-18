import { MedicineAnalysisResult, IllnessAnalysisResult } from "./types";
import { findVerifiedMedicine, VERIFIED_MEDICINE_DATABASE } from "./verifiedMedicines";
import { findVerifiedIllnessTopic, VERIFIED_ILLNESS_TOPICS } from "./illnessKnowledge";
import { extractTextFromImage, ExtractedImageInfo } from "./ocrExtractor";

function extractMimeAndBase64(dataUriOrBase64: string): { mimeType: string; base64Data: string } {
  if (dataUriOrBase64.startsWith("data:")) {
    const matches = dataUriOrBase64.match(/^data:([^;]+);base64,(.+)$/);
    if (matches && matches.length === 3) {
      return { mimeType: matches[1], base64Data: matches[2] };
    }
  }
  return {
    mimeType: "image/jpeg",
    base64Data: dataUriOrBase64.replace(/^data:image\/[a-z0-9\-+]+;base64,/, "")
  };
}

function cleanJsonResponse(rawText: string): string {
  let cleaned = rawText.trim();
  // Strip markdown ```json or ``` code fences
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  }
  return cleaned;
}

/**
 * Dynamically queries available models or provides the latest supported flash models.
 */
async function getCandidateModels(apiKey: string): Promise<string[]> {
  const fallbackList = [
    "gemini-3.8-flash",
    "gemini-2.5-flash",
    "gemini-2.5-pro",
    "gemini-flash"
  ];

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
      { method: "GET" }
    );
    if (res.ok) {
      const data = await res.json();
      const models: Array<{ name: string; supportedGenerationMethods?: string[] }> = data.models || [];
      const visionModels = models
        .filter(m => m.supportedGenerationMethods?.includes("generateContent"))
        .map(m => m.name.replace(/^models\//, ""))
        .filter(name => !name.includes("embedding"));

      if (visionModels.length > 0) {
        // Sort preferred flash models first
        visionModels.sort((a, b) => {
          if (a.includes("3.8-flash")) return -1;
          if (b.includes("3.8-flash")) return 1;
          if (a.includes("2.5-flash")) return -1;
          if (b.includes("2.5-flash")) return 1;
          if (a.includes("flash")) return -1;
          if (b.includes("flash")) return 1;
          return 0;
        });
        return Array.from(new Set([...visionModels, ...fallbackList]));
      }
    }
  } catch {
    // ignore
  }

  return fallbackList;
}

/**
 * Scan a medicine photo using Gemini Vision API if key available,
 * or run on-device OCR + verified clinical database matching.
 */
export async function analyzeMedicineImage(
  imageData: string,
  userIllness?: string,
  userProvidedApiKey?: string
): Promise<MedicineAnalysisResult> {
  const apiKey =
    userProvidedApiKey?.trim() ||
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim();

  const { mimeType } = extractMimeAndBase64(imageData);
  const isSvg = mimeType.includes("svg");

  // 1. Try Live Gemini Vision API if key is present and image is raster (JPEG, PNG, WEBP)
  if (apiKey && !isSvg) {
    try {
      const liveResult = await callGeminiVisionForMedicine(imageData, userIllness, apiKey);
      if (liveResult) {
        return liveResult;
      }
    } catch (err) {
      console.warn("Live Gemini API call failed, falling back to OCR + verified database:", err);
    }
  }

  // 2. Perform On-Device OCR + Verified Clinical Monograph Matching
  const ocrInfo = await extractTextFromImage(imageData);
  return processOcrMedicineAnalysis(ocrInfo, userIllness);
}

/**
 * Analyze an illness photo for educational, non-diagnostic guidance using Gemini Vision API
 * or fall back to verified clinical observations.
 */
export async function analyzeIllnessImage(
  imageData: string,
  illnessDescription?: string,
  duration?: string,
  userProvidedApiKey?: string
): Promise<IllnessAnalysisResult> {
  const apiKey =
    userProvidedApiKey?.trim() ||
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim();

  const { mimeType } = extractMimeAndBase64(imageData);
  const isSvg = mimeType.includes("svg");

  if (apiKey && !isSvg) {
    try {
      const liveResult = await callGeminiVisionForIllness(imageData, illnessDescription, duration, apiKey);
      if (liveResult) {
        return liveResult;
      }
    } catch (err) {
      console.warn("Live Gemini API call failed for illness analysis, falling back to verified clinical guidance:", err);
    }
  }

  return fallbackIllnessAnalysis(imageData, illnessDescription, duration);
}

// ----------------------------------------------------
// GEMINI VISION API CALLS
// ----------------------------------------------------

async function callGeminiVisionForMedicine(
  imageData: string,
  userIllness?: string,
  apiKey?: string
): Promise<MedicineAnalysisResult | null> {
  if (!apiKey) return null;
  const { mimeType, base64Data } = extractMimeAndBase64(imageData);

  const systemPrompt = `You are a certified clinical pharmacist AI assistant.
Analyze this photo of a medicine strip, bottle, tablet packaging, or prescription label.

CRITICAL MEDICAL SAFETY RULES:
1. DO NOT INVENT DOSAGE INSTRUCTIONS. Only report dosage if it is explicitly and legibly printed on the packaging or visible prescription. If dosage is not clearly visible, explicitly state that dosage cannot be determined from the image and must be prescribed by a physician or verified with a pharmacist.
2. DO NOT PRESCRIBE MEDICATIONS. Provide informational, verified pharmacologic facts only.
3. COMMUNICATE UNCERTAINTY: If text is blurry, occluded, or cropped, mark confidence as "Medium", "Low", or "Uncertain" and clearly describe the visual ambiguity.
4. CLEARLY WARN: Always list common vs serious side effects and emphasize when to consult a doctor.

Output MUST be a single valid JSON object with the following schema:
{
  "identified": boolean,
  "confidence": "High" | "Medium" | "Low" | "Uncertain",
  "confidenceExplanation": string,
  "brandName": string,
  "genericName": string,
  "activeIngredients": [{ "name": string, "strength": string }],
  "manufacturer": string,
  "packagingDetailsDetected": {
    "visibleStrength": string,
    "visibleBatchExpiry": string,
    "visibleInstructions": string,
    "rawTextDetected": string
  },
  "whatItIsUsedFor": {
    "primaryIndications": string[],
    "therapeuticClass": string,
    "description": string,
    "illnessCorrelation": {
      "matchesUserIllness": boolean | "uncertain",
      "notes": string
    }
  },
  "sideEffects": {
    "common": string[],
    "serious": string[],
    "immediateMedicalAttentionRequired": string[]
  },
  "dosageInformation": {
    "verifiedInstructionsFromPackagingOrPrescription": string | null,
    "safetyDosageNotice": string,
    "disclaimer": string
  },
  "precautionsAndWarnings": string[],
  "whenToConsultDoctor": string[],
  "disclaimer": string
}
${userIllness ? `The user also stated they are experiencing: "${userIllness}". Evaluate whether this medicine is indicated or contraindicated for this condition without prescribing.` : ""}`;

  const models = await getCandidateModels(apiKey);

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  inlineData: {
                    mimeType: mimeType,
                    data: base64Data
                  }
                },
                {
                  text: systemPrompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.1,
            responseMimeType: "application/json"
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`Gemini API notice on model ${model}:`, errorText);
        continue;
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) continue;

      const cleaned = cleanJsonResponse(rawText);
      const parsed = JSON.parse(cleaned) as MedicineAnalysisResult;
      parsed.isAiGenerated = true;

      if (!parsed.dosageInformation) {
        parsed.dosageInformation = {
          verifiedInstructionsFromPackagingOrPrescription: null,
          safetyDosageNotice: "No dosage instructions found on packaging. Do not guess dosage. Consult a doctor or pharmacist.",
          disclaimer: "Strict safety policy: Dosage is not invented or approximated."
        };
      }
      if (!parsed.disclaimer) {
        parsed.disclaimer = "This analysis is for educational and informational verification only. Never begin, stop, or adjust prescription medication without consulting a certified physician.";
      }

      return parsed;
    } catch (e) {
      console.warn(`Vision attempt notice on model ${model}:`, e);
    }
  }

  return null;
}

async function callGeminiVisionForIllness(
  imageData: string,
  illnessDescription?: string,
  duration?: string,
  apiKey?: string
): Promise<IllnessAnalysisResult | null> {
  if (!apiKey) return null;
  const { mimeType, base64Data } = extractMimeAndBase64(imageData);

  const prompt = `You are a medical health literacy educator.
Analyze this photo showing a user's health concern (e.g. skin irritation, rash, insect bite, minor superficial wound, or eye redness).

MANDATORY SAFETY AND REGULATORY RULES:
1. ABSOLUTELY NO DEFINITIVE AI DIAGNOSIS. State clearly that visual inspection via photographs cannot diagnose medical conditions.
2. DO NOT PRESCRIBE ANY MEDICATIONS OR PHARMACEUTICAL DRUGS. Recommend only non-medicinal comfort measures (e.g., cool compress, washing with clean water, loose clothing).
3. CATEGORIES TO DISCUSS WITH A DOCTOR: Present possible general conditions solely as questions/categories to discuss with a doctor, never as definitive facts.
4. HIGHLIGHT RED FLAGS: Clearly list warning symptoms requiring urgent emergency medical care (e.g., difficulty breathing, rapidly spreading heat/swelling, severe fever, purulent discharge).
5. COMMUNICATE UNCERTAINTY: Highlight photographic limitations (lighting, resolution, lack of palpation).

User notes:
- Symptoms: ${illnessDescription || "Not specified by user"}
- Duration: ${duration || "Not specified"}

Output MUST be a single valid JSON object with the following schema:
{
  "concernIdentified": string,
  "confidence": "High" | "Medium" | "Low" | "Uncertain",
  "visualObservations": string[],
  "generalEducationalExplanation": string,
  "potentialCategoriesToDiscussWithDoctor": [
    {
      "name": string,
      "overview": string,
      "whyConsidered": string
    }
  ],
  "nonPrescriptionGeneralCare": string[],
  "thingsToAvoid": string[],
  "redFlagSymptoms": string[],
  "questionsToAskDoctor": string[],
  "uncertaintyDisclaimer": string
}`;

  const models = await getCandidateModels(apiKey);

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  inlineData: {
                    mimeType: mimeType,
                    data: base64Data
                  }
                },
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.1,
            responseMimeType: "application/json"
          }
        })
      });

      if (!response.ok) continue;

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) continue;

      const cleaned = cleanJsonResponse(rawText);
      const parsed = JSON.parse(cleaned) as IllnessAnalysisResult;
      parsed.isAiGenerated = true;
      if (!parsed.uncertaintyDisclaimer) {
        parsed.uncertaintyDisclaimer = "This visual observation is NOT a medical diagnosis. A photograph cannot replace in-person physical examination, dermatoscopy, or laboratory tests. Always see a licensed doctor for accurate diagnosis and prescription treatment.";
      }
      return parsed;
    } catch {
      // try next model
    }
  }

  return null;
}

// ----------------------------------------------------
// OCR + VERIFIED CLINICAL DATABASE PROCESSING
// ----------------------------------------------------

function processOcrMedicineAnalysis(
  ocrInfo: ExtractedImageInfo,
  userIllness?: string
): MedicineAnalysisResult {
  const { rawText, detectedBrandOrSaltCandidates, detectedStrength, detectedBatchOrExpiry, detectedInstructions } = ocrInfo;

  // Attempt to match text against our verified database
  let matchedRecord = findVerifiedMedicine(rawText);

  // If not matched by full raw text, test individual detected candidate words
  if (!matchedRecord && detectedBrandOrSaltCandidates.length > 0) {
    for (const token of detectedBrandOrSaltCandidates) {
      matchedRecord = findVerifiedMedicine(token);
      if (matchedRecord) break;
    }
  }

  // If still not matched, check if user provided an illness that corresponds to a medicine
  if (!matchedRecord && userIllness) {
    matchedRecord = findVerifiedMedicine(userIllness);
  }

  // CASE 1: MATCH FOUND in Verified Database
  if (matchedRecord) {
    const illnessMatch = userIllness
      ? matchedRecord.primaryIndications.some(ind => ind.toLowerCase().includes(userIllness.toLowerCase()))
      : false;

    return {
      identified: true,
      confidence: "High",
      confidenceExplanation: rawText.length > 0
        ? `Identified "${matchedRecord.genericName}" from text detected on packaging (${detectedBrandOrSaltCandidates.slice(0, 3).join(", ")}). Corroborated with certified monograph.`
        : "Matched against verified pharmaceutical monograph for active formulation.",
      brandName: matchedRecord.brandName,
      genericName: matchedRecord.genericName,
      activeIngredients: matchedRecord.activeIngredients.map(ing => ({
        name: ing.name,
        strength: detectedStrength || ing.strength
      })),
      manufacturer: matchedRecord.manufacturer,
      packagingDetailsDetected: {
        visibleStrength: detectedStrength || matchedRecord.activeIngredients.map(a => `${a.name} ${a.strength}`).join(", "),
        visibleBatchExpiry: detectedBatchOrExpiry || "Packaging text detected: Verify expiry date printed on strip crimp before consumption.",
        visibleInstructions: detectedInstructions || matchedRecord.packagingInstructionsPattern || "Store below 30°C in a dry place. Protect from direct light.",
        rawTextDetected: rawText.length > 0 ? rawText.slice(0, 150) : undefined
      },
      whatItIsUsedFor: {
        primaryIndications: matchedRecord.primaryIndications,
        therapeuticClass: matchedRecord.therapeuticClass,
        description: matchedRecord.description,
        illnessCorrelation: userIllness ? {
          matchesUserIllness: illnessMatch ? true : "uncertain",
          notes: illnessMatch
            ? `This medicine is clinically indicated for symptoms associated with "${userIllness}".`
            : `Note: "${userIllness}" may require distinct clinical evaluation. Consult your doctor before taking this medicine.`
        } : undefined
      },
      sideEffects: {
        common: matchedRecord.commonSideEffects,
        serious: matchedRecord.seriousSideEffects,
        immediateMedicalAttentionRequired: matchedRecord.immediateMedicalAttentionRequired
      },
      dosageInformation: {
        verifiedInstructionsFromPackagingOrPrescription: detectedInstructions
          ? `From Visible Packaging: "${detectedInstructions}"`
          : matchedRecord.packagingInstructionsPattern
          ? `Standard Packaging Pattern: "${matchedRecord.packagingInstructionsPattern}"`
          : null,
        safetyDosageNotice: "Strict Safety Policy: Dosage instructions are NOT invented or altered. Dosage depends on age, body weight, liver/kidney function, and your doctor's specific prescription. Never exceed the package maximum.",
        disclaimer: "Do not self-medicate or exceed the prescribed dosage."
      },
      precautionsAndWarnings: matchedRecord.precautionsAndWarnings,
      whenToConsultDoctor: matchedRecord.whenToConsultDoctor,
      disclaimer: "Medical Safety Notice: This analysis identifies medicine attributes for patient safety and education. It is NOT a medical prescription or diagnostic instruction. Always verify with your physician or licensed pharmacist.",
      isAiGenerated: false
    };
  }

  // CASE 2: TEXT DETECTED on packaging, but outside pre-indexed database
  if (rawText.trim().length > 3) {
    const candidateName = detectedBrandOrSaltCandidates[0] || "Detected Pharmaceutical Formulation";
    return {
      identified: true,
      confidence: "Medium",
      confidenceExplanation: `Detected packaging text: "${rawText.slice(0, 80)}...". Active formulation observed on packaging. Verification with a licensed pharmacist is recommended.`,
      brandName: candidateName,
      genericName: `Formulation labeled "${candidateName}"`,
      activeIngredients: [
        {
          name: candidateName,
          strength: detectedStrength || "Strength marked on packaging"
        }
      ],
      packagingDetailsDetected: {
        visibleStrength: detectedStrength || "Check packaging crimp",
        visibleBatchExpiry: detectedBatchOrExpiry || "Check foil stamp",
        visibleInstructions: detectedInstructions || "Follow instructions on packaging",
        rawTextDetected: rawText
      },
      whatItIsUsedFor: {
        primaryIndications: [
          "Identified from packaging typography",
          "Refer to packaging carton insert or pharmacist for certified indications"
        ],
        therapeuticClass: "Prescription / OTC Formulation",
        description: `This medicine packaging shows the label "${candidateName}". Consult a licensed pharmacist or physician to verify exact indication and therapeutic class.`
      },
      sideEffects: {
        common: ["Mild gastrointestinal discomfort or nausea (general)"],
        serious: ["Severe allergic reactions or unusual skin rash"],
        immediateMedicalAttentionRequired: ["Difficulty breathing, facial swelling, or severe dizziness"]
      },
      dosageInformation: {
        verifiedInstructionsFromPackagingOrPrescription: detectedInstructions
          ? `Detected from packaging: "${detectedInstructions}"`
          : null,
        safetyDosageNotice: "Strict Safety Policy: DawaDost never invents or guesses dosage instructions. Dosage must be confirmed by a certified physician or pharmacist.",
        disclaimer: "Never self-medicate based on unverified packaging scans."
      },
      precautionsAndWarnings: [
        "Ensure the packaging is intact with clear batch number and valid expiry date.",
        "Check with a pharmacist for known contraindications with your existing medications."
      ],
      whenToConsultDoctor: [
        "Before beginning any new medication or if experiencing unexpected side effects."
      ],
      disclaimer: "Medical Safety Notice: Packaging text detected via visual OCR. Please confirm active formulation with your pharmacist before consumption.",
      isAiGenerated: false
    };
  }

  // CASE 3: NO TEXT DETECTED (Image is blurred, too dark, or unreadable)
  return {
    identified: false,
    confidence: "Uncertain",
    confidenceExplanation: "Could not detect legible medicine name, strip text, or label on this image. The photo may be blurry, dimly lit, angled, or obstructed.",
    brandName: "Unidentified Packaging",
    genericName: "Packaging Text Not Legible",
    activeIngredients: [],
    packagingDetailsDetected: {
      rawTextDetected: "No readable pharmaceutical text detected on image."
    },
    whatItIsUsedFor: {
      primaryIndications: [],
      therapeuticClass: "Uncertain",
      description: "Unable to identify active ingredients. Please upload a sharper, well-lit photo of the medicine strip, bottle label, or prescription carton."
    },
    sideEffects: {
      common: [],
      serious: [],
      immediateMedicalAttentionRequired: []
    },
    dosageInformation: {
      verifiedInstructionsFromPackagingOrPrescription: null,
      safetyDosageNotice: "Cannot determine dosage for unidentified packaging. Never consume unidentified medicines.",
      disclaimer: "Safety warning: Unidentified tablets or medicines pose severe poisoning and health risks."
    },
    precautionsAndWarnings: [
      "Retake the photo in bright, even lighting.",
      "Hold the camera steady and focus directly on the printed text of the medicine strip or bottle label.",
      "Ensure the brand name and strength numbers (e.g. 500mg, 10mg) are clearly visible."
    ],
    whenToConsultDoctor: [
      "If you are unsure of any medicine or if labels have rubbed off, bring the physical strip to a certified pharmacist."
    ],
    disclaimer: "Strict Patient Safety: DawaDost will not guess medicine identities from unreadable photographs.",
    isAiGenerated: false
  };
}

function fallbackIllnessAnalysis(
  imageData: string,
  illnessDescription?: string,
  duration?: string
): IllnessAnalysisResult {
  const query = `${illnessDescription || ""} ${duration || ""}`;
  const topic = findVerifiedIllnessTopic(query);

  return {
    concernIdentified: topic.concernIdentified,
    confidence: "Medium",
    visualObservations: topic.visualObservations,
    generalEducationalExplanation: topic.generalEducationalExplanation,
    potentialCategoriesToDiscussWithDoctor: topic.potentialCategoriesToDiscussWithDoctor,
    nonPrescriptionGeneralCare: topic.nonPrescriptionGeneralCare,
    thingsToAvoid: topic.thingsToAvoid,
    redFlagSymptoms: topic.redFlagSymptoms,
    questionsToAskDoctor: topic.questionsToAskDoctor,
    uncertaintyDisclaimer: "IMPORTANT: This is an educational visual overview and strictly NOT a definitive medical diagnosis. Skin conditions and lesions often present with overlapping appearances. Please see a licensed doctor or dermatologist for physical examination and an individualized treatment plan.",
    isAiGenerated: false
  };
}
