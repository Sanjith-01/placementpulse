import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DEFAULT_ACCOUNTS = [
  {
    name: 'Sanjith M',
    rollNo: '24BIT105',
    email: 'sanjith.24bit@kct.ac.in',
    password: 'password123',
    department: 'Information Technology',
    batch: '2024–2028',
    cgpa: 8.135,
    role: 'junior'
  },
  {
    name: 'Aravind S',
    rollNo: '23BIT042',
    email: 'aravind.23bit@kct.ac.in',
    password: 'password123',
    department: 'Information Technology',
    batch: '2023–2027',
    cgpa: 8.72,
    role: 'senior'
  },
  {
    name: 'Dr. R. Subramanian',
    rollNo: 'KCT-STAFF-01',
    email: 'placement@kct.ac.in',
    password: 'password123',
    department: 'Placement Cell',
    batch: 'Faculty',
    cgpa: 10.0,
    role: 'staff'
  }
];

function getStoredAccounts() {
  try {
    const saved = JSON.parse(localStorage.getItem('kp_accounts'));
    if (Array.isArray(saved) && saved.length > 0) return saved;
  } catch {
    // Fallback to defaults
  }
  localStorage.setItem('kp_accounts', JSON.stringify(DEFAULT_ACCOUNTS));
  return DEFAULT_ACCOUNTS;
}

