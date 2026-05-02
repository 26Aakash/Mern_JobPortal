import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const PageHeader = ({ title, path }) => {
  return (
    <div className="relative border-b border-slate-200/50 bg-gradient-to-r from-blue/10 via-slate-50 to-indigo-50 py-16 md:py-24">
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link to="/" className="hover:text-blue transition-colors font-medium">
              Home
            </Link>
            <FiChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-blue font-semibold">{path}</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-base text-slate-600">
            Explore your options and find what&apos;s right for you
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -z-10 opacity-5">
        <div className="absolute w-96 h-96 bg-blue rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default PageHeader;
