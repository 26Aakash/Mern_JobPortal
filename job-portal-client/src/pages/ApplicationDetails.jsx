import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import StatusBadge from "../components/StatusBadge";
import api from "../services/api";

export default function ApplicationDetails() {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadApplication() {
      try {
        const response = await api.get(`/applications/user/${id}`);
        setApplication(response.data);
      } catch (apiError) {
        setError(
          apiError.response?.data?.message ||
            "Unable to load this application."
        );
      } finally {
        setLoading(false);
      }
    }

    loadApplication();
  }, [id]);

  if (loading) {
    return (
      <div className="page-shell">
        <div className="container-wide py-12 text-sm text-slate-500">
          Loading application...
        </div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="page-shell">
        <div className="container-wide py-12">
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
            {error || "Application not found"}
          </div>
        </div>
      </div>
    );
  }

  const { job } = application;

  return (
    <div className="page-shell">
      <div className="container-wide py-10 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-[1.3fr,0.7fr]">
          <section className="card-elevated rounded-[28px] p-6 lg:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-950">{job?.role}</h1>
              <StatusBadge status={application.status} />
            </div>
            <p className="mt-3 text-lg font-medium text-slate-700">
              {job?.companyName}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Salary
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {job?.salary || "Not listed"}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Location
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {job?.location || "Remote"}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 md:col-span-2">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Description
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  {job?.description}
                </p>
              </div>
            </div>
          </section>

          <aside className="card-elevated rounded-[28px] p-6 lg:p-8">
            <p className="text-sm font-semibold text-slate-900">Application info</p>
            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Status
                </p>
                <div className="mt-2">
                  <StatusBadge status={application.status} />
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Applied at
                </p>
                <p className="mt-2 font-medium text-slate-900">
                  {new Date(application.appliedAt).toLocaleString()}
                </p>
              </div>
            </div>
            <Link to="/dashboard" className="btn-outline mt-6 justify-center">
              Back to dashboard
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
