"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { MedicineScanWorkflow } from "@/components/MedicineScanner/MedicineScanWorkflow";
import { IllnessUploadWorkflow } from "@/components/IllnessAnalyzer/IllnessUploadWorkflow";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import {
  Pill,
  Stethoscope,
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  Clock,
  Heart
} from "lucide-react";

type ActiveTab = "scan-medicine" | "upload-illness";

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("scan-medicine");
  const [apiKey, setApiKey] = useState<string>("");
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Load persisted API key from sessionStorage if user saved one
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("dawadost_gemini_api_key");
      if (saved) {
        setApiKey(saved);
      }
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    if (typeof window !== "undefined") {
      if (key) {
        sessionStorage.setItem("dawadost_gemini_api_key", key);
      } else {
        sessionStorage.removeItem("dawadost_gemini_api_key");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      {/* Top Navigation */}
      <Navbar
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasCustomKey={!!apiKey}
      />

      {/* Mandatory Medical Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Hero & Intro */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-3">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Certified Safety Guardrails • Verified Clinical Information</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Simple, Safe &amp; Verified{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-sky-600">
              Healthcare AI
            </span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Identify medications from packaging photos, inspect verified uses and side effects, or upload photos of health concerns for simple, non-diagnostic educational explanations.
          </p>

          {/* Core Safeguards Bar */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-600">
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs font-medium text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 mr-1.5" />
              No Invented Dosages
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs font-medium text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 mr-1.5" />
              Non-Diagnostic Symptom Guide
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs font-medium text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 mr-1.5" />
              Zero Automated Prescribing
            </span>
          </div>
        </div>

        {/* TWO PROMINENT OPTIONS (DASHBOARD SWITCHER) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-8">
          {/* OPTION 1: Scan Medicine */}
          <button
            type="button"
            onClick={() => setActiveTab("scan-medicine")}
            className={`p-5 sm:p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden group shadow-xs ${
              activeTab === "scan-medicine"
                ? "bg-white border-teal-500 shadow-md ring-4 ring-teal-500/10"
                : "bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300"
            }`}
          >
            {activeTab === "scan-medicine" && (
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-teal-500 to-transparent opacity-20 pointer-events-none" />
            )}
            <div className="flex items-center space-x-3 mb-2">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  activeTab === "scan-medicine"
                    ? "bg-teal-600 text-white shadow-md shadow-teal-600/30"
                    : "bg-teal-50 text-teal-700 group-hover:bg-teal-100"
                }`}
              >
                <Pill className="w-6 h-6 rotate-45" />
              </div>
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
                  Option 1
                </span>
                <h3 className="text-lg font-bold text-slate-900">Scan Medicine</h3>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Upload photos of blister strips, medicine bottles, boxes, or prescriptions to identify active salts, indications, and side effects.
            </p>
            <div className="mt-3 flex items-center text-xs font-semibold text-teal-700">
              <span>{activeTab === "scan-medicine" ? "• Active Workflow" : "Click to Scan →"}</span>
            </div>
          </button>

          {/* OPTION 2: Upload Illness Photo */}
          <button
            type="button"
            onClick={() => setActiveTab("upload-illness")}
            className={`p-5 sm:p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden group shadow-xs ${
              activeTab === "upload-illness"
                ? "bg-white border-sky-500 shadow-md ring-4 ring-sky-500/10"
                : "bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300"
            }`}
          >
            {activeTab === "upload-illness" && (
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-sky-500 to-transparent opacity-20 pointer-events-none" />
            )}
            <div className="flex items-center space-x-3 mb-2">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  activeTab === "upload-illness"
                    ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                    : "bg-sky-50 text-sky-700 group-hover:bg-sky-100"
                }`}
              >
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-sky-700 uppercase tracking-wider block">
                  Option 2
                </span>
                <h3 className="text-lg font-bold text-slate-900">Upload Illness Photo</h3>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Upload photos of rashes, insect bites, minor skin abrasions, or eye irritation to receive educational, non-diagnostic guidance.
            </p>
            <div className="mt-3 flex items-center text-xs font-semibold text-sky-700">
              <span>{activeTab === "upload-illness" ? "• Active Workflow" : "Click to Upload →"}</span>
            </div>
          </button>
        </div>

        {/* ACTIVE WORKFLOW RENDER */}
        <div className="max-w-4xl mx-auto">
          {activeTab === "scan-medicine" ? (
            <MedicineScanWorkflow apiKey={apiKey} />
          ) : (
            <IllnessUploadWorkflow apiKey={apiKey} />
          )}
        </div>

        {/* Medical Safety Protocols & Helpline Banner */}
        <div className="max-w-4xl mx-auto mt-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-5">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  DawaDost Safety &amp; Ethics Principles
                </h4>
                <p className="text-xs text-slate-500">
                  Built to prioritize patient safety, medical truth, and responsible AI use.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl shrink-0">
              <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
              <span>National Emergency Hotline: 112 / 911 / 108</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs text-slate-600">
            <div>
              <span className="font-bold text-slate-800 block mb-1">
                1. No Invented Dosage Instructions
              </span>
              Dosage is strictly extracted from legible packaging or official monographs. We never invent or approximate doses.
            </div>
            <div>
              <span className="font-bold text-slate-800 block mb-1">
                2. Zero Photographic Prescriptions
              </span>
              We do not prescribe medications based on uploaded photos. Illness images are analyzed for educational discussion only.
            </div>
            <div>
              <span className="font-bold text-slate-800 block mb-1">
                3. Clear Communication of Uncertainty
              </span>
              Visual quality, blur, occlusions, and lighting limitations are always communicated transparently with recommended doctor follow-ups.
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center text-xs font-bold">
              +
            </div>
            <span className="font-semibold text-slate-800">DawaDost Healthcare Web App</span>
          </div>
          <p className="text-[11px] text-slate-400">
            For informational &amp; educational purposes only. Always consult a certified physician for medical treatment.
          </p>
          <div className="text-[11px] text-slate-400">
            Clean Healthcare UI • Next.js &amp; Tailwind CSS
          </div>
        </div>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />
    </div>
  );
}
