import { useState, useEffect } from 'react';
import { Award, Plus, Pencil, Trash2, X, ExternalLink } from 'lucide-react';
import { certificationsApi } from '../../services/api';
const EMPTY = { name: '', organization: '', issue_date: '', expiry_date: '', credential_id: '', certificate_url: '', certificate_image: '', category: 'General', icon: '', sort_order: 0 };
const CATEGORIES = ['Frontend', 'Backend', 'AI / ML', 'DevOps', 'Design', 'IoT', 'QA / Testing', 'Quality Management', 'General'];

export default function AdminCertifications() {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal]     = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm]       = useState(EMPTY);
  const [alert, setAlert]     = useState(null);
  const [saving, setSaving]   = useState(false);

  useEffect(() => { fetch(); }, []);

  const fetch = async () => {
    try { const r = await certificationsApi.getAll(); setItems(r.data); }
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
      if (editing) await certificationsApi.update(editing.id, form);
      else         await certificationsApi.create(form);
      showAlert(editing ? 'Updated!' : 'Added!');
      close(); fetch();
    } catch { showAlert('Save failed.', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this certification?')) return;
    try { await certificationsApi.delete(id); showAlert('Deleted.'); fetch(); }
    catch { showAlert('Delete failed.', 'error'); }
  };

  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '—';

  return (
    <>
      <div className="admin-topbar">
        <div className="admin-topbar__title">
          <h1>Certifications</h1>
          <p>Manage my certificates and credentials</p>
        </div>
        <div className="admin-topbar__actions">
          <button className="btn btn-primary" onClick={openAdd}><Plus size={15} /> Add Certification</button>
        </div>
      </div>

      <div className="admin-page-body">
        {alert && <div className={`admin-alert admin-alert--${alert.type}`}>{alert.msg}</div>}
        <div className="admin-card">
          <div className="admin-card__header">
            <h3><Award size={16} /> Certifications ({items.length})</h3>
          </div>
          {loading ? (
            <div className="admin-loading"><div className="admin-spinner" /> Loading...</div>
          ) : items.length === 0 ? (
            <div className="admin-empty"><Award size={40} /><p>No certifications yet.</p></div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Certificate</th><th>Organization</th><th>Category</th><th>Issued</th><th>Credential ID</th><th>Verify</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '1.2rem' }}>{item.icon || '🏆'}</span>
                          <strong>{item.name}</strong>
                        </div>
                      </td>
                      <td>{item.organization}</td>
                      <td><span className="badge badge-purple">{item.category}</span></td>
                      <td style={{ color: '#64748b', fontSize: '0.8rem' }}>{fmtDate(item.issue_date)}</td>
                      <td style={{ color: '#64748b', fontSize: '0.78rem', fontFamily: 'monospace' }}>{item.credential_id || '—'}</td>
                      <td>
                        {item.certificate_url
                          ? <a href={item.certificate_url} target="_blank" rel="noreferrer" style={{ color: '#d4af37' }}><ExternalLink size={14} /></a>
                          : <span style={{ color: '#334155' }}>—</span>}
                      </td>
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
              <h3><Award size={16} /> {editing ? 'Edit Certification' : 'Add Certification'}</h3>
              <button className="btn btn-secondary btn-sm btn-icon" onClick={close}><X size={15} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="admin-modal__body">
                {alert && <div className={`admin-alert admin-alert--${alert.type}`}>{alert.msg}</div>}
                <div className="admin-form">
                  <div className="form-group">
                    <label>Certificate Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Introduction to the Internet of Things (IoT)" required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Organization *</label>
                      <input name="organization" value={form.organization} onChange={handleChange} placeholder="Alison" required />
                    </div>
                    <div className="form-group">
                      <label>Icon (emoji)</label>
                      <input name="icon" value={form.icon || ''} onChange={handleChange} placeholder="📡" />
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
                      <label>Issue Date</label>
                      <input type="date" name="issue_date" value={form.issue_date || ''} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Credential ID</label>
                      <input name="credential_id" value={form.credential_id || ''} onChange={handleChange} placeholder="1747-49967198" />
                    </div>
                    <div className="form-group">
                      <label>Expiry Date (optional)</label>
                      <input type="date" name="expiry_date" value={form.expiry_date || ''} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Certificate Image Path</label>
                    <input name="certificate_image" value={form.certificate_image || ''} onChange={handleChange} placeholder="/assets/certificates/cert-1.jpg" />
                  </div>
                  <div className="form-group">
                    <label>Verify URL</label>
                    <input type="url" name="certificate_url" value={form.certificate_url || ''} onChange={handleChange} placeholder="https://alison.com/certification/verify" />
                  </div>
                  <div className="form-group">
                    <label>Sort Order</label>
                    <input type="number" name="sort_order" value={form.sort_order} onChange={handleChange} />
                  </div>
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
