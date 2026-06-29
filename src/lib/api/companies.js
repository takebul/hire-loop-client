import { protectedFetch, serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

export const getCompanies = async () => {
  return protectedFetch(`/api/companies`);
};

export const getRecruiterCompany = async (recruiterId) => {
  return serverFetch(`/api/my/companies?recruiterId=${recruiterId}`);
};

export const getLoggedInRecruiterCompany = async () => {
  const user = await getUserSession();
  return getRecruiterCompany(user?.id);
};
