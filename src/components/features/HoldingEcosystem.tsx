import React, { useState } from 'react';
import { RoutePath } from '../../types';
import { SectionHeader } from '../common/SectionHeader';
import { GlassCard } from '../common/GlassCard';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Building2, Cpu, Film, ArrowRight } from 'lucide-react';

interface HoldingEcosystemProps {
  onNavigate: (path: RoutePath) => void;
}

type VentureId = 'group' | 'labs' | 'media';

export const HoldingEcosystem: React.FC<HoldingEcosystemProps> = ({ onNavigate }) => {
  const [activeDivision, setActiveDivision] = useState<VentureId>('group');

  const divisions: {
    id: VentureId;
    name: string;
    tagline: string;
    icon: React.ReactNode;
    description: string;
    headcount: string;
    highlights: string[];
  }[] = [
    {
      id: 'group',
      name: 'Cristedor Group',
      tagline: 'The Parent Holding Company',
      icon: <Building2 size={24} style={{ color: 'var(--accent-cyan)' }} />,
      description: 'The parent company that owns and supports our ventures. It provides long-term capital, shared infrastructure, and governance.',
      headcount: 'Being Established',
      highlights: ['Parent of Labs and Media', 'Private and early-stage', 'Based in Ghana, online-first']
    },
    {
      id: 'labs',
      name: 'Cristedor Labs',
      tagline: 'Technology & AI Products',
      icon: <Cpu size={24} style={{ color: 'var(--accent-cyan)' }} />,
      description: 'Builds and develops software products, digital platforms, and AI-powered tools.',
      headcount: 'Team Being Assembled',
      highlights: ['Software products', 'AI-powered tools', 'Being established']
    },
    {
      id: 'media',
      name: 'Cristedor Media',
      tagline: 'Media & Content',
      icon: <Film size={24} style={{ color: 'var(--accent-cyan)' }} />,
      description: 'Is being established as the Group\'s media venture, focused on developing digital content and media initiatives.',
      headcount: 'Team Being Assembled',
      highlights: ['Digital content in development', 'Media initiatives', 'Being established']
    }
  ];

  const current = divisions.find(d => d.id === activeDivision) || divisions[0];

  return (
    <section style={{ padding: 'var(--space-24) 0', borderBottom: '1px solid var(--glass-border)' }}>
      <div className="container">
        <SectionHeader
          badge="❖ OUR VENTURES"
          title="The Companies We Own"
          description="Cristedor Group is building two current ventures — Cristedor Labs and Cristedor Media — each with their own mission and focus."
        />

        {/* Venture Selector Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            overflowX: 'auto',
            paddingBottom: 'var(--space-4)',
            marginBottom: 'var(--space-8)'
          }}
        >
          {divisions.map(d => {
            const isActive = d.id === activeDivision;
            return (
              <button
                key={d.id}
                onClick={() => setActiveDivision(d.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: isActive ? 'var(--glass-bg-md)' : 'transparent',
                  border: isActive ? '1px solid var(--accent-cyan)' : '1px solid var(--glass-border)',
                  color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: isActive ? 600 : 400,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {d.icon}
                <span>{d.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Venture Panel */}
        <GlassCard style={{ padding: 'var(--space-8)', borderColor: 'var(--glass-border-hover)' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-8)',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: 'var(--space-3)' }}>
                <Badge variant="cyan">{current.name}</Badge>
                <Badge variant="subdued">{current.headcount}</Badge>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
                {current.tagline}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
                {current.description}
              </p>
              <Button icon={<ArrowRight size={18} />} onClick={() => onNavigate('/divisions')}>
                Explore {current.name}
              </Button>
            </div>

            <div style={{ backgroundColor: 'var(--bg-primary)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--accent-cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 'var(--space-4)' }}>
                KEY HIGHLIGHTS
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {current.highlights.map((h, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>✓</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
