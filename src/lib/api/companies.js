import { serverGet } from "../core/server";
import { getUserSession } from "../core/session";

export const getRecruiterCompany = async (recruiterId) => {
  return serverGet(`/api/my/companies?recruiterId=${recruiterId}`);
};

export const getLoggedInRecruiterCompany = async () => {
  const user = await getUserSession();
  return getRecruiterCompany(user?.id);
};
