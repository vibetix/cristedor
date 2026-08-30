import React from 'react';

interface BadgeProps {
  variant?: 'cyan' | 'gold' | 'emerald' | 'subdued';
  live?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'cyan',
  live = false,
  children,
  className = '',
  style = {}
}) => {
  const getStyles = () => {
    switch (variant) {
      case 'cyan':
        return {
          background: 'rgba(79, 124, 207, 0.15)',
          color: 'var(--accent-primary)',
          border: '1px solid rgba(79, 124, 207, 0.3)'
        };
      case 'gold':
        return {
          background: 'rgba(51, 94, 170, 0.15)',
          color: 'var(--accent-secondary)',
          border: '1px solid rgba(51, 94, 170, 0.3)'
        };
      case 'emerald':
        return {
          background: 'rgba(16, 185, 129, 0.1)',
          color: 'var(--status-success)',
          border: '1px solid rgba(16, 185, 129, 0.25)'
        };
      case 'subdued':
        return {
          background: 'var(--glass-bg-sm)',
          color: 'var(--text-muted)',
          border: '1px solid var(--glass-border)'
        };
    }
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.25rem 0.65rem',
        borderRadius: 'var(--radius-full)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        ...getStyles(),
        ...style
      }}
      className={`badge-${variant} ${className}`}
    >
      {live && <span className="status-dot" />}
      {children}
    </span>
  );
};
