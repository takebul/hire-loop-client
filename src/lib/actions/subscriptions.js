import { serverPost } from "../core/server";

export const createSubscriptions = async (subsInfo) => {
  return serverPost("/api/subscriptions", subsInfo);
};
