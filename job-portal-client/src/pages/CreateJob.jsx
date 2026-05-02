import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminJobForm from "../components/AdminJobForm";
import useJobs from "../hooks/useJobs";

export default function CreateJob() {
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { createJob } = useJobs();

  const handleCreate = async (values) => {
    setSaving(true);
    setError("");

    try {
      const job = await createJob(values);
      navigate(`/jobs/${job._id}`);
    } catch (apiError) {
      setError(
        apiError.response?.data?.message || "Could not save the job right now."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="container-wide py-10 lg:py-14">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            Admin
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Add a new job posting
          </h1>
        </div>

        <section className="card-elevated rounded-[28px] p-6 lg:p-8">
          {error && (
            <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}
          <AdminJobForm
            submitLabel="Publish job"
            isSubmitting={saving}
            onSubmit={handleCreate}
          />
        </section>
      </div>
    </div>
  );
}
