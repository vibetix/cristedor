import React from 'react';
import { RoutePath } from '../../types';
import { Home, Briefcase, Newspaper, Info, Phone } from 'lucide-react';

interface BottomNavProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
}

const navItems: { label: string; path: RoutePath }[] = [
  { label: 'Home', path: '/' },
  { label: 'Companies', path: '/portfolio' },
  { label: 'News', path: '/newsroom' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const iconMap: Record<string, typeof Home> = {
  '/': Home,
  '/portfolio': Briefcase,
  '/newsroom': Newspaper,
  '/about': Info,
  '/contact': Phone,
};

export const BottomNav: React.FC<BottomNavProps> = ({ currentPath, onNavigate }) => {
  return (
    <>
      <nav className="bottom-nav" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 'var(--z-sticky)',
        backgroundColor: 'rgba(5, 9, 20, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border-soft)',
        paddingBottom: 'env(safe-area-inset-bottom, 0)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '64px',
          maxWidth: '500px',
          margin: '0 auto',
          padding: '0 0.25rem'
        }}>
          {navItems.map(item => {
            const isActive = currentPath === item.path;
            const Icon = iconMap[item.path];
            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                aria-label={item.label}
                className="bottom-nav-btn"
                data-active={isActive ? 'true' : undefined}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.2rem',
                  padding: '0.4rem 0.6rem',
                  borderRadius: '12px',
                  background: isActive ? 'rgba(79, 124, 207, 0.12)' : 'transparent',
                  backdropFilter: isActive ? 'blur(8px)' : 'none',
                  WebkitBackdropFilter: isActive ? 'blur(8px)' : 'none',
                  border: isActive ? '1px solid rgba(79, 124, 207, 0.25)' : '1px solid transparent',
                  boxShadow: isActive ? '0 0 14px rgba(79, 124, 207, 0.2), inset 0 1px 0 var(--glass-border)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  minWidth: '52px',
                  position: 'relative',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '28px',
                  transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), filter 0.25s ease',
                  transform: isActive ? 'scale(1.1)' : 'scale(1)',
                  filter: isActive ? 'drop-shadow(0 0 6px rgba(79, 124, 207, 0.4))' : 'none'
                }}>
                  <span style={{
                    color: isActive ? '#4F7CCF' : 'var(--text-disabled)',
                    transition: 'color 0.25s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon
                      size={22}
                      fill="none"
                      strokeWidth={isActive ? 2.2 : 1.8}
                    />
                  </span>
                </div>
                <span style={{
                  fontSize: '0.62rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#4F7CCF' : 'var(--text-disabled)',
                  letterSpacing: '0.01em',
                  transition: 'color 0.25s ease, font-weight 0.25s ease',
                  lineHeight: 1
                }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <style>{`
        @media (min-width: 901px) {
          .bottom-nav { display: none !important; }
        }
        @media (max-width: 900px) {
          .bottom-nav { display: block !important; }
        }
        .bottom-nav-btn:active {
          transform: scale(0.92) !important;
        }
        .bottom-nav-btn[data-active] {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </>
  );
};