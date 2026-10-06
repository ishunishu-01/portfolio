import { useEffect, useState } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import {
  User, Briefcase, Zap, Clock, GraduationCap, Award,
  MessageSquare, LogOut, LayoutDashboard, Menu, X
} from 'lucide-react';
import { authApi } from '../../services/api';
import './Admin.css';

const navItems = [
  { to: '/admin/dashboard',      label: 'Dashboard',      icon: LayoutDashboard },
  { to: '/admin/profile',        label: 'Profile & About', icon: User            },
  { to: '/admin/projects',       label: 'Projects',        icon: Briefcase       },
  { to: '/admin/skills',         label: 'Skills',          icon: Zap             },
  { to: '/admin/experience',     label: 'Experience',      icon: Clock           },
  { to: '/admin/education',      label: 'Education',       icon: GraduationCap   },
  { to: '/admin/certifications', label: 'Certifications',  icon: Award           },
  { to: '/admin/messages',       label: 'Messages',        icon: MessageSquare   },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    // Load logged-in user info
    authApi.user()
      .then(res => setUser(res.data))
      .catch(() => {
        // Token invalid / expired
        localStorage.removeItem('auth_token');
        navigate('/admin/login');
      });
  }, [navigate]);

  const handleLogout = async () => {
    try { await authApi.logout(); } catch {}
    localStorage.removeItem('auth_token');
    navigate('/admin/login');
  };

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'A';

  return (
    <div className="admin-layout">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar--open' : ''}`}>
        {/* Brand */}
        <div className="admin-sidebar__brand">
          <div className="admin-sidebar__brand-icon">🛡️</div>
          <div className="admin-sidebar__brand-text">
            <h2>Admin Panel</h2>
            <span>Portfolio CMS</span>
          </div>
          <button
            className="admin-sidebar__close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={16} />
          </button>
        </div>

        <div className="admin-sidebar__nav-label">Navigation</div>

        <nav>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__user">
            <div className="admin-sidebar__avatar">{initials}</div>
            <div className="admin-sidebar__user-info">
              <span>{user?.name || 'Administrator'}</span>
              <span>{user?.email || 'Super Admin'}</span>
            </div>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="admin-content">
        {/* Mobile topbar toggle */}
        <div className="admin-mobile-header">
          <button
            className="btn btn-secondary btn-icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={18} />
          </button>
          <span style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '0.95rem' }}>
            Admin Panel
          </span>
          <span />
        </div>

        <Outlet />
      </div>
    </div>
  );
}
