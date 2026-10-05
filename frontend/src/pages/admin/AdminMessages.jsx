import { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageSquare, Trash2, Eye, X, Mail, User, Clock, CheckCircle, Circle, Reply, Send, Loader } from 'lucide-react';

const API = 'http://localhost:8000/api';
const headers = () => ({ Authorization: `Bearer ${localStorage.getItem('admin_token')}` });

export default function AdminMessages() {
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);
  const [alert, setAlert]       = useState(null);

  // Reply modal state
  const [replyTarget, setReplyTarget] = useState(null); // message to reply to
  const [replyBody, setReplyBody]     = useState('');
  const [replySending, setReplySending] = useState(false);

  useEffect(() => { fetchMessages(); }, []);

  const fetchMessages = async () => {
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
      fetchMessages();
    } catch { showAlert('Delete failed.', 'error'); }
  };

  const openReply = (item) => {
    setReplyTarget(item);
    setReplyBody('');
    setSelected(null); // close read modal if open
  };

  const handleSendReply = async () => {
    if (!replyBody.trim()) return;
    setReplySending(true);
    try {
      await axios.post(
        `${API}/messages/${replyTarget.id}/reply`,
        { body: replyBody },
        { headers: headers() }
      );
      // mark as read in UI
      setItems(prev => prev.map(m => m.id === replyTarget.id ? { ...m, is_read: true } : m));
      showAlert(`Reply sent to ${replyTarget.email}!`);
      setReplyTarget(null);
      setReplyBody('');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to send reply. Check mail config.';
      showAlert(msg, 'error');
    } finally {
      setReplySending(false);
    }
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
                          <button className="btn btn-primary btn-sm btn-icon" onClick={() => openReply(item)} title="Reply"><Reply size={13} /></button>
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

      {/* ── Read modal ── */}
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
              <button className="btn btn-primary" onClick={() => openReply(selected)}><Reply size={14} /> Reply</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Reply modal ── */}
      {replyTarget && (
        <div className="admin-modal-backdrop" onClick={e => e.target === e.currentTarget && setReplyTarget(null)}>
          <div className="admin-modal admin-modal--wide">
            <div className="admin-modal__header">
              <h3><Reply size={16} /> Reply to {replyTarget.name}</h3>
              <button className="btn btn-secondary btn-sm btn-icon" onClick={() => setReplyTarget(null)}><X size={15} /></button>
            </div>

            <div className="admin-modal__body">
              {/* Thread preview */}
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                padding: '1rem 1.25rem',
                marginBottom: '1.25rem',
              }}>
                <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>
                  Original message from {replyTarget.name}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
                  <strong style={{ color: '#cbd5e1' }}>{replyTarget.subject}</strong>
                  <br />
                  {replyTarget.message}
                </div>
              </div>

              {/* To / Subject info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                <div className="msg-meta-row"><Mail size={13} /><strong>To:</strong> {replyTarget.email}</div>
                <div className="msg-meta-row"><MessageSquare size={13} /><strong>Subject:</strong> Re: {replyTarget.subject || 'Your message'}</div>
              </div>

              {/* Reply textarea */}
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.4rem' }}>
                Your Reply *
              </label>
              <textarea
                rows={8}
                value={replyBody}
                onChange={e => setReplyBody(e.target.value)}
                placeholder={`Hi ${replyTarget.name},\n\nThank you for reaching out...`}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  background: 'var(--admin-bg)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  color: '#e2e8f0',
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  resize: 'vertical',
                  outline: 'none',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => e.target.style.borderColor = '#d4af37'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            <div className="admin-modal__footer">
              <button className="btn btn-secondary" onClick={() => setReplyTarget(null)} disabled={replySending}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSendReply}
                disabled={replySending || !replyBody.trim()}
              >
                {replySending ? <><Loader size={14} className="admin-spin" /> Sending…</> : <><Send size={14} /> Send Reply</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
