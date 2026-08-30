import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { RoutePath } from '../../types';

export interface BreadcrumbItem {
  label: string;
  path?: RoutePath;
  query?: Record<string, string>;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (path: RoutePath, query?: Record<string, string>) => void;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate, className = '' }) => (
  <nav className={`breadcrumbs ${className}`} aria-label="Breadcrumb">
    <ol style={{
      display: 'flex', alignItems: 'center', flexWrap: 'wrap',
      gap: '0.25rem', listStyle: 'none', margin: 0, padding: 0
    }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const inner = (
          <>
            {i === 0 && <Home size={12} />}
            <span>{item.label}</span>
          </>
        );
        return (
          <li key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            {i > 0 && <ChevronRight size={12} style={{ color: 'rgba(255,255,255,0.2)' }} />}
            {!isLast && item.path ? (
              <button
                type="button"
                onClick={() => onNavigate(item.path!, item.query)}
                className="breadcrumb-link"
              >
                {inner}
              </button>
            ) : (
              <span
                className={`breadcrumb-current${item.active ? ' breadcrumb-active' : ''}`}
                aria-current={isLast ? 'page' : undefined}
              >
                {inner}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);
