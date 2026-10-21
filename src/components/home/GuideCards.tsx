import { ArrowRight, Award, BookOpen, FileText, MessageCircleQuestion, Route, type LucideIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import { HeroBackdrop } from '@/components/hero/HeroBackdrop';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';

// tasarım09 §13: "Soʻnggi maqolalar" — 3 sütunlu cam kart ızgarası, her kartın üstünde kapak alanı.
// Hover: kart yükselir, kapak kart içinde hafifçe yakınlaşır.
// Kapak görselleri kodla çizilir (pastel degrade + cam karo + ikon); yazıların fotoğrafı yok.
// Yazı sayısı 3'ten azsa boşluklar uydurma yazıyla değil, sitedeki gerçek sayfalara giden kartlarla dolar
// (metinleri o sayfaların kendi başlık/açıklamasından) — "yakında" hissi yok (prompt §14).

export type GuideCard = {
  key: string;
  href: ComponentProps<typeof Link>['href'];
  label: string; // tarih ya da sayfa türü
  dateTime?: string;
  title: string;
  description: string;
  icon: 'exam' | 'guide' | 'route' | 'faq' | 'doc';
};

const coverIcons: Record<GuideCard['icon'], LucideIcon> = {
  exam: Award,
  guide: BookOpen,
  route: Route,
  faq: MessageCircleQuestion,
  doc: FileText,
};

// Kart başına farklı pastel karışımı
const coverTints = [
  'var(--pastel-1), var(--pastel-2)',
  'var(--pastel-3), var(--pastel-1)',
  'var(--pastel-2), var(--pastel-4)',
];

type Props = { eyebrow: string; title: string; cards: GuideCard[]; allLabel: string; readLabel: string };

export function GuideCards({ eyebrow, title, cards, allLabel, readLabel }: Props) {
  return (
    <section id="guides" aria-labelledby="guides-title" className="relative isolate overflow-hidden py-section">
      <HeroBackdrop fade="both" icons={false} />
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="guide-ink" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--ink-grad-from)" />
            <stop offset="1" stopColor="var(--ink-grad-to)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="container-page">
        <header className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <p className="label-caps text-accent [text-shadow:0_0_16px_var(--glass-border)]">{eyebrow}</p>
          <h2
            id="guides-title"
            className="mt-3 text-[clamp(1.875rem,1.3rem+2.2vw,3rem)] leading-tight font-bold [text-shadow:0_0_32px_var(--glass-border)]"
          >
            {title}
          </h2>
        </header>

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => {
            const Icon = coverIcons[c.icon];
            return (
              <li key={c.key}>
                <article className="group glass relative flex h-full flex-col overflow-hidden rounded-lg transition-[transform,box-shadow] duration-base ease-out hover:-translate-y-1.5 hover:shadow-[0_0_0_1px_var(--rm-neon),0_0_28px_-6px_var(--rm-neon-glow),var(--glass-shadow)] focus-within:-translate-y-1.5">
                  {/* Kapak */}
                  <div aria-hidden="true" className="relative aspect-[16/9] overflow-hidden">
                    <div
                      className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      style={{ background: `linear-gradient(135deg, ${coverTints[i % coverTints.length]})` }}
                    >
                      <div
                        className="absolute -top-1/3 -right-1/4 size-3/4 rounded-full"
                        style={{ background: 'radial-gradient(closest-side, var(--beam), transparent)' }}
                      />
                      <svg viewBox="0 0 320 180" preserveAspectRatio="none" className="absolute inset-0 size-full">
                        <path
                          d="M-10 150 C 80 90, 180 170, 330 60"
                          fill="none"
                          stroke="var(--glass-border)"
                          strokeWidth="2"
                          strokeDasharray="4 8"
                        />
                      </svg>
                      <div className="absolute inset-0 grid place-items-center [perspective:600px]">
                        <span
                          className="grid size-20 place-items-center rounded-[28%] [transform:rotateX(10deg)_rotateY(-14deg)]"
                          style={{
                            background: 'linear-gradient(145deg, var(--tile-from), var(--tile-to))',
                            boxShadow: 'inset 0 2px 0 var(--glass-highlight), 0 8px 0 -3px var(--tile-edge), var(--glass-depth)',
                          }}
                        >
                          <Icon strokeWidth={1.25} stroke="url(#guide-ink)" className="size-10" />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    {c.dateTime ? (
                      <time dateTime={c.dateTime} className="text-sm text-ink-2">
                        {c.label}
                      </time>
                    ) : (
                      <p className="label-caps text-accent">{c.label}</p>
                    )}
                    <h3 className="mt-2 text-xl leading-snug font-semibold">
                      <Link href={c.href} className="text-ink no-underline after:absolute after:inset-0 hover:text-ink">
                        {c.title}
                      </Link>
                    </h3>
                    <p className="mt-2 flex-1 text-ink-2">{c.description}</p>
                    <span
                      aria-hidden="true"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-link transition-colors group-hover:text-ink"
                    >
                      {readLabel}
                      <ArrowRight className="size-4 transition-transform duration-base group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex justify-center">
          <Link
            href="/guides"
            className={cn(
              'group glass inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 font-semibold text-ink no-underline',
              'transition-[box-shadow,transform] duration-base hover:-translate-y-0.5 hover:text-ink hover:shadow-[0_0_0_1px_var(--rm-neon),0_0_22px_-4px_var(--rm-neon-glow)]',
            )}
          >
            {allLabel}
            <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-base group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
