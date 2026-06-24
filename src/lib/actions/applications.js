"use server";

import { serverMutation } from "../core/server";

export const submitApplication = async (applicationData) => {
  return serverMutation("/api/applications", applicationData);
};
