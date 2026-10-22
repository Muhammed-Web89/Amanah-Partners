import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Scale } from 'lucide-react';
import { HeroBackdrop } from '@/components/hero/HeroBackdrop';
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
      <PageHeader crumbs={[{ label: footer('legal') }, { label: header.title }]} icon={Scale} {...header}>
        <Notice tone="draft" title="Staging" className="mt-6">
          {draftNotice}
        </Notice>
      </PageHeader>
      {/* docs/11: uzun hukuk metni tek, neredeyse opak cam panelde; bölümler ince çizgiyle ayrılır */}
      <div className="relative isolate overflow-hidden pt-2 pb-section">
        <HeroBackdrop fade="both" icons={false} />
        <div className="container-page">
          <div className="glass divide-y divide-(--rm-line) rounded-lg px-6 [--glass-fill:var(--glass-bg-strong)] sm:px-10 lg:max-w-[52rem]">
            {page.sections.map((s) => (
              <section key={s.title} className="py-8">
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
      </div>
    </>
  );
}
