"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/react";
import {
  Check,
  Sparkles,
  Layers,
  User,
  Briefcase,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
} from "lucide-react";

// Data parsed directly from image_73389a.png
const plansData = {
  seeker: [
    {
      name: "Free",
      id: "seeker_free",
      price: "$0",
      period: "",
      description: "Essential tools for finding your next opportunity.",
      features: [
        { label: "Apply to Jobs", value: "Up to 3/month" },
        { label: "Saved Jobs", value: "Up to 10" },
        { label: "Basic profile visibility" },
        { label: "Standard email alerts" },
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      id: "seeker_pro",
      price: "$19",
      period: "/mo",
      description: "Accelerate your search with advanced insights.",
      features: [
        { label: "Apply to Jobs", value: "Up to 30/month" },
        { label: "Saved Jobs", value: "Unlimited" },
        { label: "Application tracking" },
        { label: "Salary insights" },
      ],
      cta: "Upgrade to Pro",
      popular: true,
    },
    {
      name: "Premium",
      id: "seeker_premium",
      price: "$39",
      period: "/mo",
      description: "Maximum visibility and direct elite access.",
      features: [
        { label: "Apply to Jobs", value: "Unlimited" },
        { label: "Saved Jobs", value: "Unlimited" },
        { label: "Profile boost in recruiter searches" },
        { label: "Early access to new jobs" },
        { label: "Priority customer support" },
      ],
      cta: "Go Premium",
      popular: false,
    },
  ],
  recruiter: [
    {
      name: "Free",
      id: "recruiter_free",
      price: "$0",
      period: "",
      description: "Ideal for new companies starting their hiring journey.",
      features: [
        { label: "Active Job Posts", value: "Up to 3" },
        { label: "Analytics", value: "None" },
        { label: "Basic applicant management" },
        { label: "Standard job visibility" },
      ],
      cta: "Post for Free",
      popular: false,
    },
    {
      name: "Growth",
      id: "recruiter_growth",
      price: "$49",
      period: "/mo",
      description: "Perfect for growing teams with steady hiring needs.",
      features: [
        { label: "Active Job Posts", value: "Up to 10" },
        { label: "Analytics", value: "Basic" },
        { label: "Applicant tracking system" },
        { label: "Direct email support" },
      ],
      cta: "Start Growth Plan",
      popular: true,
    },
    {
      name: "Enterprise",
      id: "recruiter_enterprise",
      price: "$149",
      period: "/mo",
      description: "Full-scale powerhouse hiring infrastructure.",
      features: [
        { label: "Active Job Posts", value: "Up to 50" },
        { label: "Analytics", value: "Advanced" },
        { label: "Featured job listings" },
        { label: "Team collaboration tools" },
        { label: "Custom branding tools" },
        { label: "24/7 Priority support" },
      ],
      cta: "Contact Enterprise",
      popular: false,
    },
  ],
};

export default function PlansPage() {
  const [activeTab, setActiveTab] = useState("seeker"); // 'seeker' or 'recruiter'
  const [viewMode, setViewMode] = useState("cards"); // 'cards' or 'table'

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white font-sans antialiased selection:bg-indigo-500 selection:text-white pb-24">
      {/* Background Subtle Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-indigo-600/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Hero Header Section */}
      <header className="max-w-4xl mx-auto text-center pt-20 px-4 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-medium mb-4"
        >
          <Sparkles className="w-3 h-3 text-indigo-400" />
          Flexible, Prorated Billing Ecosystem
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent mb-4"
        >
          Transparent Pricing for HireLoop
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          HireLoop features two separate sets of plans configured specifically
          for your current ecosystem role. Pick the path built for your targets.
        </motion.p>
      </header>

      {/* Control Dashboard Center */}
      <div className="max-w-7xl mx-auto px-4 mb-12 flex flex-col items-center gap-4 relative z-10">
        {/* Role Toggle Switch */}
        <div className="bg-zinc-900 p-1 rounded-xl border border-zinc-800 flex items-center shadow-inner">
          <button
            onClick={() => setActiveTab("seeker")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === "seeker"
                ? "bg-zinc-800 text-white shadow-md border border-zinc-700/50"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <User className="w-4 h-4" />
            Job Seekers
          </button>
          <button
            onClick={() => setActiveTab("recruiter")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === "recruiter"
                ? "bg-zinc-800 text-white shadow-md border border-zinc-700/50"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Recruiters
          </button>
        </div>

        {/* Layout View Switcher (Cards vs Matrix Table Layout) */}
        <button
          onClick={() => setViewMode(viewMode === "cards" ? "table" : "cards")}
          className="text-xs text-zinc-500 hover:text-zinc-400 flex items-center gap-1.5 transition-colors"
        >
          <Layers className="w-3.5 h-3.5" />
          Switch to{" "}
          {viewMode === "cards"
            ? "Matrix Comparison View"
            : "Modern Cards View"}
        </button>
      </div>

      {/* Dynamic Content Core Container */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <AnimatePresence mode="wait">
          {viewMode === "cards" ? (
            /* CARDS LAYOUT VIEW */
            <motion.div
              key={`${activeTab}-cards`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto"
            >
              {plansData[activeTab].map((plan, index) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col justify-between p-8 rounded-2xl bg-zinc-900 border transition-all duration-300 hover:-translate-y-1 ${
                    plan.popular
                      ? "border-indigo-500 shadow-xl shadow-indigo-500/5 ring-1 ring-indigo-500/30"
                      : "border-zinc-800 shadow-lg shadow-black/40"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute top-0 right-6 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-[11px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full shadow-lg">
                      Most Popular
                    </span>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-zinc-500 mb-6 leading-relaxed min-h-[32px]">
                      {plan.description}
                    </p>

                    <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-4xl font-black text-white tracking-tight">
                        {plan.price}
                      </span>
                      <span className="text-sm text-zinc-500 font-medium">
                        {plan.period}
                      </span>
                    </div>

                    <hr className="border-zinc-800/80 mb-6" />

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-start gap-3 text-sm"
                        >
                          <div className="w-5 h-5 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-indigo-400" />
                          </div>
                          <span className="text-zinc-300 leading-tight">
                            {feature.value ? (
                              <>
                                <strong className="text-white font-medium">
                                  {feature.label}:
                                </strong>{" "}
                                {feature.value}
                              </>
                            ) : (
                              feature.label
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}

                  <form action="/api/checkout_sessions" method="POST">
                    <input type="hidden" name="plan_id" value={plan.id} />
                    <section>
                      <button
                        type="submit"
                        role="link"
                        className={`w-full h-11 font-semibold rounded-xl text-sm transition-all duration-200 ${
                          plan.popular
                            ? "bg-white text-zinc-950 hover:bg-zinc-200"
                            : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700 border border-zinc-700"
                        }`}
                      >
                        {plan.cta}
                      </button>
                    </section>
                  </form>
                </div>
              ))}
            </motion.div>
          ) : (
            /* TABLE MATRIX COMPARISON LAYOUT VIEW */
            <motion.div
              key={`${activeTab}-table`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl mx-auto overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm shadow-xl"
            >
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900">
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Plan Tier
                    </th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Price Rate
                    </th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-zinc-500">
                      {activeTab === "seeker"
                        ? "Apply Quota"
                        : "Active Job Posts"}
                    </th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-zinc-500">
                      {activeTab === "seeker"
                        ? "Saved Limits"
                        : "Analytics Suite"}
                    </th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-zinc-500">
                      Tier Extras / Support
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {activeTab === "seeker" ? (
                    <>
                      <tr className="hover:bg-zinc-900/40 transition-colors">
                        <td className="p-4 font-bold text-white">Free</td>
                        <td className="p-4 text-sm font-medium text-zinc-300">
                          $0
                        </td>
                        <td className="p-4 text-sm text-zinc-400">
                          Up to 3 / month
                        </td>
                        <td className="p-4 text-sm text-zinc-400">Up to 10</td>
                        <td className="p-4 text-xs text-zinc-400">
                          Basic profile template, baseline email alerts
                        </td>
                      </tr>
                      <tr className="hover:bg-zinc-900/40 transition-colors bg-indigo-500/[0.01]">
                        <td className="p-4 font-bold text-white flex items-center gap-2">
                          Pro{" "}
                          <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-md border border-indigo-500/30">
                            Popular
                          </span>
                        </td>
                        <td className="p-4 text-sm font-medium text-zinc-300">
                          $19/mo
                        </td>
                        <td className="p-4 text-sm text-zinc-400">
                          Up to 30 / month
                        </td>
                        <td className="p-4 text-sm text-zinc-400">Unlimited</td>
                        <td className="p-4 text-xs text-zinc-400">
                          Application lifecycle tracking pipelines, targeted
                          salary insights
                        </td>
                      </tr>
                      <tr className="hover:bg-zinc-900/40 transition-colors">
                        <td className="p-4 font-bold text-white">Premium</td>
                        <td className="p-4 text-sm font-medium text-zinc-300">
                          $39/mo
                        </td>
                        <td className="p-4 text-sm text-zinc-400">Unlimited</td>
                        <td className="p-4 text-sm text-zinc-400">Unlimited</td>
                        <td className="p-4 text-xs text-zinc-400">
                          Algorithmic profile placement boost, instant access
                          alerts, dedicated priority support lines
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr className="hover:bg-zinc-900/40 transition-colors">
                        <td className="p-4 font-bold text-white">Free</td>
                        <td className="p-4 text-sm font-medium text-zinc-300">
                          $0
                        </td>
                        <td className="p-4 text-sm text-zinc-400">
                          Up to 3 active slots
                        </td>
                        <td className="p-4 text-sm text-rose-400/70">
                          ✕ Locked
                        </td>
                        <td className="p-4 text-xs text-zinc-400">
                          Standard applicant file records management, regular
                          catalog visibility
                        </td>
                      </tr>
                      <tr className="hover:bg-zinc-900/40 transition-colors bg-indigo-500/[0.01]">
                        <td className="p-4 font-bold text-white flex items-center gap-2">
                          Growth{" "}
                          <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-md border border-indigo-500/30">
                            Popular
                          </span>
                        </td>
                        <td className="p-4 text-sm font-medium text-zinc-300">
                          $49/mo
                        </td>
                        <td className="p-4 text-sm text-zinc-400">
                          Up to 10 active slots
                        </td>
                        <td className="p-4 text-sm text-zinc-400">
                          Basic Insights
                        </td>
                        <td className="p-4 text-xs text-zinc-400">
                          Candidate filtering and tracking boards, direct
                          email-based support response
                        </td>
                      </tr>
                      <tr className="hover:bg-zinc-900/40 transition-colors">
                        <td className="p-4 font-bold text-white">Enterprise</td>
                        <td className="p-4 text-sm font-medium text-zinc-300">
                          $149/mo
                        </td>
                        <td className="p-4 text-sm text-zinc-400">
                          Up to 50 active slots
                        </td>
                        <td className="p-4 text-sm text-zinc-400">
                          Advanced Analytics
                        </td>
                        <td className="p-4 text-xs text-zinc-400">
                          Featured priority catalog listings, workspace team
                          collaboration, multi-brand identity tooling, 24/7
                          priority support
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Trust & Footnote Infrastructure Cards */}
      <footer className="max-w-4xl mx-auto px-4 mt-20 text-center relative z-10">
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 mb-8 text-sm text-zinc-400 leading-relaxed max-w-3xl mx-auto">
          {activeTab === "recruiter" && (
            <p className="text-indigo-400 font-medium mb-3 flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" /> New hiring entities can host up to 3
              active jobs for free — ideal for your first year of scaling.
            </p>
          )}
          All transactions are processed through end-to-end encrypted{" "}
          <strong className="text-white font-medium">Stripe</strong> pipelines.
          Plans fully support upgrades, downgrades, or workspace tier scaling
          adjustments at any runtime vector with clean prorated billing
          calculations. A complete{" "}
          <strong className="text-white font-medium">
            14-day money-back window guarantee
          </strong>{" "}
          is applicable immediately across all active payment configurations.
        </div>

        {/* Security Assurances Line */}
        <div className="flex items-center justify-center gap-6 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-zinc-600" /> Secure SSL
            Connection
          </span>
          <span className="flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-zinc-600" /> Compliant with Global
            Frameworks
          </span>
        </div>
      </footer>
    </div>
  );
}
