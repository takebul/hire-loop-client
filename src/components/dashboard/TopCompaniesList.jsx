"use client";

import React from "react";
import { Card, Button } from "@heroui/react";
import { ArrowRight } from "@gravity-ui/icons";

export default function TopCompaniesList({ companies = [] }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Header Container Row */}
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-bold tracking-tight text-white">
          My Top Companies
        </h2>
        <Button
          size="sm"
          variant="ghost"
          className="text-xs text-zinc-400 hover:text-white border-none p-0 bg-transparent min-w-0"
        >
          View all
        </Button>
      </div>

      {/* Structured List Blueprint Card */}
      <Card className="bg-[#121214] border border-[#232326] text-white rounded-2xl p-2 shadow-2xl mt-2">
        <Card.Content className="flex flex-col gap-5 p-0">
          {/* Inner Custom Company Data Rows */}
          <div className="flex flex-col gap-0">
            {companies.map((company, index) => {
              const CompanyIcon = company.icon;
              return (
                <div
                  key={company.id || index}
                  className="group flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-[#232326] hover:bg-[#161619]/40 transition-all duration-200 cursor-pointer"
                >
                  {/* Left Column Meta Block */}
                  <div className="flex items-center gap-3.5">
                    {/* Dynamic Graphic Container box */}
                    <div className="w-11 h-11 rounded-xl bg-[#1a1a1d] border border-[#2d2d32] text-zinc-400 flex items-center justify-center transition-all duration-300 group-hover:bg-zinc-800 group-hover:text-white group-hover:scale-105 shadow-inner">
                      {CompanyIcon ? (
                        <CompanyIcon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-3" />
                      ) : (
                        <span className="text-xs font-bold">
                          {company.name?.substring(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white group-hover:text-zinc-200 transition-colors">
                        {company.name}
                      </span>
                      <span className="text-xs text-zinc-500 font-medium">
                        {company.category} • {company.location}
                      </span>
                    </div>
                  </div>

                  {/* Right Column Total Count Metrics */}
                  <div className="text-right flex flex-col items-end">
                    <span className="text-base font-bold text-white tracking-tight tabular-nums">
                      {company.activeJobsCount}
                    </span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                      Active Jobs
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Call Button matching style specification bottom tray layout inside card */}
          <Button className="w-full bg-transparent hover:bg-zinc-900 border border-[#232326] hover:border-[#333336] text-zinc-300 hover:text-white font-semibold text-sm py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 h-11">
            View All Companies
            <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </Card.Content>
      </Card>
    </div>
  );
}
