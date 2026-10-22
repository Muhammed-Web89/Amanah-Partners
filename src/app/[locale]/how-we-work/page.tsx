import { getTranslations } from 'next-intl/server';
import { Route } from 'lucide-react';
import { BlockPage } from '@/components/blocks/BlockPage';
import { getContent } from '@/lib/content';
import { resolveLocale } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps<'/[locale]/how-we-work'>) {
  const locale = await resolveLocale(params);
  const { meta } = await getContent(locale, 'how-we-work');
  return pageMetadata({ locale, href: '/how-we-work', ...meta });
}

export default async function HowWeWorkPage({ params }: PageProps<'/[locale]/how-we-work'>) {
  const locale = await resolveLocale(params);
  const page = await getContent(locale, 'how-we-work');
  const nav = await getTranslations('nav');
  return <BlockPage header={page.header} blocks={page.blocks} crumbs={[{ label: nav('howWeWork') }]} icon={Route} />;
}
