import React from "react";
import { Table, Chip, Tooltip, Button, Avatar } from "@heroui/react";

import {
  EditIcon,
  DeleteIcon,
  EyeIcon,
  Globe,
  Home,
  Briefcase,
} from "lucide-react";

import { getCompanyJobs } from "@/lib/api/jobs";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";

const formatCurrency = (min, max, currency) => {
  const symbolMap = { USD: "$", EUR: "€", GBP: "£" };
  const symbol = symbolMap[currency] || currency;
  return `${symbol}${Number(min).toLocaleString()} - ${symbol}${Number(max).toLocaleString()}`;
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default async function RecruiterJobs() {
  const company = await getLoggedInRecruiterCompany();
  const jobs = (await getCompanyJobs(company._id)) || [];

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-6xl bg-gradient-to-b from-[#161618] to-[#111112] border border-[#232326] rounded-2xl p-6 md:p-8 shadow-2xl">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#232326] pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
              Manage Listings
            </h1>
            <p className="text-sm text-zinc-400">
              Review, track performance metric baselines, or update active
              company job placements.
            </p>
          </div>
          <div className="bg-[#1c1c1f] border border-[#2e2e33] px-4 py-2 rounded-xl text-center">
            <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold block">
              Total Posted
            </span>
            <span className="text-xl font-bold text-white">
              {jobs.length} Active Positions
            </span>
          </div>
        </div>

        {/* Data Matrix Workspace */}
        <Table className="bg-transparent">
          <Table.ScrollContainer>
            <Table.Content aria-label="Active Corporate Postings Matrix">
              <Table.Header>
                {/* FIX: Added isRowHeader here to meet WAI-ARIA and HeroUI v3 specification */}
                <Table.Column
                  isRowHeader
                  className="bg-[#121214] text-zinc-400 border-b border-[#232326] font-semibold text-xs uppercase tracking-wider py-4"
                >
                  Role Position
                </Table.Column>
                <Table.Column className="bg-[#121214] text-zinc-400 border-b border-[#232326] font-semibold text-xs uppercase tracking-wider py-4">
                  Setting Strategy
                </Table.Column>
                <Table.Column className="bg-[#121214] text-zinc-400 border-b border-[#232326] font-semibold text-xs uppercase tracking-wider py-4">
                  Compensation Range
                </Table.Column>
                <Table.Column className="bg-[#121214] text-zinc-400 border-b border-[#232326] font-semibold text-xs uppercase tracking-wider py-4">
                  Closing Term
                </Table.Column>
                <Table.Column className="bg-[#121214] text-zinc-400 border-b border-[#232326] font-semibold text-xs uppercase tracking-wider py-4">
                  Lifecycle State
                </Table.Column>
                <Table.Column className="bg-[#121214] text-zinc-400 border-b border-[#232326] font-semibold text-xs uppercase tracking-wider py-4 align-middle text-center">
                  Control Panel
                </Table.Column>
              </Table.Header>

              <Table.Body
                emptyContent={
                  <div className="text-zinc-500 py-12 text-center w-full">
                    No active job opportunities found. Create one above!
                  </div>
                }
              >
                {jobs.map((job) => (
                  <Table.Row
                    key={job._id || job.id}
                    className="border-b border-[#1b1b1d] hover:bg-zinc-900/30 transition-colors group"
                  >
                    {/* Column 1: Role Position */}
                    <Table.Cell className="py-4">
                      <div className="inline-flex items-center gap-3">
                        <Avatar className="w-10 h-10 bg-[#1d1d21] border border-[#2d2d33] rounded-lg text-zinc-300 flex-shrink-0">
                          <Avatar.Fallback>
                            <Briefcase className="w-4 h-4 text-zinc-400" />
                          </Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col items-start">
                          <span className="font-semibold text-sm text-zinc-200 group-hover:text-white transition-colors">
                            {job.jobTitle}
                          </span>
                          <span className="text-xs text-zinc-500 tracking-wide mt-0.5">
                            {job.jobCategory
                              ? job.jobCategory.toUpperCase()
                              : "GENERAL"}
                          </span>
                        </div>
                      </div>
                    </Table.Cell>

                    {/* Column 2: Setting Strategy */}
                    <Table.Cell className="py-4">
                      <div className="flex flex-col gap-1">
                        <span className="inline-flex items-center gap-1.5 text-sm text-zinc-300 font-medium">
                          {job.isRemote ? (
                            <>
                              <Home className="w-3.5 h-3.5 text-indigo-400" />{" "}
                              Remote
                            </>
                          ) : (
                            <>
                              <Globe className="w-3.5 h-3.5 text-amber-400" />{" "}
                              On-Site
                            </>
                          )}
                        </span>
                        {!job.isRemote && (
                          <span className="text-xs text-zinc-500 pl-5 truncate max-w-[150px]">
                            {job.city}, {job.country}
                          </span>
                        )}
                      </div>
                    </Table.Cell>

                    {/* Column 3: Compensation Range */}
                    <Table.Cell className="py-4 font-mono text-xs text-zinc-300">
                      <div className="flex flex-col gap-0.5">
                        <span>
                          {formatCurrency(
                            job.salaryMin,
                            job.salaryMax,
                            job.currency || "USD",
                          )}
                        </span>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wide font-sans">
                          {job.jobType || "Full-time"}
                        </span>
                      </div>
                    </Table.Cell>

                    {/* Column 4: Closing Term */}
                    <Table.Cell className="py-4 text-sm text-zinc-400 font-medium">
                      {formatDate(job.deadline)}
                    </Table.Cell>

                    {/* Column 5: Lifecycle State */}
                    <Table.Cell className="py-4">
                      <Chip
                        size="sm"
                        variant="flat"
                        className={
                          job.status === "active"
                            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2"
                            : "bg-zinc-800 text-zinc-400 border border-zinc-700 px-2"
                        }
                      >
                        {job.status ? job.status.toUpperCase() : "ACTIVE"}
                      </Chip>
                    </Table.Cell>

                    {/* Column 6: Control Panel (Actions) */}
                    <Table.Cell className="py-4 align-middle">
                      <div className="relative flex items-center justify-center gap-2">
                        <Tooltip
                          content="View public listing"
                          delay={300}
                          closeDelay={0}
                          className="bg-[#161618] text-white border border-[#232326] rounded-xl text-xs"
                        >
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            className="text-zinc-400 hover:text-white min-w-8 h-8 rounded-lg hover:bg-zinc-800/60"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </Button>
                        </Tooltip>

                        <Tooltip
                          content="Edit posting details"
                          delay={300}
                          closeDelay={0}
                          className="bg-[#161618] text-white border border-[#232326] rounded-xl text-xs"
                        >
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            className="text-zinc-400 hover:text-amber-400 min-w-8 h-8 rounded-lg hover:bg-zinc-800/60"
                          >
                            <EditIcon className="w-4 h-4" />
                          </Button>
                        </Tooltip>

                        <Tooltip
                          content="Remove listing permanently"
                          color="danger"
                          delay={300}
                          closeDelay={0}
                          className="rounded-xl text-xs font-medium"
                        >
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            className="text-zinc-400 hover:text-red-500 min-w-8 h-8 rounded-lg hover:bg-red-500/10"
                          >
                            <DeleteIcon className="w-4 h-4" />
                          </Button>
                        </Tooltip>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
}
