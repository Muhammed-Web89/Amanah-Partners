'use client';

import { useEffect, useRef } from 'react';

// Görev 15: makale okuma ilerlemesi — üst menünün altında ince neon çubuk (dekoratif; ilerleme metinde zaten görünür).
// Yalnızca transform (scaleX) değişir: yeniden düzen yok.
export function ReadingProgress({ target }: { target: string }) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = document.getElementById(target);
    if (!el || !bar.current) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const p = Math.min(
          1,
          Math.max(0, (window.innerHeight * 0.35 - r.top) / Math.max(1, r.height - window.innerHeight * 0.4)),
        );
        if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [target]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1">
      <div
        ref={bar}
        className="h-full origin-left scale-x-0 bg-linear-to-r from-(--ink-grad-from) to-(--ds-neon) shadow-[0_0_12px_var(--ds-glow)]"
      />
    </div>
  );
}
