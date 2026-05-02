import React from "react";
import { FiTarget, FiUsers, FiBriefcase, FiTrendingUp, FiSearch, FiUpload, FiBell, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue/5 to-indigo-50/30">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue to-indigo-600 text-white">
        <div className="max-w-screen-2xl container mx-auto px-4 xl:px-24 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Connecting Talent with Opportunity
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              We&apos;re revolutionizing the way people find jobs and companies discover talent.
              Our platform bridges the gap between job seekers and employers worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-screen-2xl container mx-auto px-4 xl:px-24 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-blue/10">
                <FiTarget className="h-8 w-8 text-blue" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed">
              To empower every individual to find meaningful work and help companies build
              exceptional teams. We believe that the right job can transform lives, and the
              right talent can transform businesses.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Our platform serves as a bridge between ambition and opportunity, making the
              job search process transparent, efficient, and rewarding for everyone involved.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue/10 to-indigo-100 p-8 flex items-center justify-center">
              <div className="text-center space-y-4">
                <FiUsers className="h-16 w-16 text-blue mx-auto" />
                <div className="text-4xl font-bold text-slate-900">50K+</div>
                <div className="text-slate-600">Successful Placements</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white py-16 md:py-24">
        <div className="max-w-screen-2xl container mx-auto px-4 xl:px-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive solutions designed to meet the needs of both job seekers and employers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* For Job Seekers */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-green-100">
                  <FiBriefcase className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">For Job Seekers</h3>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="p-2 rounded-lg bg-blue/10 flex-shrink-0">
                    <FiSearch className="h-5 w-5 text-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Smart Job Search</h4>
                    <p className="text-slate-600">Advanced filters and AI-powered recommendations to find your perfect role</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-2 rounded-lg bg-blue/10 flex-shrink-0">
                    <FiUpload className="h-5 w-5 text-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Resume Upload</h4>
                    <p className="text-slate-600">Showcase your skills with our secure resume upload and profile building tools</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-2 rounded-lg bg-blue/10 flex-shrink-0">
                    <FiBell className="h-5 w-5 text-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Job Alerts</h4>
                    <p className="text-slate-600">Get notified when new opportunities match your preferences</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Employers */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-purple-100">
                  <FiTrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">For Employers</h3>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="p-2 rounded-lg bg-purple/10 flex-shrink-0">
                    <FiUsers className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Talent Discovery</h4>
                    <p className="text-slate-600">Access a diverse pool of qualified candidates actively seeking opportunities</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-2 rounded-lg bg-purple/10 flex-shrink-0">
                    <FiTarget className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Precise Matching</h4>
                    <p className="text-slate-600">Our algorithms match candidates with roles that fit their skills and career goals</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-2 rounded-lg bg-purple/10 flex-shrink-0">
                    <FiHeart className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Streamlined Hiring</h4>
                    <p className="text-slate-600">Post jobs and manage applications with our intuitive employer dashboard</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="max-w-screen-2xl container mx-auto px-4 xl:px-24 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Making a Difference
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our platform has helped thousands of professionals find meaningful careers
            and companies build exceptional teams
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl bg-white shadow-lg shadow-blue/10 border border-slate-100">
            <div className="text-4xl font-bold text-blue mb-2">12K+</div>
            <div className="text-slate-600">Active Job Listings</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white shadow-lg shadow-blue/10 border border-slate-100">
            <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
            <div className="text-slate-600">Partner Companies</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white shadow-lg shadow-blue/10 border border-slate-100">
            <div className="text-4xl font-bold text-blue mb-2">50K+</div>
            <div className="text-slate-600">Successful Placements</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="max-w-screen-2xl container mx-auto px-4 xl:px-24 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have found their dream jobs through our platform.
            Your next opportunity is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="btn-primary bg-white text-slate-900 hover:bg-slate-100"
            >
              Browse Jobs
            </Link>
            <Link
              to="/blog"
              className="btn-secondary border-white text-white hover:bg-white hover:text-slate-900"
            >
              Read Career Tips
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
