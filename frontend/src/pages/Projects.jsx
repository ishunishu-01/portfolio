import { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { Briefcase, Filter } from 'lucide-react';
import './Projects.css';

const allProjects = [
  {
    id: 1,
    title: 'MediCare Pharmacy ERP',
    description: 'A comprehensive pharmacy management system with inventory control, billing, prescription management, supplier tracking, and daily report analytics dashboard.',
    technologies: ['Laravel', 'PHP', 'MySQL', 'Blade', 'Bootstrap'],
    image:      '/assets/projects/medicarepharmacy2.png',
    github_url: 'https://github.com/yourusername/medicare-erp',
    live_url:   null,
    category:   'Web App',
    featured:   true,
  },
  {
    id: 2,
    title: 'Fertilizer Shop Management',
    description: 'A full-featured POS and inventory system for fertilizer shops with stock tracking, supplier management, customer billing, contact form, and automated email replies.',
    technologies: ['Laravel', 'PHP', 'MySQL', 'Blade', 'Bootstrap'],
    image:      '/assets/projects/ferlilizershopmanagementsystem.png',
    github_url: 'https://github.com/yourusername/fertilizer-shop',
    live_url:   null,
    category:   'Web App',
    featured:   false,
  },
  {
    id: 3,
    title: 'AI-Integrated OSINT & Privacy Risk Framework',
    description: 'An AI-powered OSINT tool for automated digital footprint discovery and identity verification, featuring face recognition, Google CSE integration, and privacy risk scoring.',
    technologies: ['Python', 'Streamlit', 'ArcFace', 'Google CSE API', 'NLP'],
    image:      '/assets/projects/osint-privacy-risk.png',
    github_url: 'https://github.com/yourusername/osint-privacy',
    live_url:   null,
    category:   'AI / ML',
    featured:   true,
  },
  {
    id: 4,
    title: 'React CRUD Notice Board App',
    description: 'A Company Notice Board application built with React frontend and Laravel REST API backend, supporting full CRUD operations with search functionality.',
    technologies: ['React', 'Laravel', 'MySQL', 'REST API', 'Vite'],
    image:      '/assets/projects/reactcrudfrontend.png',
    github_url: 'https://github.com/yourusername/react-crud-app',
    live_url:   null,
    category:   'Web App',
    featured:   false,
  },
  {
    id: 5,
    title: 'Student Management System',
    description: 'A full student portal with dashboard, subject management, exam scheduling, quiz tracking, attendance (94%), grade reports, and profile management for students.',
    technologies: ['Laravel', 'MySQL', 'PHP', 'Blade', 'Bootstrap'],
    image:      '/assets/projects/studentmangement1.png',
    github_url: 'https://github.com/yourusername/student-management',
    live_url:   null,
    category:   'Web App',
    featured:   false,
  },
  {
    id: 6,
    title: 'Wanderlust Travel Website',
    description: 'A stunning travel booking platform with destination discovery, tour browsing, and a premium UI featuring hero sections, animated statistics, and responsive design.',
    technologies: ['React', 'Vite', 'CSS', 'JavaScript'],
    image:      '/assets/projects/wondelusttravelsite.png',
    github_url: 'https://github.com/yourusername/wanderlust-travel',
    live_url:   null,
    category:   'Frontend',
    featured:   true,
  },
];

const categories = ['All', ...new Set(allProjects.map(p => p.category))];

export default function Projects() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? allProjects
    : allProjects.filter(p => p.category === active);

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
        </div>
      </section>
    </main>
  );
}
