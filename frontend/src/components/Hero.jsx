import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Download, Code2, Database,
  Server, Layers
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import './Hero.css';

const PROFILE_PHOTO = '/assets/profile/profile.jpg';

const titles = [
  'Full-Stack Developer',
  'React Enthusiast',
  'Laravel Developer',
  'Problem Solver',
];

export default function Hero() {
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const target = titles[titleIdx];
    let timer;

    if (!deleting && displayed.length < target.length) {
      timer = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === target.length) {
      timer = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTitleIdx(i => (i + 1) % titles.length);
    }

    return () => clearTimeout(timer);
  }, [displayed, deleting, titleIdx]);

  return (
    <section className="hero" id="hero">
      {/* Background */}
      <div className="hero__bg">
        <div className="hero__grid" />
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
      </div>

      <div className="hero__inner">
        {/* Text content */}
        <div className="hero__content">
          {/* Greeting badge */}
          <div className="hero__greeting">
            <span className="hero__greeting-dot" />
            Available for Opportunities
          </div>

          {/* Name */}
          <h1 className="hero__name">
            Hi, I'm
            <span className="hero__name-highlight">Ishara S. Nishshanka</span>
          </h1>

          {/* Typewriter */}
          <p className="hero__title">
            <Code2 size={20} color="var(--gold-400)" />
            <span>{displayed}</span>
            <span className="hero__title-cursor" />
          </p>

          {/* Description */}
          <p className="hero__desc">
            Full-Stack Developer specializing in <strong style={{ color: 'var(--gold-400)' }}>React</strong>,{' '}
            <strong style={{ color: 'var(--gold-400)' }}>Laravel</strong>, and{' '}
            <strong style={{ color: 'var(--gold-400)' }}>MySQL</strong>. I build modern,
            performant web applications and love turning complex problems into elegant solutions.
          </p>

          {/* Tech badges */}
          <div className="hero__badges">
            {[
              { icon: Layers,   label: 'React' },
              { icon: Server,   label: 'Laravel' },
              { icon: Database, label: 'MySQL' },
              { icon: Code2,    label: 'Python' },
            ].map(({ icon: Icon, label }) => (
              <div className="hero__badge" key={label}>
                <Icon size={13} />
                {label}
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hero__actions">
            <Link to="/projects" className="btn btn-primary" id="hero-view-work">
              View My Work <ArrowRight size={16} />
            </Link>
            <a
              href="/resume.pdf"
              className="btn btn-secondary"
              target="_blank"
              rel="noreferrer"
              id="hero-download-resume"
            >
              <Download size={16} /> Download CV
            </a>
          </div>

          {/* Social links + Stats */}
          <div className="hero__stats">
            <a
              href="https://github.com/ishunishu-01"
              target="_blank"
              rel="noreferrer"
              className="hero__stat"
              style={{ cursor: 'pointer' }}
              aria-label="GitHub"
            >
              <span className="hero__stat-num">
                <GithubIcon size={22} color="var(--gold-400)" />
              </span>
              <span className="hero__stat-label">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/ishara-nishshanka"
              target="_blank"
              rel="noreferrer"
              className="hero__stat"
              style={{ cursor: 'pointer' }}
              aria-label="LinkedIn"
            >
              <span className="hero__stat-num">
                <LinkedinIcon size={22} color="var(--gold-400)" />
              </span>
              <span className="hero__stat-label">LinkedIn</span>
            </a>
            <div className="hero__stat">
              <span className="hero__stat-num">5+</span>
              <span className="hero__stat-label">Projects</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-num">6 months</span>
              <span className="hero__stat-label">Yrs Exp.</span>
            </div>
          </div>
        </div>

        {/* Visual — avatar */}
        <div className="hero__visual">
          <div className="hero__avatar-wrapper">
            <div className="hero__avatar-ring" />
            <div className="hero__avatar-ring-2" />
            <div className="hero__avatar">
              {!photoError ? (
                <img
                  src={PROFILE_PHOTO}
                  alt="Ishara Sewwandi"
                  className="hero__avatar-img"
                  onError={() => setPhotoError(true)}
                />
              ) : (
                <span className="hero__avatar-initials">IS</span>
              )}
            </div>

            {/* Floating tech labels */}
            <div className="hero__float-icon hero__float-icon--react">
              ⚛️ React
            </div>
            <div className="hero__float-icon hero__float-icon--laravel">
              🔴 Laravel
            </div>
            <div className="hero__float-icon hero__float-icon--mysql">
              🐬 MySQL
            </div>
            <div className="hero__float-icon hero__float-icon--python">
              🐍 Python
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
