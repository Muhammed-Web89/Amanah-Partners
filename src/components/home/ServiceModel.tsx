import { Award, Landmark, MonitorPlay, PlaneTakeoff, type LucideIcon } from 'lucide-react';
import { LogoMark } from '@/components/layout/Logo';
import { cn } from '@/lib/cn';
import { fmt } from '@/lib/typo';

// tasarım04: "Kim nimani olib boradi?" — tablo yerine yatay buzlu cam paneller, kareli defter zemini.
// Her panel: hizmet (ikonlu) | kim yürütür (rozet) | nasıl çalışır. Sıra home.json → model.rows ile aynı.
const serviceIcons: LucideIcon[] = [MonitorPlay, Award, PlaneTakeoff];

export type ServiceRow = { service: string; who: string; detail?: string; how: string };

type Props = { eyebrow: string; title: string; columns: string[]; rows: ServiceRow[] };

export function ServiceModel({ eyebrow, title, columns, rows }: Props) {
  const [serviceLabel, whoLabel, howLabel] = columns;
  return (
    <section id="model" aria-labelledby="model-title" className="relative isolate overflow-hidden py-section">
      {/* Zemin: düz paper-2 → çok yavaş geçen pastel ışık kümesi → üstte sabit ızgara */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-paper-2" />
        <div
          className="animate-drift-a absolute top-[10%] -left-[15%] size-[60%] rounded-full"
          style={{ background: 'radial-gradient(closest-side, var(--pastel-1), transparent)' }}
        />
        <div
          className="animate-drift-b absolute -right-[10%] bottom-0 size-[55%] rounded-full"
          style={{ background: 'radial-gradient(closest-side, var(--pastel-2), transparent)' }}
        />
        <div className="bg-notebook absolute inset-0" />
      </div>

      <div className="container-page">
        <header className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <p className="label-caps text-accent [text-shadow:0_0_16px_var(--glass-border)]">{eyebrow}</p>
          <h2
            id="model-title"
            className="mt-3 text-[clamp(1.875rem,1.3rem+2.2vw,3rem)] leading-tight font-bold [text-shadow:0_0_32px_var(--glass-border)]"
          >
            {fmt(title)}
          </h2>
        </header>

        {/* Geniş ekranda sütun adları bir kez, panellerin üstünde (her panelde ekran okuyucu için de var) */}
        <div
          aria-hidden="true"
          className="label-caps mb-3 hidden px-8 text-ink-2 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-8"
        >
          <span>{serviceLabel}</span>
          <span>{whoLabel}</span>
          <span>{howLabel}</span>
        </div>

        {/* Bir panel üzerindeyken diğerleri hafifçe soluklaşır (yalnızca fareli cihazlarda) */}
        <ul className="group/rows grid gap-4">
          {rows.map((row, i) => {
            const Icon = serviceIcons[i % serviceIcons.length];
            const ours = row.who === 'Amanah Partners';
            return (
              <li
                key={row.service}
                className={cn(
                  'glass-thin grid gap-5 rounded-lg p-6 sm:p-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.5fr)] lg:items-center lg:gap-8 lg:px-8',
                  'transition-[transform,opacity,background-color,box-shadow,border-color] duration-base ease-out',
                  '[@media(hover:hover)]:hover:scale-[1.02] [@media(hover:hover)]:hover:border-[var(--neon)] [@media(hover:hover)]:hover:bg-[var(--glass-thin-hover)]',
                  '[@media(hover:hover)]:hover:shadow-[0_0_0_1px_var(--neon),0_0_32px_-4px_var(--neon),var(--glass-shadow)]',
                  '[@media(hover:hover)]:group-has-[li:hover]/rows:[&:not(:hover)]:opacity-70',
                )}
              >
                {/* Sol: hizmet adı, ikonlu */}
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="grid size-12 shrink-0 place-items-center rounded-lg border border-[var(--glass-border)] shadow-[inset_0_1px_0_rgb(255_255_255/0.6)]"
                    style={{ background: 'linear-gradient(140deg, var(--pastel-1), var(--pastel-2))' }}
                  >
                    <Icon strokeWidth={1.5} className="size-6 text-accent drop-shadow-[0_0_6px_var(--beam)]" />
                  </span>
                  <h3 className="text-xl font-semibold sm:text-2xl">
                    <span className="sr-only">{serviceLabel}: </span>
                    {fmt(row.service)}
                  </h3>
                </div>

                {/* Orta: kim yürütür — rozet */}
                <div>
                  <p className="label-caps mb-2 text-ink-2 lg:sr-only">{whoLabel}</p>
                  <span
                    className={cn(
                      'inline-flex max-w-full items-center gap-2 rounded-[1.125rem] border px-3.5 py-1.5 text-sm font-semibold',
                      ours
                        ? 'border-accent-line/40 bg-accent-soft text-ink'
                        : 'border-[var(--glass-border)] bg-[var(--glass-bg)] text-ink',
                    )}
                  >
                    {ours ? (
                      <LogoMark className="h-3.5 w-auto" />
                    ) : (
                      <Landmark aria-hidden="true" strokeWidth={1.75} className="size-4 text-accent" />
                    )}
                    {row.who}
                  </span>
                  {row.detail && <p className="mt-2 text-sm text-ink-2">{fmt(row.detail)}</p>}
                </div>

                {/* Sağ: nasıl çalışır */}
                <div>
                  <p className="label-caps mb-2 text-ink-2 lg:sr-only">{howLabel}</p>
                  <p className="text-ink-2">{fmt(row.how)}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
