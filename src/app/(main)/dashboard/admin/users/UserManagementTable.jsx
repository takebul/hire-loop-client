"use client";

import React, { useState, useEffect } from "react";
import {
  Person,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "@gravity-ui/icons";
import { updateUserRole } from "@/lib/actions/users";

export default function UserManagementTable({ users: initialUsers = [] }) {
  // Sync prop array to local state for handling immediate UI updates
  const [users, setUsers] = useState(initialUsers);

  // Modal confirmation states
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingChange, setPendingChange] = useState(null); // stores { userId, userName, newRole }
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  // Helper function to format MongoDB ISO dates to 'MMM DD, YYYY'
  const formatDate = (dateObj) => {
    if (!dateObj) return "N/A";
    const rawDate = dateObj.$date || dateObj;
    const date = new Date(rawDate);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  // Safe accessor for MongoDB OID or plain string IDs
  const getUserId = (user, fallbackIndex) => {
    return user._id?.$oid || user._id || user.id || `mock-${fallbackIndex}`;
  };

  // Trigger confirmation modal instead of executing directly
  const initiateRoleChange = (userId, userName, newRole) => {
    setPendingChange({ userId, userName, newRole });
    setIsConfirmOpen(true);
  };

  // Execute server action if confirmed
  const confirmRoleChange = async () => {
    if (!pendingChange) return;

    const { userId, newRole } = pendingChange;
    setIsUpdating(true);

    // Guard: Check if this is local mock data to prevent throwing 404 API Error
    if (String(userId).startsWith("mock-") || String(userId).length < 5) {
      console.warn(
        `[Mock Data] Simulating role transition to "${newRole}" for ID: ${userId}`,
      );

      setUsers((prevUsers) =>
        prevUsers.map((u, idx) =>
          getUserId(u, idx) === userId ? { ...u, role: newRole } : u,
        ),
      );

      setIsUpdating(false);
      setIsConfirmOpen(false);
      setPendingChange(null);
      return;
    }

    try {
      // Server Action runs -> updates DB
      const result = await updateUserRole(userId, newRole);

      // Update local view state instantly
      setUsers((prevUsers) =>
        prevUsers.map((u, idx) =>
          getUserId(u, idx) === userId ? { ...u, role: newRole } : u,
        ),
      );
    } catch (error) {
      console.error("Failed to update user role:", error);
    } finally {
      setIsUpdating(false);
      setIsConfirmOpen(false);
      setPendingChange(null);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    console.log(`Status change triggered for ${userId} to ${newStatus}`);
  };

  const handleDelete = async (userId) => {
    console.log(`Delete triggered for user ${userId}`);
  };

  return (
    <div className="relative w-full">
      <div className="w-full bg-[#1e1e1e] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl font-sans">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-zinc-400">
            {/* Header */}
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 font-medium select-none">
                <th className="py-5 px-6 font-normal">User Name</th>
                <th className="py-5 px-6 font-normal">Email Address</th>
                <th className="py-5 px-6 font-normal">Role</th>
                <th className="py-5 px-6 font-normal">Join Date</th>
                <th className="py-5 px-6 font-normal">Status</th>
                <th className="py-5 px-6 font-normal text-right">Actions</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-zinc-800/60 bg-[#1e1e1e]">
              {users.map((user, idx) => {
                const userId = getUserId(user, idx);
                const userRole = user.role?.toLowerCase() || "seeker";
                const userStatus = user.status || "Active";

                return (
                  <tr
                    key={userId}
                    className="hover:bg-zinc-900/40 transition-colors duration-150"
                  >
                    {/* User Name + Initial Avatar */}
                    <td className="py-4 px-6 font-medium text-zinc-200 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-700/60 flex items-center justify-center text-xs text-zinc-300 font-bold tracking-wider">
                          {user.name
                            ? user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                            : "U"}
                        </div>
                        <span>{user.name || "Unknown User"}</span>
                      </div>
                    </td>

                    {/* Email Address */}
                    <td className="py-4 px-6 text-zinc-400 whitespace-nowrap">
                      {user.email || "N/A"}
                    </td>

                    {/* Role Badge */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      {userRole === "recruiter" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-zinc-100 text-zinc-900 shadow-sm">
                          <Briefcase width={12} height={12} />
                          Recruiter
                        </span>
                      ) : userRole === "admin" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-purple-950/40 text-purple-300 border border-purple-800/50 capitalize">
                          Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-zinc-800/50 text-zinc-400 border border-zinc-700/50">
                          <Person width={12} height={12} />
                          Seeker
                        </span>
                      )}
                    </td>

                    {/* Join Date */}
                    <td className="py-4 px-6 text-zinc-400 whitespace-nowrap">
                      {formatDate(user.createdAt)}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      {userStatus === "Active" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full bg-emerald-950/30 text-emerald-400 border border-emerald-900/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full bg-red-950/30 text-red-400 border border-red-900/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          Suspended
                        </span>
                      )}
                    </td>

                    {/* Actions Column */}
                    <td className="py-4 px-6 text-right whitespace-nowrap text-xs font-medium">
                      <div className="flex items-center justify-end gap-4">
                        {userRole !== "admin" && (
                          <button
                            onClick={() =>
                              initiateRoleChange(userId, user.name, "admin")
                            }
                            className="text-zinc-400 hover:text-white transition-colors"
                          >
                            Make Admin
                          </button>
                        )}
                        {userRole !== "recruiter" && (
                          <button
                            onClick={() =>
                              initiateRoleChange(userId, user.name, "recruiter")
                            }
                            className="text-zinc-400 hover:text-white transition-colors"
                          >
                            Make Recruiter
                          </button>
                        )}
                        {userRole !== "seeker" && (
                          <button
                            onClick={() =>
                              initiateRoleChange(userId, user.name, "seeker")
                            }
                            className="text-zinc-400 hover:text-white transition-colors"
                          >
                            Make Seeker
                          </button>
                        )}

                        {/* Suspension Toggle / Delete Operations */}
                        {userStatus === "Active" ? (
                          <button
                            onClick={() =>
                              handleStatusChange(userId, "Suspended")
                            }
                            className="text-red-500 hover:text-red-400 transition-colors pl-2 border-l border-zinc-800"
                          >
                            Suspend
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange(userId, "Active")
                              }
                              className="text-emerald-500 hover:text-emerald-400 transition-colors pl-2 border-l border-zinc-800"
                            >
                              Activate
                            </button>
                            <button
                              onClick={() => handleDelete(userId)}
                              className="text-zinc-400 hover:text-red-400 transition-colors"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 text-xs text-zinc-500 select-none">
          <div>
            Showing 1 to {users.length} of {users.length || "12,842"} users
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1 hover:text-zinc-300 transition-colors">
              <ChevronLeft width={16} height={16} />
            </button>
            <button className="w-6 h-6 flex items-center justify-center bg-white text-zinc-900 rounded font-medium">
              1
            </button>
            <button className="w-6 h-6 flex items-center justify-center hover:bg-zinc-800/60 rounded text-zinc-400 transition-colors">
              2
            </button>
            <button className="w-6 h-6 flex items-center justify-center hover:bg-zinc-800/60 rounded text-zinc-400 transition-colors">
              3
            </button>
            <span className="px-1 text-zinc-600">...</span>
            <button className="w-fit px-1.5 h-6 flex items-center justify-center hover:bg-zinc-800/60 rounded text-zinc-400 transition-colors">
              1285
            </button>
            <button className="p-1 hover:text-zinc-300 transition-colors">
              <ChevronRight width={16} height={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal Overlay */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60">
          <div className="w-full max-w-sm bg-[#1e1e1e] border border-zinc-800 rounded-xl p-6 shadow-2xl space-y-6">
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-zinc-100">
                Confirm Role Change
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Are you sure you want to change the role of{" "}
                <span className="text-zinc-200 font-medium">
                  {pendingChange?.userName}
                </span>{" "}
                to{" "}
                <span className="text-zinc-200 font-medium capitalize">
                  {pendingChange?.newRole}
                </span>
                ? This alters system access and application flow parameters
                permissions immediately.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 text-xs font-medium">
              <button
                disabled={isUpdating}
                onClick={() => {
                  setIsConfirmOpen(false);
                  setPendingChange(null);
                }}
                className="px-4 py-2 text-zinc-400 hover:text-zinc-200 bg-zinc-800/40 hover:bg-zinc-800 border border-zinc-800 rounded-md transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                disabled={isUpdating}
                onClick={confirmRoleChange}
                className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors shadow-lg shadow-indigo-600/10 disabled:opacity-50 min-w-[76px] flex items-center justify-center"
              >
                {isUpdating ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
