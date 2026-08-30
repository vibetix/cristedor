import React from 'react';
import { RoutePath } from '../types';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Building2, Cpu, Film, ArrowRight } from 'lucide-react';

interface DivisionsPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const DivisionsPage: React.FC<DivisionsPageProps> = ({ onNavigate }) => {
  const divisions = [
    {
      id: 'group',
      name: 'Cristedor Group',
      tagline: 'The Parent Holding Company',
      icon: <Building2 size={32} style={{ color: 'var(--accent-cyan)' }} />,
      desc: 'The parent company that owns and supports our ventures. It provides long-term capital, shared infrastructure, and governance.',
      metric: 'Online-First',
      headcount: 'Being Established',
      subsidiaries: ['Cristedor Labs', 'Cristedor Media']
    },
    {
      id: 'labs',
      name: 'Cristedor Labs',
      tagline: 'Technology & AI Products',
      icon: <Cpu size={32} style={{ color: 'var(--accent-cyan)' }} />,
      desc: 'Builds software products, digital platforms, and AI-powered tools.',
      metric: 'Being Established',
      headcount: 'Team Being Assembled',
      subsidiaries: ['UniStay', 'Synkturt TTS', 'Vibetix']
    },
    {
      id: 'media',
      name: 'Cristedor Media',
      tagline: 'Media & Content',
      icon: <Film size={32} style={{ color: 'var(--accent-cyan)' }} />,
      desc: 'Is being established as the Group\'s media venture, focused on developing digital content and media initiatives.',
      metric: 'Being Established',
      headcount: 'Team Being Assembled',
      subsidiaries: ['Publications — in development']
    }
  ];

  return (
    <div style={{ padding: 'var(--space-16) 0' }}>
      <div className="container">
        <SectionHeader
          badge="❖ VENTURES"
          title="Our Ventures"
          description="The companies Cristedor Group owns and operates today — the parent, plus technology and media ventures being established."
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
          {divisions.map(div => (
            <GlassCard key={div.id} style={{ padding: 'var(--space-8)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-8)', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: 'var(--space-4)' }}>
                    {div.icon}
                    <div>
                      <Badge variant="cyan">{div.name}</Badge>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                        {div.tagline}
                      </h3>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
                    {div.desc}
                  </p>
                  <Button icon={<ArrowRight size={16} />} onClick={() => onNavigate('/portfolio')}>
                    View {div.name} Portfolio Matrix
                  </Button>
                </div>

                <div style={{ backgroundColor: 'var(--bg-primary)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--glass-border)', fontSize: 'var(--text-sm)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Status:</span>
                    <strong style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>{div.metric}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--glass-border)', fontSize: 'var(--text-sm)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Staffing:</span>
                    <strong style={{ color: 'var(--text-primary)' }}>{div.headcount}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Active Subsidiaries:</span>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                      {div.subsidiaries.map((s, i) => (
                        <Badge key={i} variant="subdued">{s}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};
