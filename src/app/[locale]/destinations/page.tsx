import { getTranslations } from 'next-intl/server';
import { Globe2 } from 'lucide-react';
import { CountryCards } from '@/components/home/CountryCards';
import { ConsultationBand } from '@/components/blocks/ConsultationBand';
import { PageHeader, formatDate } from '@/components/ui/PageHeader';
import { getContent } from '@/lib/content';
import { resolveLocale } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps<'/[locale]/destinations'>) {
  const locale = await resolveLocale(params);
  const { index } = await getContent(locale, 'destinations');
  return pageMetadata({ locale, href: '/destinations', ...index.meta });
}

export default async function DestinationsPage({ params }: PageProps<'/[locale]/destinations'>) {
  const locale = await resolveLocale(params);
  const [{ index }, home, shared] = await Promise.all([
    getContent(locale, 'destinations'),
    getContent(locale, 'home'),
    getContent(locale, 'shared'),
  ]);
  const nav = await getTranslations('nav');
  const t = await getTranslations('common');

  // docs/11: ana sayfadaki ülke cam kartları (bayrak renginde hover parlaması); H1 sayfa başlığında
  return (
    <>
      <PageHeader crumbs={[{ label: nav('destinations') }]} icon={Globe2} {...index.header} />
      <CountryCards
        items={home.countries.items}
        footnote={
          <>
            {shared.countryNote} {t('updated')}:{' '}
            <time dateTime={home.countries.updated}>{formatDate(home.countries.updated, locale)}</time>
          </>
        }
      />
      <ConsultationBand />
    </>
  );
}
