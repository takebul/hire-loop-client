import React from "react";
import StatsGrid from "@/components/StatsGrid";
import { Briefcase, FileText, Star, Eye } from "@gravity-ui/icons";

export default function JobSeekerDashboard() {
  const seekerStats = [
    { id: "sent", title: "Applications Sent", value: "14", icon: Briefcase },
    { id: "resumes", title: "Resumes Active", value: "2", icon: FileText },
    { id: "views", title: "Profile Views", value: "95", icon: Eye },
    { id: "saved", title: "Saved Positions", value: "6", icon: Star },
  ];

  return (
    <div className="p-8 bg-[#09090b] min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <StatsGrid statsData={seekerStats} />
      </div>
    </div>
  );
}
