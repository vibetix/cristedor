import React, { useState, useEffect } from 'react';
import { RoutePath } from '../../types';
import { Menu } from 'lucide-react';
import { MobileNav } from './MobileNav';

interface NavbarProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; path: RoutePath }[] = [
    { label: 'Home', path: '/' },
    { label: 'Companies', path: '/portfolio' },
    { label: 'Investments', path: '/investors' },
    { label: 'News', path: '/newsroom' },
    { label: 'About', path: '/about' },
    { label: 'Careers', path: '/careers' },
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 'var(--z-sticky)',
          backgroundColor: scrolled ? 'rgba(5, 9, 20, 0.95)' : 'rgba(5, 9, 20, 0.70)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: scrolled ? '1px solid var(--border-soft)' : '1px solid transparent',
          transition: 'all 0.3s ease'
        }}
      >
        <div
          className="container navbar-inner"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '76px'
          }}
        >
          {/* Logo */}
          <div
            onClick={() => onNavigate('/')}
            className="navbar-logo"
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              userSelect: 'none',
              flexShrink: 0
            }}
          >
            <img 
              src="/cristedor logo.png" 
              alt="Cristedor Group"
              style={{ 
                height: '48px', 
                width: 'auto',
                objectFit: 'contain',
                backgroundColor: '#ffffff',
                padding: '5px 12px',
                borderRadius: '8px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.35)'
              }} 
            />
          </div>

          {/* Desktop Nav */}
          <nav
            style={{ alignItems: 'center', gap: '0.25rem' }}
            className="desktop-nav"
          >
            {navItems.map(item => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 500 : 400,
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '6px',
                    transition: 'color 0.2s, background 0.2s',
                    background: 'transparent',
                    position: 'relative'
                  }}
                  onMouseEnter={e => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
                  }}
                  onMouseLeave={e => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
                  }}
                >
                  {item.label}
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: '0',
                      width: '100%',
                      height: '2px',
                      backgroundColor: 'var(--accent-primary)',
                      borderRadius: '2px',
                      boxShadow: '0 0 8px var(--accent-primary)'
                    }} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            <div className="desktop-nav">
              <button
                onClick={() => onNavigate('/contact')}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: '#0B1630',
                    background: '#FFFFFF',
                    padding: '0.55rem 1.35rem',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#E8EFFC';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
              >
                Contact
              </button>
            </div>
            <div className="mobile-only">
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
                style={{
                  width: '44px', height: '44px',
                  borderRadius: '10px',
                  background: '#FFFFFF',
                  border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#0B1630'
                }}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        currentPath={currentPath}
        onNavigate={path => {
          onNavigate(path);
          setMobileMenuOpen(false);
        }}
      />

      <style>{`
        @media (max-width: 768px) {
          .navbar-inner { height: 64px !important; }
          .navbar-logo img { height: 34px !important; padding: 3px 8px !important; }
        }
      `}</style>
    </>
  );
};
