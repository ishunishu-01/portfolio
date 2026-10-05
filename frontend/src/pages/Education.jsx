import { GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react';
import './Education.css';

const educationList = [
  {
    id: 1,
    institution: 'University / Institute Name',
    degree:      'Bachelor of Science in Information Technology',
    field:       'Information Technology',
    grade:       'Expected 2025',
    start_date:  '2021-09',
    end_date:    '2025-06',
    current:     true,
    description: 'Studying software engineering, web development, databases, networking, AI/ML, cybersecurity, and project management.',
    highlights:  [
      'Specialization in Software Engineering & AI',
      'Final Year Project: AI-Based OSINT Privacy Risk Assessment',
      'Active member of IT Society ATIT',
      'Dean\'s List recognition',
    ],
    location:    'Sri Lanka',
  },
];

function formatDate(dateStr, isCurrent) {
  if (isCurrent) return 'Present';
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  const d = new Date(year, month - 1);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

export default function Education() {
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

          {/* Education cards */}
          <div className="edu-list">
            {educationList.map(edu => (
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
                    <span className="edu-meta-chip" style={{ color: 'var(--gold-400)' }}>
                      🎓 {edu.grade}
                    </span>
                  </div>

                  <p className="edu-card__desc">{edu.description}</p>

                  {edu.highlights && (
                    <ul className="edu-highlights">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="edu-highlight">
                          <span className="edu-highlight__dot" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
