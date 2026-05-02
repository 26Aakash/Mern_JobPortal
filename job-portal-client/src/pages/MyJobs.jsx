import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

import StatusBadge from "../components/StatusBadge";
import api from "../services/api";

function StatCard({ label, value }) {
  return (
    <div className="card-elevated rounded-3xl p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
    </div>
  );
}

export default function MyJobs() {
  const [applications, setApplications] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadApplications() {
      try {
        const response = await api.get("/applications/user");
        setApplications(response.data);
      } catch (apiError) {
        setError(
          apiError.response?.data?.message ||
            "Unable to load your applications right now."
        );
      } finally {
        setLoading(false);
      }
    }

    loadApplications();
  }, []);

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const haystack = `${application.job?.companyName || ""} ${application.job?.role || ""}`.toLowerCase();
      const matchesSearch =
        !filters.search || haystack.includes(filters.search.toLowerCase());
      const matchesStatus =
        !filters.status || application.status === filters.status;

      return matchesSearch && matchesStatus;
    });
  }, [applications, filters]);

  const stats = useMemo(
    () => ({
      total: applications.length,
      applied: applications.filter((item) => item.status === "Applied").length,
      reviewed: applications.filter((item) => item.status === "Reviewed").length,
      selected: applications.filter((item) => item.status === "Selected").length,
    }),
    [applications]
  );

  return (
    <div className="page-shell">
      <div className="container-wide py-10 lg:py-14">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-950 lg:text-4xl">
              Your job applications
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
              Review every role you applied for and track the current selection status.
            </p>
          </div>

          <Link to="/jobs" className="btn-primary">
            Browse jobs
          </Link>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total applications" value={stats.total} />
          <StatCard label="Applied" value={stats.applied} />
          <StatCard label="Reviewed" value={stats.reviewed} />
          <StatCard label="Selected" value={stats.selected} />
        </div>

        <section className="card-elevated rounded-[28px] p-5 lg:p-7">
          <div className="grid gap-4 lg:grid-cols-[1.5fr,1fr]">
            <label className="relative block">
              <FiSearch className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <input
                className="input-field pl-11"
                value={filters.search}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    search: event.target.value,
                  }))
                }
                placeholder="Search company or role"
              />
            </label>

            <select
              className="input-field"
              value={filters.status}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  status: event.target.value,
                }))
              }
            >
              <option value="">All statuses</option>
              <option value="Applied">Applied</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Rejected">Rejected</option>
              <option value="Selected">Selected</option>
            </select>
          </div>

          {error && (
            <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          <div className="mt-6 grid gap-4">
            {loading ? (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
                Loading applications...
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center">
                <h2 className="text-xl font-semibold text-slate-900">
                  No applications found
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Start by applying to a role from the jobs page.
                </p>
              </div>
            ) : (
              filteredApplications.map((application) => (
                <article
                  key={application._id}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-xl font-semibold text-slate-950">
                          {application.job?.role}
                        </h2>
                        <StatusBadge status={application.status} />
                      </div>
                      <p className="text-base font-medium text-slate-700">
                        {application.job?.companyName}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                        <span>{application.job?.location || "Remote"}</span>
                        <span>{application.job?.salary || "Salary not listed"}</span>
                        <span>
                          Applied {new Date(application.appliedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link to={`/applications/${application._id}`} className="btn-outline">
                        View
                      </Link>
                      <Link to={`/jobs/${application.jobId}`} className="btn-primary">
                        Job details
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
