export type ConfidenceLevel = "High" | "Medium" | "Low" | "Uncertain";

export interface ActiveIngredient {
  name: string;
  strength: string;
}

export interface MedicineAnalysisResult {
  identified: boolean;
  confidence: ConfidenceLevel;
  confidenceExplanation: string;
  brandName: string;
  genericName: string;
  activeIngredients: ActiveIngredient[];
  manufacturer?: string;
  packagingDetailsDetected: {
    visibleStrength?: string;
    visibleBatchExpiry?: string;
    visibleInstructions?: string;
    rawTextDetected?: string;
  };
  whatItIsUsedFor: {
    primaryIndications: string[];
    therapeuticClass: string;
    description: string;
    illnessCorrelation?: {
      matchesUserIllness: boolean | "uncertain";
      notes: string;
    };
  };
  sideEffects: {
    common: string[];
    serious: string[];
    immediateMedicalAttentionRequired: string[];
  };
  dosageInformation: {
    verifiedInstructionsFromPackagingOrPrescription: string | null;
    safetyDosageNotice: string;
    disclaimer: string;
  };
  precautionsAndWarnings: string[];
  whenToConsultDoctor: string[];
  disclaimer: string;
  isAiGenerated?: boolean;
}

export interface IllnessPotentialCategory {
  name: string;
  overview: string;
  whyConsidered: string;
}

export interface IllnessAnalysisResult {
  concernIdentified: string;
  confidence: ConfidenceLevel;
  visualObservations: string[];
  generalEducationalExplanation: string;
  potentialCategoriesToDiscussWithDoctor: IllnessPotentialCategory[];
  nonPrescriptionGeneralCare: string[];
  thingsToAvoid: string[];
  redFlagSymptoms: string[];
  questionsToAskDoctor: string[];
  uncertaintyDisclaimer: string;
  isAiGenerated?: boolean;
}

export interface ScanMedicineRequest {
  image: string; // base64 or data URL
  illness?: string;
  apiKey?: string;
}

export interface AnalyzeIllnessRequest {
  image: string; // base64 or data URL
  illnessDescription?: string;
  duration?: string;
  apiKey?: string;
}
