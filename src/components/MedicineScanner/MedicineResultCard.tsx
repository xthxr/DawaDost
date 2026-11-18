"use client";

import React, { useState } from "react";
import {
  Pill,
  AlertTriangle,
  ShieldCheck,
  Activity,
  FileText,
  AlertOctagon,
  HelpCircle,
  Stethoscope,
  Info,
  RefreshCw,
  Building2,
  CheckCircle2,
  Camera,
  Search,
  Sparkles
} from "lucide-react";
import { MedicineAnalysisResult } from "@/lib/types";

interface MedicineResultCardProps {
  result: MedicineAnalysisResult;
  userIllness?: string;
  onReset: () => void;
  onRetryWithName?: (medicineName: string) => void;
}

export function MedicineResultCard({
  result,
  userIllness,
  onReset,
  onRetryWithName
}: MedicineResultCardProps) {
  const [manualName, setManualName] = useState("");

  const confidenceColorMap = {
    High: "bg-teal-50 text-teal-700 border-teal-200",
    Medium: "bg-amber-50 text-amber-700 border-amber-200",
    Low: "bg-orange-50 text-orange-700 border-orange-200",
    Uncertain: "bg-rose-50 text-rose-700 border-rose-200"
  };

  // If the medicine could not be identified from the image:
  if (!result.identified) {
    return (
      <div className="bg-white rounded-2xl border-2 border-rose-200 p-6 sm:p-8 shadow-xs animate-in fade-in duration-300">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-100">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 mb-2">
            Could Not Read Packaging Text
          </span>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Medicine Not Identified
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            {result.confidenceExplanation ||
              "The uploaded image was too blurry, dimly lit, or obstructed to reliably read the medicine name and active salts."}
          </p>

          {/* Photography Tips for Blister Strips */}
          <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs text-slate-700 space-y-2">
            <span className="font-bold text-slate-800 block text-xs uppercase tracking-wider">
              Tips for a clearer scan:
            </span>
            <div className="flex items-start space-x-2">
              <span className="text-teal-600 font-bold">•</span>
              <span><strong>Avoid foil glare:</strong> Angle the blister strip slightly away from direct overhead lamps or camera flash.</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-teal-600 font-bold">•</span>
              <span><strong>Flat surface:</strong> Lay the strip or bottle flat and hold the camera steady about 6-8 inches away.</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-teal-600 font-bold">•</span>
              <span><strong>Focus on text:</strong> Ensure the brand name, salt name, and strength (e.g. 500mg, 10mg) are sharp and legible.</span>
            </div>
          </div>

          {/* Manual Fallback Input */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-500 mb-2">
              Can you read the name on the strip or bottle? Type it to view verified details:
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (manualName.trim() && onRetryWithName) {
                  onRetryWithName(manualName.trim());
                }
              }}
              className="flex gap-2 max-w-md mx-auto"
            >
              <input
                type="text"
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                placeholder="e.g. Dolo 650, Augmentin, Cetzine, Pantocid..."
                className="flex-1 rounded-xl border border-slate-300 px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
              <button
                type="submit"
                disabled={!manualName.trim()}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-semibold rounded-xl transition-colors shrink-0"
              >
                Look Up
              </button>
            </form>
          </div>

          {/* Retake Button */}
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-colors"
            >
              <Camera className="w-4 h-4" />
              <span>Retake or Upload Another Photo</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STANDARD SUCCESSFUL IDENTIFICATION VIEW
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Confidence Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                confidenceColorMap[result.confidence] || confidenceColorMap.High
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              Identification Confidence: {result.confidence}
            </span>
            {result.isAiGenerated ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-sky-50 text-sky-700 border border-sky-200">
                AI Vision Processed
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-teal-50 text-teal-700 border border-teal-200">
                OCR &amp; Verified Database
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-2 max-w-2xl">
            {result.confidenceExplanation ||
              "Verified against clinical monographs and packaging typography."}
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Scan Another Medicine</span>
        </button>
      </div>

      {/* Grid of Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CARD 1: Medicine Identity */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-teal-700 text-sm font-semibold mb-3">
              <Pill className="w-4 h-4" />
              <span>Identified Medicine Details</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {result.brandName || "Identified Formulation"}
            </h2>
            <p className="text-sm font-medium text-teal-700 mt-1">
              Generic: {result.genericName}
            </p>

            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Active Ingredients &amp; Strength:
                </span>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {result.activeIngredients?.map((ing, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-2.5 py-1 rounded-lg bg-teal-50 text-teal-900 text-xs font-medium border border-teal-100"
                    >
                      {ing.name} {ing.strength ? `(${ing.strength})` : ""}
                    </span>
                  ))}
                </div>
              </div>

              {result.manufacturer && (
                <div className="flex items-center space-x-1.5 text-xs text-slate-600 pt-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Manufacturer / Packager: {result.manufacturer}</span>
                </div>
              )}
            </div>
          </div>

          {/* Detected Packaging Info */}
          {result.packagingDetailsDetected && (
            <div className="mt-5 bg-slate-50 rounded-xl p-3 border border-slate-200/80 text-xs text-slate-600">
              <div className="font-semibold text-slate-700 mb-1 flex items-center space-x-1">
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>Detected Packaging Text</span>
              </div>
              <p>
                {result.packagingDetailsDetected.visibleStrength ||
                  result.packagingDetailsDetected.visibleInstructions ||
                  "Standard pharmaceutical labeling verified."}
              </p>
              {result.packagingDetailsDetected.rawTextDetected && (
                <div className="mt-1.5 pt-1.5 border-t border-slate-200/60 text-[11px] text-slate-400 truncate">
                  OCR: &quot;{result.packagingDetailsDetected.rawTextDetected}&quot;
                </div>
              )}
            </div>
          )}
        </div>

        {/* CARD 2: What It Is Used For */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-sky-700 text-sm font-semibold mb-3">
              <Activity className="w-4 h-4" />
              <span>Therapeutic Use &amp; Indications</span>
            </div>

            <div className="inline-block px-2.5 py-1 rounded-md bg-sky-50 text-sky-800 text-xs font-semibold border border-sky-100 mb-3">
              Class: {result.whatItIsUsedFor?.therapeuticClass || "Pharmaceutical"}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {result.whatItIsUsedFor?.description}
            </p>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Approved Clinical Uses:
              </span>
              <ul className="mt-2 space-y-1.5">
                {result.whatItIsUsedFor?.primaryIndications?.map((ind, i) => (
                  <li
                    key={i}
                    className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Illness Correlation (if user provided their illness) */}
          {userIllness && result.whatItIsUsedFor?.illnessCorrelation && (
            <div className="mt-5 bg-sky-50/70 border border-sky-200/80 rounded-xl p-3.5 text-xs text-sky-900">
              <div className="font-semibold flex items-center space-x-1 mb-1">
                <Stethoscope className="w-3.5 h-3.5 text-sky-700" />
                <span>Correlation with your illness (&quot;{userIllness}&quot;):</span>
              </div>
              <p className="text-slate-700">
                {result.whatItIsUsedFor.illnessCorrelation.notes}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CARD 3: Dosage Information (STRICT VERIFICATION) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-slate-900 font-semibold text-sm sm:text-base">
            <FileText className="w-4 h-4 text-teal-600" />
            <span>Dosage &amp; Administration Policy</span>
          </div>
          <span className="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md border border-slate-200">
            Verified Instruction Check
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Packaging / Prescription Notice:
            </h4>
            {result.dosageInformation?.verifiedInstructionsFromPackagingOrPrescription ? (
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                {result.dosageInformation.verifiedInstructionsFromPackagingOrPrescription}
              </p>
            ) : (
              <p className="text-xs text-slate-600 italic">
                No specific dosage instructions are legibly visible on the packaging image. Dosage
                must be determined exclusively by a licensed healthcare provider.
              </p>
            )}
          </div>

          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
              <span>Strict Non-Invented Dosage Rule</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              {result.dosageInformation?.safetyDosageNotice ||
                "DawaDost does not invent, calculate, or alter dosage instructions. Dosage strictly requires a medical prescription tailored to your age, organ function, and diagnosis."}
            </p>
          </div>
        </div>
      </div>

      {/* CARD 4: Side Effects (Separated into Common vs Serious vs Urgent) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center space-x-2 text-slate-900 font-semibold text-sm sm:text-base mb-4">
          <AlertOctagon className="w-4 h-4 text-amber-600" />
          <span>Side Effects Profile</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Common & Mild */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-slate-200 text-slate-800 uppercase tracking-wider mb-2">
              Common &amp; Mild
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700 mt-1">
              {result.sideEffects?.common?.map((se, i) => (
                <li key={i} className="flex items-start space-x-1.5">
                  <span className="text-slate-400 font-bold">•</span>
                  <span>{se}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Serious Side Effects */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-amber-200 text-amber-900 uppercase tracking-wider mb-2">
              Serious Side Effects
            </span>
            <ul className="space-y-1.5 text-xs text-amber-900 mt-1">
              {result.sideEffects?.serious?.map((se, i) => (
                <li key={i} className="flex items-start space-x-1.5">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{se}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Immediate Medical Attention */}
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-rose-200 text-rose-900 uppercase tracking-wider mb-2">
              Emergency Attention Signs
            </span>
            <ul className="space-y-1.5 text-xs text-rose-900 mt-1">
              {result.sideEffects?.immediateMedicalAttentionRequired?.map((se, i) => (
                <li key={i} className="flex items-start space-x-1.5 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span>{se}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CARD 5: Precautions, Warnings & Doctor Consultation */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center space-x-1.5">
              <Info className="w-3.5 h-3.5 text-teal-600" />
              <span>Precautions &amp; Critical Warnings</span>
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
              {result.precautionsAndWarnings?.map((warn, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>{warn}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center space-x-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-sky-600" />
              <span>When to Consult Your Doctor</span>
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
              {result.whenToConsultDoctor?.map((item, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-sky-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200/80 text-[11px] text-slate-500 text-center">
          {result.disclaimer ||
            "Medical Disclaimer: DawaDost is for patient information and educational verification. Always follow the advice of a licensed healthcare professional."}
        </div>
      </div>
    </div>
  );
}
