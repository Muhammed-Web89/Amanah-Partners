import { getTranslations } from 'next-intl/server';
import { BlockPage } from '@/components/blocks/BlockPage';
import { getContent } from '@/lib/content';
import { resolveLocale } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps<'/[locale]/fees'>) {
  const locale = await resolveLocale(params);
  const { meta } = await getContent(locale, 'fees');
  return pageMetadata({ locale, href: '/fees', ...meta });
}

export default async function FeesPage({ params }: PageProps<'/[locale]/fees'>) {
  const locale = await resolveLocale(params);
  const page = await getContent(locale, 'fees');
  const nav = await getTranslations('nav');
  return <BlockPage header={page.header} blocks={page.blocks} crumbs={[{ label: nav('fees') }]} />;
}
