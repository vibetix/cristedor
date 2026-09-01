import React from 'react';
import { RoutePath } from '../../types';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface PortfolioHeroProps {
  onNavigate: (path: RoutePath, query?: Record<string, string>) => void;
}

export const PortfolioHero: React.FC<PortfolioHeroProps> = ({ onNavigate }) => (
  <section className="portfolio-hero" style={{
    position: 'relative', overflow: 'hidden',
    padding: 'clamp(5rem, 10vw, 7rem) 2rem clamp(3rem, 6vw, 4.5rem)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
  }}>
    <img src="/portfolio-hero.jpeg" alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.32, filter: 'brightness(0.7) saturate(0.85)' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,9,20,0.6) 0%, rgba(5,9,20,0.25) 45%, #050914 100%)', pointerEvents: 'none' }} />
    {/* Ambient orbs */}
    <div style={{
      position: 'absolute', top: '-30%', left: '20%',
      width: '500px', height: '500px', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(79,124,207,0.1), transparent 70%)',
      filter: 'blur(120px)', pointerEvents: 'none'
    }} />
    <div style={{
      position: 'absolute', bottom: '-20%', right: '15%',
      width: '400px', height: '400px', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(79,124,207,0.08), transparent 70%)',
      filter: 'blur(100px)', pointerEvents: 'none'
    }} />

    <div className="portfolio-breadcrumbs" style={{ alignSelf: 'flex-start', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
      <Breadcrumbs
        onNavigate={onNavigate}
        items={[
          { label: 'Home', path: '/' },
          { label: 'Companies & Ventures', active: true }
        ]}
      />
    </div>

    <div className="hero-content" style={{ position: 'relative', zIndex: 1, maxWidth: '720px' }}>
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700,
        letterSpacing: '0.15em', textTransform: 'uppercase',
        color: '#4F7CCF', marginBottom: '1rem'
      }}>
        ❖ OUR COMPANIES & VENTURES
      </p>
      <h1 style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
        fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: '1.25rem'
      }}>
        Building Companies That{' '}
        <span style={{
          color: 'transparent',
          backgroundImage: 'linear-gradient(90deg, #4F7CCF 0%, #335EAA 100%)',
          WebkitBackgroundClip: 'text', backgroundClip: 'text'
        }}>
          Shape Tomorrow
        </span>
      </h1>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
        color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, maxWidth: '560px', margin: '0 auto'
      }}>
        Meet the companies and ventures of Cristedor Group — including the products we're building at Cristedor Labs.
      </p>
    </div>

    {/* Bottom gradient fade */}
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px',
      background: 'linear-gradient(to top, #050914, transparent)', pointerEvents: 'none'
    }} />
  </section>
);
