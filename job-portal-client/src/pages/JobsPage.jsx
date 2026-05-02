import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiBookmark, FiCheckCircle, FiSearch } from "react-icons/fi";

import StatusBadge from "../components/StatusBadge";
import useJobs from "../hooks/useJobs";
import api from "../services/api";
import { getSavedJobIds, toggleSavedJob } from "../services/savedJobs";

export default function JobsPage() {
  const { fetchJobs, filters, jobs, loading, setFilters } = useJobs();
  const [savedIds, setSavedIds] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    fetchJobs({ status: "Open" });
    setSavedIds(getSavedJobIds());
  }, [fetchJobs]);

  useEffect(() => {
    async function loadApplications() {
      try {
        const response = await api.get("/applications/user");
        setAppliedJobIds(response.data.map((item) => item.jobId));
      } catch (_error) {
        setAppliedJobIds([]);
      }
    }

    loadApplications();
  }, []);

  const visibleJobs = useMemo(
    () => jobs.filter((job) => !filters.status || job.status === filters.status),
    [filters.status, jobs]
  );

  const handleApply = async (jobId) => {
    try {
      await api.post(`/applications/apply/${jobId}`);
      // Mirror the applied state locally so the CTA updates without a full page refresh.
      setAppliedJobIds((current) => [...new Set([...current, jobId])]);
      setActionMessage("Application submitted successfully.");
    } catch (error) {
      setActionMessage(
        error.response?.data?.message || "Unable to apply for this job."
      );
    }
  };

  return (
    <div className="page-shell">
      <div className="container-wide py-10 lg:py-14">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            Jobs
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Explore open roles
          </h1>
        </div>

        <section className="card-elevated rounded-[28px] p-5 lg:p-7">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              fetchJobs();
            }}
            className="grid gap-4 lg:grid-cols-[1.5fr,1fr,1fr,auto]"
          >
            <label className="relative block">
              <FiSearch className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <input
                className="input-field pl-11"
                value={filters.search}
                onChange={(event) => setFilters({ search: event.target.value })}
                placeholder="Search company, role, or location"
              />
            </label>

            <select
              className="input-field"
              value={filters.status}
              onChange={(event) => setFilters({ status: event.target.value })}
            >
              <option value="">All statuses</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>

            <select
              className="input-field"
              value={filters.sortBy}
              onChange={(event) => setFilters({ sortBy: event.target.value })}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>

            <button type="submit" className="btn-primary justify-center">
              Filter jobs
            </button>
          </form>

          {actionMessage && (
            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {actionMessage}
            </div>
          )}

          <div className="mt-6 grid gap-4">
            {loading ? (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
                Loading jobs...
              </div>
            ) : visibleJobs.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
                No jobs matched your search.
              </div>
            ) : (
              visibleJobs.map((job) => {
                const alreadyApplied = appliedJobIds.includes(job._id);
                const saved = savedIds.includes(job._id);

                return (
                  <article
                    key={job._id}
                    className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-xl font-semibold text-slate-950">
                            {job.role}
                          </h2>
                          <StatusBadge status={job.status} />
                        </div>
                        <p className="font-medium text-slate-700">{job.companyName}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                          <span>{job.location || "Remote / flexible"}</span>
                          <span>{job.salary || "Compensation not listed"}</span>
                        </div>
                        <p className="max-w-3xl text-sm leading-7 text-slate-600">
                          {job.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Link to={`/jobs/${job._id}`} className="btn-outline">
                          View details
                        </Link>
                        <button
                          type="button"
                          disabled={alreadyApplied}
                          onClick={() => handleApply(job._id)}
                          className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {alreadyApplied ? (
                            <>
                              <FiCheckCircle className="h-4 w-4" />
                              Applied
                            </>
                          ) : (
                            "Apply now"
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setSavedIds(toggleSavedJob(job._id))}
                          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          <FiBookmark className="h-4 w-4" />
                          {saved ? "Saved" : "Save"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
