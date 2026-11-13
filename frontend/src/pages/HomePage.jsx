import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Search,
  Layers,
  ChevronDown,
  BookOpen,
  Users,
  BarChart3
} from 'lucide-react';
import { PLATFORM_STATS, EXPERIENCES_DATA, FAQ_ITEMS } from '../data/placementData';

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div>
      {/* Compact, High-Trust Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>2026–2027 Campus Recruitment Cycle Active</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
                Campus placement intelligence, documented by placed seniors.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                1st and 2nd-year students shouldn’t have to guess what visiting companies ask. Access Placement Cell-verified interview rounds, DSA topic frequencies, and CGPA cutoffs tailored to KCT.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition shadow-xs"
                >
                  <span>Open Placement Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/modules"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-sm font-medium transition"
                >
                  <span>Browse Company Bank</span>
                </Link>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  Roll-number verified contributors
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  3-tier RBAC (Junior, Senior, Staff)
                </span>
              </div>
            </div>

            {/* Structured Product Preview Panel */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-sm">
                <div className="rounded-lg bg-white border border-slate-200 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
                    <span className="text-xs font-mono font-medium text-slate-700">
                      LIVE FEED • RECENT VERIFIED ROUNDS
                    </span>
                    <span className="text-[11px] font-mono text-blue-600">Updated today</span>
                  </div>
                  <div className="divide-y divide-slate-200">
                    {EXPERIENCES_DATA.slice(0, 3).map((item) => (
                      <div key={item.id} className="p-4 hover:bg-slate-50/80 transition">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-sm text-slate-900">{item.company}</span>
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {item.stipendOrCtc}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{item.role}</p>
                        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex gap-1.5">
                            {item.topics.slice(0, 2).map((t) => (
                              <span
                                key={t}
                                className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                          <span className="text-[11px] font-mono text-slate-400">
                            {item.rounds.length} Rounds • {item.rollNo}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Bar */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {PLATFORM_STATS.map((stat) => (
              <div key={stat.label} className="bg-white p-5 rounded-lg border border-slate-200">
                <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono mt-1">
                  {stat.value}
                </p>
                <p className="text-xs text-blue-600 mt-1 font-medium">{stat.delta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
              System Architecture
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Designed to preserve institutional hiring knowledge
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3">
              Every year, placed seniors graduate and take critical interview insights with them. PlacementPulse structures that data into an actionable preparation roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/40">
              <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-4">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">Round-by-Round Breakdowns</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Structured logs detailing Online Assessments, DSA coding prompts, Low-Level Design tasks, and HR evaluations for each visiting recruiter.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/40">
              <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-4">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">Strict Role-Based Access</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Juniors read and filter; verified seniors publish experiences; Placement Cell staff audit posts and announce official drive schedules.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/40">
              <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-4">
                <Search className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">DSA & Cutoff Filtering</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Filter experiences by specific topics like Binary Trees, Dynamic Arrays, or SQL Joins, and benchmark your current CGPA against historical cutoffs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Comparison Section */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Built for every stakeholder in the placement ecosystem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>1st & 2nd Year Students</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Discover which companies visit campus, required CGPA thresholds, and exact coding topics to prioritize two years before placement season begins.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                <Users className="w-4 h-4 text-blue-600" />
                <span>3rd & 4th Year Placed Seniors</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Document interview experiences in under 4 minutes using a structured form instead of answering repetitive DMs across WhatsApp groups.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span>Placement Cell Staff</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Maintain a single source of truth for upcoming drives, verify student-contributed insights, and monitor department readiness analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Peer Testimonials */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Endorsed by students & coordinators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <blockquote className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <p className="text-sm text-slate-700 leading-relaxed">
                “In my second year, I had no idea Zoho’s third round focused heavily on console-based Low-Level Design without built-in libraries. Reading verified senior logs here completely changed how I practiced Java.”
              </p>
              <footer className="mt-4 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-900">Naveen Kumar MM</span>
                <span className="font-mono text-slate-500">3rd Year IT • KCT</span>
              </footer>
            </blockquote>

            <blockquote className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <p className="text-sm text-slate-700 leading-relaxed">
                “Having a central, verified archive prevents misinformation about CGPA cutoffs and shortlisting counts while empowering juniors to prepare systematically.”
              </p>
              <footer className="mt-4 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-900">Dr. R. Subramanian</span>
                <span className="font-mono text-slate-500">Department Placement Coordinator</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl bg-white overflow-hidden">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx} className="p-5">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full flex items-center justify-between text-left gap-4"
                >
                  <span className="text-sm font-semibold text-slate-900">{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clean CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-slate-200 bg-slate-900 text-white p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">
                Start exploring verified campus placement logs
              </h2>
              <p className="text-sm text-slate-300 mt-1.5 max-w-xl">
                Switch between Junior, Senior, and Placement Staff roles in the top bar to test every permission level live.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition"
              >
                Launch Dashboard
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-sm font-medium transition"
              >
                Create Student Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}