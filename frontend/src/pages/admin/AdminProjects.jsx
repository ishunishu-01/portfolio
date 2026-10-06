import { useState, useEffect } from 'react';
import { Briefcase, Plus, Pencil, Trash2, X, Star, ExternalLink, Link } from 'lucide-react';
import { projectsApi } from '../../services/api';

const EMPTY = {
  title: '', description: '', technologies: '',
  image: '', github_url: '', live_url: '', category: 'Web App', featured: false, sort_order: 0,
};

const CATEGORIES = ['Web App', 'Frontend', 'Backend', 'AI / ML', 'Mobile', 'DevOps', 'Other'];

export default function AdminProjects() {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal]     = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm]       = useState(EMPTY);
  const [alert, setAlert]     = useState(null);
  const [saving, setSaving]   = useState(false);

  useEffect(() => { fetch(); }, []);

  const fetch = async () => {
    try {
      const res = await projectsApi.getAll();
      setItems(res.data);
    } catch { showAlert('Failed to load projects.', 'error'); }
    finally { setLoading(false); }
  };

  const openAdd  = ()       => { setEditing(null); setForm(EMPTY); setModal(true); };
  const openEdit = (item)   => { setEditing(item); setForm({ ...item, technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : item.technologies || '' }); setModal(true); };
  const closeModal = ()     => { setModal(false); setAlert(null); };

  const showAlert = (msg, type = 'success') => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3500);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean),
    };
    try {
      if (editing) {
        await projectsApi.update(editing.id, payload);
        showAlert('Project updated!');
      } else {
        await projectsApi.create(payload);
        showAlert('Project added!');
      }
      closeModal();
      fetch();
    } catch { showAlert('Save failed. Check your inputs.', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await projectsApi.delete(id);
      showAlert('Project deleted.');
      fetch();
    } catch { showAlert('Delete failed.', 'error'); }
  };

  const techArr = (t) => Array.isArray(t) ? t : (t || '').split(',').map(s => s.trim()).filter(Boolean);

  return (
    <>
      {/* Topbar */}
      <div className="admin-topbar">
        <div className="admin-topbar__title">
          <h1>Projects</h1>
          <p>Manage your portfolio projects</p>
        </div>
        <div className="admin-topbar__actions">
          <button className="btn btn-primary" onClick={openAdd}>
            <Plus size={15} /> Add Project
          </button>
        </div>
      </div>

      <div className="admin-page-body">
        {/* Global alert */}
        {alert && (
          <div className={`admin-alert admin-alert--${alert.type}`}>{alert.msg}</div>
        )}

        <div className="admin-card">
          <div className="admin-card__header">
            <h3><Briefcase size={16} /> All Projects ({items.length})</h3>
          </div>

          {loading ? (
            <div className="admin-loading"><div className="admin-spinner" /> Loading...</div>
          ) : items.length === 0 ? (
            <div className="admin-empty"><Briefcase size={40} /><p>No projects yet. Add your first one!</p></div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Category</th>
                    <th>Technologies</th>
                    <th>Featured</th>
                    <th>Links</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.id}>
                      <td>
                        <strong>{item.title}</strong>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                          {(item.description || '').slice(0, 60)}{item.description?.length > 60 ? '…' : ''}
                        </div>
                      </td>
                      <td><span className="badge badge-blue">{item.category}</span></td>
                      <td>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                          {techArr(item.technologies).slice(0, 3).map(t => (
                            <span key={t} className="tag-chip">{t}</span>
                          ))}
                          {techArr(item.technologies).length > 3 && (
                            <span className="tag-chip">+{techArr(item.technologies).length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td>{item.featured ? <Star size={14} color="#d4af37" fill="#d4af37" /> : <span style={{color:'#334155'}}>—</span>}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {item.github_url && <a href={item.github_url} target="_blank" rel="noreferrer" title="GitHub" style={{color:'#64748b'}}><Link size={14}/></a>}
                          {item.live_url   && <a href={item.live_url}   target="_blank" rel="noreferrer" title="Live" style={{color:'#60a5fa'}}><ExternalLink size={14}/></a>}
                        </div>
                      </td>
                      <td>
                        <div className="td-actions">
                          <button className="btn btn-secondary btn-sm btn-icon" onClick={() => openEdit(item)} title="Edit"><Pencil size={13} /></button>
                          <button className="btn btn-danger btn-sm btn-icon" onClick={() => handleDelete(item.id)} title="Delete"><Trash2 size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="admin-modal-backdrop" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="admin-modal admin-modal--wide">
            <div className="admin-modal__header">
              <h3><Briefcase size={16} /> {editing ? 'Edit Project' : 'Add Project'}</h3>
              <button className="btn btn-secondary btn-sm btn-icon" onClick={closeModal}><X size={15} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="admin-modal__body">
                {alert && <div className={`admin-alert admin-alert--${alert.type}`}>{alert.msg}</div>}
                <div className="admin-form">
                  <div className="form-group">
                    <label>Project Title *</label>
                    <input name="title" value={form.title} onChange={handleChange} placeholder="My Awesome Project" required />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe what this project does..." rows={3} />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Category</label>
                      <select name="category" value={form.category} onChange={handleChange}>
                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Sort Order</label>
                      <input type="number" name="sort_order" value={form.sort_order} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Technologies (comma-separated)</label>
                    <input name="technologies" value={form.technologies} onChange={handleChange} placeholder="React, Laravel, MySQL" />
                    <div className="tags-preview">
                      {form.technologies.split(',').map(t => t.trim()).filter(Boolean).map(t => (
                        <span key={t} className="tag-chip">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Image Path</label>
                    <input name="image" value={form.image} onChange={handleChange} placeholder="/assets/projects/my-project.png" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>GitHub URL</label>
                      <input type="url" name="github_url" value={form.github_url || ''} onChange={handleChange} placeholder="https://github.com/..." />
                    </div>
                    <div className="form-group">
                      <label>Live URL</label>
                      <input type="url" name="live_url" value={form.live_url || ''} onChange={handleChange} placeholder="https://myproject.com" />
                    </div>
                  </div>
                  <label className="form-checkbox-row">
                    <input type="checkbox" name="featured" checked={!!form.featured} onChange={handleChange} />
                    <span style={{fontSize:'0.85rem', color:'#94a3b8'}}>Mark as Featured ⭐</span>
                  </label>
                </div>
              </div>
              <div className="admin-modal__footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : editing ? 'Update Project' : 'Add Project'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
