import React from "react";

// Gravity UI Icon Samples
import { Globe, Shield, Flame, Thunderbolt } from "@gravity-ui/icons";
import RecentApplicationsTable from "./RecentApplicationsTable";
import TopCompaniesList from "./TopCompaniesList";

export default function DashboardOverviewPage() {
  // Mock Data Array for Left Table Box
  const mockApplications = [
    {
      id: 1,
      name: "Julianne Moore",
      role: "Senior Product Designer",
      dateApplied: "Oct 24, 2023",
      experience: "6 years",
      status: "interviewing",
    },
    {
      id: 2,
      name: "Robert Downey",
      role: "Backend Engineer",
      dateApplied: "Oct 23, 2023",
      experience: "4 years",
      status: "new",
    },
    {
      id: 3,
      name: "Emma Stone",
      role: "Marketing Lead",
      dateApplied: "Oct 22, 2023",
      experience: "8 years",
      status: "reviewing",
    },
    {
      id: 4,
      name: "Chris Pratt",
      role: "Product Manager",
      dateApplied: "Oct 21, 2023",
      experience: "5 years",
      status: "rejected",
    },
  ];

  // Mock Data Array for Right Sidebar Box
  const mockCompanies = [
    {
      id: 1,
      name: "Google Inc.",
      category: "Technology",
      location: "Mountain View",
      activeJobsCount: 24,
      icon: Globe,
    },
    {
      id: 2,
      name: "Meta Platforms",
      category: "Social Media",
      location: "Menlo Park",
      activeJobsCount: 18,
      icon: Shield,
    },
    {
      id: 3,
      name: "Stripe",
      category: "Fintech",
      location: "San Francisco",
      activeJobsCount: 12,
      icon: Flame,
    },
    {
      id: 4,
      name: "Tesla",
      category: "Automotive",
      location: "Austin",
      activeJobsCount: 31,
      icon: Thunderbolt,
    },
  ];

  return (
    <div className=" my-10 flex flex-col justify-start">
      <div className=" w-full grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Side 2-Columns Spacing Block for the Application Stream */}
        <div className="lg:col-span-2 w-full">
          <RecentApplicationsTable applications={mockApplications} />
        </div>

        {/* Right Side 1-Column Spacing Block for the Company Counter Cards */}
        <div className="w-full">
          <TopCompaniesList companies={mockCompanies} />
        </div>
      </div>
    </div>
  );
}
