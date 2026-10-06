import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { authApi } from '../../services/api';
import './Admin.css';

export default function Login() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState(null);
  const [loading,  setLoading]  = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await authApi.login({ email, password });
      localStorage.setItem('auth_token', response.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message
        || err.response?.data?.errors?.email?.[0]
        || 'Invalid email or password. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login__logo">
          <div className="admin-login__logo-icon">
            <ShieldCheck size={28} color="#0b0f1a" />
          </div>
          <h2>Admin Panel</h2>
          <p>Sign in to manage your portfolio</p>
        </div>

        {error && (
          <div className="admin-alert admin-alert--error">
            <Lock size={14} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="admin-form">
          <div className="form-group">
            <label htmlFor="login-email">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none' }} />
              <input
                id="login-email"
                type="email"
                value={email}
                placeholder="admin@admin.com"
                onChange={e => setEmail(e.target.value)}
                style={{ paddingLeft: '2.25rem' }}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none' }} />
              <input
                id="login-password"
                type={showPw ? 'text' : 'password'}
                value={password}
                placeholder="••••••••"
                onChange={e => setPassword(e.target.value)}
                style={{ paddingLeft: '2.25rem', paddingRight: '2.75rem' }}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: 0 }}
              >
                {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          <div className="admin-login__hint">
            Default: <strong>admin@admin.com</strong> / <strong>password123</strong>
          </div>

          <button
            id="login-submit"
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', marginTop: '0.5rem' }}
            disabled={loading}
          >
            {loading ? (
              <><div className="admin-spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> Signing in…</>
            ) : (
              <><ShieldCheck size={15} /> Sign In</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
