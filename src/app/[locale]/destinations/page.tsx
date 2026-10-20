import { getTranslations } from 'next-intl/server';
import { ConsultationBand } from '@/components/blocks/ConsultationBand';
import { PageHeader, formatDate } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Notice } from '@/components/ui/Notice';
import { Link } from '@/i18n/navigation';
import type { StaticPathname } from '@/i18n/routing';
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

  return (
    <>
      <PageHeader crumbs={[{ label: nav('destinations') }]} {...index.header} />
      <Section>
        <ul className="grid border-t border-rule md:grid-cols-2 md:gap-x-10">
          {home.countries.items.map((c) => (
            <li key={c.href} className="border-b border-rule py-6">
              <Link href={c.href as StaticPathname} className="font-serif text-2xl font-semibold text-ink no-underline hover:text-link">
                {c.name}
              </Link>
              <p className="mt-2 text-ink-2">{c.text}</p>
              <p className="mt-2 text-sm text-ink-2">
                {t('updated')}: <time dateTime={home.countries.updated}>{formatDate(home.countries.updated, locale)}</time>
              </p>
            </li>
          ))}
        </ul>
        <Notice className="mt-8">{shared.countryNote}</Notice>
      </Section>
      <ConsultationBand />
    </>
  );
}
