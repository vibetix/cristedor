import React, { useEffect } from 'react';
import { RoutePath } from '../../types';
import { X, ChevronRight, ArrowRight } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen, onClose, currentPath, onNavigate
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const navItems: { label: string; path: RoutePath }[] = [
    { label: 'Home', path: '/' },
    { label: 'Companies', path: '/portfolio' },
    { label: 'Investments', path: '/investors' },
    { label: 'News', path: '/newsroom' },
    { label: 'About', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 'var(--z-drawer)',
          animation: 'fadeIn 0.2s ease-out'
        }}
      />

      {/* Sidebar */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(320px, 85vw)',
          backgroundColor: 'rgba(5,9,20,0.98)',
        backdropFilter: 'blur(24px)',
        zIndex: 'calc(var(--z-drawer) + 1)',
        display: 'flex', flexDirection: 'column',
        padding: '2rem 1.5rem',
          borderLeft: '1px solid var(--border-soft)',
        boxShadow: '-8px 0 32px rgba(0,0,0,0.5)',
        animation: 'slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}>
        {/* Header with logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div
            onClick={() => { onNavigate('/'); onClose(); }}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <img 
              src="/cristedor logo.png" 
              alt="Cristedor Group" 
              style={{ 
                height: '40px', 
                width: 'auto',
                objectFit: 'contain',
                backgroundColor: '#ffffff',
                padding: '4px 8px',
                borderRadius: '8px'
              }} 
            />
          </div>
          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            style={{
              width: '44px', height: '44px', borderRadius: '10px',
              background: '#FFFFFF',
              border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#0B1630'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {navItems.map(item => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.875rem 1rem', borderRadius: '10px',
                  backgroundColor: isActive ? 'rgba(79,124,207,0.15)' : 'transparent',
                  border: isActive ? '1px solid rgba(79,124,207,0.35)' : '1px solid transparent',
                  color: isActive ? '#fff' : '#94A3B8',
                  fontFamily: 'var(--font-body)', fontSize: '1.05rem',
                  fontWeight: isActive ? 600 : 400, textAlign: 'left',
                  cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                <span>{item.label}</span>
                <ChevronRight size={16} style={{ opacity: 0.5, color: isActive ? 'var(--accent-primary)' : 'currentColor' }} />
              </button>
            );
          })}
        </nav>

        {/* CTA button */}
        <div style={{ paddingTop: '1.5rem', paddingBottom: 'env(safe-area-inset-bottom, 0)', borderTop: '1px solid var(--border-soft)' }}>
          <button
            onClick={() => onNavigate('/portfolio')}
            style={{
              width: '100%', padding: '0.875rem 1.25rem', borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
              border: 'none', color: '#fff', fontWeight: 700, fontSize: '0.95rem',
              cursor: 'pointer', fontFamily: 'var(--font-body)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              boxShadow: '0 0 20px var(--accent-cyan-glow)'
            }}
          >
            Explore Our Companies <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
};