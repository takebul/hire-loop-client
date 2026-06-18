"use client";

import React from "react";
import { Card, Button, Table } from "@heroui/react";

export default function RecentApplicationsTable({ applications = [] }) {
  // Helper to color-coordinate status pill badges dynamically
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "interviewing":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "reviewing":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "new":
        return "bg-zinc-500/10 text-zinc-300 border-zinc-500/20";
      case "rejected":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-300 border-zinc-500/20";
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header Wrapper Row */}
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-bold tracking-tight text-white">
          Recent Applications
        </h2>
        <Button
          size="sm"
          variant="ghost"
          className="text-xs text-zinc-400 hover:text-white border-none p-0 bg-transparent min-w-0"
        >
          View all
        </Button>
      </div>

      {/* Styled Board Frame Container */}
      <Card className="bg-[#121214] border border-[#232326] text-white rounded-2xl overflow-hidden shadow-2xl">
        <Card.Content className="p-0">
          {/* HeroUI v3 Native Table Setup */}
          <Table variant="secondary" className="w-full text-left table-auto">
            {/* Scroll Container handles overflow gracefully if columns exceed screen width */}
            <Table.ScrollContainer className="w-full overflow-x-auto">
              <Table.Content aria-label="Recent applications tracking table">
                {/* Header Columns definition */}
                <Table.Header className="border-b border-[#232326] text-zinc-500 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                  <Table.Column className="py-4 px-6">
                    Candidate Name
                  </Table.Column>
                  <Table.Column className="py-4 px-6">Role</Table.Column>
                  <Table.Column className="py-4 px-6">
                    Date Applied
                  </Table.Column>
                  <Table.Column className="py-4 px-6">Experience</Table.Column>
                  <Table.Column className="py-4 px-6 text-right">
                    Status
                  </Table.Column>
                </Table.Header>

                {/* Table Dynamic Data Rows mapping */}
                <Table.Body className="divide-y divide-[#1b1b1d]/60">
                  {applications.map((app, index) => (
                    <Table.Row
                      key={app.id || index}
                      className="group transition-colors duration-200 hover:bg-[#161619]/60 cursor-pointer"
                    >
                      {/* FIXED: Added whitespace-nowrap to prevent name splitting */}
                      <Table.Cell className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 flex-shrink-0 rounded-full bg-[#1d1d20] border border-[#2d2d32] text-zinc-400 font-medium text-sm flex items-center justify-center transition-transform group-hover:scale-105">
                            {app.name ? app.name.charAt(0) : "U"}
                          </div>
                          <span className="text-sm font-semibold text-white group-hover:text-zinc-200 transition-colors">
                            {app.name}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* FIXED: Added whitespace-nowrap to keep role on one line */}
                      <Table.Cell className="py-4 px-6 text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors whitespace-nowrap">
                        {app.role}
                      </Table.Cell>

                      {/* FIXED: Added whitespace-nowrap to keep dates aligned */}
                      <Table.Cell className="py-4 px-6 text-sm font-mono text-zinc-400 whitespace-nowrap">
                        {app.dateApplied}
                      </Table.Cell>

                      {/* FIXED: Added whitespace-nowrap */}
                      <Table.Cell className="py-4 px-6 text-sm text-zinc-400 whitespace-nowrap">
                        {app.experience}
                      </Table.Cell>

                      {/* FIXED: Status Alignment container */}
                      <Table.Cell className="py-4 px-6 text-right whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border capitalize tracking-wide ${getStatusStyles(app.status)}`}
                        >
                          {app.status}
                        </span>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </Card.Content>
      </Card>
    </div>
  );
}
