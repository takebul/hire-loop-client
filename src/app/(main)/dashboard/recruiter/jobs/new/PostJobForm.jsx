"use client";

import React, { useState } from "react";
import {
  Form,
  Fieldset,
  TextField,
  TextArea,
  Select,
  ListBox,
  FieldError,
  Button,
  Input,
  Label,
} from "@heroui/react";
import { Briefcase, ArrowRight } from "@gravity-ui/icons";
import { createJob } from "@/lib/actions/jobs";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export default function PostJobForm({ company }) {
  // console.log(company);
  // const [company] = useState({
  //   name: "Hire Loop",
  //   id: "hireLoop_123",
  //   isApproved: true,
  // });

  const [isRemote, setIsRemote] = useState(false);

  // Dynamic error state mapped directly to the component layout tree
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!company.isApproved) {
    //   alert("Your company profile must be approved before you can post jobs.");
    //   return;
    // }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // Complete validation map capturing every compulsory input field
    const newErrors = {};

    // --- Section 1: Job Info Validation ---
    if (!data.jobTitle || !data.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
    }
    if (!data.jobCategory) {
      newErrors.jobCategory = "Please select a job category";
    }
    if (!data.jobType) {
      newErrors.jobType = "Please select a job type";
    }
    if (!data.deadline) {
      newErrors.deadline = "Application deadline date is required";
    }
    if (!data.salaryMin) {
      newErrors.salaryMin = "Minimum salary is required";
    }
    if (!data.salaryMax) {
      newErrors.salaryMax = "Maximum salary is required";
    }

    // Conditional validation dependent on the layout toggle state
    if (!isRemote) {
      if (!data.city || !data.city.trim()) {
        newErrors.city = "City location is required for on-site positions";
      }
      if (!data.country || !data.country.trim()) {
        newErrors.country =
          "Country location is required for on-site positions";
      }
    }

    // --- Section 2: Job Description Validation ---
    if (!data.responsibilities || !data.responsibilities.trim()) {
      newErrors.responsibilities =
        "Core responsibilities description is required";
    }
    if (!data.requirements || !data.requirements.trim()) {
      newErrors.requirements =
        "Job requirements and qualifications are required";
    }

    // Halt workflow execution if any rule breaks
    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);

      // Smoothly scroll up to the first invalid node if needed
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementsByName(firstErrorField)[0];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
      return;
    }

    // Reset visual errors on new submission attempt
    setFormErrors({});

    // Format output data payload

    const payload = {
      ...data,
      isRemote,
      status: "active",
      companyId: company._id,
      companyName: company.name,
      company: company.logo,
      isPubliclyVisible: true,
      isRemote: isRemote,
    };

    console.log(payload);

    const res = await createJob(payload);

    console.log(res);

    if (res.insertedId) {
      toast.success("Job posted successfully");
      e.target.reset();
      setIsRemote(false);
      redirect("/dashboard/recruiter/jobs");
    }

    toast.success("Success! Your job post is now active and publicly listed.");
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-6 sm:p-10 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-gradient-to-b from-[#161618] to-[#111112] border border-[#232326] rounded-2xl p-6 md:p-8 shadow-2xl">
        {/* Header (Matching Style Guide image_9bdd70.png) */}
        <div className="border-b border-[#232326] pb-6 mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
            Post a New Job Opening
          </h1>
          <p className="text-sm text-zinc-400">
            Fill in the fields below to make your listing discoverable on
            HireLoop.
          </p>
        </div>

        {/* Dynamic Form Setup */}
        <Form
          onSubmit={handleSubmit}
          // validationBehavior="aria"
          validationErrors={formErrors}
          className="space-y-8"
        >
          {/* SECTION 1: JOB INFO */}
          <Fieldset className="space-y-5">
            <Fieldset.Legend className="text-lg font-semibold text-zinc-200 border-b border-zinc-800 pb-1 w-full">
              Job Info
            </Fieldset.Legend>

            <Fieldset.Group className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Job Title */}
              <TextField name="jobTitle" className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-zinc-300">
                  Job Title
                </Label>
                <Input
                  placeholder="e.g. Senior Frontend Engineer"
                  className="bg-[#121212] border border-[#232326] data-[invalid=true]:border-red-500 text-white rounded-xl py-2 px-3 text-sm focus:border-zinc-500 placeholder-zinc-600 transition-colors"
                />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>

              {/* Job Category - Added explicit name prop to Select */}
              <TextField className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-zinc-300">
                  Job Category
                </Label>
                <Select
                  name="jobCategory"
                  placeholder="Select Category"
                  className="w-full"
                >
                  <Select.Trigger className="bg-[#121212] border border-[#232326] data-[invalid=true]:border-red-500 text-white rounded-xl py-2 px-3 text-sm h-[38px] flex items-center justify-between w-full">
                    <Select.Value />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#161618] border border-[#232326] text-white rounded-xl shadow-xl">
                    <ListBox>
                      <ListBox.Item id="technology" textValue="Technology">
                        Technology & Engineering
                      </ListBox.Item>
                      <ListBox.Item id="design" textValue="Design">
                        Design & Creative
                      </ListBox.Item>
                      <ListBox.Item id="marketing" textValue="Marketing">
                        Marketing & Sales
                      </ListBox.Item>
                      <ListBox.Item id="product" textValue="Product">
                        Product Management
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>

              {/* Job Type - Added explicit name prop to Select */}
              <TextField className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-zinc-300">
                  Job Type
                </Label>
                <Select
                  name="jobType"
                  placeholder="Select Job Type"
                  className="w-full"
                >
                  <Select.Trigger className="bg-[#121212] border border-[#232326] data-[invalid=true]:border-red-500 text-white rounded-xl py-2 px-3 text-sm h-[38px] flex items-center justify-between w-full">
                    <Select.Value />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#161618] border border-[#232326] text-white rounded-xl shadow-xl">
                    <ListBox>
                      <ListBox.Item id="full-time" textValue="Full-time">
                        Full-time
                      </ListBox.Item>
                      <ListBox.Item id="part-time" textValue="Part-time">
                        Part-time
                      </ListBox.Item>
                      <ListBox.Item id="contract" textValue="Contract">
                        Contract
                      </ListBox.Item>
                      <ListBox.Item id="internship" textValue="Internship">
                        Internship
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>

              {/* Application Deadline */}
              <TextField
                name="deadline"
                type="date"
                className="flex flex-col gap-1.5"
              >
                <Label className="text-sm font-medium text-zinc-300">
                  Application Deadline
                </Label>
                <Input className="bg-[#121212] border border-[#232326] data-[invalid=true]:border-red-500 text-white rounded-xl py-2 px-3 text-sm focus:border-zinc-500 transition-colors scheme-dark" />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>
            </Fieldset.Group>

            {/* Salary Breakdown Row */}
            <Fieldset.Group className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              <TextField
                name="salaryMin"
                type="number"
                className="flex flex-col gap-1.5"
              >
                <Label className="text-sm font-medium text-zinc-300">
                  Min Salary
                </Label>
                <Input
                  placeholder="e.g. 80000"
                  className="bg-[#121212] border border-[#232326] data-[invalid=true]:border-red-500 text-white rounded-xl py-2 px-3 text-sm"
                />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>

              <TextField
                name="salaryMax"
                type="number"
                className="flex flex-col gap-1.5"
              >
                <Label className="text-sm font-medium text-zinc-300">
                  Max Salary
                </Label>
                <Input
                  placeholder="e.g. 120000"
                  className="bg-[#121212] border border-[#232326] data-[invalid=true]:border-red-500 text-white rounded-xl py-2 px-3 text-sm"
                />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>

              <TextField className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-zinc-300">
                  Currency
                </Label>
                <Select name="currency" defaultValue="USD" className="w-full">
                  <Select.Trigger className="bg-[#121212] border border-[#232326] text-white rounded-xl py-2 px-3 text-sm h-[38px] flex items-center justify-between w-full">
                    <Select.Value />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#161618] border border-[#232326] text-white rounded-xl shadow-xl">
                    <ListBox>
                      <ListBox.Item id="USD" textValue="USD">
                        USD ($)
                      </ListBox.Item>
                      <ListBox.Item id="EUR" textValue="EUR">
                        EUR (€)
                      </ListBox.Item>
                      <ListBox.Item id="GBP" textValue="GBP">
                        GBP (£)
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </TextField>
            </Fieldset.Group>

            {/* Location or Remote Toggle Box */}
            <div className="pt-4 flex flex-col gap-4 bg-[#121214] border border-[#232326] rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-zinc-200">
                    Remote Setting
                  </span>
                  <span className="text-xs text-zinc-500">
                    Can this role be performed entirely from home?
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRemote(!isRemote)}
                  className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${isRemote ? "bg-white" : "bg-zinc-800"}`}
                >
                  <div
                    className={`w-4 h-4 rounded-full transition-transform duration-200 ${isRemote ? "translate-x-5 bg-black" : "translate-x-0 bg-zinc-400"}`}
                  />
                </button>
              </div>

              {!isRemote && (
                <Fieldset.Group className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <TextField name="city" className="flex flex-col gap-1.5">
                    <Label className="text-sm font-medium text-zinc-300">
                      City
                    </Label>
                    <Input
                      placeholder="e.g. San Francisco"
                      className="bg-[#161618] border border-[#2a2a2e] data-[invalid=true]:border-red-500 text-white rounded-xl py-2 px-3 text-sm"
                    />
                    <FieldError className="text-xs text-red-500 mt-1" />
                  </TextField>
                  <TextField name="country" className="flex flex-col gap-1.5">
                    <Label className="text-sm font-medium text-zinc-300">
                      Country
                    </Label>
                    <Input
                      placeholder="e.g. United States"
                      className="bg-[#161618] border border-[#2a2a2e] data-[invalid=true]:border-red-500 text-white rounded-xl py-2 px-3 text-sm"
                    />
                    <FieldError className="text-xs text-red-500 mt-1" />
                  </TextField>
                </Fieldset.Group>
              )}
            </div>
          </Fieldset>

          {/* SECTION 2: JOB DESCRIPTION */}
          <Fieldset className="space-y-5">
            <Fieldset.Legend className="text-lg font-semibold text-zinc-200 border-b border-zinc-800 pb-1 w-full">
              Job Description
            </Fieldset.Legend>

            <div className="space-y-5">
              {/* Responsibilities */}
              <TextField
                name="responsibilities"
                className="flex flex-col gap-1.5"
              >
                <Label className="text-sm font-medium text-zinc-300">
                  Core Responsibilities
                </Label>
                <TextArea
                  rows={4}
                  placeholder="Outline the daily duties, key project ownership objectives..."
                  className="bg-[#121212] border border-[#232326] data-[invalid=true]:border-red-500 text-white rounded-xl text-sm focus:border-zinc-500 placeholder-zinc-600 transition-colors w-full"
                />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>

              {/* Requirements */}
              <TextField name="requirements" className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-zinc-300">
                  Requirements & Qualifications
                </Label>
                <TextArea
                  rows={4}
                  placeholder="Specify academic degrees, baseline technical tool proficiency..."
                  className="bg-[#121212] border border-[#232326] data-[invalid=true]:border-red-500 text-white rounded-xl text-sm focus:border-zinc-500 placeholder-zinc-600 transition-colors w-full"
                />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>

              {/* Benefits (Optional) */}
              <TextField name="benefits" className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-zinc-300">
                  Benefits & Perks{" "}
                  <span className="text-zinc-600 text-xs">(Optional)</span>
                </Label>
                <TextArea
                  rows={3}
                  placeholder="Healthcare, 401(k) matching, wellness allowances..."
                  className="bg-[#121212] border border-[#232326] text-white rounded-xl text-sm focus:border-zinc-500 placeholder-zinc-600 transition-colors w-full"
                />
              </TextField>
            </div>
          </Fieldset>

          {/* Section 3: Verified Company Box */}
          <div className="bg-[#121214] border border-[#232326] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#222225] border border-[#2d2d30] text-zinc-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
                  Posting Organization
                </span>
                <span className="text-sm font-semibold text-white">
                  {company.companyName}
                </span>
              </div>
            </div>
            {company.isApproved && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-full font-medium self-start sm:self-auto">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Verified & Approved
              </span>
            )}
          </div>

          {/* Action Footer Bar Control */}
          <div className="border-t border-[#232326] pt-6 flex flex-col sm:flex-row items-center justify-end gap-3 w-full">
            <Button
              type="button"
              className="w-full sm:w-auto bg-transparent border border-[#232326] hover:border-[#38383c] hover:bg-zinc-900/50 text-zinc-300 font-medium px-5 py-2.5 rounded-xl transition-all text-sm h-11"
              onPress={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!company.isApproved}
              className="w-full sm:w-auto bg-white hover:bg-zinc-200 text-black font-semibold px-6 py-2.5 rounded-xl transition-all text-sm h-11 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2"
            >
              Publish Job Listing
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
