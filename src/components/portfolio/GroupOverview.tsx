import React, { useState } from 'react';
import { RoutePath } from '../../types';
import { ArrowUpRight, Building2 } from 'lucide-react';

interface GroupOverviewProps {
  onNavigate: (path: RoutePath, query?: Record<string, string>) => void;
}

export const GroupOverview: React.FC<GroupOverviewProps> = ({ onNavigate }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <section style={{ paddingBottom: '3rem' }}>
      <div className="group-overview"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onNavigate('/about')}
        style={{
          position: 'relative', borderRadius: '20px', overflow: 'hidden',
          cursor: 'pointer', padding: '2.5rem 3rem',
          background: 'linear-gradient(135deg, rgba(79,124,207,0.08) 0%, rgba(17,28,46,0.5) 50%, rgba(5,9,20,0.8) 100%)',
          border: `1px solid ${hovered ? 'rgba(79,124,207,0.35)' : 'rgba(79,124,207,0.12)'}`,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          boxShadow: hovered
            ? '0 20px 50px rgba(0,0,0,0.4), 0 0 40px rgba(79,124,207,0.08)'
            : '0 10px 30px rgba(0,0,0,0.25)'
        }}
      >
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem',
          alignItems: 'center', position: 'relative', zIndex: 1
        }}>
          <div>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#4F7CCF', marginBottom: '0.75rem'
            }}>
              ❖ THE HOLDING COMPANY
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)',
              fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '0.75rem'
            }}>
              Cristedor Group
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, maxWidth: '520px'
            }}>
              Cristedor Group is a private holding company building and developing
              businesses across technology and media —
              early-stage, founder-led, and online-first.
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '16px',
              background: 'linear-gradient(135deg, #4F7CCF, #335EAA)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginLeft: 'auto', marginBottom: '1rem',
              boxShadow: '0 4px 20px rgba(79,124,207,0.3)',
              border: '1px solid rgba(255,255,255,0.12)'
            }}>
              <Building2 size={28} color="#fff" />
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              color: hovered ? '#4F7CCF' : 'rgba(79,124,207,0.6)',
              fontSize: '0.8rem', fontWeight: 600,
              transition: 'color 0.3s'
            }}>
              <span>Explore Group</span>
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>

        {/* Decorative blurred orb */}
        <div style={{
          position: 'absolute', top: '-50%', right: '-10%',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,124,207,0.06), transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none'
        }} />
      </div>
    </section>
  );
};
