import React, { useState } from "react";
import { FiMapPin, FiSearch, FiTrendingUp } from "react-icons/fi";
import { MdBusiness } from "react-icons/md";
import { HiArrowRight } from "react-icons/hi2";

const Banner = ({ handleInputChange }) => {
  const [searchFilters, setSearchFilters] = useState({
    jobTitle: "",
    company: "",
    location: ""
  });

  const handleFilterChange = (field, value) => {
    const newFilters = { ...searchFilters, [field]: value };
    setSearchFilters(newFilters);

    // Combine all search terms for the main query
    const combinedQuery = [newFilters.jobTitle, newFilters.company, newFilters.location]
      .filter(Boolean)
      .join(" ");
    handleInputChange({ target: { value: combinedQuery } });
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue/5 to-indigo-50/30">
      <div className="max-w-screen-2xl container mx-auto xl:px-24 md:py-24 py-16 px-4 animate-fade-in-soft">
        {/* Top Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue/10 px-4 py-2 text-sm font-semibold text-blue border border-blue/20">
            <FiTrendingUp className="w-4 h-4" />
            Discover your next opportunity
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 leading-tight">
            Find your{" "}
            <span className="bg-gradient-to-r from-blue to-indigo-600 bg-clip-text text-transparent">
              perfect job
            </span>{" "}
            today
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Join thousands of professionals discovering their dream roles at leading
            companies. Filter by role, location, and salary to find what&apos;s right for you.
          </p>
        </div>

        {/* Enhanced Search Form */}
        <div className="max-w-5xl mx-auto mb-8">
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 bg-white rounded-xl shadow-xl shadow-blue/10 ring-1 ring-slate-100 p-2">
              {/* Job Title/Keyword Input */}
              <div className="relative flex-1">
                <div className="relative group">
                  <FiSearch className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-blue transition-colors" />
                  <input
                    type="text"
                    name="jobTitle"
                    id="jobTitle"
                    className="block w-full border-0 bg-transparent py-3 pl-12 pr-4 text-sm md:text-base text-slate-900 placeholder:text-slate-400 focus:ring-0 rounded-lg lg:rounded-none lg:rounded-l-xl"
                    placeholder="Search jobs, companies, or locations"
                    value={searchFilters.jobTitle}
                    onChange={(e) => handleFilterChange("jobTitle", e.target.value)}
                  />
                </div>
              </div>

              <div className="hidden lg:block w-px bg-slate-200"></div>

              {/* Company Input */}
              <div className="relative flex-1">
                <div className="relative group">
                  <MdBusiness className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-blue transition-colors" />
                  <input
                    type="text"
                    name="company"
                    id="company"
                    className="block w-full border-0 bg-transparent py-3 pl-12 pr-4 text-sm md:text-base text-slate-900 placeholder:text-slate-400 focus:ring-0"
                    placeholder="Company name"
                    value={searchFilters.company}
                    onChange={(e) => handleFilterChange("company", e.target.value)}
                  />
                </div>
              </div>

              <div className="hidden lg:block w-px bg-slate-200"></div>

              {/* Location Input */}
              <div className="relative flex-1">
                <div className="relative group">
                  <FiMapPin className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-blue transition-colors" />
                  <input
                    type="text"
                    name="location"
                    id="location"
                    className="block w-full border-0 bg-transparent py-3 pl-12 pr-4 text-sm md:text-base text-slate-900 placeholder:text-slate-400 focus:ring-0 rounded-lg lg:rounded-none lg:rounded-r-xl"
                    placeholder="City, state, or remote"
                    value={searchFilters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="lg:ml-3">
                <button
                  type="submit"
                  className="w-full lg:w-auto px-6 py-3 btn-primary rounded-lg lg:rounded-xl flex items-center justify-center gap-2 group"
                >
                  <span>Search Jobs</span>
                  <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Trending Searches */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs text-slate-500">
              <span className="font-medium">Popular searches:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="px-3 py-1 rounded-full bg-slate-100/80 hover:bg-slate-200 hover:text-blue transition-all"
                  onClick={() => handleFilterChange("jobTitle", "React Developer")}
                >
                  React Developer
                </button>
                <button
                  type="button"
                  className="px-3 py-1 rounded-full bg-slate-100/80 hover:bg-slate-200 hover:text-blue transition-all"
                  onClick={() => handleFilterChange("jobTitle", "Product Manager")}
                >
                  Product Manager
                </button>
                <button
                  type="button"
                  className="px-3 py-1 rounded-full bg-slate-100/80 hover:bg-slate-200 hover:text-blue transition-all"
                  onClick={() => handleFilterChange("jobTitle", "Data Scientist")}
                >
                  Data Scientist
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Featured/Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
          <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-100 hover:border-blue/30 hover:shadow-md transition-all">
            <div className="text-2xl sm:text-3xl font-bold text-blue mb-1">12K+</div>
            <div className="text-xs sm:text-sm text-slate-600">Active Jobs</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-100 hover:border-blue/30 hover:shadow-md transition-all">
            <div className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-1">500+</div>
            <div className="text-xs sm:text-sm text-slate-600">Companies</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-100 hover:border-blue/30 hover:shadow-md transition-all">
            <div className="text-2xl sm:text-3xl font-bold text-blue mb-1">50K+</div>
            <div className="text-xs sm:text-sm text-slate-600">Candidates Hired</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-100 hover:border-blue/30 hover:shadow-md transition-all">
            <div className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-1">24/7</div>
            <div className="text-xs sm:text-sm text-slate-600">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
