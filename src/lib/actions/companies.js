"use server";

import { serverPost } from "../core/server";

export const createCompany = async (newCompanyData) => {
  return serverPost("/api/companies", newCompanyData);
};

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const createCompany = async (newCompanyData) => {
//   const res = await fetch(`${baseUrl}/api/companies`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newCompanyData),
//   });

//   return res.json();
// };
