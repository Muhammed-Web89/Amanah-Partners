'use client';

import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { buttonClass } from '@/components/ui/button';

export function ThemeToggle() {
  const t = useTranslations('common');

  function toggle() {
    const root = document.documentElement;
    const dark = !root.classList.contains('dark');
    root.classList.toggle('dark', dark);
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch {
      // Gizli sekme / Telegram içi tarayıcı: seçim yalnızca bu sayfada geçerli kalır.
    }
  }

  // İkon CSS ile seçilir; sunucu ve istemci HTML'i aynı kalır.
  return (
    <button type="button" onClick={toggle} aria-label={t('themeToggle')} className={buttonClass('icon')}>
      <Moon aria-hidden="true" className="size-5 dark:hidden" />
      <Sun aria-hidden="true" className="hidden size-5 dark:block" />
    </button>
  );
}
