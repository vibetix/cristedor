import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RoutePath } from '../types';
import {
  companyVision, whoWeAre, founderStory, brandTimeline,
  coreValues, operatingPhilosophy, industries, groupStats,
  globalHubs, companyCards, cultureValues, governancePrinciples,
  sustainabilityAreas, faqItems
} from '../data/aboutData';
import { leadershipData } from '../data/leadershipData';
import {
  Shield, Clock, Network, Rocket, TrendingUp, Zap, FlaskConical,
  Building2, ChevronRight, ArrowRight, MapPin,
  ExternalLink, ChevronUp, Globe2, Eye, Lightbulb, Users, Search,
  Wrench, GraduationCap, Monitor, Play, BarChart3, Leaf, Heart,
  FileText, File, Package, Sparkles, BookOpen, Brain, Tv,
  CheckCircle, Minus
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: RoutePath) => void;
}

const I = {
  clock: Clock, network: Network, shield: Shield, building: Building2,
  rocket: Rocket, globe: Globe2, flask: FlaskConical, trending: TrendingUp,
  zap: Zap, search: Search, hammer: Wrench, 'trending-up': TrendingUp,
  monitor: Monitor, brain: Brain, play: Play, graduation: GraduationCap,
  chart: BarChart3, lightbulb: Lightbulb, eye: Eye, leaf: Leaf,
  heart: Heart, minus: Minus, 'check-circle': CheckCircle,
  'file-text': FileText, file: File, package: Package, sparkle: Sparkles,
  book: BookOpen, users: Users,
} as Record<string, React.FC<{ size?: number; color?: string; style?: React.CSSProperties }>>;

const VC: Record<string, { accent: string; bg: string; border: string }> = {
  cyan: { accent: '#4F7CCF', bg: 'rgba(0,240,255,0.06)', border: 'rgba(0,240,255,0.15)' },
  gold: { accent: '#D4AF37', bg: 'rgba(212,175,55,0.06)', border: 'rgba(212,175,55,0.15)' },
  purple: { accent: '#8B5CF6', bg: 'rgba(139,92,246,0.06)', border: 'rgba(139,92,246,0.15)' },
  green: { accent: '#10B981', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.15)' },
};

const companyIcons: Record<string, React.ComponentType<any>> = {
  'cristedor-labs': Sparkles,
  'cristedor-media': Tv,
};

function useInView(threshold = 0.15) {
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
}

function useCountUp(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, end, duration]);
  return count;
}

const SectionHeader: React.FC<{ tag: string; title: string; desc?: string; align?: string }> = ({ tag, title, desc, align = 'center' }) => (
  <div style={{ textAlign: align as React.CSSProperties['textAlign'], marginBottom: 'clamp(2rem, 3vw, 3rem)' }}>
    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#4F7CCF', marginBottom: '0.75rem' }}>{'\u2756'} {tag}</p>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 800, color: '#fff', marginBottom: desc ? '0.75rem' : 0 }}>{title}</h2>
    {desc && <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.88rem, 1.3vw, 1rem)', color: 'rgba(255,255,255,0.45)', maxWidth: '600px', margin: align === 'center' ? '0 auto' : 0, lineHeight: 1.65 }}>{desc}</p>}
  </div>
);

