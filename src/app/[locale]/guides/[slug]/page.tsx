import { notFound, permanentRedirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { HeroBackdrop } from '@/components/hero/HeroBackdrop';
import { ArrowRight, Award, BookOpen, ExternalLink, Globe2, GraduationCap } from 'lucide-react';
import { ConsultationBand } from '@/components/blocks/ConsultationBand';
import { ArticleArt, isArticleArt } from '@/components/guides/ArticleArt';
import { ArticleToc } from '@/components/guides/ArticleToc';
import { ReadingProgress } from '@/components/guides/ReadingProgress';
import { consultationHref } from '@/components/layout/nav';
import { buttonClass } from '@/components/ui/button';
import { PageHeader, type PageIcon } from '@/components/ui/PageHeader';
import { getPathname, Link } from '@/i18n/navigation';
import { routing, type StaticPathname } from '@/i18n/routing';
import { findGuide, getGuides, guideSlugs } from '@/lib/guides';
import { resolveLocale } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const locale = routing.locales.find((l) => l === params.locale) ?? routing.defaultLocale;
  return (await getGuides(locale)).map((g) => ({ slug: g.slug }));
}

async function load(params: PageProps<'/[locale]/guides/[slug]'>['params']) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const guide = await findGuide(locale, decodeURIComponent(slug));
  if (!guide) notFound();
  // Dil değiştirildiğinde eski dilin slug'ı gelir → bu dildeki doğru adrese yönlendir.
  if (guide.slug !== decodeURIComponent(slug)) {
    permanentRedirect(getPathname({ href: { pathname: '/guides/[slug]', params: { slug: guide.slug } }, locale }));
  }
  return { locale, guide };
}

export async function generateMetadata({ params }: PageProps<'/[locale]/guides/[slug]'>) {
  const { locale, guide } = await load(params);
  const slugs = await guideSlugs(guide.id);
  const hrefs = Object.fromEntries(
    Object.entries(slugs).map(([l, s]) => [l, { pathname: '/guides/[slug]' as const, params: { slug: s } }]),
  );
  return pageMetadata({
    locale,
    href: { pathname: '/guides/[slug]', params: { slug: guide.slug } },
    hrefs,
    title: guide.title,
    description: guide.description,
  });
}

const categoryIcons: Record<string, PageIcon> = { exams: Award, programs: GraduationCap, countries: Globe2 };

// Görev 15 · makale okuma şablonu (docs/11): hareketli zemin üzerinde asimetrik iki sütun.
// Sol: daha opak cam okuma kartı (glass-article) — üstte makalenin kodla çizilmiş illüstrasyonu, kısa özet,
// yüksek kontrastlı gövde, ilgili sayfalar ve kaynaklar. Sağ (lg+): yapışkan içindekiler + mini konsultatsiya kartı.
// Üstte okuma ilerleme çubuğu.
export default async function GuidePage({ params }: PageProps<'/[locale]/guides/[slug]'>) {
  const { guide } = await load(params);
  const nav = await getTranslations('nav');
  const t = await getTranslations('guides');
  const common = await getTranslations('common');
  const words = guide.html
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return (
    <>
      <ReadingProgress target="article" />
      <PageHeader
        crumbs={[{ label: nav('guides'), href: '/guides' }, { label: guide.title }]}
        eyebrow={`${t(`categories.${guide.category as 'exams'}`)} · ${t('readingTime', { count: minutes })}`}
        title={guide.title}
        lede={guide.description}
        updated={guide.updated}
        icon={categoryIcons[guide.category] ?? BookOpen}
      />
      <div className="relative isolate pt-2 pb-section">
        <HeroBackdrop fade="both" icons={false} />
        <div className="container-page grid gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-10 xl:grid-cols-[minmax(0,52rem)_17rem]">
          <article id="article" className="glass-article overflow-hidden rounded-lg">
            {isArticleArt(guide.art) && (
              <div className="aspect-[16/9] border-b border-(--article-border) sm:aspect-[2/1]">
                <ArticleArt name={guide.art} uid="hero" />
              </div>
            )}
            <div className="px-6 py-8 sm:px-10 sm:py-10">
              <aside className="glass-strong rounded-lg p-5 sm:p-6">
                <h2 className="label-caps text-accent">{t('summary')}</h2>
                <ul className="mt-3 grid gap-2.5">
                  {guide.summary.map((s) => (
                    <li key={s} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55em] size-2 shrink-0 rounded-full bg-(--ds-neon) shadow-[0_0_10px_var(--ds-glow)]"
                      />
                      {s}
                    </li>
                  ))}
                </ul>
              </aside>

              <div
                className={[
                  'mt-10 space-y-5 text-[1.0625rem] leading-[1.75] text-ink sm:text-lg',
                  '[&_h2]:mt-12 [&_h2]:scroll-mt-28 [&_h2]:border-l-[3px] [&_h2]:border-(--ds-neon) [&_h2]:pl-4 [&_h2]:text-2xl [&_h2]:leading-snug',
                  '[&_h3]:mt-8 [&_h3]:text-xl [&_strong]:font-semibold [&_strong]:text-ink',
                  '[&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-6 [&_li]:pl-1 [&_li]:marker:text-(--ds-neon)',
                ].join(' ')}
                dangerouslySetInnerHTML={{ __html: guide.html }}
              />

              {guide.related.length > 0 && (
                <section aria-labelledby="related-title" className="mt-12 border-t border-(--rm-line) pt-8">
                  <h2 id="related-title" className="label-caps text-accent">
                    {t('related')}
                  </h2>
                  <ul className="mt-4 flex flex-wrap gap-3">
                    {guide.related.map((r) => (
                      <li key={r.href}>
                        <Link
                          href={r.href as StaticPathname}
                          className="group glass glow-hover inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 font-semibold text-ink no-underline hover:text-ink"
                        >
                          {r.label}
                          <ArrowRight
                            aria-hidden="true"
                            className="size-4 text-(--ds-neon) transition-transform duration-(--dur-ui) group-hover:translate-x-1"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {guide.sources.length > 0 && (
                <section className="mt-10 border-t border-(--rm-line) pt-6">
                  <h2 className="label-caps text-accent">{common('sources')}</h2>
                  <ul className="mt-3 grid gap-2 text-sm">
                    {guide.sources.map((s) => (
                      <li key={s.url}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1.5">
                          {s.title}
                          <ExternalLink aria-hidden="true" className="mt-1 size-3.5 shrink-0" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28 grid gap-5">
              {guide.toc.length > 1 && (
                <div className="glass rounded-lg p-5">
                  <ArticleToc items={guide.toc} label={t('toc')} />
                </div>
              )}
              <div className="glass-card rounded-lg p-5">
                <p className="font-serif text-lg leading-snug font-semibold">{t('ctaTitle')}</p>
                <p className="mt-2 text-sm text-ink-2">{t('ctaBody')}</p>
                <Link href={consultationHref} className={buttonClass('glow', 'mt-4 min-h-11 w-full px-4 py-2.5 text-sm')}>
                  {common('consultation')}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-(--dur-ui) group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <ConsultationBand />
    </>
  );
}
