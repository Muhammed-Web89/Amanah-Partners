import type { Metadata } from 'next';
import { getPathname } from '@/i18n/navigation';
import { routing, type AppLocale, type AppPathname } from '@/i18n/routing';
import { isStaging, site } from '@/config/site';

type Href = Parameters<typeof getPathname>[0]['href'];

const ogLocale: Record<AppLocale, string> = { uz: 'uz_UZ', ru: 'ru_RU', en: 'en_GB' };

/**
 * Her sayfa için: benzersiz başlık ve açıklama, dile göre canonical,
 * üç dil için hreflang + x-default (Özbekçe), Open Graph ve Twitter kartı.
 */
export function pageMetadata({
  locale,
  href,
  title,
  description,
  hrefs,
}: {
  locale: AppLocale;
  href: Href;
  title: string;
  description: string;
  /** Dil başına farklı parametre gerektiren sayfalar (rehber yazısı) için */
  hrefs?: Partial<Record<AppLocale, Href>>;
}): Metadata {
  const url = (l: AppLocale) => site.url + getPathname({ href: hrefs?.[l] ?? href, locale: l });
  const languages = Object.fromEntries(
    routing.locales.filter((l) => !hrefs || hrefs[l]).map((l) => [l === 'uz' ? 'uz-Latn' : l, url(l)]),
  );

  return {
    title,
    description,
    alternates: {
      canonical: url(locale),
      languages: { ...languages, 'x-default': url(hrefs && !hrefs.uz ? locale : 'uz') },
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title,
      description,
      url: url(locale),
      locale: ogLocale[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: isStaging ? { index: false, follow: false } : undefined,
  };
}

export type { AppPathname };
