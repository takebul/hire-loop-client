"use client";

import {
  Bookmark,
  ChartBar,
  LayoutCellsLarge,
  Magnifier,
  NodesUp,
  SquareArticle,
} from "@gravity-ui/icons";
import { TrendingUp } from "lucide-react";
import { FcCursor } from "react-icons/fc";

export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      icon: <Magnifier className="h-5 w-5 text-purple-400" />,
      title: "Smart Search",
      description: "Find your ideal job with advanced filters.",
    },
    {
      id: 2,
      icon: <ChartBar className="h-5 w-5 text-purple-400" />,
      title: "Salary Insights",
      description: "Get real salary data to negotiate confidently.",
    },
    {
      id: 3,
      icon: <LayoutCellsLarge className="h-5 w-5 text-purple-400" />,
      title: "Top Companies",
      description: "Apply to vetted companies that are hiring.",
    },
    {
      id: 4,
      icon: <Bookmark className="h-5 w-5 text-purple-400" />,
      title: "Saved Jobs",
      description: "Manage apps & favorites on your dashboard.",
    },
    {
      id: 5,
      icon: <FcCursor className="h-5 w-5 text-purple-400" />,
      title: "One-Click Apply",
      description: "Simplify your job applications for an easier process!",
    },
    {
      id: 6,
      icon: <SquareArticle className="h-5 w-5 text-purple-400" />,
      title: "Resume Builder",
      description: "Create professional resumes with modern templates.",
    },
    {
      id: 7,
      icon: <NodesUp className="h-5 w-5 text-purple-400" />,
      title: "Skill-Based Matching",
      description: "Discover jobs that match your skills and experience.",
    },
    {
      id: 8,
      icon: <TrendingUp className="h-5 w-5 text-purple-400" />,
      title: "Career Growth Resources",
      description: "Boost your career with quick interview tips.",
    },
  ];

  return (
    <section className="  w-full bg-black text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambient Violet Glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[400px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Tag / Badge */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 bg-purple-500 rounded-xs rotate-45" />
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-white/50">
            Features Job
          </span>
          <span className="w-1.5 h-1.5 bg-purple-500 rounded-xs rotate-45" />
        </div>

        {/* Dynamic Typography Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 px-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
            Everything you need <br />
            to succeed
          </h2>
        </div>

        {/* Feature Grid Architecture */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group flex items-start gap-4 p-2 rounded-2xl transition-all duration-300 hover:bg-white/[0.01]"
            >
              {/* Left-side Icon Box */}
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-[#0a0a0c] border border-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] transition-all duration-300 group-hover:border-purple-500/40 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                <div className="transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
              </div>

              {/* Right-side Description Strings */}
              <div className="space-y-1 pt-1.5">
                <h3 className="text-base font-medium text-white group-hover:text-purple-400 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-sm font-normal text-white/40 leading-relaxed group-hover:text-white/50 transition-colors duration-200">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
