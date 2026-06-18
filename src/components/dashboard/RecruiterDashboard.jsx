import React from "react";
import StatsGrid from "@/components/StatsGrid";
// Gravity UI Icon Imports
import { DocumentText, Persons, Bolt, CircleCheck } from "@gravity-ui/icons";

export default function RecruiterDashboard() {
  const recruiterStats = [
    {
      id: "job-posts",
      title: "Total Job Posts",
      value: "48",
      icon: DocumentText,
    },
    {
      id: "applicants",
      title: "Total Applicants",
      value: "1,284",
      icon: Persons,
    },
    { id: "active-jobs", title: "Active Jobs", value: "18", icon: Bolt },
    { id: "jobs-closed", title: "Jobs Closed", value: "32", icon: CircleCheck },
  ];

  return (
    <div className="p-8 bg-[#09090b] min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <StatsGrid statsData={recruiterStats} />
      </div>
    </div>
  );
}
