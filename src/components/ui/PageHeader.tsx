import type { ComponentType, ReactNode, SVGProps } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Compass } from 'lucide-react';
import { HeroBackdrop } from '@/components/hero/HeroBackdrop';
import { getPathname, Link } from '@/i18n/navigation';
import type { AppLocale, StaticPathname } from '@/i18n/routing';
import { site } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { fmt } from '@/lib/typo';

/** Lucide simgesi ya da aynı çizgi dilindeki kendi SVG simgelerimiz (CountryIcons) */
export type PageIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type Crumb = { label: string; href?: StaticPathname | { pathname: '/guides/[slug]'; params: { slug: string } } };

type Props = {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lede?: ReactNode;
  updated?: string;
  /** Sağdaki 3D cam karonun simgesi (sayfanın konusu) */
  icon?: PageIcon;
  children?: ReactNode;
};

// İç sayfa başlığı: breadcrumb (+ BreadcrumbList yapılandırılmış verisi), etiket, H1, giriş, son güncelleme.
// Global tasarım sistemi (docs/11): hareketli pastel zemin + seyahat rotaları, cam breadcrumb kapsülü,
// solda parlamalı metin, sağda (lg+) süzülen 3D cam karolar — asimetrik. H1 LCP olduğu için reveal almaz.
export async function PageHeader({ crumbs, eyebrow, title, lede, updated, icon = Compass, children }: Props) {
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
    <header className="relative isolate overflow-hidden pt-6 pb-section-sm md:pt-8">
      <HeroBackdrop fade="bottom" travel icons={false} />
      <div className="container-page">
        <nav aria-label={t('breadcrumb')}>
          <ol className="glass inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full px-4 py-1.5 text-sm text-ink-2">
            {all.map((c, i) => {
              const last = i === all.length - 1;
              return (
                <li key={c.label} className="flex items-center gap-2">
                  {c.href && !last ? (
                    <Link href={c.href} className="text-ink-2 no-underline hover:text-ink hover:underline">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current={last ? 'page' : undefined} className={last ? 'font-semibold text-ink' : undefined}>
                      {c.label}
                    </span>
                  )}
                  {!last && (
                    <span aria-hidden="true" className="text-(--ds-neon)">
                      /
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <JsonLd data={jsonLd} />

        <div className="mt-10 grid items-center gap-10 md:mt-14 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="max-w-[52rem]">
            {eyebrow && <p className="label-caps mb-3 text-accent [text-shadow:0_0_16px_var(--glass-border)]">{eyebrow}</p>}
            <h1 className="text-[clamp(2rem,1.4rem+2.6vw,3.5rem)] leading-[1.1] font-bold [text-shadow:0_0_32px_var(--glass-border)]">
              {fmt(title)}
            </h1>
            {lede && <div className="mt-6 max-w-measure text-lg leading-relaxed text-ink-2">{fmt(lede)}</div>}
            {updated && (
              <p className="glass mt-6 inline-flex rounded-full px-3.5 py-1 text-sm text-ink-2">
                {t('updated')}:&nbsp;<time dateTime={updated}>{formatDate(updated, locale)}</time>
              </p>
            )}
            {children}
          </div>
          <HeaderArt icon={icon} />
        </div>
      </div>
    </header>
  );
}

// Dekoratif 3D cam karo kümesi: ortada konu simgesi, arkada iki küçük karo yavaşça süzülür.
function HeaderArt({ icon: Icon }: { icon: PageIcon }) {
  const tile = {
    background: 'linear-gradient(145deg, var(--tile-from), var(--tile-to))',
    boxShadow: 'inset 0 2px 0 var(--glass-highlight), 0 10px 0 -4px var(--tile-edge), var(--glass-depth)',
  };
  return (
    <div aria-hidden="true" className="relative hidden h-64 [perspective:800px] lg:block">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="ph-ink" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="24" y2="24">
            <stop offset="0" stopColor="var(--ink-grad-from)" />
            <stop offset="1" stopColor="var(--ink-grad-to)" />
          </linearGradient>
        </defs>
      </svg>
      <div
        className="absolute inset-6 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(closest-side, var(--ds-glow), transparent)', opacity: 0.45 }}
      />
      <span
        className="animate-float absolute top-2 left-4 size-16 rounded-[28%] opacity-80 [transform:rotateX(14deg)_rotateY(18deg)]"
        style={{ ...tile, animationDelay: '-5s' }}
      />
      <span
        className="animate-float absolute right-2 bottom-4 size-20 rounded-[28%] opacity-70 [transform:rotateX(-10deg)_rotateY(-20deg)]"
        style={{ ...tile, animationDelay: '-9s' }}
      />
      <span
        className="absolute top-1/2 left-1/2 grid size-36 place-items-center rounded-[28%] [transform:translate(-50%,-50%)_rotateX(10deg)_rotateY(-16deg)]"
        style={tile}
      >
        <Icon strokeWidth={1.1} stroke="url(#ph-ink)" className="size-18" />
      </span>
    </div>
  );
}

export function formatDate(iso: string, locale: AppLocale) {
  // Özbekçe Intl desteği tarayıcıya göre değişir; ay adları elle verilir.
  const months = {
    uz: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'],
    ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    en: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  }[locale];
  const [y, m, d] = iso.split('-').map(Number);
  if (locale === 'en') return `${d} ${months[m - 1]} ${y}`;
  if (locale === 'ru') return `${d} ${months[m - 1]} ${y} г.`;
  return `${y}-yil ${d}-${months[m - 1]}`;
}
