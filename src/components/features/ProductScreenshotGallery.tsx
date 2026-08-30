import React from 'react';
import { UiPreviewPlaceholder } from './UiPreviewPlaceholder';

export interface ProductScreenshotSlot {
  key: string;
  title: string;
  description: string;
  assetPath: string;
}

interface ProductScreenshotGalleryProps {
  slots: ProductScreenshotSlot[];
  accent?: string;
}

/**
 * Renders a gallery of product interface previews. Until real screenshots
 * exist (paths under /public/projects/unistay/), each slot renders an
 * intentional UI placeholder rather than a fabricated screenshot.
 */
export const ProductScreenshotGallery: React.FC<ProductScreenshotGalleryProps> = ({
  slots,
  accent = '#4F7CCF',
}) => {
  return (
    <div style={{
      display: 'grid', gap: '1.25rem',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
    }}>
      {slots.map((slot) => (
        <div key={slot.key} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <UiPreviewPlaceholder
            title={slot.title}
            description="Final product UI is still in design. Real screenshots will replace this preview when available."
            accent={accent}
            slots={[
              { key: 'nav', label: 'Navigation' },
              { key: 'body', label: 'Main Interface' },
              { key: 'actions', label: 'Primary Actions' },
            ]}
          />
          <div>
            <p style={{
              fontFamily: 'var(--font-display)', fontSize: '0.92rem', fontWeight: 600,
              color: '#fff', margin: 0
            }}>
              {slot.title}
            </p>
            <p style={{
              fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5, margin: '0.25rem 0 0'
            }}>
              {slot.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