export default function AuthPage({ mode = 'login', setUser, showToast }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [department, setDepartment] = useState('Information Technology');
  const [batch, setBatch] = useState('2024–2028');
  const [cgpa, setCgpa] = useState('8.135');
  const [role, setRole] = useState('junior');
  const [errorMsg, setErrorMsg] = useState('');

  const applyAuthenticatedUser = (account) => {
    const cleanUser = {
      name: account.name,
      rollNo: account.rollNo,
      email: account.email,
      department: account.department || 'Information Technology',
      batch: account.batch || '2024–2028',
      cgpa: Number(account.cgpa) || 0,
      role: account.role || 'junior'
    };
    localStorage.setItem('kp_active_user', JSON.stringify(cleanUser));
    setUser(cleanUser);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'forgot') {
      showToast(`Password reset link dispatched to ${email}`);
      navigate('/login');
      return;
    }

    const accounts = getStoredAccounts();

    if (mode === 'register') {
      const normalizedEmail = email.trim().toLowerCase();
      const normalizedRoll = rollNo.trim().toUpperCase();
      const parsedCgpa = parseFloat(cgpa);

      if (isNaN(parsedCgpa) || parsedCgpa < 0 || parsedCgpa > 10) {
        setErrorMsg('Please enter a valid CGPA between 0.0 and 10.0.');
        return;
      }

      const newAccount = {
        name: name.trim(),
        rollNo: normalizedRoll,
        email: normalizedEmail,
        password,
        department,
        batch,
        cgpa: parsedCgpa,
        role
      };

      // Sync with Express backend if running
      try {
        await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: newAccount.name,
            rollNumber: newAccount.rollNo,
            email: newAccount.email,
            password: newAccount.password,
            role: newAccount.role,
            batch: newAccount.batch,
            cgpa: newAccount.cgpa
          })
        });
      } catch {
        // Offline / frontend-only mode continues seamlessly
      }

      const filtered = accounts.filter(
        (acc) => acc.email.toLowerCase() !== normalizedEmail
      );
      const updatedAccounts = [newAccount, ...filtered];
      localStorage.setItem('kp_accounts', JSON.stringify(updatedAccounts));

      applyAuthenticatedUser(newAccount);
      showToast(`Account created for ${newAccount.name} (CGPA ${newAccount.cgpa}).`);
      navigate('/dashboard');
      return;
    }

    // LOGIN MODE
    const normalizedEmail = email.trim().toLowerCase();

    // 1. Try Express backend first if running
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, password })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.token) localStorage.setItem('kp_token', data.token);
        if (data.user) {
          applyAuthenticatedUser({
            name: data.user.name,
            rollNo: data.user.rollNumber,
            email: normalizedEmail,
            department: data.user.department || 'Information Technology',
            batch: data.user.batch || '2024–2028',
            cgpa: data.user.cgpa,
            role: data.user.role
          });
          showToast(`Signed in as ${data.user.name} (CGPA ${data.user.cgpa}).`);
          navigate('/dashboard');
          return;
        }
      }
    } catch {
      // Fallback to local accounts if backend server is offline
    }

    // 2. Match against local accounts
    const matched = accounts.find(
      (acc) => acc.email.toLowerCase() === normalizedEmail
    );

    if (!matched) {
      setErrorMsg('No account found with this email. Register first or select a quick demo account below.');
      return;
    }

    if (matched.password && matched.password !== password) {
      setErrorMsg('Incorrect password. For demo accounts, use password123.');
      return;
    }

    applyAuthenticatedUser(matched);
    showToast(`Signed in as ${matched.name} (${matched.rollNo} • CGPA ${matched.cgpa}).`);
    navigate('/dashboard');
  };

  const handleQuickDemoLogin = (account) => {
    applyAuthenticatedUser(account);
    showToast(`Switched profile to ${account.name} (CGPA ${account.cgpa}).`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="mb-6">
          <span className="text-xs font-mono uppercase text-blue-600 font-semibold">
            KCT SSO & RBAC
          </span>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            {mode === 'login' && 'Sign in to PlacementPulse'}
            {mode === 'register' && 'Register Institutional Account'}
            {mode === 'forgot' && 'Reset Account Password'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {mode === 'forgot'
              ? 'Enter your @kct.ac.in email to receive recovery instructions.'
              : 'Sign in to load your roll number, role permissions, and CGPA eligibility profile.'}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {mode === 'register' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sanjith M"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Roll Number</label>
                  <input
                    required
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    placeholder="24BIT105"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                  >
                    <option value="Information Technology">IT</option>
                    <option value="Computer Science">CSE</option>
                    <option value="Electronics & Comm.">ECE</option>
                    <option value="AI & Data Science">AI & DS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Current CGPA</label>
                  <input
                    type="number"
                    step="0.001"
                    min="0"
                    max="10"
                    required
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                    placeholder="8.135"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Batch</label>
                  <input
                    required
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    placeholder="2024–2028"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Access Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                  >
                    <option value="junior">Junior (1st/2nd Yr)</option>
                    <option value="senior">Senior (Contributor)</option>
                    <option value="staff">Placement Staff</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Institutional Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name.24bit@kct.ac.in"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-700">Password</label>
                {mode === 'login' && (
                  <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                )}
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition"
          >
            {mode === 'login' && 'Sign In'}
            {mode === 'register' && 'Create Account'}
            {mode === 'forgot' && 'Send Reset Link'}
          </button>
        </form>

        {/* One-Click Demo Accounts for Testing Profile & CGPA Switching */}
        {mode === 'login' && (
          <div className="mt-6 pt-5 border-t border-slate-200 space-y-2.5">
            <p className="text-[11px] font-mono uppercase text-slate-500">
              Quick Demo Sign-In (Different CGPAs & Roles)
            </p>
            <div className="space-y-1.5">
              {getStoredAccounts().slice(0, 3).map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => handleQuickDemoLogin(acc)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-left transition"
                >
                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      {acc.name}{' '}
                      <span className="font-mono text-slate-500">({acc.rollNo})</span>
                    </p>
                    <p className="text-[11px] text-slate-500">{acc.email}</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-[11px] font-mono font-semibold text-blue-600">
                      CGPA {acc.cgpa}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-slate-500">
                      {acc.role}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-200 text-center text-xs text-slate-600">
          {mode === 'login' ? (
            <>
              Don’t have an account?{' '}
              <Link to="/register" className="font-semibold text-blue-600 hover:underline">
                Register with Roll No & CGPA
              </Link>
            </>
          ) : (
            <>
              Already verified?{' '}
              <Link to="/login" className="font-semibold text-blue-600 hover:underline">
                Sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}