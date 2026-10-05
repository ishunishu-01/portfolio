import { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageSquare, Trash2, Eye, X, Mail, User, Clock, CheckCircle, Circle } from 'lucide-react';

const API = 'http://localhost:8000/api';
const headers = () => ({ Authorization: `Bearer ${localStorage.getItem('admin_token')}` });

export default function AdminMessages() {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [alert, setAlert]     = useState(null);

  useEffect(() => { fetch(); }, []);

  const fetch = async () => {
    try { const r = await axios.get(`${API}/messages`, { headers: headers() }); setItems(r.data); }
    catch { showAlert('Failed to load messages.', 'error'); }
    finally { setLoading(false); }
  };

  const showAlert = (msg, type = 'success') => { setAlert({ msg, type }); setTimeout(() => setAlert(null), 3500); };

  const handleRead = async (item) => {
    setSelected(item);
    if (!item.is_read) {
      try {
        await axios.put(`${API}/messages/${item.id}`, { is_read: true }, { headers: headers() });
        setItems(prev => prev.map(m => m.id === item.id ? { ...m, is_read: true } : m));
      } catch {}
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await axios.delete(`${API}/messages/${id}`, { headers: headers() });
      showAlert('Message deleted.');
      if (selected?.id === id) setSelected(null);
      fetch();
    } catch { showAlert('Delete failed.', 'error'); }
  };

  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';
  const unread = items.filter(m => !m.is_read).length;

  return (
    <>
      <div className="admin-topbar">
        <div className="admin-topbar__title">
          <h1>Messages</h1>
          <p>Contact form submissions from visitors</p>
        </div>
        <div className="admin-topbar__actions">
          {unread > 0 && <span className="badge badge-red">{unread} unread</span>}
        </div>
      </div>

      <div className="admin-page-body">
        {alert && <div className={`admin-alert admin-alert--${alert.type}`}>{alert.msg}</div>}
        <div className="admin-card">
          <div className="admin-card__header">
            <h3><MessageSquare size={16} /> Inbox ({items.length})</h3>
          </div>
          {loading ? (
            <div className="admin-loading"><div className="admin-spinner" /> Loading...</div>
          ) : items.length === 0 ? (
            <div className="admin-empty"><MessageSquare size={40} /><p>No messages yet.</p></div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th></th><th>From</th><th>Subject / Message</th><th>Received</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.id} style={{ opacity: item.is_read ? 0.7 : 1 }}>
                      <td style={{ width: 24 }}>
                        {item.is_read
                          ? <CheckCircle size={14} color="#4ade80" />
                          : <Circle size={14} color="#d4af37" fill="#d4af37" />}
                      </td>
                      <td>
                        <strong style={{ fontSize: '0.85rem' }}>{item.name}</strong>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.email}</div>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                          {item.subject && <strong style={{ color: '#f1f5f9' }}>{item.subject} — </strong>}
                          {(item.message || '').slice(0, 80)}{(item.message || '').length > 80 ? '…' : ''}
                        </span>
                      </td>
                      <td style={{ color: '#64748b', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{fmtDate(item.created_at)}</td>
                      <td>
                        <div className="td-actions">
                          <button className="btn btn-secondary btn-sm btn-icon" onClick={() => handleRead(item)} title="Read"><Eye size={13} /></button>
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

      {/* Read modal */}
      {selected && (
        <div className="admin-modal-backdrop" onClick={e => e.target === e.currentTarget && setSelected(null)}>
          <div className="admin-modal admin-modal--wide">
            <div className="admin-modal__header">
              <h3><Mail size={16} /> Message from {selected.name}</h3>
              <button className="btn btn-secondary btn-sm btn-icon" onClick={() => setSelected(null)}><X size={15} /></button>
            </div>
            <div className="admin-modal__body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <div className="msg-meta-row"><User size={13} /><strong>Name:</strong> {selected.name}</div>
                <div className="msg-meta-row"><Mail size={13} /><strong>Email:</strong> <a href={`mailto:${selected.email}`} style={{color:'#d4af37'}}>{selected.email}</a></div>
                {selected.subject && <div className="msg-meta-row"><MessageSquare size={13} /><strong>Subject:</strong> {selected.subject}</div>}
                <div className="msg-meta-row"><Clock size={13} /><strong>Received:</strong> {fmtDate(selected.created_at)}</div>
              </div>
              <div className="msg-detail">{selected.message}</div>
            </div>
            <div className="admin-modal__footer">
              <button className="btn btn-danger" onClick={() => handleDelete(selected.id)}><Trash2 size={14} /> Delete</button>
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || 'Your message'}`} className="btn btn-primary"><Mail size={14} /> Reply via Email</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
