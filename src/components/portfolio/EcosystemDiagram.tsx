import React, { useState } from 'react';
import { RoutePath, PortfolioEntity } from '../../types';
import { Globe, Building2, Package, ChevronDown } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { DIVISION_COLORS, DIVISION_ICONS, CORE_COMPANY_IDS } from '../../data/portfolioMeta';

interface EcosystemDiagramProps {
  onNavigate: (path: RoutePath, query?: Record<string, string>) => void;
}

const PRODUCT_COLOR = '#335EAA';

export const EcosystemDiagram: React.FC<EcosystemDiagramProps> = ({ onNavigate }) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const coreCompanies = portfolioData.filter(item =>
    (CORE_COMPANY_IDS as readonly string[]).includes(item.id)
  );

  const childrenOf = (parentId: string): PortfolioEntity[] =>
    portfolioData.filter(c => c.parentId === parentId);

  const navigateTo = (entity: PortfolioEntity) =>
    onNavigate(entity.detailRoute, { id: entity.id });

  const toggleExpand = (id: string) => setExpanded(prev => (prev === id ? null : id));

  return (
    <section style={{ paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <Globe size={18} color="#4F7CCF" />
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: '#fff'
        }}>
          Ecosystem Structure
        </h2>
      </div>
      <p style={{
        color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginBottom: '2rem',
        fontFamily: 'var(--font-body)'
      }}>
        Hover over a company to see the products being built under it within the Cristedor ecosystem.
      </p>

      <div className="ecosystem-diagram" style={{
        position: 'relative', padding: '2rem 1.5rem',
        borderRadius: '20px',
        background: 'rgba(17, 28, 46, 0.3)',
        border: '1px solid rgba(79, 124, 207, 0.1)',
        overflow: 'hidden'
      }}>
        {/* Background decorative grid */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <defs>
            <pattern id="ecosystem-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(79,124,207,0.03)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ecosystem-grid)" />
        </svg>

        {/* ── Desktop tree ── */}
        <div className="ecosystem-tree" style={{
          position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto'
        }}>
          {/* Root */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div className="eco-node root-node" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.75rem 1.5rem', borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(79,124,207,0.2), rgba(51,94,170,0.15))',
              border: '1px solid rgba(79,124,207,0.3)',
              cursor: 'default',
              transition: 'all 0.3s'
            }}>
              <Building2 size={20} color="#4F7CCF" />
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: '#fff'
              }}>
                Cristedor Group
              </span>
            </div>
          </div>

          {/* Connector from root */}
          <svg style={{ display: 'block', margin: '0 auto', width: '2px', height: '24px' }}>
            <line x1="1" y1="0" x2="1" y2="24" stroke="rgba(79,124,207,0.2)" strokeWidth="2" />
          </svg>

          {/* Horizontal connector bar */}
          <div style={{
            position: 'relative', height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(79,124,207,0.15), transparent)',
            marginBottom: '1.5rem'
          }} />

          {/* Core companies row */}
          <div className="eco-core-row" style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '1rem'
          }}>
            {coreCompanies.map(company => {
              const color = DIVISION_COLORS[company.division] || '#4F7CCF';
              const isHovered = hoveredNode === company.id;
              const dimmed = hoveredNode !== null && !isHovered;
              const children = childrenOf(company.id);
              return (
                <div key={company.id} style={{
                  textAlign: 'center',
                  opacity: dimmed ? 0.35 : 1,
                  transition: 'opacity 0.3s'
                }}>
                  {/* Vertical connector */}
                  <svg style={{ display: 'block', margin: '0 auto', width: '2px', height: '20px' }}>
                    <line x1="1" y1="0" x2="1" y2="20" stroke={color + '30'} strokeWidth="2" />
                  </svg>
                  <div className="eco-node core-node"
                    onMouseEnter={() => setHoveredNode(company.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => navigateTo(company)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      padding: '0.6rem 1rem', borderRadius: '10px', cursor: 'pointer',
                      background: isHovered ? `${color}15` : 'rgba(17, 28, 46, 0.5)',
                      border: `1px solid ${isHovered ? color + '50' : 'rgba(79,124,207,0.12)'}`,
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                      boxShadow: isHovered ? `0 8px 24px rgba(0,0,0,0.3), 0 0 20px ${color}10` : 'none',
                      maxWidth: '100%'
                    }}
                  >
                    {DIVISION_ICONS[company.division]}
                    <span style={{
                      fontFamily: 'var(--font-display)', fontSize: '0.85rem',
                      fontWeight: 700, color: '#fff', whiteSpace: 'nowrap'
                    }}>
                      {company.name}
                    </span>
                    <span style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: color, flexShrink: 0
                    }} />
                  </div>

                  {/* Product children */}
                  {isHovered && children.length > 0 && (
                    <div className="eco-children" style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      gap: '0.4rem', marginTop: '0.75rem',
                      animation: 'fadeInUp 0.3s ease-out'
                    }}>
                      <svg style={{ width: '2px', height: '14px' }}>
                        <line x1="1" y1="0" x2="1" y2="14" stroke={color + '40'} strokeWidth="1.5" strokeDasharray="3,3" />
                      </svg>
                      {children.map(child => (
                        <div key={child.id} className="eco-child-node"
                          onClick={(e) => { e.stopPropagation(); navigateTo(child); }}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '0.35rem',
                            padding: '0.35rem 0.75rem', borderRadius: '8px', cursor: 'pointer',
                            background: 'rgba(17, 28, 46, 0.6)',
                            border: '1px solid rgba(79,124,207,0.08)',
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: '0.75rem', fontFamily: 'var(--font-mono)',
                            transition: 'all 0.25s',
                            whiteSpace: 'nowrap'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = `${PRODUCT_COLOR}18`;
                            e.currentTarget.style.color = '#fff';
                            e.currentTarget.style.borderColor = PRODUCT_COLOR + '40';
                            e.currentTarget.style.transform = 'translateX(3px)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(17, 28, 46, 0.6)';
                            e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                            e.currentTarget.style.borderColor = 'rgba(79,124,207,0.08)';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <Package size={10} style={{ color: PRODUCT_COLOR, flexShrink: 0 }} />
                          {child.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile accordion ── */}
        <div className="ecosystem-accordion" style={{
          position: 'relative', zIndex: 1, maxWidth: '480px', margin: '0 auto'
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            marginBottom: '1.25rem'
          }}>
            <Building2 size={18} color="#4F7CCF" />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
              Cristedor Group
            </span>
          </div>

          {coreCompanies.map(company => {
            const color = DIVISION_COLORS[company.division] || '#4F7CCF';
            const children = childrenOf(company.id);
            const isOpen = expanded === company.id;
            return (
              <div key={company.id} className="eco-accordion-item" style={{
                marginBottom: '0.75rem', borderRadius: '12px', overflow: 'hidden',
                border: `1px solid ${isOpen ? color + '40' : 'rgba(79,124,207,0.12)'}`,
                background: isOpen ? `${color}08` : 'rgba(17, 28, 46, 0.5)',
                transition: 'all 0.3s'
              }}>
                <button
                  type="button"
                  className="eco-accordion-trigger"
                  onClick={() => toggleExpand(company.id)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.9rem 1rem', background: 'transparent', border: 'none',
                    cursor: 'pointer', fontFamily: 'var(--font-body)',
                    color: '#fff', fontSize: '0.9rem', fontWeight: 600
                  }}
                >
                  <span style={{ color, display: 'flex', flexShrink: 0 }}>{DIVISION_ICONS[company.division]}</span>
                  <span style={{ flex: 1, textAlign: 'left' }}>{company.name}</span>
                  {children.length > 0 && (
                    <span style={{
                      fontSize: '0.68rem', fontFamily: 'var(--font-mono)',
                      color: 'rgba(255,255,255,0.45)'
                    }}>
                      {children.length} {children.length === 1 ? 'product' : 'products'}
                    </span>
                  )}
                  <ChevronDown size={16} style={{
                    color: 'rgba(255,255,255,0.4)', flexShrink: 0,
                    transition: 'transform 0.3s',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                  }} />
                </button>

                {isOpen && children.length > 0 && (
                  <div className="eco-accordion-children" style={{
                    display: 'flex', flexDirection: 'column', gap: '0.4rem',
                    padding: '0 1rem 1rem'
                  }}>
                    {children.map(child => (
                      <button
                        key={child.id}
                        type="button"
                        className="eco-accordion-child"
                        onClick={() => navigateTo(child)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.4rem',
                          padding: '0.55rem 0.75rem', borderRadius: '8px',
                          background: 'rgba(17, 28, 46, 0.6)',
                          border: '1px solid rgba(79,124,207,0.08)',
                          color: 'rgba(255,255,255,0.6)',
                          fontSize: '0.78rem', fontFamily: 'var(--font-mono)',
                          cursor: 'pointer', textAlign: 'left',
                          transition: 'all 0.25s'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = `${PRODUCT_COLOR}18`;
                          e.currentTarget.style.color = '#fff';
                          e.currentTarget.style.borderColor = PRODUCT_COLOR + '40';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'rgba(17, 28, 46, 0.6)';
                          e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                          e.currentTarget.style.borderColor = 'rgba(79,124,207,0.08)';
                        }}
                      >
                        <Package size={11} style={{ color: PRODUCT_COLOR, flexShrink: 0 }} />
                        <span style={{ flex: 1 }}>{child.name}</span>
                        <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)' }}>
                          {child.status}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
