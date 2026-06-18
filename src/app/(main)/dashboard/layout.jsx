import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 mx-10">{children}</div>
    </div>
  );
};

export default DashboardLayout;
