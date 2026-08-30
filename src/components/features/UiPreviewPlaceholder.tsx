import React from 'react';

interface UiPreviewPlaceholderProps {
  title?: string;
  description?: string;
  accent?: string;
  slots?: { key: string; label: string }[];
}

/**
 * A polished placeholder used to preview a product interface before real
 * design/assets/screenshots exist. It intentionally shows scaffolded UI
 * blocks rather than fake product screenshots.
 */
export const UiPreviewPlaceholder: React.FC<UiPreviewPlaceholderProps> = ({
  title = 'Product Interface',
  description = 'Final product UI is still in design. Real screenshots will replace this preview when available.',
  accent = '#4F7CCF',
  slots = [
    { key: 'nav', label: 'Navigation' },
    { key: 'search', label: 'Search & Filters' },
    { key: 'results', label: 'Results Grid' },
  ],
}) => {
  return (
    <div
      role="img"
      aria-label={`${title} preview`}
      style={{
        position: 'relative', width: '100%', borderRadius: '16px', overflow: 'hidden',
        background: 'linear-gradient(160deg, rgba(19,39,61,0.85) 0%, rgba(12,34,58,0.9) 55%, rgba(12,30,52,0.95) 100%)',
        border: '1px solid rgba(79, 124, 207, 0.16)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 18px 48px rgba(0,0,0,0.4)',
      }}
    >
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <pattern id="ui-preview-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" fill="none" stroke="rgba(79,124,207,0.07)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ui-preview-grid)" />
      </svg>

      <div style={{ height: '3px', background: `linear-gradient(90deg, ${accent}, transparent 90%)` }} />

      {/* Window chrome */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 1.25rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: accent, boxShadow: `0 0 8px ${accent}90` }} />
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'rgba(255,255,255,0.14)' }} />
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'rgba(255,255,255,0.14)' }} />
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700,
          letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)'
        }}>
          Preview
        </span>
      </div>

      {/* Scaffolded UI blocks */}
      <div style={{ position: 'relative', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {slots.map((slot, i) => (
          <div key={slot.key} style={{
            borderRadius: '12px', border: '1px solid rgba(79,124,207,0.14)',
            background: 'rgba(5,9,20,0.5)', padding: slot.key === 'nav' ? '0.75rem 1rem' : '0.85rem 1rem',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.58rem', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: i === 0 ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.3)',
              marginBottom: slot.key === 'nav' ? 0 : '0.7rem'
            }}>
              {slot.label}
            </div>
            {slot.key !== 'nav' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '4px', background: `${accent}55`, flexShrink: 0 }} />
                  <div style={{ flex: 1, height: '5px', borderRadius: '99px', background: 'rgba(255,255,255,0.09)' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '4px', background: `${accent}40`, flexShrink: 0 }} />
                  <div style={{ flex: 1, height: '5px', borderRadius: '99px', background: 'rgba(255,255,255,0.09)' }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Caption */}
      <div style={{ position: 'relative', padding: '0 1.25rem 1.25rem', textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 600,
          letterSpacing: '0.08em', textTransform: 'uppercase', color: accent, margin: '0 0 0.25rem'
        }}>
          {title}
        </p>
        <p style={{
          fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5,
          margin: '0 auto', maxWidth: '26rem'
        }}>
          {description}
        </p>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          #ui-preview-placeholder * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
};
