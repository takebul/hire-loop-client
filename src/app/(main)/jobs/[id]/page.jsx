import { getJobById } from "@/lib/api/jobs";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import * as motion from "framer-motion/client";

export default async function JobDetailPage({ params }) {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070708] text-white">
        <p className="text-neutral-500 font-medium">Position unavailable.</p>
      </div>
    );
  }

  const workMode = job.isRemote ? "Remote" : "On-site / Hybrid";
  const formattedDeadline = new Date(job.deadline).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const paragraphs = (text) => text?.split("\n").filter(Boolean) || [];

  return (
    <main className="min-h-screen bg-[#070708] text-neutral-300 antialiased selection:bg-blue-500/30 selection:text-white">
      {/* Background ambient glow effect to catch the eye */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        {/* Navigation Link */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-neutral-500 hover:text-white transition-colors duration-300 mb-12 group"
        >
          <span className="relative overflow-hidden inline-block h-3.5 w-4">
            <ArrowRight className="w-3.5 h-3.5 rotate-180 absolute transition-transform duration-300 group-hover:-translate-x-1" />
          </span>
          Back to Career Grid
        </Link>

        {/* TWO-COLUMN EDITORIAL LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: STICKY HERO CARD */}
          <div className="lg:col-span-5 lg:sticky lg:top-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="border border-neutral-800/80 bg-neutral-900/40 backdrop-blur-md p-8 rounded-[32px] shadow-2xl relative overflow-hidden group"
            >
              {/* Subtle top border illumination */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-neutral-950 border border-neutral-800 p-2 flex items-center justify-center">
                  <Image
                    src={
                      job.company || "https://i.ibb.co.com/B2YPh0xY/uber.png"
                    }
                    alt={job.companyName || "Company logo"}
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 bg-neutral-950 border border-neutral-800 text-neutral-400 rounded-full">
                  {job.jobCategory}
                </span>
              </div>

              <div className="mt-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
                  {job.jobTitle}
                </h1>
                <p className="text-sm font-medium text-blue-400 mt-2 tracking-wide">
                  {job.companyName}
                </p>
              </div>

              {/* Data Strip Metrics */}
              <div className="mt-8 space-y-4 border-t border-b border-neutral-800/80 py-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Location
                  </span>
                  <span className="font-medium text-neutral-200">
                    {job.city}, {job.country}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Employment
                  </span>
                  <span className="font-medium text-neutral-200 capitalize">
                    {job.jobType} / {workMode}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> Compensation
                  </span>
                  <span className="font-bold text-emerald-400">
                    ${job.salaryMin} – ${job.salaryMax}{" "}
                    <span className="text-xs font-normal text-neutral-500">
                      /{job.currency}
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Application Window
                  </span>
                  <span className="font-medium text-neutral-200 text-xs px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-md">
                    Until {formattedDeadline}
                  </span>
                </div>
              </div>

              {/* PREMIUM HIGH-CONTRAST INTERACTIVE BUTTON */}
              <div className="mt-8">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Link
                    href={`/jobs/${id}/apply`}
                    className="relative w-full inline-flex items-center justify-center gap-2 bg-white text-neutral-950 font-semibold px-6 py-4 rounded-2xl shadow-xl hover:bg-neutral-100 transition-all duration-300 group overflow-hidden"
                  >
                    {/* Shimmer overlay animation effect */}
                    <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_ease-in-out]" />

                    <span className="text-sm tracking-wide">
                      Submit Application
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: DETAIL SYNOPSIS EXPOSITIONS */}
          <div className="lg:col-span-7 space-y-12">
            {/* Responsibilities Block */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2.5 mb-6">
                <CheckCircle2 className="w-4 h-4 text-neutral-700" />
                Scope of Work
              </h2>
              <div className="space-y-6 border-l-2 border-neutral-800/80 pl-6 ml-2">
                {paragraphs(job.responsibilities).map((item, idx) => (
                  <div key={idx} className="relative group">
                    {/* Active dynamic indicator marker floating over the left line */}
                    <div className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full bg-neutral-700 group-hover:bg-blue-500 border border-neutral-950 transition-colors duration-300" />
                    <p className="text-neutral-400 text-[15px] leading-relaxed group-hover:text-neutral-200 transition-colors duration-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Requirements Block */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2.5 mb-6">
                <ShieldCheck className="w-4 h-4 text-neutral-700" />
                Candidate Core Competencies
              </h2>
              <div className="space-y-6 border-l-2 border-neutral-800/80 pl-6 ml-2">
                {paragraphs(job.requirements).map((item, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[31px] top-1.5 w-2 h-2 rounded-full bg-neutral-700 group-hover:bg-pink-500 border border-neutral-950 transition-colors duration-300" />
                    <p className="text-neutral-400 text-[15px] leading-relaxed group-hover:text-neutral-200 transition-colors duration-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Perks Block */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="pt-8 border-t border-neutral-900"
            >
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2.5 mb-6">
                <Sparkles className="w-4 h-4 text-neutral-700" />
                Offerings & Ecosystem Benefits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paragraphs(job.benefits).map((benefit, idx) => (
                  <div
                    key={idx}
                    className="bg-neutral-900/20 border border-neutral-850 p-4 rounded-2xl flex items-start gap-3 hover:border-neutral-800 transition-colors duration-300"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-neutral-400 font-medium leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </main>
  );
}
