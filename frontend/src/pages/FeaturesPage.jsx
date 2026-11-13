import React, { useState } from 'react';
import { ShieldCheck, FileCheck2, Filter, ArrowRight, Check } from 'lucide-react';

export default function FeaturesPage() {
  const [selectedRoleFlow, setSelectedRoleFlow] = useState('junior');

  const workflows = {
    junior: [
      { step: '01', title: 'Authenticate with KCT Email', desc: 'Logs in with institutional roll number (e.g., 24BIT105) assigned to Junior read-only scope.' },
      { step: '02', title: 'Filter by Company or DSA Topic', desc: 'Queries MongoDB indexes for specific recruiters (Zoho, Rolls-Royce) or DSA tags (Binary Trees).' },
      { step: '03', title: 'Benchmark CGPA & Round Pipeline', desc: 'Inspects historical CGPA cutoffs and round durations to plan semester preparation.' }
    ],
    senior: [
      { step: '01', title: 'Complete Placement Drive', desc: 'Placed 3rd/4th year student logs into Contributor dashboard.' },
      { step: '02', title: 'Submit Structured Round Log', desc: 'Fills standardized fields: Round count, difficulty, coding prompts, and preparation advice.' },
      { step: '03', title: 'Earn Verified Contributor Badge', desc: 'Submission enters moderation queue and receives Staff verification stamp.' }
    ],
    staff: [
      { step: '01', title: 'Publish Official Drive Notice', desc: 'Staff posts upcoming recruiter dates, eligible branches, and CGPA cutoffs.' },
      { step: '02', title: 'Audit Senior Submissions', desc: 'Reviews student-logged experiences for accuracy before toggling isVerifiedByStaff = true.' },
      { step: '03', title: 'Export Readiness Metrics', desc: 'Analyzes most-tested technical skills across the recruiting season.' }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
      <div className="max-w-3xl border-b border-slate-200 pb-8">
        <p className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
          Product Capabilities
        </p>
        <h1 className="text-3xl font-bold text-slate-900 mt-2">
          Structured workflows built for accuracy and speed
        </h1>
        <p className="text-base text-slate-600 mt-3">
          Every module enforces strict schema validation and role-based permissions so students can trust the data they study.
        </p>
      </div>

      {/* Interactive RBAC Workflow Diagram */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-900">End-to-End Role Workflow Diagram</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select a user persona to inspect their system journey and API permission scope
            </p>
          </div>
          <div className="flex gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
            {['junior', 'senior', 'staff'].map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRoleFlow(role)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition ${
                  selectedRoleFlow === role
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {role} Journey
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {workflows[selectedRoleFlow].map((node, idx) => (
            <div key={node.step} className="relative p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  STEP {node.step}
                </span>
                {idx < 2 && <ArrowRight className="hidden md:block w-4 h-4 text-slate-400" />}
              </div>
              <h3 className="text-sm font-semibold text-slate-900">{node.title}</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{node.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Deep-Dives + UI Mockup Previews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-600 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>JWT & EXPRESS MIDDLEWARE</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Granular Role-Based Access Control (RBAC)
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Unauthorized POST or PATCH requests are blocked at the Express middleware layer (`authorizeRoles(&apos;senior&apos;, &apos;staff&apos;)`) before touching MongoDB, ensuring 1st-year accounts cannot alter verified placement logs.
          </p>
          <ul className="space-y-2 text-sm text-slate-700 pt-2">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-blue-600" />
              <span><strong>Junior Role:</strong> GET `/api/experiences`, GET `/api/companies`</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-blue-600" />
              <span><strong>Senior Role:</strong> Inherits Junior + POST `/api/experiences`</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-blue-600" />
              <span><strong>Staff Role:</strong> Full CRUD + PATCH `/api/experiences/:id/verify`</span>
            </li>
          </ul>
        </div>

        {/* Code / Schema Mockup Window */}
        <div className="rounded-xl border border-slate-200 bg-slate-900 text-slate-100 overflow-hidden shadow-sm">
          <div className="px-4 py-2.5 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>middleware/authMiddleware.js</span>
            <span className="text-emerald-400">200 OK • RBAC Active</span>
          </div>
          <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto text-slate-200">
{`const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: "FORBIDDEN_ROLE_SCOPE",
        message: "Staff or Senior privileges required."
      });
    }
    next();
  };
};`}
          </pre>
        </div>
      </div>

      {/* Use Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-white border border-slate-200">
          <FileCheck2 className="w-5 h-5 text-blue-600 mb-3" />
          <h3 className="text-base font-semibold text-slate-900">Use Case 1: Pre-Drive Sprint Prep</h3>
          <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
            When the Placement Cell announces a Rolls-Royce or Zoho drive 10 days out, students filter past KCT experiences for that exact recruiter to practice the highest-frequency DSA patterns.
          </p>
        </div>
        <div className="p-6 rounded-xl bg-white border border-slate-200">
          <Filter className="w-5 h-5 text-blue-600 mb-3" />
          <h3 className="text-base font-semibold text-slate-900">Use Case 2: 1st-Year Elective & Skill Planning</h3>
          <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
            First-year students inspect aggregate topic frequency charts to see why DBMS indexing, OS concurrency, and Java OOP appear across 70%+ of product-company interviews.
          </p>
        </div>
      </div>
    </div>
  );
}