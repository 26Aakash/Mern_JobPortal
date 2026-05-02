import React, { useState } from "react";
import { FiMail, FiUpload, FiArrowRight, FiCheck } from "react-icons/fi";
import axios from "axios";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setSubscribing(true);
    try {
      await axios.post(`${API_BASE_URL}/api/subscribe`, { email });
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to subscribe");
    } finally {
      setSubscribing(false);
    }
  };

  const handleUploadResume = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF or DOC/DOCX file");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    const token = localStorage.getItem('jobportal_token');
    if (!token) {
      alert("Please login to upload resume");
      return;
    }

    setUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append('resume', file);

      await axios.post(`${API_BASE_URL}/api/upload-resume`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to upload resume");
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue/5 to-indigo-50 p-8 md:p-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Newsletter Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-lg bg-blue/10">
              <FiMail className="h-5 w-5 text-blue" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Stay updated
            </h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Get personalized job recommendations delivered to your inbox. Never miss an opportunity that matches your profile.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-3 pt-2">
            <div className="flex gap-2">
              <input
                type="email"
                name="email"
                id="newsletter-email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field flex-1 text-sm"
                disabled={subscribing}
              />
              <button
                type="submit"
                className="btn-primary px-4 py-2.5 disabled:opacity-50"
                title="Subscribe to newsletter"
                disabled={subscribing}
              >
                {subscribing ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <FiArrowRight className="h-4 w-4" />
                )}
              </button>
            </div>
            {subscribed && (
              <p className="text-xs text-emerald-600 font-medium">
                ✓ Thanks for subscribing! Check your inbox.
              </p>
            )}
          </form>
          <p className="text-xs text-slate-500">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>

        {/* Resume Section */}
        <div className="space-y-4 md:border-l md:border-slate-200 md:pl-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-lg bg-blue/10">
              <FiUpload className="h-5 w-5 text-blue" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Get noticed faster
            </h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Upload your resume to get recommended to top companies. Make your profile stand out and attract recruiter invitations.
          </p>
          <div className="mt-4">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleUploadResume}
              className="hidden"
              id="resume-upload"
              disabled={uploadLoading}
            />
            <label
              htmlFor="resume-upload"
              className="btn-primary gap-2 inline-flex w-full md:w-auto justify-center cursor-pointer disabled:opacity-50"
            >
              {uploadLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : uploadSuccess ? (
                <FiCheck className="h-4 w-4" />
              ) : (
                <FiUpload className="h-4 w-4" />
              )}
              <span>
                {uploadLoading ? "Uploading..." : uploadSuccess ? "Uploaded!" : "Upload resume"}
              </span>
            </label>
          </div>
          {uploadSuccess && (
            <p className="text-xs text-emerald-600 font-medium">
              ✓ Resume uploaded successfully!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
