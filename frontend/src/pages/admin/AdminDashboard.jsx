import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase, Zap, Clock, GraduationCap, Award, MessageSquare,
  User, TrendingUp, Circle, CheckCircle, Star, ArrowRight, RefreshCw
} from 'lucide-react';
import { statsApi } from '../../services/api';

const StatCard = ({ icon: Icon, label, value, colorClass, to, accent }) => (
  <Link to={to} className="admin-stat-card" style={{ textDecoration: 'none' }}>
    <div className={`admin-stat-icon ${colorClass}`}>
      <Icon size={22} color={accent} />
    </div>
    <div className="admin-stat-info">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
    <ArrowRight size={14} color="#334155" style={{ marginLeft: 'auto' }} />
  </Link>
);

export default function AdminDashboard() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const stats = await statsApi.getAll();
      setData(stats);
    } catch (err) {
      setError('Failed to load dashboard stats. Make sure the Laravel backend is running.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { load(); }, []);

  const unread    = data ? data.messages.filter(m => !m.is_read).length : 0;
  const featured  = data ? data.projects.filter(p => p.featured).length  : 0;
  const current   = data ? data.experiences.filter(e => e.is_current).length : 0;

  const statCards = data ? [
    { icon: Briefcase,    label: 'Projects',        value: data.projects.length,        colorClass: 'admin-stat-icon--blue',   accent: '#60a5fa', to: '/admin/projects'       },
    { icon: Zap,          label: 'Skills',           value: data.skills.length,          colorClass: 'admin-stat-icon--gold',   accent: '#d4af37', to: '/admin/skills'         },
    { icon: Clock,        label: 'Experience',       value: data.experiences.length,     colorClass: 'admin-stat-icon--green',  accent: '#4ade80', to: '/admin/experience'     },
    { icon: GraduationCap,label: 'Education',        value: data.education.length,       colorClass: 'admin-stat-icon--purple', accent: '#c084fc', to: '/admin/education'      },
    { icon: Award,        label: 'Certifications',   value: data.certifications.length,  colorClass: 'admin-stat-icon--teal',   accent: '#2dd4bf', to: '/admin/certifications' },
    { icon: MessageSquare,label: 'Messages',         value: data.messages.length,        colorClass: 'admin-stat-icon--red',    accent: '#f87171', to: '/admin/messages'       },
  ] : [];

  const recentMessages = data ? data.messages.slice(0, 5) : [];
  const recentProjects = data ? data.projects.slice(0, 4) : [];

  const fmtDate = (d) => d
    ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '';

  return (
    <>
      <div className="admin-topbar">
        <div className="admin-topbar__title">
          <h1>Dashboard</h1>
          <p>Here's an overview of Ishara's portfolio</p>
        </div>
        <div className="admin-topbar__actions">
          {unread > 0 && (
            <Link to="/admin/messages" className="badge badge-red" style={{ textDecoration: 'none' }}>
              {unread} unread {unread === 1 ? 'message' : 'messages'}
            </Link>
          )}
          <button
            className="btn btn-secondary"
            onClick={() => load(true)}
            disabled={refreshing}
            title="Refresh stats"
          >
            <RefreshCw size={14} className={refreshing ? 'admin-spin' : ''} />
            {refreshing ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>
      </div>

      <div className="admin-page-body">
        {error && (
          <div className="admin-alert admin-alert--error" style={{ marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        {/* ── Stats Grid ── */}
        {loading ? (
          <div className="admin-loading" style={{ minHeight: '30vh' }}>
            <div className="admin-spinner" />
            Loading dashboard…
          </div>
        ) : (
          <>
            <div className="admin-stats-grid">
              {statCards.map(c => <StatCard key={c.label} {...c} />)}
            </div>

            {/* ── Quick Highlights ── */}
            <div className="dashboard-highlights">
              <div className="dash-highlight">
                <Star size={15} color="#d4af37" />
                <span><strong>{featured}</strong> featured project{featured !== 1 ? 's' : ''}</span>
              </div>
              <div className="dash-highlight">
                <CheckCircle size={15} color="#4ade80" />
                <span><strong>{current}</strong> current role{current !== 1 ? 's' : ''}</span>
              </div>
              <div className="dash-highlight">
                <Circle size={15} color="#f87171" fill="#f87171" />
                <span><strong>{unread}</strong> unread message{unread !== 1 ? 's' : ''}</span>
              </div>
            </div>

            {/* ── Two Column Layout ── */}
            <div className="dashboard-grid">

              {/* Recent Messages */}
              <div className="admin-card">
                <div className="admin-card__header">
                  <h3><MessageSquare size={16} /> Recent Messages</h3>
                  <Link to="/admin/messages" className="btn btn-secondary btn-sm">View all</Link>
                </div>
                {recentMessages.length === 0 ? (
                  <div className="admin-empty" style={{ padding: '2rem' }}>
                    <MessageSquare size={32} />
                    <p>No messages yet.</p>
                  </div>
                ) : (
                  <div style={{ padding: '0.5rem 0' }}>
                    {recentMessages.map(msg => (
                      <div key={msg.id} className="dash-msg-row">
                        <div className="dash-msg-status">
                          {msg.is_read
                            ? <CheckCircle size={13} color="#4ade80" />
                            : <Circle size={13} color="#d4af37" fill="#d4af37" />}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f1f5f9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {msg.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {msg.subject || msg.message?.slice(0, 50)}
                          </div>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#475569', whiteSpace: 'nowrap', marginLeft: '0.5rem' }}>
                          {fmtDate(msg.created_at)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Projects */}
              <div className="admin-card">
                <div className="admin-card__header">
                  <h3><Briefcase size={16} /> Recent Projects</h3>
                  <Link to="/admin/projects" className="btn btn-secondary btn-sm">View all</Link>
                </div>
                {recentProjects.length === 0 ? (
                  <div className="admin-empty" style={{ padding: '2rem' }}>
                    <Briefcase size={32} />
                    <p>No projects yet.</p>
                  </div>
                ) : (
                  <div style={{ padding: '0.5rem 0' }}>
                    {recentProjects.map(proj => (
                      <div key={proj.id} className="dash-msg-row">
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            {proj.title}
                            {proj.featured && <Star size={11} color="#d4af37" fill="#d4af37" />}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                            <span className="badge badge-blue" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>{proj.category}</span>
                          </div>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#475569', whiteSpace: 'nowrap', marginLeft: '0.5rem' }}>
                          {(Array.isArray(proj.technologies) ? proj.technologies : []).slice(0, 2).join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── Quick Links ── */}
            <div className="admin-card" style={{ marginTop: '1.5rem' }}>
              <div className="admin-card__header">
                <h3><TrendingUp size={16} /> Quick Actions</h3>
              </div>
              <div className="dash-quick-links">
                <Link to="/admin/profile"        className="dash-quick-link"><User size={16} />         Update Profile</Link>
                <Link to="/admin/projects"        className="dash-quick-link"><Briefcase size={16} />    Add Project</Link>
                <Link to="/admin/skills"          className="dash-quick-link"><Zap size={16} />          Add Skill</Link>
                <Link to="/admin/experience"      className="dash-quick-link"><Clock size={16} />        Add Experience</Link>
                <Link to="/admin/education"       className="dash-quick-link"><GraduationCap size={16} />Add Education</Link>
                <Link to="/admin/certifications"  className="dash-quick-link"><Award size={16} />        Add Certification</Link>
                <Link to="/admin/messages"        className="dash-quick-link">
                  <MessageSquare size={16} />
                  View Messages {unread > 0 && <span className="badge badge-red" style={{ marginLeft: 'auto' }}>{unread}</span>}
                </Link>
                <a href="/" target="_blank" rel="noreferrer" className="dash-quick-link">
                  <ArrowRight size={16} /> View Live Site
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
