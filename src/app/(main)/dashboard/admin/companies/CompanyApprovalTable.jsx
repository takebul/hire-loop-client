"use client";

import React from "react";
import { Table } from "@heroui/react";
import { updateCompany } from "@/lib/actions/companies";
import toast from "react-hot-toast";
import { ClipboardCheck, ShieldCheck, Ban } from "lucide-react";

export default function CompanyApprovalTable({ companies = [] }) {
  // Compute metrics dynamically from the data prop
  const pendingCount = companies.filter(
    (c) => !c.status || c.status.toLowerCase() === "pending",
  ).length;
  const approvedCount = companies.filter(
    (c) => c.status?.toLowerCase() === "approved",
  ).length;
  const rejectedCount = companies.filter(
    (c) => c.status?.toLowerCase() === "rejected",
  ).length;

  // Format dates consistently
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    // Handle standard string date or MongoDB nested object date formats safely
    const rawDate =
      typeof dateString === "object" && dateString?.$date
        ? dateString.$date
        : dateString;
    const date = new Date(rawDate);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  // Status Styling Handler
  const renderStatus = (status) => {
    const safeStatus = status || "Pending";

    let dotColor = "bg-amber-500";
    let textColor = "text-amber-500";

    if (safeStatus.toLowerCase() === "approved") {
      dotColor = "bg-emerald-500";
      textColor = "text-emerald-500";
    } else if (safeStatus.toLowerCase() === "rejected") {
      dotColor = "bg-rose-500";
      textColor = "text-rose-500";
    }

    return (
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${dotColor}`} />
        <span className={`text-sm font-medium ${textColor}`}>
          {safeStatus.charAt(0).toUpperCase() + safeStatus.slice(1)}
        </span>
      </div>
    );
  };

  // Action Handlers
  const handleApprove = async (id) => {
    const result = await updateCompany(id, { status: "Approved" });
    if (result?.modifiedCount) {
      toast.success("Company approval successful");
    }
    console.log("Approve company:", id, result);
  };

  const handleReject = async (id) => {
    const result = await updateCompany(id, { status: "Rejected" });
    if (result?.modifiedCount) {
      toast.success("Company rejection successful");
    }
    console.log("Reject company:", id, result);
  };

  return (
    <div className="w-full space-y-6 text-white">
      {/* Overview Stat Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Pending Review */}
        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 flex flex-col justify-between min-h-[128px]">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
              <ClipboardCheck size={20} />
            </div>
            <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
              +12% vs last week
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
              Pending Review
            </p>
            <p className="text-3xl font-bold text-neutral-100 mt-1">
              {pendingCount}
            </p>
          </div>
        </div>

        {/* Card 2: Approved Partners */}
        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 flex flex-col justify-between min-h-[128px]">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
              <ShieldCheck size={20} />
            </div>
            <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
              +5% vs last week
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
              Approved Partners
            </p>
            <p className="text-3xl font-bold text-neutral-100 mt-1">
              {approvedCount}
            </p>
          </div>
        </div>

        {/* Card 3: Total Rejections */}
        <div className="bg-[#121212] border border-neutral-800 rounded-xl p-5 flex flex-col justify-between min-h-[128px]">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
              <Ban size={20} />
            </div>
            <span className="text-xs font-medium text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
              Stable
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
              Total Rejections
            </p>
            <p className="text-3xl font-bold text-neutral-100 mt-1">
              {rejectedCount}
            </p>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="w-full bg-[#121212] rounded-xl border border-neutral-800 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-100">
              Company Registrations
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              Review and manage corporate entity access requests for the
              ecosystem.
            </p>
          </div>
        </div>

        <Table className="w-full">
          <Table.ScrollContainer>
            <Table.Content aria-label="Company registrations management table">
              <Table.Header className="border-b border-neutral-800">
                <Table.Column
                  isRowHeader
                  className="text-left text-xs font-semibold uppercase tracking-wider text-neutral-400 pb-3"
                >
                  Company Name
                </Table.Column>
                <Table.Column className="text-left text-xs font-semibold uppercase tracking-wider text-neutral-400 pb-3">
                  Website
                </Table.Column>
                <Table.Column className="text-left text-xs font-semibold uppercase tracking-wider text-neutral-400 pb-3">
                  Industry
                </Table.Column>
                <Table.Column className="text-left text-xs font-semibold uppercase tracking-wider text-neutral-400 pb-3">
                  Jobs Count
                </Table.Column>
                <Table.Column className="text-left text-xs font-semibold uppercase tracking-wider text-neutral-400 pb-3">
                  Status
                </Table.Column>
                <Table.Column className="text-left text-xs font-semibold uppercase tracking-wider text-neutral-400 pb-3">
                  Date Submitted
                </Table.Column>
                <Table.Column className="text-right text-xs font-semibold uppercase tracking-wider text-neutral-400 pb-3 pr-4">
                  Actions
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {companies.map((company, ind) => {
                  const statusLower =
                    company.status?.toLowerCase() || "pending";
                  const companyId = company._id?.$oid || company._id;

                  return (
                    <Table.Row
                      key={companyId || ind}
                      className="border-b border-neutral-900 hover:bg-neutral-900/40 transition-colors"
                    >
                      {/* Company Name & Letter Avatar */}
                      <Table.Cell className="py-4 font-medium text-neutral-200">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded bg-neutral-800 text-neutral-400 flex items-center justify-center text-xs font-bold uppercase">
                            {company.companyName?.substring(0, 2) || "CO"}
                          </div>
                          <span>
                            {company.companyName || "Unknown Company"}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* Website */}
                      <Table.Cell className="py-4 text-neutral-400 text-sm">
                        {company.website ? (
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline text-blue-400"
                          >
                            {company.website.replace("https://", "")}
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </Table.Cell>

                      {/* Industry Badge */}
                      <Table.Cell className="py-4">
                        <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-neutral-800 text-neutral-300 rounded-full capitalize">
                          {company.industry || "General"}
                        </span>
                      </Table.Cell>
                      {/* Jobs Count */}
                      <Table.Cell className="py-4">
                        <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-neutral-800 text-neutral-300 rounded-full capitalize">
                          {company.jobCount || "0"}
                        </span>
                      </Table.Cell>

                      {/* Dynamic Status Element */}
                      <Table.Cell className="py-4">
                        {renderStatus(company.status)}
                      </Table.Cell>

                      {/* Formatted Date */}
                      <Table.Cell className="py-4 text-neutral-400 text-sm">
                        {formatDate(company.createdAt)}
                      </Table.Cell>

                      {/* Action Buttons */}
                      <Table.Cell className="py-4 text-right pr-4">
                        <div className="flex items-center justify-end gap-2">
                          {statusLower !== "approved" && (
                            <button
                              onClick={() => handleApprove(companyId)}
                              className="px-3 py-1.5 text-xs font-medium rounded border border-emerald-900/50 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-900/40 transition"
                            >
                              Approve
                            </button>
                          )}
                          {statusLower !== "rejected" && (
                            <button
                              onClick={() => handleReject(companyId)}
                              className="px-3 py-1.5 text-xs font-medium rounded border border-rose-900/50 bg-rose-950/20 text-rose-500 hover:bg-rose-950/40 transition"
                            >
                              Reject
                            </button>
                          )}
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
          <Table.Footer>
            <div className="p-4 flex items-center justify-between text-xs text-neutral-500 border-t border-neutral-900 mt-2">
              <div>
                Showing{" "}
                <span className="text-neutral-300 font-medium">
                  1-{companies.length}
                </span>{" "}
                of{" "}
                <span className="text-neutral-300 font-medium">
                  {companies.length}
                </span>{" "}
                companies
              </div>
            </div>
          </Table.Footer>
        </Table>
      </div>
    </div>
  );
}
