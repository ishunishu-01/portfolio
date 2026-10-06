import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { Briefcase, Filter, Loader2 } from 'lucide-react';
import { projectsApi } from '../services/api';
import './Projects.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [active, setActive]     = useState('All');

  useEffect(() => {
    projectsApi.getAll()
      .then(res => setProjects(res.data))
      .catch(() => setError('Failed to load projects. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];

  const filtered = active === 'All'
    ? projects
    : projects.filter(p => p.category === active);

  return (
    <main style={{ paddingTop: '5rem' }}>
      <section className="section">
        <div className="container">
          {/* Header */}
          <div className="section-header">
            <div className="section-badge"><Briefcase size={12} /> My Work</div>
            <h1 className="section-title">All <span>Projects</span></h1>
            <p className="section-subtitle">
              A showcase of my projects — from pharmacy ERPs to AI systems.
            </p>
            <div className="divider" />
          </div>

          {/* Loading state */}
          {loading && (
            <div className="projects-loading">
              <Loader2 size={32} className="spin" />
              <p>Loading projects…</p>
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div className="projects-empty">
              <span>⚠️</span>
              <p>{error}</p>
            </div>
          )}

          {/* Content */}
          {!loading && !error && (
            <>
              {/* Filter tabs */}
              <div className="projects-filter">
                <Filter size={14} color="var(--text-muted)" />
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`skills-filter__btn ${active === cat ? 'active' : ''}`}
                    onClick={() => setActive(cat)}
                    id={`projects-filter-${cat.toLowerCase().replace(/\//g, '-').replace(/ /g, '-')}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid */}
              <div className="grid-3" style={{ marginTop: '2.5rem' }}>
                {filtered.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="projects-empty">
                  <span>🔍</span>
                  <p>No projects found in this category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
