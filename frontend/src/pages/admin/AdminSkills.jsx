import { useState, useEffect } from 'react';
import { Zap, Plus, Pencil, Trash2, X } from 'lucide-react';
import { skillsApi } from '../../services/api';

const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const CATEGORIES = ['Frontend', 'Backend', 'Database', 'DevOps', 'AI / ML', 'Design', 'Tools', 'Other'];
const EMPTY = { name: '', category: 'Frontend', level: 'Intermediate', icon: '', sort_order: 0 };

export default function AdminSkills() {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal]     = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm]       = useState(EMPTY);
  const [alert, setAlert]     = useState(null);
  const [saving, setSaving]   = useState(false);

  useEffect(() => { fetch(); }, []);

  const fetch = async () => {
    try { const r = await skillsApi.getAll(); setItems(r.data); }
    catch { showAlert('Failed to load.', 'error'); }
    finally { setLoading(false); }
  };

  const openAdd  = ()     => { setEditing(null); setForm(EMPTY); setModal(true); };
  const openEdit = (item) => { setEditing(item); setForm({ ...item }); setModal(true); };
  const close    = ()     => { setModal(false); setAlert(null); };
  const showAlert = (msg, type = 'success') => { setAlert({ msg, type }); setTimeout(() => setAlert(null), 3500); };
  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editing) await skillsApi.update(editing.id, form);
      else         await skillsApi.create(form);
      showAlert(editing ? 'Skill updated!' : 'Skill added!');
      close(); fetch();
    } catch { showAlert('Save failed.', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return;
    try { await skillsApi.delete(id); showAlert('Deleted.'); fetch(); }
    catch { showAlert('Delete failed.', 'error'); }
  };

  const levelColor = { Beginner: 'badge-gray', Intermediate: 'badge-blue', Advanced: 'badge-green', Expert: 'badge-gold' };

  // Group by category for display
  const grouped = items.reduce((acc, s) => {
    const cat = s.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {});

  return (
    <>
      <div className="admin-topbar">
        <div className="admin-topbar__title">
          <h1>Skills</h1>
          <p>Manage your technical skills</p>
        </div>
        <div className="admin-topbar__actions">
          <button className="btn btn-primary" onClick={openAdd}><Plus size={15} /> Add Skill</button>
        </div>
      </div>

      <div className="admin-page-body">
        {alert && <div className={`admin-alert admin-alert--${alert.type}`}>{alert.msg}</div>}

        {loading ? (
          <div className="admin-loading"><div className="admin-spinner" /> Loading...</div>
        ) : items.length === 0 ? (
          <div className="admin-card"><div className="admin-empty"><Zap size={40} /><p>No skills yet.</p></div></div>
        ) : (
          <div className="admin-card">
            <div className="admin-card__header">
              <h3><Zap size={16} /> All Skills ({items.length})</h3>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Skill</th><th>Category</th><th>Level</th><th>Icon</th><th>Order</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.id}>
                      <td><strong>{item.name}</strong></td>
                      <td><span className="badge badge-purple">{item.category}</span></td>
                      <td><span className={`badge ${levelColor[item.level] || 'badge-gray'}`}>{item.level}</span></td>
                      <td style={{ fontSize: '1.2rem' }}>{item.icon || '—'}</td>
                      <td style={{ color: '#64748b' }}>{item.sort_order ?? 0}</td>
                      <td>
                        <div className="td-actions">
                          <button className="btn btn-secondary btn-sm btn-icon" onClick={() => openEdit(item)}><Pencil size={13} /></button>
                          <button className="btn btn-danger btn-sm btn-icon" onClick={() => handleDelete(item.id)}><Trash2 size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {modal && (
        <div className="admin-modal-backdrop" onClick={e => e.target === e.currentTarget && close()}>
          <div className="admin-modal">
            <div className="admin-modal__header">
              <h3><Zap size={16} /> {editing ? 'Edit Skill' : 'Add Skill'}</h3>
              <button className="btn btn-secondary btn-sm btn-icon" onClick={close}><X size={15} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="admin-modal__body">
                {alert && <div className={`admin-alert admin-alert--${alert.type}`}>{alert.msg}</div>}
                <div className="admin-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Skill Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="React.js" required />
                    </div>
                    <div className="form-group">
                      <label>Icon (emoji)</label>
                      <input name="icon" value={form.icon || ''} onChange={handleChange} placeholder="⚛️" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Category</label>
                      <select name="category" value={form.category} onChange={handleChange}>
                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Level</label>
                      <select name="level" value={form.level} onChange={handleChange}>
                        {LEVELS.map(l => <option key={l}>{l}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Sort Order</label>
                    <input type="number" name="sort_order" value={form.sort_order} onChange={handleChange} />
                  </div>
                </div>
              </div>
              <div className="admin-modal__footer">
                <button type="button" className="btn btn-secondary" onClick={close}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : editing ? 'Update' : 'Add Skill'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
