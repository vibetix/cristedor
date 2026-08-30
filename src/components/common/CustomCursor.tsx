import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const targetPos = React.useRef({ x: -100, y: -100 });
  const currentPos = React.useRef({ x: -100, y: -100 });
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.classList.contains('glass-panel-interactive'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    let animationFrameId: number;
    const render = () => {
      // Lerp smoothing (0.2 factor)
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.22;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.22;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetPos.current.x - 4}px, ${targetPos.current.y - 4}px, 0)`;
      }
      if (ringRef.current) {
        const offset = isHovered ? 24 : 14;
        ringRef.current.style.transform = `translate3d(${currentPos.current.x - offset}px, ${currentPos.current.y - offset}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, isHovered]);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="gpu-accelerate"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: 'var(--accent-primary)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 'var(--z-cursor)'
        }}
      />
      <div
        ref={ringRef}
        className="gpu-accelerate"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '48px' : '28px',
          height: isHovered ? '48px' : '28px',
          border: '1px solid var(--accent-primary)',
          backgroundColor: isHovered ? 'rgba(79, 124, 207, 0.2)' : 'transparent',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 'var(--z-cursor)',
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease'
        }}
      />
    </>
  );
};
