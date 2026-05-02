import { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";

import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logOut, user } = useAuth();

  const navItems = useMemo(() => {
    const items = [{ path: "/", title: "Home" }];

    if (isAuthenticated) {
      items.push({ path: "/jobs", title: "Jobs" });
      items.push({ path: "/dashboard", title: "My Applications" });

      if (user?.role === "admin") {
        items.push({ path: "/admin", title: "Admin" });
      }
    }

    return items;
  }, [isAuthenticated, user?.role]);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <nav className="container-wide flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-blue to-indigo-600 text-white shadow-lg shadow-blue/25">
            CT
          </div>
          <div>
            <p className="text-base font-bold text-slate-900">Job Tracker</p>
            <p className="text-xs text-slate-500">Keep your search organized</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 transition hover:border-slate-300 hover:shadow-sm"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                  {initials}
                </span>
                <span className="text-left">
                  <span className="block text-sm font-semibold text-slate-900">
                    {user?.name}
                  </span>
                  <span className="block text-xs uppercase tracking-[0.15em] text-slate-500">
                    {user?.role}
                  </span>
                </span>
              </Link>
              <button onClick={logOut} className="btn-outline">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost">
                Log in
              </Link>
              <Link to="/sign-up" className="btn-primary">
                Get started
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 md:hidden"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <FaXmark /> : <FaBarsStaggered />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="container-wide space-y-3 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                {item.title}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
                    <FiUser className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-slate-900">
                      {user?.name}
                    </span>
                    <span className="block text-xs uppercase tracking-[0.15em] text-slate-500">
                      {user?.role}
                    </span>
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logOut();
                    setIsMenuOpen(false);
                  }}
                  className="btn-outline w-full justify-center"
                >
                  Log out
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <Link to="/login" className="btn-outline flex-1 justify-center">
                  Log in
                </Link>
                <Link to="/sign-up" className="btn-primary flex-1 justify-center">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
