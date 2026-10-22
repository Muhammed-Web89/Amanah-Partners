'use client';

import { useLocale } from 'next-intl';
import { useLayoutEffect } from 'react';

// Dil değiştirince (/uz → /en) React kök <html>'i yeniden kurar ve ThemeScript'in eklediği "dark"/"js" sınıfları silinir;
// <head>'deki betik istemci geçişlerinde yeniden çalışmaz. Kayıtlı tercih burada, ekran boyanmadan önce (layout effect)
// yeniden uygulanır: koyu modda dil değiştiren ziyaretçi beyaz ekran görmez. Mantık ThemeScript ile aynı.
export function ThemeSync() {
  const locale = useLocale();

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');
    let stored: string | null = null;
    try {
      stored = localStorage.getItem('theme');
    } catch {
      // Gizli sekme: kayıt yoksa sistem teması izlenir
    }
    const dark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.classList.toggle('dark', dark);
  }, [locale]);

  return null;
}
