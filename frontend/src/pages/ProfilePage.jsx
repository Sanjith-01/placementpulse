import React, { useState, useEffect } from 'react';

export default function ProfilePage({ user, setUser, showToast }) {
  const [name, setName] = useState(user.name);
  const [cgpa, setCgpa] = useState(String(user.cgpa));
  const [department, setDepartment] = useState(user.department);
  const [notifyNewDrives, setNotifyNewDrives] = useState(true);
  const [notifyDsaDigest, setNotifyDsaDigest] = useState(true);

  // Sync form fields whenever a different user signs in
  useEffect(() => {
    setName(user.name);
    setCgpa(String(user.cgpa));
    setDepartment(user.department);
  }, [user]);

  const handleSave = (e) => {
    e.preventDefault();
    const parsedCgpa = parseFloat(cgpa);
    const validCgpa = isNaN(parsedCgpa) ? 0 : Math.min(10, Math.max(0, parsedCgpa));

    const updatedUser = {
      ...user,
      name: name.trim() || user.name,
      department,
      cgpa: validCgpa
    };

    setUser(updatedUser);
    localStorage.setItem('kp_active_user', JSON.stringify(updatedUser));

    // Also update this user's stored record in kp_accounts
    try {
      const accounts = JSON.parse(localStorage.getItem('kp_accounts')) || [];
      const updatedAccounts = accounts.map((acc) =>
        acc.email.toLowerCase() === updatedUser.email.toLowerCase()
          ? { ...acc, name: updatedUser.name, department: updatedUser.department, cgpa: validCgpa }
          : acc
      );
      localStorage.setItem('kp_accounts', JSON.stringify(updatedAccounts));
    } catch {
      // Ignore storage errors
    }

    showToast(`Profile updated: CGPA set to ${validCgpa}.`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
            Account & Preferences
          </p>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Student & Role Settings</h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage your institutional metadata, CGPA eligibility filter, and alert preferences.
          </p>
        </div>
        <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
          Role: {user.role}
        </span>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Roll Number</label>
            <input
              value={user.rollNo}
              disabled
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
            >
              <option value="Information Technology">Information Technology</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electronics & Comm.">Electronics & Comm.</option>
              <option value="AI & Data Science">AI & Data Science</option>
              <option value="Placement Cell">Placement Cell</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Current UG CGPA (Used for Drive Eligibility)
            </label>
            <input
              type="number"
              step="0.001"
              max="10"
              min="0"
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono"
            />
          </div>
        </div>

        {/* Notification Toggles */}
        <div className="pt-4 border-t border-slate-200 space-y-3">
          <h2 className="text-sm font-semibold text-slate-900">Notification Preferences</h2>
          <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 cursor-pointer">
            <div>
              <p className="text-sm font-medium text-slate-800">New Campus Drive Alerts</p>
              <p className="text-xs text-slate-500">
                Notify when Placement Staff posts a drive matching your CGPA ({cgpa}) and department.
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifyNewDrives}
              onChange={(e) => setNotifyNewDrives(e.target.checked)}
              className="h-4 w-4 accent-blue-600"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 cursor-pointer">
            <div>
              <p className="text-sm font-medium text-slate-800">Weekly DSA Topic Digest</p>
              <p className="text-xs text-slate-500">
                Summary of the most-asked coding patterns from recently verified senior logs.
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifyDsaDigest}
              onChange={(e) => setNotifyDsaDigest(e.target.checked)}
              className="h-4 w-4 accent-blue-600"
            />
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}