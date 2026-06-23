import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createSubscriptions } from "@/lib/actions/subscriptions";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const { status, customer_details, amount_total, currency, metadata } =
    session;
  const customerEmail = customer_details?.email;

  if (status === "open") {
    return redirect("/");
  }

  // Format amount safely
  const formattedAmount = amount_total
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency?.toUpperCase() || "USD",
      }).format(amount_total / 100)
    : null;

  if (status === "complete") {
    const subsInfo = {
      email: customerEmail,
      planId: metadata.planId,
    };
    // update the user table about the new plan
    const result = await createSubscriptions(subsInfo);

    return (
      <section className="min-h-screen bg-[#09090b] text-white flex items-center justify-center p-4 antialiased">
        <div className="max-w-md w-full bg-[#111112] border border-[#232326] rounded-2xl shadow-2xl p-8 text-center">
          {/* Glowing Success Icon Badge */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <svg
              className="h-8 w-8 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
            Payment Successful!
          </h1>
          <p className="text-sm text-zinc-400 max-w-xs mx-auto">
            Thank you for your order. Your transaction has been processed
            securely.
          </p>

          <hr className="border-[#232326] my-6" />

          {/* Premium Dark Summary Box */}
          <div className="bg-[#1c1c1e]/50 border border-[#2d2d33]/50 rounded-xl p-4 text-left space-y-3 mb-8 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 font-medium">Account Email</span>
              <span className="font-medium text-zinc-200 break-all max-w-[200px] text-right">
                {customerEmail}
              </span>
            </div>
            {formattedAmount && (
              <div className="flex justify-between items-center border-t border-[#232326] pt-3 mt-1">
                <span className="text-zinc-500 font-medium">Amount Paid</span>
                <span className="font-semibold text-white text-base">
                  {formattedAmount}
                </span>
              </div>
            )}
          </div>

          {/* Informational Narrative */}
          <p className="text-xs text-zinc-500 leading-relaxed mb-8">
            A confirmation email will be sent to{" "}
            <span className="text-zinc-300 font-medium">{customerEmail}</span>{" "}
            shortly. If you have any questions, reach out to{" "}
            <a
              href="mailto:orders@example.com"
              className="text-sky-400 hover:text-sky-300 font-medium transition-colors outline-none"
            >
              orders@example.com
            </a>
            .
          </p>

          {/* Action Callbacks */}
          <div className="space-y-3">
            <Link
              href="/dashboard/recruiter"
              className="block w-full text-center bg-white hover:bg-zinc-200 text-black font-semibold py-3 px-4 rounded-xl transition-colors shadow-lg"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/"
              className="block w-full text-center bg-[#1c1c1e] border border-[#2d2d33] hover:text-white text-zinc-300 font-medium py-3 px-4 rounded-xl transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
