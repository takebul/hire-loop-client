"use client";

import { Button } from "@heroui/react";
import { MapPin, Briefcase, DollarSign, ArrowRight } from "lucide-react";

export default function JobDiscoverySection() {
  // Mock array matching your layout structure
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      location: "New York, USA",
      type: "Hybrid",
      salary: "€25–€40/hour",
    },
    {
      id: 2,
      title: "Frontend Developer",
      location: "New York, USA",
      type: "Hybrid",
      salary: "€25–€40/hour",
    },
    {
      id: 3,
      title: "Frontend Developer",
      location: "New York, USA",
      type: "Hybrid",
      salary: "€25–€40/hour",
    },
    {
      id: 4,
      title: "Frontend Developer",
      location: "New York, USA",
      type: "Hybrid",
      salary: "€25–€40/hour",
    },
    {
      id: 5,
      title: "Frontend Developer",
      location: "New York, USA",
      type: "Hybrid",
      salary: "€25–€40/hour",
    },
    {
      id: 6,
      title: "Frontend Developer",
      location: "New York, USA",
      type: "Hybrid",
      salary: "€25–€40/hour",
    },
  ];

  return (
    <section className="relative w-full bg-black text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle Background Glow for Tech Vibe */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] md:w-[900px] h-[300px] bg-indigo-600/5 blur-[130px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Tag Badge */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-xs rotate-45" />
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-white/40">
            Smart Job Discovery
          </span>
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-xs rotate-45" />
        </div>

        {/* Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
            The roles you'd never <br /> find by searching
          </h2>
        </div>

        {/* 3-Column Card Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {jobs.map((job, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between rounded-[24px] border border-white/[0.05] bg-[#0c0c0e]/60 p-6 sm:p-8 min-h-[300px] backdrop-blur-xl transition-all duration-300 hover:border-white/15 hover:bg-[#121215]/90 shadow-[0_12px_30px_rgba(0,0,0,0.7)]"
            >
              <div>
                {/* Header Information */}
                <h3 className="text-xl font-medium text-white group-hover:text-indigo-400 transition-colors duration-300">
                  {job.title}
                </h3>
                <p className="mt-3 text-sm text-white/40 leading-relaxed font-normal">
                  Showcase your commitment to diversity and inclusion by
                  highlighting initiatives
                </p>

                {/* Pill Tags Array Wrapper */}
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.03] border border-white/[0.04] text-white/70">
                    <MapPin size={12} className="text-pink-400/80" />
                    {job.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.03] border border-white/[0.04] text-white/70">
                    <Briefcase size={12} className="text-indigo-400/80" />
                    {job.type}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.03] border border-white/[0.04] text-white/70">
                    <DollarSign size={12} className="text-violet-400/80" />
                    {job.salary}
                  </span>
                </div>
              </div>

              {/* Action Trigger Link */}
              <div className="mt-8 pt-4 border-t border-white/[0.02] flex items-center gap-2 text-sm font-medium text-white/80 group-hover:text-white transition-colors cursor-pointer">
                <span>Apply Now</span>
                <ArrowRight
                  size={14}
                  className="transform transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Navigation Trigger */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className="h-12 px-6 font-medium text-black bg-white rounded-xl shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:bg-neutral-200 transition-all duration-200 text-sm"
          >
            View all job open
          </Button>
        </div>
      </div>
    </section>
  );
}
