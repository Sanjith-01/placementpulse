import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  UserCircle,
  ShieldCheck,
  Terminal
} from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/modules', label: 'Company Bank' },
  { to: '/questions', label: 'Ask Seniors' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Layout({ children, user, setUser, toast, clearToast }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Toast Notification */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-900 text-white text-sm shadow-lg border border-slate-700"
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span>{toast.message}</span>
          <button
            onClick={clearToast}
            className="text-slate-400 hover:text-white ml-2"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Sticky Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-mono text-xs font-bold tracking-tighter group-hover:bg-blue-600 transition-colors">
              KP
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-slate-900 tracking-tight text-base">
                PlacementPulse
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                KCT-IT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Controls: Role Switcher + Profile/Auth */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
              <span className="text-[11px] font-mono text-slate-500 pl-2">Role:</span>
              {['junior', 'senior', 'staff'].map((r) => (
                <button
                  key={r}
                  onClick={() => setUser({ ...user, role: r })}
                  className={`px-2 py-1 rounded text-xs font-medium capitalize transition ${
                    user.role === r
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <Link
              to="/profile"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium text-slate-700 transition"
            >
              <UserCircle className="w-4 h-4 text-slate-500" />
              <span>{user.rollNo}</span>
            </Link>

            <Link
              to="/login"
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition"
            >
              Sign in
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-1.5">
              {NAV_LINKS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <div className="flex gap-1">
                {['junior', 'senior', 'staff'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setUser({ ...user, role: r })}
                    className={`px-2.5 py-1 rounded text-xs font-medium capitalize border ${
                      user.role === r
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-medium text-blue-600"
              >
                Profile ({user.rollNo}) →
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Breadcrumb Bar (Visible on all inner pages) */}
      {pathSegments.length > 0 && (
        <div className="bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs text-slate-500">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
              <Link to="/" className="hover:text-slate-900 transition">
                Home
              </Link>
              {pathSegments.map((seg, idx) => {
                const routeTo = `/${pathSegments.slice(0, idx + 1).join('/')}`;
                const isLast = idx === pathSegments.length - 1;
                return (
                  <React.Fragment key={routeTo}>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    {isLast ? (
                      <span className="font-medium text-slate-900 capitalize">{seg}</span>
                    ) : (
                      <Link to={routeTo} className="hover:text-slate-900 capitalize">
                        {seg}
                      </Link>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
            <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Active RBAC Session: {user.role.toUpperCase()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Enterprise Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-200">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-slate-900 text-white flex items-center justify-center font-mono text-xs font-bold">
                  KP
                </div>
                <span className="font-semibold text-slate-900">KCT PlacementPulse</span>
              </div>
              <p className="text-sm text-slate-600 max-w-md leading-relaxed">
                Structured campus placement intelligence for Kumaraguru College of Technology. Eliminating institutional memory loss between graduating seniors and 1st/2nd-year cohorts.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 pt-1">
                <Terminal className="w-3.5 h-3.5 text-slate-700" />
                <span>Built with MERN Stack & Role-Based Access Control</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
                Platform
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to="/dashboard" className="hover:text-slate-900">Placement Dashboard</Link></li>
                <li><Link to="/modules" className="hover:text-slate-900">Company Question Bank</Link></li>
                <li><Link to="/features" className="hover:text-slate-900">RBAC Architecture</Link></li>
                <li><Link to="/about" className="hover:text-slate-900">Project Roadmap</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
                Account & Support
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to="/login" className="hover:text-slate-900">Student / Staff Sign In</Link></li>
                <li><Link to="/register" className="hover:text-slate-900">Verify Roll Number</Link></li>
                <li><Link to="/profile" className="hover:text-slate-900">Eligibility Settings</Link></li>
                <li><Link to="/contact" className="hover:text-slate-900">Placement Cell Desk</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 KCT PlacementPulse — Department of Information Technology, Coimbatore.</p>
            <div className="flex items-center gap-6">
              <Link to="/about" className="hover:text-slate-900">Data Governance</Link>
              <Link to="/contact" className="hover:text-slate-900">Report Inaccuracy</Link>
              <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                ● All Systems Operational
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}