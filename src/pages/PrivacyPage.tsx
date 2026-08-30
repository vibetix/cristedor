import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RoutePath } from '../types';
import {
  trustBadges, privacyPrinciples,
  weCollect, weNeverCollect, processingUses, privacyRights,
  securityMeasures, incidentProcess, localStores,
  childrenPrivacy, contactOptions,
  versionHistory, sectionNav, relatedLegalPages
} from '../data/privacyData';
import {
  Shield, Lock, Eye, CheckCircle, Trash2, Pencil, PauseCircle,
  Download, Ban, Mail, Scale, ChevronDown, ArrowRight,
  FileText, Globe, Printer, ChevronRight, ChevronUp, Smartphone,
  MessageSquare, Server, User, Key, Search, Bell, Minimize2
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface PrivacyPageProps {
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

const iconMap: Record<string, LucideIcon> = {
  Shield, Lock, Eye, CheckCircle, Trash2, Pencil, PauseCircle,
  Download, Ban, Mail, Scale, ChevronDown, ArrowRight, FileText,
  Globe, ChevronRight, ChevronUp, Smartphone, MessageSquare,
  Server, User, Key, Search, Bell, Minimize2
};

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState('principles');
  const [openProcessing, setOpenProcessing] = useState<number | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToSection = useCallback((id: string) => {
    const el = sectionRefs.current[id];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    Object.values(sectionRefs.current).forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const setSectionRef = useCallback((id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  }, []);

  const handlePrint = () => window.print();

  const sectionLabel = (label: string) => (
    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CCF', marginBottom: '0.75rem' }}>{'\u2726'} {label}</p>
  );
  const sectionNumber = (num: string) => (
    <span aria-hidden="true" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: 'rgba(79,124,207,0.12)', lineHeight: 1, display: 'block', marginBottom: '0.5rem' }}>{num}</span>
  );

  return (
    <div style={{ backgroundColor: '#050914', minHeight: '100vh', color: '#fff' }}>

      {/* ═══ SEO SCHEMA ═══ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'PrivacyPolicy',
        name: 'Privacy Policy', description: 'Cristedor Group privacy policy covering the small amount of data we handle and your rights.',
        datePublished: '2026', dateModified: '2026', version: '1.0',
        publisher: { '@type': 'Organization', name: 'Cristedor Group', url: 'https://cristedor.com' },
        url: 'https://cristedor.com/privacy'
      })}} />

      {/* ═══ 1. HERO ═══ */}
      <section role="banner" style={{ position: 'relative', minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', padding: '8rem 2rem 3rem', borderBottom: '1px solid rgba(79,124,207,0.08)' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} aria-hidden="true">
          <div style={{ position: 'absolute', top: '15%', left: '10%', width: '500px', height: '500px', background: 'rgba(79,124,207,0.12)', borderRadius: '50%', filter: 'blur(160px)' }} />
          <div style={{ position: 'absolute', top: '30%', right: '10%', width: '400px', height: '400px', background: 'rgba(51,94,170,0.10)', borderRadius: '50%', filter: 'blur(140px)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '80rem', margin: '0 auto', width: '100%' }}>
          <SectionReveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CCF' }}>{'\u2726'} PRIVACY</span>
              <span aria-hidden="true" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4F7CCF', animation: 'privacyPulse 2s ease-in-out infinite' }} />
            </div>
          </SectionReveal>
          <SectionReveal delay={0.05}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1.25rem', maxWidth: '640px' }}>
              Privacy Policy
            </h1>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '620px', marginBottom: '1.25rem' }}>
              We are an early-stage company and hold very little data. This policy explains the small amount of information our website stores and how you can reach us.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.12}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Shield size={13} color="var(--text-disabled)" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-disabled)' }}>Version 1.0 &middot; 2026</span>
              </div>
              <button onClick={handlePrint} aria-label="Print privacy policy" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.7rem', borderRadius: '8px', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 500, background: 'rgba(17,28,46,0.5)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(79,124,207,0.18)', cursor: 'pointer', transition: 'all 0.2s' }}>
                <Printer size={12} /> Print
              </button>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.16}>
            <nav className="privacy-quick-nav" aria-label="Section navigation" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {sectionNav.map(s => (
                <button key={s.id} onClick={() => scrollToSection(s.id)}
                  aria-label={`Jump to section ${s.number}: ${s.label}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.85rem', borderRadius: '999px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 600, background: activeSection === s.id ? 'rgba(79,124,207,0.15)' : 'rgba(17,28,46,0.5)', color: activeSection === s.id ? '#4F7CCF' : 'rgba(255,255,255,0.4)', border: `1px solid ${activeSection === s.id ? 'rgba(79,124,207,0.4)' : 'rgba(79,124,207,0.18)'}`, cursor: 'pointer', transition: 'all 0.25s', whiteSpace: 'nowrap' }}>
                  <span aria-hidden="true" style={{ opacity: 0.5 }}>{s.number}</span> {s.label}
                </button>
              ))}
            </nav>
          </SectionReveal>
        </div>
      </section>

      {/* ═══ 2. ONE-LINE COMMITMENTS ═══ */}
      <section aria-label="Privacy commitments" style={{ padding: '2rem 0', borderBottom: '1px solid rgba(79,124,207,0.08)' }}>
        <div className="container">
          <SectionReveal>
            <div role="list" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', padding: '1.25rem 2rem', borderRadius: '12px', background: 'rgba(17,28,46,0.4)', border: '1px solid rgba(79,124,207,0.18)', backdropFilter: 'blur(12px)', flexWrap: 'wrap' }}>
              {trustBadges.map((b, i) => {
                const Icon = iconMap[b.icon] || Shield;
                return (
                  <div key={i} role="listitem" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Icon size={16} color={b.color} aria-hidden="true" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>{b.label}</span>
                  </div>
                );
              })}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══ MOBILE TOC ═══ */}
      <section className="privacy-mobile-toc" aria-label="Section navigation" style={{ display: 'none', padding: '1.25rem 0', borderBottom: '1px solid rgba(79,124,207,0.08)' }}>
        <div className="container">
          <div role="list" style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
            {sectionNav.map(s => (
              <button key={s.id} onClick={() => scrollToSection(s.id)} role="listitem"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.75rem', borderRadius: '999px', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: 600, background: activeSection === s.id ? 'rgba(79,124,207,0.15)' : 'rgba(17,28,46,0.5)', color: activeSection === s.id ? '#4F7CCF' : 'rgba(255,255,255,0.4)', border: `1px solid ${activeSection === s.id ? 'rgba(79,124,207,0.4)' : 'rgba(79,124,207,0.18)'}`, cursor: 'pointer', transition: 'all 0.25s', whiteSpace: 'nowrap', flexShrink: 0 }}>
                {s.number} {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MAIN LAYOUT ═══ */}
      <div style={{ display: 'flex', maxWidth: '80rem', margin: '0 auto', position: 'relative' }}>

        {/* DESKTOP SIDEBAR */}
        <aside className="privacy-sidebar" aria-label="Table of contents" style={{ width: '240px', flexShrink: 0, display: 'none' }}>
          <div style={{ position: 'sticky', top: '100px', padding: '2rem 1.5rem 2rem 0' }}>
            <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'rgba(17,28,46,0.4)', border: '1px solid rgba(79,124,207,0.18)', backdropFilter: 'blur(12px)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-disabled)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>On this page</p>
              {sectionNav.map(s => (
                <button key={s.id} onClick={() => scrollToSection(s.id)}
                  aria-label={`Navigate to ${s.label}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', fontSize: '0.78rem', fontFamily: 'var(--font-body)', fontWeight: 500, background: activeSection === s.id ? 'rgba(79,124,207,0.12)' : 'transparent', color: activeSection === s.id ? '#4F7CCF' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', marginBottom: '2px' }}>
                  <span aria-hidden="true" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', opacity: 0.5, minWidth: '18px' }}>{s.number}</span>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ═══ CONTENT ═══ */}
        <main style={{ flex: 1, minWidth: 0 }} role="main" aria-label="Privacy policy content">

          {/* ═══ SECTION 01 — PRINCIPLES ═══ */}
          <section id="principles" ref={setSectionRef('principles')} aria-labelledby="principles-title" style={{ padding: 'clamp(3rem, 6vw, 5rem) 2rem', borderBottom: '1px solid rgba(79,124,207,0.08)' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <SectionReveal>
                {sectionNumber('01')}
                {sectionLabel('OUR PRINCIPLES')}
                <h2 id="principles-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '1rem' }}>Our Privacy Principles</h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '700px', marginBottom: '2.5rem' }}>
                  Because Cristedor Group is early-stage, the simplest way to protect your privacy is to collect almost nothing in the first place. These principles guide how we operate.
                </p>
              </SectionReveal>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                {privacyPrinciples.map((p, i) => {
                  const Icon = iconMap[p.icon] || Shield;
                  return (
                    <SectionReveal key={i} delay={i * 0.04}>
                      <div style={{ padding: '1.35rem', borderRadius: '14px', background: 'rgba(17,28,46,0.4)', border: '1px solid rgba(79,124,207,0.18)', textAlign: 'center', transition: 'border-color 0.25s, transform 0.25s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = p.color + '40'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(79,124,207,0.18)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${p.color}12`, border: `1px solid ${p.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
                          <Icon size={18} color={p.color} aria-hidden="true" />
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 600, color: '#fff', marginBottom: '0.4rem' }}>{p.title}</h3>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--text-disabled)', lineHeight: 1.5 }}>{p.description}</p>
                      </div>
                    </SectionReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══ SECTION 02 — DATA WE HANDLE ═══ */}
          <section id="data" ref={setSectionRef('data')} aria-labelledby="data-title" style={{ padding: 'clamp(3rem, 6vw, 5rem) 2rem', borderBottom: '1px solid rgba(79,124,207,0.08)' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <SectionReveal>
                {sectionNumber('02')}
                {sectionLabel('DATA WE HANDLE')}
                <h2 id="data-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '1rem' }}>What We Collect (and What We Don't)</h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '700px', marginBottom: '2.5rem' }}>
                  Our website is informational and static. We do not create accounts, accept payments, or run analytics, so there is very little data for us to hold.
                </p>
              </SectionReveal>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <SectionReveal delay={0.05}>
                  <div style={{ padding: '1.5rem', borderRadius: '14px', background: 'rgba(17,28,46,0.4)', border: '1px solid rgba(61,220,151,0.15)', borderLeft: '3px solid #3DDC97', backdropFilter: 'blur(12px)', height: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                      <CheckCircle size={16} color="#3DDC97" aria-hidden="true" />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 600, color: '#3DDC97', textTransform: 'uppercase', letterSpacing: '0.08em' }}>We Collect</span>
                    </div>
                    {weCollect.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.9rem' }}>
                        <CheckCircle size={13} color="#3DDC97" style={{ marginTop: '3px', flexShrink: 0 }} aria-hidden="true" />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </SectionReveal>
                <SectionReveal delay={0.1}>
                  <div style={{ padding: '1.5rem', borderRadius: '14px', background: 'rgba(17,28,46,0.4)', border: '1px solid rgba(255,92,114,0.15)', borderLeft: '3px solid #FF5C72', backdropFilter: 'blur(12px)', height: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                      <Ban size={16} color="#FF5C72" aria-hidden="true" />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 600, color: '#FF5C72', textTransform: 'uppercase', letterSpacing: '0.08em' }}>We Never Collect</span>
                    </div>
                    {weNeverCollect.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.9rem' }}>
                        <Ban size={13} color="#FF5C72" style={{ marginTop: '3px', flexShrink: 0 }} aria-hidden="true" />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </SectionReveal>
              </div>
              <SectionReveal delay={0.15}>
                <div style={{ padding: '1.5rem', borderRadius: '14px', background: 'rgba(79,124,207,0.06)', border: '1px solid rgba(79,124,207,0.15)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <Shield size={16} color="#4F7CCF" aria-hidden="true" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600, color: '#4F7CCF' }}>Our Commitment</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                    Cristedor Group does not sell your personal data, and we rely on no revenue from data monetisation. If our products later add accounts or other features, we will update this policy before doing so.
                  </p>
                </div>
              </SectionReveal>
            </div>
          </section>

          {/* ═══ SECTION 03 — LOCAL STORAGE ═══ */}
          <section id="local-storage" ref={setSectionRef('local-storage')} aria-labelledby="localstorage-title" style={{ padding: 'clamp(3rem, 6vw, 5rem) 2rem', borderBottom: '1px solid rgba(79,124,207,0.08)' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <SectionReveal>
                {sectionNumber('03')}
                {sectionLabel('LOCAL STORAGE')}
                <h2 id="localstorage-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '1rem' }}>What We Store on Your Device</h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '700px', marginBottom: '2rem' }}>
                  Our site does not set cookies and does not run advertising or analytics trackers. We only store a few small preferences in your browser's local storage, which never leave your device.
                </p>
              </SectionReveal>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {localStores.map((s, i) => {
                  return (
                    <SectionReveal key={i} delay={i * 0.05}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem 1.25rem', borderRadius: '10px', background: 'rgba(17,28,46,0.3)', border: '1px solid rgba(79,124,207,0.06)' }}>
                        <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: `${s.color}12`, border: `1px solid ${s.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Smartphone size={15} color={s.color} aria-hidden="true" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#4F7CCF', fontWeight: 600 }}>{s.name}</span>
                            <span style={{ padding: '0.15rem 0.4rem', borderRadius: '999px', fontSize: '0.58rem', fontFamily: 'var(--font-mono)', fontWeight: 600, background: `${s.color}12`, color: s.color }}>{s.storage}</span>
                          </div>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.55 }}>{s.purpose}</p>
                        </div>
                      </div>
                    </SectionReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══ SECTION 04 — HOW WE USE DATA ═══ */}
          <section id="processing" ref={setSectionRef('processing')} aria-labelledby="processing-title" style={{ padding: 'clamp(3rem, 6vw, 5rem) 2rem', borderBottom: '1px solid rgba(79,124,207,0.08)' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <SectionReveal>
                {sectionNumber('04')}
                {sectionLabel('HOW WE USE DATA')}
                <h2 id="processing-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '1rem' }}>How We Use Information</h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '700px', marginBottom: '2.5rem' }}>
                  There are very few things we do with information. Each is listed below.
                </p>
              </SectionReveal>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {processingUses.map((use, i) => {
                  const Icon = iconMap[use.icon] || Server;
                  const isOpen = openProcessing === i;
                  return (
                    <SectionReveal key={i} delay={i * 0.04}>
                      <div style={{ borderRadius: '14px', background: isOpen ? 'rgba(17,28,46,0.6)' : 'rgba(17,28,46,0.35)', border: `1px solid ${isOpen ? use.color + '30' : 'rgba(79,124,207,0.08)'}`, backdropFilter: 'blur(12px)', overflow: 'hidden', transition: 'all 0.3s' }}>
                        <button aria-expanded={isOpen} onClick={() => setOpenProcessing(isOpen ? null : i)}
                          style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', padding: '1.15rem 1.25rem', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: `${use.color}15`, border: `1px solid ${use.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Icon size={18} color={use.color} aria-hidden="true" />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 600, color: '#fff', marginBottom: '0.15rem' }}>{use.title}</p>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>{use.summary}</p>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                            <span style={{ padding: '0.2rem 0.55rem', borderRadius: '999px', fontSize: '0.6rem', fontFamily: 'var(--font-mono)', fontWeight: 600, background: `${use.color}12`, color: use.color, border: `1px solid ${use.color}25`, whiteSpace: 'nowrap' }}>{use.legalBasis}</span>
                            {isOpen ? <ChevronUp size={16} color="var(--text-disabled)" /> : <ChevronDown size={16} color="var(--text-disabled)" />}
                          </div>
                        </button>
                        <div style={{ maxHeight: isOpen ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
                          <div style={{ padding: '0 1.25rem 1.25rem 1.25rem', borderTop: '1px solid rgba(79,124,207,0.06)' }}>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, paddingTop: '1rem' }}>{use.detail}</p>
                          </div>
                        </div>
                      </div>
                    </SectionReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══ SECTION 05 — YOUR RIGHTS ═══ */}
          <section id="rights" ref={setSectionRef('rights')} aria-labelledby="rights-title" style={{ padding: 'clamp(3rem, 6vw, 5rem) 2rem', borderBottom: '1px solid rgba(79,124,207,0.08)' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <SectionReveal>
                {sectionNumber('05')}
                {sectionLabel('YOUR RIGHTS')}
                <h2 id="rights-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '1rem' }}>Your Rights</h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '700px', marginBottom: '2.5rem' }}>
                  Where we hold personal data about you, you may exercise these rights by contacting us. Because we hold so little data, most requests can be answered quickly.
                </p>
              </SectionReveal>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                {privacyRights.map((right, i) => {
                  const Icon = iconMap[right.icon] || Eye;
                  return (
                    <SectionReveal key={i} delay={i * 0.04}>
                      <div style={{ padding: '1.35rem', borderRadius: '14px', background: 'rgba(17,28,46,0.4)', border: '1px solid rgba(79,124,207,0.18)', backdropFilter: 'blur(12px)', height: '100%', transition: 'border-color 0.25s, transform 0.25s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79,124,207,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(79,124,207,0.18)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(79,124,207,0.18)', border: '1px solid rgba(79,124,207,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                          <Icon size={18} color="#4F7CCF" aria-hidden="true" />
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem' }}>{right.title}</h3>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '0.75rem' }}>{right.description}</p>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(79,124,207,0.6)', fontWeight: 500 }}>{right.legalBasis}</span>
                      </div>
                    </SectionReveal>
                  );
                })}
              </div>
              <SectionReveal delay={0.12}>
                <div style={{ padding: '1.5rem', borderRadius: '14px', background: 'rgba(79,124,207,0.06)', border: '1px solid rgba(79,124,207,0.15)', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '240px' }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 600, color: '#fff', marginBottom: '0.35rem' }}>Submit a request</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      To exercise any of these rights, use our contact page or email us directly at group.cristedor@gmail.com. Please note that since our contact form has no backend, emailing us is the most reliable way to reach us.
                    </p>
                  </div>
                  <button onClick={() => onNavigate('/contact')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.25rem', borderRadius: '10px', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', fontWeight: 600, background: 'linear-gradient(135deg, #4F7CCF, #335EAA)', color: '#fff', border: 'none', cursor: 'pointer', transition: 'all 0.25s' }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(79,124,207,0.3)'; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}>
                    Contact Us <ArrowRight size={14} />
                  </button>
                </div>
              </SectionReveal>
            </div>
          </section>

          {/* ═══ SECTION 06 — SECURITY ═══ */}
          <section id="security" ref={setSectionRef('security')} aria-labelledby="security-title" style={{ padding: 'clamp(3rem, 6vw, 5rem) 2rem', borderBottom: '1px solid rgba(79,124,207,0.08)' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <SectionReveal>
                {sectionNumber('06')}
                {sectionLabel('SECURITY')}
                <h2 id="security-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '1rem' }}>How We Protect Data</h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '700px', marginBottom: '2rem' }}>
                  We take reasonable measures to protect the small amount of data we handle. We are early-stage and do not claim third-party security certifications; we describe honestly what we do.
                </p>
              </SectionReveal>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                {securityMeasures.map((m, i) => {
                  const Icon = iconMap[m.icon] || Lock;
                  return (
                    <SectionReveal key={i} delay={i * 0.04}>
                      <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'rgba(17,28,46,0.4)', border: '1px solid rgba(79,124,207,0.08)', textAlign: 'center', transition: 'border-color 0.25s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = m.color + '40'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(79,124,207,0.08)'; }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${m.color}12`, border: `1px solid ${m.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
                          <Icon size={18} color={m.color} aria-hidden="true" />
                        </div>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '0.35rem' }}>{m.title}</p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.45 }}>{m.description}</p>
                      </div>
                    </SectionReveal>
                  );
                })}
              </div>
              <SectionReveal delay={0.1}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-disabled)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>If a Security Incident Occurs</p>
              </SectionReveal>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                {incidentProcess.map((step, i) => {
                  const Icon = iconMap[step.icon] || Shield;
                  return (
                    <SectionReveal key={i} delay={i * 0.06}>
                      <div style={{ padding: '1.35rem', borderRadius: '14px', background: 'rgba(17,28,46,0.4)', border: '1px solid rgba(79,124,207,0.08)', textAlign: 'center', transition: 'border-color 0.25s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = step.color + '40'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(79,124,207,0.08)'; }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${step.color}12`, border: `1px solid ${step.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
                          <Icon size={18} color={step.color} aria-hidden="true" />
                        </div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-disabled)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Step {step.step}</span>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 600, color: '#fff', margin: '0.25rem 0 0.35rem' }}>{step.title}</h3>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.45 }}>{step.description}</p>
                      </div>
                    </SectionReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══ SECTION 07 — CHILDREN ═══ */}
          <section id="children" ref={setSectionRef('children')} aria-labelledby="children-title" style={{ padding: 'clamp(3rem, 6vw, 5rem) 2rem', borderBottom: '1px solid rgba(79,124,207,0.08)' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <SectionReveal>
                {sectionNumber('07')}
                {sectionLabel('CHILDREN\u2019S PRIVACY')}
                <h2 id="children-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '1rem' }}>{childrenPrivacy.title}</h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '700px', marginBottom: '2rem' }}>
                  {childrenPrivacy.statement}
                </p>
              </SectionReveal>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {childrenPrivacy.details.map((detail, i) => (
                  <SectionReveal key={i} delay={i * 0.04}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem 1.25rem', borderRadius: '10px', background: 'rgba(17,28,46,0.3)', border: '1px solid rgba(79,124,207,0.06)' }}>
                      <Shield size={15} color="var(--text-disabled)" style={{ marginTop: '2px', flexShrink: 0 }} aria-hidden="true" />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{detail}</span>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ SECTION 08 — CONTACT ═══ */}
          <section id="contact" ref={setSectionRef('contact')} aria-labelledby="contact-title" style={{ padding: 'clamp(3rem, 6vw, 5rem) 2rem', borderBottom: '1px solid rgba(79,124,207,0.08)' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <SectionReveal>
                {sectionNumber('08')}
                {sectionLabel('CONTACT')}
                <h2 id="contact-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '1rem' }}>Questions or Requests?</h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '700px', marginBottom: '2.5rem' }}>
                  If you have any question about this policy, or would like to exercise any of the rights above, please reach out. We will respond as soon as we are able.
                </p>
              </SectionReveal>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                {contactOptions.map((opt, i) => {
                  return (
                    <SectionReveal key={i} delay={i * 0.05}>
                      <div style={{ padding: '1.5rem', borderRadius: '14px', background: 'rgba(17,28,46,0.4)', border: `1px solid ${opt.color}20`, backdropFilter: 'blur(12px)', height: '100%', transition: 'border-color 0.25s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = opt.color + '50'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = opt.color + '20'; }}>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 600, color: opt.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>{opt.role}</p>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{opt.name}</h3>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '1rem' }}>{opt.description}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                          <Mail size={13} color="var(--text-disabled)" aria-hidden="true" />
                          <a href={`mailto:${opt.email}`} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: opt.color, fontWeight: 500, textDecoration: 'none' }}>{opt.email}</a>
                        </div>
                        <button onClick={() => onNavigate('/contact')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 1rem', borderRadius: '8px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', fontWeight: 600, background: `${opt.color}12`, color: opt.color, border: `1px solid ${opt.color}25`, cursor: 'pointer', transition: 'all 0.25s' }}
                          onMouseEnter={e => { e.currentTarget.style.background = opt.color + '25'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = opt.color + '12'; }}>
                          Contact <ArrowRight size={13} />
                        </button>
                      </div>
                    </SectionReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══ FOOTER: VERSION + RELATED ═══ */}
          <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 2rem' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <SectionReveal delay={0.05}>
                <div style={{ marginBottom: '2.5rem' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-disabled)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>Version History</p>
                  <div style={{ borderRadius: '14px', background: 'rgba(17,28,46,0.3)', border: '1px solid rgba(79,124,207,0.06)', overflow: 'hidden' }}>
                    {versionHistory.map((v, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem 1.25rem', borderBottom: i < versionHistory.length - 1 ? '1px solid rgba(79,124,207,0.04)' : 'none' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#4F7CCF', fontWeight: 600, minWidth: '32px' }}>v{v.version}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-disabled)', minWidth: '90px' }}>{v.date}</span>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{v.summary}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <div style={{ marginBottom: '2.5rem' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-disabled)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>Related Pages</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {relatedLegalPages.map((page, i) => (
                      <button key={i} onClick={() => onNavigate(page.path)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 0.9rem', borderRadius: '10px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', fontWeight: 500, background: 'rgba(17,28,46,0.4)', color: 'var(--text-muted)', border: '1px solid rgba(79,124,207,0.08)', cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79,124,207,0.3)'; e.currentTarget.style.color = '#4F7CCF'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(79,124,207,0.08)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                        <FileText size={13} aria-hidden="true" /> {page.label}
                      </button>
                    ))}
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.15}>
                <div style={{ borderTop: '1px solid rgba(79,124,207,0.08)', paddingTop: '2rem', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--text-disabled)', lineHeight: 1.7, maxWidth: '750px', margin: '0 auto 1rem' }}>
                    This Privacy Policy applies to digital properties owned and operated by Cristedor Group, including cristedor.com. It does not apply to third-party websites or services that may be linked from our platforms. We may update this policy as our products and operations evolve.
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'rgba(255,255,255,0.2)' }}>Version 1.0</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'rgba(255,255,255,0.2)' }}>Cristedor Group</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'rgba(255,255,255,0.2)' }}>Ghana &middot; Online</span>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </section>
        </main>
      </div>

      {/* ═══ RESPONSIVE CSS ═══ */}
      <style>{`
        @keyframes privacyPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @media (min-width: 901px) {
          .privacy-sidebar { display: block !important; }
          .privacy-mobile-toc { display: none !important; }
        }
        @media (max-width: 900px) {
          .privacy-mobile-toc { display: block !important; }
          .privacy-sidebar { display: none !important; }
          .privacy-quick-nav { display: none !important; }
        }
        @media (max-width: 768px) {
          section > div > div > div > div { width: 100% !important; }
        }
        @media print {
          .privacy-sidebar, .privacy-mobile-toc, .privacy-quick-nav, button { display: none !important; }
          * { color: #000 !important; background: #fff !important; border-color: #ccc !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
        *:focus-visible { outline: 2px solid #4F7CCF; outline-offset: 2px; border-radius: 4px; }
      `}</style>
    </div>
  );
};
