"use client";

import { Input, Button, Chip } from "@heroui/react";
import { Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-top bg-slate-950 bg-linear-to-b to-black pt-20 pb-32">
      {/* Background */}
      <div className="absolute inset-0" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Badge */}

        <div className="relative flex items-center justify-center w-full my-8">
          {/* Left Laser Line Accent */}
          <div className="absolute left-0 right-[calc(50%+180px)] h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-indigo-500/80 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />

          {/* Center Badge Capsule */}
          <div className="relative z-10 flex items-center gap-3.5 rounded-full border border-white/[0.08] bg-gradient-to-b from-[#1c1c1e] to-[#0c0c0d] px-6 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)]">
            {/* Briefcase Icon / Emoji */}
            <span className="text-xl select-none leading-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              💼
            </span>

            {/* Badge Text content */}
            <div className="flex items-center gap-2 text-xs md:text-sm tracking-[0.1em] font-medium">
              <span className="text-white font-bold tracking-normal drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]">
                50,000+
              </span>
              <span className="text-white/40 font-mono font-normal uppercase">
                New Jobs This Month
              </span>
            </div>
          </div>

          {/* Right Laser Line Accent */}
          <div className="absolute right-0 left-[calc(50%+180px)] h-px bg-gradient-to-l from-transparent via-violet-500/40 to-violet-500/80 shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
        </div>

        {/* Heading */}

        <div className="mx-auto mt-8 max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            Find Your Dream Job Today
          </h1>

          <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role — faster.
          </p>
        </div>

        {/* Search Box */}

        <div className="mx-auto mt-10 max-w-4xl justify-items-center">
          <div className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl p-2">
            <div className="flex flex-col md:flex-row gap-2">
              <Input
                placeholder="🔍 Job title, skill or company"
                variant="bordered"
                className={{
                  inputWrapper: "border-0 bg-transparent shadow-none",
                }}
              />

              <div className="hidden md:block w-px bg-white/10" />

              <Input
                placeholder="📍 Location or Remote"
                variant="bordered"
                className={{
                  inputWrapper: "border-0 bg-transparent shadow-none",
                }}
              />

              <Button
                isIconOnly
                color="primary"
                size="lg"
                className="min-w-14 rounded-lg"
              >
                <Search size={18} />
              </Button>
            </div>
          </div>

          {/* Trending */}

          <div className="mt-5 flex flex-wrap justify-center items-center gap-2 text-sm">
            <span className="text-white/50">Trending Position</span>

            <Chip variant="flat">Product Designer</Chip>

            <Chip variant="flat">AI Engineering</Chip>

            <Chip variant="flat">Dev-ops Engineer</Chip>
          </div>
        </div>
      </div>
    </section>
  );
}
