"use client";

import React from "react";
import { Table, Pagination, Button } from "@heroui/react";
import {
  Briefcase,
  Terminal,
  Paintbrush,
  Database,
  Cloud,
  Cpu,
} from "lucide-react";

const getJobIcon = (title = "") => {
  const t = title.toLowerCase();
  if (
    t.includes("frontend") ||
    t.includes("backend") ||
    t.includes("developer")
  )
    return <Terminal className="w-4 h-4 text-zinc-400" />;
  if (t.includes("design") || t.includes("product"))
    return <Paintbrush className="w-4 h-4 text-zinc-400" />;
  if (t.includes("data") || t.includes("scientist"))
    return <Database className="w-4 h-4 text-zinc-400" />;
  if (t.includes("cloud") || t.includes("architect"))
    return <Cloud className="w-4 h-4 text-zinc-400" />;
  if (t.includes("ai") || t.includes("research") || t.includes("machine"))
    return <Cpu className="w-4 h-4 text-zinc-400" />;
  return <Briefcase className="w-4 h-4 text-zinc-400" />;
};

const formatTimeAgo = (dateString) => {
  if (!dateString) return "Recent";
  const now = new Date();
  const created = new Date(dateString);
  const diffInMs = now - created;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  if (diffInHours < 1) return "Just now";
  if (diffInHours < 24)
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "1 day ago";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30)
    return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? "s" : ""} ago`;

  return created.toLocaleDateString();
};

const StatusChip = ({ status = "Applied" }) => {
  const styles = {
    Applied: "border-zinc-600 text-zinc-300",
    Review: "border-amber-600/60 text-amber-500",
    Shortlisted: "border-emerald-600/60 text-emerald-500",
    Rejected: "border-rose-600/60 text-rose-500",
    Offered: "border-zinc-400 text-zinc-200",
  };

  return (
    <span
      className={`px-2.5 py-0.5 text-xs font-medium border bg-transparent rounded-full ${styles[status] || styles["Applied"]}`}
    >
      {status}
    </span>
  );
};

const ApplicationTable = ({ jobs = [] }) => {
  return (
    <div className="bg-[#1e1e1e] border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
      <Table className="w-full text-left border-collapse">
        <Table.ScrollContainer>
          <Table.Content aria-label="Job applications progress tracking dashboard">
            <Table.Header className="border-b border-zinc-800 bg-[#1e1e1e]">
              <Table.Column
                isRowHeader
                className="text-zinc-400 font-medium py-4 px-6 text-sm"
              >
                Job Title
              </Table.Column>
              <Table.Column className="text-zinc-400 font-medium py-4 px-6 text-sm">
                Company
              </Table.Column>
              <Table.Column className="text-zinc-400 font-medium py-4 px-6 text-sm">
                Applied
              </Table.Column>
              <Table.Column className="text-zinc-400 font-medium py-4 px-6 text-sm">
                Status
              </Table.Column>
              <Table.Column className="text-zinc-400 font-medium py-4 px-6 text-sm text-right">
                Action
              </Table.Column>
            </Table.Header>

            <Table.Body className="divide-y divide-zinc-800/50">
              {jobs.map((item, ind) => (
                <Table.Row
                  key={item._id?.$oid || ind}
                  className="hover:bg-zinc-800/15 transition-colors"
                >
                  <Table.Cell className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#262626] flex items-center justify-center border border-zinc-700/40">
                        {getJobIcon(item.jobTitle)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-100">
                          {item.jobTitle || "Backend Developer"}
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          Full-time • Remote
                        </p>
                      </div>
                    </div>
                  </Table.Cell>

                  <Table.Cell className="py-4 px-6 text-sm text-zinc-300">
                    {item.companyName || "Company Title"}
                  </Table.Cell>

                  <Table.Cell className="py-4 px-6 text-sm text-zinc-400">
                    {formatTimeAgo(item.createdAt?.$date)}
                  </Table.Cell>

                  <Table.Cell className="py-4 px-6">
                    <StatusChip status={item.status || "Applied"} />
                  </Table.Cell>

                  <Table.Cell className="py-4 px-6 text-right">
                    <Button
                      size="sm"
                      variant="light"
                      className="text-zinc-400 hover:text-zinc-100 text-sm font-medium bg-transparent min-w-0 px-2"
                    >
                      Details
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      {/* Pagination control footer bar */}
      <div className="border-t border-zinc-800 px-6 py-4 flex items-center justify-between bg-[#1e1e1e]">
        <span className="text-xs text-zinc-500">
          Showing 1-{jobs.length > 5 ? 5 : jobs.length} of {jobs.length}{" "}
          applications
        </span>
        <Pagination
          total={Math.ceil(jobs.length / 5) || 3}
          initialPage={1}
          size="sm"
          radius="md"
          className={{
            wrapper: "gap-1 bg-transparent shadow-none",
            item: "bg-transparent text-zinc-400 text-xs min-w-7 h-7 hover:bg-zinc-800 rounded-md",
            cursor:
              "bg-white text-black font-medium text-xs min-w-7 h-7 rounded-md",
          }}
        />
      </div>
    </div>
  );
};

export default ApplicationTable;
