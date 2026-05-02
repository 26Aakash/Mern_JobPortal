import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiBookmark, FiCheckCircle } from "react-icons/fi";

import StatusBadge from "../components/StatusBadge";
import useAuth from "../hooks/useAuth";
import useJobs from "../hooks/useJobs";
import api from "../services/api";
import { getSavedJobIds, toggleSavedJob } from "../services/savedJobs";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { deleteJob } = useJobs();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    setSaved(getSavedJobIds().includes(id));
  }, [id]);

  useEffect(() => {
    async function loadData() {
      try {
        const [jobResponse, applicationsResponse] = await Promise.all([
          api.get(`/jobs/${id}`),
          api.get("/applications/user"),
        ]);

        setJob(jobResponse.data);
        setApplied(applicationsResponse.data.some((item) => item.jobId === id));
      } catch (apiError) {
        setError(apiError.response?.data?.message || "Could not load this job.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  const handleApply = async () => {
    try {
      await api.post(`/applications/apply/${id}`);
      setApplied(true);
    } catch (apiError) {
      setError(
        apiError.response?.data?.message || "Could not submit your application."
      );
    }
  };

  if (loading) {
    return (
      <div className="page-shell">
        <div className="container-wide py-12 text-sm text-slate-500">
          Loading job...
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="page-shell">
        <div className="container-wide py-12">
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
            {error || "Job not found"}
          </div>
        </div>
      </div>
    );
  }

  const isAdmin = user?.role === "admin";

  return (
    <div className="page-shell">
      <div className="container-wide py-10 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-[1.3fr,0.7fr]">
          <section className="card-elevated rounded-[28px] p-6 lg:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-950">{job.role}</h1>
              <StatusBadge status={job.status} />
            </div>
            <p className="mt-3 text-lg font-medium text-slate-700">
              {job.companyName}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Salary
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {job.salary || "Not listed"}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Location
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {job.location || "Remote"}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Description
              </p>
              <div className="mt-3 rounded-3xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700">
                {job.description}
              </div>
            </div>
          </section>

          <aside className="card-elevated rounded-[28px] p-6 lg:p-8">
            <p className="text-sm font-semibold text-slate-900">Quick actions</p>
            <div className="mt-5 grid gap-3">
              {isAdmin ? (
                <>
                  <Link to={`/edit-job/${job._id}`} className="btn-primary justify-center">
                    Edit job
                  </Link>
                  <button
                    type="button"
                    onClick={async () => {
                      await deleteJob(job._id);
                      navigate("/admin");
                    }}
                    className="rounded-xl border border-rose-200 px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                  >
                    Delete job
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    disabled={applied}
                    onClick={handleApply}
                    className="btn-primary justify-center disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {applied ? (
                      <>
                        <FiCheckCircle className="h-4 w-4" />
                        Already applied
                      </>
                    ) : (
                      "Apply now"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSaved(toggleSavedJob(job._id).includes(job._id))}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <FiBookmark className="h-4 w-4" />
                    {saved ? "Saved" : "Save job"}
                  </button>
                </>
              )}
              <Link to="/jobs" className="btn-outline justify-center">
                Back to jobs
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
