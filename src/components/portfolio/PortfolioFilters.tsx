import React from 'react';
import { Search, X, ArrowUpDown, Layers } from 'lucide-react';
import { PortfolioSort } from '../../types';
import { PortfolioDivisionFilter, DIVISION_TABS, SORT_OPTIONS, STATUS_FILTER_OPTIONS } from '../../data/portfolioMeta';

interface PortfolioFiltersProps {
  search: string;
  onSearch: (value: string) => void;
  division: PortfolioDivisionFilter;
  onDivision: (value: PortfolioDivisionFilter) => void;
  status: string;
  onStatus: (value: string) => void;
  sort: PortfolioSort;
  onSort: (value: PortfolioSort) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

const selectStyle: React.CSSProperties = {
  padding: '0.6rem 2.25rem 0.6rem 0.75rem',
  borderRadius: '10px',
  background: 'rgba(10, 18, 32, 0.7)',
  border: '1px solid rgba(79, 124, 207, 0.15)',
  color: 'rgba(255,255,255,0.75)',
  fontSize: '0.8rem',
  fontFamily: 'var(--font-mono)',
  outline: 'none',
  cursor: 'pointer',
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 0.6rem center'
};

export const PortfolioFilters: React.FC<PortfolioFiltersProps> = ({
  search, onSearch, division, onDivision, status, onStatus, sort, onSort, hasActiveFilters, onClearFilters
}) => {
  return (
    <div className="filter-bar" style={{
      display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap',
      padding: '1.25rem 1.5rem', marginBottom: '1rem',
      borderRadius: '16px',
      background: 'rgba(17, 28, 46, 0.5)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(79, 124, 207, 0.18)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)'
    }}>
      {/* Search */}
      <div className="search-wrapper" style={{ position: 'relative', minWidth: '260px', flex: 1 }}>
        <Search size={16} style={{
          position: 'absolute', left: '0.875rem', top: '50%',
          transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)'
        }} />
        <input
          type="text"
          placeholder="Search companies and products..."
          value={search}
          onChange={e => onSearch(e.target.value)}
          className="search-input"
          aria-label="Search companies and ventures"
          style={{
            width: '100%', padding: '0.6rem 2.5rem 0.6rem 2.5rem',
            borderRadius: '10px',
            background: 'rgba(10, 18, 32, 0.7)',
            border: '1px solid rgba(79, 124, 207, 0.15)',
            color: '#fff', fontSize: '0.85rem',
            fontFamily: 'var(--font-body)', outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s'
          }}
          onFocus={e => {
            e.currentTarget.style.borderColor = 'rgba(79,124,207,0.4)';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79,124,207,0.1)';
          }}
          onBlur={e => {
            e.currentTarget.style.borderColor = 'rgba(79, 124, 207, 0.15)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        {search && (
          <button
            type="button"
            className="search-clear"
            onClick={() => onSearch('')}
            aria-label="Clear search"
            style={{
              position: 'absolute', right: '0.6rem', top: '50%',
              transform: 'translateY(-50%)',
              width: '22px', height: '22px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.08)', border: 'none',
              color: 'rgba(255,255,255,0.5)', cursor: 'pointer'
            }}
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* Division pills */}
      <div className="filter-pills" style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '2px' }}>
        {DIVISION_TABS.map(tab => {
          const isActive = division === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onDivision(tab.id)}
              className="filter-pill"
              aria-pressed={isActive}
              style={{
                padding: '0.45rem 0.9rem', borderRadius: '9999px',
                fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 600,
                letterSpacing: '0.03em', whiteSpace: 'nowrap',
                background: isActive ? 'rgba(79, 124, 207, 0.15)' : 'rgba(17, 28, 46, 0.4)',
                color: isActive ? '#4F7CCF' : 'rgba(255,255,255,0.45)',
                border: `1px solid ${isActive ? 'rgba(79,124,207,0.4)' : 'rgba(255,255,255,0.08)'}`,
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(79, 124, 207, 0.08)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
                  e.currentTarget.style.borderColor = 'rgba(79,124,207,0.2)';
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(17, 28, 46, 0.4)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                }
              }}
            >
              <span className="desktop-label">{tab.label}</span>
              <span className="mobile-label" aria-hidden="true">{tab.shortLabel || tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Status + Sort selects */}
      <div className="filter-selects" style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <Layers size={13} style={{
            position: 'absolute', left: '0.6rem', top: '50%',
            transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)', pointerEvents: 'none'
          }} />
          <select
            className="filter-select"
            value={status}
            onChange={e => onStatus(e.target.value)}
            aria-label="Filter by status"
            style={{ ...selectStyle, paddingLeft: '1.85rem' }}
          >
            {STATUS_FILTER_OPTIONS.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div style={{ position: 'relative' }}>
          <ArrowUpDown size={13} style={{
            position: 'absolute', left: '0.6rem', top: '50%',
            transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)', pointerEvents: 'none'
          }} />
          <select
            className="filter-select"
            value={sort}
            onChange={e => onSort(e.target.value as PortfolioSort)}
            aria-label="Sort companies and ventures"
            style={{ ...selectStyle, paddingLeft: '1.85rem' }}
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.id} value={opt.id}>Sort: {opt.label}</option>
            ))}
          </select>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            className="filter-clear"
            onClick={onClearFilters}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
              padding: '0.55rem 0.85rem', borderRadius: '10px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)', fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(79,124,207,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
          >
            <X size={12} /> Clear
          </button>
        )}
      </div>
    </div>
  );
};
