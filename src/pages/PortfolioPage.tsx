import React, { useEffect } from 'react';
import { RoutePath } from '../types';
import { portfolioData } from '../data/portfolioData';
import { usePortfolioFilter } from '../hooks/usePortfolioFilter';
import { useModal } from '../context/ModalContext';
import { PortfolioHero } from '../components/portfolio/PortfolioHero';
import { PortfolioStats } from '../components/portfolio/PortfolioStats';
import { GroupOverview } from '../components/portfolio/GroupOverview';
import { FeaturedCompanies } from '../components/portfolio/FeaturedCompanies';
import { EcosystemDiagram } from '../components/portfolio/EcosystemDiagram';
import { PortfolioDirectory } from '../components/portfolio/PortfolioDirectory';
import '../styles/portfolio.css';

interface PortfolioPageProps {
  onNavigate: (path: RoutePath, query?: Record<string, string>) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onNavigate }) => {
  const { openModal } = useModal();
  const filter = usePortfolioFilter(portfolioData);

  const openQuickView = (entity: (typeof portfolioData)[number]) => {
    openModal('venture', { entity, onNavigate });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get('sector') || params.get('division');
    if (s && (['tech', 'ai', 'media', 'labs', 'technology', 'media'].includes(s))) {
      const el = document.getElementById('portfolio-directory');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div style={{ backgroundColor: '#050914', minHeight: '100vh' }}>
      <PortfolioHero onNavigate={onNavigate} />

      <div className="container" style={{ padding: '0 1.5rem' }}>
        <PortfolioStats />
        <GroupOverview onNavigate={onNavigate} />
        <FeaturedCompanies onNavigate={onNavigate} onQuickView={openQuickView} />
        <EcosystemDiagram onNavigate={onNavigate} />

        {/* Gradient divider */}
        <div style={{
          height: '1px', marginBottom: '2.5rem',
          background: 'linear-gradient(90deg, transparent, rgba(79,124,207,0.25), transparent)'
        }} />

        <PortfolioDirectory filter={filter} onNavigate={onNavigate} onQuickView={openQuickView} />
      </div>
    </div>
  );
};
