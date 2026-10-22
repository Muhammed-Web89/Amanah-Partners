import type { CSSProperties } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { HeroBackdrop } from '@/components/hero/HeroBackdrop';
import { Accordion } from '@/components/ui/Accordion';
import { DataTable } from '@/components/ui/DataTable';
import { Ledger } from '@/components/ui/Ledger';
import { Notice, PendingNote } from '@/components/ui/Notice';
import { ProcessSteps, type Step } from '@/components/ui/ProcessSteps';
import { GlassSection } from '@/components/ui/GlassSection';
import { ArrowLink, Card, FinePrint } from '@/components/ui/misc';
import { shows, type VerifiedKey } from '@/config/site';
import { Link } from '@/i18n/navigation';
import type { AppLocale, StaticPathname } from '@/i18n/routing';
import { getContent } from '@/lib/content';
import { cn } from '@/lib/cn';
import { fmt } from '@/lib/typo';
import { ConsultationBand } from './ConsultationBand';
import { ExamBlock } from './ExamBlock';
import { programIcons } from './icons';
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

// docs/11: kartın 3D cam karosundaki simge, bağlandığı program sayfasına göre (içerik dosyasına simge alanı gerekmez)
const cardIcon = (h?: string) => (h?.startsWith('/programs/') ? programIcons[h.slice('/programs/'.length)] : undefined);
const stagger = (i: number) => ({ '--reveal-delay': `${(i % 3) * 90}ms` }) as CSSProperties;

export async function Blocks({ blocks }: { blocks: Block[] }) {
  const locale = (await getLocale()) as AppLocale;
  const shared = await getContent(locale, 'shared');
  const t = await getTranslations('common');

  // docs/11: her bölüm GlassSection (hareketli pastel zemin, kenarlarda dikişsiz erir).

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
            return <ExamBlock key={key} id={block.id} extended={block.extended} />;
          case 'weekly':
            return <WeeklyBlock key={key} />;
          case 'why':
            return (
              <GlassSection key={key} id={`why-${i}`} eyebrow={shared.whyALevel.eyebrow} title={shared.whyALevel.title}>
                <div className="grid gap-5 sm:grid-cols-2">
                  {shared.whyALevel.items.map((item, n) => (
                    <Card key={item.title} title={item.title} style={stagger(n)}>
                      {item.body}
                    </Card>
                  ))}
                </div>
                <FinePrint className="mt-6">{shared.admissionNote}</FinePrint>
              </GlassSection>
            );
          case 'countryNote':
            return (
              <div key={key} className="relative isolate pb-section-sm">
                <HeroBackdrop fade="both" icons={false} />
                <div className="container-page">
                  <Notice className="reveal max-w-[52rem]">{shared.countryNote}</Notice>
                </div>
              </div>
            );
        }

        return (
          <GlassSection
            key={key}
            id={block.id ?? `${block.type}-${i}`}
            eyebrow={block.eyebrow}
            title={block.title}
            intro={block.intro}
          >
            {pending}
            {renderBody(block, t('sources'))}
            {block.note && <FinePrint className="mt-6">{block.note}</FinePrint>}
            {block.link && (
              <ArrowLink href={href(block.link.href)} variant="pill" className="mt-8">
                {block.link.label}
              </ArrowLink>
            )}
          </GlassSection>
        );
      })}
    </>
  );
}

function renderBody(block: Block, sourcesLabel: string) {
  switch (block.type) {
    case 'text':
      return (
        <div className="reveal glass max-w-[52rem] space-y-4 rounded-lg px-6 py-6 text-lg leading-relaxed text-ink sm:px-8 sm:py-7">
          {block.paragraphs?.map((p) => (
            <p key={p}>{fmt(p)}</p>
          ))}
        </div>
      );

    case 'cards': {
      const items = block.items as Array<{
        eyebrow?: string;
        title: string;
        body?: string;
        href?: string;
        link?: string;
        verify?: string;
      }>;
      const cols = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[
        (block.columns as number) ?? 3
      ];
      return (
        <div className={cn('grid gap-5', cols)}>
          {items
            .filter((item) => !item.verify || shows(item.verify as VerifiedKey))
            .map((item, n) => (
              <Card
                key={item.title}
                eyebrow={item.eyebrow}
                title={item.title}
                href={item.href ? href(item.href) : undefined}
                linkLabel={item.link}
                icon={cardIcon(item.href)}
                feature={block.columns === 2}
                style={stagger(n)}
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
      return (
        <div className="reveal glass max-w-[52rem] rounded-lg px-6 py-3 sm:px-8 sm:py-4">
          <Ledger rows={block.rows as Array<{ label: string; value: string }>} />
        </div>
      );

    case 'steps':
      return <ProcessSteps steps={block.items as Step[]} variant={block.variant === 'compact' ? 'compact' : 'detailed'} />;

    case 'list':
      return (
        <ul className="reveal glass grid max-w-[52rem] gap-3 rounded-lg px-6 py-6 sm:px-8 sm:py-7">
          {(block.items as string[]).map((item) => (
            <li key={item} className="flex gap-3.5">
              <span
                aria-hidden="true"
                className="mt-[0.55em] size-2 shrink-0 rounded-full bg-(--ds-neon) shadow-[0_0_10px_var(--ds-glow)]"
              />
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
        <div className="reveal glass max-w-[52rem] rounded-lg px-6 py-6 sm:px-8">
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
      // Üç soru: büyük degrade numaralı cam kartlar; seçenekler parlayan cam kapsüller
      return (
        <div className="grid gap-6">
          <ol className="grid gap-5 md:grid-cols-3">
            {block.questions?.map((question, n) => (
              <li key={question.q} className="reveal glass-strong relative rounded-lg p-6" style={stagger(n)}>
                <span
                  aria-hidden="true"
                  className="block bg-linear-to-br from-(--ink-grad-from) to-(--ink-grad-to) bg-clip-text font-serif text-5xl leading-none font-bold text-transparent"
                >
                  {n + 1}
                </span>
                <p className="mt-3 text-lg font-semibold">{question.q}</p>
                <ul className="mt-4 grid gap-2.5">
                  {question.options.map((o) => (
                    <li key={o.label}>
                      <Link
                        href={href(o.href)}
                        className="group glass glow-hover flex min-h-11 items-center justify-between gap-3 rounded-full px-4 py-2 text-ink no-underline hover:text-ink"
                      >
                        {o.label}
                        <ArrowRight
                          aria-hidden="true"
                          className="size-4 shrink-0 text-(--ds-neon) transition-transform duration-(--dur-ui) group-hover:translate-x-1"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          {block.outro && <p className="reveal text-lg text-ink-2">{block.outro}</p>}
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
