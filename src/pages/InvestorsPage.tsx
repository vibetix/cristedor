import React, { useState, useEffect, useRef } from 'react';
import { RoutePath } from '../types';
import {
  heroIndicators, atAGlanceItems, thesisBody, thesisPrinciples,
  portfolioStrategyItems, capitalCategories, growthSteps, riskAreas,
  responsibleGrowthAreas, governancePrinciples, standardsIntent,
  standardsCommitments, reportComingSoon, pressReleases, partnershipTypes,
  futureVision, investorFAQ
} from '../data/financialData';
import { portfolioData } from '../data/portfolioData';
import { TYPE_LABELS } from '../data/portfolioMeta';
import { StatusBadge } from '../data/stageData';
import { leadershipData } from '../data/leadershipData';
import {
  ArrowRight, Mail, Send, ChevronDown, Shield, ShieldCheck, AlertTriangle,
  CheckCircle, Cpu, Compass, Landmark, Layers, Target, TrendingUp, Users,
  Building2, Handshake, FlaskConical, FileText, Megaphone, Heart, Globe
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface InvestorsPageProps {
  onNavigate: (path: RoutePath, query?: Record<string, string>) => void;
}

const atGlanceIconMap: Record<string, LucideIcon> = { landmark: Landmark, layers: Layers, cpu: Cpu, compass: Compass };
const strategyIconMap: Record<string, LucideIcon> = { layers: Layers, target: Target, 'trending-up': TrendingUp, building: Building2 };
const capitalIconMap: Record<string, LucideIcon> = { cpu: Cpu, users: Users, 'trending-up': TrendingUp, compass: Compass };
const responsibleIconMap: Record<string, LucideIcon> = { cpu: Cpu, users: Users, globe: Globe, heart: Heart, shield: Shield };
const partnershipIconMap: Record<string, LucideIcon> = { handshake: Handshake, flask: FlaskConical, building: Building2 };

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

export const InvestorsPage: React.FC<InvestorsPageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', organisation: '', type: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 6000);
    setFormData({ name: '', email: '', organisation: '', type: '', message: '' });
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

  const inputBase: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box' as const, padding: '0.85rem 1rem', borderRadius: '10px',
    background: 'rgba(17, 28, 46, 0.6)', border: '1px solid rgba(79, 124, 207, 0.15)', color: '#fff',
    fontSize: '0.85rem', fontFamily: 'var(--font-body)', outline: 'none', transition: 'border-color 0.2s'
  };
  const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, enter = true) => {
    e.currentTarget.style.borderColor = enter ? 'rgba(79, 124, 207, 0.5)' : 'rgba(79, 124, 207, 0.15)';
  };
  const fieldLabel: React.CSSProperties = {
    display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 600,
    letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)', marginBottom: '0.4rem'
  };

  const founder = leadershipData[0];

  return (
    <div style={{ backgroundColor: '#050914', minHeight: '100vh', position: 'relative' }}>
      <a href="#investors-main-content" style={{ position: 'absolute', top: '-100%', left: '50%', transform: 'translateX(-50%)', background: '#4F7CCF', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '0 0 8px 8px', fontWeight: 700, fontFamily: 'var(--font-body)', zIndex: 9999, transition: 'top 0.2s', textDecoration: 'none' }}
        onFocus={e => { e.currentTarget.style.top = '0'; }}
        onBlur={e => { e.currentTarget.style.top = '-100%'; }}>
        Skip to main content
      </a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Organization',
        name: 'Cristedor Group', url: 'https://cristedor.com',
        description: 'Cristedor Group is a private holding company building and developing businesses across technology, artificial intelligence, and media.',
      })}} />

      {/* ═══ 1. HERO ═══ */}
      <section id="investors-main-content" tabIndex={-1} style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(5rem, 10vw, 8rem) 2rem clamp(3rem, 6vw, 4.5rem)' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,124,207,0.18) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-5%', left: '30%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CCF', marginBottom: '1rem' }}>{'\u2726'} COMPANIES & PARTNERSHIPS</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5.5vw, 4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.12, margin: 0, letterSpacing: '-0.02em' }}>
              Investing in{' '}
              <span style={{ background: 'linear-gradient(90deg, #fff 0%, #CDDDFF 55%, #4F7CCF 115%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>What Comes Next</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginTop: '1.5rem', maxWidth: '640px', margin: '1.5rem auto 0' }}>
              Cristedor Group is a private holding company building and developing businesses across technology, artificial intelligence, and media.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              <button onClick={() => document.getElementById('investors-reports')?.scrollIntoView({ behavior: 'smooth' })} style={btnPrimary} onMouseEnter={e => hoverBtn(e)} onMouseLeave={e => hoverBtn(e, false)}>
                View Documents <ArrowRight size={16} />
              </button>
              <button onClick={() => document.getElementById('investors-enquiry')?.scrollIntoView({ behavior: 'smooth' })} style={btnGlass} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(17, 28, 46, 0.7)'; e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.4)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(17, 28, 46, 0.5)'; e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.2)'; }}>
                Get in Touch <Mail size={16} />
              </button>
            </div>
          </div>
          <div className="investors-hero-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', maxWidth: '860px', margin: '3.5rem auto 0' }}>
            {heroIndicators.map((ind, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <div style={{ padding: '1.25rem 1.25rem', borderRadius: '14px', background: 'rgba(17, 28, 46, 0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(79, 124, 207, 0.1)', boxShadow: '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)', height: '100%' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.82rem, 1.4vw, 1rem)', fontWeight: 700, color: '#fff', marginBottom: '0.35rem', lineHeight: 1.3 }}>{ind.label}</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-disabled)', letterSpacing: '0.04em', lineHeight: 1.5, margin: 0 }}>{ind.note}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to top, #050914, transparent)', pointerEvents: 'none' }} />
      </section>

      {/* ═══ 2. GROUP AT A GLANCE ═══ */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container">
          <SectionReveal>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CCF', marginBottom: '0.75rem' }}>{'\u2726'} GROUP AT A GLANCE</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>Group at a Glance</h2>
            </div>
          </SectionReveal>
          <div className="investors-why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
            {atAGlanceItems.map((item, i) => {
              const Icon = atGlanceIconMap[item.icon] || Layers;
              return (
                <SectionReveal key={i} delay={i * 0.08}>
                  <div style={{ padding: '1.75rem', borderRadius: '16px', background: 'rgba(17, 28, 46, 0.35)', border: '1px solid rgba(79, 124, 207, 0.08)', transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)', height: '100%' }}
                    onMouseEnter={e => hoverCard(e, `${item.color}30`)} onMouseLeave={e => hoverCard(e)}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                      <Icon size={20} color={item.color} />
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.98rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{item.title}</h4>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.55 }}>{item.description}</p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 3. INVESTMENT THESIS ═══ */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container">
          <SectionReveal>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '0.75rem' }}>{'\u2726'} THESIS</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>Our Investment Thesis</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-disabled)', lineHeight: 1.65, marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
                {thesisBody}
              </p>
            </div>
          </SectionReveal>
          <div className="investors-thesis-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
            {thesisPrinciples.map((p, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <div style={{ padding: '1.75rem', borderRadius: '16px', background: 'rgba(17, 28, 46, 0.35)', border: `1px solid ${p.color}20`, height: '100%', transition: 'all 0.35s', position: 'relative', overflow: 'hidden' }}
                  onMouseEnter={e => hoverCard(e, `${p.color}30`)} onMouseLeave={e => hoverCard(e)}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, color: p.color }}>{p.step}</span>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: '#fff', margin: '0.5rem 0 0.5rem' }}>{p.title}</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.55, margin: 0 }}>{p.description}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 4. PORTFOLIO ═══ */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container">
          <SectionReveal>
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CCF', marginBottom: '0.75rem' }}>{'\u2726'} PORTFOLIO</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>Our Portfolio</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-disabled)', lineHeight: 1.65, marginTop: '1rem', maxWidth: '620px', margin: '1rem auto 0' }}>
                Cristedor Group is developing a portfolio of companies and ventures spanning technology, AI, and media.
              </p>
            </div>
          </SectionReveal>
          <div className="investors-portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {portfolioData.map((entity, i) => (
              <SectionReveal key={entity.id} delay={i * 0.08}>
                <div style={{ padding: '1.75rem', borderRadius: '16px', background: 'rgba(17, 28, 46, 0.35)', border: '1px solid rgba(79, 124, 207, 0.08)', transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)', height: '100%', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                  onClick={() => onNavigate(entity.detailRoute, { id: entity.id })} onMouseEnter={e => hoverCard(e, 'rgba(79, 124, 207, 0.3)')} onMouseLeave={e => hoverCard(e)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.04)', padding: '0.2rem 0.5rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>{TYPE_LABELS[entity.type]}</span>
                    <StatusBadge status={entity.status} />
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>{entity.name}</h4>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#4F7CCF', marginBottom: '0.75rem' }}>{entity.tagline}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.55, flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{entity.description}</p>
                  <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4F7CCF' }}>
                    {entity.type === 'product' ? 'View Product' : 'View Company'} <ArrowRight size={12} />
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. PORTFOLIO STRATEGY ═══ */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container">
          <SectionReveal>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CCF', marginBottom: '0.75rem' }}>{'\u2726'} STRATEGY</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>Portfolio Strategy</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-disabled)', lineHeight: 1.65, marginTop: '1rem', maxWidth: '560px', margin: '1rem auto 0' }}>
                These describe the Group's intended approach to building its portfolio — they are strategy, not historical achievements.
              </p>
            </div>
          </SectionReveal>
          <div className="investors-strategy-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
            {portfolioStrategyItems.map((item, i) => {
              const Icon = strategyIconMap[item.icon] || Target;
              return (
                <SectionReveal key={i} delay={i * 0.08}>
                  <div style={{ padding: '1.75rem', borderRadius: '16px', background: 'rgba(17, 28, 46, 0.35)', border: '1px solid rgba(79, 124, 207, 0.08)', transition: 'all 0.35s', height: '100%' }}
                    onMouseEnter={e => hoverCard(e, `${item.color}30`)} onMouseLeave={e => hoverCard(e)}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                      <Icon size={20} color={item.color} />
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.98rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{item.title}</h4>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.55 }}>{item.description}</p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 6. CAPITAL & RESOURCE ALLOCATION ═══ */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container">
          <SectionReveal>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '0.75rem' }}>{'\u2726'} RESOURCES</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>How We Deploy Resources</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-disabled)', lineHeight: 1.65, marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
                Cristedor Group takes a disciplined approach to allocating the resources available to the Group and its ventures.
              </p>
            </div>
          </SectionReveal>
          <div className="investors-capital-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', maxWidth: '1020px', margin: '0 auto' }}>
            {capitalCategories.map((item, i) => {
              const Icon = capitalIconMap[item.icon] || Cpu;
              return (
                <SectionReveal key={i} delay={i * 0.08}>
                  <div style={{ display: 'flex', gap: '1rem', padding: '1.5rem', borderRadius: '14px', background: 'rgba(17, 28, 46, 0.35)', border: '1px solid rgba(79, 124, 207, 0.08)', transition: 'all 0.3s', height: '100%' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${item.color}30`; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={20} color={item.color} />
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.92rem', fontWeight: 700, color: '#fff', marginBottom: '0.3rem' }}>{item.title}</h4>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.5 }}>{item.description}</p>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 7. GROWTH STRATEGY ═══ */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container">
          <SectionReveal>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CCF', marginBottom: '0.75rem' }}>{'\u2726'} GROWTH</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>Growth Strategy</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-disabled)', lineHeight: 1.65, marginTop: '1rem', maxWidth: '560px', margin: '1rem auto 0' }}>
                A forward-looking approach to how the Group intends to grow its companies — no outcomes are guaranteed.
              </p>
            </div>
          </SectionReveal>
          <div className="investors-growth-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
            {growthSteps.map((phase, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div style={{ padding: '1.75rem', borderRadius: '16px', background: 'rgba(17, 28, 46, 0.35)', border: `1px solid ${phase.color}20`, height: '100%', transition: 'all 0.35s' }}
                  onMouseEnter={e => hoverCard(e, `${phase.color}30`)} onMouseLeave={e => hoverCard(e)}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700, color: phase.color, background: `${phase.color}15`, padding: '0.2rem 0.6rem', borderRadius: '6px' }}>{phase.step}</span>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: '#fff', margin: '0.75rem 0 0.5rem' }}>{phase.title}</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.55, margin: 0 }}>{phase.description}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 8. UNDERSTANDING RISK ═══ */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container">
          <SectionReveal>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8B5CF6', marginBottom: '0.75rem' }}>{'\u2726'} RISK</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>Understanding Risk</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-disabled)', lineHeight: 1.65, marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
                Building and developing businesses carries real risk. The Group seeks to be transparent about the principal risks it faces.
              </p>
            </div>
          </SectionReveal>
          <div className="investors-risk-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {riskAreas.map((risk, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <div style={{ padding: '1.75rem', borderRadius: '16px', background: 'rgba(17, 28, 46, 0.35)', border: '1px solid rgba(79, 124, 207, 0.08)', transition: 'all 0.3s', height: '100%' }}
                  onMouseEnter={e => hoverCard(e, `${risk.color}30`)} onMouseLeave={e => hoverCard(e)}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${risk.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Shield size={18} color={risk.color} />
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>{risk.title}</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.55, margin: 0 }}>{risk.description}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 9. RESPONSIBLE GROWTH ═══ */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(79,124,207,0.04) 0%, rgba(212,175,55,0.03) 100%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CCF', marginBottom: '0.75rem' }}>{'\u2726'} RESPONSIBLE GROWTH</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>Responsible Growth</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-disabled)', lineHeight: 1.7, marginTop: '1rem', maxWidth: '640px', margin: '1rem auto 0' }}>
                We believe long-term value creation should consider more than financial outcomes. As Cristedor Group grows, we aim to build useful products, develop people, use technology responsibly, and contribute positively to the communities we serve.
              </p>
            </div>
          </SectionReveal>
          <div className="investors-esg-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {responsibleGrowthAreas.map((area, i) => {
              const IconComp = responsibleIconMap[area.icon] || Shield;
              return (
                <SectionReveal key={i} delay={i * 0.08}>
                  <div style={{ padding: '1.5rem', borderRadius: '14px', background: 'rgba(17, 28, 46, 0.35)', border: '1px solid rgba(79, 124, 207, 0.08)', transition: 'all 0.3s', height: '100%' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${area.color}30`; e.currentTarget.style.transform = 'translateY(-3px)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${area.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}><IconComp size={20} color={area.color} /></div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{area.title}</h4>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.55, margin: 0 }}>{area.description}</p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 10. GOVERNANCE ═══ */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container">
          <div className="investors-governance" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <SectionReveal>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CCF', marginBottom: '0.75rem' }}>{'\u2726'} GOVERNANCE</p>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '1.5rem' }}>Building Strong Governance</h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-disabled)', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Cristedor Group is developing governance structures designed to support responsible decision-making, accountability, transparency and long-term growth.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {governancePrinciples.map((p, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(79,124,207,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                        <Shield size={12} color="#4F7CCF" />
                      </div>
                      <div>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 700, color: '#fff', marginBottom: '0.15rem' }}>{p.title}</p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.5, margin: 0 }}>{p.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div style={{ padding: '2.5rem', borderRadius: '20px', background: 'rgba(17, 28, 46, 0.4)', border: '1px solid rgba(79, 124, 207, 0.12)', textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(79,124,207,0.1)', border: '2px solid rgba(79,124,207,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <ShieldCheck size={32} color="#4F7CCF" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>Early-Stage Governance</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-disabled)', lineHeight: 1.6, margin: 0 }}>
                  The Group is founder-led and governance is being developed as its companies and products grow. Details of any board, committees or independent audit arrangements will be disclosed here once they genuinely exist.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ═══ 11. LEADERSHIP ═══ */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CCF', marginBottom: '0.75rem' }}>{'\u2726'} LEADERSHIP & STEWARDSHIP</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>Leadership & Stewardship</h2>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <div style={{ padding: '2.5rem', borderRadius: '20px', background: 'rgba(17, 28, 46, 0.4)', border: '1px solid rgba(79, 124, 207, 0.12)', textAlign: 'center' }}>
              <div style={{ width: '88px', height: '88px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(79,124,207,0.25), rgba(51,94,170,0.18))', border: '2px solid rgba(79,124,207,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: '#4F7CCF' }}>
                {founder.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.3rem' }}>{founder.name}</h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#4F7CCF', marginBottom: '1rem' }}>{founder.role}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 1.25rem' }}>{founder.bio}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-disabled)', lineHeight: 1.6, maxWidth: '520px', margin: '0 auto' }}>
                Cristedor Group is founder-led. The team is intentionally small while the Group builds its earliest companies and products.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══ 12. STANDARDS & COMMITMENTS ═══ */}
      <section style={{ padding: 'clamp(2rem, 4vw, 3.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container">
          <SectionReveal>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '0.75rem' }}>{'\u2726'} STANDARDS</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>Standards & Commitments</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-disabled)', lineHeight: 1.65, marginTop: '1rem', maxWidth: '620px', margin: '1rem auto 0' }}>{standardsIntent}</p>
            </div>
          </SectionReveal>
          <div className="investors-trust-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', maxWidth: '820px', margin: '0 auto' }}>
            {standardsCommitments.map((item, i) => (
              <SectionReveal key={i} delay={i * 0.06}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '1.25rem 1.5rem', borderRadius: '12px', background: 'rgba(17, 28, 46, 0.35)', border: '1px solid rgba(79, 124, 207, 0.08)', transition: 'all 0.3s', height: '100%' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.25)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <ShieldCheck size={18} color="#4F7CCF" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: '0.3rem' }}>{item.title}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.5, margin: 0 }}>{item.description}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 13. CORPORATE DOCUMENTS ═══ */}
      <section id="investors-reports" style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)', scrollMarginTop: '80px' }}>
        <div className="container">
          <SectionReveal>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CCF', marginBottom: '0.75rem' }}>{'\u2726'} DOCUMENTS</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>Corporate Documents</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-disabled)', lineHeight: 1.65, marginTop: '1rem', maxWidth: '620px', margin: '1rem auto 0' }}>
                No corporate documents are currently published. The following will be added here once they genuinely exist.
              </p>
            </div>
          </SectionReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '820px', margin: '0 auto' }}>
            {reportComingSoon.map((report, i) => (
              <SectionReveal key={report.id} delay={i * 0.08}>
                <div style={{ padding: '1.5rem', borderRadius: '14px', background: 'rgba(17, 28, 46, 0.35)', border: '1px solid rgba(79, 124, 207, 0.08)', borderLeft: '3px solid rgba(79,124,207,0.4)', display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(17, 28, 46, 0.55)'; e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.2)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(17, 28, 46, 0.35)'; e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.08)'; }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(79,124,207,0.12)', border: '1px solid rgba(79,124,207,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FileText size={18} color="#4F7CCF" />
                  </div>
                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, color: '#4F7CCF', background: 'rgba(79,124,207,0.12)', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>{report.category}</span>
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>{report.title}</h4>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.55, margin: 0 }}>{report.summary}</p>
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem', borderRadius: '999px', fontSize: '0.66rem', fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.62)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    Coming Soon
                  </span>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 14. PRESS & COMPANY UPDATES ═══ */}
      <section style={{ padding: 'clamp(2rem, 4vw, 3.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container">
          <SectionReveal>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CCF', marginBottom: '0.75rem' }}>{'\u2726'} NEWS</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>Press & Company Updates</h2>
            </div>
          </SectionReveal>
          {pressReleases.length === 0 ? (
            <SectionReveal delay={0.1}>
              <div className="investors-press-grid" style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ maxWidth: '520px', padding: '2rem', borderRadius: '16px', background: 'rgba(17, 28, 46, 0.35)', border: '1px solid rgba(79, 124, 207, 0.1)', textAlign: 'center', width: '100%' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(79,124,207,0.12)', border: '1px solid rgba(79,124,207,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                    <Megaphone size={22} color="#4F7CCF" />
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>No Announcements Published Yet</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.6, margin: 0 }}>
                    Company announcements will be added here as they are released.
                  </p>
                </div>
              </div>
            </SectionReveal>
          ) : (
            <div className="investors-press-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
              {pressReleases.map((pr, i) => (
                <SectionReveal key={pr.id} delay={i * 0.08}>
                  <div style={{ padding: '1.75rem', borderRadius: '16px', background: 'rgba(17, 28, 46, 0.35)', border: '1px solid rgba(79, 124, 207, 0.08)', transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-disabled)', marginBottom: '0.75rem' }}>{pr.date}</span>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{pr.title}</h4>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.55 }}>{pr.summary}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ 15. PARTNERSHIP OPPORTUNITIES ═══ */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container">
          <SectionReveal>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '0.75rem' }}>{'\u2726'} PARTNERSHIPS</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>Partnership Opportunities</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-disabled)', lineHeight: 1.7, marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
                We are open to conversations with organizations whose capabilities, networks or expertise align with Cristedor Group's long-term direction.
              </p>
            </div>
          </SectionReveal>
          <div className="investors-partnership-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', maxWidth: '900px', margin: '0 auto' }}>
            {partnershipTypes.map((type, i) => {
              const Icon = partnershipIconMap[type.icon] || Users;
              return (
                <SectionReveal key={i} delay={i * 0.1}>
                  <div style={{ padding: '2rem', borderRadius: '16px', background: 'rgba(17, 28, 46, 0.35)', border: `1px solid ${type.color}15`, textAlign: 'center', transition: 'all 0.35s', height: '100%' }}
                    onMouseEnter={e => hoverCard(e, `${type.color}30`)} onMouseLeave={e => hoverCard(e)}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: `${type.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                      <Icon size={24} color={type.color} />
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{type.title}</h4>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.55, margin: 0 }}>{type.description}</p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 16. FUTURE VISION ═══ */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container">
          <SectionReveal>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '0.75rem' }}>{'\u2726'} VISION</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>Where We're Headed</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-disabled)', lineHeight: 1.7, marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
                Cristedor Group's long-term vision is to develop a diversified ecosystem of businesses capable of creating meaningful value across multiple sectors and markets.
              </p>
            </div>
          </SectionReveal>
          <div className="investors-vision-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {futureVision.map((milestone, i) => (
              <SectionReveal key={i} delay={i * 0.12}>
                <div style={{ padding: '2rem', borderRadius: '16px', background: 'rgba(17, 28, 46, 0.35)', border: `1px solid ${milestone.color}20`, textAlign: 'center', transition: 'all 0.35s', height: '100%', position: 'relative', overflow: 'hidden' }}
                  onMouseEnter={e => hoverCard(e, `${milestone.color}30`)} onMouseLeave={e => hoverCard(e)}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${milestone.color}, transparent)` }} />
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: milestone.color, marginBottom: '0.75rem' }}>{milestone.horizon}</p>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{milestone.title}</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.55, margin: 0 }}>{milestone.description}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 17. ENQUIRY FORM ═══ */}
      <section id="investors-enquiry" style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)', scrollMarginTop: '80px' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CCF', marginBottom: '0.75rem' }}>{'\u2726'} ENQUIRIES</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '0.75rem' }}>Investment & Partnership Enquiries</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-disabled)', lineHeight: 1.65 }}>Questions about partnerships, investment opportunities, acquisitions or the Group more broadly — send us a message.</p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            {formSubmitted ? (
              <div style={{ padding: '3rem', borderRadius: '16px', background: 'rgba(79,124,207,0.08)', border: '1px solid rgba(79,124,207,0.2)', textAlign: 'center' }}>
                <CheckCircle size={40} color="#4F7CCF" />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginTop: '1rem', marginBottom: '0.5rem' }}>Thank You</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: '460px', margin: '0 auto' }}>Your enquiry has been received. Our team will review your message and respond if further discussion is appropriate.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ padding: '2rem', borderRadius: '16px', background: 'rgba(17, 28, 46, 0.4)', border: '1px solid rgba(79, 124, 207, 0.12)' }}>
                <div className="investors-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label htmlFor="investor-name" style={fieldLabel}>Full Name</label>
                    <input id="investor-name" type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={inputBase} onFocus={e => inputFocus(e)} onBlur={e => inputFocus(e, false)} />
                  </div>
                  <div>
                    <label htmlFor="investor-email" style={fieldLabel}>Email Address</label>
                    <input id="investor-email" type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={inputBase} onFocus={e => inputFocus(e)} onBlur={e => inputFocus(e, false)} />
                  </div>
                </div>
                <div className="investors-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label htmlFor="investor-org" style={fieldLabel}>Organisation</label>
                    <input id="investor-org" type="text" value={formData.organisation} onChange={e => setFormData({ ...formData, organisation: e.target.value })} style={inputBase} onFocus={e => inputFocus(e)} onBlur={e => inputFocus(e, false)} />
                  </div>
                  <div>
                    <label htmlFor="investor-type" style={fieldLabel}>Enquiry Type</label>
                    <select id="investor-type" required value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} style={{ ...inputBase, color: formData.type ? '#fff' : 'rgba(255,255,255,0.62)', cursor: 'pointer' }} onFocus={e => inputFocus(e)} onBlur={e => inputFocus(e, false)}>
                      <option value="" disabled>Select enquiry type</option>
                      <option value="general">General Corporate Enquiry</option>
                      <option value="partnership">Strategic Partnership</option>
                      <option value="research">Research & Innovation</option>
                      <option value="investment">Investment / Capital Opportunity</option>
                      <option value="acquisition">Acquisition / Strategic Opportunity</option>
                      <option value="media">Media Enquiry</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label htmlFor="investor-message" style={fieldLabel}>Message</label>
                  <textarea id="investor-message" required rows={4} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} style={{ ...inputBase, resize: 'vertical' as const }} onFocus={e => inputFocus(e)} onBlur={e => inputFocus(e, false)} />
                </div>
                <button type="submit" style={{ ...btnPrimary, width: '100%', justifyContent: 'center' }} onMouseEnter={e => hoverBtn(e)} onMouseLeave={e => hoverBtn(e, false)}>
                  Submit Enquiry <Send size={16} />
                </button>
              </form>
            )}
          </SectionReveal>
        </div>
      </section>

      {/* ═══ 18. FAQ ═══ */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container" style={{ maxWidth: '740px' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CCF', marginBottom: '0.75rem' }}>{'\u2726'} FAQ</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Frequently Asked Questions</h2>
            </div>
          </SectionReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {investorFAQ.map((faq, i) => {
              const isExpanded = openFaq === i;
              return (
                <SectionReveal key={i} delay={i * 0.06}>
                  <div style={{ borderRadius: '12px', background: isExpanded ? 'rgba(17, 28, 46, 0.6)' : 'rgba(17, 28, 46, 0.3)', border: `1px solid ${isExpanded ? 'rgba(79, 124, 207, 0.25)' : 'rgba(79, 124, 207, 0.08)'}`, overflow: 'hidden', transition: 'all 0.3s' }}>
                    <button onClick={() => setOpenFaq(isExpanded ? null : i)} aria-expanded={isExpanded} aria-controls={`investor-faq-${i}`}
                      style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.1rem 1.25rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 600, color: '#fff', paddingRight: '1rem' }}>{faq.question}</span>
                      <ChevronDown size={18} style={{ color: 'var(--text-disabled)', flexShrink: 0, transition: 'transform 0.3s', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)' }} />
                    </button>
                    <div id={`investor-faq-${i}`} role="region" aria-hidden={!isExpanded} style={{ maxHeight: isExpanded ? '240px' : 0, overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-disabled)', lineHeight: 1.65, padding: '0 1.25rem 1.1rem' }}>{faq.answer}</p>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 19. CTA FOOTER ═══ */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(3rem, 6vw, 5rem) 2rem' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(79,124,207,0.08) 0%, rgba(212,175,55,0.05) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,124,207,0.18) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <SectionReveal>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '1rem' }}>Ready to Partner with Cristedor?</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.88rem, 1.3vw, 1rem)', color: 'var(--text-disabled)', lineHeight: 1.65, maxWidth: '580px', margin: '0 auto 2rem' }}>Explore our portfolio, learn about our strategy, or contact the team about a potential partnership, investment or strategic opportunity.</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => onNavigate('/portfolio')} style={btnPrimary} onMouseEnter={e => hoverBtn(e)} onMouseLeave={e => hoverBtn(e, false)}>
                Explore Our Portfolio <ArrowRight size={16} />
              </button>
              <button onClick={() => document.getElementById('investors-enquiry')?.scrollIntoView({ behavior: 'smooth' })} style={btnGlass} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(17, 28, 46, 0.7)'; e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.4)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(17, 28, 46, 0.5)'; e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.2)'; }}>
                Start a Conversation <Mail size={16} />
              </button>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══ 20. LEGAL DISCLAIMER ═══ */}
      <section style={{ padding: '2rem', borderTop: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem 1.25rem', borderRadius: '12px', background: 'rgba(17, 28, 46, 0.3)', border: '1px solid rgba(79, 124, 207, 0.06)' }}>
            <AlertTriangle size={16} color="#73829A" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--text-disabled)', lineHeight: 1.6 }}>
              <strong style={{ color: 'rgba(255,255,255,0.62)' }}>Disclaimer:</strong> Information presented on this page is provided for general corporate and informational purposes. Certain statements regarding Cristedor Group's strategy, plans, opportunities and future direction are forward-looking and are not guarantees of future results. Cristedor Group is privately held, and information presented here should not be interpreted as an offer or solicitation to buy or sell securities. Any investment or partnership opportunity is subject to applicable laws, eligibility requirements, due diligence and definitive agreements.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ RESPONSIVE CSS ═══ */}
      <style>{`
        @media (max-width: 900px) {
          .investors-hero-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .investors-why-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .investors-thesis-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .investors-portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .investors-strategy-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .investors-capital-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .investors-growth-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .investors-risk-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .investors-esg-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .investors-trust-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .investors-partnership-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .investors-vision-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .investors-press-grid { grid-template-columns: 1fr !important; }
          .investors-governance { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 700px) {
          .investors-form-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .investors-why-grid { grid-template-columns: 1fr !important; }
          .investors-thesis-grid { grid-template-columns: 1fr !important; }
          .investors-portfolio-grid { grid-template-columns: 1fr !important; }
          .investors-strategy-grid { grid-template-columns: 1fr !important; }
          .investors-capital-grid { grid-template-columns: 1fr !important; }
          .investors-growth-grid { grid-template-columns: 1fr !important; }
          .investors-risk-grid { grid-template-columns: 1fr !important; }
          .investors-esg-grid { grid-template-columns: 1fr !important; }
          .investors-trust-grid { grid-template-columns: 1fr !important; }
          .investors-partnership-grid { grid-template-columns: 1fr !important; }
          .investors-vision-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .investors-hero-stats { gap: 0.75rem !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
        *:focus-visible { outline: 2px solid #4F7CCF; outline-offset: 2px; border-radius: 4px; }
      `}</style>
    </div>
  );
};
