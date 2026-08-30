import React, { useState } from 'react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <div style={{
      background: 'rgb(5, 9, 20)',
      padding: '0 24px 1.5rem'
    }}>
      <div style={{ width: '100%' }}>
        <div className="newsletter-card" style={{
          display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap',
          justifyContent: 'space-between',
          padding: '2rem 2.5rem',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(17, 28, 46, 0.8), rgba(17, 28, 46, 0.72))',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)',
          boxShadow: 'var(--shadow-md), inset 0 1px 0 rgba(255,255,255,0.05)'
        }}>
          <div className="newsletter-text" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(79, 124, 207, 0.2), rgba(79, 124, 207, 0.1))',
              border: '1px solid rgba(79, 124, 207, 0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                Stay connected with Cristedor Group
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Get the latest updates on our companies, investments, and impact.
              </div>
            </div>
          </div>

          <form onSubmit={handleSubscribe} className="newsletter-form" style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexShrink: 0, width: 'auto' }}>
            {subscribed ? (
              <span style={{ color: '#3DDC97', fontSize: '0.9rem', fontWeight: 600 }}>✓ Subscribed!</span>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="newsletter-input"
                  style={{
                    padding: '0.65rem 1rem',
                    borderRadius: '10px',
                    background: 'rgba(17, 28, 46, 0.5)',
                    border: '1px solid var(--glass-border)',
                    color: '#fff',
                    fontSize: '0.9rem',
                    width: '240px',
                    flex: '1 1 240px',
                    minWidth: 0,
                    fontFamily: 'var(--font-body)',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                  }}
                  onFocus={e => {
                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79, 124, 207, 0.15)';
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor = 'var(--glass-border)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="submit"
                  className="newsletter-btn"
                  style={{
                    padding: '0.65rem 1.5rem',
                    borderRadius: '10px',
                    background: '#FFFFFF',
                    border: '1px solid transparent',
                    color: '#0B1630',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                    letterSpacing: '0.02em',
                    flexShrink: 0
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.3)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.background = '#E8EFFC';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.25)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = '#FFFFFF';
                  }}
                >
                  Subscribe
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .newsletter-card {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 1.5rem 1.25rem !important;
            gap: 1.25rem !important;
          }
          .newsletter-form {
            width: 100% !important;
            flex-wrap: wrap !important;
          }
          .newsletter-input {
            width: 100% !important;
            flex: 1 1 100% !important;
          }
          .newsletter-btn {
            flex: 1 1 100% !important;
          }
        }
        @media (max-width: 480px) {
          .newsletter-card {
            padding: 1.25rem 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};