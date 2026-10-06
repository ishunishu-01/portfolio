import { useState, useEffect } from 'react';
import { Clock, Plus, Pencil, Trash2, X } from 'lucide-react';
import { experiencesApi } from '../../services/api';
const EMPTY = { company: '', position: '', description: '', achievements: '', start_date: '', end_date: '', is_current: false, location: '', sort_order: 0 };

export default function AdminExperience() {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal]     = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm]       = useState(EMPTY);
  const [alert, setAlert]     = useState(null);
  const [saving, setSaving]   = useState(false);

  useEffect(() => { fetch(); }, []);

  const fetch = async () => {
    try { const r = await experiencesApi.getAll(); setItems(r.data); }
    catch { showAlert('Failed to load.', 'error'); }
    finally { setLoading(false); }
  };

  const openAdd  = ()     => { setEditing(null); setForm(EMPTY); setModal(true); };
  const openEdit = (item) => { setEditing(item); setForm({ ...item }); setModal(true); };
  const close    = ()     => { setModal(false); setAlert(null); };
  const showAlert = (msg, type = 'success') => { setAlert({ msg, type }); setTimeout(() => setAlert(null), 3500); };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editing) await experiencesApi.update(editing.id, form);
      else         await experiencesApi.create(form);
      showAlert(editing ? 'Updated!' : 'Added!');
      close(); fetch();
    } catch { showAlert('Save failed.', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this experience?')) return;
    try { await experiencesApi.delete(id); showAlert('Deleted.'); fetch(); }
    catch { showAlert('Delete failed.', 'error'); }
  };

  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '';

  return (
    <>
      <div className="admin-topbar">
        <div className="admin-topbar__title">
          <h1>Experience</h1>
          <p>Manage your work experience</p>
        </div>
        <div className="admin-topbar__actions">
          <button className="btn btn-primary" onClick={openAdd}><Plus size={15} /> Add Experience</button>
        </div>
      </div>

      <div className="admin-page-body">
        {alert && <div className={`admin-alert admin-alert--${alert.type}`}>{alert.msg}</div>}
        <div className="admin-card">
          <div className="admin-card__header">
            <h3><Clock size={16} /> Work Experience ({items.length})</h3>
          </div>
          {loading ? (
            <div className="admin-loading"><div className="admin-spinner" /> Loading...</div>
          ) : items.length === 0 ? (
            <div className="admin-empty"><Clock size={40} /><p>No experience entries yet.</p></div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Position</th><th>Company</th><th>Duration</th><th>Location</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.id}>
                      <td><strong>{item.position}</strong></td>
                      <td>{item.company}</td>
                      <td style={{ color: '#64748b', fontSize: '0.8rem' }}>{fmtDate(item.start_date)} — {item.is_current ? 'Present' : fmtDate(item.end_date)}</td>
                      <td style={{ color: '#64748b' }}>{item.location || '—'}</td>
                      <td>{item.is_current ? <span className="badge badge-green">Current</span> : <span className="badge badge-gray">Past</span>}</td>
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
          )}
        </div>
      </div>

      {modal && (
        <div className="admin-modal-backdrop" onClick={e => e.target === e.currentTarget && close()}>
          <div className="admin-modal admin-modal--wide">
            <div className="admin-modal__header">
              <h3><Clock size={16} /> {editing ? 'Edit Experience' : 'Add Experience'}</h3>
              <button className="btn btn-secondary btn-sm btn-icon" onClick={close}><X size={15} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="admin-modal__body">
                {alert && <div className={`admin-alert admin-alert--${alert.type}`}>{alert.msg}</div>}
                <div className="admin-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Position / Job Title *</label>
                      <input name="position" value={form.position} onChange={handleChange} placeholder="Full Stack Developer" required />
                    </div>
                    <div className="form-group">
                      <label>Company *</label>
                      <input name="company" value={form.company} onChange={handleChange} placeholder="Acme Corp" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Start Date</label>
                      <input type="date" name="start_date" value={form.start_date || ''} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label>End Date</label>
                      <input type="date" name="end_date" value={form.end_date || ''} onChange={handleChange} disabled={!!form.is_current} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Location</label>
                      <input name="location" value={form.location || ''} onChange={handleChange} placeholder="Colombo, Sri Lanka" />
                    </div>
                    <div className="form-group">
                      <label>Sort Order</label>
                      <input type="number" name="sort_order" value={form.sort_order} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={form.description || ''} onChange={handleChange} rows={4} placeholder="Describe your responsibilities and achievements..." />
                  </div>
                  <div className="form-group">
                    <label>Achievements <span style={{fontSize:'0.75rem',color:'#64748b'}}>(one per line)</span></label>
                    <textarea name="achievements" value={form.achievements || ''} onChange={handleChange} rows={4} placeholder={`Built X using Y\nDelivered Z for client`} />
                  </div>
                  <label className="form-checkbox-row">
                    <input type="checkbox" name="is_current" checked={!!form.is_current} onChange={handleChange} />
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Currently working here</span>
                  </label>
                </div>
              </div>
              <div className="admin-modal__footer">
                <button type="button" className="btn btn-secondary" onClick={close}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : editing ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
