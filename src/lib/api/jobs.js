"use server";

import { serverGet } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getJobs = async () => {
  return serverGet("/api/jobs");
};

export const getJobById = async (jobId) => {
  return serverGet(`/api/jobs/${jobId}`);
};

export const getCompanyJobs = async (companyId, status = "active") => {
  const res = await fetch(
    `${baseUrl}/api/jobs?companyName=${companyId}&status=${status}`,
  );
  return res.json();
};
