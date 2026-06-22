"use server";

import { serverGet } from "../core/server";

export const getApplicationsByApplicant = async (applicantId) => {
  return serverGet(`/api/applications?applicantId=${applicantId}`);
};
