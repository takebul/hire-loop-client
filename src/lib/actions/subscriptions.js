import { serverMutation } from "../core/server";

export const createSubscriptions = async (subsInfo) => {
  return serverMutation("/api/subscriptions", subsInfo);
};
