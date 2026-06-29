"use server";

import { protectedFetch } from "../core/server";

export const getApplicationsByApplicant = async (applicantId) => {
  return protectedFetch(`/api/applications?applicantId=${applicantId}`);
};
