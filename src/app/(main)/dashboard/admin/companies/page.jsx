import { getCompanies } from "@/lib/api/companies";
import React from "react";
import CompanyApprovalTable from "./CompanyApprovalTable";

const AdminCompaniesPage = async () => {
  const companies = await getCompanies();

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Company Table Display */}
        <CompanyApprovalTable companies={companies} />
      </div>
    </div>
  );
};

export default AdminCompaniesPage;
