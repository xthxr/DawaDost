"use client";

import React from "react";
import {
  Stethoscope,
  Eye,
  AlertTriangle,
  ShieldAlert,
  HelpCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  PhoneCall,
  Activity,
  HeartPulse
} from "lucide-react";
import { IllnessAnalysisResult } from "@/lib/types";

interface IllnessResultCardProps {
  result: IllnessAnalysisResult;
  userDescription?: string;
  onReset: () => void;
}

export function IllnessResultCard({
  result,
  userDescription,
  onReset
}: IllnessResultCardProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Disclaimer & Non-Diagnostic Badge */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <ShieldAlert className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-amber-950 text-sm sm:text-base">
                  Non-Diagnostic Educational Overview
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-200 text-amber-900">
                  Strict Medical Safeguard
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed">
                {result.uncertaintyDisclaimer ||
                  "Photographs cannot replace physical clinical examinations. This visual summary is provided solely to help you discuss your symptoms intelligently with a certified physician. No medication is prescribed."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 transition-colors shrink-0 shadow-2xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
            <span>Upload Another Photo</span>
          </button>
        </div>
      </div>

      {/* Primary Observations & General Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CARD 1: Visual Observations */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-teal-700 text-sm font-semibold mb-3">
              <Eye className="w-4 h-4" />
              <span>Visual Image Observations</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              {result.concernIdentified}
            </h3>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Observable Image Features:
              </span>
              <ul className="mt-2 space-y-2">
                {result.visualObservations?.map((obs, i) => (
                  <li
                    key={i}
                    className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-2" />
                    <span>{obs}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 bg-slate-50 rounded-xl p-3 border border-slate-200/80 text-[11px] text-slate-500">
            Note: Lighting, angle, skin tone, and camera resolution can alter appearance. In-person palpation and dermatoscopy are necessary for definitive assessment.
          </div>
        </div>

        {/* CARD 2: Educational Explanation */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-sky-700 text-sm font-semibold mb-3">
              <HeartPulse className="w-4 h-4" />
              <span>Educational Understanding</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {result.generalEducationalExplanation}
            </p>

            {userDescription && (
              <div className="mt-4 pt-3 border-t border-slate-100 bg-sky-50/50 p-3 rounded-xl border border-sky-100 text-xs text-slate-700">
                <span className="font-semibold text-sky-900">Your Reported Concern:</span>{" "}
                &quot;{userDescription}&quot;
              </div>
            )}
          </div>

          <div className="mt-5 flex items-center space-x-2 text-xs text-teal-800 font-medium bg-teal-50/60 p-2.5 rounded-xl border border-teal-100">
            <Activity className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Educational guidance only • Zero algorithmic prescribing</span>
          </div>
        </div>
      </div>

      {/* CARD 3: Potential Categories to Discuss with a Doctor (NOT DIAGNOSES) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center space-x-2 text-slate-900 font-semibold text-sm sm:text-base">
            <Stethoscope className="w-4 h-4 text-teal-600" />
            <span>Potential General Categories to Discuss With Your Doctor</span>
          </div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 w-fit">
            Topics for Medical Evaluation
          </span>
        </div>

        <p className="text-xs text-slate-500 mb-4">
          The following common categories share visual similarities with your photo. They are listed to help you ask informed questions during your doctor visit, not as confirmed conditions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {result.potentialCategoriesToDiscussWithDoctor?.map((cat, i) => (
            <div
              key={i}
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between"
            >
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center space-x-1.5">
                  <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  <span>{cat.name}</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {cat.overview}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200/80 text-[11px] text-teal-800 bg-teal-50/50 p-2 rounded-lg">
                <span className="font-semibold">Why considered:</span> {cat.whyConsidered}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CARD 4: General Care & Things to Avoid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Safe General Comfort Measures */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center space-x-2 text-teal-700 font-semibold text-sm sm:text-base mb-3">
            <CheckCircle className="w-4 h-4 text-teal-600" />
            <span>Safe Supportive Comfort Measures</span>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            Gentle non-medicinal practices to protect the area while awaiting clinical assessment:
          </p>
          <ul className="space-y-2">
            {result.nonPrescriptionGeneralCare?.map((care, i) => (
              <li
                key={i}
                className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700"
              >
                <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span>{care}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Things to Avoid */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center space-x-2 text-rose-700 font-semibold text-sm sm:text-base mb-3">
            <XCircle className="w-4 h-4 text-rose-600" />
            <span>Actions &amp; Substances to Avoid</span>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            Avoid actions that could trigger secondary infection, irritation, or scarring:
          </p>
          <ul className="space-y-2">
            {result.thingsToAvoid?.map((avoid, i) => (
              <li
                key={i}
                className="flex items-start space-x-2 text-xs sm:text-sm text-rose-900"
              >
                <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>{avoid}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CARD 5: Red Flag Symptoms (EMERGENCY ALERTS) */}
      <div className="bg-rose-50/90 border-2 border-rose-300 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center space-x-2.5 text-rose-900 font-bold text-base mb-2">
          <AlertTriangle className="w-5 h-5 text-rose-600" />
          <span>Red Flag Symptoms — Seek Immediate Medical Care</span>
        </div>
        <p className="text-xs sm:text-sm text-rose-900/90 mb-4">
          If you or the affected person experience any of the following signs, do not wait. Visit an urgent care clinic or emergency room immediately:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {result.redFlagSymptoms?.map((sym, i) => (
            <div
              key={i}
              className="bg-white/80 border border-rose-200 rounded-xl p-3 flex items-start space-x-2 text-xs sm:text-sm text-rose-950 font-medium"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
              <span>{sym}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-rose-200 flex items-center justify-between text-xs text-rose-900">
          <span>In acute medical emergencies (chest tightness, throat closure, severe bleeding):</span>
          <span className="font-bold bg-rose-600 text-white px-2.5 py-1 rounded-md">
            Call 112 / 911 / 108
          </span>
        </div>
      </div>

      {/* CARD 6: Questions to Ask Your Doctor */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center space-x-2 text-slate-900 font-semibold text-sm sm:text-base mb-3">
          <HelpCircle className="w-4 h-4 text-sky-600" />
          <span>Prepared Questions for Your Doctor</span>
        </div>
        <p className="text-xs text-slate-500 mb-3">
          Take these helpful prompts with you when meeting your physician or dermatologist:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {result.questionsToAskDoctor?.map((q, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800 flex items-start space-x-2"
            >
              <span className="text-sky-600 font-bold">{i + 1}.</span>
              <span>{q}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
