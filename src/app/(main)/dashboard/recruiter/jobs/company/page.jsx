"use client";

import React from "react";
import {
  Form,
  Input,
  Select,
  ListBox, // FIX: HeroUI v3 uses ListBox inside Select.Popover for items
  Label, // FIX: Labels are declared separately or outside triggers in v3
  TextArea,
  Button,
} from "@heroui/react";
import { X, MapPin, UploadCloud } from "lucide-react";

export default function RegisterCompanyPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log("Registering Company: ", data);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-6 sm:p-10 flex flex-col items-center justify-center">
      {/* Container Card matching image_3c72e5.png */}
      <div className="w-full max-w-2xl bg-[#111112] border border-[#232326] rounded-2xl shadow-2xl overflow-hidden">
        <Form
          onSubmit={handleSubmit}
          validationBehavior="native"
          className="w-full"
        >
          {/* Header */}
          <div className="w-full flex items-start justify-between border-b border-[#232326] p-6 md:p-8">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight mb-1">
                Register New Company
              </h2>
              <p className="text-xs text-zinc-400">
                Enter your business details to start hiring on HireLoop.
              </p>
            </div>
            <Button
              isIconOnly
              variant="light"
              className="text-zinc-400 hover:text-white min-w-8 h-8 rounded-lg hover:bg-zinc-800/60"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Form Input Matrix Layout */}
          <div className="p-6 md:p-8 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300 tracking-wide">
                Company Name
              </label>
              <Input
                required
                name="companyName"
                placeholder="e.g. Acme Corp"
                variant="bordered"
                className={{
                  inputWrapper:
                    "bg-[#1c1c1e] border-[#2d2d33] data-[hover=true]:border-zinc-500 group-data-[focus=true]:border-white h-11 rounded-xl transition-colors",
                  input: "text-white text-sm placeholder:text-zinc-600",
                }}
              />
            </div>

            {/* Industry / Category Selection (Migrated to HeroUI v3 Compound Pattern) */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold text-zinc-300 tracking-wide">
                Industry / Category
              </Label>
              <Select
                isRequired
                name="industry"
                defaultValue="technology"
                className="w-full"
              >
                <Select.Trigger className="bg-[#1c1c1e] border-[#2d2d33] data-[hovered=true]:border-zinc-500 data-[focus-visible=true]:border-white h-11 rounded-xl transition-colors px-3 flex items-center justify-between text-sm text-white">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover className="bg-[#111112] border border-[#232326] rounded-xl text-white shadow-xl">
                  <ListBox className="p-1">
                    <ListBox.Item
                      id="technology"
                      textValue="Technology"
                      className="p-2 text-sm rounded-lg hover:bg-zinc-800 cursor-pointer"
                    >
                      Technology
                    </ListBox.Item>
                    <ListBox.Item
                      id="finance"
                      textValue="Finance"
                      className="p-2 text-sm rounded-lg hover:bg-zinc-800 cursor-pointer"
                    >
                      Finance
                    </ListBox.Item>
                    <ListBox.Item
                      id="healthcare"
                      textValue="Healthcare"
                      className="p-2 text-sm rounded-lg hover:bg-zinc-800 cursor-pointer"
                    >
                      Healthcare
                    </ListBox.Item>
                    <ListBox.Item
                      id="education"
                      textValue="Education"
                      className="p-2 text-sm rounded-lg hover:bg-zinc-800 cursor-pointer"
                    >
                      Education
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Website URL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300 tracking-wide">
                Website URL
              </label>
              <Input
                required
                name="website"
                type="url"
                placeholder="www.company.com"
                variant="bordered"
                startContent={
                  <span className="text-xs font-medium text-zinc-500 bg-[#252529] px-2.5 py-1 rounded-md border border-[#333339] -ml-1 mr-1">
                    https://
                  </span>
                }
                className={{
                  inputWrapper:
                    "bg-[#1c1c1e] border-[#2d2d33] data-[hover=true]:border-zinc-500 group-data-[focus=true]:border-white h-11 rounded-xl transition-colors pl-2",
                  input: "text-white text-sm placeholder:text-zinc-600",
                }}
              />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300 tracking-wide">
                Location
              </label>
              <Input
                required
                name="location"
                placeholder="City, Country"
                variant="bordered"
                startContent={
                  <MapPin className="w-4 h-4 text-zinc-500 mr-1 flex-shrink-0" />
                }
                className={{
                  inputWrapper:
                    "bg-[#1c1c1e] border-[#2d2d33] data-[hover=true]:border-zinc-500 group-data-[focus=true]:border-white h-11 rounded-xl transition-colors",
                  input: "text-white text-sm placeholder:text-zinc-600",
                }}
              />
            </div>

            {/* Employee Count Range Selector (Migrated to HeroUI v3 Compound Pattern) */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold text-zinc-300 tracking-wide">
                Employee Count Range
              </Label>
              <Select
                isRequired
                name="employeeRange"
                defaultValue="1-10"
                className="w-full"
              >
                <Select.Trigger className="bg-[#1c1c1e] border-[#2d2d33] data-[hovered=true]:border-zinc-500 data-[focus-visible=true]:border-white h-11 rounded-xl transition-colors px-3 flex items-center justify-between text-sm text-white">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover className="bg-[#111112] border border-[#232326] rounded-xl text-white shadow-xl">
                  <ListBox className="p-1">
                    <ListBox.Item
                      id="1-10"
                      textValue="1-10 employees"
                      className="p-2 text-sm rounded-lg hover:bg-zinc-800 cursor-pointer"
                    >
                      1-10 employees
                    </ListBox.Item>
                    <ListBox.Item
                      id="11-50"
                      textValue="11-50 employees"
                      className="p-2 text-sm rounded-lg hover:bg-zinc-800 cursor-pointer"
                    >
                      11-50 employees
                    </ListBox.Item>
                    <ListBox.Item
                      id="51-200"
                      textValue="51-200 employees"
                      className="p-2 text-sm rounded-lg hover:bg-zinc-800 cursor-pointer"
                    >
                      51-200 employees
                    </ListBox.Item>
                    <ListBox.Item
                      id="201+"
                      textValue="201+ employees"
                      className="p-2 text-sm rounded-lg hover:bg-zinc-800 cursor-pointer"
                    >
                      201+ employees
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Company Logo Upload Box */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300 tracking-wide">
                Company Logo
              </label>
              <div className="flex items-center gap-3">
                <label className="w-12 h-12 bg-[#1c1c1e] border border-[#2d2d33] border-dashed rounded-xl flex items-center justify-center cursor-pointer hover:bg-zinc-800/50 transition-colors group">
                  <input
                    type="file"
                    name="logo"
                    accept="image/png, image/jpeg"
                    className="hidden"
                  />
                  <UploadCloud className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                </label>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-zinc-200">
                    Upload image
                  </span>
                  <span className="text-[10px] text-zinc-500 font-sans mt-0.5">
                    PNG, JPG up to 5MB
                  </span>
                </div>
              </div>
            </div>

            {/* Brief Description */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-zinc-300 tracking-wide">
                Brief Description
              </label>
              <TextArea
                required
                name="description"
                placeholder="Tell us about your company's mission and culture..."
                variant="bordered"
                rows={3}
                className={{
                  inputWrapper:
                    "bg-[#1c1c1e] border-[#2d2d33] data-[hovered=true]:border-zinc-500 data-[focus-within=true]:border-white rounded-xl transition-colors py-3",
                  input:
                    "text-white text-sm placeholder:text-zinc-600 resize-none leading-relaxed",
                }}
              />
            </div>
          </div>

          {/* Bottom Actions Footer */}
          <div className="w-full flex items-center justify-end gap-3 border-t border-[#232326] p-6 bg-[#0d0d0e]">
            <Button
              variant="bordered"
              className="border-[#2d2d33] text-white hover:bg-zinc-800/40 rounded-xl px-5 font-medium text-sm h-10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-xl px-5 text-sm h-10 shadow-lg shadow-white/5"
            >
              Register Company
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
