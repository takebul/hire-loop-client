"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import JobCard from "./JobCard";

export default function JobFilterWrapper({ initialJobs = [] }) {
  // --- Filter Sync States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedJobType, setSelectedJobType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  // --- Dropdown Toggle States ---
  const [activeDropdown, setActiveDropdown] = useState(null); // 'category', 'type', 'location', or null
  const containerRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Dynamic Option Extraction Arrays ---
  const categories = useMemo(() => {
    const list = new Set(initialJobs.map((j) => j.jobCategory).filter(Boolean));
    return ["all", ...Array.from(list)];
  }, [initialJobs]);

  const jobTypes = useMemo(() => {
    const list = new Set(initialJobs.map((j) => j.jobType).filter(Boolean));
    return ["all", ...Array.from(list)];
  }, [initialJobs]);

  // --- Live Computed Filtering Engine ---
  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      const matchesSearch =
        job.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || job.jobCategory === selectedCategory;
      const matchesJobType =
        selectedJobType === "all" || job.jobType === selectedJobType;

      const matchesLocation =
        selectedLocation === "all" ||
        (selectedLocation === "remote" && job.isRemote) ||
        (selectedLocation === "on-site" && !job.isRemote);

      return (
        matchesSearch && matchesCategory && matchesJobType && matchesLocation
      );
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedJobType,
    selectedLocation,
    initialJobs,
  ]);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <div
      ref={containerRef}
      className="w-full max-w-7xl mx-auto p-6 flex flex-col gap-6"
    >
      {/* Search and Control Filter Bar Wrapper */}
      <div className="w-full gap-4 p-6 bg-zinc-900 border border-zinc-800 rounded-xl shadow-md flex flex-col md:flex-row items-end relative z-30">
        {/* Search Field Group */}
        <div className="flex-1 w-full">
          <label className="text-sm font-medium text-zinc-300 mb-1.5 block">
            Search Openings
          </label>
          <div className="w-full flex items-center border border-zinc-700 bg-zinc-950 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 h-10 transition-all">
            <span className="pl-3 pr-1 text-zinc-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search by title or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 px-2 outline-none text-sm bg-transparent text-white placeholder-zinc-500"
            />
          </div>
        </div>

        {/* Categories Dropdown Filter */}
        <div className="w-full md:w-48 relative">
          <label className="text-sm font-medium text-zinc-300 mb-1.5 block">
            Category
          </label>
          <button
            type="button"
            onClick={() => toggleDropdown("category")}
            className="w-full flex justify-between items-center px-3 h-10 border border-zinc-700 rounded-lg text-sm bg-zinc-950 text-white transition-all hover:bg-zinc-900 capitalize"
          >
            <span className="truncate">
              {selectedCategory === "all" ? "All Categories" : selectedCategory}
            </span>
            <span
              className={`text-[10px] text-zinc-500 transition-transform duration-200 ${activeDropdown === "category" ? "rotate-180" : ""}`}
            >
              ▼
            </span>
          </button>

          {activeDropdown === "category" && (
            <div className="absolute left-0 right-0 top-[46px] bg-zinc-950 border border-zinc-800 shadow-xl rounded-lg p-1 max-h-60 overflow-y-auto z-50">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setActiveDropdown(null);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md capitalize transition-colors ${selectedCategory === cat ? "bg-blue-600 text-white" : "text-zinc-300 hover:bg-zinc-800 hover:text-white"}`}
                >
                  {cat === "all" ? "All Categories" : cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Job Types Dropdown Filter */}
        <div className="w-full md:w-44 relative">
          <label className="text-sm font-medium text-zinc-300 mb-1.5 block">
            Job Type
          </label>
          <button
            type="button"
            onClick={() => toggleDropdown("type")}
            className="w-full flex justify-between items-center px-3 h-10 border border-zinc-700 rounded-lg text-sm bg-zinc-950 text-white transition-all hover:bg-zinc-900 capitalize"
          >
            <span className="truncate">
              {selectedJobType === "all" ? "All Types" : selectedJobType}
            </span>
            <span
              className={`text-[10px] text-zinc-500 transition-transform duration-200 ${activeDropdown === "type" ? "rotate-180" : ""}`}
            >
              ▼
            </span>
          </button>

          {activeDropdown === "type" && (
            <div className="absolute left-0 right-0 top-[46px] bg-zinc-950 border border-zinc-800 shadow-xl rounded-lg p-1 z-50">
              {jobTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setSelectedJobType(type);
                    setActiveDropdown(null);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md capitalize transition-colors ${selectedJobType === type ? "bg-blue-600 text-white" : "text-zinc-300 hover:bg-zinc-800 hover:text-white"}`}
                >
                  {type === "all" ? "All Types" : type}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Workplace Dropdown Filter (Remote vs On-site) */}
        <div className="w-full md:w-44 relative">
          <label className="text-sm font-medium text-zinc-300 mb-1.5 block">
            Workplace
          </label>
          <button
            type="button"
            onClick={() => toggleDropdown("location")}
            className="w-full flex justify-between items-center px-3 h-10 border border-zinc-700 rounded-lg text-sm bg-zinc-950 text-white transition-all hover:bg-zinc-900"
          >
            <span className="truncate">
              {selectedLocation === "all" && "All Locations"}
              {selectedLocation === "remote" && "Remote"}
              {selectedLocation === "on-site" && "On-site"}
            </span>
            <span
              className={`text-[10px] text-zinc-500 transition-transform duration-200 ${activeDropdown === "location" ? "rotate-180" : ""}`}
            >
              ▼
            </span>
          </button>

          {activeDropdown === "location" && (
            <div className="absolute left-0 right-0 top-[46px] bg-zinc-950 border border-zinc-800 shadow-xl rounded-lg p-1 z-50">
              <button
                type="button"
                onClick={() => {
                  setSelectedLocation("all");
                  setActiveDropdown(null);
                }}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${selectedLocation === "all" ? "bg-blue-600 text-white" : "text-zinc-300 hover:bg-zinc-800 hover:text-white"}`}
              >
                All Locations
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedLocation("remote");
                  setActiveDropdown(null);
                }}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${selectedLocation === "remote" ? "bg-blue-600 text-white" : "text-zinc-300 hover:bg-zinc-800 hover:text-white"}`}
              >
                Remote Only
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedLocation("on-site");
                  setActiveDropdown(null);
                }}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${selectedLocation === "on-site" ? "bg-blue-600 text-white" : "text-zinc-300 hover:bg-zinc-800 hover:text-white"}`}
              >
                On-site Only
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grid Results Matrix Layout Display */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {filteredJobs.map((jobData) => (
            <JobCard
              key={jobData._id?.$oid || jobData.jobTitle}
              job={jobData}
            />
          ))}
        </div>
      ) : (
        <div className="w-full text-center py-16 text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
          No job openings match your current search constraints.
        </div>
      )}
    </div>
  );
}
