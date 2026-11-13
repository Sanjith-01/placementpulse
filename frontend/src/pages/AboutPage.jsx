import React from 'react';
import { TIMELINE_MILESTONES } from '../data/placementData';
import { Target, Compass, Code2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
      {/* Page Header */}
      <div className="max-w-3xl border-b border-slate-200 pb-8">
        <p className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
          About PlacementPulse
        </p>
        <h1 className="text-3xl font-bold text-slate-900 mt-2">
          Closing the campus recruitment information gap
        </h1>
        <p className="text-base text-slate-600 mt-3 leading-relaxed">
          Built by Information Technology undergraduates in our B.Tech Information Technology program (Coimbatore), PlacementPulse transforms scattered senior interview anecdotes into a structured, searchable institutional knowledge base.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-white border border-slate-200">
          <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-4">
            <Target className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">Our Mission</h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Ensure every 1st- and 2nd-year engineering student has transparent access to real campus interview rounds, technical expectations, and eligibility criteria from day one.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white border border-slate-200">
          <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-4">
            <Compass className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">Our Vision</h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Create a self-sustaining mentorship loop where every placed graduating batch leaves behind verified, high-signal technical documentation for the cohorts following them.
          </p>
        </div>
      </div>

      {/* Project Story */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-900">The Project Story</h2>
        <div className="mt-4 space-y-4 text-sm text-slate-600 leading-relaxed max-w-4xl">
          <p>
            During our second and third years in the B.Tech Information Technology program in our B.Tech Information Technology program, we observed a recurring pattern: first-year and second-year students were eager to prepare for placements, yet had no visibility into which companies recruited on campus, what CGPA thresholds were enforced, or which Data Structures and Algorithms topics actually appeared in technical rounds.
          </p>
          <p>
            While existing platforms like GeeksforGeeks and LeetCode Discuss host thousands of global interview posts, they lack campus-specific context. Meanwhile, official placement portals handle logistics and resume uploads rather than peer-to-peer technical knowledge transfer.
          </p>
          <p>
            We engineered <strong> PlacementPulse</strong> using MongoDB, Express.js, React, and Node.js with strict Role-Based Access Control (RBAC) so juniors, placed seniors, and Placement Cell faculty each operate within a dedicated, trustworthy workflow.
          </p>
        </div>
      </div>

      {/* Development Timeline */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-6">Project Milestones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TIMELINE_MILESTONES.map((m) => (
            <div key={m.date} className="p-5 rounded-xl bg-white border border-slate-200">
              <span className="text-xs font-mono font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {m.date}
              </span>
              <h3 className="text-sm font-semibold text-slate-900 mt-3">{m.title}</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-6">Core Project Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
    name: 'Sanjith M',
    roll: 'B.Tech Information Technology • 2024–2028',
    role: 'Full-Stack Architecture & RBAC Security',
    stack: 'Node.js, Express, React, MongoDB, Java'
  },
  {
    name: 'Student Contributor Network',
    roll: 'Senior & Alumni Cohort',
    role: 'Interview Round Documentation & Mentorship',
    stack: 'DSA Patterns, System Design, Domain Prep'
  },
  {
    name: 'Placement Governance Module',
    roll: 'Staff Verification Layer',
    role: 'Drive Scheduling & Submission Auditing',
    stack: 'Eligibility Filtering & Campus Analytics'
  }
          ].map((member) => (
            <div key={member.name} className="p-6 rounded-xl bg-white border border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-900">{member.name}</h3>
                <Code2 className="w-4 h-4 text-slate-400" />
              </div>
              <p className="text-xs font-mono text-blue-600 mt-1">{member.roll}</p>
              <p className="text-sm font-medium text-slate-700 mt-3">{member.role}</p>
              <p className="text-xs text-slate-500 mt-1">{member.stack}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}