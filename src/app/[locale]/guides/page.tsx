import { getTranslations } from 'next-intl/server';
import { BookOpen } from 'lucide-react';
import { ConsultationBand } from '@/components/blocks/ConsultationBand';
import { consultationHref } from '@/components/layout/nav';
import { FilterList } from '@/components/search/FilterList';
import { PageHeader, formatDate } from '@/components/ui/PageHeader';
import { HeroBackdrop } from '@/components/hero/HeroBackdrop';
import { isArticleArt } from '@/components/guides/ArticleArt';
import { GuideCardView, GuideInkDefs } from '@/components/home/GuideCards';
import { buttonClass } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/misc';
import { Link } from '@/i18n/navigation';
import { getGuides } from '@/lib/guides';
import { resolveLocale } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

const categories = ['programs', 'exams', 'admission', 'visa', 'countries', 'documents'] as const;

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

  // docs/11: ana sayfadaki makale cam kartları (kod çizimi kapak); arama ve kategori kapsülleri camda
  return (
    <>
      <PageHeader crumbs={[{ label: nav('guides') }]} eyebrow={nav('guides')} title={nav('guides')} icon={BookOpen} />
      <section aria-label={nav('guides')} className="relative isolate overflow-hidden pt-2 pb-section">
        <HeroBackdrop fade="both" icons={false} />
        <GuideInkDefs />
        <div className="container-page">
          {guides.length === 0 ? (
            <EmptyState
              title={t('emptyTitle')}
              body={t('emptyBody')}
              action={
                <Link href={consultationHref} className={buttonClass('glow')}>
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
              listClassName="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              categories={categories.map((id) => ({ id, label: t(`categories.${id}`) }))}
              items={guides.map((g, i) => ({
                key: g.id,
                text: `${g.title} ${g.description}`,
                category: g.category,
                node: (
                  <GuideCardView
                    heading="h2"
                    index={i}
                    readLabel={common('readMore')}
                    card={{
                      key: g.id,
                      href: { pathname: '/guides/[slug]', params: { slug: g.slug } },
                      label: formatDate(g.published, locale),
                      dateTime: g.published,
                      title: g.title,
                      description: g.description,
                      icon: g.category === 'exams' ? 'exam' : 'guide',
                      art: isArticleArt(g.art) ? g.art : undefined,
                    }}
                  />
                ),
              }))}
            />
          )}
        </div>
      </section>
      <ConsultationBand />
    </>
  );
}
