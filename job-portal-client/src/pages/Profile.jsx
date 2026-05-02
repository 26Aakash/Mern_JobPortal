import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import useAuth from "../hooks/useAuth";
import api from "../services/api";

export default function Profile() {
  const { logOut, updateProfile, user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
    },
  });

  useEffect(() => {
    reset({ name: user?.name || "" });
  }, [reset, user?.name]);

  useEffect(() => {
    async function loadApplications() {
      try {
        const response = await api.get("/applications/user");
        setApplications(response.data);
      } catch (_error) {
        setApplications([]);
      }
    }

    loadApplications();
  }, []);

  const summary = useMemo(
    () => ({
      total: applications.length,
      selected: applications.filter((item) => item.status === "Selected").length,
      active: applications.filter((item) =>
        ["Applied", "Reviewed"].includes(item.status)
      ).length,
    }),
    [applications]
  );

  const onSubmit = async (values) => {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      await updateProfile(values);
      setMessage("Profile updated successfully.");
    } catch (apiError) {
      setError(
        apiError.response?.data?.message || "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="container-wide py-10 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-[0.85fr,1.15fr]">
          <section className="card-elevated rounded-[28px] p-6 lg:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              Profile
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-950">{user?.name}</h1>
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-900">Email:</span> {user?.email}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Role:</span>{" "}
                {user?.role?.charAt(0).toUpperCase()}
                {user?.role?.slice(1)}
              </p>
            </div>
            <button onClick={logOut} className="btn-outline mt-8 justify-center">
              Logout
            </button>
          </section>

          <section className="card-elevated rounded-[28px] p-6 lg:p-8">
            <h2 className="text-xl font-semibold text-slate-950">Update profile</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Name
                </label>
                <input
                  className="input-field"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="mt-2 text-xs text-rose-600">{errors.name.message}</p>
                )}
              </div>

              {message && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {message}
                </div>
              )}

              {error && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </div>
              )}

              <button type="submit" disabled={saving} className="btn-primary justify-center">
                {saving ? "Saving..." : "Update profile"}
              </button>
            </form>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Applications</p>
                <p className="mt-2 text-3xl font-bold text-slate-950">{summary.total}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Active</p>
                <p className="mt-2 text-3xl font-bold text-slate-950">{summary.active}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Selected</p>
                <p className="mt-2 text-3xl font-bold text-slate-950">{summary.selected}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
