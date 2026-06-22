"use server";

import { serverPost } from "../core/server";

export const submitApplication = async (applicationData) => {
  return serverPost("/api/applications", applicationData);
};
