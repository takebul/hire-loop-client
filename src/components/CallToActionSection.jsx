"use client";

import { Button } from "@heroui/react";
import Image from "next/image";

export default function CallToActionSection() {
  return (
    <section className="relative w-full pt-10 bg-black text-white py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Immersive Blue/Purple Neon Aura Background */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] md:w-[800px] h-[300px] sm:h-[400px] bg-blue-600/20 blur-[100px] md:blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[250px] sm:w-[500px] h-[250px] sm:h-[350px] bg-purple-600/20 blur-[90px] md:blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Wireframe Grid Background Wrapper (Verbatim Reference: cta-bg.png) */}
      <div className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen pointer-events-none select-none z-0">
        <Image
          src="/cta-bg.png" // Replace with your actual public image path for cta-bg.png
          alt="Grid Background Wireframe"
          fill
          priority
          className="object-cover object-top"
        />
        {/* Deep vignette masking gradient to seamlessly fade into the landing section */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/80 to-black" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Impact Typography Header */}
        <h2 className="text-2xl sm:text-5xl md:text-5xl font-semibold tracking-tight text-white leading-[1.15] max-w-3xl">
          Your next role is <br />
          already looking for you
        </h2>

        {/* Supporting Copywriter Description Line */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed font-normal">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        {/* Action Button Suite */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {/* Primary Action Button */}
          <Button
            size="lg"
            className="w-full sm:w-auto h-12 px-8 font-medium text-black bg-white rounded-xl shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:bg-neutral-200 transition-all duration-200 text-sm"
          >
            Create a free account
          </Button>

          {/* Secondary Action Button */}
          <Button
            size="lg"
            variant="bordered"
            className="w-full sm:w-auto h-12 px-8 font-medium text-white border-white/[0.08] bg-[#0e0e11]/40 hover:bg-[#161619]/60 hover:border-white/20 rounded-xl backdrop-blur-md transition-all duration-200 text-sm"
          >
            View pricing
          </Button>
        </div>
      </div>
    </section>
  );
}
