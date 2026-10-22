import { getTranslations } from 'next-intl/server';
import { GraduationCap } from 'lucide-react';
import { BlockPage } from '@/components/blocks/BlockPage';
import { getContent } from '@/lib/content';
import { resolveLocale } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps<'/[locale]/programs'>) {
  const locale = await resolveLocale(params);
  const { index } = await getContent(locale, 'programs');
  return pageMetadata({ locale, href: '/programs', ...index.meta });
}

export default async function ProgramsPage({ params }: PageProps<'/[locale]/programs'>) {
  const locale = await resolveLocale(params);
  const { index } = await getContent(locale, 'programs');
  const nav = await getTranslations('nav');
  return <BlockPage header={index.header} blocks={index.blocks} crumbs={[{ label: nav('programs') }]} icon={GraduationCap} />;
}
