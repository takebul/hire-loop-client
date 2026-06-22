import { getRecruiterCompany } from "@/lib/api/companies";
import CompanyProfile from "./CompanyProfile";
import { getUserSession } from "@/lib/core/session";

const RegisterCompanyPage = async () => {
  const user = await getUserSession();
  const company = await getRecruiterCompany(user?.id);

  console.log(company, user);

  return (
    <div>
      <CompanyProfile recruiter={user} recruiterCompany={company} />
    </div>
  );
};

export default RegisterCompanyPage;
