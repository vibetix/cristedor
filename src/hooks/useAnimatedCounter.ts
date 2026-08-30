import { useEffect, useRef, useState } from 'react';

export const useAnimatedCounter = (target: number, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      const start = performance.now();
      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));
        if (progress < 1) raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);
      observer.disconnect();
    }, { threshold: 0.3 });

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return { ref, count };
};
