"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, Camera, X, Image as ImageIcon, Sparkles } from "lucide-react";

interface DropzoneProps {
  label: string;
  sublabel: string;
  image: string | null;
  onImageSelected: (base64Data: string) => void;
  onClear: () => void;
  sampleOptions?: Array<{
    id: string;
    label: string;
    dataUri: string;
    description?: string;
  }>;
  onSampleSelect?: (sample: { id: string; label: string; dataUri: string; description?: string }) => void;
}

export function Dropzone({
  label,
  sublabel,
  image,
  onImageSelected,
  onClear,
  sampleOptions,
  onSampleSelect
}: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (JPEG, PNG, WEBP).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onImageSelected(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/svg+xml"
        className="hidden"
        onChange={handleFileInputChange}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileInputChange}
      />

      {/* Main Upload / Preview Area */}
      {!image ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer group relative rounded-2xl border-2 border-dashed transition-all p-6 sm:p-8 flex flex-col items-center justify-center text-center bg-white ${
            isDragging
              ? "border-teal-500 bg-teal-50/50 scale-[1.01]"
              : "border-slate-300 hover:border-teal-400 hover:bg-slate-50/60 shadow-xs"
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-teal-100 transition-all shadow-xs">
            <UploadCloud className="w-7 h-7 text-teal-600" />
          </div>

          <h3 className="text-base font-semibold text-slate-800">{label}</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">{sublabel}</p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium shadow-xs transition-colors"
            >
              Choose Photo
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                cameraInputRef.current?.click();
              }}
              className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors flex items-center space-x-1 border border-slate-200"
            >
              <Camera className="w-3.5 h-3.5 text-slate-600" />
              <span>Use Camera</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400 mt-3">
            Supports clear photos of blister strips, bottles, boxes or prescriptions (PNG, JPG)
          </p>
        </div>
      ) : (
        <div className="relative rounded-2xl border border-slate-200 bg-white p-3 shadow-xs">
          <div className="relative max-h-80 w-full overflow-hidden rounded-xl bg-slate-100 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt="Uploaded Preview"
              className="max-h-72 w-auto object-contain rounded-lg"
            />
            <button
              type="button"
              onClick={onClear}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-900/75 hover:bg-slate-900 text-white transition-colors shadow-md backdrop-blur-xs"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between px-2 text-xs text-slate-500">
            <span className="flex items-center space-x-1 text-teal-700 font-medium">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Photo ready for AI vision analysis</span>
            </span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-teal-600 hover:underline font-medium"
            >
              Change Photo
            </button>
          </div>
        </div>
      )}

      {/* Preset Sample Images for Fast Testing */}
      {sampleOptions && sampleOptions.length > 0 && !image && (
        <div className="pt-2">
          <div className="flex items-center space-x-1.5 text-xs font-medium text-slate-600 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Don&apos;t have a photo right now? Try a verified sample:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {sampleOptions.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => onSampleSelect && onSampleSelect(sample)}
                className="text-left p-2 rounded-xl border border-slate-200 hover:border-teal-400 bg-white hover:bg-teal-50/40 text-xs transition-all shadow-2xs group"
              >
                <div className="font-semibold text-slate-800 group-hover:text-teal-800 truncate">
                  {sample.label}
                </div>
                {sample.description && (
                  <div className="text-[11px] text-slate-500 truncate mt-0.5">
                    {sample.description}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
