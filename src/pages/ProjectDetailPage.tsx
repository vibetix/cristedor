import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RoutePath } from '../types';
import { projects } from '../data/siteContent';
import { projectSections, ProjectSection } from '../data/projectSections';
import {
  ArrowLeft, ArrowRight, Home, Mic, Ticket, Sparkles, Activity, Layers, Building2, Cpu,
  Search, Scale, CalendarCheck, Users,
  MessageSquare, FileSearch, LineChart, Bot, SlidersHorizontal,
  FileText, Download, ExternalLink,
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { StatusBadge } from '../data/stageData';
import { DIVISION_LABELS } from '../data/portfolioMeta';
import { ProductScreenshotGallery } from '../components/features/ProductScreenshotGallery';
import type { LucideIcon } from 'lucide-react';

interface ProjectDetailPageProps {
  id: string;
  onNavigate: (path: RoutePath, query?: Record<string, string>) => void;
}

const projectIcons: Record<string, React.ReactNode> = {
  unistay: <Home size={20} />,
  'synkturt-tts': <Mic size={20} />,
  vibetix: <Ticket size={20} />,
};

const PRODUCT_ACCENTS: Record<string, string> = {
  unistay: '#4F7CCF',
  'synkturt-tts': '#6FA0E8',
  vibetix: '#335EAA',
};

const PRODUCT_HERO_IMAGES: Record<string, string> = {
  unistay: '/unistay-hero.jpeg',
  'synkturt-tts': '/synkturt-hero.jpeg',
  vibetix: '/vibetix-hero.jpeg',
};

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

const SectionLabel: React.FC<{ children: string; accent?: string; symbol?: string }> = ({ children, accent = '#4F7CCF', symbol = '\u2756' }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent }}>
      {symbol} {children}
    </span>
    <span style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(79,124,207,0.25), transparent)' }} />
  </div>
);

const buildingIconMap: Record<string, LucideIcon> = { Search, Scale, CalendarCheck, Users };
const researchIconMap: Record<string, LucideIcon> = { Sparkles, MessageSquare, Users, FileSearch, LineChart };
const aiIconMap: Record<string, LucideIcon> = { Sparkles, MessageSquare, Scale, Bot, SlidersHorizontal };

