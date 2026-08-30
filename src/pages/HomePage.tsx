import React from 'react';
import { RoutePath } from '../types';
import { ArrowRight, ArrowUpRight, ChevronRight, Building2, Globe, Home, Mic, Ticket, Newspaper } from 'lucide-react';
import { companies, projects, atAGlanceStats, siteSettings } from '../data/siteContent';

interface HomePageProps {
  onNavigate: (path: RoutePath, query?: Record<string, string>) => void;
}

// ─────────────────────────────────────────────────────────────
// Company card
// ─────────────────────────────────────────────────────────────
interface CompanyCardProps {
  title: string;
  category: string;
  status: string;
  statusColor: string;
  description: string;
  linkLabel: string;
  bgImage: string;
  accentColor: string;
  icon: React.ReactNode;
  onNavigate: (path: RoutePath) => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  title, category, status, statusColor, description, linkLabel, bgImage, accentColor, icon, onNavigate
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onNavigate('/portfolio')}
      style={{
        position: 'relative', borderRadius: '16px', overflow: 'hidden',
        cursor: 'pointer', minHeight: '360px',
        border: `1px solid ${hovered ? accentColor + '60' : 'rgba(255,255,255,0.08)'}`,
        transition: 'border-color 0.3s, transform 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)'
      }}
    >
      <img src={bgImage} alt={title} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover',
        filter: hovered ? 'brightness(0.7)' : 'brightness(0.45)',
        transition: 'filter 0.4s'
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(7,8,14,0.05) 0%, rgba(7,8,14,0.92) 100%)'
      }} />
      <div style={{ position: 'relative', padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ position: 'absolute', top: '1.25rem', left: '1.5rem', right: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '8px',
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {icon}
          </div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
            padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.6rem',
            fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
            background: `${statusColor}12`, color: statusColor,
            border: `1px solid ${statusColor}30`,
            fontFamily: 'var(--font-mono)'
          }}>
            <span style={{
              width: '5px', height: '5px', borderRadius: '50%', background: statusColor, flexShrink: 0,
              boxShadow: `0 0 6px ${statusColor}80`
            }} />
            {status}
          </span>
        </div>
        <span style={{
          fontSize: '0.68rem', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-mono)',
          letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem'
        }}>
          {category}
        </span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', color: '#fff', marginBottom: '0.5rem', lineHeight: 1.2 }}>
          {title}
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, marginBottom: '1rem' }}>
          {description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.85rem', color: accentColor, fontWeight: 600 }}>
          <span>{linkLabel}</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Project card
// ─────────────────────────────────────────────────────────────
interface ProjectCardProps {
  title: string;
  category: string;
  status: string;
  statusColor: string;
  description: string;
  linkLabel: string;
  accentColor: string;
  icon: React.ReactNode;
  featureTitle?: string;
  featureDescription?: string;
  onNavigate: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title, category, status, statusColor, description, linkLabel, accentColor, icon, featureTitle, featureDescription, onNavigate
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onNavigate}
      style={{
        position: 'relative', borderRadius: '16px', overflow: 'hidden',
        minHeight: '340px', display: 'flex', flexDirection: 'column',
        background: `linear-gradient(135deg, rgba(17,28,46,0.92) 0%, rgba(17,28,46,0.72) 55%, ${accentColor}22 100%)`,
        backdropFilter: 'blur(16px)',
        cursor: 'pointer',
        border: `1px solid ${hovered ? accentColor + '40' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: hovered ? `0 20px 60px ${accentColor}18` : '0 10px 30px rgba(0,0,0,0.25)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)'
      }}
    >
      <div style={{ position: 'absolute', top: '-4rem', right: '-4rem', width: '10rem', height: '10rem', background: `${accentColor}14`, borderRadius: '50%', filter: 'blur(56px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-4rem', left: '-4rem', width: '9rem', height: '9rem', background: `${accentColor}0D`, borderRadius: '50%', filter: 'blur(56px)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '10px',
            background: `${accentColor}14`, border: `1px solid ${accentColor}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor
          }}>
            {icon}
          </div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
            padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.6rem',
            fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
            background: `${statusColor}12`, color: statusColor,
            border: `1px solid ${statusColor}30`,
            fontFamily: 'var(--font-mono)'
          }}>
            <span style={{
              width: '5px', height: '5px', borderRadius: '50%', background: statusColor, flexShrink: 0,
              boxShadow: `0 0 6px ${statusColor}80`
            }} />
            {status}
          </span>
        </div>

        <span style={{
          fontSize: '0.68rem', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-mono)',
          letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem'
        }}>
          {category}
        </span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', color: '#fff', marginBottom: '0.6rem', lineHeight: 1.2 }}>
          {title}
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.55, marginBottom: '1rem' }}>
          {description}
        </p>

        {featureTitle && (
          <div style={{
            padding: '0.85rem', borderRadius: '10px', marginBottom: '1rem',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)'
          }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: accentColor, fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
              {featureTitle}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, display: 'block' }}>
              {featureDescription}
            </span>
          </div>
        )}

        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.85rem', color: accentColor, fontWeight: 600, paddingTop: '0.5rem' }}>
          <span>{linkLabel}</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Small helpers
