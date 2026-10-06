import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home          from './pages/Home';
import About         from './pages/About';
import Skills        from './pages/Skills';
import Projects      from './pages/Projects';
import Experience    from './pages/Experience';
import Education     from './pages/Education';
import Certifications from './pages/Certifications';
import Contact       from './pages/Contact';

// Admin imports
import Login                from './pages/admin/Login';
import AdminLayout          from './pages/admin/AdminLayout';
import AdminDashboard       from './pages/admin/AdminDashboard';
import AdminProfile         from './pages/admin/AdminProfile';
import AdminProjects        from './pages/admin/AdminProjects';
import AdminSkills          from './pages/admin/AdminSkills';
import AdminExperience      from './pages/admin/AdminExperience';
import AdminEducation       from './pages/admin/AdminEducation';
import AdminCertifications  from './pages/admin/AdminCertifications';
import AdminMessages        from './pages/admin/AdminMessages';

/** Scroll to top on every route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/** 404 page */
function NotFound() {
  return (
    <main
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        textAlign: 'center',
        paddingTop: '6rem',
      }}
    >
      <div style={{ fontSize: '6rem', lineHeight: 1 }}>404</div>
      <h1 style={{ fontSize: '2rem', color: 'var(--gold-400)' }}>Page Not Found</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>
        The page you're looking for doesn't exist. Let's get you back on track.
      </p>
      <a href="/" className="btn btn-primary">Go Home</a>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Subtle noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      <Routes>
        {/* Admin Routes (No Navbar/Footer) */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          {/* Redirect /admin → /admin/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard"      element={<AdminDashboard />} />
          <Route path="profile"        element={<AdminProfile />} />
          <Route path="projects"       element={<AdminProjects />} />
          <Route path="skills"         element={<AdminSkills />} />
          <Route path="experience"     element={<AdminExperience />} />
          <Route path="education"      element={<AdminEducation />} />
          <Route path="certifications" element={<AdminCertifications />} />
          <Route path="messages"       element={<AdminMessages />} />
        </Route>

        {/* Public Routes */}
        <Route path="/*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/"               element={<Home />} />
              <Route path="/about"          element={<About />} />
              <Route path="/skills"         element={<Skills />} />
              <Route path="/projects"       element={<Projects />} />
              <Route path="/experience"     element={<Experience />} />
              <Route path="/education"      element={<Education />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/contact"        element={<Contact />} />
              <Route path="*"               element={<NotFound />} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}
