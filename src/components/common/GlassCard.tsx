import React from 'react';

interface GlassCardProps {
  interactive?: boolean;
  glowColor?: 'cyan' | 'gold' | 'none';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  interactive = false,
  glowColor = 'none',
  children,
  className = '',
  style = {},
  onClick
}) => {
  const getGlowBorder = () => {
    if (glowColor === 'cyan') return 'var(--glass-border-hover)';
    if (glowColor === 'gold') return 'rgba(212, 175, 55, 0.4)';
    return 'var(--glass-border)';
  };

  return (
    <div
      onClick={onClick}
      className={`glass-panel ${interactive ? 'glass-panel-interactive' : ''} ${className}`}
      style={{
        padding: 'var(--space-6)',
        cursor: onClick || interactive ? 'pointer' : 'default',
        borderColor: glowColor !== 'none' ? getGlowBorder() : undefined,
        ...style
      }}
    >
      {children}
    </div>
  );
};
