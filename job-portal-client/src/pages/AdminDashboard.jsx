import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiTrash2 } from "react-icons/fi";

import StatusBadge from "../components/StatusBadge";
import useJobs from "../hooks/useJobs";
import api from "../services/api";

export default function AdminDashboard() {
  const { deleteJob, fetchJobs, jobs, loading } = useJobs();
  const [applications, setApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);

  useEffect(() => {
    fetchJobs({ search: "", status: "", sortBy: "newest" });
  }, [fetchJobs]);

  useEffect(() => {
    async function loadApplications() {
      try {
        const response = await api.get("/applications/admin");
        setApplications(response.data);
      } catch (_error) {
        setApplications([]);
      } finally {
        setApplicationsLoading(false);
      }
    }

    loadApplications();
  }, []);

  return (
    <div className="page-shell">
      <div className="container-wide py-10 lg:py-14">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              Admin panel
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-950">
              Manage jobs and applications
            </h1>
          </div>
          <Link to="/post-job" className="btn-primary">
            <FiPlus className="h-4 w-4" />
            Add job
          </Link>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
          <section className="card-elevated rounded-[28px] p-6">
            <h2 className="text-xl font-semibold text-slate-950">Job postings</h2>
            <div className="mt-5 grid gap-4">
              {loading ? (
                <div className="text-sm text-slate-500">Loading jobs...</div>
              ) : (
                jobs.map((job) => (
                  <article
                    key={job._id}
                    className="rounded-3xl border border-slate-200 bg-white p-5"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-semibold text-slate-950">
                            {job.role}
                          </h3>
                          <StatusBadge status={job.status} />
                        </div>
                        <p className="mt-2 font-medium text-slate-700">
                          {job.companyName}
                        </p>
                        <p className="mt-2 text-sm text-slate-500">
                          {job.location || "Remote"} • {job.salary || "Salary TBD"}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Link to={`/jobs/${job._id}`} className="btn-outline">
                          View
                        </Link>
                        <Link to={`/edit-job/${job._id}`} className="btn-primary">
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => deleteJob(job._id)}
                          className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                        >
                          <FiTrash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>

          <section className="card-elevated rounded-[28px] p-6">
            <h2 className="text-xl font-semibold text-slate-950">
              Recent applications
            </h2>
            <div className="mt-5 grid gap-4">
              {applicationsLoading ? (
                <div className="text-sm text-slate-500">Loading applications...</div>
              ) : applications.length === 0 ? (
                <div className="text-sm text-slate-500">
                  No applications have been submitted yet.
                </div>
              ) : (
                applications.map((application) => (
                  <article
                    key={application._id}
                    className="rounded-3xl border border-slate-200 bg-white p-5"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-base font-semibold text-slate-950">
                        {application.job?.role}
                      </h3>
                      <StatusBadge status={application.status} />
                    </div>
                    <p className="mt-2 text-sm text-slate-700">
                      {application.user?.name || "User"} •{" "}
                      {application.user?.email || "Unknown email"}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {application.job?.companyName} • Applied{" "}
                      {new Date(application.appliedAt).toLocaleDateString()}
                    </p>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
