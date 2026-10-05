import { Briefcase, Calendar, MapPin, ArrowRight } from 'lucide-react';
import './Experience.css';

const experiences = [
  {
    id: 1,
    company:     'Self-Employed / Freelance',
    position:    'Full-Stack Developer',
    location:    'Sri Lanka (Remote)',
    start_date:  '2023-01',
    end_date:    null,
    current:     true,
    description: `Working as a freelance full-stack developer building custom web applications for clients across various industries including healthcare, retail, and agriculture.`,
    achievements: [
      'Built MediCare Pharmacy ERP using React + Laravel + MySQL',
      'Developed Fertilizer Shop Management System with Next.js + Prisma',
      'Delivered REST API integrations for multiple client projects',
      'Managed end-to-end project delivery including design, development, and deployment',
    ],
    technologies: ['React', 'Laravel', 'MySQL', 'Next.js', 'TypeScript'],
  },
  {
    id: 2,
    company:     'University Project',
    position:    'AI/ML Developer',
    location:    'Sri Lanka',
    start_date:  '2024-01',
    end_date:    '2024-06',
    current:     false,
    description: `Led development of an AI-based OSINT privacy risk assessment tool as a final year project, applying machine learning and natural language processing techniques.`,
    achievements: [
      'Designed ML pipeline for privacy risk scoring from OSINT data',
      'Implemented NLP-based entity recognition using Python',
      'Built Flask REST API to serve ML model predictions',
      'Achieved 87% accuracy on test dataset',
    ],
    technologies: ['Python', 'TensorFlow', 'Flask', 'NLP', 'Machine Learning'],
  },
];

function formatDate(dateStr) {
  if (!dateStr) return 'Present';
  const [year, month] = dateStr.split('-');
  const d = new Date(year, month - 1);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

export default function Experience() {
  return (
    <main style={{ paddingTop: '5rem' }}>
      <section className="section">
        <div className="container">
          {/* Header */}
          <div className="section-header">
            <div className="section-badge"><Briefcase size={12} /> Work History</div>
            <h1 className="section-title">My <span>Experience</span></h1>
            <p className="section-subtitle">
              My professional journey and the projects I've worked on.
            </p>
            <div className="divider" />
          </div>

          {/* Timeline */}
          <div className="exp-timeline">
            {experiences.map((exp, idx) => (
              <article className="exp-item" key={exp.id}>
                {/* Timeline dot */}
                <div className="exp-timeline-dot">
                  <div className={`exp-dot ${exp.current ? 'exp-dot--current' : ''}`} />
                  {idx < experiences.length - 1 && <div className="exp-line" />}
                </div>

                {/* Card */}
                <div className="exp-card card">
                  <div className="exp-card__header">
                    <div className="exp-card__icon">
                      <Briefcase size={20} />
                    </div>
                    <div className="exp-card__meta">
                      <h2 className="exp-card__title">{exp.position}</h2>
                      <div className="exp-card__company">{exp.company}</div>
                    </div>
                    {exp.current && (
                      <span className="exp-card__current-badge">Current</span>
                    )}
                  </div>

                  <div className="exp-card__info-row">
                    <span className="exp-info-chip">
                      <Calendar size={12} />
                      {formatDate(exp.start_date)} — {formatDate(exp.end_date)}
                    </span>
                    <span className="exp-info-chip">
                      <MapPin size={12} />
                      {exp.location}
                    </span>
                  </div>

                  <p className="exp-card__desc">{exp.description}</p>

                  {/* Achievements */}
                  <ul className="exp-achievements">
                    {exp.achievements.map((a, i) => (
                      <li key={i} className="exp-achievement">
                        <ArrowRight size={13} color="var(--gold-400)" />
                        {a}
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="exp-tags">
                    {exp.technologies.map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
