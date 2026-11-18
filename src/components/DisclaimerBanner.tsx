import React from "react";
import { AlertCircle, ShieldAlert, PhoneCall } from "lucide-react";

export function DisclaimerBanner() {
  return (
    <div className="bg-amber-50/90 border-y border-amber-200/80 px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm text-amber-900">
        <div className="flex items-start space-x-2.5">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-950">Important Medical Notice:</span>{" "}
            DawaDost provides informational identification and educational guidance only. It{" "}
            <strong>never prescribes medications</strong>, <strong>does not invent dosage instructions</strong>, and{" "}
            <strong>does not replace in-person doctor diagnosis</strong>.
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs font-medium text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded-md shrink-0 border border-amber-200">
          <PhoneCall className="w-3.5 h-3.5 text-amber-700" />
          <span>Emergency? Dial 112 / 911 / 108 immediately</span>
        </div>
      </div>
    </div>
  );
}
