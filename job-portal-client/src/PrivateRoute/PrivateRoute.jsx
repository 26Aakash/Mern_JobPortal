import { Link, Navigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children, allowedRoles }) {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="page-shell flex min-h-[60vh] items-center justify-center">
        <div className="glass-card px-6 py-4 text-sm text-slate-600">
          Loading your workspace...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(user?.role)) {
    return (
      <div className="page-shell flex min-h-[60vh] items-center justify-center px-4">
        <div className="glass-card max-w-lg rounded-[28px] p-8 text-center">
          {/* Keep users inside the app with a clear fallback instead of a hard blank screen. */}
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-600">
            Access denied
          </p>
          <h1 className="mt-3 text-2xl font-bold text-slate-950">
            You do not have permission to view this page.
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            This route is restricted to {allowedRoles.join(", ")} accounts.
          </p>
          <Link to="/jobs" className="btn-primary mt-6 inline-flex">
            Go to jobs
          </Link>
        </div>
      </div>
    );
  }

  return children;
}
