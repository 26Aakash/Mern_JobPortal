import {
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiMapPin,
  FiArrowRight,
  FiBriefcase,
} from "react-icons/fi";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";

const Card = ({ data }) => {
  const [isSaved, setIsSaved] = useState(false);

  const {
    _id,
    companyLogo,
    jobTitle,
    companyName,
    jobLocation,
    employmentType,
    experienceLevel,
    minPrice,
    maxPrice,
    postingDate,
    description,
  } = data;

  // Calculate days since posting
  const getDaysSincePosted = (postingDate) => {
    if (!postingDate) return "Recently";
    const posted = new Date(postingDate);
    const now = new Date();
    const diffTime = Math.abs(now - posted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <Link to={`/jobs/${_id}`}>
      <div className="card-elevated group h-full p-6 flex flex-col hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-blue/20">
        {/* Header with Logo and Save Button */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-shrink-0">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 ring-1 ring-slate-200 overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
              {companyLogo ? (
                <img
                  src={companyLogo}
                  alt={companyName}
                  className="h-full w-full object-contain p-2"
                />
              ) : (
                <span className="text-lg font-bold text-slate-600">
                  {companyName?.[0] || "J"}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsSaved(!isSaved);
            }}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity"
            title={isSaved ? "Remove bookmark" : "Save job"}
          >
            {isSaved ? (
              <FaBookmark className="h-5 w-5 text-blue" />
            ) : (
              <FaRegBookmark className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Company Name and Job Title */}
        <div className="mb-4 flex-1">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 group-hover:text-blue transition-colors">
            {companyName}
          </h4>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-blue transition-colors line-clamp-2 leading-tight">
            {jobTitle}
          </h3>
        </div>

        {/* Job Meta Tags */}
        <div className="space-y-3 mb-4">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors">
              <FiMapPin className="h-3.5 w-3.5 text-blue flex-shrink-0" />
              <span>{jobLocation}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors">
              <FiClock className="h-3.5 w-3.5 text-blue flex-shrink-0" />
              <span>{employmentType}</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {experienceLevel && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                <FiBriefcase className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{experienceLevel}</span>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <FiDollarSign className="h-3.5 w-3.5 flex-shrink-0" />
              <span>
                {minPrice}-{maxPrice}k
              </span>
            </span>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {description}
          </p>
        )}

        {/* Footer with CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
          <span className="text-xs font-medium text-slate-500">
            Posted {getDaysSincePosted(postingDate)}
          </span>
          <div className="flex items-center gap-2 text-blue font-semibold text-sm group-hover:gap-3 transition-all">
            <span>Apply Now</span>
            <FiArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