// ─────────────────────────────────────────────────────────────
const SectionLabel: React.FC<{ children: string }> = ({ children }) => (
  <p style={{
    fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 700,
    letterSpacing: '0.15em', textTransform: 'uppercase',
    color: 'rgba(108,99,255,0.9)', marginBottom: '0.875rem'
  }}>
    {children}
  </p>
);

const GradientHeading: React.FC<{ plain: string; gradient: string; size?: string }> = ({ plain, gradient, size = 'clamp(1.75rem, 3.5vw, 2.75rem)' }) => (
  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: size, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
    {plain}{' '}
    <span style={{ color: 'transparent', backgroundImage: 'linear-gradient(90deg, #4F7CCF 0%, #335EAA 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
      {gradient}
    </span>
  </h2>
);

// ─────────────────────────────────────────────────────────────
// Technology stack (NOT partners)
// ─────────────────────────────────────────────────────────────
const TechLogos: React.FC = () => {
  const textLogos = ['Google', 'Microsoft', 'Stripe', 'Notion', 'Vercel'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
      <img
        src="/icons8-aws-logo-96.png"
        alt="AWS"
        style={{ height: '28px', width: 'auto' }}
      />
      {textLogos.map(name => (
        <span key={name} style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.95rem',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.4)',
          fontFamily: 'var(--font-body)',
        }}>
          {name === 'Microsoft' && (
            <img
              src="/icons8-microsoft-96.png"
              alt="Microsoft"
              style={{ height: '22px', width: 'auto' }}
            />
          )}
          {name === 'Notion' && (
            <img
              src="/icons8-notion-96.png"
              alt="Notion"
              style={{ height: '22px', width: 'auto' }}
            />
          )}
          {name}
        </span>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// HomePage
// ─────────────────────────────────────────────────────────────
export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const companyIcons: Record<string, React.ReactNode> = {
    'cristedor-labs': <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9l2.1 2.1m10 10 2.1 2.1M4.9 19.1l2.1-2.1m10-10 2.1-2.1"/></svg>,
    'cristedor-media': <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  };

  const projectIcons: Record<string, React.ReactNode> = {
    unistay: <Home size={20} />,
    'synkturt-tts': <Mic size={20} />,
    vibetix: <Ticket size={20} />,
  };

  const statIcons: Record<string, React.ReactNode> = {
    companies: <Building2 size={18} />,
    'online-first': <Globe size={18} />,
  };

  return (
    <div style={{ backgroundColor: '#050914', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ══ HERO ════════════════════════════════════════════════════════ */}
      <section className="hero-section" style={{
        position: 'relative', minHeight: '80vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        overflow: 'hidden', color: '#fff',
        padding: '6rem 2rem 2rem'
      }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
          <video
            autoPlay loop muted playsInline
            preload="metadata"
            poster="https://res.cloudinary.com/zokylv9g/video/upload/w_auto,q_auto,f_auto/so_0/v1784950414/2026-07-25_02-50-10_Lumina_xcnojj.jpg"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
              transition: 'all 0.7s', opacity: 0.7, transform: 'scale(1.05)', filter: 'contrast(1.08) brightness(0.85)'
            }}
            src="https://res.cloudinary.com/zokylv9g/video/upload/v1784950414/2026-07-25_02-50-10_Lumina_xcnojj.mp4"
          />
          <div style={{ position: 'absolute', inset: 0, transition: 'opacity 0.7s', opacity: 0.3, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(17,28,46,0.5), rgba(5,9,20,0.6), rgba(0,0,0,0.8))' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,1), transparent, rgba(5,9,20,0.6))' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, rgba(5,9,20,0.6) 100%)' }} />
          </div>
        </div>

        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 1, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '25%', left: '16.6%', width: '500px', height: '500px', background: 'rgba(79,124,207,0.15)', borderRadius: '50%', filter: 'blur(140px)' }} />
          <div style={{ position: 'absolute', top: '33%', left: '33%', width: '400px', height: '400px', background: 'rgba(51,94,170,0.15)', borderRadius: '50%', filter: 'blur(160px)' }} />
        </div>

        <div style={{
          position: 'relative', zIndex: 10, width: '100%', maxWidth: '80rem', margin: '0 auto',
          display: 'flex', flexDirection: 'column', justifyContent: 'center'
        }}>

          <div className="hero-tagline" style={{ marginBottom: '2rem', animation: 'fadeIn 0.5s ease-out forwards' }}>
            <span style={{
              color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)'
            }}>
              {siteSettings.hero.eyebrow.split('•').map((part, i, arr) => (
                <span key={i}>
                  {part.trim()}
                  {i < arr.length - 1 && <span style={{ margin: '0 0.375rem', color: 'var(--text-disabled)' }}>•</span>}
                </span>
              ))}
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.25rem, 5vw, 4.75rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08,
            color: '#fff', maxWidth: '56rem', marginBottom: '2rem', fontFamily: 'var(--font-display)',
            animation: 'fadeIn 0.6s ease-out forwards'
          }}>
            Building Companies<br />
            {' '}That Shape{' '}
            <span style={{
              backgroundImage: 'linear-gradient(to right, #4F7CCF, #335EAA, #13273D)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', display: 'inline-block'
            }}>
              Tomorrow.
            </span>
          </h1>

          <div style={{
            color: '#A2B2C7', fontSize: 'clamp(1rem, 2vw, 1.125rem)', lineHeight: 1.65, fontWeight: 400,
            maxWidth: '36rem', marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '0.25rem',
            animation: 'fadeIn 0.6s ease-out forwards'
          }}>
            <p>{siteSettings.hero.subCopy}</p>
          </div>

          <div style={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.25rem', marginBottom: '40px',
            animation: 'fadeIn 0.6s ease-out forwards'
          }}>
            <button
              onClick={() => onNavigate('/portfolio')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
                padding: '0.875rem 1.75rem', borderRadius: '0.75rem', fontWeight: 700, fontSize: '0.875rem',
                letterSpacing: '0.05em', textTransform: 'uppercase', color: '#fff',
                background: 'linear-gradient(135deg, #4F7CCF, #335EAA)',
                boxShadow: '0 10px 15px -3px rgba(79, 124, 207, 0.25)',
                border: 'none', cursor: 'pointer', transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #5C88DA, #3C69B7)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(79, 124, 207, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #4F7CCF, #335EAA)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(79, 124, 207, 0.25)';
              }}
            >
              <span>{siteSettings.hero.primaryCta}</span>
              <ArrowUpRight size={16} strokeWidth={2.5} style={{ transition: 'transform 0.3s' }} />
            </button>

            <button
              onClick={() => onNavigate('/about')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.875rem 1.75rem', borderRadius: '0.75rem', fontWeight: 700, fontSize: '0.875rem',
                letterSpacing: '0.05em', textTransform: 'uppercase', color: '#fff',
                background: 'rgba(17,28,46,0.5)', border: '1px solid #22324B',
                cursor: 'pointer', transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#52525b';
                e.currentTarget.style.background = 'rgba(17,28,46,0.9)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#22324B';
                e.currentTarget.style.background = 'rgba(17,28,46,0.5)';
              }}
            >
              <span>{siteSettings.hero.secondaryCta}</span>
              <div style={{
                width: '20px', height: '20px', borderRadius: '50%', border: '1px solid #2B3E5C',
                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.3s'
              }}>
                <ChevronRight size={12} color="#d4d4d8" strokeWidth={2.5} />
              </div>
            </button>
          </div>

          <div style={{
            paddingTop: '1rem', borderTop: '1px solid rgba(17,28,46,0.6)',
            animation: 'fadeIn 0.6s ease-out forwards'
          }}>
            <p style={{ color: '#73829A', fontWeight: 500, fontSize: '0.875rem', letterSpacing: '0.025em', marginBottom: '1.5rem' }}>
              {siteSettings.techStack.label}
            </p>
            <TechLogos />
          </div>
        </div>
      </section>

      {/* ══ CRISTEDOR AT A GLANCE ═══════════════════════════════════════ */}
      <section style={{ padding: '1.75rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <SectionLabel>{siteSettings.atAGlance.label}</SectionLabel>
            <GradientHeading plain={siteSettings.atAGlance.headingPlain} gradient={siteSettings.atAGlance.headingGradient} size="clamp(1.6rem, 3vw, 2.5rem)" />
          </div>

          <div className="mission-card" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(1.25rem, 2vw, 2rem)',
            padding: '2.5rem 2rem',
            borderRadius: '16px',
            background: 'rgba(17, 28, 46, 0.72)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(79, 124, 207, 0.18)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.35)',
            flexWrap: 'wrap'
          }}>
            {/* Vision */}
            <div className="mission-text" style={{ flex: '1.4', minWidth: 0 }}>
              <p style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                {siteSettings.atAGlance.visionLabel}
              </p>
              <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '420px' }}>
                {siteSettings.atAGlance.visionText}
              </p>
            </div>

            {/* Divider */}
            <div style={{ width: '1px', height: '80px', background: 'linear-gradient(180deg, transparent, rgba(79,124,207,0.3), transparent)', flexShrink: 0 }} className="stats-divider" />

            {/* At-a-glance stats */}
            <div className="stats-row" style={{ display: 'flex', gap: 'clamp(0.5rem, 1vw, 1.25rem)', flexWrap: 'wrap', flex: '1.6', justifyContent: 'space-between' }}>
              {atAGlanceStats.map((stat) => (
                <div key={stat.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', textAlign: 'center', maxWidth: '150px' }}>
                  <div style={{ color: 'var(--accent-primary)', marginBottom: '0.15rem' }}>{statIcons[stat.id]}</div>
                  {stat.kind === 'numeric' ? (
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{stat.value}</div>
                  ) : (
                    <div style={{
                      display: 'inline-flex', alignItems: 'center',
                      padding: '0.3rem 0.75rem', borderRadius: '9999px',
                      background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
                      fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700,
                      letterSpacing: '0.06em', color: '#34D399'
                    }}>
                      {stat.value}
                    </div>
                  )}
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>{stat.label}</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.32)', fontFamily: 'var(--font-body)', lineHeight: 1.4 }}>{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ OUR COMPANIES ═══════════════════════════════════════════════ */}
      <section style={{ padding: '2.5rem 0 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <SectionLabel>{siteSettings.companiesSection.label}</SectionLabel>
            <GradientHeading plain={siteSettings.companiesSection.headingPlain} gradient={siteSettings.companiesSection.headingGradient} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {companies.map(company => (
              <CompanyCard
                key={company.id}
                title={company.name}
                category={company.category}
                status={company.status}
                statusColor={company.statusColor}
                description={company.description}
                linkLabel={company.cta}
                bgImage={company.bgImage}
                accentColor={company.accentColor}
                icon={companyIcons[company.id]}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHAT WE'RE BUILDING ═════════════════════════════════════════ */}
      <section style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <SectionLabel>{siteSettings.projectsSection.label}</SectionLabel>
            <GradientHeading plain={siteSettings.projectsSection.headingPlain} gradient={siteSettings.projectsSection.headingGradient} size="clamp(1.6rem, 3vw, 2.5rem)" />
            <p style={{ marginTop: '0.875rem', fontSize: '0.95rem', color: 'rgba(255,255,255,0.55)', maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
              {siteSettings.projectsSection.description}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginTop: '2rem' }}>
            {projects.map(project => (
              <ProjectCard
                key={project.id}
                title={project.name}
                category={project.category}
                status={project.status}
                statusColor={project.statusColor}
                description={project.description}
                linkLabel={project.cta}
                accentColor={project.accentColor}
                icon={projectIcons[project.id]}
                featureTitle={project.featureTitle}
                featureDescription={project.featureDescription}
                onNavigate={() => onNavigate('/projects', { id: project.id })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ NEWSROOM ════════════════════════════════════════════════════ */}
      <section style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <SectionLabel>{siteSettings.newsroom.label}</SectionLabel>
            <GradientHeading plain={siteSettings.newsroom.headingPlain} gradient={siteSettings.newsroom.headingGradient} size="clamp(1.6rem, 3vw, 2.5rem)" />
            <p style={{ marginTop: '0.875rem', fontSize: '0.95rem', color: 'rgba(255,255,255,0.55)', maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
              {siteSettings.newsroom.description}
            </p>
          </div>

          <div style={{
            maxWidth: '32rem', margin: '0 auto', padding: '2.5rem 2rem',
            borderRadius: '16px', textAlign: 'center',
            background: 'rgba(17,28,46,0.5)', border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)'
          }}>
            <div style={{
              width: '48px', height: '48px', margin: '0 auto 1rem', borderRadius: '12px',
              background: 'rgba(79,124,207,0.12)', border: '1px solid rgba(79,124,207,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6C9AF2'
            }}>
              <Newspaper size={22} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
              {siteSettings.newsroom.emptyTitle}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: '24rem', margin: '0 auto' }}>
              {siteSettings.newsroom.emptyText}
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <button
              onClick={() => onNavigate('/newsroom')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.65rem 1.5rem', borderRadius: '8px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#fff', fontSize: '0.875rem', fontWeight: 600,
                cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'background 0.2s'
              }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'}
            >
              View All News <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ══ CLOSING CTA ════════════════════════════════════════════════ */}
      <section style={{ padding: '4rem 0 5rem', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-8rem', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'rgba(79,124,207,0.12)', borderRadius: '50%', filter: 'blur(140px)', pointerEvents: 'none' }} />
        <div className="container">
          <div style={{ position: 'relative', textAlign: 'center', maxWidth: '42rem', margin: '0 auto' }}>
            <SectionLabel>{siteSettings.closingCta.eyebrow}</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: '1.25rem' }}>
              {siteSettings.closingCta.headline}
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '2.25rem', maxWidth: '34rem', marginLeft: 'auto', marginRight: 'auto' }}>
              {siteSettings.closingCta.supporting}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1.25rem' }}>
              <button
                onClick={() => onNavigate('/portfolio')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
                  padding: '0.875rem 1.75rem', borderRadius: '0.75rem', fontWeight: 700, fontSize: '0.875rem',
                  letterSpacing: '0.05em', textTransform: 'uppercase', color: '#fff',
                  background: 'linear-gradient(135deg, #4F7CCF, #335EAA)',
                  boxShadow: '0 10px 15px -3px rgba(79, 124, 207, 0.25)',
                  border: 'none', cursor: 'pointer', transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #5C88DA, #3C69B7)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(79, 124, 207, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #4F7CCF, #335EAA)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(79, 124, 207, 0.25)';
                }}
              >
                <span>{siteSettings.closingCta.primaryCta}</span>
                <ArrowUpRight size={16} strokeWidth={2.5} style={{ transition: 'transform 0.3s' }} />
              </button>
              <button
                onClick={() => onNavigate('/contact')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.875rem 1.75rem', borderRadius: '0.75rem', fontWeight: 700, fontSize: '0.875rem',
                  letterSpacing: '0.05em', textTransform: 'uppercase', color: '#fff',
                  background: 'rgba(17,28,46,0.5)', border: '1px solid #22324B',
                  cursor: 'pointer', transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#52525b';
                  e.currentTarget.style.background = 'rgba(17,28,46,0.9)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#22324B';
                  e.currentTarget.style.background = 'rgba(17,28,46,0.5)';
                }}
              >
                <span>{siteSettings.closingCta.secondaryCta}</span>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%', border: '1px solid #2B3E5C',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.3s'
                }}>
                  <ChevronRight size={12} color="#d4d4d8" strokeWidth={2.5} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .stats-divider { display: none !important; }
          .hero-section { min-height: 65vh !important; padding: 4.5rem 1.25rem 1.5rem !important; }
          .hero-tagline { margin-top: 2rem !important; }
          .mission-card { padding: 1.5rem 1.25rem !important; gap: 1.5rem !important; }
          .mission-card .mission-text { min-width: 0 !important; flex-basis: 100% !important; }
          .stats-row { justify-content: center !important; }
          .stats-row > div { min-width: 0 !important; flex: 0 0 auto !important; }
        }
        @media (max-width: 560px) {
          .stats-row { gap: 1.25rem !important; }
          .hero-section { min-height: 60vh !important; padding: 4rem 1rem 1.25rem !important; }
          .mission-card { padding: 1.25rem 1rem !important; }
          .stats-row > div { flex: 0 0 calc(50% - 0.625rem) !important; max-width: none !important; }
        }
        @media (max-width: 480px) {
          .hero-section { min-height: 55vh !important; padding: 3.5rem 0.75rem 1rem !important; }
        }
      `}</style>

    </div>
  );
};
