"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { Plus, ArrowRight, ChartLineArrowUp } from "@gravity-ui/icons";
import { Crown } from "lucide-react";
import { BsLightning } from "react-icons/bs";

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Loop Basic",
      icon: <Crown className="h-4 w-4 text-pink-400" />,
      priceMonthly: 0,
      priceYearly: 0,
      description: "Explore the AI job matching ecosystem:",
      features: [
        "5 automated AI job matches per day",
        "Standard HireLoop unified application",
        "Public talent profile indexing",
        "Basic market salary estimation tools",
      ],
      ctaText: "Get Started Free",
      isPopular: false,
    },
    {
      name: "Loop Pro",
      icon: <ChartLineArrowUp className="h-4 w-4 text-indigo-400" />,
      priceMonthly: 17,
      priceYearly: 12,
      description: "Supercharge your pipeline with custom AI leverage:",
      features: [
        "Unlimited AI job matches & instant routing",
        "AI-generated, tailored resumes for every role",
        "Priority application queuing (Skip the stack)",
        "Verified company compensation & equity data",
      ],
      ctaText: "Buy Loop Pro Now",
      isPopular: true,
    },
    {
      name: "Loop Max",
      icon: <BsLightning className="h-4 w-4 text-violet-400" />,
      priceMonthly: 99,
      priceYearly: 74,
      description:
        "Direct placement routing and premium headhunter visibility:",
      features: [
        "Everything included in Loop Pro",
        "Direct routing to active HireLoop partner companies",
        "Real-time alerts when recruiters open your profile",
        "Personal AI agent submits applications on autopilot",
      ],
      ctaText: "Unlock Loop Max Leverage",
      isPopular: false,
    },
  ];

  return (
    <section className="relative w-full bg-black text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[350px] sm:w-[700px] h-[350px] sm:h-[500px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header Tag */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-xs rotate-45" />
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-white/50">
            Pricing
          </span>
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-xs rotate-45" />
        </div>

        {/* Dynamic Main Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
            Pay for the leverage,
            <br />
            not the listings
          </h2>
        </div>

        {/* Toggle Controls Switch */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center gap-1 bg-[#121214] border border-white/[0.06] p-1.5 rounded-full shadow-inner">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 text-xs md:text-sm font-medium rounded-full transition-all duration-300 ${
                !isYearly
                  ? "bg-white text-black shadow-md"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`flex items-center gap-2 px-5 py-2 text-xs md:text-sm font-medium rounded-full transition-all duration-300 ${
                isYearly
                  ? "bg-white text-black shadow-md"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <span>Yearly</span>
              <span className="bg-pink-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full tracking-wide">
                25% OFF
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col justify-between rounded-[28px] p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 ${
                plan.isPopular
                  ? "border border-white/15 bg-white/[0.04] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] md:scale-[1.03] z-20"
                  : "border border-white/[0.06] bg-[#0c0c0e]/60 shadow-[0_15px_35px_rgba(0,0,0,0.6)] z-10 hover:border-white/15"
              }`}
            >
              <div>
                {/* Upper Tier Banner Row */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      {plan.icon}
                    </div>
                    <h3 className="text-lg font-medium text-white">
                      {plan.name}
                    </h3>
                  </div>

                  {/* Dynamic Pricing String */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl md:text-4xl font-bold text-white">
                      ${isYearly ? plan.priceYearly : plan.priceMonthly}
                    </span>
                    <span className="text-xs text-white/40">/month</span>
                  </div>
                </div>

                {/* Subtitle Line */}
                <p className="text-sm font-medium text-white/90 mb-6">
                  {plan.description}
                </p>

                {/* Feature List Mapping */}
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-md bg-white/[0.03] border border-white/[0.05] text-white/30 mt-0.5">
                        <Plus className="w-3 h-3" />
                      </span>
                      <span className="text-sm text-white/50 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call To Action Buttons */}
              <Button
                className={`w-full font-medium h-12 rounded-xl flex items-center justify-center gap-2 border transition-all duration-300 ${
                  plan.isPopular
                    ? "bg-white text-black border-white hover:bg-neutral-200"
                    : "bg-[#222226]/50 text-white border-white/[0.08] hover:bg-[#222226] hover:border-white/20"
                }`}
              >
                <span>{plan.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
