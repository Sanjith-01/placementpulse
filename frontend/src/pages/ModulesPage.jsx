import React, { useState } from 'react';
import { Search, CheckCircle2, ArrowUpRight } from 'lucide-react';
import Modal from '../components/Modal';

export default function ModulesPage({ experiences, user }) {
  const [query, setQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [activeCompany, setActiveCompany] = useState(null);

  const filtered = experiences.filter((exp) => {
    const matchesQuery =
      exp.company.toLowerCase().includes(query.toLowerCase()) ||
      exp.topics.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    const matchesDept = deptFilter === 'All' || exp.department === deptFilter;
    const matchesDiff = difficultyFilter === 'All' || exp.difficulty === difficultyFilter;
    return matchesQuery && matchesDept && matchesDiff;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <p className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
          Recruiter Modules
        </p>
        <h1 className="text-3xl font-bold text-slate-900 mt-1">Company Interview Bank</h1>
        <p className="text-sm text-slate-600 mt-2">
          Search verified KCT recruitment modules by company name, department eligibility, or technical difficulty.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search company or DSA topic (e.g., Zoho, Binary Trees)..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium bg-white text-slate-700"
          >
            <option value="All">All Departments</option>
            <option value="IT">IT</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
          </select>

          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium bg-white text-slate-700"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Company Cards Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <p className="text-sm font-semibold text-slate-900">No recruiter modules match your filter</p>
          <p className="text-xs text-slate-500 mt-1">Reset department or difficulty filters to see all logs.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((exp) => {
            const eligible = user.cgpa >= exp.minCgpa;
            return (
              <div
                key={exp.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-mono text-slate-500">{exp.id}</span>
                      <h2 className="text-lg font-bold text-slate-900">{exp.company}</h2>
                    </div>
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                      {exp.stipendOrCtc}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-blue-600 mt-1">{exp.role}</p>

                  <div className="mt-4 grid grid-cols-2 gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
                    <div>
                      <span className="text-slate-500 block">Cutoff</span>
                      <span className="font-mono font-semibold text-slate-900">{exp.minCgpa} CGPA</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Difficulty</span>
                      <span className="font-mono font-semibold text-slate-900">{exp.difficulty}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.topics.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span
                    className={`text-xs font-mono ${
                      eligible ? 'text-emerald-700' : 'text-amber-700'
                    }`}
                  >
                    {eligible ? `✓ Eligible (${user.cgpa})` : `Requires ${exp.minCgpa}`}
                  </span>
                  <button
                    onClick={() => setActiveCompany(exp)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-blue-600"
                  >
                    <span>Inspect {exp.rounds.length} Rounds</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal
        isOpen={!!activeCompany}
        onClose={() => setActiveCompany(null)}
        title={activeCompany ? `${activeCompany.company} — Hiring Blueprint` : ''}
        subtitle={activeCompany ? `${activeCompany.role} • ${activeCompany.stipendOrCtc}` : ''}
      >
        {activeCompany && (
          <div className="space-y-4">
            {activeCompany.verified && (
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified by KCT Placement Cell • Contributor {activeCompany.rollNo}</span>
              </div>
            )}
            {activeCompany.rounds.map((r, i) => (
              <div key={i} className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                <p className="text-xs font-semibold text-slate-900">{r.name}</p>
                <p className="text-sm text-slate-600 mt-1">{r.summary}</p>
              </div>
            ))}
            <p className="text-xs text-slate-600 bg-slate-100 p-3 rounded-lg">
              <strong>Senior Tip:</strong> {activeCompany.takeaway}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}