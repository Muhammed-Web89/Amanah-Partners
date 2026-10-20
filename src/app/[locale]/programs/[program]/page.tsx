import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { BlockPage } from '@/components/blocks/BlockPage';
import { PendingNote } from '@/components/ui/Notice';
import { shows, type VerifiedKey } from '@/config/site';
import type { StaticPathname } from '@/i18n/routing';
import { getContent } from '@/lib/content';
import { resolveLocale } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

const programs = ['a-level', 'igcse-a-level', 'sat', 'ielts-toefl', 'medicine-ucat-imat', 'ap-ib', 'portfolio', 'btec'] as const;
type Program = (typeof programs)[number];

export const dynamicParams = false;

export function generateStaticParams() {
  // BTEC [TEYİT 6] canlıda hiç üretilmez.
  return programs.filter((p) => p !== 'btec' || shows('btec')).map((program) => ({ program }));
}

async function load(params: PageProps<'/[locale]/programs/[program]'>['params']) {
  const locale = await resolveLocale(params);
  const { program } = await params;
  if (!programs.includes(program as Program)) notFound();
  const { pages } = await getContent(locale, 'programs');
  const page = pages[program as Program] as (typeof pages)['a-level'] & { verify?: string };
  if (page.verify && !shows(page.verify as VerifiedKey)) notFound();
  return { locale, program: program as Program, page };
}

export async function generateMetadata({ params }: PageProps<'/[locale]/programs/[program]'>) {
  const { locale, program, page } = await load(params);
  return pageMetadata({ locale, href: `/programs/${program}` as StaticPathname, ...page.meta });
}

export default async function ProgramPage({ params }: PageProps<'/[locale]/programs/[program]'>) {
  const { page } = await load(params);
  const nav = await getTranslations('nav');
  return (
    <>
      {page.verify && (
        <div className="container-page pt-6">
          <PendingNote code="TEYİT 6">BTEC kapsamı ve merkezi teyit edilmedi.</PendingNote>
        </div>
      )}
      <BlockPage
        header={page.header}
        blocks={page.blocks}
        crumbs={[{ label: nav('programs'), href: '/programs' }, { label: page.header.title }]}
      />
    </>
  );
}
