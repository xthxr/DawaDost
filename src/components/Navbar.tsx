"use client";

import React from "react";
import { Pill, ShieldCheck, Key, Stethoscope, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenApiKeyModal: () => void;
  hasCustomKey: boolean;
}

export function Navbar({ onOpenApiKeyModal, hasCustomKey }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-sky-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <Pill className="w-6 h-6 rotate-45" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Dawa<span className="text-teal-600">Dost</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                  <ShieldCheck className="w-3 h-3 mr-1 text-teal-600" />
                  Verified Health AI
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Medicine Identification &amp; Educational Symptom Guidance
              </p>
            </div>
          </div>

          {/* Quick Badges & API Key trigger */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-sky-50 text-sky-800 text-xs font-medium border border-sky-100">
              <Stethoscope className="w-3.5 h-3.5 text-sky-600" />
              <span>Evidence-Based Information</span>
            </div>

            <button
              onClick={onOpenApiKeyModal}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                hasCustomKey
                  ? "bg-teal-100 text-teal-800 border border-teal-300"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
              }`}
              title="Configure Gemini Vision API Key (Optional)"
            >
              <Key className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">
                {hasCustomKey ? "Custom API Key Active" : "API Key Settings"}
              </span>
              <span className="sm:hidden">Key</span>
              {hasCustomKey && (
                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