const sectionNavLabel = (s: ProjectSection): string => s.heading;

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ id, onNavigate }) => {
  const project = projects.find(p => p.id === id);
  const sections: ProjectSection[] = projectSections[id] || [];

  const [activeSection, setActiveSection] = useState<string>('');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToSection = useCallback((secId: string) => {
    const el = sectionRefs.current[secId];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    if (sections.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    Object.values(sectionRefs.current).forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [sections.length]);

  const setSectionRef = useCallback((secId: string) => (el: HTMLElement | null) => {
    sectionRefs.current[secId] = el;
  }, []);

  if (!project) {
    return (
      <div style={{ backgroundColor: '#050914', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '440px' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '20px', margin: '0 auto 1.5rem',
            background: 'rgba(17, 28, 46, 0.6)', border: '1px solid rgba(79, 124, 207, 0.16)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Sparkles size={30} style={{ color: 'rgba(255,255,255,0.25)' }} />
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 4vw, 2rem)',
            fontWeight: 700, color: '#fff', marginBottom: '0.75rem'
          }}>
            Project Not Found
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            The public project you're looking for doesn't exist or has been moved.
          </p>
          <button
            onClick={() => onNavigate('/projects')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 1.5rem', borderRadius: '10px',
              background: 'rgba(79, 124, 207, 0.15)', border: '1px solid rgba(79, 124, 207, 0.3)',
              color: '#4F7CCF', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
              fontFamily: 'var(--font-body)', transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(79, 124, 207, 0.25)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(79, 124, 207, 0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <ArrowLeft size={16} /> Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const color = PRODUCT_ACCENTS[project.id] || '#4F7CCF';
  const related = projects.filter(p => p.id !== project.id).slice(0, 2);

  const stats = [
    { label: 'Status', value: project.status, color: '#335EAA', icon: <Activity size={16} />, badge: true },
    { label: 'Category', value: project.category, color, icon: <Layers size={16} /> },
    { label: 'Parent', value: 'Cristedor Labs', color: '#7C8DB5', icon: <Building2 size={16} /> },
    { label: 'Division', value: DIVISION_LABELS.technology, color: '#4F7CCF', icon: <Cpu size={16} /> },
  ];

  const hasSections = sections.length > 0;

  const renderSection = (s: ProjectSection, i: number) => {
    const delay = 0;
    switch (s.type) {
      case 'problem':
        return (
          <SectionReveal key={i} delay={delay}>
            <SectionLabel accent={color}>{s.eyebrow}</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.4vw, 2.4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '1rem' }}>
              {s.heading}
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.02rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              {s.description}
            </p>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1.25rem 1.5rem',
              borderRadius: '16px', background: 'rgba(17,28,46,0.4)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              border: `1px solid ${color}25`, borderLeft: `3px solid ${color}`
            }}>
              <span style={{ fontSize: '1.1rem', color, fontFamily: 'var(--font-display)', fontWeight: 700, flexShrink: 0 }}>→</span>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, margin: 0 }}>
                {s.resolution}
              </p>
            </div>
          </SectionReveal>
        );
      case 'building':
        return (
          <div key={i}>
            <SectionReveal delay={delay}>
              <SectionLabel accent={color}>{s.eyebrow}</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.4vw, 2.4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '0.75rem' }}>
                {s.heading}
              </h2>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '620px', marginBottom: '2rem' }}>
                {s.description}
              </p>
            </SectionReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem' }}>
              {s.features.map((f, j) => {
                const Icon = buildingIconMap[f.icon];
                return (
                  <SectionReveal key={f.title} delay={j * 0.08}>
                    <div className="glass-panel-interactive" style={{ padding: '1.75rem', height: '100%' }}>
                      <div style={{
                        width: '46px', height: '46px', borderRadius: '12px', marginBottom: '1.1rem',
                        background: `${color}15`, border: `1px solid ${color}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color
                      }}>
                        {Icon && <Icon size={20} />}
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
                        {f.title}
                      </h3>
                      <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, margin: 0 }}>
                        {f.description}
                      </p>
                    </div>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        );
      case 'journey':
        return (
          <div key={i}>
            <SectionReveal delay={delay}>
              <SectionLabel accent={color}>{s.eyebrow}</SectionLabel>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.4vw, 2.4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, margin: 0 }}>
                  {s.heading}
                </h2>
                {s.note && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
                    {s.note}
                  </span>
                )}
              </div>
            </SectionReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1.25rem' }}>
              {s.steps.map((step, j) => (
                <SectionReveal key={step.number} delay={j * 0.06}>
                  <div className="glass-panel-interactive" style={{ padding: '1.5rem', height: '100%', position: 'relative' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color, opacity: 0.9, display: 'block', marginBottom: '0.75rem' }}>
                      {step.number}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.45rem' }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
                      {step.description}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        );
      case 'program':
        return (
          <div key={i}>
            <SectionReveal delay={delay}>
              <SectionLabel accent={color}>{s.eyebrow}</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.4vw, 2.4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '0.75rem' }}>
                {s.heading}
              </h2>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '720px', marginBottom: '2rem' }}>
                {s.description}
              </p>
            </SectionReveal>

            <div style={{ position: 'relative', marginBottom: '2rem' }}>
              <div style={{ position: 'absolute', top: '2.25rem', bottom: '2.25rem', left: '24px', width: '1px', background: 'linear-gradient(180deg, rgba(79,124,207,0.4), rgba(79,124,207,0.05))' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {s.steps.map((step, j) => (
                  <SectionReveal key={step.label} delay={j * 0.06}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0, zIndex: 1,
                        background: `${color}15`, border: `1px solid ${color}40`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color
                      }}>
                        {String(j + 1).padStart(2, '0')}
                      </div>
                      <div className="glass-panel" style={{ flex: 1, padding: '1.1rem 1.3rem' }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.98rem', fontWeight: 700, color: '#fff', margin: '0 0 0.3rem' }}>
                          {step.label}
                        </h3>
                        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>

            {s.cautions && s.cautions.length > 0 && (
              <SectionReveal delay={delay}>
                <div style={{
                  display: 'grid', gap: '0.75rem', padding: '1.5rem', borderRadius: '16px',
                  background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.2)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: '#D4AF37', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      Important to note
                    </span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {s.cautions.map(c => (
                      <li key={c} style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionReveal>
            )}
          </div>
        );
      case 'development':
        return (
          <div key={i}>
            <SectionReveal delay={delay}>
              <SectionLabel accent={color}>{s.eyebrow}</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.4vw, 2.4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '0.75rem' }}>
                {s.heading}
              </h2>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '620px', marginBottom: '2rem' }}>
                {s.description}
              </p>
            </SectionReveal>
            <ProductScreenshotGallery slots={s.gallery} accent={s.accent || color} />
          </div>
        );
      case 'ai':
        return (
          <div key={i}>
            <SectionReveal delay={delay}>
              <SectionLabel accent={color} symbol={s.symbol}>{s.eyebrow}</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.4vw, 2.4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '0.75rem' }}>
                {s.heading}
              </h2>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '720px', marginBottom: '1.25rem' }}>
                {s.description}
              </p>
              {s.note && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.35rem 0.8rem', borderRadius: '9999px', marginBottom: '2.25rem',
                  fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700,
                  letterSpacing: '0.05em', textTransform: 'uppercase',
                  background: `${color}12`, color, border: `1px solid ${color}30`
                }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                  {s.note}
                </span>
              )}
            </SectionReveal>

            <div style={{
              position: 'relative',
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: '1.25rem'
            }}>
              <div style={{
                position: 'absolute', top: '-4rem', left: '50%', transform: 'translateX(-50%)',
                width: '28rem', height: '18rem', borderRadius: '50%', pointerEvents: 'none',
                background: `radial-gradient(circle, ${color}12, transparent 70%)`, filter: 'blur(60px)'
              }} />
              {s.capabilities.map((cap, j) => {
                const Icon = aiIconMap[cap.icon];
                return (
                  <SectionReveal key={cap.title} delay={j * 0.06} style={{ position: 'relative' }}>
                    <div className="glass-panel-interactive" style={{ padding: '1.5rem', height: '100%' }}>
                      <div style={{
                        width: '44px', height: '44px', borderRadius: '12px', marginBottom: '1rem',
                        background: `${color}14`, border: `1px solid ${color}2e`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color
                      }}>
                        {Icon && <Icon size={19} aria-hidden="true" />}
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.02rem', fontWeight: 700, color: '#fff', marginBottom: '0.45rem', lineHeight: 1.3 }}>
                        {cap.title}
                      </h3>
                      <p style={{ fontSize: '0.86rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, margin: 0 }}>
                        {cap.description}
                      </p>
                    </div>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        );
      case 'research':
        return (
          <div key={i}>
            <SectionReveal delay={delay}>
              <SectionLabel accent={color}>{s.eyebrow}</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.4vw, 2.4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '0.75rem' }}>
                {s.heading}
              </h2>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '720px', marginBottom: '1rem' }}>
                {s.description}
              </p>
              {s.note && (
                <span style={{
                  display: 'inline-block', padding: '0.35rem 0.8rem', borderRadius: '9999px', marginBottom: '2rem',
                  fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                  background: `${color}12`, color, border: `1px solid ${color}30`
                }}>
                  {s.note}
                </span>
              )}
            </SectionReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem' }}>
              {s.directions.map((d, j) => {
                const Icon = researchIconMap[d.icon];
                return (
                  <SectionReveal key={d.title} delay={j * 0.06}>
                    <div className="glass-panel-interactive" style={{ padding: '1.5rem', height: '100%' }}>
                      <div style={{
                        width: '42px', height: '42px', borderRadius: '11px', marginBottom: '1rem',
                        background: `${color}12`, border: `1px solid ${color}28`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color
                      }}>
                        {Icon && <Icon size={18} />}
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.45rem' }}>
                        {d.title}
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
                        {d.description}
                      </p>
                    </div>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        );
      case 'pitchdeck':
        return (
          <div key={i}>
            <SectionReveal delay={delay}>
              <SectionLabel accent={color}>{s.eyebrow}</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.4vw, 2.4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '0.75rem' }}>
                {s.heading}
              </h2>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '680px', marginBottom: '2rem' }}>
                {s.description}
              </p>
            </SectionReveal>

            <div className="pitch-deck-grid" style={{
              display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(240px, 380px)',
              gap: 'clamp(1.5rem, 3.5vw, 2.5rem)', alignItems: 'center'
            }}>
              {/* Info + CTAs */}
              <SectionReveal delay={0.05}>
                <div className="glass-panel" style={{
                  padding: 'clamp(1.5rem, 3vw, 2.25rem)', height: '100%',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center',
                  borderRadius: '18px',
                  background: 'rgba(17, 28, 46, 0.4)',
                  backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                  border: `1px solid ${color}22`, boxShadow: '0 16px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.03)'
                }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    width: 'fit-content', marginBottom: '1.1rem',
                    padding: '0.35rem 0.8rem', borderRadius: '9999px',
                    fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    background: `${color}12`, color, border: `1px solid ${color}30`
                  }}>
                    <FileText size={13} aria-hidden="true" /> {s.fileName}
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <a
                      href={s.assetPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.viewLabel} (opens in a new tab)`}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.8rem 1.5rem', borderRadius: '10px',
                        background: 'linear-gradient(135deg, #4F7CCF, #335EAA)',
                        border: '1px solid rgba(79, 124, 207, 0.3)',
                        color: '#fff', fontSize: '0.85rem', fontWeight: 600,
                        cursor: 'pointer', fontFamily: 'var(--font-body)', textDecoration: 'none',
                        transition: 'all 0.25s', boxShadow: '0 4px 16px rgba(79, 124, 207, 0.3)'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.boxShadow = '0 6px 24px rgba(79, 124, 207, 0.45)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(79, 124, 207, 0.3)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {s.viewLabel} <ExternalLink size={15} aria-hidden="true" />
                    </a>
                    <a
                      href={s.assetPath}
                      download={s.fileName}
                      aria-label={`${s.downloadLabel} ${s.fileName}`}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.8rem 1.5rem', borderRadius: '10px',
                        background: 'rgba(79, 124, 207, 0.08)',
                        border: '1px solid rgba(79, 124, 207, 0.25)',
                        color: '#A8C0E8', fontSize: '0.85rem', fontWeight: 600,
                        cursor: 'pointer', fontFamily: 'var(--font-body)', textDecoration: 'none',
                        transition: 'all 0.25s'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(79, 124, 207, 0.16)';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(79, 124, 207, 0.08)';
                        e.currentTarget.style.color = '#A8C0E8';
                      }}
                    >
                      <Download size={15} aria-hidden="true" /> {s.downloadLabel}
                    </a>
                  </div>
                </div>
              </SectionReveal>

              {/* Document preview */}
              <SectionReveal delay={0.1}>
                <a
                  href={s.assetPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.viewLabel} (opens in a new tab)`}
                  className="pitch-deck-preview"
                  style={{
                    display: 'block', position: 'relative', textDecoration: 'none',
                    aspectRatio: '1 / 1.35', borderRadius: '18px', overflow: 'hidden',
                    background: 'linear-gradient(160deg, rgba(19,39,61,0.9) 0%, rgba(12,34,58,0.82) 55%, rgba(12,30,52,0.92) 100%)',
                    border: `1px solid ${color}22`,
                    boxShadow: '0 24px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
                    transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = color + '50'; e.currentTarget.style.boxShadow = `0 28px 70px rgba(0,0,0,0.5), 0 0 24px ${color}15`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = color + '22'; e.currentTarget.style.boxShadow = '0 24px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)'; }}
                >
                  <div style={{ position: 'absolute', inset: '10%', background: `radial-gradient(circle, ${color}1f, transparent 70%)`, filter: 'blur(45px)', pointerEvents: 'none' }} />
                  <div style={{
                    position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', gap: '0.9rem', padding: '2rem', zIndex: 1
                  }}>
                    <div style={{
                      width: '64px', height: '64px', borderRadius: '16px',
                      background: `linear-gradient(135deg, ${color}40, ${color}12)`,
                      border: `1px solid ${color}38`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                      boxShadow: `0 12px 28px rgba(0,0,0,0.35)`
                    }}>
                      <FileText size={28} aria-hidden="true" />
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700,
                      letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)'
                    }}>
                      Pitch Deck
                    </span>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center',
                      fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 600, color
                    }}>
                      {s.viewLabel} <ExternalLink size={13} style={{ marginLeft: '0.35rem' }} aria-hidden="true" />
                    </div>
                  </div>
                  )}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${color}, transparent 90%)` }} />
                </a>
              </SectionReveal>
            </div>

            <style>{`
              @media (max-width: 900px) {
                .pitch-deck-grid { grid-template-columns: 1fr !important; }
                .pitch-deck-preview { max-width: 340px; margin: 0 auto; width: 100%; }
              }
              @media (max-width: 560px) {
                .pitch-deck-preview { max-width: 300px; }
              }
            `}</style>
          </div>
        );
      case 'vision':
        return (
          <SectionReveal key={i} delay={delay}>
            <div style={{
              maxWidth: '860px', margin: '0 auto', padding: 'clamp(2rem, 4vw, 3.25rem)',
              borderRadius: '20px', textAlign: 'center',
              background: 'linear-gradient(150deg, rgba(19,39,61,0.9) 0%, rgba(12,34,58,0.82) 55%, rgba(12,30,52,0.92) 100%)',
              backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(79,124,207,0.16)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)'
            }}>
              <SectionLabel accent={color}>{s.eyebrow}</SectionLabel>
              <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '2.4rem', color, lineHeight: 1, marginBottom: '1rem' }}>“</span>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 2.6vw, 1.7rem)', fontWeight: 600, color: '#fff', lineHeight: 1.5, margin: '0 auto 1.5rem', maxWidth: '32rem' }}>
                {s.quote}
              </p>
            </div>
          </SectionReveal>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ backgroundColor: '#050914', minHeight: '100vh' }}>

      {/* ══ HERO ═══════════════════════════════════════════════════ */}
      <section className="project-hero" style={{
        position: 'relative', overflow: 'hidden',
        minHeight: 'clamp(30rem, 66vh, 44rem)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(6.5rem, 12vh, 8rem) clamp(1.25rem, 4vw, 3rem) clamp(3rem, 6vw, 5rem)'
      }}>
        {PRODUCT_HERO_IMAGES[project.id] ? (
          <img src={PRODUCT_HERO_IMAGES[project.id]} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, filter: 'brightness(0.65) saturate(0.8)' }} />
        ) : (
          <div style={{ position: 'absolute', inset: 0, backgroundColor: '#0C1E34' }} />
        )}

        {/* Ambient orbs */}
        <div style={{
          position: 'absolute', top: '-8rem', right: '-4rem',
          width: '26rem', height: '26rem', borderRadius: '50%',
          background: `radial-gradient(circle, ${color}30, transparent 70%)`,
          filter: 'blur(90px)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '-10rem', left: '-8rem',
          width: '30rem', height: '30rem', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(51, 94, 170, 0.28), transparent 70%)',
          filter: 'blur(100px)', pointerEvents: 'none'
        }} />

        {/* Faint grid pattern */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} aria-hidden="true">
          <defs>
            <pattern id="project-hero-grid" width="44" height="44" patternUnits="userSpaceOnUse">
              <path d="M44 0H0V44" fill="none" stroke="rgba(79,124,207,0.06)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#project-hero-grid)" />
        </svg>

        {/* Fade overlays */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(5,9,20,0.55) 0%, rgba(5,9,20,0) 35%, rgba(5,9,20,0) 62%, #050914 100%)'
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to right, ${color}0A, transparent 60%)`
        }} />

        {/* Back button + breadcrumbs */}
        <div style={{
          position: 'absolute', top: 'clamp(1rem, 3vw, 2rem)', left: 'clamp(1rem, 3vw, 2rem)',
          zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.75rem'
        }}>
          <button
            onClick={() => onNavigate('/projects')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 1rem', borderRadius: '8px',
              background: 'rgba(17, 28, 46, 0.6)', backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontWeight: 500,
              cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(17, 28, 46, 0.8)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(17, 28, 46, 0.6)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
            }}
          >
            <ArrowLeft size={14} /> Back to Projects
          </button>
          <div style={{
            padding: '0.35rem 0.75rem', borderRadius: '8px',
            background: 'rgba(17, 28, 46, 0.6)', backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.08)'
          }}>
            <Breadcrumbs onNavigate={onNavigate} items={[
              { label: 'Home', path: '/' },
              { label: 'Public Projects', path: '/projects' },
              { label: project.name, active: true }
            ]} />
          </div>
        </div>

        {/* Hero inner */}
        <div className="project-hero-inner" style={{
          position: 'relative', zIndex: 2, width: '100%', maxWidth: '1100px',
          margin: '0 auto', display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 420px',
          gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'center'
        }}>
          {/* Copy */}
          <div className="project-hero-text" style={{ marginTop: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {PRODUCT_LOGO_IMAGES[project.id] && (
                <img
                  src={PRODUCT_LOGO_IMAGES[project.id]}
                  alt={`${project.name} logo`}
                  style={{ height: '44px', width: 'auto', borderRadius: '10px' }}
                />
              )}
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 600,
                letterSpacing: '0.14em', textTransform: 'uppercase', color: '#4F7CCF'
              }}>
                ❖ What We're Building
              </span>
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
              fontWeight: 800, lineHeight: 1.1, marginBottom: '1.25rem',
              backgroundImage: 'linear-gradient(90deg, #fff 0%, #CDDDFF 55%, #4F7CCF 115%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'
            }}>
              {project.name}
            </h1>
            <p className="hero-desc" style={{
              fontFamily: 'var(--font-body)', fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '560px'
            }}>
              {project.description}
            </p>
            <div className="hero-meta" style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.75rem'
            }}>
              <StatusBadge status={project.status} size="md" />
              <span style={{
                padding: '0.3rem 0.8rem', borderRadius: '8px', fontSize: '0.65rem',
                fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                background: `${color}14`, color, border: `1px solid ${color}30`,
                fontFamily: 'var(--font-mono)'
              }}>
                {project.category}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>
                · Built through Cristedor Labs
              </span>
            </div>
          </div>

          {/* Product mock panel */}
          <div className="project-mock-wrap">
            <div className="project-mock" style={{ position: 'relative', maxWidth: '400px', width: '100%', margin: '0 auto' }}>
              <div style={{
                position: 'absolute', inset: '12%',
                background: `radial-gradient(circle, ${color}26, transparent 70%)`,
                filter: 'blur(50px)', zIndex: 0,
                animation: 'mockFloat 7s ease-in-out infinite'
              }} />
              <div className="project-mock-panel" style={{
                position: 'relative', zIndex: 1, borderRadius: '24px', overflow: 'hidden',
                background: 'linear-gradient(160deg, rgba(19,39,61,0.9) 0%, rgba(12,34,58,0.82) 55%, rgba(12,30,52,0.92) 100%)',
                border: '1px solid rgba(79,124,207,0.16)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)'
              }}>
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} aria-hidden="true">
                  <defs>
                    <pattern id={`product-grid-${project.id}`} width="32" height="32" patternUnits="userSpaceOnUse">
                      <path d="M32 0H0V32" fill="none" stroke="rgba(79,124,207,0.07)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#product-grid-${project.id})`} />
                </svg>
                <div style={{ height: '3px', background: `linear-gradient(90deg, ${color}, transparent 90%)` }} />
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}90` }} />
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.14)' }} />
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.14)' }} />
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700,
                    letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)'
                  }}>
                    Preview
                  </span>
                </div>
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', padding: '1.75rem 1.5rem 1.25rem' }}>
                  <div className="project-mock-icon" style={{
                    width: '84px', height: '84px', borderRadius: '22px',
                    background: `linear-gradient(135deg, ${color}40, ${color}10)`,
                    border: `1px solid ${color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff',
                    boxShadow: `0 12px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)`
                  }}>
                    <div style={{ transform: 'scale(1.35)' }}>{projectIcons[project.id]}</div>
                  </div>
                </div>
                <div style={{ position: 'relative', textAlign: 'center', padding: '0 1.5rem' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700,
                    color: '#fff', marginBottom: '0.3rem'
                  }}>
                    {project.name}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 600,
                    letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
                    margin: 0
                  }}>
                    {project.category}
                  </p>
                </div>
                <div style={{ position: 'relative', padding: '1.5rem' }}>
                  <div style={{
                    borderRadius: '12px', border: '1px solid rgba(79,124,207,0.14)',
                    background: 'rgba(5,9,20,0.5)', padding: '0.9rem 1rem',
                    display: 'flex', alignItems: 'center', gap: '0.75rem'
                  }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, flexShrink: 0, boxShadow: `0 0 8px ${color}80` }} />
                    <div style={{ flex: 1, height: '4px', borderRadius: '99px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                      <div style={{ width: '72%', height: '100%', background: `linear-gradient(90deg, ${color}, ${color}80)`, borderRadius: '99px' }} />
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.58rem', fontWeight: 700,
                      letterSpacing: '0.08em', textTransform: 'uppercase', color: color, flexShrink: 0
                    }}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTENT ═══════════════════════════════════════════════ */}
      <div className="container" style={{ padding: '0 1.5rem' }}>

        {/* At a glance */}
        <div className="project-stats" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '1.25rem', margin: '-2.5rem 0 3.5rem', position: 'relative', zIndex: 3
        }}>
          {stats.map((stat, i) => (
            <div key={i} className="project-stat-card" style={{
              padding: '1.25rem 1.5rem', borderRadius: '16px',
              background: 'rgba(17, 28, 46, 0.4)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(79, 124, 207, 0.12)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)',
              transition: 'border-color 0.25s'
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = stat.color + '40'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.12)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
                <span style={{ display: 'inline-flex', color: stat.color }}>{stat.icon}</span>
                <span style={{
                  fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 600,
                  color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em', textTransform: 'uppercase'
                }}>
                  {stat.label}
                </span>
              </div>
              {stat.badge ? (
                <StatusBadge status={stat.value} size="md" />
              ) : (
                <p style={{
                  fontFamily: 'var(--font-display)', fontSize: '0.92rem', fontWeight: 600,
                  color: stat.color, lineHeight: 1.4, margin: 0
                }}>
                  {stat.value}
                </p>
              )}
            </div>
          ))}
        </div>

        {hasSections ? (
          <React.Fragment>
            {/* Scroll-spy nav */}
            <div style={{
              display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '3.5rem',
              padding: '0.75rem 1rem', borderRadius: '14px',
              background: 'rgba(17, 28, 46, 0.4)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(79,124,207,0.1)'
            }}>
              {sections.map((s, i) => (
                <button key={i} onClick={() => scrollToSection(`sec-${i}`)} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  padding: '0.4rem 0.75rem', borderRadius: '999px',
                  fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: 600,
                  background: activeSection === `sec-${i}` ? 'rgba(79,124,207,0.15)' : 'rgba(17,28,46,0.5)',
                  color: activeSection === `sec-${i}` ? '#4F7CCF' : 'rgba(255,255,255,0.4)',
                  border: `1px solid ${activeSection === `sec-${i}` ? 'rgba(79,124,207,0.4)' : 'rgba(79,124,207,0.18)'}`,
                  cursor: 'pointer', transition: 'all 0.25s', whiteSpace: 'nowrap'
                }}>
                  <span style={{ opacity: 0.6 }}>{String(i + 1).padStart(2, '0')}</span> {sectionNavLabel(s)}
                </button>
              ))}
            </div>

            {/* Sections */}
            {sections.map((s, i) => (
              <div key={i} id={`sec-${i}`} ref={setSectionRef(`sec-${i}`)} style={{
                paddingBottom: '3rem', scrollMarginTop: '5rem',
                borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.05)',
                paddingTop: i === 0 ? 0 : '2.5rem'
              }}>
                {renderSection(s, i)}
              </div>
            ))}
          </React.Fragment>
        ) : (
          /* Fallback: simple About + sidebar for projects without rich content */
          <div className="project-content" style={{
            display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: '3rem',
            paddingBottom: '2rem', alignItems: 'start'
          }}>
            <div>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700,
                color: '#fff', marginBottom: '1.25rem',
                display: 'flex', alignItems: 'center', gap: '0.75rem'
              }}>
                <span style={{
                  display: 'inline-flex', width: '38px', height: '38px', borderRadius: '10px',
                  background: `${color}15`, border: `1px solid ${color}30`,
                  alignItems: 'center', justifyContent: 'center', color, flexShrink: 0
                }}>
                  {projectIcons[project.id]}
                </span>
                About {project.name}
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.75, marginBottom: '2rem'
              }}>
                {project.description}
              </p>

              {project.featureTitle && (
                <div style={{
                  display: 'flex', gap: '1rem', padding: '1.5rem', borderRadius: '16px',
                  background: 'rgba(17, 28, 46, 0.4)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: `1px solid ${color}25`, borderLeft: `3px solid ${color}`,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                }}>
                  <span style={{
                    display: 'inline-flex', width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                    background: `${color}15`, border: `1px solid ${color}30`,
                    alignItems: 'center', justifyContent: 'center', color
                  }}>
                    <Sparkles size={16} />
                  </span>
                  <div>
                    <span style={{
                      fontSize: '0.72rem', fontWeight: 700, color,
                      fontFamily: 'var(--font-mono)', letterSpacing: '0.05em',
                      textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem'
                    }}>
                      {project.featureTitle}
                    </span>
                    <p style={{
                      fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: 0
                    }}>
                      {project.featureDescription}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="project-sidebar" style={{
              padding: '1.75rem', borderRadius: '18px',
              background: 'linear-gradient(150deg, rgba(19,39,61,0.9) 0%, rgba(12,34,58,0.8) 55%, rgba(12,30,52,0.92) 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(79, 124, 207, 0.14)',
              boxShadow: '0 16px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
              position: 'sticky', top: '6rem'
            }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px',
                background: `linear-gradient(135deg, ${color}40, ${color}12)`,
                border: `1px solid ${color}35`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', marginBottom: '1rem',
                boxShadow: `0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)`
              }}>
                {PRODUCT_LOGO_IMAGES[project.id] ? (
                  <img
                    src={PRODUCT_LOGO_IMAGES[project.id]}
                    alt={`${project.name} logo`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '13px' }}
                  />
                ) : projectIcons[project.id]}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700,
                color: '#fff', marginBottom: '0.75rem'
              }}>
                {project.name}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <StatusBadge status={project.status} />
                <span style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.4)' }}>Built through Cristedor Labs</span>
              </div>
              <button
                onClick={() => onNavigate('/projects')}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '0.5rem', padding: '0.8rem 1.25rem', borderRadius: '10px',
                  background: 'linear-gradient(135deg, #4F7CCF, #335EAA)',
                  border: '1px solid rgba(79, 124, 207, 0.3)',
                  color: '#fff', fontSize: '0.85rem', fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'var(--font-body)', textDecoration: 'none',
                  transition: 'all 0.25s',
                  boxShadow: '0 4px 16px rgba(79, 124, 207, 0.3)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(79, 124, 207, 0.45)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(79, 124, 207, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Explore More Projects <ArrowRight size={14} />
              </button>
              <button
                onClick={() => onNavigate('/portfolio')}
                style={{
                  width: '100%', marginTop: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '0.5rem', padding: '0.7rem 1.25rem', borderRadius: '10px',
                  background: 'rgba(79, 124, 207, 0.08)',
                  border: '1px solid rgba(79, 124, 207, 0.2)',
                  color: '#A8C0E8', fontSize: '0.8rem', fontWeight: 500,
                  cursor: 'pointer', fontFamily: 'var(--font-body)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(79, 124, 207, 0.16)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(79, 124, 207, 0.08)';
                  e.currentTarget.style.color = '#A8C0E8';
                }}
              >
                Back to Portfolio
              </button>
            </div>
          </div>
        )}

        {/* ══ RELATED PROJECTS ═══════════════════════════════════ */}
        {related.length > 0 && (
          <section style={{ paddingBottom: '3rem' }}>
            <div style={{
              height: '1px', marginBottom: '2.5rem',
              background: 'linear-gradient(90deg, transparent, rgba(79,124,207,0.2), transparent)'
            }} />
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700,
              color: '#fff', marginBottom: '1.5rem'
            }}>
              More Public Projects
            </h2>
            <div className="related-grid" style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem'
            }}>
              {related.map(item => {
                const itemColor = PRODUCT_ACCENTS[item.id] || '#4F7CCF';
                return (
                  <div
                    key={item.id}
                    onClick={() => onNavigate('/projects', { id: item.id })}
                    style={{
                      padding: '1.5rem', borderRadius: '16px', cursor: 'pointer',
                      background: 'rgba(17, 28, 46, 0.4)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: '1px solid rgba(79, 124, 207, 0.1)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = itemColor + '50';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.3), 0 0 20px ${itemColor}10`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.9rem' }}>
                      <span style={{
                        display: 'inline-flex', width: '34px', height: '34px', borderRadius: '9px',
                        background: `${itemColor}15`, border: `1px solid ${itemColor}25`,
                        alignItems: 'center', justifyContent: 'center', color: itemColor
                      }}>
                        {projectIcons[item.id]}
                      </span>
                      <StatusBadge status={item.status} />
                      <span style={{ marginLeft: 'auto', display: 'inline-flex', color: 'rgba(255,255,255,0.3)', transition: 'color 0.2s' }}>
                        <ArrowRight size={16} />
                      </span>
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700,
                      color: '#fff', marginBottom: '0.4rem', lineHeight: 1.25
                    }}>
                      {item.name}
                    </h3>
                    <p style={{
                      fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6,
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                    }}>
                      {item.description}
                    </p>
                    <div style={{
                      marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem',
                      fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700,
                      letterSpacing: '0.08em', textTransform: 'uppercase', color: itemColor
                    }}>
                      View Project <ArrowRight size={12} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* ══ RESPONSIVE ═══════════════════════════════════════════ */}
      <style>{`
        @keyframes mockFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes heroFade {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: none; }
        }
        .project-hero-inner > * { animation: heroFade 0.6s ease both; }
        .project-hero-inner > *:nth-child(2) { animation-delay: 0.12s; }

        @media (max-width: 1024px) {
          .project-hero-inner {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .project-hero-text { text-align: center; }
          .hero-meta { justify-content: center; }
          .hero-desc { margin-left: auto; margin-right: auto; }
          .project-mock-wrap { margin-top: 0.5rem; }
        }
        @media (max-width: 900px) {
          .project-content {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .project-sidebar {
            position: static !important;
          }
        }
        @media (max-width: 768px) {
          .project-hero {
            min-height: auto !important;
            padding: clamp(5.5rem, 14vh, 7rem) 1.25rem 2.5rem !important;
          }
          .project-stats {
            margin: -1.75rem 0 2.5rem !important;
            gap: 0.75rem !important;
          }
        }
        @media (max-width: 560px) {
          .project-hero-inner { gap: 2rem !important; }
          .project-mock { max-width: 330px !important; }
          .project-stat-card { padding: 1rem 1.1rem !important; }
        }
        @media (max-width: 480px) {
          .project-hero { padding: clamp(5rem, 12vh, 6rem) 1rem 2rem !important; }
          .project-hero h1 { font-size: 1.85rem !important; }
          .project-mock-panel { border-radius: 18px !important; }
          .project-mock-icon { width: 68px !important; height: 68px !important; border-radius: 18px !important; }
          .project-sidebar { padding: 1.35rem !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .project-hero-inner > * { animation: none !important; }
          .project-mock > div:first-child { animation: none !important; }
          .glass-panel, .glass-panel-interactive { transition: none !important; }
        }
      `}</style>
    </div>
  );
};
