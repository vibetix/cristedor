import React from 'react';

import { SectionHeader } from '../common/SectionHeader';
import { GlassCard } from '../common/GlassCard';
import { leadershipData } from '../../data/leadershipData';
import { useModal } from '../../context/ModalContext';
import { Award } from 'lucide-react';

export const LeadershipGrid: React.FC = () => {
  const { openModal } = useModal();

  return (
    <section style={{ padding: 'var(--space-24) 0', borderBottom: '1px solid var(--glass-border)' }}>
      <div className="container">
        <SectionHeader
          badge="❖ EXECUTIVE STEWARDSHIP"
          title="Leadership"
          description="Cristedor Group is led by its founder, with a small team being assembled as the ventures are established."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-8)'
          }}
        >
          {leadershipData.map(leader => (
            <GlassCard key={leader.id} interactive glowColor="cyan" onClick={() => openModal('leader', leader)}>
              <div
                style={{
                  width: '100%',
                  height: '240px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  marginBottom: 'var(--space-4)',
                  position: 'relative'
                }}
              >
                <img
                  src={leader.imageUrl}
                  alt={leader.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(20%) contrast(110%)'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 50%, rgba(5,9,20,0.9) 100%)'
                  }}
                />
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                {leader.name}
              </h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--accent-cyan)', marginBottom: 'var(--space-3)' }}>
                {leader.role}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 'var(--space-4)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {leader.bio}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--text-xs)', color: 'var(--accent-gold)', fontWeight: 600 }}>
                <Award size={14} />
                <span>View Full Executive Profile →</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
