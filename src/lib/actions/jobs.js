"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const createJob = async (newJobData) => {
  const res = await fetch(`${baseUrl}/api/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newJobData),
  });
  return await res.json();
};
