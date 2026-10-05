import { useState } from 'react';
import SkillCard from '../components/SkillCard';
import { Zap, Filter } from 'lucide-react';
import './Skills.css';

const allSkills = [
  /* Frontend */
  { name: 'React',       category: 'Frontend',  level: 'Advanced'     },
  { name: 'Next.js',     category: 'Frontend',  level: 'Intermediate' },
  { name: 'JavaScript',  category: 'Frontend',  level: 'Advanced'     },
  { name: 'TypeScript',  category: 'Frontend',  level: 'Intermediate' },
  { name: 'Tailwind CSS',category: 'Frontend',  level: 'Advanced'     },
  /* Backend */
  { name: 'Laravel',     category: 'Backend',   level: 'Advanced'     },
  { name: 'PHP',         category: 'Backend',   level: 'Advanced'     },
  { name: 'Node.js',     category: 'Backend',   level: 'Intermediate' },
  { name: 'REST API',    category: 'Backend',   level: 'Advanced'     },
  { name: 'Python',      category: 'Backend',   level: 'Intermediate' },
  /* Database */
  { name: 'MySQL',       category: 'Database',  level: 'Advanced'     },
  { name: 'Prisma',      category: 'Database',  level: 'Intermediate' },
  /* DevOps / Tools */
  { name: 'Git',         category: 'Tools',     level: 'Expert'       },
  { name: 'Docker',      category: 'Tools',     level: 'Intermediate' },
  { name: 'Postman',     category: 'Tools',     level: 'Advanced'     },
  /* AI/ML */
  { name: 'Machine Learning', category: 'AI/ML', level: 'Intermediate' },
  { name: 'NLP',         category: 'AI/ML',     level: 'Beginner'     },
];

const categories = ['All', ...new Set(allSkills.map(s => s.category))];

export default function Skills() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? allSkills
    : allSkills.filter(s => s.category === active);

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

          {/* Filter tabs */}
          <div className="skills-filter">
            <Filter size={14} color="var(--text-muted)" />
            {categories.map(cat => (
              <button
                key={cat}
                className={`skills-filter__btn ${active === cat ? 'active' : ''}`}
                onClick={() => setActive(cat)}
                id={`skills-filter-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid-4" style={{ marginTop: '2rem' }}>
            {filtered.map(skill => (
              <SkillCard key={`${skill.name}-${skill.category}`} skill={skill} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
