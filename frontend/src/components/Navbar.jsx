import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home, User, Zap, Briefcase, GraduationCap, Award,
  Mail, FileText, Menu, X, Download
} from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { to: '/',              label: 'Home',           icon: Home },
  { to: '/about',         label: 'About',          icon: User },
  { to: '/skills',        label: 'Skills',         icon: Zap },
  { to: '/projects',      label: 'Projects',       icon: Briefcase },
  { to: '/experience',    label: 'Experience',     icon: Briefcase },
  { to: '/education',     label: 'Education',      icon: GraduationCap },
  { to: '/certifications',label: 'Certs',          icon: Award },
  { to: '/contact',       label: 'Contact',        icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <header>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          {/* Logo */}
          <NavLink to="/" className="navbar__logo">
            <div className="navbar__logo-icon">IS</div>
            <span>Ishara</span>
          </NavLink>

          {/* Desktop links */}
          <div className="navbar__links">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? 'active' : ''}`
                }
              >
                <Icon size={14} />
                {label}
              </NavLink>
            ))}
          </div>

          {/* CTA + Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a className="navbar__cta" href="/resume.pdf" target="_blank" rel="noreferrer">
              <Download size={14} />
              Resume
            </a>

            <button
              className={`navbar__toggle ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
              id="navbar-mobile-toggle"
            >
              <span className="navbar__toggle-line" />
              <span className="navbar__toggle-line" />
              <span className="navbar__toggle-line" />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div className={`navbar__mobile ${mobileOpen ? 'open' : ''}`}>
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `navbar__mobile-link ${isActive ? 'active' : ''}`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
          <a className="navbar__mobile-cta" href="/resume.pdf" target="_blank" rel="noreferrer">
            <Download size={16} />
            Download Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
