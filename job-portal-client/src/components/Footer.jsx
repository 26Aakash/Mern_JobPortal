import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="container-wide flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-white">Job Tracker</p>
          <p className="text-sm text-slate-400">
            Stay on top of applications, interviews, and next steps.
          </p>
        </div>

        <div className="flex flex-wrap gap-5 text-sm text-slate-400">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-white">
            Dashboard
          </Link>
          <Link to="/applications/new" className="hover:text-white">
            Add Application
          </Link>
          <Link to="/about" className="hover:text-white">
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
