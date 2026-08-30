import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'glass' | 'outline' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  loading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
          color: '#FFFFFF',
          fontWeight: 700,
          border: 'none',
          boxShadow: '0 4px 20px var(--accent-cyan-glow)'
        };
      case 'glass':
        return {
          background: 'var(--glass-bg-sm)',
          color: 'var(--text-primary)',
          border: '1px solid var(--glass-border)',
          backdropFilter: 'blur(12px)'
        };
      case 'outline':
        return {
          background: 'transparent',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-soft)'
        };
      case 'icon':
        return {
          background: 'var(--glass-bg-sm)',
          color: 'var(--text-primary)',
          border: '1px solid var(--glass-border)',
          borderRadius: '50%',
          padding: '0.6rem'
        };
    }
  };

  const getSizeStyles = () => {
    if (variant === 'icon') return {};
    switch (size) {
      case 'sm':
        return { padding: '0.4rem 0.875rem', fontSize: 'var(--text-sm)' };
      case 'md':
        return { padding: '0.65rem 1.25rem', fontSize: 'var(--text-base)' };
      case 'lg':
        return { padding: '0.875rem 1.75rem', fontSize: 'var(--text-lg)' };
    }
  };

  return (
    <button
      disabled={disabled || loading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        borderRadius: 'var(--radius-md)',
        transition: 'all var(--transition-fast)',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.5 : 1,
        fontFamily: 'var(--font-body)',
        outline: 'none',
        ...getVariantStyles(),
        ...getSizeStyles()
      }}
      className={`btn-${variant} ${className}`}
      onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-cyan-glow)'; }}
      onBlur={(e) => { e.currentTarget.style.boxShadow = getVariantStyles().boxShadow || 'none'; }}
      {...props}
    >
      {loading ? (
        <span
          style={{
            width: '16px',
            height: '16px',
            border: '2px solid rgba(255,255,255,0.3)',
            borderTopColor: 'currentColor',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </button>
  );
};
