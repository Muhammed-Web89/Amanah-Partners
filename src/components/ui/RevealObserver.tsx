'use client';

import { useEffect } from 'react';

// Global tasarım sistemi (docs/11): .reveal sınıflı her öğe görünüm alanına girince data-shown alır ve süzülerek gelir.
// Layout'ta tek kez çalışır; sayfa geçişlerinde ve sonradan eklenen içerikte MutationObserver yeni öğeleri yakalar.
// Bir kez açılan öğe açık kalır (yukarı kaydırınca tekrar gizlenmez).
export function RevealObserver() {
  useEffect(() => {
    const showAll = () =>
      document.querySelectorAll('.reveal:not([data-shown])').forEach((el) => el.setAttribute('data-shown', ''));
    if (!('IntersectionObserver' in window)) return showAll();

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute('data-shown', '');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    const scan = () => document.querySelectorAll('.reveal:not([data-shown])').forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
