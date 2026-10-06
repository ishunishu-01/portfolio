import { useState, useEffect } from 'react';
import SkillCard from '../components/SkillCard';
import { Zap, Filter, Loader2 } from 'lucide-react';
import { skillsApi } from '../services/api';
import './Skills.css';

export default function Skills() {
  const [skills, setSkills]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [active, setActive]   = useState('All');

  useEffect(() => {
    skillsApi.getAll()
      .then(res => setSkills(res.data))
      .catch(() => setError('Failed to load skills. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(skills.map(s => s.category).filter(Boolean))];

  const filtered = active === 'All'
    ? skills
    : skills.filter(s => s.category === active);

  return (
    <main style={{ paddingTop: '5rem' }}>
      <section className="section">
        <div className="container">
          {/* Header */}
          <div className="section-header">
            <div className="section-badge"><Zap size={12} /> Expertise</div>
            <h1 className="section-title">My <span>Skills</span></h1>
            <p className="section-subtitle">
              Technologies and tools I use to build full-stack web applications.
            </p>
            <div className="divider" />
          </div>

          {/* Loading state */}
          {loading && (
            <div className="skills-loading">
              <Loader2 size={32} className="spin" />
              <p>Loading skills…</p>
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div className="skills-empty">
              <span>⚠️</span>
              <p>{error}</p>
            </div>
          )}

          {/* Content */}
          {!loading && !error && (
            <>
              {/* Filter tabs */}
              <div className="skills-filter">
                <Filter size={14} color="var(--text-muted)" />
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`skills-filter__btn ${active === cat ? 'active' : ''}`}
                    onClick={() => setActive(cat)}
                    id={`skills-filter-${cat.toLowerCase().replace(/\//g, '-').replace(/ /g, '-')}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid */}
              <div className="grid-4" style={{ marginTop: '2rem' }}>
                {filtered.map(skill => (
                  <SkillCard key={skill.id ?? `${skill.name}-${skill.category}`} skill={skill} />
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="skills-empty">
                  <span>🔍</span>
                  <p>No skills found in this category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
