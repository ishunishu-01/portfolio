import { useState, useEffect } from 'react';
import { User, Save, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { profileApi } from '../../services/api';
import './Admin.css';

const EMPTY = {
  name: '', email: '', phone: '', location: '', tagline: '', bio: '',
  github_url: '', linkedin_url: '', website_url: '', photo: '', available: false,
};

export default function AdminProfile() {
  const [profile,  setProfile]  = useState(EMPTY);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [alert,    setAlert]    = useState(null);

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await profileApi.get();
      setProfile({ ...EMPTY, ...res.data });
    } catch {
      showAlert('Failed to load profile. Is the backend running?', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (msg, type = 'success') => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 4000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await profileApi.update(profile);
      showAlert('Profile updated successfully!', 'success');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update profile.';
      showAlert(msg, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading" style={{ minHeight: '60vh' }}>
        <div className="admin-spinner" />
        Loading profile…
      </div>
    );
  }

  return (
    <>
      <div className="admin-topbar">
        <div className="admin-topbar__title">
          <h1>Profile &amp; About</h1>
          <p>Update my public portfolio information</p>
        </div>
        <div className="admin-topbar__actions">
          <button className="btn btn-secondary" onClick={fetchProfile} disabled={loading}>
            <RefreshCw size={14} /> Reload
          </button>
        </div>
      </div>

      <div className="admin-page-body">
        {alert && (
          <div className={`admin-alert admin-alert--${alert.type}`}>
            {alert.type === 'success' ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
            {alert.msg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* ── Personal Info ── */}
          <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
            <div className="admin-card__header">
              <h3><User size={16} /> Personal Information</h3>
            </div>
            <div className="admin-card__body">
              <div className="admin-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input name="name" value={profile.name} onChange={handleChange} placeholder="S.P. Ishara Sewwandi" required />
                  </div>
                  <div className="form-group">
                    <label>Tagline / Title</label>
                    <input name="tagline" value={profile.tagline || ''} onChange={handleChange} placeholder="Full-Stack Developer" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="you@example.com" required />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={profile.phone || ''} onChange={handleChange} placeholder="+94 71 234 5678" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Location</label>
                    <input name="location" value={profile.location || ''} onChange={handleChange} placeholder="Colombo, Sri Lanka" />
                  </div>
                  <div className="form-group">
                    <label>Profile Photo URL</label>
                    <input name="photo" value={profile.photo || ''} onChange={handleChange} placeholder="/assets/photo.jpg" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Bio / About Me</label>
                  <textarea
                    name="bio"
                    value={profile.bio || ''}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Write a short professional bio that appears on your About page…"
                  />
                </div>
                <label className="form-checkbox-row">
                  <input type="checkbox" name="available" checked={!!profile.available} onChange={handleChange} />
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                    Available for new opportunities 🟢
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* ── Social Links ── */}
          <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
            <div className="admin-card__header">
              <h3>🔗 Social &amp; Links</h3>
            </div>
            <div className="admin-card__body">
              <div className="admin-form">
                <div className="form-group">
                  <label>GitHub URL</label>
                  <input type="url" name="github_url" value={profile.github_url || ''} onChange={handleChange} placeholder="https://github.com/username" />
                </div>
                <div className="form-group">
                  <label>LinkedIn URL</label>
                  <input type="url" name="linkedin_url" value={profile.linkedin_url || ''} onChange={handleChange} placeholder="https://linkedin.com/in/username" />
                </div>
                <div className="form-group">
                  <label>Personal Website URL</label>
                  <input type="url" name="website_url" value={profile.website_url || ''} onChange={handleChange} placeholder="https://yoursite.com" />
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button type="button" className="btn btn-secondary" onClick={fetchProfile}>
              <RefreshCw size={14} /> Discard Changes
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving
                ? <><div className="admin-spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> Saving…</>
                : <><Save size={14} /> Save Profile</>
              }
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
