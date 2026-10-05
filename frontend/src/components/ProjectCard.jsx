import { useState } from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import './ProjectCard.css';

export default function ProjectCard({ project }) {
  const [imgError, setImgError] = useState(false);
  const {
    title       = 'Untitled Project',
    description = '',
    technologies = [],
    image        = null,
    github_url   = null,
    live_url     = null,
    featured     = false,
  } = project;

  return (
    <article className={`project-card ${featured ? 'project-card--featured' : ''}`}>
      {/* Thumbnail */}
      <div className="project-card__thumb">
        {image && !imgError ? (
          <img
            src={image}
            alt={title}
            className="project-card__img"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="project-card__placeholder">
            <span>{title.charAt(0)}</span>
          </div>
        )}

        {featured && (
          <div className="project-card__featured-badge">⭐ Featured</div>
        )}

        {/* Hover overlay */}
        <div className="project-card__overlay">
          <div className="project-card__overlay-actions">
            {github_url && (
              <a
                href={github_url}
                target="_blank"
                rel="noreferrer"
                className="project-card__overlay-btn"
                aria-label="View GitHub"
              >
                <GithubIcon size={18} color="currentColor" />
                Code
              </a>
            )}
            {live_url && (
              <a
                href={live_url}
                target="_blank"
                rel="noreferrer"
                className="project-card__overlay-btn project-card__overlay-btn--primary"
                aria-label="Live demo"
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="project-card__body">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc">{description}</p>

        {/* Tech stack tags */}
        {technologies.length > 0 && (
          <div className="project-card__tags">
            {technologies.map(tech => (
              <span key={tech} className="tag">{tech}</span>
            ))}
          </div>
        )}

        {/* Footer links */}
        <div className="project-card__footer">
          {github_url && (
            <a href={github_url} target="_blank" rel="noreferrer" className="project-card__link">
              <GithubIcon size={14} color="currentColor" /> GitHub
            </a>
          )}
          {live_url && (
            <a href={live_url} target="_blank" rel="noreferrer" className="project-card__link project-card__link--gold">
              Live Demo <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
