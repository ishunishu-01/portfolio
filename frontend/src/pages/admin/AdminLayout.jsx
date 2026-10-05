import { useEffect } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import {
  User, Briefcase, Zap, Clock, GraduationCap, Award, MessageSquare, LogOut, LayoutDashboard
} from 'lucide-react';
import './Admin.css';

const navItems = [
  { to: '/admin/profile',        label: 'Profile & About',   icon: User },
  { to: '/admin/projects',       label: 'Projects',          icon: Briefcase },
  { to: '/admin/skills',         label: 'Skills',            icon: Zap },
  { to: '/admin/experience',     label: 'Experience',        icon: Clock },
  { to: '/admin/education',      label: 'Education',         icon: GraduationCap },
  { to: '/admin/certifications', label: 'Certifications',    icon: Award },
  { to: '/admin/messages',       label: 'Messages',          icon: MessageSquare },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) navigate('/admin/login');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        {/* Brand */}
        <div className="admin-sidebar__brand">
          <div className="admin-sidebar__brand-icon">🛡️</div>
          <div className="admin-sidebar__brand-text">
            <h2>Admin Panel</h2>
            <span>Portfolio CMS</span>
          </div>
        </div>

        <div className="admin-sidebar__nav-label">Navigation</div>

        <nav>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__user">
            <div className="admin-sidebar__avatar">A</div>
            <div className="admin-sidebar__user-info">
              <span>Administrator</span>
              <span>Super Admin</span>
            </div>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}
