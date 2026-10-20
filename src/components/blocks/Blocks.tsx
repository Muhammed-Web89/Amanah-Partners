import { getLocale, getTranslations } from 'next-intl/server';
import { ExternalLink } from 'lucide-react';
import { Accordion } from '@/components/ui/Accordion';
import { DataTable } from '@/components/ui/DataTable';
import { Ledger } from '@/components/ui/Ledger';
import { Notice, PendingNote } from '@/components/ui/Notice';
import { ProcessSteps, type Step } from '@/components/ui/ProcessSteps';
import { Section } from '@/components/ui/Section';
import { ArrowLink, Card, FinePrint } from '@/components/ui/misc';
import { shows, type VerifiedKey } from '@/config/site';
import { Link } from '@/i18n/navigation';
import type { AppLocale, StaticPathname } from '@/i18n/routing';
import { getContent } from '@/lib/content';
import { cn } from '@/lib/cn';
import { fmt } from '@/lib/typo';
import { ConsultationBand } from './ConsultationBand';
import { ExamBlock } from './ExamBlock';
import { WeeklyBlock } from './WeeklyBlock';

// İçerik dosyalarındaki blok listesini sayfaya çevirir. Yeni sayfa ya da bölüm = yalnızca JSON.
// Tipler: text · cards · table · ledger · steps · list · faq · sources · finder · notice
//         why · exam · weekly · countryNote · cta (paylaşılan bloklar)

type LinkRef = { label: string; href: string };
export type Block = {
  type: string;
  id?: string;
  verify?: string;
  title?: string;
  eyebrow?: string;
  intro?: string;
  paragraphs?: string[];
  link?: LinkRef;
  items?: unknown[];
  rows?: unknown[];
  columns?: unknown;
  caption?: string;
  note?: string;
  variant?: string;
  questions?: Array<{ q: string; options: LinkRef[] }>;
  outro?: string;
  tone?: string;
  code?: string;
  text?: string;
  extended?: boolean;
};

const href = (h: string) => h as StaticPathname;

export async function Blocks({ blocks }: { blocks: Block[] }) {
  const locale = (await getLocale()) as AppLocale;
  const shared = await getContent(locale, 'shared');
  const t = await getTranslations('common');

  // Tek renkli ritim: ardışık bölümler arasında "dosya" zemini dönüşümlü.
  let toneIndex = 0;
  const nextTone = () => (toneIndex++ % 2 === 0 ? 'paper' : 'file') as 'paper' | 'file';

  return (
    <>
      {blocks.map((block, i) => {
        const key = `${block.type}-${i}`;
        const gate = block.verify as VerifiedKey | undefined;
        if (gate && !shows(gate)) return null;
        const pending = gate ? <PendingNote code={`TEYİT · ${gate}`}>Bu bölüm teyit bekliyor.</PendingNote> : null;

        switch (block.type) {
          case 'cta':
            return <ConsultationBand key={key} title={block.title} />;
          case 'exam':
            return <ExamBlock key={key} id={block.id} extended={block.extended} tone={nextTone()} />;
          case 'weekly':
            return <WeeklyBlock key={key} tone={nextTone()} />;
          case 'why':
            return (
              <Section key={key} eyebrow={shared.whyALevel.eyebrow} title={shared.whyALevel.title} tone={nextTone()}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {shared.whyALevel.items.map((item) => (
                    <Card key={item.title} title={item.title}>
                      {item.body}
                    </Card>
                  ))}
                </div>
                <FinePrint className="mt-6">{shared.admissionNote}</FinePrint>
              </Section>
            );
          case 'countryNote':
            return (
              <div key={key} className="container-page pb-section-sm">
                <Notice>{shared.countryNote}</Notice>
              </div>
            );
        }

        const tone = nextTone();
        return (
          <Section key={key} id={block.id} eyebrow={block.eyebrow} title={block.title} intro={block.intro} tone={tone}>
            {pending}
            {renderBody(block, t('sources'))}
            {block.note && <FinePrint className="mt-6">{block.note}</FinePrint>}
            {block.link && (
              <ArrowLink href={href(block.link.href)} className="mt-6">
                {block.link.label}
              </ArrowLink>
            )}
          </Section>
        );
      })}
    </>
  );
}

function renderBody(block: Block, sourcesLabel: string) {
  switch (block.type) {
    case 'text':
      return (
        <div className="max-w-measure space-y-4 text-ink">
          {block.paragraphs?.map((p) => <p key={p}>{fmt(p)}</p>)}
        </div>
      );

    case 'cards': {
      const items = block.items as Array<{ eyebrow?: string; title: string; body?: string; href?: string; link?: string; verify?: string }>;
      const cols = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[
        (block.columns as number) ?? 3
      ];
      return (
        <div className={cn('grid gap-4', cols)}>
          {items
            .filter((item) => !item.verify || shows(item.verify as VerifiedKey))
            .map((item) => (
              <Card
                key={item.title}
                eyebrow={item.eyebrow}
                title={item.title}
                href={item.href ? href(item.href) : undefined}
                linkLabel={item.link}
              >
                {item.body}
              </Card>
            ))}
        </div>
      );
    }

    case 'table':
      return (
        <DataTable
          caption={block.caption ?? block.title ?? ''}
          columns={block.columns as string[]}
          rows={block.rows as string[][]}
        />
      );

    case 'ledger':
      return <Ledger rows={block.rows as Array<{ label: string; value: string }>} className="max-w-[52rem]" />;

    case 'steps':
      return <ProcessSteps steps={block.items as Step[]} variant={block.variant === 'compact' ? 'compact' : 'detailed'} />;

    case 'list':
      return (
        <ul className="grid max-w-measure gap-2">
          {(block.items as string[]).map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.65em] h-px w-3 shrink-0 bg-accent-line" />
              <span>{fmt(item)}</span>
            </li>
          ))}
        </ul>
      );

    case 'faq':
      return (
        <Accordion
          items={(block.items as Array<{ q: string; a: string }>).map((item) => ({ question: item.q, answer: <p>{item.a}</p> }))}
        />
      );

    case 'sources':
      return (
        <div className="max-w-measure">
          <h2 className="label-caps mb-3 text-accent">{sourcesLabel}</h2>
          <ul className="grid gap-2 text-sm">
            {(block.items as Array<{ title: string; url: string }>).map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1.5">
                  {s.title}
                  <ExternalLink aria-hidden="true" className="mt-1 size-3.5 shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      );

    case 'finder':
      return (
        <div className="grid gap-6">
          <ol className="grid gap-4 md:grid-cols-3">
            {block.questions?.map((question, n) => (
              <li key={question.q} className="rounded-md border border-rule bg-paper p-5">
                <p className="font-semibold">
                  <span className="mr-2 font-serif text-accent">{n + 1}.</span>
                  {question.q}
                </p>
                <ul className="mt-3 grid gap-2">
                  {question.options.map((o) => (
                    <li key={o.label}>
                      <Link
                        href={href(o.href)}
                        className="flex min-h-11 items-center rounded-sm border border-rule-strong px-3 py-2 text-ink no-underline hover:border-ink hover:bg-paper-2"
                      >
                        {o.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          {block.outro && <p className="text-ink-2">{block.outro}</p>}
        </div>
      );

    case 'notice':
      return (
        <Notice tone={(block.tone as 'info' | 'pending') ?? 'info'} title={block.code ? `Staging · ${block.code}` : undefined}>
          {block.text}
        </Notice>
      );

    default:
      return null;
  }
}
