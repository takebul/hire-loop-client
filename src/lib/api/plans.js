import { serverFetch } from "../core/server";

export const getPlanById = async (planId) => {
  return serverFetch(`/api/plans?planId=${planId}`);
};
