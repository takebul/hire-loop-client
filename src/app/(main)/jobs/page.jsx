import JobFilterWrapper from "@/components/jobs/JobFilterWrapper";
import { getJobs } from "@/lib/api/jobs";

// This stays a 100% Server Component for database calls and optimized loading velocities
export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <main className="bg-black min-h-screen py-6">
      <JobFilterWrapper initialJobs={jobs} />
    </main>
  );
}