function Breadcrumbs({ items }: { items: { label: string; onClick?: () => void }[] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '2rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <ChevronRight size={11} color="rgba(255,255,255,0.25)" />}
          {item.onClick ? (
            <button onClick={item.onClick} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'rgba(255,255,255,0.4)', fontFamily: 'inherit', fontSize: 'inherit', transition: 'color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#4F7CCF'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
            >{item.label}</button>
          ) : (
            <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

function AnimatedStat({ value, prefix, suffix, label }: { value: string; prefix?: string; suffix?: string; label: string }) {
  const { ref, visible } = useInView(0.3);
  const numericVal = parseInt(value, 10);
  const isNumeric = !isNaN(numericVal);
  const count = useCountUp(isNumeric ? numericVal : 0, 2000, visible);
  return (
    <div ref={ref} className="about-stat" style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: '0.5rem' }}>
        {prefix || ''}{isNumeric ? count : value}{suffix || ''}
      </p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>{label}</p>
    </div>
  );
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
  const [hoveredHub, setHoveredHub] = useState<number | null>(null);
  const [hoveredLeader, setHoveredLeader] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);
  const [hoveredCulture, setHoveredCulture] = useState<number | null>(null);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setScrollProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroStats = useInView(0.3);
  const whoWeAreSec = useInView(0.1);
  const visionSec = useInView(0.1);
  const missionSec = useInView(0.1);
  const companiesSec = useInView(0.1);
  const valuesSection = useInView(0.1);
  const philosophySec = useInView(0.1);
  const industriesSec = useInView(0.1);
  const impactSec = useInView(0.1);
  const brandTimelineSec = useInView(0.1);
  const founderSec = useInView(0.1);
  const leadershipSection = useInView(0.1);
  const hubsSection = useInView(0.1);
  const cultureSec = useInView(0.1);
  const govSec = useInView(0.1);
  const sustainSec = useInView(0.1);
  const careersSec = useInView(0.1);
  const faqSec = useInView(0.1);

  const anim = useCallback((sec: { visible: boolean }, idx: number, delay = 0.1) => {
    if (prefersReducedMotion) return { opacity: 1 as const };
    return {
      opacity: sec.visible ? undefined : 0,
      animation: sec.visible ? `aboutRevealUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * delay}s forwards` : 'none',
    };
  }, [prefersReducedMotion]);

  return (
    <div style={{ backgroundColor: '#050914', minHeight: '100vh', position: 'relative' }}>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Organization',
        name: 'Cristedor Group', url: 'https://cristedor.com',
        description: whoWeAre.description,
        foundingDate: '2024',
        address: { '@type': 'PostalAddress', addressLocality: 'Accra', addressCountry: 'GH' },
        founder: { '@type': 'Person', name: 'Dormenikpi Kwaku Precious', jobTitle: 'Founder' },
        knowsAbout: ['Holding Company', 'Technology', 'Artificial Intelligence', 'Media'],
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cristedor.com' },
          { '@type': 'ListItem', position: 2, name: 'About', item: 'https://cristedor.com/about' },
        ],
      })}} />

      {/* ══ SCROLL PROGRESS ═══════════════════════════════════ */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', zIndex: 1000, background: 'rgba(17, 28, 46, 0.5)' }} role="progressbar" aria-valuenow={Math.round(scrollProgress)} aria-valuemin={0} aria-valuemax={100}>
        <div style={{ height: '100%', width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #4F7CCF, #335EAA)', transition: 'width 0.1s linear', boxShadow: '0 0 10px rgba(79, 124, 207, 0.5)' }} />
      </div>

      {/* ══ 1. HERO ═══════════════════════════════════════════ */}
      <section className="about-hero" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(5rem, 10vw, 7rem) 2rem clamp(3rem, 6vw, 4.5rem)' }} aria-label="About Cristedor Group">
        <div style={{ position: 'absolute', top: '-25%', left: '10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,124,207,0.1), transparent 70%)', filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20%', right: '10%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(51,94,170,0.08), transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '30%', right: '25%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,240,255,0.05), transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Breadcrumbs items={[{ label: 'Home', onClick: () => onNavigate('/') }, { label: 'About' }]} />
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: '#4F7CCF', marginBottom: '1rem' }}>{'\u2756'} ABOUT THE GROUP</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '1.25rem' }}>
              Building Ventures for{' '}
              <span style={{ color: 'transparent', backgroundImage: 'linear-gradient(90deg, #4F7CCF 0%, #335EAA 50%, #4F7CCF 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>the Long Term</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, maxWidth: '600px', margin: '0 auto' }}>
              {whoWeAre.description}
            </p>
          </div>
          <div ref={heroStats.ref} className="about-hero-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginTop: 'clamp(2.5rem, 4vw, 3.5rem)', maxWidth: '800px', margin: 'clamp(2.5rem, 4vw, 3.5rem) auto 0' }}>
            {groupStats.map((stat, i) => (
              <AnimatedStat key={i} value={stat.value} prefix={stat.prefix} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(to top, #050914, transparent)', pointerEvents: 'none' }} />
      </section>

      <div className="container">

        {/* ══ 2. WHO WE ARE ═════════════════════════════════════ */}
        <section ref={whoWeAreSec.ref} style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
          <SectionHeader tag="IDENTITY" title={whoWeAre.headline} desc={whoWeAre.description} />
          <div className="about-facts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.25rem', maxWidth: '900px', margin: '0 auto' }}>
            {whoWeAre.facts.map((fact, idx) => (
              <div key={idx} style={{ ...anim(whoWeAreSec, idx), textAlign: 'center', padding: '1.25rem 0.75rem', borderRadius: '14px', background: 'rgba(17, 28, 46, 0.4)', border: '1px solid rgba(79, 124, 207, 0.1)' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 1.8vw, 1.3rem)', fontWeight: 700, color: '#fff', marginBottom: '0.35rem' }}>{fact.value}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>{fact.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ 3. COMPANY VISION ═════════════════════════════════ */}
        <section ref={visionSec.ref} style={{ padding: 'clamp(3rem, 6vw, 5rem) 0', borderBottom: '1px solid rgba(79, 124, 207, 0.08)', textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#D4AF37', marginBottom: '1rem' }}>{'\u2756'} VISION</p>
            <blockquote style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 700, color: '#fff', lineHeight: 1.35, margin: 0, padding: 0, fontStyle: 'normal' }}>
              "{companyVision.headline}"
            </blockquote>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.88rem, 1.3vw, 1rem)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginTop: '1.5rem', maxWidth: '650px', margin: '1.5rem auto 0' }}>
              {companyVision.summary}
            </p>
          </div>
        </section>

        {/* ══ 4. MISSION STATEMENT ═══════════════════════════════ */}
        <section ref={missionSec.ref} style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
          <SectionHeader tag="MISSION" title="What We Do Today" />
          <div className="about-mission" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 4vw, 3rem)', alignItems: 'center' }}>
            <div style={{ position: 'relative', ...anim(missionSec, 0) }}>
              <div style={{ position: 'absolute', top: '-1.5rem', left: '-1rem', width: '4px', height: 'calc(100% + 1rem)', background: 'linear-gradient(180deg, #D4AF37, #D4AF3733)', borderRadius: '4px' }} />
              <blockquote style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700, color: '#fff', lineHeight: 1.3, paddingLeft: '1.5rem', margin: 0 }}>
                "We build ventures around real problems, practical technology, and long-term thinking."
              </blockquote>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#D4AF37', marginTop: '1rem', paddingLeft: '1.5rem' }}>— Dormenikpi Kwaku Precious, Founder</p>
            </div>
            <div style={{ ...anim(missionSec, 1) }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.88rem, 1.3vw, 1rem)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                Cristedor Group develops and supports ventures rather than simply treating them as passive investments. The Group provides direction, shared learning, and long-term ownership as the ventures develop.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.88rem, 1.3vw, 1rem)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                Today, the Group is in its early stages — being built in Ghana, operating online-first, and developing products through Cristedor Labs and Cristedor Media.
              </p>
              <button onClick={() => onNavigate('/portfolio')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.25rem', borderRadius: '10px', background: 'rgba(79, 124, 207, 0.12)', border: '1px solid rgba(79, 124, 207, 0.25)', color: '#4F7CCF', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(79, 124, 207, 0.2)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(79, 124, 207, 0.12)'; e.currentTarget.style.transform = 'translateX(0)'; }}
              >Our Ventures <ArrowRight size={14} /></button>
            </div>
          </div>
        </section>

        {/* ══ 5. OUR VENTURES ══════════════════════════════════ */}
        <section ref={companiesSec.ref} style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
          <SectionHeader tag="VENTURES" title="Our Ventures" desc="The ventures Cristedor Group is currently building." />
          <div className="about-companies-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem', maxWidth: '800px', margin: '0 auto' }}>
            {companyCards.map((company, idx) => {
              const IconComp = companyIcons[company.id];
              const isHovered = hoveredCompany === company.id;
              return (
                <div key={company.id}
                  className="about-company-card"
                  onMouseEnter={() => setHoveredCompany(company.id)}
                  onMouseLeave={() => setHoveredCompany(null)}
                  style={{
                    ...anim(companiesSec, idx), borderRadius: '20px', overflow: 'hidden', cursor: 'default', position: 'relative',
                    minHeight: '340px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    padding: '2rem',
                    border: `1px solid ${isHovered ? 'rgba(79,124,207,0.5)' : 'rgba(255,255,255,0.08)'}`,
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                    boxShadow: isHovered ? '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(79,124,207,0.12)' : '0 10px 30px rgba(0,0,0,0.25)',
                  }}
                >
                  <img src={company.bg} alt={company.name} style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%',
                    objectFit: 'cover',
                    filter: isHovered ? 'brightness(0.7) contrast(1.1)' : 'brightness(0.45) contrast(1.05)',
                    transition: 'filter 0.4s, transform 0.6s',
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                  }} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, rgba(5,9,20,0.1) 0%, rgba(5,9,20,0.92) 100%)',
                  }} />
                  <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '14px',
                      background: company.iconGradient,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}>
                      {IconComp && <IconComp size={22} color="#fff" />}
                    </div>
                    <span style={{
                      padding: '0.3rem 0.75rem', borderRadius: '8px', fontSize: '0.7rem',
                      fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                      background: 'rgba(79,124,207,0.2)', color: '#4F7CCF',
                      border: '1px solid rgba(79,124,207,0.3)',
                      fontFamily: 'var(--font-mono)', backdropFilter: 'blur(8px)',
                    }}>Being Established</span>
                  </div>
                  <div style={{ position: 'relative', zIndex: 2, marginTop: '2.5rem' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: '0.5rem' }}>{company.industry}</p>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.65rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem', lineHeight: 1.2 }}>{company.name}</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, marginBottom: '1.25rem' }}>{company.description}</p>
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)',
                      fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)',
                    }}>
                      <button
                        onClick={() => onNavigate(company.exploreRoute as RoutePath)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 1rem', borderRadius: '8px', background: 'rgba(79, 124, 207, 0.12)', border: '1px solid rgba(79, 124, 207, 0.25)', color: '#4F7CCF', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.25s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(79, 124, 207, 0.25)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(79, 124, 207, 0.12)'; }}
                      >Explore <ArrowRight size={13} /></button>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#4F7CCF', fontWeight: 600 }}>
                        <span>View</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══ 6. CORE VALUES ═════════════════════════════════════ */}
        <section ref={valuesSection.ref} style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
          <SectionHeader tag="PRINCIPLES" title="Core Values" desc="The principles that guide how we build." />
          <div className="about-values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {coreValues.map((val, idx) => {
              const colors = VC[val.glowColor];
              const Icon = I[val.id] || Shield;
              const isH = hoveredValue === val.id;
              return (
                <div key={val.id} className="about-value-card"
                  onMouseEnter={() => setHoveredValue(val.id)} onMouseLeave={() => setHoveredValue(null)}
                  style={{
                    ...anim(valuesSection, idx), padding: 'clamp(1.5rem, 2.5vw, 2rem)', borderRadius: '16px', position: 'relative', overflow: 'hidden', cursor: 'default',
                    background: isH ? colors.bg : 'rgba(17, 28, 46, 0.4)',
                    backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                    border: `1px solid ${isH ? colors.border : 'rgba(79, 124, 207, 0.1)'}`,
                    boxShadow: isH ? `0 0 40px ${colors.accent}15, 0 16px 48px rgba(0,0,0,0.3)` : '0 4px 16px rgba(0,0,0,0.15)',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isH ? 'translateY(-4px)' : 'translateY(0)',
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${colors.accent}, transparent)`, opacity: isH ? 0.8 : 0.3, transition: 'opacity 0.3s' }} />
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${colors.accent}12`, border: `1px solid ${colors.accent}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Icon size={20} color={colors.accent} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '0.35rem' }}>{val.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: colors.accent, lineHeight: 1.5, marginBottom: '0.5rem', fontStyle: 'italic' }}>{val.plainLanguage}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: '1.25rem' }}>{val.description}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {val.points.map((point, i) => (
                      <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)' }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: colors.accent, flexShrink: 0 }} />
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══ 7. OPERATING PHILOSOPHY ═════════════════════════════ */}
        <section ref={philosophySec.ref} style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
          <SectionHeader tag="PROCESS" title="How We Aim to Build Ventures" desc="Our operating philosophy — from research to lasting impact." />
          <div className="about-philosophy-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', maxWidth: '1100px', margin: '0 auto' }}>
            {operatingPhilosophy.map((step, idx) => {
              const Icon = I[step.icon] || Rocket;
              return (
                <div key={step.step} className="about-philosophy-step" style={{ ...anim(philosophySec, idx, 0.12), textAlign: 'center', padding: '1.5rem 1rem', borderRadius: '14px', background: 'rgba(17, 28, 46, 0.4)', border: '1px solid rgba(79, 124, 207, 0.1)', position: 'relative' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(79, 124, 207, 0.12)', border: '1px solid rgba(79, 124, 207, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <Icon size={20} color="#4F7CCF" />
                  </div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#4F7CCF', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '0.4rem' }}>Step {step.step}</p>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{step.title}</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.55 }}>{step.description}</p>
                  {idx < 4 && <div className="about-philosophy-arrow" style={{ position: 'absolute', top: '50%', right: '-1rem', transform: 'translateY(-50%)', color: 'rgba(79, 124, 207, 0.3)' }}><ChevronRight size={18} /></div>}
                </div>
              );
            })}
          </div>
        </section>

        {/* ══ 8. AREAS OF FOCUS ══════════════════════════════════ */}
        <section ref={industriesSec.ref} style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
          <SectionHeader tag="FOCUS" title="Areas of Focus" desc="The areas our ventures are focused on today." />
          <div className="about-industries-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0.875rem', maxWidth: '900px', margin: '0 auto' }}>
            {industries.map((ind, idx) => (
              <div key={ind.name} className="about-industry-card" style={{ ...anim(industriesSec, idx, 0.08), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', padding: '1.5rem 1rem', borderRadius: '14px', background: 'rgba(17, 28, 46, 0.4)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(79, 124, 207, 0.12)', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 4px 16px, rgba(255, 255, 255, 0.03) 0px 1px 0px inset', cursor: 'pointer', transition: '0.3s cubic-bezier(0.16, 1, 0.3, 1)', color: 'rgba(255, 255, 255, 0.5)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = ind.color + '30'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.12)'; e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${ind.color}12`, border: `1px solid ${ind.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s' }}>
                  <img src={ind.img} alt={ind.name} style={{ width: '22px', height: '22px' }} />
                </div>
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-body)', fontWeight: 500, textAlign: 'center', lineHeight: 1.3 }}>{ind.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ══ 9. IMPACT SECTION ══════════════════════════════════ */}
        <section ref={impactSec.ref} style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
          <SectionHeader tag="PROGRESS" title="Honest Progress" desc="Real progress deserves real numbers." />
          <div style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, maxWidth: '560px', margin: '0 auto' }}>
              Cristedor is still early-stage. We will publish verified figures as our ventures launch, reach users, and generate measurable outcomes.
            </p>
          </div>
        </section>

        {/* ══ 10. BRAND STORY TIMELINE ═══════════════════════════ */}
        <section ref={brandTimelineSec.ref} style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
          <SectionHeader tag="JOURNEY" title="Our Story So Far" desc="From a founding vision to the ventures we are building today." />
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="about-brand-timeline" style={{ display: 'flex', gap: '0', position: 'relative', overflowX: 'auto', paddingBottom: '1rem' }}>
              {brandTimeline.map((evt, idx) => (
                <div key={idx} className="about-brand-timeline-item" style={{ ...anim(brandTimelineSec, idx, 0.1), flex: '1 1 0', minWidth: '140px', textAlign: 'center', padding: '0 0.5rem', position: 'relative' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: idx === brandTimeline.length - 1 ? '#D4AF37' : '#4F7CCF', margin: '0 auto 0.75rem', border: '3px solid #050914', boxShadow: `0 0 12px ${idx === brandTimeline.length - 1 ? '#D4AF37' : '#4F7CCF'}50`, position: 'relative', zIndex: 2 }} />
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#4F7CCF', fontWeight: 700, marginBottom: '0.3rem' }}>{evt.year}</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: '0.4rem' }}>{evt.phase}</p>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '0.35rem' }}>{evt.title}</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{evt.description}</p>
                  {idx < brandTimeline.length - 1 && <div className="about-brand-timeline-line" style={{ position: 'absolute', top: '5px', left: 'calc(50% + 10px)', right: 'calc(-50% + 10px)', height: '2px', background: 'linear-gradient(90deg, #4F7CCF40, #4F7CCF20)' }} />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 11. FOUNDER STORY ══════════════════════════════════ */}
        <section ref={founderSec.ref} style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
          <SectionHeader tag="ORIGINS" title={founderStory.headline} />
          <div className="about-founder-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'clamp(2rem, 4vw, 3rem)', alignItems: 'start', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ ...anim(founderSec, 0) }}>
              <div style={{ position: 'relative', marginBottom: '2rem' }}>
                <div style={{ position: 'absolute', top: '-1.5rem', left: '-1rem', width: '4px', height: 'calc(100% + 1rem)', background: 'linear-gradient(180deg, #D4AF37, #D4AF3733)', borderRadius: '4px' }} />
                <blockquote style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: 700, color: '#fff', lineHeight: 1.35, paddingLeft: '1.5rem', margin: 0 }}>
                  "{founderStory.quote}"
                </blockquote>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#D4AF37', marginTop: '0.75rem', paddingLeft: '1.5rem' }}>— {founderStory.quoteAuthor}</p>
              </div>
              {founderStory.paragraphs.map((p, i) => (
                <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: '1rem' }}>{p}</p>
              ))}
            </div>
            <div style={{ ...anim(founderSec, 1) }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem' }}>Key Milestones</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {founderStory.timeline.map((evt, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <span style={{ padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 700, fontFamily: 'var(--font-mono)', background: 'rgba(79, 124, 207, 0.12)', color: '#4F7CCF', border: '1px solid rgba(79, 124, 207, 0.25)', whiteSpace: 'nowrap' }}>{evt.year}</span>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, margin: 0 }}>{evt.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ 12. LEADERSHIP ═════════════════════════════════════ */}
        <section ref={leadershipSection.ref} style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
          <SectionHeader tag="LEADERSHIP" title="Leadership" desc="Cristedor Group is led by its founder, with a small team being assembled as the ventures are established." />
          <div className="about-leaders-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', maxWidth: '640px', margin: '0 auto' }}>
            {leadershipData.map((leader, idx) => {
              const isH = hoveredLeader === leader.id;
              return (
                <div key={leader.id} className="about-leader-card"
                  onMouseEnter={() => setHoveredLeader(leader.id)} onMouseLeave={() => setHoveredLeader(null)}
                  style={{
                    ...anim(leadershipSection, idx, 0.1), borderRadius: '16px', overflow: 'hidden', cursor: 'default', maxWidth: '360px', width: '100%', margin: '0 auto',
                    background: 'rgba(17, 28, 46, 0.4)', backdropFilter: 'blur(12px)',
                    border: `1px solid ${isH ? 'rgba(79, 124, 207, 0.3)' : 'rgba(79, 124, 207, 0.1)'}`,
                    boxShadow: isH ? '0 12px 40px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.15)',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isH ? 'translateY(-4px)' : 'translateY(0)',
                  }}
                >
                  <div style={{ position: 'relative', height: '240px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(79,124,207,0.14), rgba(51,94,170,0.08))' }}>
                    {leader.imageUrl ? (
                      <img src={leader.imageUrl} alt={leader.name} loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: isH ? 'grayscale(0%) contrast(105%)' : 'grayscale(30%) contrast(110%)', transition: 'filter 0.4s, transform 0.5s', transform: isH ? 'scale(1.03)' : 'scale(1)' }} />
                    ) : (
                      <div style={{ width: '88px', height: '88px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(79,124,207,0.25), rgba(51,94,170,0.18))', border: '2px solid rgba(79,124,207,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: '#4F7CCF' }}>
                        {leader.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(5,9,20,0.95) 100%)' }} />
                    {leader.division && <span style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', padding: '0.2rem 0.55rem', borderRadius: '6px', fontSize: '0.55rem', fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: 'uppercase' as const, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>{leader.division}</span>}
                  </div>
                  <div style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>{leader.name}</h3>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#4F7CCF', marginBottom: '0.75rem', letterSpacing: '0.03em' }}>{leader.role}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{leader.bio}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══ 13. BASED IN GHANA ═════════════════════════════════ */}
        <section ref={hubsSection.ref} style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
          <SectionHeader tag="LOCATION" title="Based in Ghana" desc="Building online-first from Ghana, with ambitions beyond our home market." />
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="about-hubs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
              {globalHubs.map((hub, idx) => (
                <div key={idx} className="about-hub-card" style={{ padding: '1.25rem', borderRadius: '14px', background: hub.gradient, border: `1px solid ${hoveredHub === idx ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)'}`, transition: 'all 0.3s', maxWidth: '300px', width: '100%', margin: '0 auto' }}
                  onMouseEnter={() => setHoveredHub(idx)} onMouseLeave={() => setHoveredHub(null)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                    <MapPin size={14} color="rgba(255,255,255,0.5)" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>{hub.type}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.15rem' }}>{hub.city}</h3>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.5rem' }}>{hub.country}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{hub.description}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto' }}>
                Cristedor Group is being built in Ghana and operates online-first, developing products with ambitions beyond its home market.
              </p>
            </div>
          </div>
        </section>

        {/* ══ 14. COMPANY CULTURE ════════════════════════════════ */}
        <section ref={cultureSec.ref} style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
          <SectionHeader tag="VALUES" title="How We Work" desc="The values that define how we think and build together." />
          <div className="about-culture-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', maxWidth: '1000px', margin: '0 auto' }}>
            {cultureValues.map((cv, idx) => {
              const Icon = I[cv.icon] || Lightbulb;
              return (
                <div key={idx} className="about-culture-card"
                  onMouseEnter={() => setHoveredCulture(idx)} onMouseLeave={() => setHoveredCulture(null)}
                  style={{
                    ...anim(cultureSec, idx, 0.08), textAlign: 'center', padding: '1.5rem 1rem', borderRadius: '14px',
                    background: hoveredCulture === idx ? 'rgba(79, 124, 207, 0.08)' : 'rgba(17, 28, 46, 0.4)',
                    border: `1px solid ${hoveredCulture === idx ? 'rgba(79, 124, 207, 0.25)' : 'rgba(79, 124, 207, 0.1)'}`,
                    transition: 'all 0.3s', cursor: 'default',
                  }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(79, 124, 207, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
                    <Icon size={18} color="#4F7CCF" />
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '0.35rem' }}>{cv.title}</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{cv.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══ 15. GOVERNANCE & ETHICS ════════════════════════════ */}
        <section ref={govSec.ref} style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
          <SectionHeader tag="GOVERNANCE" title="Governance & Responsible Innovation" desc="The principles that guide how we operate." />
          <div className="about-governance-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', maxWidth: '1000px', margin: '0 auto' }}>
            {governancePrinciples.map((gp, idx) => {
              const Icon = I[gp.icon] || Shield;
              return (
                <div key={idx} className="about-governance-card" style={{ ...anim(govSec, idx, 0.1), padding: '1.5rem', borderRadius: '14px', background: 'rgba(17, 28, 46, 0.4)', border: '1px solid rgba(79, 124, 207, 0.1)', textAlign: 'center' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(79, 124, 207, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <Icon size={20} color="#4F7CCF" />
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{gp.title}</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{gp.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══ 16. SUSTAINABILITY & SOCIAL IMPACT ══════════════════ */}
        <section ref={sustainSec.ref} style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
          <SectionHeader tag="RESPONSIBILITY" title="Sustainability & Social Impact" desc="Our commitment to building responsibly through the ventures we establish." />
          <div className="about-sustain-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', maxWidth: '1000px', margin: '0 auto' }}>
            {sustainabilityAreas.map((sa, idx) => {
              const Icon = I[sa.icon] || Leaf;
              return (
                <div key={idx} className="about-sustain-card" style={{ ...anim(sustainSec, idx, 0.1), padding: '1.5rem', borderRadius: '14px', background: 'rgba(17, 28, 46, 0.4)', border: `1px solid ${sa.color}18`, textAlign: 'center' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${sa.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <Icon size={20} color={sa.color} />
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{sa.title}</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{sa.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══ 17. CAREERS PREVIEW ════════════════════════════════ */}
        <section ref={careersSec.ref} style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
          <SectionHeader tag="JOIN US" title="Careers at Cristedor" desc="We are not hiring at the moment. Genuine opportunities will be published here as the team grows." />
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => onNavigate('/careers')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '12px', background: 'rgba(79, 124, 207, 0.12)', border: '1px solid rgba(79, 124, 207, 0.25)', color: '#4F7CCF', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(79, 124, 207, 0.2)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(79, 124, 207, 0.12)'; e.currentTarget.style.transform = 'translateX(0)'; }}
            >Visit Careers Page <ArrowRight size={14} /></button>
          </div>
        </section>

        {/* ══ 18. FAQ ════════════════════════════════════════════ */}
        <section ref={faqSec.ref} style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
          <SectionHeader tag="FAQ" title="Frequently Asked Questions" />
          <div className="about-faq-list" style={{ maxWidth: '750px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {faqItems.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="about-faq-item" style={{ ...anim(faqSec, idx, 0.06), borderRadius: '12px', background: isOpen ? 'rgba(17, 28, 46, 0.6)' : 'rgba(17, 28, 46, 0.35)', border: `1px solid ${isOpen ? 'rgba(79, 124, 207, 0.3)' : 'rgba(79, 124, 207, 0.08)'}`, overflow: 'hidden', transition: 'all 0.3s' }}>
                  <button onClick={() => setOpenFaq(isOpen ? null : idx)} aria-expanded={isOpen} aria-controls={`faq-answer-${idx}`}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.15rem 1.25rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>{faq.question}</span>
                    <ChevronUp size={16} color="rgba(255,255,255,0.4)" style={{ transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', flexShrink: 0, marginLeft: '1rem' }} />
                  </button>
                  <div id={`faq-answer-${idx}`} role="region" style={{ maxHeight: isOpen ? '200px' : 0, overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, padding: '0 1.25rem 1.25rem' }}>{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══ 19. CTA ════════════════════════════════════════════ */}
        <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 0' }}>
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '20px', textAlign: 'center', padding: 'clamp(3rem, 5vw, 4.5rem) 2rem', background: 'linear-gradient(135deg, rgba(79, 124, 207, 0.08), rgba(51, 94, 170, 0.06), rgba(17, 28, 46, 0.5))', border: '1px solid rgba(79, 124, 207, 0.15)' }}>
            <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,124,207,0.1), transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(51,94,170,0.08), transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: '#fff', marginBottom: '0.75rem' }}>Get in Touch</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.88rem, 1.3vw, 1rem)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, maxWidth: '500px', margin: '0 auto 2rem' }}>
                Learn more about the ventures we are building, or reach out to the team.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => onNavigate('/careers')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '12px', background: 'linear-gradient(135deg, #4F7CCF, #335EAA)', border: 'none', color: '#fff', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.25s', boxShadow: '0 4px 16px rgba(79, 124, 207, 0.3)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(79, 124, 207, 0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(79, 124, 207, 0.3)'; }}
                >View Careers <ArrowRight size={15} /></button>
                <button onClick={() => onNavigate('/contact')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '12px', background: 'transparent', border: '1px solid rgba(79, 124, 207, 0.3)', color: '#4F7CCF', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.25s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(79, 124, 207, 0.1)'; e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.3)'; }}
                >Contact Us <ExternalLink size={14} /></button>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* ══ BACK TO TOP ═════════════════════════════════════════ */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"
        style={{ position: 'fixed', bottom: '2rem', right: '2rem', width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(17, 28, 46, 0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(79, 124, 207, 0.2)', color: '#4F7CCF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', zIndex: 50, boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(79, 124, 207, 0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(17, 28, 46, 0.8)'; e.currentTarget.style.transform = 'translateY(0)'; }}
      ><ChevronUp size={18} /></button>

      {/* ══ SKIP TO CONTENT ════════════════════════════════════ */}
      <a href="#main-content" style={{ position: 'fixed', top: '-100px', left: '1rem', padding: '0.5rem 1rem', borderRadius: '8px', background: '#4F7CCF', color: '#fff', fontSize: '0.85rem', fontWeight: 600, zIndex: 9999, transition: 'top 0.2s', textDecoration: 'none' }}
        onFocus={e => { e.currentTarget.style.top = '1rem'; }}
        onBlur={e => { e.currentTarget.style.top = '-100px'; }}
      >Skip to content</a>

      {/* ══ RESPONSIVE CSS ═══════════════════════════════════════ */}
      <style>{`
        @keyframes aboutRevealUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        *:focus-visible { outline: 2px solid #4F7CCF; outline-offset: 2px; border-radius: 4px; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }

        /* ── Tablet (≤900px) ── */
        @media (max-width: 900px) {
          .about-hero-stats { grid-template-columns: repeat(4, 1fr) !important; }
          .about-leaders-grid { grid-template-columns: 1fr !important; }
          .about-mission { gridTemplate-columns: 1fr !important; }
          .about-founder-grid { grid-template-columns: 1fr !important; }
          .about-philosophy-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .about-philosophy-arrow { display: none !important; }
          .about-facts-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .about-governance-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .about-sustain-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .about-industries-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .about-brand-timeline { flex-wrap: wrap !important; }
          .about-brand-timeline-item { min-width: 45% !important; flex: 0 0 45% !important; margin-bottom: 1.5rem; }
          .about-brand-timeline-line { display: none !important; }
        }

        /* ── Mobile (≤768px) ── */
        @media (max-width: 768px) {
          .about-hero-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .about-values-grid { grid-template-columns: 1fr !important; }
          .about-hubs-grid { grid-template-columns: 1fr !important; }
          .about-leaders-grid { grid-template-columns: 1fr !important; gap: 1rem !important; }
          .about-companies-grid { grid-template-columns: 1fr !important; }
          .about-philosophy-grid { grid-template-columns: 1fr !important; }
          .about-culture-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .about-industries-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .about-facts-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .about-governance-grid { grid-template-columns: 1fr !important; }
          .about-sustain-grid { grid-template-columns: 1fr !important; }
        }

        /* ── Mobile small (≤560px) ── */
        @media (max-width: 560px) {
          .about-hero-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .about-leaders-grid { grid-template-columns: 1fr !important; }
          .about-culture-grid { grid-template-columns: 1fr !important; }
          .about-industries-grid { grid-template-columns: 1fr !important; }
        }

        /* ── Mobile tiny (≤480px) ── */
        @media (max-width: 480px) {
          .about-hero-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 0 !important; }
          .about-leader-card img { height: 200px !important; }
          .about-facts-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
