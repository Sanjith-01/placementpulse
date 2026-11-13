import React, { useState } from 'react';
import {
  MessageSquarePlus,
  Search,
  CheckCircle2,
  Clock,
  Send,
  Lock,
  ShieldCheck
} from 'lucide-react';
import Modal from '../components/Modal';

export default function QuestionsPage({ questions, setQuestions, user, showToast }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Open' | 'Answered'
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);

  // New Question Form State
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    companyTag: 'General',
    body: ''
  });

  // Track reply draft per question ID
  const [replyDrafts, setReplyDrafts] = useState({});

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.companyTag.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAskSubmit = (e) => {
    e.preventDefault();
    const created = {
      id: `Q-${Math.floor(205 + Math.random() * 700)}`,
      title: newQuestion.title,
      body: newQuestion.body,
      companyTag: newQuestion.companyTag || 'General',
      askedByName: user.name,
      askedByRollNo: user.rollNo,
      askedByBatch: user.batch,
      status: 'Open',
      createdAt: 'Just now',
      answers: []
    };
    setQuestions([created, ...questions]);
    setNewQuestion({ title: '', companyTag: 'General', body: '' });
    setIsAskModalOpen(false);
    showToast('Your doubt has been posted to the Senior & Staff queue.');
  };

  const handleAnswerSubmit = (e, questionId) => {
    e.preventDefault();
    if (user.role === 'junior') {
      showToast('Only Verified Seniors or Placement Staff can post official answers.', 'error');
      return;
    }

    const text = (replyDrafts[questionId] || '').trim();
    if (!text) return;

    const updated = questions.map((q) => {
      if (q.id !== questionId) return q;
      return {
        ...q,
        status: 'Answered',
        answers: [
          ...q.answers,
          {
            id: `A-${Date.now()}`,
            answerBody: text,
            responderName: user.name,
            responderRollNo: user.rollNo,
            responderRole: user.role,
            createdAt: 'Just now'
          }
        ]
      };
    });

    setQuestions(updated);
    setReplyDrafts({ ...replyDrafts, [questionId]: '' });
    showToast('Official response published.');
  };

  const canAnswer = user.role === 'senior' || user.role === 'staff';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
            Peer & Faculty Mentorship
          </p>
          <h1 className="text-3xl font-bold text-slate-900 mt-1">
            Campus Placement Q&A Forum
          </h1>
          <p className="text-sm text-slate-600 mt-1.5">
            1st & 2nd year students can ask recruitment doubts; placed seniors and Placement Cell staff provide verified answers.
          </p>
        </div>

        <button
          onClick={() => setIsAskModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition shrink-0"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Ask a Doubt</span>
        </button>
      </div>

      {/* Search & Status Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doubts by company, DSA topic, or keyword..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {['All', 'Open', 'Answered'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                statusFilter === status
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Questions Feed */}
      {filteredQuestions.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <p className="text-sm font-semibold text-slate-900">No matching questions found</p>
          <p className="text-xs text-slate-500 mt-1">
            Be the first to ask a question for this company or topic.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredQuestions.map((q) => (
            <article
              key={q.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden"
            >
              {/* Question Header & Body */}
              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                      {q.companyTag}
                    </span>
                    {q.status === 'Answered' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        Answered
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <Clock className="w-3 h-3" />
                        Awaiting Senior/Staff Reply
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-mono text-slate-500">
                    Asked by {q.askedByName} ({q.askedByRollNo}) • {q.createdAt}
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-slate-900">{q.title}</h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{q.body}</p>
              </div>

              {/* Verified Answers Thread */}
              {q.answers.length > 0 && (
                <div className="bg-slate-50/80 border-t border-slate-200 px-6 py-4 space-y-4">
                  {q.answers.map((ans) => (
                    <div
                      key={ans.id}
                      className="p-4 rounded-lg bg-white border border-slate-200 space-y-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-blue-600" />
                          <span className="text-xs font-semibold text-slate-900">
                            {ans.responderName}
                          </span>
                          <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                            {ans.responderRole === 'staff' ? 'Placement Staff' : 'Verified Senior'} • {ans.responderRollNo}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">{ans.createdAt}</span>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{ans.answerBody}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Role-Gated Reply Box */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                {canAnswer ? (
                  <form
                    onSubmit={(e) => handleAnswerSubmit(e, q.id)}
                    className="flex flex-col sm:flex-row gap-2.5"
                  >
                    <input
                      type="text"
                      required
                      value={replyDrafts[q.id] || ''}
                      onChange={(e) =>
                        setReplyDrafts({ ...replyDrafts, [q.id]: e.target.value })
                      }
                      placeholder={`Write an official ${user.role} response as ${user.name} (${user.rollNo})...`}
                      className="flex-1 px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:border-blue-600"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post Answer</span>
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        Answering is restricted to <strong>Verified Seniors</strong> and <strong>Placement Staff</strong>.
                      </span>
                    </span>
                    <span className="hidden sm:inline font-mono text-[11px] text-slate-400">
                      Switch role in top bar to reply
                    </span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Ask a Doubt Modal */}
      <Modal
        isOpen={isAskModalOpen}
        onClose={() => setIsAskModalOpen(false)}
        title="Ask a Placement Doubt"
        subtitle={`Posting as ${user.name} (${user.rollNo} • ${user.batch})`}
      >
        <form onSubmit={handleAskSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Question Summary
            </label>
            <input
              required
              value={newQuestion.title}
              onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
              placeholder="e.g., What topics should 2nd years focus on for Zoho Round 2?"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Related Company or Category
            </label>
            <select
              value={newQuestion.companyTag}
              onChange={(e) => setNewQuestion({ ...newQuestion, companyTag: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
            >
              <option value="General">General Placement Preparation</option>
              <option value="Rolls-Royce Data Labs">Rolls-Royce Data Labs</option>
              <option value="Zoho Corporation">Zoho Corporation</option>
              <option value="Bosch Global Software">Bosch Global Software</option>
              <option value="TCS Digital">TCS Digital</option>
              <option value="Thoughtworks">Thoughtworks</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Detailed Context
            </label>
            <textarea
              required
              rows="4"
              value={newQuestion.body}
              onChange={(e) => setNewQuestion({ ...newQuestion, body: e.target.value })}
              placeholder="Describe your current preparation, year of study, and specific doubt..."
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAskModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800"
            >
              Submit Question
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}