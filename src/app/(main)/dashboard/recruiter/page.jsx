"use client";
import DashboardOverviewPage from "@/components/dashboard/DashboardOverviewPage";
import StatsGrid from "@/components/dashboard/StatsGrid";
import { useSession } from "@/lib/auth-client";
import { Persons, CircleCheck, Thunderbolt } from "@gravity-ui/icons";
import { GrDocumentText } from "react-icons/gr";

const RecruiterDashboardHomePage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  const recruiterStats = [
    {
      id: "job-posts",
      title: "Total Job Posts",
      value: "48",
      icon: GrDocumentText,
    },
    {
      id: "applicants",
      title: "Total Applicants",
      value: "1,284",
      icon: Persons,
    },
    { id: "active-jobs", title: "Active Jobs", value: "18", icon: Thunderbolt },
    { id: "jobs-closed", title: "Jobs Closed", value: "32", icon: CircleCheck },
  ];

  const user = session?.user;

  return (
    <div>
      <h2 className="text-3xl font-semibold my-6 mb-10">
        Welcome back, {user?.name}
      </h2>
      <StatsGrid statsData={recruiterStats} />
      <div className="pt-10">
        <DashboardOverviewPage />
      </div>
    </div>
  );
};

export default RecruiterDashboardHomePage;
