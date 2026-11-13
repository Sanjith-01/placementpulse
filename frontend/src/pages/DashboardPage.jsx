import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  BarChart2,
  Settings,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';
import Modal from '../components/Modal';

export default function DashboardPage({ experiences, setExperiences, user, showToast }) {
  const [sidebarTab, setSidebarTab] = useState('overview'); // 'overview' | 'submissions' | 'analytics'
  const [search, setSearch] = useState('');
  const [verdictFilter, setVerdictFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Simulated UI States (Normal, Loading, Error) for demonstration
  const [uiState, setUiState] = useState('ready'); // 'ready' | 'loading' | 'error'

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState(null);

  // New Experience Form
  const [form, setForm] = useState({
    company: '',
    role: '',
    stipendOrCtc: '',
    minCgpa: '7.5',
    difficulty: 'Medium',
    topics: '',
    round1Summary: '',
    round2Summary: '',
    takeaway: ''
  });

  // Filtered & Paginated Rows
  const filtered = experiences.filter((item) => {
    const matchesSearch =
      item.company.toLowerCase().includes(search.toLowerCase()) ||
      item.role.toLowerCase().includes(search.toLowerCase()) ||
      item.topics.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesVerdict = verdictFilter === 'All' || item.verdict === verdictFilter;
    return matchesSearch && matchesVerdict;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginatedRows = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreateExperience = (e) => {
    e.preventDefault();
    if (user.role === 'junior') {
      showToast('Permission denied: Switch role to Senior or Staff to post.', 'error');
      return;
    }
    const newEntry = {
      id: `EXP-${Math.floor(1050 + Math.random() * 900)}`,
      company: form.company,
      role: form.role,
      author: user.name,
      rollNo: user.rollNo,
      batch: user.batch,
      department: user.department,
      verdict: 'Selected',
      verified: user.role === 'staff',
      date: '2026-11-13',
      stipendOrCtc: form.stipendOrCtc || '8.0 LPA',
      minCgpa: parseFloat(form.minCgpa) || 7.5,
      difficulty: form.difficulty,
      topics: form.topics.split(',').map((t) => t.trim()).filter(Boolean),
      rounds: [
        { name: 'Round 1: Assessment', duration: '60 mins', summary: form.round1Summary },
        { name: 'Round 2: Technical Interview', duration: '45 mins', summary: form.round2Summary }
      ],
      takeaway: form.takeaway
    };
    setExperiences([newEntry, ...experiences]);
    setIsAddModalOpen(false);
    setForm({
      company: '',
      role: '',
      stipendOrCtc: '',
      minCgpa: '7.5',
      difficulty: 'Medium',
      topics: '',
      round1Summary: '',
      round2Summary: '',
      takeaway: ''
    });
    showToast(`Published ${newEntry.company} interview log (${newEntry.id}).`);
  };

  const handleVerifyToggle = (id) => {
    if (user.role !== 'staff') {
      showToast('Only Placement Staff can verify records.', 'error');
      return;
    }
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, verified: !exp.verified } : exp
      )
    );
    showToast(`Updated verification status for ${id}.`);
  };

  const triggerLoadingDemo = () => {
    setUiState('loading');
    setTimeout(() => setUiState('ready'), 900);
  };

  const topicFrequencies = [
    { topic: 'Dynamic Arrays & Strings', count: 84 },
    { topic: 'Binary Trees & Graphs', count: 68 },
    { topic: 'SQL Joins & Indexing', count: 61 },
    { topic: 'Java OOP & LLD', count: 54 },
    { topic: 'OS & Networking', count: 42 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Responsive Sidebar Navigation */}
        <aside className="w-full lg:w-60 shrink-0 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-3 space-y-1">
            {[
              { id: 'overview', label: 'Overview & Logs', icon: LayoutDashboard },
              { id: 'submissions', label: 'Verification Queue', icon: FileText },
              { id: 'analytics', label: 'Topic Analytics', icon: BarChart2 },
            ].map((nav) => {
              const Icon = nav.icon;
              return (
                <button
                  key={nav.id}
                  onClick={() => setSidebarTab(nav.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition ${
                    sidebarTab === nav.id
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{nav.label}</span>
                </button>
              );
            })}
            <Link
              to="/profile"
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
            >
              <Settings className="w-4 h-4" />
              <span>Account Settings</span>
            </Link>
          </div>

          {/* User Profile Panel */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">ACTIVE PROFILE</span>
              <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                {user.role}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{user.name}</p>
              <p className="text-xs font-mono text-slate-500">
                {user.rollNo} • {user.department}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Current CGPA</span>
              <span className="font-mono font-semibold text-slate-900">{user.cgpa}</span>
            </div>
          </div>

          {/* UI State Simulator (Great for Interview Demos) */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2">
            <p className="text-[11px] font-mono uppercase text-slate-500">UX State Controls</p>
            <div className="flex gap-1.5">
              <button
                onClick={triggerLoadingDemo}
                className="flex-1 px-2 py-1.5 rounded border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Test Loading
              </button>
              <button
                onClick={() => setUiState(uiState === 'error' ? 'ready' : 'error')}
                className="flex-1 px-2 py-1.5 rounded border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                {uiState === 'error' ? 'Reset' : 'Test Error'}
              </button>
            </div>
          </div>
        </aside>

        {/* Main Workspace */}
        <div className="flex-1 space-y-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Placement Intelligence Workspace</h1>
              <p className="text-sm text-slate-600 mt-0.5">
                Real-time campus drive experiences, verification status, and DSA frequency metrics.
              </p>
            </div>

            <button
              onClick={() => {
                if (user.role === 'junior') {
                  showToast('Juniors have read-only access. Switch role to Senior or Staff to post.', 'error');
                } else {
                  setIsAddModalOpen(true);
                }
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                user.role === 'junior'
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Log Interview Experience</span>
            </button>
          </div>

          {/* KPI Analytics Widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <p className="text-xs font-medium text-slate-500">Total Logged Experiences</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{experiences.length}</p>
              <p className="text-xs text-emerald-600 mt-1">
                {experiences.filter((e) => e.verified).length} Staff-Verified
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <p className="text-xs font-medium text-slate-500">Eligible Drives (CGPA {user.cgpa})</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">
                {experiences.filter((e) => user.cgpa >= e.minCgpa).length} / {experiences.length}
              </p>
              <p className="text-xs text-blue-600 mt-1">Based on your profile cutoff</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <p className="text-xs font-medium text-slate-500">Top Tested Topic</p>
              <p className="text-lg font-bold text-slate-900 mt-1.5">Binary Trees & Arrays</p>
              <p className="text-xs text-slate-500 mt-1">Appeared in 74% of tech rounds</p>
            </div>
          </div>

          {/* Analytics Chart Panel */}
          {(sidebarTab === 'overview' || sidebarTab === 'analytics') && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    DSA & Core CS Topic Frequency Across Campus Drives
                  </h2>
                  <p className="text-xs text-slate-500">
                    Percentage of technical interviews featuring each concept
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-500">2026 Cohort</span>
              </div>
              <div className="space-y-3">
                {topicFrequencies.map((item) => (
                  <div key={item.topic} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-700">{item.topic}</span>
                      <span className="font-mono text-slate-600">{item.count}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-500"
                        style={{ width: `${item.count}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error State Banner */}
          {uiState === 'error' && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <div>
                  <p className="text-sm font-semibold text-rose-900">
                    Failed to sync with MongoDB cluster (`ERR_CONNECTION_REFUSED`)
                  </p>
                  <p className="text-xs text-rose-700 mt-0.5">
                    Showing cached institutional records. Click retry to reconnect to Express API.
                  </p>
                </div>
              </div>
              <button
                onClick={triggerLoadingDemo}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-rose-200 text-xs font-medium text-rose-700 hover:bg-rose-100"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            </div>
          )}

          {/* Search, Filter & Data Table */}
          {uiState === 'loading' ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 space-y-4">
              <div className="h-4 w-48 bg-slate-200 rounded animate-pulse" />
              <div className="space-y-2.5">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="h-12 w-full bg-slate-100 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              {/* Table Controls */}
              <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Filter by company, role, or DSA topic..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  {['All', 'Selected', 'Waitlisted'].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setVerdictFilter(status);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                        verdictFilter === status
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Empty State */}
              {paginatedRows.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-sm font-semibold text-slate-900">No matching interview logs</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Try clearing your search filter or resetting the verdict status.
                  </p>
                  <button
                    onClick={() => {
                      setSearch('');
                      setVerdictFilter('All');
                    }}
                    className="mt-4 px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-mono uppercase text-slate-500">
                        <th className="py-3 px-4">Company & Role</th>
                        <th className="py-3 px-4">Contributor</th>
                        <th className="py-3 px-4">Key Topics</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-sm">
                      {paginatedRows.map((exp) => (
                        <tr key={exp.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3.5 px-4">
                            <p className="font-semibold text-slate-900">{exp.company}</p>
                            <p className="text-xs text-slate-500">{exp.role}</p>
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="text-xs font-medium text-slate-800">{exp.author}</p>
                            <p className="text-[11px] font-mono text-slate-500">{exp.rollNo}</p>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex flex-wrap gap-1">
                              {exp.topics.slice(0, 2).map((t) => (
                                <span
                                  key={t}
                                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            {exp.verified ? (
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                <CheckCircle2 className="w-3 h-3" />
                                Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                <Clock className="w-3 h-3" />
                                Pending Audit
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-2">
                            <button
                              onClick={() => setSelectedExp(exp)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-100"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Rounds</span>
                            </button>
                            {user.role === 'staff' && (
                              <button
                                onClick={() => handleVerifyToggle(exp.id)}
                                className="px-2.5 py-1 rounded bg-blue-50 border border-blue-200 text-xs font-medium text-blue-700 hover:bg-blue-100"
                              >
                                {exp.verified ? 'Unverify' : 'Verify'}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination Footer */}
              <div className="px-4 py-3 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs text-slate-600">
                <span>
                  Showing {paginatedRows.length} of {filtered.length} records
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="p-1.5 rounded border border-slate-200 bg-white disabled:opacity-40 hover:bg-slate-50"
                    aria-label="Previous Page"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono px-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="p-1.5 rounded border border-slate-200 bg-white disabled:opacity-40 hover:bg-slate-50"
                    aria-label="Next Page"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal 1: View Round-by-Round Details */}
      <Modal
        isOpen={!!selectedExp}
        onClose={() => setSelectedExp(null)}
        title={selectedExp ? `${selectedExp.company} — ${selectedExp.role}` : ''}
        subtitle={
          selectedExp
            ? `Logged by ${selectedExp.author} (${selectedExp.rollNo}) • Cutoff: ${selectedExp.minCgpa} CGPA`
            : ''
        }
      >
        {selectedExp && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {selectedExp.topics.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200"
                >
                  #{t}
                </span>
              ))}
            </div>
            <div className="space-y-3">
              {selectedExp.rounds.map((r, i) => (
                <div key={i} className="p-4 rounded-lg border border-slate-200 bg-slate-50/70">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-900">
                    <span>{r.name}</span>
                    <span className="font-mono text-slate-500">{r.duration}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">{r.summary}</p>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-lg bg-blue-50/70 border border-blue-200">
              <p className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
                Advice for 1st & 2nd Year Students
              </p>
              <p className="text-sm text-blue-950 mt-1 leading-relaxed">{selectedExp.takeaway}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal 2: Submit New Experience (Senior / Staff) */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Log Campus Interview Experience"
        subtitle={`Submitting as ${user.name} (${user.rollNo} • ${user.role.toUpperCase()})`}
      >
        <form onSubmit={handleCreateExperience} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Company Name</label>
              <input
                required
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="e.g., Rolls-Royce Data Labs"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Role Offered</label>
              <input
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="e.g., Full-Stack Intern"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">CTC / Stipend</label>
              <input
                value={form.stipendOrCtc}
                onChange={(e) => setForm({ ...form, stipendOrCtc: e.target.value })}
                placeholder="e.g., 10.5 LPA"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Min CGPA</label>
              <input
                type="number"
                step="0.1"
                value={form.minCgpa}
                onChange={(e) => setForm({ ...form, minCgpa: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Difficulty</label>
              <select
                value={form.difficulty}
                onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              DSA & Core Topics Asked (comma-separated)
            </label>
            <input
              required
              value={form.topics}
              onChange={(e) => setForm({ ...form, topics: e.target.value })}
              placeholder="Binary Trees, Linked Lists, SQL Joins"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Round 1 Assessment Questions
            </label>
            <textarea
              required
              rows="2"
              value={form.round1Summary}
              onChange={(e) => setForm({ ...form, round1Summary: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Round 2 Technical Interview Questions
            </label>
            <textarea
              required
              rows="2"
              value={form.round2Summary}
              onChange={(e) => setForm({ ...form, round2Summary: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Preparation Takeaway for Juniors
            </label>
            <textarea
              required
              rows="2"
              value={form.takeaway}
              onChange={(e) => setForm({ ...form, takeaway: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800"
            >
              Publish Record
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}