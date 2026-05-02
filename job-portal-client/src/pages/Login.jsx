import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [apiError, setApiError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const from = location.state?.from?.pathname;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setSubmitting(true);
    setApiError("");

    try {
      const nextUser = await login(values);
      navigate(from || (nextUser.role === "admin" ? "/admin" : "/jobs"), {
        replace: true,
      });
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Unable to sign you in right now."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-shell flex items-center justify-center px-4 py-12">
      <div className="glass-card w-full max-w-md rounded-[28px] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
          Welcome back
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-950">Log in</h1>
        <p className="mt-2 text-sm text-slate-600">
          Continue managing your job applications.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Email
            </label>
            <input
              className="input-field"
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-2 text-xs text-rose-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Password
            </label>
            <input
              className="input-field"
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-2 text-xs text-rose-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {apiError && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {apiError}
            </div>
          )}

          <button type="submit" disabled={submitting} className="btn-primary w-full justify-center">
            {submitting ? "Signing in..." : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-600">
          Need an account?{" "}
          <Link to="/sign-up" className="font-semibold text-sky-700 hover:text-sky-800">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
