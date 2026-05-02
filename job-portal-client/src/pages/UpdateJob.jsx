import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminJobForm from "../components/AdminJobForm";
import api from "../services/api";
import useJobs from "../hooks/useJobs";

export default function UpdateJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateJob } = useJobs();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadJob() {
      try {
        const response = await api.get(`/jobs/${id}`);
        setJob(response.data);
      } catch (apiError) {
        setError(apiError.response?.data?.message || "Unable to load this job.");
      } finally {
        setLoading(false);
      }
    }

    loadJob();
  }, [id]);

  const handleUpdate = async (values) => {
    setSaving(true);
    setError("");

    try {
      const updatedJob = await updateJob(id, values);
      navigate(`/jobs/${updatedJob._id}`);
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Could not update the job.");
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
            Update job posting
          </h1>
        </div>

        <section className="card-elevated rounded-[28px] p-6 lg:p-8">
          {loading ? (
            <div className="text-sm text-slate-500">Loading job...</div>
          ) : error && !job ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </div>
              )}
              <AdminJobForm
                defaultValues={job}
                submitLabel="Update job"
                isSubmitting={saving}
                onSubmit={handleUpdate}
              />
            </>
          )}
        </section>
      </div>
    </div>
  );
}
