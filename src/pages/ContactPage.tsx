import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { RoutePath } from '../types';
import { contactCompanies, companyCategories, contactFAQ } from '../data/contactData';
import {
  ArrowRight, Send, ChevronDown, Shield, AlertTriangle,
  Mail, MapPin, MessageSquare, Users, Headphones, Phone,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: RoutePath) => void;
}

const useInView = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
};

const SectionReveal: React.FC<{ children: React.ReactNode; delay?: number; style?: React.CSSProperties }> = ({ children, delay = 0, style }) => {
  const { ref, visible } = useInView(0.1);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return (
    <div ref={ref} style={{
      opacity: prefersReducedMotion || visible ? 1 : 0,
      transform: prefersReducedMotion || visible ? 'translateY(0)' : 'translateY(28px)',
      transition: prefersReducedMotion ? 'none' : `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
};

const deptIconMap: Record<string, LucideIcon> = { investment: Users, investor: Users, partnership: Users, press: Headphones, careers: Users, general: MessageSquare };

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string>('cristedor-group');
  const [selectedCategory, setSelectedCategory] = useState<string>('general');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '', email: '', org: '', subject: '', message: '', honeypot: '',
  });

  const categories = useMemo(() => companyCategories[selectedCompany] || companyCategories['cristedor-group'], [selectedCompany]);
  const activeCategory = useMemo(() => categories.find(c => c.id === selectedCategory) || categories[0], [categories, selectedCategory]);
  const activeCompany = useMemo(() => contactCompanies.find(c => c.id === selectedCompany) || contactCompanies[0], [selectedCompany]);

  const selectCompany = useCallback((id: string) => {
    setSelectedCompany(id);
    const cats = companyCategories[id] || companyCategories['cristedor-group'];
    setSelectedCategory(cats[cats.length - 1].id);
  }, []);

  const selectCategory = useCallback((id: string) => {
    setSelectedCategory(id);
  }, []);

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Valid email is required';
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot || !validate()) return;
    setFormSubmitted(true);
  };

  const resetForm = () => {
    setFormSubmitted(false);
    setFormData({ name: '', email: '', org: '', subject: '', message: '', honeypot: '' });
    setFormErrors({});
  };

  const btnPrimary = { display: 'inline-flex' as const, alignItems: 'center' as const, gap: '0.5rem', padding: '0.85rem 2rem', borderRadius: '12px', background: 'linear-gradient(135deg, #4F7CCF, #335EAA)', color: '#fff', fontSize: '0.9rem', fontWeight: 700, fontFamily: 'var(--font-body)', border: 'none', cursor: 'pointer' as const, boxShadow: '0 4px 20px rgba(79,124,207,0.3)', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)' };
  const btnGlass = { display: 'inline-flex' as const, alignItems: 'center' as const, gap: '0.5rem', padding: '0.85rem 2rem', borderRadius: '12px', background: 'rgba(17, 28, 46, 0.5)', backdropFilter: 'blur(12px)', color: '#fff', fontSize: '0.9rem', fontWeight: 600, fontFamily: 'var(--font-body)', border: '1px solid rgba(79, 124, 207, 0.2)', cursor: 'pointer' as const, transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)' };
  const hoverBtn = (e: React.MouseEvent<HTMLButtonElement>, up = true) => {
    if (up) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(79,124,207,0.4)'; }
    else { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(79,124,207,0.3)'; }
  };
  const hoverCard = (e: React.MouseEvent<HTMLDivElement>, color = 'rgba(79, 124, 207, 0.25)', enter = true) => {
    if (enter) { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.3)'; }
    else { e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.08)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }
  };
  const inputStyle = { width: '100%' as const, padding: '0.85rem 1rem', borderRadius: '10px', background: 'rgba(17, 28, 46, 0.6)', border: '1px solid rgba(79, 124, 207, 0.15)', color: '#fff', fontSize: '0.85rem', fontFamily: 'var(--font-body)', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' as const };
  const labelStyle = { display: 'block' as const, fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: '0.4rem' };

  return (
    <div style={{ backgroundColor: '#050914', minHeight: '100vh', position: 'relative' }}>
      <a href="#contact-main-content" style={{ position: 'absolute', top: '-100%', left: '50%', transform: 'translateX(-50%)', background: '#4F7CCF', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '0 0 8px 8px', fontWeight: 700, fontFamily: 'var(--font-body)', zIndex: 9999, transition: 'top 0.2s', textDecoration: 'none' }}
        onFocus={e => { e.currentTarget.style.top = '0'; }} onBlur={e => { e.currentTarget.style.top = '-100%'; }}>
        Skip to main content
      </a>

      {/* SEO Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact Cristedor Group', url: 'https://cristedor.com/contact', description: 'Get in touch with Cristedor Group for partnerships, press inquiries, or general questions.' },
        { '@context': 'https://schema.org', '@type': 'Organization', name: 'Cristedor Group', url: 'https://cristedor.com', contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: 'group.cristedor@gmail.com', telephone: '+233241430611', availableLanguage: ['English'] } },
        { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cristedor.com' }, { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://cristedor.com/contact' }] },
        { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: contactFAQ.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) },
      ])}} />

      {/* ═══ 1. HERO ═══ */}
      <section id="contact-main-content" tabIndex={-1} style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(5rem, 10vw, 8rem) 2rem clamp(3rem, 6vw, 4.5rem)' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,124,207,0.18) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '1rem' }}>{'\u2726'} GET IN TOUCH</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5.5vw, 4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.15, margin: 0, letterSpacing: '-0.02em' }}>
              Connect with{' '}
              <span style={{ background: 'linear-gradient(135deg, #4F7CCF 0%, #D4AF37 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Cristedor Group</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginTop: '1.5rem', maxWidth: '600px', margin: '1.5rem auto 0' }}>
              Have a question, proposal, partnership idea, or simply want to learn more about what we're building? Send us a message.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              <button onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })} style={btnPrimary} onMouseEnter={e => hoverBtn(e)} onMouseLeave={e => hoverBtn(e, false)}>
                Send an Enquiry <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <div className="contact-hero-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', maxWidth: '600px', margin: '3.5rem auto 0' }}>
            {[
              { value: 'Ghana-Based', color: '#3DDC97' },
              { value: 'Online-First', color: '#4F7CCF' },
              { value: 'Direct Enquiries', color: '#D4AF37' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.85rem, 1.5vw, 1rem)', fontWeight: 700, color: stat.color }}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to top, #050914, transparent)', pointerEvents: 'none' }} />
      </section>

      {/* ═══ 2. COMPANY & CATEGORY SELECTOR ═══ */}
      <section style={{ padding: 'clamp(2rem, 4vw, 3.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container">
          <SectionReveal>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CCF', marginBottom: '0.75rem' }}>{'\u2726'} SELECT COMPANY</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>Who Would You Like to Contact?</h2>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.05}>
            <div className="contact-company-grid" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1.5rem' }}>
              {contactCompanies.map(co => (
                <button key={co.id} type="button" onClick={() => selectCompany(co.id)}
                  style={{ padding: '0.5rem 1.1rem', borderRadius: '999px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 600, background: selectedCompany === co.id ? co.color : 'rgba(17, 28, 46, 0.5)', color: selectedCompany === co.id ? '#07080E' : 'var(--text-disabled)', border: `1px solid ${selectedCompany === co.id ? co.color : 'rgba(79, 124, 207, 0.15)'}`, cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
                  {co.name}
                </button>
              ))}
            </div>
            <div className="contact-company-select" style={{ display: 'none', position: 'relative', marginBottom: '1.5rem', maxWidth: '320px', margin: '0 auto 1.5rem' }}>
              <select value={selectedCompany} onChange={e => selectCompany(e.target.value)}
                style={{ width: '100%', padding: '0.7rem 2.5rem 0.7rem 1rem', borderRadius: '12px', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', fontWeight: 600, appearance: 'none', background: 'rgba(17, 28, 46, 0.6)', color: '#fff', border: `1px solid ${activeCompany.color}60`, cursor: 'pointer', backdropFilter: 'blur(12px)', outline: 'none', transition: 'border-color 0.2s' }}>
                {contactCompanies.map(co => (
                  <option key={co.id} value={co.id} style={{ background: '#111C2E', color: '#fff' }}>{co.name}</option>
                ))}
              </select>
              <ChevronDown size={16} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.5)', pointerEvents: 'none' }} />
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <div className="contact-category-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(categories.length, 5)}, 1fr)`, gap: '0.75rem' }}>
              {categories.map((cat) => {
                const Icon = deptIconMap[cat.id] || MessageSquare;
                return (
                  <div key={cat.id} onClick={() => selectCategory(cat.id)}
                    style={{ padding: '1.25rem', borderRadius: '14px', background: selectedCategory === cat.id ? `${cat.color}10` : 'rgba(17, 28, 46, 0.3)', border: `1px solid ${selectedCategory === cat.id ? cat.color + '40' : 'rgba(79, 124, 207, 0.08)'}`, cursor: 'pointer', transition: 'all 0.25s', textAlign: 'center' }}
                    onMouseEnter={e => hoverCard(e, `${cat.color}30`)} onMouseLeave={e => hoverCard(e)}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.6rem' }}>
                      <Icon size={18} color={cat.color} />
                    </div>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: '0.2rem' }}>{cat.label}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.4 }}>{cat.description}</p>
                  </div>
                );
              })}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══ 3. CONTACT FORM + SIDEBAR ═══ */}
      <section id="contact-form" style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)', scrollMarginTop: '80px' }}>
        <div className="container">
          {formSubmitted ? (
            <SectionReveal>
              <div style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem', borderRadius: '16px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', textAlign: 'center' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Enquiry Noted</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem', maxWidth: '440px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
                  Thank you, {formData.name}. Cristedor Group does not currently have a backend contact system. To ensure your message is received, please send it directly to <a href="mailto:group.cristedor@gmail.com" style={{ color: '#4F7CCF', textDecoration: 'underline' }}>group.cristedor@gmail.com</a> with the same details.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={() => onNavigate('/')} style={{ ...btnPrimary, padding: '0.75rem 1.5rem', fontSize: '0.85rem' }} onMouseEnter={e => hoverBtn(e)} onMouseLeave={e => hoverBtn(e, false)}>
                    Return Home <ArrowRight size={14} />
                  </button>
                  <button onClick={resetForm} style={{ ...btnGlass, padding: '0.75rem 1.5rem', fontSize: '0.85rem' }} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(17, 28, 46, 0.7)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(17, 28, 46, 0.5)'; }}>
                    Submit Another
                  </button>
                </div>
              </div>
            </SectionReveal>
          ) : (
            <>
              <SectionReveal>
                <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '0.75rem' }}>{'\u2726'} MESSAGE</p>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>Send a Message</h2>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.75rem' }}>
                    Contacting: <span style={{ color: activeCompany.color, fontWeight: 600 }}>{activeCompany.name}</span> — <span style={{ color: activeCategory?.color }}>{activeCategory?.label}</span>
                  </p>
                </div>
              </SectionReveal>
              <div className="contact-form-layout" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
                <SectionReveal delay={0.1}>
                  <form onSubmit={handleFormSubmit} noValidate style={{ padding: '2rem', borderRadius: '16px', background: 'rgba(17, 28, 46, 0.4)', border: '1px solid rgba(79, 124, 207, 0.12)' }}>
                    <div className="contact-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={labelStyle}>Full Name *</label>
                        <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Your name"
                          aria-describedby={formErrors.name ? 'err-name' : undefined} aria-invalid={!!formErrors.name}
                          style={{ ...inputStyle, borderColor: formErrors.name ? '#FF5C72' : 'rgba(79, 124, 207, 0.15)' }}
                          onFocus={e => { e.currentTarget.style.borderColor = formErrors.name ? '#FF5C72' : 'rgba(79, 124, 207, 0.4)'; }} onBlur={e => { e.currentTarget.style.borderColor = formErrors.name ? '#FF5C72' : 'rgba(79, 124, 207, 0.15)'; }} />
                        {formErrors.name && <p id="err-name" role="alert" style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: '#FF5C72', marginTop: '0.3rem' }}>{formErrors.name}</p>}
                      </div>
                      <div>
                        <label style={labelStyle}>Email Address *</label>
                        <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="you@example.com"
                          aria-describedby={formErrors.email ? 'err-email' : undefined} aria-invalid={!!formErrors.email}
                          style={{ ...inputStyle, borderColor: formErrors.email ? '#FF5C72' : 'rgba(79, 124, 207, 0.15)' }}
                          onFocus={e => { e.currentTarget.style.borderColor = formErrors.email ? '#FF5C72' : 'rgba(79, 124, 207, 0.4)'; }} onBlur={e => { e.currentTarget.style.borderColor = formErrors.email ? '#FF5C72' : 'rgba(79, 124, 207, 0.15)'; }} />
                        {formErrors.email && <p id="err-email" role="alert" style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: '#FF5C72', marginTop: '0.3rem' }}>{formErrors.email}</p>}
                      </div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={labelStyle}>Organisation</label>
                      <input type="text" value={formData.org} onChange={e => setFormData({ ...formData, org: e.target.value })} placeholder="Your organisation (optional)"
                        style={inputStyle} onFocus={e => { e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.4)'; }} onBlur={e => { e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.15)'; }} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={labelStyle}>Subject *</label>
                      <input type="text" required value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} placeholder="How can we help?"
                        aria-describedby={formErrors.subject ? 'err-subject' : undefined} aria-invalid={!!formErrors.subject}
                        style={{ ...inputStyle, borderColor: formErrors.subject ? '#FF5C72' : 'rgba(79, 124, 207, 0.15)' }}
                        onFocus={e => { e.currentTarget.style.borderColor = formErrors.subject ? '#FF5C72' : 'rgba(79, 124, 207, 0.4)'; }} onBlur={e => { e.currentTarget.style.borderColor = formErrors.subject ? '#FF5C72' : 'rgba(79, 124, 207, 0.15)'; }} />
                      {formErrors.subject && <p id="err-subject" role="alert" style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: '#FF5C72', marginTop: '0.3rem' }}>{formErrors.subject}</p>}
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={labelStyle}>Message *</label>
                      <textarea required rows={5} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="Please provide details regarding your inquiry..."
                        aria-describedby={formErrors.message ? 'err-message' : undefined} aria-invalid={!!formErrors.message}
                        style={{ ...inputStyle, resize: 'vertical' as const, borderColor: formErrors.message ? '#FF5C72' : 'rgba(79, 124, 207, 0.15)' }}
                        onFocus={e => { e.currentTarget.style.borderColor = formErrors.message ? '#FF5C72' : 'rgba(79, 124, 207, 0.4)'; }} onBlur={e => { e.currentTarget.style.borderColor = formErrors.message ? '#FF5C72' : 'rgba(79, 124, 207, 0.15)'; }} />
                      {formErrors.message && <p id="err-message" role="alert" style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: '#FF5C72', marginTop: '0.3rem' }}>{formErrors.message}</p>}
                    </div>
                    <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
                      <input type="text" tabIndex={-1} autoComplete="off" value={formData.honeypot} onChange={e => setFormData({ ...formData, honeypot: e.target.value })} />
                    </div>
                    <div style={{ marginBottom: '1rem', padding: '0.875rem 1rem', borderRadius: '10px', background: 'rgba(17, 28, 46, 0.3)', border: '1px solid rgba(79, 124, 207, 0.06)' }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, margin: 0 }}>
                        Information submitted through this form is used to respond to your enquiry. Please avoid sending sensitive personal or financial information. {' '}
                        <a href="/privacy" onClick={e => { e.preventDefault(); onNavigate('/privacy'); }} style={{ color: '#4F7CCF', textDecoration: 'underline' }}>Privacy Policy</a>.
                      </p>
                    </div>
                    <button type="submit" style={{ ...btnPrimary, width: '100%', justifyContent: 'center' }} onMouseEnter={e => hoverBtn(e)} onMouseLeave={e => hoverBtn(e, false)}>
                      Send Enquiry <Send size={16} />
                    </button>
                  </form>
                </SectionReveal>

                <SectionReveal delay={0.2}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ padding: '1.5rem', borderRadius: '14px', background: 'rgba(17, 28, 46, 0.35)', border: '1px solid rgba(79, 124, 207, 0.08)' }}>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.92rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>How to Reach Us</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Mail size={14} color="#4F7CCF" />
                          <a href="mailto:group.cristedor@gmail.com" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
                            onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline'; }}
                            onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none'; }}>group.cristedor@gmail.com</a>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Phone size={14} color="#4F7CCF" />
                          <a href="tel:+233241430611" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
                            onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline'; }}
                            onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none'; }}>+233 24 143 0611</a>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Phone size={14} color="#4F7CCF" />
                          <a href="tel:+233201769552" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
                            onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline'; }}
                            onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none'; }}>+233 20 176 9552</a>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <MapPin size={14} color="#4F7CCF" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>Ghana — Online-First</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'rgba(17, 28, 46, 0.35)', border: '1px solid rgba(79, 124, 207, 0.08)' }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, margin: 0 }}>
                        Response times vary depending on the enquiry. We aim to respond to genuine enquiries as soon as reasonably possible.
                      </p>
                    </div>
                  </div>
                </SectionReveal>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ═══ 4. LOCATION ═══ */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <SectionReveal>
            <div style={{ padding: '2rem', borderRadius: '16px', background: 'rgba(17, 28, 46, 0.4)', border: '1px solid rgba(79, 124, 207, 0.12)', textAlign: 'center' }}>
              <MapPin size={28} color="#4F7CCF" style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Ghana</h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-disabled)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>Online-First Operations</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                Cristedor Group is being built in Ghana and currently operates online. This is where we are today.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══ 5. SECURITY & RESPONSIBLE DISCLOSURE ═══ */}
      <section style={{ padding: 'clamp(2rem, 4vw, 3rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <SectionReveal>
            <div style={{ padding: '1.75rem', borderRadius: '16px', background: 'rgba(245, 158, 11, 0.04)', border: '1px solid rgba(245, 158, 11, 0.12)', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Shield size={22} color="#F59E0B" />
              </div>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>Security & Responsible Disclosure</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-disabled)', lineHeight: 1.6 }}>
                  If you believe you have identified a security issue affecting a Cristedor website or service, please contact us through the official Contact page and clearly indicate that your message concerns a security issue.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══ 6. FAQ ═══ */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container" style={{ maxWidth: '740px' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CCF', marginBottom: '0.75rem' }}>{'\u2726'} FAQ</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Frequently Asked Questions</h2>
            </div>
          </SectionReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {contactFAQ.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <SectionReveal key={i} delay={i * 0.06}>
                  <div style={{ borderRadius: '12px', background: isOpen ? 'rgba(17, 28, 46, 0.6)' : 'rgba(17, 28, 46, 0.3)', border: `1px solid ${isOpen ? 'rgba(79, 124, 207, 0.25)' : 'rgba(79, 124, 207, 0.08)'}`, overflow: 'hidden', transition: 'all 0.3s' }}>
                    <button onClick={() => setOpenFaq(isOpen ? null : i)} aria-expanded={isOpen} aria-controls={`contact-faq-${i}`}
                      style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.1rem 1.25rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 600, color: '#fff', paddingRight: '1rem' }}>{faq.question}</span>
                      <ChevronDown size={18} style={{ color: 'rgba(255,255,255,0.35)', flexShrink: 0, transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                    </button>
                    <div id={`contact-faq-${i}`} role="region" aria-hidden={!isOpen} style={{ maxHeight: isOpen ? '200px' : 0, overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-disabled)', lineHeight: 1.65, padding: '0 1.25rem 1.1rem' }}>{faq.answer}</p>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 7. CTA FOOTER ═══ */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(3rem, 6vw, 5rem) 2rem' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(79,124,207,0.08) 0%, rgba(212,175,55,0.05) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,124,207,0.18) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <SectionReveal>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '1rem' }}>Have a Question or Want to Learn More?</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.88rem, 1.3vw, 1rem)', color: 'var(--text-disabled)', lineHeight: 1.65, maxWidth: '550px', margin: '0 auto 2rem' }}>Send us a message and we'll review your enquiry.</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })} style={btnPrimary} onMouseEnter={e => hoverBtn(e)} onMouseLeave={e => hoverBtn(e, false)}>
                Send an Enquiry <ArrowRight size={16} />
              </button>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══ 8. DISCLAIMER ═══ */}
      <section style={{ padding: '2rem', borderTop: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem 1.25rem', borderRadius: '12px', background: 'rgba(17, 28, 46, 0.3)', border: '1px solid rgba(79, 124, 207, 0.06)' }}>
            <AlertTriangle size={16} color="rgba(255,255,255,0.25)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.6 }}>
              Cristedor Group is a private company. Information provided through this website is for general informational purposes and does not constitute an offer or solicitation relating to securities.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ RESPONSIVE CSS ═══ */}
      <style>{`
        @media (max-width: 900px) {
          .contact-form-layout { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .contact-category-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .contact-form-grid { grid-template-columns: 1fr !important; }
          .contact-category-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .contact-hero-stats { gap: 0.75rem !important; }
          .contact-category-grid { grid-template-columns: 1fr !important; }
          .contact-company-grid { display: none !important; }
          .contact-company-select { display: block !important; }
        }
        @media (max-width: 480px) {
          .contact-hero-stats { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
        *:focus-visible { outline: 2px solid #4F7CCF; outline-offset: 2px; border-radius: 4px; }
      `}</style>
    </div>
  );
};
