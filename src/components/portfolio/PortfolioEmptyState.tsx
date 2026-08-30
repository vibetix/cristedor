import React from 'react';
import { RoutePath } from '../../types';
import { Search } from 'lucide-react';

interface PortfolioEmptyStateProps {
  search: string;
  onClearFilters: () => void;
  onNavigate: (path: RoutePath, query?: Record<string, string>) => void;
}

export const PortfolioEmptyState: React.FC<PortfolioEmptyStateProps> = ({ search, onClearFilters, onNavigate }) => (
  <div className="portfolio-empty" style={{
    textAlign: 'center', padding: '4rem 2rem',
    borderRadius: '16px',
    background: 'rgba(17, 28, 46, 0.3)',
    border: '1px solid rgba(79, 124, 207, 0.1)'
  }}>
    <Search size={32} style={{ color: 'rgba(255,255,255,0.15)', marginBottom: '1rem' }} />
    <h3 style={{
      fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700,
      color: '#fff', marginBottom: '0.5rem'
    }}>
      No results found
    </h3>
    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem', fontFamily: 'var(--font-body)', marginBottom: '1.75rem' }}>
      We couldn't find anything matching{search ? <> &ldquo;<span style={{ color: 'rgba(255,255,255,0.75)' }}>{search}</span>&rdquo;</> : ' the selected filters'}.
    </p>
    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
      <button
        type="button"
        className="empty-action"
        onClick={onClearFilters}
        style={{
          padding: '0.6rem 1.25rem', borderRadius: '10px',
          background: 'linear-gradient(135deg, #4F7CCF, #335EAA)',
          border: 'none', color: '#fff', fontSize: '0.8rem', fontWeight: 700,
          cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.2s'
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(79,124,207,0.35)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        Clear Search
      </button>
      <button
        type="button"
        className="empty-action"
        onClick={() => onNavigate('/portfolio')}
        style={{
          padding: '0.6rem 1.25rem', borderRadius: '10px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', fontWeight: 600,
          cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.2s'
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
      >
        View All Entries
      </button>
    </div>
  </div>
);
