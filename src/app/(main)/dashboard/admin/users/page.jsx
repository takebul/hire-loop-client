import { getUsersList } from "@/lib/api/users";
import React from "react";
import UserManagementTable from "./UserManagementTable";

const AdminUsersPage = async () => {
  // Pull structured array payload from your existing API helper wrapper
  const { users } = await getUsersList();

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Render UI state with props loaded */}
        <UserManagementTable users={users || []} />
      </div>
    </div>
  );
};

export default AdminUsersPage;
