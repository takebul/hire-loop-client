import { getLoggedInRecruiterCompany } from "@/lib/api/companies";
import PostJobForm from "./PostJobForm";

const PostJobPage = async () => {
  const company = await getLoggedInRecruiterCompany();

  return (
    <div>
      <PostJobForm company={company} />
    </div>
  );
};

export default PostJobPage;
