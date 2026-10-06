import { useState, useEffect } from 'react';
import { Briefcase, Calendar, MapPin, ArrowRight, Loader2 } from 'lucide-react';
import { experiencesApi } from '../services/api';
import './Experience.css';

function formatDate(dateStr) {
  if (!dateStr) return 'Present';
  const [year, month] = dateStr.split('-');
  const d = new Date(year, month - 1);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  useEffect(() => {
    experiencesApi.getAll()
      .then(res => setExperiences(res.data))
      .catch(() => setError('Failed to load experience. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

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

          {/* Loading state */}
          {loading && (
            <div className="exp-loading">
              <Loader2 size={32} className="spin" />
              <p>Loading experience…</p>
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div className="exp-empty">
              <span>⚠️</span>
              <p>{error}</p>
            </div>
          )}

          {/* Timeline */}
          {!loading && !error && (
            <div className="exp-timeline">
              {experiences.length === 0 && (
                <div className="exp-empty">
                  <span>📂</span>
                  <p>No experience entries yet.</p>
                </div>
              )}
              {experiences.map((exp, idx) => {
                // Support both JSON array and comma-separated string for achievements/technologies
                const achievements = Array.isArray(exp.achievements)
                  ? exp.achievements
                  : (exp.achievements ? exp.achievements.split('\n').filter(Boolean) : []);
                const technologies = Array.isArray(exp.technologies)
                  ? exp.technologies
                  : (exp.technologies ? exp.technologies.split(',').map(t => t.trim()).filter(Boolean) : []);

                return (
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

                      {achievements.length > 0 && (
                        <ul className="exp-achievements">
                          {achievements.map((a, i) => (
                            <li key={i} className="exp-achievement">
                              <ArrowRight size={13} color="var(--gold-400)" />
                              {a}
                            </li>
                          ))}
                        </ul>
                      )}

                      {technologies.length > 0 && (
                        <div className="exp-tags">
                          {technologies.map(t => (
                            <span key={t} className="tag">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

