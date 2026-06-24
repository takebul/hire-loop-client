"use client";

import React, { useState } from "react";
import { Form, Button, TextField, Label, Input, TextArea } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Building2,
  User,
  Mail,
  Link2,
  Globe,
  FileText,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { submitApplication } from "@/lib/actions/applications";
import toast from "react-hot-toast";

const JobApply = ({ job, applicant }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const resumeLink = formData.get("resumeLink");
    const portfolioLink = formData.get("portfolioLink");
    const coverLetter = formData.get("coverLetter");

    if (!resumeLink) {
      setErrors({
        resumeLink:
          "A valid resume URL is required to evaluate your application.",
      });
      setLoading(false);
      return;
    }

    try {
      // Simulate API Action delay
      await new Promise((resolve) => setTimeout(resolve, 1800));
      const submissionData = {
        jobId: job?._id,
        jobTitle: job?.jobTitle,
        companyName: job?.companyName,
        applicantId: applicant?.id,
        applicantName: applicant?.name,
        applicantEmail: applicant?.email,
        status: "applied",
        resumeLink,
        portfolioLink,
        coverLetter,
      };
      setSubmitted(true);

      const res = await submitApplication(submissionData);

      if (res.insertedId) {
        toast.success("Application submitted successfully!");
        setSubmitted({ resumeLink: "", portfolioLink: "", coverLetter: "" });
      }
    } catch (err) {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-1">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="application-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
          >
            {/* Left Column: Job Context */}
            <div className="md:col-span-5 bg-gradient-to-b from-zinc-850 to-zinc-900 p-8 border-b md:border-b-0 md:border-r border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-6">
                  <Sparkles className="w-3 h-3" />
                  Active Role
                </div>

                <h1 className="text-2xl font-bold text-white tracking-tight leading-tight mb-2">
                  {job?.title || "Position Overview"}
                </h1>
                <p className="text-sm text-zinc-400 mb-6 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-zinc-500" />
                  {job?.companyName || "Premium Partner"}
                </p>

                <hr className="border-zinc-800 my-6" />

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-zinc-500 mt-1" />
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                        Location
                      </p>
                      <p className="text-sm text-zinc-300">
                        {job?.location || "Remote / Global"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-4 h-4 text-zinc-500 mt-1" />
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                        Industry Sector
                      </p>
                      <p className="text-sm text-zinc-300">
                        {job?.industry || "Technology"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800/60 hidden md:block">
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Your base profile details are securely synced directly from
                  your logged-in seeker account dashboard.
                </p>
              </div>
            </div>

            {/* Right Column: Form fields */}
            <div className="md:col-span-7 p-8">
              {/* Authenticated Applicant Badge */}
              <div className="mb-8 p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 font-medium overflow-hidden">
                  {applicant?.image ? (
                    <Image
                      width={30}
                      height={30}
                      src={applicant.image}
                      alt={applicant.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-zinc-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
                    Applying As
                  </p>
                  <p className="text-sm font-semibold text-zinc-200 truncate">
                    {applicant?.name}
                  </p>
                  <p className="text-xs text-zinc-400 truncate flex items-center gap-1 mt-0.5">
                    <Mail className="w-3 h-3 text-zinc-600" />
                    {applicant?.email}
                  </p>
                </div>
              </div>

              {/* Form implementation */}
              <Form
                onSubmit={handleSubmit}
                validationBehavior="native"
                className="space-y-6"
              >
                {/* Resume Link Input (Required) */}
                <TextField
                  isRequired
                  isInvalid={!!errors.resumeLink}
                  className="w-full"
                >
                  <div className="flex justify-between items-baseline mb-1.5">
                    <Label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                      <Link2 className="w-4 h-4 text-zinc-500" />
                      Digital Resume URL
                      <span className="text-[11px] text-indigo-400 font-medium">
                        Required
                      </span>
                    </Label>
                  </div>
                  <Input
                    name="resumeLink"
                    type="url"
                    placeholder="https://drive.google.com/file/... or https://read.cv/username"
                    className="w-full bg-zinc-950 text-zinc-100 placeholder-zinc-600 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                  />
                  <p className="text-xs text-zinc-500 mt-1.5">
                    Provide an accessible Google Drive, Notion, Vercel, or
                    Dropbox link.
                  </p>
                  {errors.resumeLink && (
                    <p className="text-xs text-rose-400 font-medium mt-1.5">
                      {errors.resumeLink}
                    </p>
                  )}
                </TextField>

                {/* Portfolio / Website Link Input (Optional) */}
                <TextField className="w-full">
                  <div className="flex justify-between items-baseline mb-1.5">
                    <Label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-zinc-500" />
                      Portfolio / Website
                      <span className="text-[11px] text-zinc-500">
                        (Optional)
                      </span>
                    </Label>
                  </div>
                  <Input
                    name="portfolioLink"
                    type="url"
                    placeholder="https://yourportfolio.com or https://github.com/username"
                    className="w-full bg-zinc-950 text-zinc-100 placeholder-zinc-600 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                  />
                  <p className="text-xs text-zinc-500 mt-1.5">
                    Link to your live web applications, GitHub profile, or
                    personal workspace.
                  </p>
                </TextField>

                {/* Optional Message Field */}
                <div className="w-full">
                  <div className="flex justify-between items-baseline mb-1.5">
                    <Label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-zinc-500" />
                      Additional Information
                      <span className="text-[11px] text-zinc-500">
                        (Optional)
                      </span>
                    </Label>
                  </div>
                  <TextArea
                    name="coverLetter"
                    placeholder="Share any details, core background notes, or specific context you want to highlight..."
                    rows={4}
                    className="w-full bg-zinc-950 text-zinc-100 placeholder-zinc-600 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 resize-none"
                  />
                </div>

                {errors.form && (
                  <p className="text-sm text-rose-400 text-center font-medium bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
                    {errors.form}
                  </p>
                )}

                {/* Form CTA Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center gap-2 h-11 bg-white text-zinc-950 hover:bg-zinc-200 font-semibold rounded-xl text-sm transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </div>
          </motion.div>
        ) : (
          /* Success Screen Transition */
          <motion.div
            key="success-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center max-w-xl mx-auto shadow-2xl shadow-black"
          >
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight mb-3">
              Application Dispatched!
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
              Your materials have been securely transmitted to the{" "}
              <span className="text-zinc-200 font-medium">
                {job?.companyName || "Hiring Team"}
              </span>
              .
            </p>
            <div className="bg-zinc-950/60 border border-zinc-800 p-4 rounded-xl text-left mb-8">
              <p className="text-xs text-zinc-500 font-mono truncate">
                Role ID: {job?._id || "N/A"}
              </p>
              <p className="text-xs text-zinc-500 font-mono truncate mt-1">
                Applicant Session: {applicant?.email}
              </p>
            </div>
            <Button
              onClick={() => (window.location.href = "/jobs")}
              className="w-full h-11 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 font-medium rounded-xl text-sm transition-colors border border-zinc-700"
            >
              Return to Job Board
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobApply;
