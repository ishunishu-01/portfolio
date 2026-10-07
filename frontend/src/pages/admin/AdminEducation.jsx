import { useState, useEffect } from 'react';
import { GraduationCap, Plus, Pencil, Trash2, X } from 'lucide-react';
import { educationApi } from '../../services/api';
const EMPTY = { institution: '', degree: '', field_of_study: '', start_date: '', end_date: '', is_current: false, grade: '', description: '', sort_order: 0 };

export default function AdminEducation() {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal]     = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm]       = useState(EMPTY);
  const [alert, setAlert]     = useState(null);
  const [saving, setSaving]   = useState(false);

  useEffect(() => { fetch(); }, []);

  const fetch = async () => {
    try { const r = await educationApi.getAll(); setItems(r.data); }
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
      if (editing) await educationApi.update(editing.id, form);
      else         await educationApi.create(form);
      showAlert(editing ? 'Updated!' : 'Added!');
      close(); fetch();
    } catch { showAlert('Save failed.', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this education entry?')) return;
    try { await educationApi.delete(id); showAlert('Deleted.'); fetch(); }
    catch { showAlert('Delete failed.', 'error'); }
  };

  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '';

  return (
    <>
      <div className="admin-topbar">
        <div className="admin-topbar__title">
          <h1>Education</h1>
          <p>Manage my education history</p>
        </div>
        <div className="admin-topbar__actions">
          <button className="btn btn-primary" onClick={openAdd}><Plus size={15} /> Add Education</button>
        </div>
      </div>

      <div className="admin-page-body">
        {alert && <div className={`admin-alert admin-alert--${alert.type}`}>{alert.msg}</div>}
        <div className="admin-card">
          <div className="admin-card__header">
            <h3><GraduationCap size={16} /> Education ({items.length})</h3>
          </div>
          {loading ? (
            <div className="admin-loading"><div className="admin-spinner" /> Loading...</div>
          ) : items.length === 0 ? (
            <div className="admin-empty"><GraduationCap size={40} /><p>No education entries yet.</p></div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Degree / Field</th><th>Institution</th><th>Duration</th><th>Grade</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.id}>
                      <td>
                        <strong>{item.degree}</strong>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.field_of_study}</div>
                      </td>
                      <td>{item.institution}</td>
                      <td style={{ color: '#64748b', fontSize: '0.8rem' }}>{fmtDate(item.start_date)} — {item.is_current ? 'Present' : fmtDate(item.end_date)}</td>
                      <td>{item.grade ? <span className="badge badge-gold">{item.grade}</span> : '—'}</td>
                      <td>{item.is_current ? <span className="badge badge-green">Ongoing</span> : <span className="badge badge-gray">Completed</span>}</td>
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
              <h3><GraduationCap size={16} /> {editing ? 'Edit Education' : 'Add Education'}</h3>
              <button className="btn btn-secondary btn-sm btn-icon" onClick={close}><X size={15} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="admin-modal__body">
                {alert && <div className={`admin-alert admin-alert--${alert.type}`}>{alert.msg}</div>}
                <div className="admin-form">
                  <div className="form-group">
                    <label>Institution *</label>
                    <input name="institution" value={form.institution} onChange={handleChange} placeholder="University of Colombo" required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Degree *</label>
                      <input name="degree" value={form.degree} onChange={handleChange} placeholder="BSc (Hons) Computer Science" required />
                    </div>
                    <div className="form-group">
                      <label>Field of Study</label>
                      <input name="field_of_study" value={form.field_of_study || ''} onChange={handleChange} placeholder="Software Engineering" />
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
                      <label>Grade / GPA</label>
                      <input name="grade" value={form.grade || ''} onChange={handleChange} placeholder="3.8 GPA / First Class" />
                    </div>
                    <div className="form-group">
                      <label>Sort Order</label>
                      <input type="number" name="sort_order" value={form.sort_order} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description / Activities</label>
                    <textarea name="description" value={form.description || ''} onChange={handleChange} rows={3} placeholder="Relevant coursework, clubs, thesis..." />
                  </div>
                  <label className="form-checkbox-row">
                    <input type="checkbox" name="is_current" checked={!!form.is_current} onChange={handleChange} />
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Currently studying here</span>
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
