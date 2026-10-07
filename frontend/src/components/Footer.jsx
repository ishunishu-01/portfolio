import { Link } from 'react-router-dom';
import { Mail, MapPin, Heart, Code2, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import './Footer.css';

const quickLinks = [
  { to: '/',               label: 'Home' },
  { to: '/about',          label: 'About Me' },
  { to: '/skills',         label: 'Skills' },
  { to: '/projects',       label: 'Projects' },
  { to: '/experience',     label: 'Experience' },
  { to: '/education',      label: 'Education' },
  { to: '/certifications', label: 'Certifications' },
  { to: '/contact',        label: 'Contact' },
];

const connectLinks = [
  {
    href:  'https://github.com/ishunishu-01',
    label: 'GitHub',
    icon:  GithubIcon,
  },
  {
    href:  'https://linkedin.com/in/ishara-nishshanka',
    label: 'LinkedIn',
    icon:  LinkedinIcon,
  },
  {
    href:  'mailto:ictisharao76@gmail.com',
    label: 'Email Me',
    icon:  Mail,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__brand-logo">
              <div className="footer__brand-icon">IS</div>
              S.P. Ishara S. Nishshsanka
            </div>
            <p className="footer__brand-desc">
              Full-Stack Developer passionate about building modern, performant
              web applications using React, Laravel, and MySQL.
            </p>
            <div className="footer__socials">
              <a
                href="https://github.com/ishunishu-01"
                target="_blank"
                rel="noreferrer"
                className="footer__social-link"
                aria-label="GitHub"
              >
                <GithubIcon size={16} color="currentColor" />
              </a>
              <a
                href="https://linkedin.com/in/ishara-nishshanka"
                target="_blank"
                rel="noreferrer"
                className="footer__social-link"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={16} color="currentColor" />
              </a>
              <a
                href="mailto:ictishara076@gmail.com"
                className="footer__social-link"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="footer__social-link"
                aria-label="Location"
              >
                <MapPin size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer__col">
            <h4 className="footer__col-title">Quick Links</h4>
            <ul className="footer__col-links">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="footer__col-link">
                    <ArrowUpRight size={12} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="footer__col">
            <h4 className="footer__col-title">Connect</h4>
            <ul className="footer__col-links">
              {connectLinks.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noreferrer" className="footer__col-link">
                    <Icon size={13} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: '1.5rem' }}>
              <h4 className="footer__col-title">Location</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={13} />
                Sri Lanka 🇱🇰
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {year} <span>S.P. Ishara S. Nishshanka</span>. All rights reserved.
          </p>
          <p className="footer__made">
            Made with <Heart size={12} className="heart" /> using{' '}
            <Code2 size={12} />
            React &amp; Laravel
          </p>
        </div>
      </div>
    </footer>
  );
}
