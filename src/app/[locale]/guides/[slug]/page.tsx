import { notFound, permanentRedirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ExternalLink } from 'lucide-react';
import { ConsultationBand } from '@/components/blocks/ConsultationBand';
import { PageHeader } from '@/components/ui/PageHeader';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
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

export default async function GuidePage({ params }: PageProps<'/[locale]/guides/[slug]'>) {
  const { guide } = await load(params);
  const nav = await getTranslations('nav');
  const t = await getTranslations('guides');
  const common = await getTranslations('common');

  return (
    <>
      <PageHeader
        crumbs={[{ label: nav('guides'), href: '/guides' }, { label: guide.title }]}
        eyebrow={t(`categories.${guide.category as 'exams'}`)}
        title={guide.title}
        lede={guide.description}
        updated={guide.updated}
      />
      <div className="container-page py-section-sm">
        <article className="max-w-measure">
          <aside className="mb-10 rounded-md border border-accent-line bg-accent-soft p-5">
            <h2 className="label-caps text-accent">{t('summary')}</h2>
            <ul className="mt-3 grid gap-2">
              {guide.summary.map((s) => (
                <li key={s} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.65em] h-px w-3 shrink-0 bg-accent-line" />
                  {s}
                </li>
              ))}
            </ul>
          </aside>
          <div
            className="space-y-4 [&_h2]:mt-10 [&_h2]:text-2xl [&_h3]:mt-8 [&_h3]:text-xl [&_li]:ml-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ul]:list-disc [&_ul]:space-y-2"
            dangerouslySetInnerHTML={{ __html: guide.html }}
          />
          {guide.sources.length > 0 && (
            <section className="mt-12 border-t border-rule pt-6">
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
        </article>
      </div>
      <ConsultationBand />
    </>
  );
}
