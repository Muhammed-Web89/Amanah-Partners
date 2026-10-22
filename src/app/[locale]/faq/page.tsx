import { getTranslations } from 'next-intl/server';
import { MessageCircleQuestion } from 'lucide-react';
import { ConsultationBand } from '@/components/blocks/ConsultationBand';
import { FilterList } from '@/components/search/FilterList';
import { JsonLd } from '@/components/seo/JsonLd';
import { Accordion } from '@/components/ui/Accordion';
import { PageHeader } from '@/components/ui/PageHeader';
import { HeroBackdrop } from '@/components/hero/HeroBackdrop';
import { ArrowLink } from '@/components/ui/misc';
import { shows, type VerifiedKey } from '@/config/site';
import type { StaticPathname } from '@/i18n/routing';
import { faqLink, getContent } from '@/lib/content';
import { resolveLocale } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps<'/[locale]/faq'>) {
  const locale = await resolveLocale(params);
  const { meta } = await getContent(locale, 'faq');
  return pageMetadata({ locale, href: '/faq', ...meta });
}

export default async function FaqPage({ params }: PageProps<'/[locale]/faq'>) {
  const locale = await resolveLocale(params);
  const faq = await getContent(locale, 'faq');
  const t = await getTranslations('faq');
  const guides = await getTranslations('guides');

  const answer = (item: (typeof faq.categories)[number]['items'][number]) =>
    'verify' in item && shows(item.verify as VerifiedKey) && 'aVerified' in item ? (item.aVerified as string) : item.a;

  // Yapılandırılmış veri: FAQPage yalnızca bu sayfada (prompt §9).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.categories.flatMap((c) =>
      c.items.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: answer(item) } })),
    ),
  };

  return (
    <>
      <PageHeader crumbs={[{ label: faq.header.eyebrow }]} icon={MessageCircleQuestion} {...faq.header} />
      <JsonLd data={jsonLd} />
      <section aria-label={faq.header.eyebrow} className="relative isolate overflow-hidden pt-2 pb-section">
        <HeroBackdrop fade="both" icons={false} />
        <div className="container-page">
          <div className="max-w-[52rem]">
            <FilterList
              searchLabel={t('search')}
              placeholder={t('searchPlaceholder')}
              emptyText={t('noResults')}
              listClassName="grid gap-3"
              allLabel={guides('allCategories')}
              categoryLabel={guides('category')}
              categories={faq.categories.map((c) => ({ id: c.id, label: c.title }))}
              items={faq.categories.flatMap((c) =>
                c.items.map((item) => ({
                  key: item.id,
                  category: c.id,
                  text: `${item.q} ${answer(item)}`,
                  node: (
                    <Accordion
                      items={[
                        {
                          id: item.id,
                          question: item.q,
                          answer: (
                            <>
                              <p>{answer(item)}</p>
                              {faqLink(item) && (
                                <ArrowLink href={faqLink(item)!.href as StaticPathname} variant="sweep" className="mt-2">
                                  {faqLink(item)!.label}
                                </ArrowLink>
                              )}
                            </>
                          ),
                        },
                      ]}
                    />
                  ),
                })),
              )}
            />
          </div>
        </div>
      </section>
      <ConsultationBand />
    </>
  );
}
