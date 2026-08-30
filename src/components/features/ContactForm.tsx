import React, { useState } from 'react';
import { Button } from '../common/Button';
import { GlassCard } from '../common/GlassCard';
import { Check, Send } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [route, setRoute] = useState<'investor' | 'acquisition' | 'media' | 'general'>('investor');
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setOrg('');
      setMessage('');
    }, 4000);
  };

  return (
    <GlassCard style={{ padding: 'var(--space-8)' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
        Submit Corporate Inquiry
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)' }}>
        Direct your message to the appropriate Cristedor Group division office.
      </p>

      {submitted ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-8) 0' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.2)', border: '1px solid var(--status-success)', color: 'var(--status-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)' }}>
            <Check size={24} />
          </div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
            Inquiry Received
          </h4>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
            Your message has been routed to the Cristedor {route.toUpperCase()} team. We will respond within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {/* Inquiry Route Selector */}
          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              Select Inquiry Type *
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
              {[
                { id: 'investor', label: 'Investor Relations' },
                { id: 'acquisition', label: 'Venture Partnership' },
                { id: 'media', label: 'Media & Press' },
                { id: 'general', label: 'General Inquiry' }
              ].map(r => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRoute(r.id as any)}
                  style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-xs)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    backgroundColor: route === r.id ? 'var(--accent-cyan)' : 'var(--bg-primary)',
                    color: route === r.id ? '#07080E' : 'var(--text-muted)',
                    border: '1px solid var(--glass-border)',
                    cursor: 'pointer'
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Victoria Sterling"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.875rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="v.sterling@sovereignfund.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.875rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
              Organization / Fund Name
            </label>
            <input
              type="text"
              placeholder="Global Sovereign Partners"
              value={org}
              onChange={e => setOrg(e.target.value)}
              style={{ width: '100%', padding: '0.65rem 0.875rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
              Inquiry Summary *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Please provide details regarding your inquiry..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              style={{ width: '100%', padding: '0.65rem 0.875rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', resize: 'vertical' }}
            />
          </div>

          <Button type="submit" size="lg" icon={<Send size={16} />}>
            Transmit Inquiry
          </Button>
        </form>
      )}
    </GlassCard>
  );
};
