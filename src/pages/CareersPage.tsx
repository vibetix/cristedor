import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Briefcase,
  ChevronDown,
  MapPin,
  Target,
  Users,
  Globe,
  Shield,
  Zap,
  Compass,
  BookOpen,
  Clock,
  Mail,
  AlertTriangle,
  Heart,
  Wifi,
  Cpu,
  Newspaper,
} from 'lucide-react';
import {
  heroStats,
  cultureValues,
  workModel,
  teams,
  companyTraits,
  jobListings,
  internPrograms,
  processSteps,
  benefits,
  careersFAQ,
  lifeAtCards,
} from '../data/careersData';
import { RoutePath } from '../types';

const useInView = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
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

interface CareersPageProps {
  onNavigate: (path: RoutePath) => void;
}

const iconMap: Record<string, React.ElementType> = {
  ArrowRight,
  Briefcase,
  ChevronDown,
  MapPin,
  Target,
  Users,
  Globe,
  Shield,
  Zap,
  Compass,
  BookOpen,
  Clock,
  Mail,
  AlertTriangle,
  Heart,
  Wifi,
  Cpu,
  Newspaper,
};

const CareersPage: React.FC<CareersPageProps> = ({ onNavigate }) => {
  const positionsRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToPositions = () => {
    positionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredJobs = jobListings;

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <a href="#careers-positions" className="careers-skip-link">Skip to open positions</a>

      {/* ═══ 1. HERO ═══ */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(5rem, 12vw, 8rem) 2rem clamp(3rem, 6vw, 5rem)' }}>
        <img src="/careers-hero.jpeg" alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, filter: 'brightness(0.7) saturate(0.85)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,9,20,0.62) 0%, rgba(5,9,20,0.3) 50%, #050914 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '30%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,124,207,0.12) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '800px', textAlign: 'center' }}>
          <SectionReveal>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CCF', marginBottom: '1.25rem' }}>{'\u2726'} JOIN THE TEAM</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 800, color: '#fff', lineHeight: 1.15, margin: '0 auto 1.25rem', maxWidth: '650px' }}>Help Build What Is Being Built</h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', color: 'var(--text-disabled)', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 2.5rem' }}>
              Cristedor Group is early-stage, private, and being established in Ghana. We are building two ventures from the ground up — and we are honest about where we are today.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <div className="careers-hero-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', maxWidth: '640px', margin: '0 auto' }}>
              {heroStats.map((stat, i) => (
                <div key={i} style={{ padding: '1.1rem 0.5rem', borderRadius: '14px', background: 'rgba(17, 28, 46, 0.4)', border: '1px solid rgba(79, 124, 207, 0.08)', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.value}</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '0.35rem' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══ 2. VISION ═══ */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container" style={{ maxWidth: '740px', textAlign: 'center' }}>
          <SectionReveal>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '0.75rem' }}>{'\u2726'} LONG-TERM VISION</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '1.25rem' }}>What We Are Building</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.88rem, 1.3vw, 1rem)', color: 'var(--text-disabled)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              We are building Cristedor Group as a private holding company with two ventures being established: Cristedor Labs (technology) and Cristedor Media (content). We plan in decades, not quarters. Patience is structural, not aspirational.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.88rem, 1.3vw, 1rem)', color: 'var(--text-disabled)', lineHeight: 1.7 }}>
              If you are looking for a place where ambition is matched by honesty, and where the work matters more than the optics, you will feel at home here.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ═══ 3. OPEN POSITIONS ═══ */}
      <section id="careers-positions" ref={positionsRef} style={{ padding: 'clamp(3rem, 6vw, 5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CCF', marginBottom: '0.75rem' }}>{'\u2726'} OPEN ROLES</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Current Openings</h2>
            </div>
          </SectionReveal>
          {filteredJobs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <Briefcase size={40} style={{ color: 'rgba(255,255,255,0.15)' }} />
              </div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>No open positions yet</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-disabled)', marginBottom: '1.5rem', maxWidth: '480px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
                Cristedor Group is early-stage and being established in Ghana. There are currently zero open roles. Positions will be published here as soon as they genuinely exist.
              </p>
              <button onClick={() => onNavigate('/contact')} style={{ padding: '0.6rem 1.5rem', borderRadius: '10px', background: 'rgba(79, 124, 207, 0.12)', border: '1px solid rgba(79, 124, 207, 0.25)', color: '#4F7CCF', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Contact Us</button>
            </div>
          )}
        </div>
      </section>

      {/* ═══ 4. WORK MODEL ═══ */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container">
          <SectionReveal>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CCF', marginBottom: '0.75rem' }}>{'\u2726'} HOW WE WORK</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>Work Model</h2>
            </div>
          </SectionReveal>
          <div className="careers-remote-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
            {workModel.map((item, i) => {
              const IconComp = iconMap[item.icon] || Globe;
              return (
                <SectionReveal key={i} delay={i * 0.08}>
                  <div style={{ padding: '1.75rem', borderRadius: '16px', background: 'rgba(17, 28, 46, 0.35)', border: '1px solid rgba(79, 124, 207, 0.08)', textAlign: 'center', transition: 'all 0.3s', height: '100%' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.25)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(79, 124, 207, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}><IconComp size={22} color="#4F7CCF" /></div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{item.title}</h4>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.55 }}>{item.description}</p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 5. VENTURES ═══ */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container">
          <SectionReveal>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8B5CF6', marginBottom: '0.75rem' }}>{'\u2726'} VENTURES</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>What We Are Building</h2>
            </div>
          </SectionReveal>
          <div className="careers-teams-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
            {teams.map((team, i) => {
              const IconComp = iconMap[team.icon] || Briefcase;
              return (
                <SectionReveal key={i} delay={i * 0.1}>
                  <div style={{ padding: '2rem', borderRadius: '16px', background: 'rgba(17, 28, 46, 0.35)', border: '1px solid rgba(79, 124, 207, 0.08)', transition: 'all 0.3s', height: '100%' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${team.color}40`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${team.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}><IconComp size={22} color={team.color} /></div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{team.name}</h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{team.description}</p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 6. VALUES ═══ */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container">
          <SectionReveal>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CCF', marginBottom: '0.75rem' }}>{'\u2726'} WHAT WE BELIEVE</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>Culture & Values</h2>
            </div>
          </SectionReveal>
          <div className="careers-culture-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
            {cultureValues.map((value, i) => {
              const IconComp = iconMap[value.icon] || Target;
              return (
                <SectionReveal key={i} delay={i * 0.08}>
                  <div style={{ padding: '1.75rem', borderRadius: '16px', background: 'rgba(17, 28, 46, 0.35)', border: '1px solid rgba(79, 124, 207, 0.08)', transition: 'all 0.3s', height: '100%' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${value.color}30`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${value.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconComp size={20} color={value.color} /></div>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{value.title}</h4>
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.55 }}>{value.description}</p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 7. COMPANY TRAITS ═══ */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container">
          <SectionReveal>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '0.75rem' }}>{'\u2726'} WHAT WE VALUE</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>What We Look For</h2>
            </div>
          </SectionReveal>
          <div className="careers-traits-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {companyTraits.map((trait, i) => {
              const IconComp = iconMap[trait.icon] || Zap;
              return (
                <SectionReveal key={i} delay={i * 0.06}>
                  <div style={{ padding: '1.5rem', borderRadius: '14px', background: 'rgba(17, 28, 46, 0.35)', border: '1px solid rgba(79, 124, 207, 0.08)', textAlign: 'center', transition: 'all 0.3s', height: '100%' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.25)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '11px', background: 'rgba(79, 124, 207, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}><IconComp size={20} color="#4F7CCF" /></div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>{trait.title}</h4>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{trait.description}</p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 8. FUTURE TEAM BENEFITS ═══ */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container">
          <SectionReveal>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3DDC97', marginBottom: '0.75rem' }}>{'\u2726'} WHAT WE PLAN TO OFFER</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>Future Team Benefits</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text-disabled)', lineHeight: 1.6, marginTop: '1rem', maxWidth: '560px', margin: '1rem auto 0' }}>
                These reflect what we intend to offer as we grow. Currently, as an early-stage company, the primary benefit is meaningful work on ventures being built to last.
              </p>
            </div>
          </SectionReveal>
          <div className="careers-benefits-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            {benefits.map((benefit, i) => {
              const IconComp = iconMap[benefit.icon] || Heart;
              return (
                <SectionReveal key={i} delay={i * 0.06}>
                  <div style={{ padding: '1.5rem', borderRadius: '14px', background: 'rgba(17, 28, 46, 0.35)', border: '1px solid rgba(79, 124, 207, 0.08)', transition: 'all 0.3s', height: '100%' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${benefit.color}30`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${benefit.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}><IconComp size={20} color={benefit.color} /></div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>{benefit.title}</h4>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.55 }}>{benefit.description}</p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 9. INTERNSHIPS & GRADUATE PROGRAMMES ═══ */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container">
          <SectionReveal>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CCF', marginBottom: '0.75rem' }}>{'\u2726'} EARLY CAREERS</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>Internships & Graduate Programmes</h2>
            </div>
          </SectionReveal>
          {internPrograms.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text-disabled)', lineHeight: 1.6, maxWidth: '560px', margin: '0 auto' }}>
                Internship and graduate programmes will be announced on this page once they are genuinely launched.
              </p>
            </div>
          ) : (
            <div className="careers-intern-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
              {internPrograms.map((prog, i) => (
                <SectionReveal key={i} delay={i * 0.08}>
                  <div style={{ padding: '1.75rem', borderRadius: '16px', background: 'rgba(17, 28, 46, 0.35)', border: '1px solid rgba(79, 124, 207, 0.08)', transition: 'all 0.3s', height: '100%' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${prog.color}30`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{prog.title}</h4>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-disabled)', lineHeight: 1.6, marginBottom: '1rem' }}>{prog.description}</p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: prog.color }}><Clock size={11} /> {prog.duration}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-disabled)' }}><MapPin size={11} /> {prog.locations}</span>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ 10. APPLICATION PROCESS ═══ */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container">
          <SectionReveal>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CCF', marginBottom: '0.75rem' }}>{'\u2726'} HOW TO APPLY</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>How We Expect Hiring to Work</h2>
            </div>
          </SectionReveal>
          <div className="careers-process-timeline" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
            <div className="careers-process-line" style={{ position: 'absolute', top: '28px', left: '12.5%', right: '12.5%', height: '2px', background: 'rgba(79, 124, 207, 0.15)', zIndex: 0 }} />
            {processSteps.map((step, i) => (
              <SectionReveal key={i} delay={i * 0.12}>
                <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #4F7CCF, #335EAA)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 4px 20px rgba(79,124,207,0.3)', fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>{step.number}</div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{step.title}</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{step.description}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 11. LIFE AT CRISTEDOR ═══ */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container">
          <SectionReveal>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CCF', marginBottom: '0.75rem' }}>{'\u2726'} LIFE AT CRISTEDOR</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>What It Is Like Here</h2>
            </div>
          </SectionReveal>
          <div className="careers-life-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {lifeAtCards.map((card, i) => {
              const IconComp = iconMap[card.icon] || Target;
              return (
                <SectionReveal key={i} delay={i * 0.08}>
                  <div style={{ padding: '1.75rem', borderRadius: '16px', background: card.gradient, border: `1px solid ${card.border}`, transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)', height: '100%' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)'; e.currentTarget.style.filter = 'brightness(1.15)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.filter = 'brightness(1)'; }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '11px', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}><IconComp size={20} color="rgba(255,255,255,0.6)" /></div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{card.title}</h4>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.55 }}>{card.description}</p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 12. LOCATION ═══ */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container">
          <SectionReveal>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CCF', marginBottom: '0.75rem' }}>{'\u2726'} WHERE WE ARE</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, margin: 0 }}>Ghana-Based, Online-First</h2>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', borderRadius: '16px', background: 'rgba(17, 28, 46, 0.4)', border: '1px solid rgba(79, 124, 207, 0.12)', textAlign: 'center' }}>
              <MapPin size={28} color="#4F7CCF" style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Ghana</h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-disabled)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>Online-First Operations</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                Cristedor Group is being established in Ghana and currently operates online. This is where we are today.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══ 13. FAQ ═══ */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 2rem', borderBottom: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container" style={{ maxWidth: '740px' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4F7CCF', marginBottom: '0.75rem' }}>{'\u2726'} FAQ</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Questions About Joining Us</h2>
            </div>
          </SectionReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {careersFAQ.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <SectionReveal key={i} delay={i * 0.06}>
                  <div style={{ borderRadius: '12px', background: isOpen ? 'rgba(17, 28, 46, 0.6)' : 'rgba(17, 28, 46, 0.3)', border: `1px solid ${isOpen ? 'rgba(79, 124, 207, 0.25)' : 'rgba(79, 124, 207, 0.08)'}`, overflow: 'hidden', transition: 'all 0.3s' }}>
                    <button onClick={() => setOpenFaq(isOpen ? null : i)} aria-expanded={isOpen} aria-controls={`careers-faq-${i}`}
                      style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.1rem 1.25rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 600, color: '#fff', paddingRight: '1rem' }}>{faq.question}</span>
                      <ChevronDown size={18} style={{ color: 'var(--text-disabled)', flexShrink: 0, transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                    </button>
                    <div id={`careers-faq-${i}`} role="region" aria-hidden={!isOpen} style={{ maxHeight: isOpen ? '200px' : 0, overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-disabled)', lineHeight: 1.65, padding: '0 1.25rem 1.1rem' }}>{faq.answer}</p>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 14. CTA FOOTER ═══ */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(3rem, 6vw, 5rem) 2rem' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(79,124,207,0.08) 0%, rgba(139,92,246,0.06) 50%, rgba(212,175,55,0.04) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,124,207,0.18) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <SectionReveal>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '1rem' }}>Interested in What We Are Building?</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.88rem, 1.3vw, 1rem)', color: 'var(--text-disabled)', lineHeight: 1.65, maxWidth: '550px', margin: '0 auto 2rem' }}>We are early-stage and building deliberately. When roles genuinely exist, they will appear on this page.</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={scrollToPositions} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', borderRadius: '12px', background: 'linear-gradient(135deg, #4F7CCF, #335EAA)', color: '#fff', fontSize: '0.9rem', fontWeight: 700, fontFamily: 'var(--font-body)', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(79,124,207,0.3)', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(79,124,207,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(79,124,207,0.3)'; }}>
                View Open Positions <ArrowRight size={16} />
              </button>
              <button onClick={() => onNavigate('/contact')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', borderRadius: '12px', background: 'rgba(17, 28, 46, 0.5)', backdropFilter: 'blur(12px)', color: '#fff', fontSize: '0.9rem', fontWeight: 600, fontFamily: 'var(--font-body)', border: '1px solid rgba(79, 124, 207, 0.2)', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(17, 28, 46, 0.7)'; e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(17, 28, 46, 0.5)'; e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.2)'; }}>
                Get in Touch <Mail size={16} />
              </button>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══ 15. FRAUD WARNING ═══ */}
      <section style={{ padding: '1.5rem 2rem', borderTop: '1px solid rgba(79, 124, 207, 0.08)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem 1.25rem', borderRadius: '12px', background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)' }}>
            <AlertTriangle size={18} color="#F59E0B" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.82rem', fontWeight: 700, color: '#F59E0B', marginBottom: '0.25rem' }}>Recruitment Fraud Warning</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.55 }}>
                Cristedor Group never requests payment, banking details, or cryptocurrency transfers during recruitment. All legitimate communication comes from our official address. If you receive suspicious outreach, report it to <span style={{ color: '#4F7CCF' }}>group.cristedor@gmail.com</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ RESPONSIVE CSS ═══ */}
      <style>{`
        .careers-skip-link { position: absolute; top: -100%; left: 50%; transform: translateX(-50%); background: #4F7CCF; color: #fff; padding: 0.75rem 1.5rem; border-radius: 0 0 8px 8px; font-weight: 700; font-family: var(--font-body); z-index: 9999; transition: top 0.2s; text-decoration: none; }
        .careers-skip-link:focus { top: 0; }
        @media (max-width: 900px) {
          .careers-hero-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .careers-culture-grid { grid-template-columns: 1fr !important; }
          .careers-remote-grid { grid-template-columns: 1fr !important; }
          .careers-teams-grid { grid-template-columns: 1fr !important; }
          .careers-traits-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .careers-benefits-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .careers-process-timeline { grid-template-columns: repeat(2, 1fr) !important; gap: 2rem 1.5rem !important; }
          .careers-process-line { display: none !important; }
          .careers-life-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .careers-intern-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .careers-traits-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .careers-benefits-grid { grid-template-columns: 1fr !important; }
          .careers-life-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .careers-hero-stats { gap: 0.75rem !important; }
          .careers-traits-grid { grid-template-columns: 1fr !important; }
          .careers-process-timeline { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
        *:focus-visible { outline: 2px solid #4F7CCF; outline-offset: 2px; border-radius: 4px; }
      `}</style>
    </div>
  );
};

export default CareersPage;
