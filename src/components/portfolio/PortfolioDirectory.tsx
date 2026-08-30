import React from 'react';
import { RoutePath, PortfolioEntity } from '../../types';
import { Globe, CalendarClock } from 'lucide-react';
import { PortfolioFilters } from './PortfolioFilters';
import { EntityGrid } from './EntityGrid';
import { PortfolioEmptyState } from './PortfolioEmptyState';
import { PortfolioFilterResult } from '../../hooks/usePortfolioFilter';
import { DIVISION_LABELS, PORTFOLIO_UPDATED } from '../../data/portfolioMeta';

interface PortfolioDirectoryProps {
  filter: PortfolioFilterResult;
  onNavigate: (path: RoutePath, query?: Record<string, string>) => void;
  onQuickView?: (entity: PortfolioEntity) => void;
}

interface DirectorySection {
  id: string;
  title: string;
  subtitle?: string;
  entities: PortfolioEntity[];
}

export const PortfolioDirectory: React.FC<PortfolioDirectoryProps> = ({ filter, onNavigate, onQuickView }) => {
  const {
    search, setSearch,
    division, setDivision,
    status, setStatus,
    sort, setSort,
    filtered, totalCount,
    hasActiveFilters, clearFilters
  } = filter;

  const sections: DirectorySection[] = [
    {
      id: 'companies',
      title: 'Companies',
      subtitle: 'Cristedor Group\'s operating companies.',
      entities: filtered.filter(e => e.type === 'company')
    },
    {
      id: 'products',
      title: 'Products in Development',
      subtitle: 'Being developed through Cristedor Labs.',
      entities: filtered.filter(e => e.type === 'product')
    }
  ];

  const visibleSections = sections.filter(s => s.entities.length > 0);

  return (
    <section id="portfolio-directory" style={{ paddingBottom: '4rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Globe size={18} color="#4F7CCF" />
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: '#fff'
          }}>
            Portfolio Directory
          </h2>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '1rem', flexWrap: 'wrap'
        }}>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem' }}>
            Cristedor Group's companies and the products in development through Cristedor Labs.
          </p>
          <span className="last-updated" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
            fontSize: '0.72rem', fontFamily: 'var(--font-mono)',
            color: 'rgba(255,255,255,0.35)'
          }}>
            <CalendarClock size={13} style={{ color: 'rgba(79,124,207,0.7)' }} />
            Portfolio updated {PORTFOLIO_UPDATED}
          </span>
        </div>
      </div>

      <PortfolioFilters
        search={search}
        onSearch={setSearch}
        division={division}
        onDivision={setDivision}
        status={status}
        onStatus={setStatus}
        sort={sort}
        onSort={setSort}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
      />

      {/* Results count */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '1.25rem', padding: '0 0.25rem'
      }}>
        <p style={{
          fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)',
          fontFamily: 'var(--font-mono)'
        }}>
          {filtered.length === totalCount
            ? `${totalCount} companies, products & ventures`
            : `${filtered.length} of ${totalCount} companies, products & ventures`
          }
          {division !== 'all' && (
            <span style={{ color: '#4F7CCF' }}>
              {' '}· {DIVISION_LABELS[division]}
            </span>
          )}
          {status !== 'all' && (
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>
              {' '}· {status}
            </span>
          )}
        </p>
      </div>

      {visibleSections.length === 0 ? (
        <PortfolioEmptyState
          search={search}
          onClearFilters={clearFilters}
          onNavigate={onNavigate}
        />
      ) : (
        visibleSections.map(section => (
          <div key={section.id} style={{ marginBottom: '2.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700,
                color: '#fff', marginBottom: '0.25rem'
              }}>
                {section.title}
                <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>
                  {' '}· {section.entities.length}
                </span>
              </h3>
              {section.subtitle && (
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem' }}>
                  {section.subtitle}
                </p>
              )}
            </div>
            <EntityGrid
              entities={section.entities}
              search={search}
              onClearFilters={clearFilters}
              onNavigate={onNavigate}
              onQuickView={onQuickView}
            />
          </div>
        ))
      )}
    </section>
  );
};
