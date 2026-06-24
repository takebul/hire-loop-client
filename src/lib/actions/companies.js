"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const createCompany = async (newCompanyData) => {
  return serverMutation("/api/companies", newCompanyData);
};

export const updateCompany = async (id, updateCompanyData) => {
  const result = serverMutation(
    `/api/companies/${id}`,
    updateCompanyData,
    "PATCH",
  );
  revalidatePath("/dashboard/admin/companies");

  return result;
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
