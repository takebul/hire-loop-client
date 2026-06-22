import { serverGet } from "../core/server";

export const getPlanById = async (planId) => {
  return serverGet(`/api/plans?plan_id=${planId}`);
};
