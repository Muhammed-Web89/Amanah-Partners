'use client';

import type { ComponentProps } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/cn';

// Plan v2 §4.1: "Oʻzbekcha · Русский · English". Her bağlantı kendi dilinde, lang özniteliğiyle.
const names = { uz: 'Oʻzbekcha', ru: 'Русский', en: 'English' } as const;
const codes = { uz: 'UZ', ru: 'RU', en: 'EN' } as const;
const htmlLang = { uz: 'uz-Latn', ru: 'ru', en: 'en' } as const;

export function LanguageSwitcher({ variant = 'compact', className }: { variant?: 'compact' | 'full'; className?: string }) {
  const t = useTranslations('common');
  const current = useLocale();
  const pathname = usePathname();
  const params = useParams();
  // Aynı sayfanın diğer dildeki karşılığı (rehber yazısında slug farklıysa sayfa yönlendirir).
  const href = { pathname, params } as ComponentProps<typeof Link>['href'];

  return (
    <nav aria-label={t('language')} className={className}>
      <ul className={cn('flex', variant === 'compact' ? 'items-center' : 'flex-col gap-1 sm:flex-row')}>
        {routing.locales.map((locale, i) => {
          const active = locale === current;
          return (
            <li key={locale} className="flex items-center">
              {variant === 'compact' && i > 0 && (
                <span aria-hidden="true" className="px-0.5 text-rule-strong">
                  ·
                </span>
              )}
              <Link
                href={href}
                locale={locale}
                lang={htmlLang[locale]}
                hrefLang={htmlLang[locale]}
                aria-current={active ? 'true' : undefined}
                prefetch={false}
                className={cn(
                  // Dil adları sistem fontuyla: Özbekçe/İngilizce sayfada "Русский" yüzünden Kiril web fontu inmesin.
                  'flex min-h-11 items-center rounded-sm font-[system-ui,sans-serif] no-underline transition-colors duration-fast',
                  variant === 'compact' ? 'px-1.5 text-sm' : 'px-3 text-base',
                  active ? 'font-semibold text-ink' : 'text-ink-2 hover:text-ink',
                  active && variant === 'full' && 'bg-paper-2',
                )}
              >
                {variant === 'compact' ? (
                  <>
                    <span aria-hidden="true" className="xl:hidden">
                      {codes[locale]}
                    </span>
                    <span className="sr-only xl:not-sr-only">{names[locale]}</span>
                  </>
                ) : (
                  names[locale]
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
