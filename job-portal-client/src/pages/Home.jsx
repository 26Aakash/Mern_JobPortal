import { Link } from "react-router-dom";
import { FiArrowRight, FiCheckCircle, FiShield, FiTrendingUp } from "react-icons/fi";

import useAuth from "../hooks/useAuth";

const featureCards = [
  {
    title: "Track every stage",
    description: "Move from Applied to Interview, Offer, or Rejected with zero spreadsheet friction.",
    icon: FiTrendingUp,
  },
  {
    title: "Secure auth flow",
    description: "JWT login, hashed passwords, route protection, and centralized API headers.",
    icon: FiShield,
  },
  {
    title: "Built for focus",
    description: "Search, filter, sort, and review your pipeline from one responsive dashboard.",
    icon: FiCheckCircle,
  },
];

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="page-shell">
      <section className="container-wide py-16 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr,0.85fr]">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Keep your job search organized, fast, and actually usable.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Track your job applications, manage opportunities, and stay organized throughout your job search journey.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to={
                  isAuthenticated
                    ? user?.role === "admin"
                      ? "/admin"
                      : "/jobs"
                    : "/sign-up"
                }
                className="btn-primary"
              >
                {isAuthenticated
                  ? user?.role === "admin"
                    ? "Open Admin Panel"
                    : "Browse Jobs"
                  : "Create account"}
                <FiArrowRight className="h-4 w-4" />
              </Link>
              <Link to={isAuthenticated ? "/dashboard" : "/login"} className="btn-outline">
                View application tracker
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-blue/20 via-sky-100 to-emerald-100 blur-2xl" />
            <div className="glass-card relative overflow-hidden rounded-[32px] p-6">
              <div className="grid gap-4">
                <div className="rounded-2xl bg-slate-900 p-5 text-white">
                  <p className="text-sm text-slate-300">This week</p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-3xl font-bold">18</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Applications</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-emerald-300">4</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Interviews</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">Recent pipeline</p>
                    <span className="text-xs text-slate-500">Sorted by date</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      ["Stripe", "Product Engineer", "Interview"],
                      ["Notion", "Frontend Engineer", "Applied"],
                      ["Figma", "Design Systems Engineer", "Offer"],
                    ].map(([company, role, status]) => (
                      <div
                        key={`${company}-${role}`}
                        className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
                      >
                        <div>
                          <p className="font-semibold text-slate-900">{company}</p>
                          <p className="text-sm text-slate-500">{role}</p>
                        </div>
                        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                          {status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-wide pb-16 lg:pb-24">
        <div className="grid gap-5 md:grid-cols-3">
          {featureCards.map(({ title, description, icon: Icon }) => (
            <article key={title} className="card-elevated rounded-3xl p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
