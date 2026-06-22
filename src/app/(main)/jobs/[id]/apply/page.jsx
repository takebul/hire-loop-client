import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import JobApply from "./JobApply";
import { getApplicationsByApplicant } from "@/lib/api/applications";
import Link from "next/link";
import { ShieldAlert, CreditCard, Sparkles, Lock } from "lucide-react";
import { getPlanById } from "@/lib/api/plans";

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();

  if (!user) {
    redirect(`/signin?redirect=/jobs/${id}/apply`);
  }

  if (user?.role !== "seeker") {
    return (
      <div className="w-full min-h-screen bg-zinc-950 flex flex-col justify-center items-center text-white p-6">
        <div className="max-w-md text-center p-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl">
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-6 h-6 text-amber-400" />
          </div>
          <p className="text-zinc-200 font-semibold text-lg mb-2">
            Access Restrained
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Only designated job seekers can apply for open positions. Please
            register or sign in with a candidate account to proceed.
          </p>
        </div>
      </div>
    );
  }

  const applications = await getApplicationsByApplicant(user?.id);

  // This layout scales dynamically based on whatever plan config is fetched

  const plan = await getPlanById(user?.plan || "seeker_free");

  console.log(plan);
  console.log(user);

  const currentCount = applications?.length || 0;
  const maxLimit = plan.maxApplicationPerMonth;
  const hasRemainingQuota = currentCount < maxLimit;

  // Calculate percentage for progress tracker bar
  const usagePercentage = Math.min((currentCount / maxLimit) * 100, 100);

  const job = await getJobById(id);

  return (
    <main className="w-full min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-start py-12 px-4 md:px-8">
      {/* Top Banner Dashboard for Application Quota Usage */}
      <div className="w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8 shadow-xl shadow-black/30">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-zinc-500">
                Subscription Status
              </span>
              <span className="px-2 py-0.5 text-[11px] font-medium rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                {plan.name}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              Quota Usage:{" "}
              <span className="text-indigo-400">{currentCount}</span> /{" "}
              <span className="text-zinc-400">{maxLimit}</span> Submissions
            </h2>
          </div>

          <div>
            <Link
              href="/plans"
              className="inline-flex items-center gap-2 px-4 h-10 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 rounded-xl text-sm font-medium text-zinc-200 transition-all duration-200"
            >
              <CreditCard className="w-4 h-4 text-zinc-400" />
              Upgrade Plan
            </Link>
          </div>
        </div>

        {/* Visual Progress Track Gauge */}
        <div className="mt-5">
          <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800/60">
            <div
              className="h-full bg-gradient-to-r from-red-400 to-red-500 transition-all duration-500 rounded-full"
              style={{ width: `${usagePercentage}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-zinc-500">
              {hasRemainingQuota
                ? `${maxLimit - currentCount} applications remaining this month.`
                : "Monthly application limit reached."}
            </p>
            {!hasRemainingQuota && (
              <span className="text-xs text-amber-400 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3 animate-pulse" /> Recommended
                Upgrade
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Conditionally Render Form or Lock Screen */}
      {hasRemainingQuota ? (
        <JobApply applicant={user} job={job} />
      ) : (
        <div className="w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center shadow-xl shadow-black/40">
          <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-rose-400" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight mb-2">
            Application Limit Reached
          </h3>
          <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed mb-6">
            You have submitted {currentCount} out of {maxLimit} allowed
            applications for this period on the {plan.name}. Unlock limitless
            job submissions and premier profile placements.
          </p>
          <Link
            href="/plans"
            className="inline-flex items-center gap-2 px-6 h-11 bg-white text-zinc-950 hover:bg-zinc-200 rounded-xl text-sm font-semibold shadow-lg transition-colors"
          >
            Unlock Unlimited Submissions
          </Link>
        </div>
      )}
    </main>
  );
};

export default ApplyPage;
