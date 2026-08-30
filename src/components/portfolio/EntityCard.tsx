import React, { useState } from 'react';
import { PortfolioEntity } from '../../types';
import { ArrowUpRight } from 'lucide-react';
import { StatusBadge } from '../../data/stageData';
import { DIVISION_COLORS, DIVISION_ICONS, DIVISION_LABELS } from '../../data/portfolioMeta';

interface EntityCardProps {
  entity: PortfolioEntity;
  onClick: () => void;
  onQuickView?: (entity: PortfolioEntity) => void;
}

const CTA_LABELS: Record<string, string> = {
  company: 'View Company',
  product: 'View Product'
};

export const EntityCard: React.FC<EntityCardProps> = ({ entity, onClick, onQuickView }) => {
  const [hovered, setHovered] = useState(false);
  const color = DIVISION_COLORS[entity.division] || '#4F7CCF';
  const chipLabel = entity.type === 'product' ? entity.tagline : DIVISION_LABELS[entity.division];
  const isProduct = entity.type === 'product';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="entity-card"
      style={{
        position: 'relative', borderRadius: '16px', overflow: 'hidden',
        cursor: 'pointer', padding: '1.5rem',
        background: hovered ? `${color}08` : 'rgba(17, 28, 46, 0.4)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid ${hovered ? color + '60' : 'rgba(79, 124, 207, 0.12)'}`,
        boxShadow: hovered
          ? `0 16px 48px rgba(0,0,0,0.35), 0 0 30px ${color}15`
          : '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)'
      }}
    >
      {/* Ambient orb */}
      <div style={{
        position: 'absolute', top: '-40px', right: '-40px',
        width: '120px', height: '120px', borderRadius: '50%',
        background: `radial-gradient(circle, ${color}10, transparent 70%)`,
        filter: 'blur(40px)', pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Top row: division icon + category chip */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minWidth: 0 }}>
            <div style={{ color, display: 'flex', flexShrink: 0 }}>
              {DIVISION_ICONS[entity.division]}
            </div>
            <span style={{
              padding: '0.2rem 0.5rem', borderRadius: '5px', fontSize: '0.6rem',
              fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
              background: `${color}15`, color,
              border: `1px solid ${color}25`,
              fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap', overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {chipLabel}
            </span>
          </div>
          <ArrowUpRight size={14} style={{
            color: hovered ? color : 'rgba(255,255,255,0.2)',
            transition: 'color 0.3s', flexShrink: 0
          }} />
        </div>

        {/* Name */}
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700,
          color: '#fff', marginBottom: '0.5rem', lineHeight: 1.25
        }}>
          {entity.name}
        </h3>

        {/* Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <StatusBadge status={entity.status} />
        </div>

        {/* Short description */}
        <p style={{
          color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.55,
          marginBottom: '1rem', display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
        }}>
          {entity.description}
        </p>

        {/* Parent (products) */}
        {isProduct && entity.parentId && (
          <p style={{
            fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)',
            fontFamily: 'var(--font-mono)', marginBottom: '1rem'
          }}>
            Developed by Cristedor Labs
          </p>
        )}

        {/* Quick view */}
        {onQuickView && (
          <div style={{ marginBottom: '0.875rem' }}>
            <button
              type="button"
              className="quick-view-btn"
              onClick={e => { e.stopPropagation(); onQuickView(entity); }}
            >
              Quick View
            </button>
          </div>
        )}

        {/* Bottom divider + CTA */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: '0.875rem', borderTop: '1px solid rgba(255,255,255,0.06)'
        }}>
          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)' }}>
            {DIVISION_LABELS[entity.division]}
          </span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff' }}>
            {CTA_LABELS[entity.type]}
          </span>
        </div>
      </div>
    </div>
  );
};
