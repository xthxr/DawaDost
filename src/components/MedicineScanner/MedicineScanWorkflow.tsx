"use client";

import React, { useState } from "react";
import { Dropzone } from "@/components/UI/Dropzone";
import { MedicineResultCard } from "./MedicineResultCard";
import { MedicineAnalysisResult } from "@/lib/types";
import { SAMPLE_MEDICINES, SampleMedicineItem } from "@/lib/sampleData";
import { Pill, Search, Loader2, AlertCircle, FileText, Sparkles, HelpCircle } from "lucide-react";

interface MedicineScanWorkflowProps {
  apiKey?: string;
}

export function MedicineScanWorkflow({ apiKey }: MedicineScanWorkflowProps) {
  const [image, setImage] = useState<string | null>(null);
  const [userIllness, setUserIllness] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MedicineAnalysisResult | null>(null);

  const sampleOptions = SAMPLE_MEDICINES.map((s) => ({
    id: s.id,
    label: s.name,
    dataUri: s.imageDataUri,
    description: s.subtitle
  }));

  const handleSampleSelect = (sample: { id: string; label: string; dataUri: string; description?: string }) => {
    setImage(sample.dataUri);
    const matched = SAMPLE_MEDICINES.find((s) => s.id === sample.id);
    if (matched) {
      setUserIllness(matched.illnessSuggestion);
    }
    setError(null);
  };

  const handleScanMedicine = async (customQuery?: string) => {
    if (!image && !customQuery) {
      setError("Please choose or capture a photo of a medicine strip, bottle, or packaging.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const payloadImage = image || "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg==";
      const response = await fetch("/api/scan-medicine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "x-gemini-api-key": apiKey } : {})
        },
        body: JSON.stringify({
          image: payloadImage,
          illness: customQuery || userIllness.trim() || undefined,
          apiKey
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to scan medicine. Please try again with a clearer photo.");
      }

      setResult(data.data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred while analyzing the medicine.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setUserIllness("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="w-full">
      {result ? (
        <MedicineResultCard
          result={result}
          userIllness={userIllness}
          onReset={handleReset}
          onRetryWithName={(name) => handleScanMedicine(name)}
        />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-2.5 text-teal-700 mb-1">
              <Pill className="w-5 h-5 text-teal-600" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Scan Medicine Packaging or Prescription
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Upload a clear photo of your tablet strip, bottle label, carton box, or prescription to identify active ingredients, verified uses, and side effects.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-xl bg-rose-50 border border-rose-200 p-4 text-xs sm:text-sm text-rose-800 flex items-start space-x-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form Content */}
          <div className="space-y-6">
            {/* Step 1: Upload Photo */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. Upload Medicine Photo <span className="text-rose-500">*</span>
              </label>
              <Dropzone
                label="Click to upload medicine photo or drag and drop"
                sublabel="Ensure blister text, brand name, and strength numbers are visible in adequate lighting"
                image={image}
                onImageSelected={(data) => {
                  setImage(data);
                  setError(null);
                }}
                onClear={() => setImage(null)}
                sampleOptions={sampleOptions}
                onSampleSelect={handleSampleSelect}
              />
            </div>

            {/* Step 2: Enter Illness (Optional / Contextual) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="user-illness"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                >
                  2. Enter Your Illness or Symptom{" "}
                  <span className="text-slate-400 font-normal normal-case">(Optional)</span>
                </label>
                <span className="text-xs text-slate-400">e.g. fever, migraine, sore throat</span>
              </div>
              <div className="relative">
                <input
                  id="user-illness"
                  type="text"
                  value={userIllness}
                  onChange={(e) => setUserIllness(e.target.value)}
                  placeholder="Enter the illness or symptom you are looking to treat..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all bg-slate-50/50 hover:bg-white"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">
                Entering your illness allows the system to check whether this medicine is indicated for your symptoms.
              </p>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleScanMedicine()}
                disabled={isLoading || !image}
                className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center space-x-2 shadow-sm ${
                  isLoading || !image
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                    : "bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 text-white shadow-teal-600/20 active:scale-[0.99]"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Analyzing Packaging with AI Vision &amp; OCR...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Identify Medicine &amp; View Verified Info</span>
                  </>
                )}
              </button>
            </div>

            {/* Safety Guarantee Footnote */}
            <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 flex items-start space-x-2.5 text-xs text-slate-600">
              <FileText className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800">Verified Dosage &amp; Safety:</span>{" "}
                DawaDost extracts visible packaging instructions and cross-references certified monographs. It will never invent dosage or prescribe unverified medications.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
