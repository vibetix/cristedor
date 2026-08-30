import React from 'react';
import { PortfolioStatus } from '../types';

export const STATUS_META: Record<PortfolioStatus, { label: string; color: string; tier: number }> = {
  LAUNCHING: { label: 'LAUNCHING', color: '#4F7CCF', tier: 2 },
  'IN DEVELOPMENT': { label: 'IN DEVELOPMENT', color: '#6B93D4', tier: 1 },
  CONCEPT: { label: 'CONCEPT', color: '#D4AF37', tier: 0 }
};

export const STATUS_ORDER: Record<string, number> = {
  LAUNCHING: 2,
  'IN DEVELOPMENT': 1,
  CONCEPT: 0
};

export const getStatusMeta = (status: string): { label: string; color: string; tier: number } =>
  STATUS_META[status as PortfolioStatus] || { label: status, color: '#4F7CCF', tier: 0 };

export const StatusBadge: React.FC<{ status: string; size?: 'sm' | 'md' }> = ({ status, size = 'sm' }) => {
  const meta = getStatusMeta(status);
  const isMd = size === 'md';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
      padding: isMd ? '0.3rem 0.8rem' : '0.2rem 0.6rem',
      borderRadius: '9999px', fontSize: isMd ? '0.7rem' : '0.6rem',
      fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase',
      background: `${meta.color}18`, color: meta.color,
      border: `1px solid ${meta.color}30`,
      fontFamily: 'var(--font-mono)'
    }}>
      <span style={{
        width: isMd ? '6px' : '5px', height: isMd ? '6px' : '5px',
        borderRadius: '50%', background: meta.color, flexShrink: 0
      }} />
      {meta.label}
    </span>
  );
};
