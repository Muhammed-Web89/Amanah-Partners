import type { ReactNode } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import { getPathname, Link } from '@/i18n/navigation';
import type { AppLocale, StaticPathname } from '@/i18n/routing';
import { site } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { fmt } from '@/lib/typo';

export type Crumb = { label: string; href?: StaticPathname | { pathname: '/guides/[slug]'; params: { slug: string } } };

type Props = {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lede?: ReactNode;
  updated?: string;
  children?: ReactNode;
};

// İç sayfa başlığı: breadcrumb (+ BreadcrumbList yapılandırılmış verisi), etiket, H1, giriş, son güncelleme.
export async function PageHeader({ crumbs, eyebrow, title, lede, updated, children }: Props) {
  const t = await getTranslations('common');
  const locale = (await getLocale()) as AppLocale;
  const all: Crumb[] = [{ label: t('home'), href: '/' }, ...crumbs];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: site.url + getPathname({ href: c.href, locale }) } : {}),
    })),
  };

  return (
    <header className="border-b border-rule pt-8 pb-section-sm md:pt-10">
      <div className="container-page">
        <nav aria-label={t('breadcrumb')}>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-2">
            {all.map((c, i) => {
              const last = i === all.length - 1;
              return (
                <li key={c.label} className="flex items-center gap-2">
                  {c.href && !last ? (
                    <Link href={c.href} className="text-ink-2 hover:text-ink">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current={last ? 'page' : undefined} className={last ? 'text-ink' : undefined}>
                      {c.label}
                    </span>
                  )}
                  {!last && <span aria-hidden="true">/</span>}
                </li>
              );
            })}
          </ol>
        </nav>
        <JsonLd data={jsonLd} />

        <div className="mt-8 max-w-[52rem]">
          {eyebrow && <p className="label-caps mb-3 text-accent">{eyebrow}</p>}
          <h1 className="text-3xl">{fmt(title)}</h1>
          {lede && <div className="mt-5 max-w-measure text-lg text-ink-2">{fmt(lede)}</div>}
          {updated && (
            <p className="mt-5 text-sm text-ink-2">
              {t('updated')}: <time dateTime={updated}>{formatDate(updated, locale)}</time>
            </p>
          )}
          {children}
        </div>
      </div>
    </header>
  );
}

export function formatDate(iso: string, locale: AppLocale) {
  // Özbekçe Intl desteği tarayıcıya göre değişir; ay adları elle verilir.
  const months = {
    uz: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'],
    ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  }[locale];
  const [y, m, d] = iso.split('-').map(Number);
  if (locale === 'en') return `${d} ${months[m - 1]} ${y}`;
  if (locale === 'ru') return `${d} ${months[m - 1]} ${y} г.`;
  return `${y}-yil ${d}-${months[m - 1]}`;
}
