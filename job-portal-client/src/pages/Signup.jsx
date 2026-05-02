import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function Signup() {
  const navigate = useNavigate();
  const { register: signUp } = useAuth();
  const [apiError, setApiError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: "user",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async ({ confirmPassword, ...values }) => {
    setSubmitting(true);
    setApiError("");

    try {
      const nextUser = await signUp(values);
      navigate(nextUser.role === "admin" ? "/admin" : "/jobs");
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Unable to create your account."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-shell flex items-center justify-center px-4 py-12">
      <div className="glass-card w-full max-w-md rounded-[28px] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
          Create account
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-950">Start tracking</h1>
        <p className="mt-2 text-sm text-slate-600">
          Set up your account and keep your search pipeline in one place.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Full name
            </label>
            <input
              className="input-field"
              {...register("name", { required: "Name is required" })}
              placeholder="Aakash Kumar"
            />
            {errors.name && (
              <p className="mt-2 text-xs text-rose-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Email
            </label>
            <input
              className="input-field"
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-2 text-xs text-rose-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Role
            </label>
            <select className="input-field" {...register("role")}>
              <option value="user">User</option>
              <option value="recruiter">Recruiter</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Password
            </label>
            <input
              className="input-field"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              placeholder="At least 6 characters"
            />
            {errors.password && (
              <p className="mt-2 text-xs text-rose-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Confirm password
            </label>
            <input
              className="input-field"
              type="password"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              placeholder="Repeat your password"
            />
            {errors.confirmPassword && (
              <p className="mt-2 text-xs text-rose-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {apiError && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {apiError}
            </div>
          )}

          <button type="submit" disabled={submitting} className="btn-primary w-full justify-center">
            {submitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-600">
          Already registered?{" "}
          <Link to="/login" className="font-semibold text-sky-700 hover:text-sky-800">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
