import React from 'react';
import { Modal } from '../common/Modal';
import { useModal } from '../../context/ModalContext';
import { PortfolioEntity, RoutePath } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ArrowRight, Activity, Layers, Package, Globe } from 'lucide-react';
import { DIVISION_LABELS, TYPE_LABELS } from '../../data/portfolioMeta';
import { portfolioData } from '../../data/portfolioData';

interface VentureModalData {
  entity: PortfolioEntity;
  onNavigate: (path: RoutePath, query?: Record<string, string>) => void;
}

export const VentureDetailModal: React.FC = () => {
  const { activeModal, modalData, closeModal } = useModal();

  if (activeModal !== 'venture' || !modalData) return null;
  const { entity, onNavigate } = modalData as VentureModalData;

  const products = portfolioData.filter(e => e.type === 'product' && e.parentId === entity.id);
  const infoRows: { icon: React.ReactNode; label: string; value: string }[] = [
    { icon: <Activity size={18} />, label: 'Status', value: entity.status },
    { icon: <Layers size={18} />, label: 'Focus', value: DIVISION_LABELS[entity.division] },
    ...(products.length > 0
      ? [{ icon: <Package size={18} />, label: 'Products', value: `${products.length} in development` }]
      : []),
    { icon: <Globe size={18} />, label: 'Operating Model', value: 'Online-first' }
  ];

  const openDetails = () => {
    onNavigate(entity.detailRoute, { id: entity.id });
    closeModal();
  };

  return (
    <Modal
      isOpen={activeModal === 'venture'}
      onClose={closeModal}
      title={entity.name}
      subtitle={`${TYPE_LABELS[entity.type]} · ${DIVISION_LABELS[entity.division]}`}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Badge variant="cyan">{entity.status}</Badge>
        </div>

        <div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            {entity.tagline}
          </h4>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {entity.description}
          </p>
        </div>

        <div style={{ backgroundColor: 'var(--bg-primary)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {infoRows.map((row, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: 'var(--text-sm)' }}>
              <span style={{ color: 'var(--accent-cyan)', display: 'flex' }}>{row.icon}</span>
              <span>{row.label}: <strong>{row.value}</strong></span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: 'var(--space-4)', flexWrap: 'wrap' }}>
          <Button icon={<ArrowRight size={16} />} onClick={openDetails}>
            View Full Details
          </Button>
          <Button variant="glass" onClick={closeModal}>
            Close Details
          </Button>
        </div>
      </div>
    </Modal>
  );
};
