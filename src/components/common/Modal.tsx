import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(5, 9, 20, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 'var(--z-modal)',
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '580px',
          height: '100%',
          backgroundColor: 'var(--bg-secondary)',
          borderLeft: '1px solid var(--glass-border)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          padding: 'var(--space-8)',
          animation: 'slideInRight 0.3s var(--ease-out-expo)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-6)',
            paddingBottom: 'var(--space-4)',
            borderBottom: '1px solid var(--glass-border)'
          }}
        >
          <div>
            {title && (
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 700,
                  color: 'var(--text-primary)'
                }}
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--accent-cyan)',
                  marginTop: '0.25rem'
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
          <Button variant="icon" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </Button>
        </div>
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </div>
  );
};
