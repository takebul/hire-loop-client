"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";

export default function ForbiddenPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 overflow-hidden select-none">
      {/* Eye-catching Background Light Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Glassmorphism Content Card */}
      <div className="relative max-w-md w-full bg-[#121212]/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-8 text-center shadow-2xl">
        {/* Animated Icon Container */}
        <div className="mx-auto w-20 h-20 bg-rose-950/30 border border-rose-900/40 rounded-2xl flex items-center justify-center text-rose-500 mb-6 animate-pulse">
          <ShieldAlert size={40} strokeWidth={1.5} />
        </div>

        {/* Big Error Code Accent */}
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full">
          Error Code: 403
        </span>

        {/* Header Text */}
        <h1 className="text-3xl font-bold tracking-tight text-neutral-100 mt-4">
          Access Forbidden
        </h1>

        <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
          You don't have the required clearance level to view this sector. If
          you believe this is a mistake, please reach out to your system
          administrator.
        </p>

        {/* Decorative Terminal Line Mockup */}
        <div className="my-6 p-3 bg-black/40 border border-neutral-900 rounded-lg text-left font-mono text-xs text-neutral-500">
          <span className="text-rose-500">$&nbsp;</span>sys_verify --user status
          <br />
          <span className="text-neutral-600">status:</span> permission_denied
          (0x03FF)
        </div>

        {/* Dynamic Action Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          {/* Go Back Trigger */}
          <button
            onClick={() => router.back()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border border-neutral-800 bg-neutral-900/50 text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all active:scale-[0.98]"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>

          {/* Dashboard Home Shortcut */}
          <button
            onClick={() => router.push("/")}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-neutral-100 text-neutral-950 hover:bg-white transition-all active:scale-[0.98] shadow-lg shadow-white/5"
          >
            <Home size={16} />
            Return Home
          </button>
        </div>
      </div>

      {/* Decorative Brand Watermark */}
      <div className="absolute bottom-6 text-xs tracking-wider text-neutral-600 font-medium uppercase">
        Security Protokol Layer v3.2.1
      </div>
    </div>
  );
}
