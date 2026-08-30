import React, { useEffect, useState } from 'react';

interface StatCounterProps {
  value: string;
  label: string;
  sublabel?: string;
}

export const StatCounter: React.FC<StatCounterProps> = ({ value, label, sublabel }) => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);

        // Extract numeric portion if available
        const numericMatch = value.match(/\d+/);
        if (!numericMatch) {
          setDisplayValue(value);
          return;
        }

        const targetNum = parseInt(numericMatch[0], 10);
        const prefix = value.substring(0, value.indexOf(numericMatch[0]));
        const suffix = value.substring(value.indexOf(numericMatch[0]) + numericMatch[0].length);

        const duration = 1200; // ms
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentCount = Math.floor(easeProgress * targetNum);

          setDisplayValue(`${prefix}${currentCount}${suffix}`);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setDisplayValue(value);
          }
        };

        requestAnimationFrame(animate);
      }
    }, { threshold: 0.2 });

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={containerRef} style={{ textAlign: 'left' }}>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          marginBottom: '0.25rem',
          transition: 'all 0.4s var(--ease-out-expo)'
        }}
      >
        {displayValue}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          fontWeight: 600,
          color: 'var(--accent-primary)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}
      >
        {label}
      </div>
      {sublabel && (
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-muted)',
            marginTop: '2px'
          }}
        >
          {sublabel}
        </div>
      )}
    </div>
  );
};
