import React from 'react';
import { RoutePath } from '../types';
import { portfolioData } from '../data/portfolioData';
import {
  ArrowLeft, Activity, Layers, Package, Globe, Building2
} from 'lucide-react';
import { StatusBadge } from '../data/stageData';
import { DIVISION_COLORS, DIVISION_LABELS, ENTITY_BG } from '../data/portfolioMeta';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { PORTFOLIO_FILTER_KEY } from '../hooks/usePortfolioFilter';

interface VentureDetailPageProps {
  id: string;
  onNavigate: (path: RoutePath, query?: Record<string, string>) => void;
}

export const VentureDetailPage: React.FC<VentureDetailPageProps> = ({ id, onNavigate }) => {
  const venture = portfolioData.find(v => v.id === id);

  const handleBack = () => {
    try {
      const raw = sessionStorage.getItem(PORTFOLIO_FILTER_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, string>;
        if (Object.keys(parsed).length > 0) {
          onNavigate('/portfolio', parsed);
          return;
        }
      }
    } catch {
      /* ignore malformed state */
    }
    onNavigate('/portfolio');
  };

  if (!venture) {
    return (
      <div style={{ backgroundColor: '#050914', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Building2 size={48} style={{ color: 'rgba(255,255,255,0.15)', marginBottom: '1.5rem' }} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
            Company Not Found
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            The company or venture you're looking for doesn't exist or has been moved.
          </p>
          <button
            onClick={() => onNavigate('/portfolio')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 1.5rem', borderRadius: '10px',
              background: 'rgba(79, 124, 207, 0.15)', border: '1px solid rgba(79, 124, 207, 0.3)',
              color: '#4F7CCF', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
              fontFamily: 'var(--font-body)', transition: 'all 0.2s'
            }}
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  const color = DIVISION_COLORS[venture.division] || '#4F7CCF';
  const bgImage = ENTITY_BG[venture.id];
  const products = portfolioData.filter(e => e.type === 'product' && e.parentId === venture.id);

  const stats: { icon: React.ReactNode; label: string; value: string }[] = [
    { icon: <Activity size={20} />, label: 'Status', value: venture.status },
    { icon: <Layers size={20} />, label: 'Focus', value: DIVISION_LABELS[venture.division] },
    ...(products.length > 0
      ? [{ icon: <Package size={20} />, label: 'Products', value: `${products.length} in development` }]
      : []),
    { icon: <Globe size={20} />, label: 'Operating Model', value: 'Online-first' }
  ];

  return (
    <div style={{ backgroundColor: '#050914', minHeight: '100vh' }}>

      {/* ══ HERO ═══════════════════════════════════════════════════ */}
      <section className="venture-hero" style={{
        position: 'relative', overflow: 'hidden',
        minHeight: 'clamp(20rem, 35vh, 28rem)',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '0 2rem clamp(2rem, 5vw, 3.5rem)'
      }}>
        {/* Background */}
        {bgImage ? (
          <img src={bgImage} alt={venture.name} style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', filter: 'brightness(0.35) contrast(1.05)'
          }} />
        ) : (
          <div style={{ position: 'absolute', inset: 0, backgroundColor: '#050914' }} />
        )}

        {/* Ambient orb for non-image cards */}
        {!bgImage && (
          <div style={{
            position: 'absolute', top: '10%', right: '15%',
            width: '400px', height: '400px', borderRadius: '50%',
            background: `radial-gradient(circle, ${color}12, transparent 70%)`,
            filter: 'blur(80px)', pointerEvents: 'none'
          }} />
        )}

        {/* Gradient overlays */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 70%, #050914 100%)`
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to right, ${color}08, transparent 60%)`
        }} />

        {/* Back button + breadcrumbs */}
        <div style={{
          position: 'absolute', top: 'clamp(1rem, 3vw, 2rem)', left: 'clamp(1rem, 3vw, 2rem)',
          zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.75rem'
        }}>
          <button
            onClick={handleBack}
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
            <ArrowLeft size={14} /> Back to Portfolio
          </button>
          <div style={{
            padding: '0.35rem 0.75rem', borderRadius: '8px',
            background: 'rgba(17, 28, 46, 0.6)', backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.08)'
          }}>
            <Breadcrumbs onNavigate={onNavigate} items={[
              { label: 'Home', path: '/' },
              { label: 'Companies & Ventures', path: '/portfolio' },
              { label: venture.name, active: true }
            ]} />
          </div>
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{
              padding: '0.25rem 0.7rem', borderRadius: '6px', fontSize: '0.65rem',
              fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
              background: `${color}18`, color: color,
              border: `1px solid ${color}35`,
              fontFamily: 'var(--font-mono)'
            }}>
              {DIVISION_LABELS[venture.division]}
            </span>
            <StatusBadge status={venture.status} size="md" />
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: '0.75rem'
          }}>
            {venture.name}
          </h1>
          <p className="tagline-desc" style={{
            fontFamily: 'var(--font-body)', fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
            color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, maxWidth: '600px'
          }}>
            {venture.tagline}
          </p>
        </div>
      </section>

      {/* ══ CONTENT ═══════════════════════════════════════════════ */}
      <div className="container" style={{ padding: '0 1.5rem' }}>

        {/* Stats Grid */}
        <div className="venture-stats" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem',
          margin: '-2rem 0 3rem', position: 'relative', zIndex: 3
        }}>
          {stats.map((stat, i) => (
            <div key={i} className="venture-stat-card" style={{
              padding: '1.25rem 1.5rem', borderRadius: '14px',
              background: 'rgba(17, 28, 46, 0.4)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(79, 124, 207, 0.12)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                <div style={{ color }}>{stat.icon}</div>
                <span style={{
                  fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 600,
                  color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em', textTransform: 'uppercase'
                }}>
                  {stat.label}
                </span>
              </div>
              <p style={{
                fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 600,
                color: '#fff', lineHeight: 1.4
              }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Description + CTA */}
        <div className="venture-content" style={{
          display: 'grid', gridTemplateColumns: '1fr 320px', gap: '3rem',
          paddingBottom: '2rem', alignItems: 'start'
        }}>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700,
              color: '#fff', marginBottom: '1rem'
            }}>
              About {venture.name}
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.75, marginBottom: '2rem'
            }}>
              {venture.description}
            </p>
          </div>

          {/* Sidebar CTA */}
          <div className="venture-sidebar" style={{
            padding: '1.5rem', borderRadius: '16px',
            background: 'rgba(17, 28, 46, 0.4)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(79, 124, 207, 0.12)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            position: 'sticky', top: '6rem'
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: `${color}18`, border: `1px solid ${color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <Globe size={22} style={{ color }} />
            </div>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600,
              color: '#fff', marginBottom: '0.5rem'
            }}>
              {venture.name}
            </h3>
            <p style={{
              fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)',
              marginBottom: '1.25rem', lineHeight: 1.5
            }}>
              {DIVISION_LABELS[venture.division]} · {venture.status}
            </p>
            {products.length > 0 ? (
              <button
                type="button"
                onClick={() => onNavigate('/projects')}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '0.5rem', padding: '0.7rem 1.25rem', borderRadius: '10px',
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
                View Products in Development <ArrowLeft size={14} style={{ transform: 'rotate(180deg)' }} />
              </button>
            ) : (
              <button
                type="button"
                disabled
                aria-disabled="true"
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '0.5rem', padding: '0.7rem 1.25rem', borderRadius: '10px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem', fontWeight: 600,
                  fontFamily: 'var(--font-body)', cursor: 'not-allowed'
                }}
              >
                Website Coming Soon
              </button>
            )}
          </div>
        </div>

        {/* ══ RELATED PRODUCTS ═══════════════════════════════════ */}
        {products.length > 0 && (
          <section style={{ paddingBottom: '2rem' }}>
            <div style={{
              height: '1px', marginBottom: '2.5rem',
              background: 'linear-gradient(90deg, transparent, rgba(79,124,207,0.2), transparent)'
            }} />
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700,
              color: '#fff', marginBottom: '1.5rem'
            }}>
              Products from {venture.name}
            </h2>
            <div className="related-grid" style={{
              display: 'grid', gridTemplateColumns: `repeat(${Math.min(products.length, 3)}, 1fr)`, gap: '1.25rem'
            }}>
              {products.map(item => {
                const itemColor = DIVISION_COLORS[item.division] || '#4F7CCF';
                return (
                  <div
                    key={item.id}
                    onClick={() => onNavigate('/projects', { id: item.id })}
                    style={{
                      padding: '1.25rem', borderRadius: '14px', cursor: 'pointer',
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
                    <span style={{
                      display: 'inline-block', padding: '0.15rem 0.5rem', borderRadius: '5px',
                      fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                      background: `${itemColor}15`, color: itemColor,
                      border: `1px solid ${itemColor}25`,
                      fontFamily: 'var(--font-mono)', marginBottom: '0.75rem'
                    }}>
                      {item.tagline}
                    </span>
                    <h3 style={{
                      fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700,
                      color: '#fff', marginBottom: '0.35rem', lineHeight: 1.25
                    }}>
                      {item.name}
                    </h3>
                    <p style={{
                      fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5,
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                    }}>
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* ══ RESPONSIVE ═══════════════════════════════════════════ */}
      <style>{`
        @media (max-width: 900px) {
          .venture-content {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .venture-sidebar {
            position: static !important;
          }
        }
        @media (max-width: 768px) {
          .venture-hero {
            min-height: clamp(16rem, 30vh, 22rem) !important;
            padding: 0 1.25rem clamp(1.5rem, 4vw, 2.5rem) !important;
          }
          .venture-stats {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
            margin: -1.5rem 0 2rem !important;
          }
          .related-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 560px) {
          .venture-hero {
            min-height: clamp(14rem, 28vh, 20rem) !important;
            padding: 0 1rem clamp(1.25rem, 3vw, 2rem) !important;
          }
          .venture-stat-card {
            padding: 1rem 1.25rem !important;
          }
        }
        @media (max-width: 480px) {
          .venture-hero {
            min-height: 14rem !important;
            padding: 0 0.75rem 1.25rem !important;
          }
          .venture-hero h1 {
            font-size: 1.6rem !important;
          }
          .venture-sidebar {
            padding: 1.25rem !important;
          }
          .tagline-desc {
            margin-bottom: 0.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};
