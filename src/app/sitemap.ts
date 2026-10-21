import type { MetadataRoute } from 'next';
import { shows } from '@/config/site';
import { getPathname } from '@/i18n/navigation';
import { routing, type AppLocale, type StaticPathname } from '@/i18n/routing';
import { site } from '@/config/site';
import { getGuides } from '@/lib/guides';

// Üç dil + hreflang alternatifleri. Teyit bekleyen sayfalar (BTEC, Hamkorlar) canlıda listelenmez.
const exclude: StaticPathname[] = ['/contact/thank-you'];
if (!shows('btec')) exclude.push('/programs/btec');
if (!shows('partnersPage')) exclude.push('/partners');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const statics = (Object.keys(routing.pathnames) as Array<keyof typeof routing.pathnames>).filter(
    (p): p is StaticPathname => !p.includes('[') && !exclude.includes(p as StaticPathname),
  );
  const url = (href: Parameters<typeof getPathname>[0]['href'], locale: AppLocale) => site.url + getPathname({ href, locale });
  const alternates = (href: Parameters<typeof getPathname>[0]['href']) => ({
    languages: Object.fromEntries(routing.locales.map((l) => [l === 'uz' ? 'uz-Latn' : l, url(href, l)])),
  });

  const entries: MetadataRoute.Sitemap = statics.flatMap((href) =>
    routing.locales.map((locale) => ({ url: url(href, locale), alternates: alternates(href), changeFrequency: 'monthly' as const })),
  );

  for (const locale of routing.locales) {
    for (const g of await getGuides(locale)) {
      entries.push({ url: url({ pathname: '/guides/[slug]', params: { slug: g.slug } }, locale), lastModified: g.updated });
    }
  }
  return entries;
}
