import { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    name: '', email: '', phone: '', location: '', tagline: '', bio: '',
    github_url: '', linkedin_url: '', website_url: ''
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/profile');
      if (res.data) setProfile(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const token = localStorage.getItem('admin_token');
      await axios.put('http://localhost:8000/api/profile', profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage('Failed to update profile.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Profile & About</h2>
      {message && <div className="admin-message">{message}</div>}
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={profile.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Tagline</label>
          <input type="text" name="tagline" value={profile.tagline || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={profile.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="text" name="phone" value={profile.phone || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input type="text" name="location" value={profile.location || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Bio</label>
          <textarea name="bio" value={profile.bio || ''} onChange={handleChange} rows="5" />
        </div>
        <div className="form-group">
          <label>GitHub URL</label>
          <input type="url" name="github_url" value={profile.github_url || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>LinkedIn URL</label>
          <input type="url" name="linkedin_url" value={profile.linkedin_url || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Personal Website URL</label>
          <input type="url" name="website_url" value={profile.website_url || ''} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
}
