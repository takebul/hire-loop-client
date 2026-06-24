import React from "react";
import { getApplicationsByApplicant } from "@/lib/api/applications";
import { getUserSession } from "@/lib/core/session";
import ApplicationTable from "./ApplicationTable";
import { Download } from "lucide-react";

const ApplicationsPage = async () => {
  const user = await getUserSession();
  const jobs = (await getApplicationsByApplicant(user?.id)) || [];

  // Derived metrics data mirroring the screenshot layout
  const totalApplied = jobs.length;
  const shortlistedCount = jobs.filter(
    (j) => j.status === "Shortlisted",
  ).length;
  const interviewCount = jobs.filter(
    (j) => j.status === "Interview" || j.status === "Review",
  ).length;
  const successRate =
    totalApplied > 0 ? Math.round((shortlistedCount / totalApplied) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#121212] text-zinc-100 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              My Applications
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Track your job applications and interview progress in real-time.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-center">
            {/* Active / Archived Toggle Pill */}
            <div className="bg-[#1e1e1e] border border-zinc-800 p-1 rounded-lg flex items-center text-xs font-medium">
              <span className="px-3 py-1.5 bg-[#2a2a2a] text-zinc-100 rounded-md shadow-sm cursor-pointer">
                Active
              </span>
              <span className="px-3 py-1.5 text-zinc-400 hover:text-zinc-200 cursor-pointer">
                Archived
              </span>
            </div>
            {/* Export Button */}
            <button className="flex items-center gap-2 bg-white text-zinc-900 hover:bg-zinc-100 font-medium text-xs px-4 py-2.5 rounded-lg transition-colors">
              <Download className="w-3.5 h-3.5" />
              Export PDF
            </button>
          </div>
        </div>

        {/* Metric Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#1e1e1e] border border-zinc-800 rounded-xl p-5">
            <p className="text-zinc-400 text-sm font-medium">Total Applied</p>
            <p className="text-3xl font-semibold mt-1">{totalApplied}</p>
          </div>
          <div className="bg-[#1e1e1e] border border-zinc-800 rounded-xl p-5">
            <p className="text-zinc-400 text-sm font-medium">Shortlisted</p>
            <p className="text-3xl font-semibold mt-1">{shortlistedCount}</p>
          </div>
          <div className="bg-[#1e1e1e] border border-zinc-800 rounded-xl p-5">
            <p className="text-zinc-400 text-sm font-medium">Interviews</p>
            <p className="text-3xl font-semibold mt-1 text-amber-500">
              {interviewCount}
            </p>
          </div>
          <div className="bg-[#1e1e1e] border border-zinc-800 rounded-xl p-5">
            <p className="text-zinc-400 text-sm font-medium">Success Rate</p>
            <p className="text-3xl font-semibold mt-1 text-emerald-500">
              {successRate}%
            </p>
          </div>
        </div>

        {/* Dynamic Client Table Component */}
        <ApplicationTable jobs={jobs} />
      </div>
    </div>
  );
};

export default ApplicationsPage;
