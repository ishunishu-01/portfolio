import { useState, useEffect } from 'react';
import { GraduationCap, Calendar, MapPin, BookOpen, Loader2 } from 'lucide-react';
import { educationApi } from '../services/api';
import './Education.css';

function formatDate(dateStr, isCurrent) {
  if (isCurrent) return 'Present';
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  const d = new Date(year, month - 1);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

export default function Education() {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);

  useEffect(() => {
    educationApi.getAll()
      .then(res => setEducationList(res.data))
      .catch(() => setError('Failed to load education. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ paddingTop: '5rem' }}>
      <section className="section">
        <div className="container">
          {/* Header */}
          <div className="section-header">
            <div className="section-badge"><GraduationCap size={12} /> Academic Background</div>
            <h1 className="section-title">My <span>Education</span></h1>
            <p className="section-subtitle">
              My academic journey and qualifications that shaped my skills.
            </p>
            <div className="divider" />
          </div>

          {/* Loading state */}
          {loading && (
            <div className="edu-loading">
              <Loader2 size={32} className="spin" />
              <p>Loading education…</p>
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div className="edu-empty">
              <span>⚠️</span>
              <p>{error}</p>
            </div>
          )}

          {/* Education cards */}
          {!loading && !error && (
            <div className="edu-list">
              {educationList.length === 0 && (
                <div className="edu-empty">
                  <span>📂</span>
                  <p>No education entries yet.</p>
                </div>
              )}
              {educationList.map(edu => {
                const highlights = Array.isArray(edu.highlights)
                  ? edu.highlights
                  : (edu.highlights ? edu.highlights.split('\n').filter(Boolean) : []);

                return (
                  <article className="edu-card card" key={edu.id}>
                    <div className="edu-card__left">
                      <div className="edu-card__icon">
                        <GraduationCap size={28} />
                      </div>
                      {edu.current && (
                        <span className="edu-card__current">Ongoing</span>
                      )}
                      <div className="edu-card__dates">
                        <Calendar size={13} />
                        <span>{formatDate(edu.start_date, false)} — {formatDate(edu.end_date, edu.current)}</span>
                      </div>
                    </div>

                    <div className="edu-card__right">
                      <h2 className="edu-card__degree">{edu.degree}</h2>
                      <div className="edu-card__institution">
                        <BookOpen size={14} />
                        {edu.institution}
                      </div>
                      <div className="edu-card__meta">
                        <span className="edu-meta-chip">
                          <MapPin size={12} />{edu.location}
                        </span>
                        {edu.grade && (
                          <span className="edu-meta-chip" style={{ color: 'var(--gold-400)' }}>
                            🎓 {edu.grade}
                          </span>
                        )}
                      </div>

                      <p className="edu-card__desc">{edu.description}</p>

                      {highlights.length > 0 && (
                        <ul className="edu-highlights">
                          {highlights.map((h, i) => (
                            <li key={i} className="edu-highlight">
                              <span className="edu-highlight__dot" />
                              {h}
                            </li>
                          ))}
                        </ul>
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
