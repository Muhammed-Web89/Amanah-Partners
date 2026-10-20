import { getTranslations } from 'next-intl/server';
import { ConsultationBand } from '@/components/blocks/ConsultationBand';
import { consultationHref } from '@/components/layout/nav';
import { FilterList } from '@/components/search/FilterList';
import { PageHeader, formatDate } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { buttonClass } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/misc';
import { Link } from '@/i18n/navigation';
import { getGuides } from '@/lib/guides';
import { resolveLocale } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

const categories = ['exams', 'admission', 'visa', 'countries', 'documents'] as const;

export async function generateMetadata({ params }: PageProps<'/[locale]/guides'>) {
  const locale = await resolveLocale(params);
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const t = await getTranslations({ locale, namespace: 'meta' });
  return pageMetadata({ locale, href: '/guides', title: nav('guides'), description: t('description') });
}

export default async function GuidesPage({ params }: PageProps<'/[locale]/guides'>) {
  const locale = await resolveLocale(params);
  const guides = await getGuides(locale);
  const nav = await getTranslations('nav');
  const t = await getTranslations('guides');
  const common = await getTranslations('common');

  return (
    <>
      <PageHeader crumbs={[{ label: nav('guides') }]} eyebrow={nav('guides')} title={nav('guides')} />
      <Section>
        {guides.length === 0 ? (
          <EmptyState
            title={t('emptyTitle')}
            body={t('emptyBody')}
            action={
              <Link href={consultationHref} className={buttonClass('primary')}>
                {common('consultation')}
              </Link>
            }
          />
        ) : (
          <FilterList
            searchLabel={t('search')}
            placeholder={t('searchPlaceholder')}
            emptyText={t('noResults')}
            allLabel={t('allCategories')}
            categoryLabel={t('category')}
            categories={categories.map((id) => ({ id, label: t(`categories.${id}`) }))}
            items={guides.map((g) => ({
              key: g.id,
              text: `${g.title} ${g.description}`,
              category: g.category,
              node: (
                <article className="relative border-b border-rule py-6 first:border-t">
                  <p className="text-sm text-ink-2">
                    <span className="label-caps text-accent">{t(`categories.${g.category as (typeof categories)[number]}`)}</span>
                    {' · '}
                    <time dateTime={g.published}>{formatDate(g.published, locale)}</time>
                  </p>
                  <h2 className="mt-2 text-xl">
                    <Link
                      href={{ pathname: '/guides/[slug]', params: { slug: g.slug } }}
                      className="text-ink no-underline after:absolute after:inset-0 hover:text-link"
                    >
                      {g.title}
                    </Link>
                  </h2>
                  <p className="mt-2 max-w-measure text-ink-2">{g.description}</p>
                </article>
              ),
            }))}
          />
        )}
      </Section>
      <ConsultationBand />
    </>
  );
}
