import { getTranslations } from 'next-intl/server';
import { HeartHandshake } from 'lucide-react';
import { BlockPage } from '@/components/blocks/BlockPage';
import { getContent } from '@/lib/content';
import { resolveLocale } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps<'/[locale]/about'>) {
  const locale = await resolveLocale(params);
  const { meta } = await getContent(locale, 'about');
  return pageMetadata({ locale, href: '/about', ...meta });
}

export default async function AboutPage({ params }: PageProps<'/[locale]/about'>) {
  const locale = await resolveLocale(params);
  const page = await getContent(locale, 'about');
  const nav = await getTranslations('nav');
  return <BlockPage header={page.header} blocks={page.blocks} crumbs={[{ label: nav('about') }]} icon={HeartHandshake} />;
}
