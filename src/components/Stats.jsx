"use client";

import { Briefcase, Factory, Magnifier, Star } from "@gravity-ui/icons";

export default function StatsSection() {
  const stats = [
    {
      id: 1,
      icon: <Briefcase className="h-5 w-5" />,
      value: "50K",
      label: "Active Jobs",
    },
    {
      id: 2,
      icon: <Factory className="h-5 w-5" />,
      value: "12K",
      label: "Companies",
    },
    {
      id: 3,
      icon: <Magnifier className="h-5 w-5" />,
      value: "2M",
      label: "Job Seekers",
    },
    {
      id: 4,
      icon: <Star className="h-5 w-5" />,
      value: "97%",
      label: "Satisfaction Rate",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black pt-20 pb-16 md:pt-28 md:pb-24 text-white">
      {/* Background Atmosphere Glow */}
      <div className="absolute left-1/2 top-[10%] h-[300px] w-[300px] sm:h-[500px] sm:w-[800px] md:w-[1000px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[100px] md:blur-[160px] pointer-events-none z-0" />

      {/* Background Globe Wrapper to control aspect ratio and responsive scaling */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full  h-[50%] sm:h-[65%] md:h-[75%] z-0 select-none pointer-events-none">
        {/* <div
          className="w-full h-full bg-cover bg-bottom bg-no-repeat opacity-80 mix-blend-screen"
          style={{
            backgroundImage: "url('/globe.png')",
          }}
        /> */}
        {/* Soft fading masking over the lower half of the globe */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Main Section Header */}
        <div className="mx-auto max-w-3xl text-center mt-6 sm:mt-12 md:mt-16">
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-[40px] font-normal leading-tight md:leading-snug text-white/90 tracking-tight">
            Assisting over{" "}
            <span className="font-semibold text-white">15,000 job seekers</span>
            <br className="hidden sm:inline" /> find their dream positions.
          </h2>
        </div>

        {/* Stats Cards Grid Layout */}
        {/* Negative top margin pulls the grid gracefully up against the bottom curve of the globe */}
        <div className="mt-16 sm:mt-24 md:mt-32 lg:mt-36 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-white/[0.06] bg-[#0c0c0e]/70 p-6 md:p-8 min-h-[190px] md:min-h-[210px] backdrop-blur-xl transition-all duration-300 hover:border-violet-500/30 hover:bg-[#121215]/90 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.8)]"
            >
              {/* Contextual Radial Hover Glow inside the card */}
              <div className="absolute -bottom-10 -right-10 h-36 w-36 rounded-full bg-violet-600/0 blur-2xl transition-all duration-500 group-hover:bg-violet-600/15 group-hover:scale-120 pointer-events-none" />

              {/* Top Row: Icon Container */}
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.05] text-white/70 group-hover:text-white transition-colors duration-300">
                {stat.icon}
              </div>

              {/* Bottom Row: Metrics Data */}
              <div className="mt-8 space-y-1">
                <h3 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
                  {stat.value}
                </h3>
                <p className="text-sm font-medium tracking-wide text-white/40 group-hover:text-white/50 transition-colors duration-300">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
