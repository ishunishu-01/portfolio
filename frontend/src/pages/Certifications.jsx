import { useState } from 'react';
import { Award, ExternalLink, Calendar, Building2, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import './Certifications.css';

/* ─────────────────────────────────────────────────────────────
   Add your real certificate data here.
   • certificate_image: path relative to /public (e.g. /assets/certificates/cert-1.jpg)
   • certificate_url:   link to the online verification page
   ───────────────────────────────────────────────────────────── */
const certifications = [
  {
    id: 1,
    name:            'Introduction to the Internet of Things (IoT)',
    organization:    'Alison',
    issue_date:      '',
    category:        'IoT',
    credential_id:   '1747-49967198',
    certificate_url: 'https://alison.com',
    certificate_image: '/assets/certificates/cert-1.jpg',
    icon: '📡',
  },
  {
    id: 2,
    name:            'ISO 9001:2015 — The Complete Guide to Quality Management Systems QMS',
    organization:    'Alison',
    issue_date:      '',
    category:        'Quality Management',
    credential_id:   '7499-49967190',
    certificate_url: 'https://alison.com',
    certificate_image: '/assets/certificates/cert-2.jpg',
    icon: '✅',
  },
  {
    id: 3,
    name:            'Basics of Prompt Engineering',
    organization:    'Alison',
    issue_date:      '',
    category:        'AI / ML',
    credential_id:   '6130-49967190',
    certificate_url: 'https://alison.com',
    certificate_image: '/assets/certificates/cert-3.jpg',
    icon: '🤖',
  },
  {
    id: 4,
    name:            'Figma Course',
    organization:    'DP Education IT Campus',
    issue_date:      '2026-01',
    category:        'Design',
    credential_id:   '',
    certificate_url: '',
    certificate_image: '/assets/certificates/cert-4.png',
    icon: '🎨',
  },
  {
    id: 5,
    name:            'Machine Learning for Absolute Beginners',
    organization:    'Alison',
    issue_date:      '',
    category:        'AI / ML',
    credential_id:   '4340-49967190',
    certificate_url: 'https://alison.com',
    certificate_image: '/assets/certificates/cert-5.jpg',
    icon: '🧠',
  },
  {
    id: 6,
    name:            'Basics of Prompt Engineering',
    organization:    'Alison',
    issue_date:      '',
    category:        'AI / ML',
    credential_id:   '6130-49967190',
    certificate_url: 'https://alison.com',
    certificate_image: '/assets/certificates/cert-6.jpg',
    icon: '🤖',
  },
  {
    id: 7,
    name:            'Fundamentals of Manual Handling',
    organization:    'Alison',
    issue_date:      '',
    category:        'General',
    credential_id:   '1668-49967190',
    certificate_url: 'https://alison.com',
    certificate_image: '/assets/certificates/cert-7.jpg',
    icon: '📦',
  },
  {
    id: 8,
    name:            'ISO 9001:2015 — The Complete Guide to Quality Management Systems QMS',
    organization:    'Alison',
    issue_date:      '',
    category:        'Quality Management',
    credential_id:   '7499-49967190',
    certificate_url: 'https://alison.com',
    certificate_image: '/assets/certificates/cert-8.jpg',
    icon: '✅',
  },
  {
    id: 9,
    name:            'Introduction to DevOps Tools',
    organization:    'Simplilearn SkillUp',
    issue_date:      '2026-01',
    category:        'DevOps',
    credential_id:   '9733717',
    certificate_url: 'https://simplilearn.com',
    certificate_image: '/assets/certificates/cert-9.png',
    icon: '⚙️',
  },
  {
    id: 10,
    name:            'Software Quality Assurance Manual Testing',
    organization:    'Coding Academy',
    issue_date:      '',
    category:        'QA / Testing',
    credential_id:   '',
    certificate_url: '',
    certificate_image: '/assets/certificates/cert-10.jpg',
    icon: '🔍',
  },
];

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  return new Date(year, month - 1).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

/* ── Lightbox component ─────────────────────────────────────── */
function Lightbox({ cert, allCerts, onClose, onPrev, onNext }) {
  const idx   = allCerts.findIndex(c => c.id === cert.id);
  const total = allCerts.length;

  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Arrow key navigation
  const handleKey = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && idx > 0) onPrev();
    if (e.key === 'ArrowRight' && idx < total - 1) onNext();
  };

  return (
    <div
      className="lightbox-backdrop"
      onClick={handleBackdrop}
      onKeyDown={handleKey}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`Certificate: ${cert.name}`}
    >
      <div className="lightbox-panel">
        {/* Close */}
        <button className="lightbox-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {/* Prev */}
        {idx > 0 && (
          <button className="lightbox-nav lightbox-nav--prev" onClick={onPrev} aria-label="Previous">
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Image */}
        <div className="lightbox-image-wrap">
          <img
            src={cert.certificate_image}
            alt={`${cert.name} certificate`}
            className="lightbox-image"
          />
          {/* Fallback overlay if image missing */}
          <div className="lightbox-image-fallback">
            <span className="lightbox-fallback-emoji">{cert.icon}</span>
            <p>Certificate image not added yet.<br />Place it at: <code>{cert.certificate_image}</code></p>
          </div>
        </div>

        {/* Next */}
        {idx < total - 1 && (
          <button className="lightbox-nav lightbox-nav--next" onClick={onNext} aria-label="Next">
            <ChevronRight size={24} />
          </button>
        )}

        {/* Info bar */}
        <div className="lightbox-info">
          <div className="lightbox-info__left">
            <span className="lightbox-emoji">{cert.icon}</span>
            <div>
              <h3 className="lightbox-title">{cert.name}</h3>
              <p className="lightbox-org">{cert.organization} · {formatDate(cert.issue_date)}</p>
            </div>
          </div>
          <div className="lightbox-info__right">
            <span className="lightbox-counter">{idx + 1} / {total}</span>
            {cert.certificate_url && (
              <a
                href={cert.certificate_url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{ fontSize: '0.82rem', padding: '0.5rem 1rem' }}
              >
                <ExternalLink size={13} /> Verify
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Certificate Card ────────────────────────────────────────── */
function CertCard({ cert, onOpen }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="cert-card card" key={cert.id}>
      {/* Thumbnail — click to open lightbox */}
      <div
        className="cert-thumb"
        onClick={() => onOpen(cert)}
        role="button"
        tabIndex={0}
        aria-label={`View ${cert.name} certificate`}
        onKeyDown={e => e.key === 'Enter' && onOpen(cert)}
      >
        {!imgError ? (
          <img
            src={cert.certificate_image}
            alt={cert.name}
            className="cert-thumb__img"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="cert-thumb__placeholder">
            <span className="cert-thumb__emoji">{cert.icon}</span>
            <span className="cert-thumb__hint">Add image to<br /><code>/assets/certificates/cert-{cert.id}.jpg</code></span>
          </div>
        )}
        <div className="cert-thumb__overlay">
          <ZoomIn size={28} color="#fff" />
          <span>View Certificate</span>
        </div>
      </div>

      <div className="cert-card__body">
        <div className="cert-card__top">
          <span className="tag">{cert.category}</span>
        </div>

        <h3 className="cert-card__name">{cert.name}</h3>

        <div className="cert-card__meta">
          <span className="cert-meta-row">
            <Building2 size={13} />
            {cert.organization}
          </span>
          <span className="cert-meta-row">
            <Calendar size={13} />
            {formatDate(cert.issue_date)}
          </span>
        </div>

        {cert.credential_id && (
          <div className="cert-card__id">
            ID: <code>{cert.credential_id}</code>
          </div>
        )}

        <div className="cert-card__actions">
          <button
            className="cert-card__link"
            onClick={() => onOpen(cert)}
            id={`cert-view-img-${cert.id}`}
          >
            <ZoomIn size={14} />
            View Image
          </button>
          {cert.certificate_url && (
            <a
              href={cert.certificate_url}
              target="_blank"
              rel="noreferrer"
              className="cert-card__link cert-card__link--verify"
              id={`cert-verify-${cert.id}`}
            >
              <Award size={14} />
              Verify
              <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* ── Main page ───────────────────────────────────────────────── */
export default function Certifications() {
  const [activeCert, setActiveCert] = useState(null);

  const activeIdx = activeCert ? certifications.findIndex(c => c.id === activeCert.id) : -1;

  const openLightbox  = (cert) => setActiveCert(cert);
  const closeLightbox = ()     => setActiveCert(null);
  const prevCert      = ()     => activeIdx > 0 && setActiveCert(certifications[activeIdx - 1]);
  const nextCert      = ()     => activeIdx < certifications.length - 1 && setActiveCert(certifications[activeIdx + 1]);

  return (
    <main style={{ paddingTop: '5rem' }}>
      <section className="section">
        <div className="container">
          {/* Header */}
          <div className="section-header">
            <div className="section-badge"><Award size={12} /> Credentials</div>
            <h1 className="section-title">My <span>Certifications</span></h1>
            <p className="section-subtitle">
              Professional certifications and courses that demonstrate my continuous learning.
            </p>
            <div className="divider" />
          </div>

          {/* Grid */}
          <div className="certs-grid">
            {certifications.map(cert => (
              <CertCard key={cert.id} cert={cert} onOpen={openLightbox} />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {activeCert && (
        <Lightbox
          cert={activeCert}
          allCerts={certifications}
          onClose={closeLightbox}
          onPrev={prevCert}
          onNext={nextCert}
        />
      )}
    </main>
  );
}
