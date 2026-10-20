import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Notice } from '@/components/ui/Notice';
import { PageHeader } from '@/components/ui/PageHeader';
import type { StaticPathname } from '@/i18n/routing';
import { getContent } from '@/lib/content';
import { resolveLocale } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

// Yasal sayfalar (plan §16). Avukat onayı olmadan canlıya alınmaz: production derlemesi
// scripts/check-launch.mjs ile durdurulur. Staging'de her sayfanın üstünde "Taslak" notu.
const pages = ['privacy', 'terms', 'service-agreement', 'refunds', 'cookies', 'official-accounts'] as const;
type LegalPage = (typeof pages)[number];

export const dynamicParams = false;

export function generateStaticParams() {
  return pages.map((legal) => ({ legal }));
}

async function load(params: PageProps<'/[locale]/[legal]'>['params']) {
  const locale = await resolveLocale(params);
  const { legal } = await params;
  if (!pages.includes(legal as LegalPage)) notFound();
  const content = await getContent(locale, 'legal');
  return { locale, legal: legal as LegalPage, page: content.pages[legal as LegalPage], draftNotice: content.draftNotice };
}

export async function generateMetadata({ params }: PageProps<'/[locale]/[legal]'>) {
  const { locale, legal, page } = await load(params);
  return pageMetadata({ locale, href: `/${legal}` as StaticPathname, ...page.meta });
}

export default async function LegalPage({ params }: PageProps<'/[locale]/[legal]'>) {
  const { page, draftNotice } = await load(params);
  const footer = await getTranslations('footer');
  const header = page.header as { eyebrow?: string; title: string; lede?: string };

  return (
    <>
      <PageHeader crumbs={[{ label: footer('legal') }, { label: header.title }]} {...header}>
        <Notice tone="draft" title="Staging" className="mt-6">
          {draftNotice}
        </Notice>
      </PageHeader>
      <div className="container-page py-section-sm">
        <div className="max-w-measure space-y-10">
          {page.sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-xl">{s.title}</h2>
              <div className="mt-3 space-y-3">
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
