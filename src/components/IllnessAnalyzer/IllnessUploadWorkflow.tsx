"use client";

import React, { useState } from "react";
import { Dropzone } from "@/components/UI/Dropzone";
import { IllnessResultCard } from "./IllnessResultCard";
import { IllnessAnalysisResult } from "@/lib/types";
import { SAMPLE_ILLNESSES } from "@/lib/sampleData";
import { Stethoscope, Search, Loader2, AlertCircle, ShieldAlert, Clock, FileEdit } from "lucide-react";

interface IllnessUploadWorkflowProps {
  apiKey?: string;
}

export function IllnessUploadWorkflow({ apiKey }: IllnessUploadWorkflowProps) {
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<IllnessAnalysisResult | null>(null);

  const sampleOptions = SAMPLE_ILLNESSES.map((s) => ({
    id: s.id,
    label: s.title,
    dataUri: s.imageDataUri,
    description: s.duration
  }));

  const handleSampleSelect = (sample: { id: string; label: string; dataUri: string; description?: string }) => {
    setImage(sample.dataUri);
    const matched = SAMPLE_ILLNESSES.find((s) => s.id === sample.id);
    if (matched) {
      setDescription(matched.description);
      setDuration(matched.duration);
    }
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!image) {
      setError("Please choose or capture a photo of the health concern (rash, irritation, bite, or minor injury).");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/analyze-illness", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "x-gemini-api-key": apiKey } : {})
        },
        body: JSON.stringify({
          image,
          illnessDescription: description.trim() || undefined,
          duration: duration.trim() || undefined,
          apiKey
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to analyze photo. Please try again with a clearer image.");
      }

      setResult(data.data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred while analyzing the image.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setDescription("");
    setDuration("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="w-full">
      {result ? (
        <IllnessResultCard
          result={result}
          userDescription={description}
          onReset={handleReset}
        />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-2.5 text-teal-700 mb-1">
              <Stethoscope className="w-5 h-5 text-teal-600" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Upload Health Concern or Symptom Photo
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Get simple, educational explanations of your visible skin rash, insect bite, minor cut, or eye irritation — without definitive AI diagnosis or medication prescribing.
            </p>
          </div>

          {/* Non-diagnostic Alert */}
          <div className="mb-6 rounded-xl bg-amber-50/80 border border-amber-200 p-3.5 flex items-start space-x-2.5 text-xs text-amber-900">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-950">Safety Standard:</span> Photographs cannot replace clinical examination. DawaDost provides educational discussion points for your doctor visit.
            </div>
          </div>

          {/* Error Alert */}
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
                1. Upload Health Concern Photo <span className="text-rose-500">*</span>
              </label>
              <Dropzone
                label="Click to upload symptom photo or drag and drop"
                sublabel="Capture the affected skin, rash, insect bite, minor abrasion, or eye area in natural lighting"
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

            {/* Step 2: Description & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label
                  htmlFor="illness-desc"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1"
                >
                  <FileEdit className="w-3.5 h-3.5 text-teal-600" />
                  <span>2. Describe What You Are Feeling</span>
                </label>
                <input
                  id="illness-desc"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Itchy red bumps, burning sensation, mild swelling..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all bg-slate-50/50 hover:bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="illness-dur"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1"
                >
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  <span>Duration</span>
                </label>
                <input
                  id="illness-dur"
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 2 days, since morning"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all bg-slate-50/50 hover:bg-white"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleAnalyze}
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
                    <span>Analyzing Visual Presentation &amp; Preparing Educational Guide...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Get Educational Explanation &amp; Doctor Questions</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
