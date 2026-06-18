import React from "react";
import { Card } from "@heroui/react";

export default function StatsGrid({ statsData = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {statsData.map((stat, index) => {
        const IconComponent = stat.icon;

        return (
          <Card
            key={stat.id || index}
            className="group relative bg-gradient-to-b from-[#161618] to-[#111112] border border-[#232326] text-white rounded-2xl p-5 shadow-2xl transition-all duration-300 ease-out hover:border-[#3b3b3f] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] overflow-hidden w-full"
          >
            {/* Ambient Background Glow on Hover */}
            <div className="absolute -inset-px bg-gradient-to-r from-zinc-800 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

            {/* HeroUI v3 Compound Component Structure */}
            <Card.Content className="relative z-10 flex flex-col gap-7 p-1">
              {/* Animated Icon Wrapper */}
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#1d1d20] border border-[#2a2a2e] text-[#a1a1aa] transition-all duration-300 group-hover:bg-zinc-800 group-hover:text-white group-hover:scale-105 shadow-inner">
                {IconComponent && (
                  <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:rotate-3" />
                )}
              </div>

              {/* Data Presentation */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  {stat.title}
                </span>
                <span className="text-3xl font-bold tracking-tight text-white font-sans tabular-nums">
                  {stat.value}
                </span>
              </div>
            </Card.Content>
          </Card>
        );
      })}
    </div>
  );
}
