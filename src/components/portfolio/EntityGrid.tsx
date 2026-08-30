import React from 'react';
import { PortfolioEntity, RoutePath } from '../../types';
import { EntityCard } from './EntityCard';
import { PortfolioEmptyState } from './PortfolioEmptyState';

interface EntityGridProps {
  entities: PortfolioEntity[];
  search: string;
  onClearFilters: () => void;
  onNavigate: (path: RoutePath, query?: Record<string, string>) => void;
  onQuickView?: (entity: PortfolioEntity) => void;
}

export const EntityGrid: React.FC<EntityGridProps> = ({
  entities, search, onClearFilters, onNavigate, onQuickView
}) => {
  if (entities.length === 0) {
    return (
      <PortfolioEmptyState
        search={search}
        onClearFilters={onClearFilters}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <div className="entity-grid" style={{
      display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem'
    }}>
      {entities.map(item => (
        <EntityCard
          key={item.id}
          entity={item}
          onClick={() => onNavigate(item.detailRoute, { id: item.id })}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};
