import React from "react";
import { Card } from "@heroui/react";
import { MapPin, Briefcase, DollarSign, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function JobCard({ job }) {
  if (!job) return null;

  const {
    jobTitle,
    jobType,
    salaryMin,
    salaryMax,
    currency,
    city,
    country,
    responsibilities,
    company,
    isRemote,
  } = job;

  const companyName = job.companyName || "Meta Company";
  const shortDescription =
    responsibilities.split("\n")[0] || "No description provided.";
  const workMode = isRemote ? "Remote" : "Hybrid";

  const formatSalary = (val) => {
    if (!val) return "—";
    const num = parseInt(val, 10);
    return num >= 1000 ? `${Math.floor(num / 1000)}k` : val;
  };

  return (
    <Card className="p-4 w-full max-w-md border border-neutral-800 bg-[#121212] text-white rounded-3xl shadow-2xl transition-all duration-300 hover:border-neutral-700">
      {/* Card Header */}
      <Card.Header className="flex-col items-start gap-3 px-3 pb-2">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <Image
              width={40}
              height={40}
              alt={companyName}
              src={company || "https://i.ibb.co.com/B2YPh0xY/uber.png"}
              className="w-10 h-10 ring-1 ring-blue-500 rounded-full bg-neutral-900 border border-neutral-800 object-cover"
            />
            <span className="text-sm font-medium text-neutral-400">
              {companyName}
            </span>
          </div>
        </div>

        <div className="mt-1">
          <h3 className="text-2xl font-semibold tracking-tight text-neutral-100">
            {jobTitle}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-400 line-clamp-2">
            {shortDescription}
          </p>
        </div>
      </Card.Header>

      {/* Card Content */}
      <Card.Content className="flex flex-wrap gap-2 px-3 py-4">
        <div className="flex items-center gap-1.5 bg-neutral-900 px-3 py-1.5 border border-neutral-800 rounded-full text-xs font-medium text-neutral-300">
          <MapPin className="w-3.5 h-3.5 text-pink-400" />
          {city}
          {country ? `, ${country}` : ""}
        </div>

        <div className="flex items-center gap-1.5 bg-neutral-900 px-3 py-1.5 border border-neutral-800 rounded-full text-xs font-medium text-neutral-300">
          <Briefcase className="w-3.5 h-3.5 text-pink-400" />
          <span className="capitalize">{jobType}</span> • {workMode}
        </div>

        {(salaryMin || salaryMax) && (
          <div className="flex items-center gap-1.5 bg-neutral-900 px-3 py-1.5 border border-neutral-800 rounded-full text-xs font-medium text-neutral-300">
            <DollarSign className="w-3.5 h-3.5 text-pink-400" />
            {currency} {formatSalary(salaryMin)}–{formatSalary(salaryMax)}/year
          </div>
        )}
      </Card.Content>

      {/* Card Footer: Animated Apply CTA */}
      <Card.Footer className="justify-start px-3 pt-2 pb-1">
        <Link
          href={`/jobs/${job._id?.$oid || job._id}`}
          className="group relative inline-flex items-center gap-2 text-base font-medium text-white transition-colors duration-200 hover:text-blue-400 min-w-max pb-1"
        >
          <span>Apply Now</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />

          {/* Animated custom underline bar */}
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 ease-out group-hover:w-full" />
        </Link>
      </Card.Footer>
    </Card>
  );
}
