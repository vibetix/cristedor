import React, { useState } from 'react';
import { RoutePath, PortfolioEntity } from '../../types';
import { Layers, ArrowUpRight, Sparkles, Tv } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { StatusBadge } from '../../data/stageData';
import { CORE_COMPANY_IDS, ENTITY_BG } from '../../data/portfolioMeta';

interface FeaturedCompaniesProps {
  onNavigate: (path: RoutePath, query?: Record<string, string>) => void;
  onQuickView?: (entity: PortfolioEntity) => void;
}

const FEATURED_ICONS: Record<string, React.ReactNode> = {
  'cristedor-labs': <Sparkles size={22} color="#fff" />,
  'cristedor-media': <Tv size={22} color="#fff" />
};

const FEATURED_GRADIENTS: Record<string, string> = {
  'cristedor-labs': 'linear-gradient(135deg, #4F7CCF 0%, #335EAA 100%)',
  'cristedor-media': 'linear-gradient(135deg, #335EAA 0%, #13273D 100%)'
};

interface FeaturedCardProps {
  company: PortfolioEntity;
  bgImage: string;
  icon: React.ReactNode;
  accentGradient: string;
  onClick: () => void;
  onQuickView?: (entity: PortfolioEntity) => void;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({
  company, bgImage, icon, accentGradient, onClick, onQuickView
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="featured-card"
      style={{
        position: 'relative', borderRadius: '20px', overflow: 'hidden',
        cursor: 'pointer', minHeight: '340px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: '2rem',
        border: `1px solid ${hovered ? 'rgba(79,124,207,0.5)' : 'rgba(255,255,255,0.08)'}`,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(79,124,207,0.12)'
          : '0 10px 30px rgba(0,0,0,0.25)'
      }}
    >
      <img src={bgImage} alt={company.name} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover',
        filter: hovered ? 'brightness(0.7) contrast(1.1)' : 'brightness(0.45) contrast(1.05)',
        transition: 'filter 0.4s, transform 0.6s',
        transform: hovered ? 'scale(1.05)' : 'scale(1)'
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(5,9,20,0.1) 0%, rgba(5,9,20,0.92) 100%)'
      }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '14px',
          background: accentGradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.15)'
        }}>
          {icon}
        </div>
        <span style={{
          padding: '0.3rem 0.75rem', borderRadius: '8px',
          background: 'rgba(79,124,207,0.2)',
          border: '1px solid rgba(79,124,207,0.3)',
          fontFamily: 'var(--font-mono)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', gap: '0.3rem'
        }}>
          <StatusBadge status={company.status} />
        </span>
      </div>

      <div style={{ position: 'relative', zIndex: 2, marginTop: '2.5rem' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: '1.65rem', fontWeight: 800,
          color: '#FFFFFF', marginBottom: '0.5rem', lineHeight: 1.2
        }}>
          {company.name}
        </h3>
        <p style={{
          color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.5,
          marginBottom: '1.25rem', fontFamily: 'var(--font-body)'
        }}>
          {company.tagline}
        </p>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)',
          fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)'
        }}>
          <span style={{ fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            Company
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {onQuickView && (
              <button
                type="button"
                className="quick-view-btn"
                onClick={e => { e.stopPropagation(); onQuickView(company); }}
              >
                Quick View
              </button>
            )}
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#4F7CCF', fontWeight: 600 }}>
              Explore
              <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FeaturedCompanies: React.FC<FeaturedCompaniesProps> = ({ onNavigate, onQuickView }) => {
  const primaryCompanies = portfolioData.filter(item => (CORE_COMPANY_IDS as readonly string[]).includes(item.id));

  return (
    <section style={{ paddingBottom: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <Layers size={18} color="#4F7CCF" />
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: '#fff'
        }}>
          Our Companies
        </h2>
      </div>

      <div className="featured-grid" style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem'
      }}>
        {primaryCompanies.map(company => (
          <FeaturedCard
            key={company.id}
            company={company}
            bgImage={ENTITY_BG[company.id]}
            icon={FEATURED_ICONS[company.id]}
            accentGradient={FEATURED_GRADIENTS[company.id]}
            onClick={() => onNavigate('/portfolio', { id: company.id })}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </section>
  );
};
