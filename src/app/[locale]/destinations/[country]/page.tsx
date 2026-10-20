import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { BlockPage } from '@/components/blocks/BlockPage';
import type { StaticPathname } from '@/i18n/routing';
import { getContent } from '@/lib/content';
import { resolveLocale } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

const countries = ['uk', 'usa', 'germany', 'italy', 'netherlands', 'canada'] as const;
type Country = (typeof countries)[number];

export const dynamicParams = false;

export function generateStaticParams() {
  return countries.map((country) => ({ country }));
}

async function load(params: PageProps<'/[locale]/destinations/[country]'>['params']) {
  const locale = await resolveLocale(params);
  const { country } = await params;
  if (!countries.includes(country as Country)) notFound();
  const { countries: all } = await getContent(locale, 'destinations');
  return { locale, country: country as Country, page: all[country as Country] };
}

export async function generateMetadata({ params }: PageProps<'/[locale]/destinations/[country]'>) {
  const { locale, country, page } = await load(params);
  return pageMetadata({ locale, href: `/destinations/${country}` as StaticPathname, ...page.meta });
}

export default async function CountryPage({ params }: PageProps<'/[locale]/destinations/[country]'>) {
  const { page } = await load(params);
  const nav = await getTranslations('nav');
  return (
    <BlockPage
      header={page.header}
      blocks={page.blocks}
      crumbs={[{ label: nav('destinations'), href: '/destinations' }, { label: page.header.title }]}
    />
  );
}
