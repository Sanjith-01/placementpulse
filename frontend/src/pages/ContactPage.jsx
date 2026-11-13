import React, { useState } from 'react';
import { Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react';

export default function ContactPage({ showToast }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    category: 'Request Senior Contributor Access',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Support ticket logged with KCT PlacementPulse desk.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="max-w-2xl border-b border-slate-200 pb-6">
        <p className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
          Support & Verification
        </p>
        <h1 className="text-3xl font-bold text-slate-900 mt-1">Contact PlacementPulse Desk</h1>
        <p className="text-sm text-slate-600 mt-2">
          Need Senior Contributor permissions, want to report an inaccurate drive cutoff, or have a feature request? Reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
          {submitted ? (
            <div className="py-10 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h2 className="text-lg font-bold text-slate-900">Request Received</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your inquiry regarding <strong>{formData.category}</strong> has been queued for Placement Cell review. Expect a response within 24 working hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Sanjith M"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Roll Number</label>
                  <input
                    required
                    value={formData.rollNumber}
                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                    placeholder="24BIT105"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Inquiry Topic</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                >
                  <option>Request Senior Contributor Access</option>
                  <option>Report Inaccurate Company Cutoff</option>
                  <option>Placement Staff Onboarding</option>
                  <option>Technical Bug / Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Details</label>
                <textarea
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Include company name, batch details, or offer reference..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Campus Support Info & Location Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h2 className="text-base font-semibold text-slate-900">Campus Coordination Desk</h2>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                <span>
                  Career Guidance & Placement Cell, Administrative Block, Kumaraguru College of Technology, Saravanampatti, Coimbatore – 641049.
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-mono text-xs">placementpulse@kct.ac.in</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Mon – Sat, 9:00 AM – 5:00 PM IST</span>
              </div>
            </div>
          </div>

          {/* Crisp Campus Location Card */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs font-mono text-slate-600">
              <span>CAMPUS COORDINATES</span>
              <span>11.0778° N, 76.9897° E</span>
            </div>
            <div className="p-6 bg-slate-50 space-y-2">
              <p className="text-sm font-semibold text-slate-900">KCT IT Park & Placement Block</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chinnavedampatti / Saravanampatti Campus, Coimbatore, Tamil Nadu.
              </p>
              <a
                href="https://maps.google.com/?q=Kumaraguru+College+of+Technology+Coimbatore"
                target="_blank"
                rel="noreferrer"
                className="inline-block pt-2 text-xs font-semibold text-blue-600 hover:underline"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}