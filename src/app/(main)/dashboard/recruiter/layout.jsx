import { requireRole } from "@/lib/core/session";

const RecruiterLayout = async ({ children }) => {
  await requireRole("recruiter");
  return <div>{children}</div>;
};

export default RecruiterLayout;
