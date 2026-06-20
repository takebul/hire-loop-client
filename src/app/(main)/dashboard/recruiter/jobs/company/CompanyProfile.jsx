"use client";

import React, { useState } from "react";
import { Form, Select, Label, ListBox, Button } from "@heroui/react";
import {
  X,
  MapPin,
  UploadCloud,
  Loader2,
  Edit3,
  Building2,
  Globe,
} from "lucide-react";
import { createCompany } from "@/lib/actions/companies";
import toast from "react-hot-toast";
import Image from "next/image";

export default function CompanyProfile({ recruiter, recruiterCompany }) {
  const [companyData, setCompanyData] = useState(recruiterCompany);
  const [isEditing, setIsEditing] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  console.log(companyData);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setErrors((prev) => ({ ...prev, logo: "" }));

      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, logo: "File size exceeds 5MB limit" }));
        return;
      }

      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formFields = Object.fromEntries(formData.entries());

    const newErrors = {};
    if (!formFields.companyName?.trim())
      newErrors.companyName = "Company name is required";
    if (!formFields.industry)
      newErrors.industry = "Industry selection is required";
    if (!formFields.website?.trim()) {
      newErrors.website = "Website URL is required";
    } else if (!formFields.website.includes(".")) {
      newErrors.website = "Please enter a valid website address";
    }
    if (!formFields.location?.trim())
      newErrors.location = "Location is required";
    if (!formFields.employeeRange)
      newErrors.employeeRange = "Employee range is required";
    if (!formFields.description?.trim())
      newErrors.description = "A brief description is required";

    if (errors.logo) newErrors.logo = errors.logo;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      let logoUrl = companyData?.logo || "";

      if (logoFile) {
        const imgData = new FormData();
        imgData.append("image", logoFile);

        const imgbbResponse = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBBB_API_KEY}`,
          { method: "POST", body: imgData },
        );
        const imgbbData = await imgbbResponse.json();

        console.log(imgbbData);

        if (imgbbData.success) {
          logoUrl = imgbbData.data.url;
        } else {
          throw new Error("ImgBB Upload Failed");
        }
      }

      const updatedPayload = {
        companyName: formFields.companyName,
        industry: formFields.industry,
        website: formFields.website.startsWith("https://")
          ? formFields.website
          : `https://${formFields.website}`,
        location: formFields.location,
        employeeRange: formFields.employeeRange,
        description: formFields.description,
        logo: logoUrl,
        status: companyData ? companyData.status : "Pending",
        recruiterId: recruiter?.id,
      };

      setCompanyData(updatedPayload);

      const payload = await createCompany(updatedPayload);

      console.log(payload);

      if (payload.insertedId) {
        toast.success("Company profile created successfully!");
        setIsEditing(false);
      } else {
        throw new Error("Failed to save data on backend host.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to save registration data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- CONDITION 1: NO COMPANY REGISTERED YET ---
  if (!companyData?._id && !isEditing) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white p-6 sm:p-10 flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-[#111112] border border-[#232326] rounded-2xl shadow-2xl p-8 text-center flex flex-col items-center gap-5">
          <div className="w-16 h-16 bg-[#1c1c1e] border border-[#2d2d33] rounded-2xl flex items-center justify-center text-zinc-400">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight mb-2">
              No company registered Yet.
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs mx-auto">
              You haven't set up your business profile. Register your workplace
              now to unlock features.
            </p>
          </div>
          <Button
            onClick={() => setIsEditing(true)}
            className="w-full bg-white text-black font-semibold hover:bg-zinc-200 h-11 rounded-xl shadow-lg mt-2"
          >
            Register New Company
          </Button>
        </div>
      </div>
    );
  }

  // --- CONDITION 2: READ-ONLY DISPLAY PROFILE ---
  if (companyData && !isEditing) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white p-6 sm:p-10 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl bg-[#111112] border border-[#232326] rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 md:p-8 border-b border-[#232326] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0d0d0e]">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#1c1c1e] border border-[#2d2d33] rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0">
                {companyData.logo ? (
                  <Image
                    width={30}
                    height={30}
                    src={companyData.logo}
                    alt="Company Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Building2 className="w-6 h-6 text-zinc-500" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {companyData.companyName}
                  </h2>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      companyData.status === "Approved"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}
                  >
                    {companyData.status}
                  </span>
                </div>
                <p className="text-xs font-semibold uppercase text-zinc-500 tracking-widest mt-1">
                  {companyData.industry} Sector
                </p>
              </div>
            </div>

            <Button
              onClick={() => {
                setLogoPreview(companyData.logo);
                setErrors({});
                setIsEditing(true);
              }}
              className="bg-[#1c1c1e] border border-[#2d2d33] text-zinc-200 hover:text-white text-xs px-4 h-9 rounded-xl flex items-center gap-2"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit Company
            </Button>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#1c1c1e]/40 p-4 border border-[#2d2d33]/50 rounded-xl">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                  HQ Location
                </span>
                <div className="flex items-center gap-2 text-zinc-200 text-sm">
                  <MapPin className="w-4 h-4 text-zinc-400" />
                  {companyData.location}
                </div>
              </div>

              <div className="bg-[#1c1c1e]/40 p-4 border border-[#2d2d33]/50 rounded-xl">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                  Company Scale
                </span>
                <div className="text-zinc-200 text-sm font-medium">
                  {companyData.employeeRange} employees
                </div>
              </div>

              <div className="bg-[#1c1c1e]/40 p-4 border border-[#2d2d33]/50 rounded-xl sm:col-span-2">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                  Official Website
                </span>
                <a
                  href={companyData.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sky-400 hover:text-sky-300 text-sm font-medium outline-none w-max"
                >
                  <Globe className="w-4 h-4" />
                  {companyData.website}
                </a>
              </div>
            </div>

            <div className="border-t border-[#232326] pt-5">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-2">
                About Mission & Culture
              </span>
              <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                {companyData.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- CONDITION 3: EDIT / REGISTER PROFILE COMPONENT ---
  return (
    <div className="min-h-screen bg-[#09090b] text-white p-6 sm:p-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-[#111112] border border-[#232326] rounded-2xl shadow-2xl overflow-hidden">
        <Form onSubmit={handleSubmit} className="w-full flex flex-col">
          <div className="w-full flex items-start justify-between border-b border-[#232326] p-6 md:p-8">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight mb-1">
                {companyData ? "Modify Company Record" : "Register New Company"}
              </h2>
              <p className="text-xs text-zinc-400">
                Update details to refresh active pipeline jobs across the
                dashboard.
              </p>
            </div>
            <Button
              isIconOnly
              variant="light"
              onClick={() => {
                setErrors({});
                setIsEditing(false);
              }}
              className="text-zinc-400 hover:text-white min-w-8 h-8 rounded-lg"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="p-6 md:p-8 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold text-zinc-300 pb-0.5">
                Company Name
              </Label>
              <div
                className={`w-full flex items-center bg-[#1c1c1e] border rounded-xl transition-colors h-11 px-3 ${
                  errors.companyName
                    ? "border-danger"
                    : "border-[#2d2d33] hover:border-zinc-500 focus-within:border-white"
                }`}
              >
                <input
                  name="companyName"
                  placeholder="e.g. Acme Corp"
                  defaultValue={companyData?.companyName || ""}
                  onChange={() =>
                    setErrors((prev) => ({ ...prev, companyName: "" }))
                  }
                  className="w-full bg-transparent text-white text-sm outline-none h-full"
                />
              </div>
              {errors.companyName && (
                <span className="text-xs text-danger mt-0.5">
                  {errors.companyName}
                </span>
              )}
            </div>

            {/* Industry Choice Select */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold text-zinc-300 pb-0.5">
                Industry / Category
              </Label>
              <Select
                name="industry"
                defaultValue={companyData?.industry || "technology"}
                onChange={() =>
                  setErrors((prev) => ({ ...prev, industry: "" }))
                }
                placeholder="Select an industry"
                className="w-full"
              >
                <Select.Trigger
                  className={`bg-[#1c1c1e] h-11 rounded-xl px-3 flex items-center justify-between text-sm text-white border ${
                    errors.industry
                      ? "border-danger"
                      : "border-[#2d2d33] data-[hovered=true]:border-zinc-500 data-[focus-visible=true]:border-white"
                  }`}
                >
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-[#111112] border border-[#232326] rounded-xl text-white shadow-xl">
                  <ListBox className="p-1">
                    <ListBox.Item
                      id="technology"
                      textValue="Technology"
                      className="p-2 text-sm rounded-lg hover:bg-zinc-800 cursor-pointer text-white"
                    >
                      Technology
                    </ListBox.Item>
                    <ListBox.Item
                      id="marketing"
                      textValue="Marketing"
                      className="p-2 text-sm rounded-lg hover:bg-zinc-800 cursor-pointer text-white"
                    >
                      Marketing
                    </ListBox.Item>
                    <ListBox.Item
                      id="finance"
                      textValue="Finance"
                      className="p-2 text-sm rounded-lg hover:bg-zinc-800 cursor-pointer text-white"
                    >
                      Finance
                    </ListBox.Item>
                    <ListBox.Item
                      id="healthcare"
                      textValue="Healthcare"
                      className="p-2 text-sm rounded-lg hover:bg-zinc-800 cursor-pointer text-white"
                    >
                      Healthcare
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
              {errors.industry && (
                <span className="text-xs text-danger mt-0.5">
                  {errors.industry}
                </span>
              )}
            </div>

            {/* Corporate Website Address */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold text-zinc-300 pb-0.5">
                Website URL
              </Label>
              <div
                className={`w-full flex items-center bg-[#1c1c1e] border rounded-xl transition-colors h-11 px-3 ${
                  errors.website
                    ? "border-danger"
                    : "border-[#2d2d33] hover:border-zinc-500 focus-within:border-white"
                }`}
              >
                <span className="text-zinc-500 text-sm select-none pr-1">
                  https://
                </span>
                <input
                  name="website"
                  placeholder="www.company.com"
                  defaultValue={
                    companyData?.website?.replace("https://", "") || ""
                  }
                  onChange={() =>
                    setErrors((prev) => ({ ...prev, website: "" }))
                  }
                  className="w-full bg-transparent text-white text-sm outline-none h-full"
                />
              </div>
              {errors.website && (
                <span className="text-xs text-danger mt-0.5">
                  {errors.website}
                </span>
              )}
            </div>

            {/* Headquarters Location */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold text-zinc-300 pb-0.5">
                Location
              </Label>
              <div
                className={`w-full flex items-center bg-[#1c1c1e] border rounded-xl transition-colors h-11 px-3 gap-2 ${
                  errors.location
                    ? "border-danger"
                    : "border-[#2d2d33] hover:border-zinc-500 focus-within:border-white"
                }`}
              >
                <MapPin className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                <input
                  name="location"
                  placeholder="City, Country"
                  defaultValue={companyData?.location || ""}
                  onChange={() =>
                    setErrors((prev) => ({ ...prev, location: "" }))
                  }
                  className="w-full bg-transparent text-white text-sm outline-none h-full"
                />
              </div>
              {errors.location && (
                <span className="text-xs text-danger mt-0.5">
                  {errors.location}
                </span>
              )}
            </div>

            {/* Employee Metrics Bracket */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold text-zinc-300 pb-0.5">
                Employee Count Range
              </Label>
              <Select
                name="employeeRange"
                defaultValue={companyData?.employeeRange || "1-10"}
                onChange={() =>
                  setErrors((prev) => ({ ...prev, employeeRange: "" }))
                }
                placeholder="Select company scale"
                className="w-full"
              >
                <Select.Trigger
                  className={`bg-[#1c1c1e] h-11 rounded-xl px-3 flex items-center justify-between text-sm text-white border ${
                    errors.employeeRange
                      ? "border-danger"
                      : "border-[#2d2d33] data-[hovered=true]:border-zinc-500 data-[focus-visible=true]:border-white"
                  }`}
                >
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-[#111112] border border-[#232326] rounded-xl text-white shadow-xl">
                  <ListBox className="p-1">
                    <ListBox.Item
                      id="1-10"
                      textValue="1-10 employees"
                      className="p-2 text-sm rounded-lg hover:bg-zinc-800 cursor-pointer text-white"
                    >
                      1-10 employees
                    </ListBox.Item>
                    <ListBox.Item
                      id="11-50"
                      textValue="11-50 employees"
                      className="p-2 text-sm rounded-lg hover:bg-zinc-800 cursor-pointer text-white"
                    >
                      11-50 employees
                    </ListBox.Item>
                    <ListBox.Item
                      id="51-200"
                      textValue="51-200 employees"
                      className="p-2 text-sm rounded-lg hover:bg-zinc-800 cursor-pointer text-white"
                    >
                      51-200 employees
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
              {errors.employeeRange && (
                <span className="text-xs text-danger mt-0.5">
                  {errors.employeeRange}
                </span>
              )}
            </div>

            {/* Logo Uploader */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold text-zinc-300 pb-0.5">
                Company Logo
              </Label>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <label
                    className={`w-12 h-12 bg-[#1c1c1e] border rounded-xl flex items-center justify-center cursor-pointer hover:bg-zinc-800/50 overflow-hidden ${
                      errors.logo
                        ? "border-danger"
                        : "border-[#2d2d33] border-dashed"
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      className="hidden"
                      onChange={handleLogoChange}
                    />
                    {logoPreview ? (
                      <Image
                        width={30}
                        height={30}
                        src={logoPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UploadCloud className="w-4 h-4 text-zinc-400" />
                    )}
                  </label>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-zinc-200">
                      {logoFile
                        ? logoFile.name
                        : companyData
                          ? "Keep existing profile image"
                          : "Upload image"}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-sans mt-0.5">
                      PNG, JPG up to 5MB
                    </span>
                  </div>
                </div>
                {errors.logo && (
                  <span className="text-xs text-danger font-sans mt-1">
                    {errors.logo}
                  </span>
                )}
              </div>
            </div>

            {/* Description Narrative */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <Label className="text-xs font-semibold text-zinc-300 pb-0.5">
                Brief Description
              </Label>
              <div
                className={`w-full bg-[#1c1c1e] border rounded-xl transition-colors p-3 min-h-[100px] ${
                  errors.description
                    ? "border-danger"
                    : "border-[#2d2d33] hover:border-zinc-500 focus-within:border-white"
                }`}
              >
                <textarea
                  name="description"
                  placeholder="Tell us about your company's mission and culture..."
                  defaultValue={companyData?.description || ""}
                  onChange={() =>
                    setErrors((prev) => ({ ...prev, description: "" }))
                  }
                  className="w-full h-full bg-transparent text-white text-sm outline-none resize-none min-h-[80px]"
                />
              </div>
              {errors.description && (
                <span className="text-xs text-danger mt-0.5">
                  {errors.description}
                </span>
              )}
            </div>
          </div>

          {/* Actions Footer */}
          <div className="w-full flex items-center justify-end gap-3 border-t border-[#232326] p-6 bg-[#0d0d0e]">
            {companyData && (
              <Button
                type="button"
                variant="bordered"
                onClick={() => {
                  setErrors({});
                  setIsEditing(false);
                }}
                className="border-[#2d2d33] text-white hover:bg-zinc-800/40 rounded-xl px-5 font-medium text-sm h-10"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-xl px-5 text-sm h-10 shadow-lg"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting ? "Saving Updates..." : "Save Company"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
