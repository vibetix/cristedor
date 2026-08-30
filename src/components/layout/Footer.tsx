import React from 'react';
import { RoutePath } from '../../types';
import { Linkedin, Twitter, Youtube, Instagram } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: RoutePath) => void;
}

const FooterLink: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    style={{
      fontSize: '0.875rem',
      color: '#94A3B8',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      textAlign: 'left',
      transition: 'color 0.2s',
      fontFamily: 'var(--font-body)'
    }}
    onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = '#fff'}
    onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = '#94A3B8'}
  >
    {children}
  </button>
);

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer style={{ backgroundColor: '#050914', borderTop: '1px solid var(--border-soft)' }}>

      {/* Main Footer Body */}
      <div className="container" style={{ padding: '2.5rem 24px 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '2rem', marginBottom: '3rem' }}
             className="footer-grid">

          {/* Brand Column */}
          <div style={{ gridColumn: '1', maxWidth: '200px' }}>
            <div style={{ marginBottom: '1rem' }}>
              <img 
                src="/cristedor logo.png" 
                alt="Cristedor Group" 
                style={{ 
                  height: '34px', 
                  width: 'auto',
                  objectFit: 'contain',
                  backgroundColor: '#ffffff',
                  padding: '3px 8px',
                  borderRadius: '6px'
                }} 
              />
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Building companies that shape tomorrow and create lasting impact.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {[
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Youtube, label: 'YouTube' },
                { Icon: Instagram, label: 'Instagram' }
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="footer-social-btn"
                  style={{
                    width: '32px', height: '32px', borderRadius: '6px',
                    background: 'var(--glass-bg-sm)',
                    border: '1px solid var(--glass-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'var(--text-muted)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = 'rgba(79,124,207,0.3)';
                    el.style.color = '#fff';
                    el.style.borderColor = 'rgba(79,124,207,0.5)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = 'var(--glass-bg-sm)';
                    el.style.color = 'var(--text-muted)';
                    el.style.borderColor = 'var(--glass-border)';
                  }}
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>

          {/* Companies */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
              Companies
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {['Cristedor Labs', 'Cristedor Media', 'Cristedor Group', 'All Companies'].map(item => (
                <li key={item}>
                  <FooterLink onClick={() => onNavigate('/portfolio')}>{item}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
              About
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[['Our Mission', '/about'], ['Our Values', '/about'], ['Leadership', '/about'], ['Investors', '/investors'], ['Contact Us', '/contact']].map(([item, path]) => (
                <li key={item}>
                  <FooterLink onClick={() => onNavigate(path as RoutePath)}>{item}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
              Resources
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[['News & Updates', '/newsroom'], ['Careers', '/careers'], ['Investors', '/investors'], ['Our Story', '/about']].map(([item, path]) => (
                <li key={item}>
                  <FooterLink onClick={() => onNavigate(path as RoutePath)}>{item}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
              Legal
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[['Privacy Policy', '/privacy'], ['Terms of Use', '/privacy'], ['Cookie Policy', '/privacy']].map(([item, path]) => (
                <li key={item}>
                  <FooterLink onClick={() => onNavigate(path as RoutePath)}>{item}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border-soft)',
          paddingTop: '1.5rem',
          paddingBottom: 'env(safe-area-inset-bottom, 0)',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center',
          justifyContent: 'space-between', gap: '0.75rem'
        }}>
          <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
            © {new Date().getFullYear()} Cristedor Group. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
            Architecting the infrastructure of human advancement.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr 1fr !important;
          }
          .footer-social-btn {
            width: 40px !important;
            height: 40px !important;
          }
        }
        @media (max-width: 560px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};
