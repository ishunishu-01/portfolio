import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import SkillCard from '../components/SkillCard';
import {
  ArrowRight, Briefcase, GraduationCap, Award,
  Download, Zap, Layers, MessageCircle
} from 'lucide-react';
import './Home.css';

/* ── Static preview data (will come from API later) ─────────── */
const featuredProjects = [
  {
    id: 1,
    title: 'MediCare Pharmacy ERP',
    description: 'A comprehensive pharmacy management system with inventory control, billing, prescription management, and analytics dashboard.',
    technologies: ['React', 'Laravel', 'MySQL', 'REST API'],
    image:      '/assets/projects/project-1.jpg',
    github_url: 'https://github.com/ishunishu-01/medicare-erp',
    live_url:   null,
    featured:   true,
  },
  {
    id: 2,
    title: 'Fertilizer Shop Management',
    description: 'Multi-vendor fertilizer shop POS system with stock tracking, supplier management, and financial reporting built with modern stack.',
    technologies: ['Next.js', 'Prisma', 'MySQL', 'TypeScript'],
    image:      '/assets/projects/project-2.jpg',
    github_url: 'https://github.com/ishunishu-01/fertilizer-shop',
    live_url:   null,
    featured:   false,
  },
  {
    id: 3,
    title: 'AI-Based OSINT Privacy Risk',
    description: 'Machine learning model that assesses privacy risks from open-source intelligence data using NLP and pattern recognition algorithms.',
    technologies: ['Python', 'Machine Learning', 'NLP', 'Flask'],
    image:      '/assets/projects/project-3.jpg',
    github_url: 'https://github.com/ishunishu-01/osint-privacy',
    live_url:   null,
    featured:   false,
  },
];

const featuredSkills = [
  { name: 'React',      category: 'Frontend',  level: 'Advanced'     },
  { name: 'Laravel',    category: 'Backend',   level: 'Advanced'     },
  { name: 'MySQL',      category: 'Database',  level: 'Advanced'     },
  { name: 'Python',     category: 'Language',  level: 'Intermediate' },
  { name: 'TypeScript', category: 'Language',  level: 'Intermediate' },
  { name: 'Docker',     category: 'DevOps',    level: 'Intermediate' },
  { name: 'Node.js',    category: 'Backend',   level: 'Intermediate' },
  { name: 'Git',        category: 'Tools',     level: 'Expert'       },
];

const highlights = [
  {
    icon: Briefcase,
    label: '5+',
    sub:   'Projects Delivered',
    color: 'var(--gold-400)',
  },
  {
    icon: Layers,
    label: '13+',
    sub:   'Technologies',
    color: '#6ee7b7',
  },
  {
    icon: GraduationCap,
    label: 'BICT(Hons)',
    sub:   'ICT Undergraduate',
    color: '#90cdf4',
  },
  {
    icon: Award,
    label: '3+',
    sub:   'Certifications',
    color: '#f9a8d4',
  },
];

export default function Home() {
  return (
    <main className="home">
      {/* Hero Section */}
      <Hero />

      {/* ── Highlights / Numbers ──────────────────────────── */}
      <section className="home-highlights section">
        <div className="container">
          <div className="home-highlights__grid">
            {highlights.map(({ icon: Icon, label, sub, color }) => (
              <div className="home-highlight-card card" key={sub}>
                <div className="home-highlight-card__icon" style={{ color }}>
                  <Icon size={28} />
                </div>
                <div className="home-highlight-card__num" style={{ color }}>{label}</div>
                <div className="home-highlight-card__sub">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────────────── */}
      <section className="section home-projects">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Briefcase size={12} /> Portfolio
            </div>
            <h2 className="section-title">
              Featured <span>Projects</span>
            </h2>
            <p className="section-subtitle">
              A selection of projects that showcase my skills in full-stack development.
            </p>
            <div className="divider" />
          </div>

          <div className="grid-3">
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="home-projects__cta">
            <Link to="/projects" className="btn btn-outline-gold" id="home-all-projects">
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Skills ───────────────────────────────── */}
      <section className="section home-skills">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Zap size={12} /> Expertise
            </div>
            <h2 className="section-title">
              Core <span>Skills</span>
            </h2>
            <p className="section-subtitle">
              Technologies I use to build full-stack web applications.
            </p>
            <div className="divider" />
          </div>

          <div className="grid-4">
            {featuredSkills.map(skill => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>

          <div className="home-projects__cta">
            <Link to="/skills" className="btn btn-outline-gold" id="home-all-skills">
              View All Skills <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────── */}
      <section className="section home-cta">
        <div className="container">
          <div className="home-cta__card">
            <div className="home-cta__bg-orb" />
            <div className="home-cta__content">
              <div className="section-badge" style={{ margin: '0 auto 1rem' }}>
                <MessageCircle size={12} /> Let's Talk
              </div>
              <h2 className="home-cta__title">
                Ready to build something <span>amazing</span> together?
              </h2>
              <p className="home-cta__sub">
                I'm open to freelance projects, full-time roles, and exciting collaborations.
                Let's connect!
              </p>
              <div className="home-cta__actions">
                <Link to="/contact" className="btn btn-primary" id="home-cta-contact">
                  Get In Touch <ArrowRight size={16} />
                </Link>
                <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn btn-secondary" id="home-cta-resume">
                  <Download size={16} /> Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
