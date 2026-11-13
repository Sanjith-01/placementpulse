import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';
import DashboardPage from './pages/DashboardPage';
import ModulesPage from './pages/ModulesPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import QuestionsPage from './pages/QuestionsPage';
import { EXPERIENCES_DATA, INITIAL_QUESTIONS } from './data/placementData';
export default function App() {
  const [experiences, setExperiences] = useState(EXPERIENCES_DATA);
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [user, setUser] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('kp_active_user'));
      if (saved && saved.rollNo) return saved;
    } catch {
      // Fallback
    }
    return {
      name: 'Sanjith M',
      rollNo: '24IT105',
      email: 'sanjith.demo@campus-portal.edu',
      department: 'Information Technology',
      batch: '2024–2028',
      cgpa: 8.135,
      role: 'junior'
    };
  });

  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <BrowserRouter>
      <Layout
        user={user}
        setUser={setUser}
        toast={toast}
        clearToast={() => setToast(null)}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route
  path="/questions"
  element={
    <QuestionsPage
      questions={questions}
      setQuestions={setQuestions}
      user={user}
      showToast={showToast}
    />
  }
/>
          <Route
            path="/dashboard"
            element={
              <DashboardPage
                experiences={experiences}
                setExperiences={setExperiences}
                user={user}
                showToast={showToast}
              />
            }
          />
          <Route
            path="/modules"
            element={<ModulesPage experiences={experiences} user={user} />}
          />
          <Route
            path="/contact"
            element={<ContactPage showToast={showToast} />}
          />
          <Route
            path="/login"
            element={<AuthPage mode="login" setUser={setUser} showToast={showToast} />}
          />
          <Route
            path="/register"
            element={<AuthPage mode="register" setUser={setUser} showToast={showToast} />}
          />
          <Route
            path="/forgot-password"
            element={<AuthPage mode="forgot" setUser={setUser} showToast={showToast} />}
          />
          <Route
            path="/profile"
            element={<ProfilePage user={user} setUser={setUser} showToast={showToast} />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}