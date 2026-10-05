import { useState } from 'react';
import { User, MapPin, Mail, Download, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import './About.css';

const PROFILE_PHOTO = '/assets/profile/profile.jpg';

const facts = [
  { icon: '🎓', label: 'Degree',   value: 'BICT (Hons)' },
  { icon: '📍', label: 'Location', value: 'Kegalle,Sri Lanka' },
  { icon: '💼', label: 'Status',   value: 'Open to Opportunities' },
  { icon: '🌐', label: 'Languages',value: 'Sinhala, English,Jermen' },
];

const interests = [
  '💻 Full-Stack Development',
  '🤖 AI & Machine Learning',
  '🔒 Cybersecurity / OSINT',
  '📱 Mobile App Development',
  '🗄️ Database Architecture',
  '⚡ Performance Optimization',
    'QA(Manual)',
    'SEO'
];

export default function About() {
  const [photoError, setPhotoError] = useState(false);
  return (
    <main className="about-page" style={{ paddingTop: '5rem' }}>
      <section className="section">
        <div className="container">
          {/* Header */}
          <div className="section-header">
            <div className="section-badge"><User size={12} /> About Me</div>
            <h1 className="section-title">
              Who <span>I Am</span>
            </h1>
            <p className="section-subtitle">
              Get to know the developer behind the code.
            </p>
            <div className="divider" />
          </div>

          {/* Content grid */}
          <div className="about-grid">
            {/* Left — Avatar + facts */}
            <div className="about-left">
              <div className="about-avatar-wrap animate-float">
                <div className="about-avatar">
                  {!photoError ? (
                    <img
                      src={PROFILE_PHOTO}
                      alt="Ishara Sewwandi"
                      className="about-avatar__img"
                      onError={() => setPhotoError(true)}
                    />
                  ) : (
                    <span className="about-avatar__initials">IS</span>
                  )}
                </div>
                <div className="about-avatar-ring" />
              </div>

              {/* Quick facts */}
              <div className="about-facts card">
                {facts.map(({ icon, label, value }) => (
                  <div className="about-fact" key={label}>
                    <span className="about-fact__icon">{icon}</span>
                    <div>
                      <div className="about-fact__label">{label}</div>
                      <div className="about-fact__value">{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="about-socials">
                <a href="https://github.com/ishunishu-01" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ flex: 1 }}>
                  <GithubIcon size={16} color="currentColor" /> GitHub
                </a>
                <a href="https://linkedin.com/in/ishara-nishshanka" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ flex: 1 }}>
                  <LinkedinIcon size={16} color="currentColor" /> LinkedIn
                </a>
              </div>
            </div>

            {/* Right — Text */}
            <div className="about-right">
              <div className="about-intro card">
                <h2 className="about-intro__heading">
                  S.P. Ishara Sewwandi Nishshanka
                </h2>
                <p className="about-intro__role">Full-Stack Developer</p>

                <div className="about-intro__text">
                  <p>
                    Hi! I'm Ishara, a passionate Full-Stack Developer based in Sri Lanka.
                    I specialize in building modern, scalable web applications using
                    <strong> React</strong>, <strong>Laravel</strong>, and <strong>MySQL</strong>.
                  </p>
                  <p>
                    With a strong foundation in both frontend and backend technologies, I enjoy
                    creating end-to-end solutions — from designing intuitive user interfaces to
                    architecting robust RESTful APIs and efficient database schemas.
                  </p>
                  <p>
                    I'm also passionate about <strong>AI and Machine Learning</strong>, having worked
                    on projects involving OSINT, privacy risk assessment, and natural language
                    processing. I believe in continuous learning and staying current with the
                    rapidly evolving tech landscape.
                  </p>
                  <p>
                    When I'm not coding, I enjoy exploring new technologies, contributing to
                    open-source projects, and sharing knowledge with the developer community.
                  </p>
                </div>

                <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: 'fit-content' }}>
                  <Download size={16} /> Download Resume
                </a>
              </div>

              {/* Interests */}
              <div className="about-interests card">
                <h3 className="about-interests__title">
                  <Heart size={16} color="var(--gold-400)" /> Interests &amp; Passions
                </h3>
                <div className="about-interests__grid">
                  {interests.map(item => (
                    <div className="about-interest-item" key={item}>{item}</div>
                  ))}
                </div>
              </div>

              {/* Contact quick-info */}
              <div className="about-contact-row">
                <a href="mailto:ictishara076@gmail.com" className="about-contact-chip">
                  <Mail size={14} /> ictishara076@gmail.com
                </a>
                <span className="about-contact-chip">
                  <MapPin size={14} /> Sri Lanka 🇱🇰
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
