"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getCompanyJobs = async (companyId, status = "active") => {
  const res = await fetch(
    `${baseUrl}/api/jobs?companyName=${companyId}&status=${status}`,
  );
  return res.json();
};
