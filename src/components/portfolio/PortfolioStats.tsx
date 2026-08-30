import React from 'react';
import { Building2, Layers, Calendar, Globe } from 'lucide-react';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';
import { portfolioData } from '../../data/portfolioData';

const AnimatedNumber: React.FC<{ target: number }> = ({ target }) => {
  const { ref, count } = useAnimatedCounter(target);
  return <span ref={ref}>{count}</span>;
};

export const PortfolioStats: React.FC = () => {
  const companies = portfolioData.filter(e => e.type === 'company').length;
  const products = portfolioData.filter(e => e.type === 'product').length;

  const stats: {
    animated: boolean;
    target?: number;
    text?: string;
    label: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    { animated: true, target: companies, label: 'Companies in Development', icon: <Building2 size={24} />, color: '#4F7CCF' },
    { animated: true, target: products, label: 'Products in Development', icon: <Layers size={24} />, color: '#335EAA' },
    { animated: false, text: '2024', label: 'Origin', icon: <Calendar size={24} />, color: '#D4AF37' },
    { animated: false, text: 'ONLINE-FIRST', label: 'Operating Model', icon: <Globe size={24} />, color: '#4F7CCF' }
  ];

  return (
    <div className="portfolio-stats" style={{
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem',
      marginBottom: '3rem'
    }}>
      {stats.map((stat, i) => (
        <div key={i} className="stat-card" style={{
          padding: '1.5rem', borderRadius: '16px', textAlign: 'center',
          background: 'rgba(17, 28, 46, 0.4)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: `1px solid ${stat.color}18`,
          boxShadow: '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)',
          transition: 'transform 0.3s, border-color 0.3s'
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = stat.color + '40'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = stat.color + '18'; }}
        >
          <div style={{ color: stat.color, marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>
            {stat.icon}
          </div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800,
            color: '#fff', lineHeight: 1.1, marginBottom: '0.35rem'
          }}>
            {stat.animated ? <AnimatedNumber target={stat.target || 0} /> : <span>{stat.text}</span>}
          </div>
          <div style={{
            fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)',
            fontFamily: 'var(--font-mono)', letterSpacing: '0.04em'
          }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};
