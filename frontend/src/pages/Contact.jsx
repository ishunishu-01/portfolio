import { useState } from 'react';
import {
  Mail, MapPin, Phone,
  Send, CheckCircle, AlertCircle, Loader, MessageCircle
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import { messagesApi } from '../services/api';
import './Contact.css';

const contactInfo = [
  { icon: Mail,        label: 'Email',    value: 'ictishara076@gmail.com',  href: 'mailto:ictishara076@gmail.com' },
  { icon: MapPin,      label: 'Location', value: 'Sri Lanka',           href: null },
  { icon: GithubIcon,  label: 'GitHub',   value: 'github.com/ishunishu-01', href: 'https://github.com/ishunishu-01' },
  { icon: LinkedinIcon,label: 'LinkedIn', value: 'https://www.linkedin.com/in/ishara-nishshanka', href: 'https://www.linkedin.com/in/ishara-nishshanka-06831a356?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
];

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.trim())   e.email   = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setStatus('loading');
    try {
      await messagesApi.send({
        name:    form.name,
        email:   form.email,
        subject: form.subject,
        message: form.message,
      });
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <main style={{ paddingTop: '5rem' }}>
      <section className="section">
        <div className="container">
          {/* Header */}
          <div className="section-header">
            <div className="section-badge"><MessageCircle size={12} /> Get In Touch</div>
            <h1 className="section-title">Contact <span>Me</span></h1>
            <p className="section-subtitle">
              Have a project in mind or want to collaborate? I'd love to hear from you!
            </p>
            <div className="divider" />
          </div>

          <div className="contact-grid">
            {/* Left — info panel */}
            <div className="contact-info">
              <div className="contact-info__header card">
                <h2 className="contact-info__title">Let's Work Together</h2>
                <p className="contact-info__sub">
                  Whether it's a freelance project, job opportunity, or just a conversation —
                  my inbox is always open.
                </p>
              </div>

              <div className="contact-info__items">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div className="contact-info-item card" key={label}>
                    <div className="contact-info-item__icon">
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="contact-info-item__label">{label}</div>
                      {href ? (
                        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                          className="contact-info-item__value">
                          {value}
                        </a>
                      ) : (
                        <span className="contact-info-item__value">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="contact-form-wrap card">
              <h2 className="contact-form-title">Send Me a Message</h2>

              {status === 'success' ? (
                <div className="contact-success">
                  <CheckCircle size={48} color="var(--gold-400)" />
                  <h3>Message Sent! 🎉</h3>
                  <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
                  <button className="btn btn-primary" onClick={() => setStatus(null)}>
                    Send Another
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="contact-form__row">
                    <div className="contact-form__field">
                      <label htmlFor="contact-name" className="field-label">Full Name *</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        className={`input ${errors.name ? 'input--error' : ''}`}
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                      />
                      {errors.name && <span className="field-error">{errors.name}</span>}
                    </div>

                    <div className="contact-form__field">
                      <label htmlFor="contact-email" className="field-label">Email Address *</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        className={`input ${errors.email ? 'input--error' : ''}`}
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                      />
                      {errors.email && <span className="field-error">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="contact-form__field">
                    <label htmlFor="contact-subject" className="field-label">Subject *</label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      className={`input ${errors.subject ? 'input--error' : ''}`}
                      placeholder="What's this about?"
                      value={form.subject}
                      onChange={handleChange}
                    />
                    {errors.subject && <span className="field-error">{errors.subject}</span>}
                  </div>

                  <div className="contact-form__field">
                    <label htmlFor="contact-message" className="field-label">Message *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={6}
                      className={`input ${errors.message ? 'input--error' : ''}`}
                      placeholder="Tell me about your project or idea..."
                      value={form.message}
                      onChange={handleChange}
                      style={{ resize: 'vertical', lineHeight: '1.6' }}
                    />
                    {errors.message && <span className="field-error">{errors.message}</span>}
                  </div>

                  {status === 'error' && (
                    <div className="contact-form__alert">
                      <AlertCircle size={16} />
                      Something went wrong. Please try again or email me directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    id="contact-submit"
                    disabled={status === 'loading'}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {status === 'loading' ? (
                      <><Loader size={16} className="contact-spin" /> Sending...</>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
