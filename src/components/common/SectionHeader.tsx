import React from 'react';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  children?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  description,
  align = 'left',
  children,
  className = ''
}) => {
  return (
    <div
      style={{
        textAlign: align,
        marginBottom: 'var(--space-12)',
        maxWidth: align === 'center' ? '760px' : '100%',
        marginLeft: align === 'center' ? 'auto' : undefined,
        marginRight: align === 'center' ? 'auto' : undefined
      }}
      className={`section-header ${className}`}
    >
      {badge && (
        <div style={{ marginBottom: 'var(--space-3)' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: 'var(--accent-primary)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}
          >
            {badge}
          </span>
        </div>
      )}
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          marginBottom: description ? 'var(--space-4)' : 0
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'var(--text-muted)',
            lineHeight: 1.6
          }}
        >
          {description}
        </p>
      )}
      {children && <div style={{ marginTop: 'var(--space-6)' }}>{children}</div>}
    </div>
  );
};
