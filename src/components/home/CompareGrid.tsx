import { Check, Minus } from 'lucide-react';
import { HeroBackdrop } from '@/components/hero/HeroBackdrop';
import { LogoMark } from '@/components/layout/Logo';
import { FinePrint } from '@/components/ui/misc';
import { cn } from '@/lib/cn';
import { fmt } from '@/lib/typo';

// tasarım05: "Nega aynan Amanah Partners?" — <table> yerine CSS Grid (+ subgrid). Ekran okuyucu için ARIA tablo rolleri
// korunur. Amanah sütunu tablonun dışına taşan (%105) parlak cam kartta; rakip sütunlar soluk, kenarlıksız cam.
// Geniş ekran: 4 sütun. Mobil: her özellik bir satır kartı, altında 3 hücre (kurum adı + işaret).

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  caption: string;
  columns: string[]; // ['', rakip 1, rakip 2, Amanah]
  rows: string[][]; // [özellik, rakip 1, rakip 2, Amanah] — değer: 'yes' | 'no' | serbest metin
  note: string;
  yes: string;
  no: string;
};

function Mark({ value, hero, yes, no }: { value: string; hero: boolean; yes: string; no: string }) {
  if (value === 'yes')
    return hero ? (
      <span className="grid size-9 place-items-center rounded-full bg-paper shadow-[0_0_0_1px_var(--check),0_0_16px_-2px_var(--check-glow)]">
        <Check aria-hidden="true" strokeWidth={3} className="size-5 text-[var(--check)] drop-shadow-[0_0_4px_var(--check-glow)]" />
        <span className="sr-only">{yes}</span>
      </span>
    ) : (
      <span className="grid size-9 place-items-center">
        <Check aria-hidden="true" strokeWidth={2} className="size-5 text-ink-2" />
        <span className="sr-only">{yes}</span>
      </span>
    );
  if (value === 'no')
    return (
      <span className="grid size-9 place-items-center">
        <Minus aria-hidden="true" strokeWidth={2} className="size-5 text-ink-2 opacity-60" />
        <span className="sr-only">{no}</span>
      </span>
    );
  return <span className="text-sm text-ink-2 italic">{value}</span>;
}

export function CompareGrid({ eyebrow, title, intro, caption, columns, rows, note, yes, no }: Props) {
  const [, rivalA, rivalB, ours] = columns;
  const span = { gridRow: `1 / span ${rows.length + 1}` };
  const cols = 'md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.15fr)]';

  return (
    <section id="compare" aria-labelledby="compare-title" className="relative isolate overflow-hidden py-section">
      <HeroBackdrop fade="both" icons={false} />

      <div className="container-page">
        <header className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <p className="label-caps text-accent [text-shadow:0_0_16px_var(--glass-border)]">{eyebrow}</p>
          <h2
            id="compare-title"
            className="mt-3 text-[clamp(1.875rem,1.3rem+2.2vw,3rem)] leading-tight font-bold [text-shadow:0_0_32px_var(--glass-border)]"
          >
            {fmt(title)}
          </h2>
          <p className="mx-auto mt-4 max-w-measure text-lg text-ink-2 [text-shadow:0_0_20px_var(--glass-border)]">
            {fmt(intro)}
          </p>
        </header>

        <div role="table" aria-label={caption} className={cn('relative grid gap-3 md:gap-x-4 md:gap-y-0', cols)}>
          {/* Sütun zeminleri (yalnızca geniş ekran, dekoratif): rakipler soluk ve kenarlıksız, Amanah taşan parlak kart */}
          <div aria-hidden="true" style={span} className="pointer-events-none col-start-2 hidden rounded-lg bg-[var(--glass-thin)] opacity-70 md:block" />
          <div aria-hidden="true" style={span} className="pointer-events-none col-start-3 hidden rounded-lg bg-[var(--glass-thin)] opacity-70 md:block" />
          <div
            aria-hidden="true"
            style={{ ...span, background: 'linear-gradient(180deg, var(--c-accent-soft), var(--glass-bg-strong) 40%, var(--glass-bg-strong))' }}
            className="glass pointer-events-none col-start-4 hidden scale-105 rounded-lg border-[var(--neon)] shadow-[0_0_0_1px_var(--neon),0_0_40px_-6px_var(--neon),var(--glass-shadow)] md:block"
          />

          {/* Başlık satırı: mobilde yalnızca ekran okuyucu için (hücrelerde görünür etiket var) */}
          <div role="row" style={{ gridRow: 1 }} className="sr-only md:not-sr-only md:relative md:col-span-full md:grid md:grid-cols-subgrid">
            <span role="columnheader" className="md:px-5 md:py-6" />
            {[rivalA, rivalB].map((name) => (
              <span role="columnheader" key={name} className="text-center text-sm font-semibold text-ink-2 md:px-3 md:py-6">
                {name}
              </span>
            ))}
            <span role="columnheader" className="flex flex-col items-center gap-2 text-center md:px-3 md:pt-7 md:pb-6">
              <LogoMark className="h-6 w-auto" />
              <span className="text-base font-bold text-ink">{ours}</span>
            </span>
          </div>

          {rows.map(([feature, ...cells], i) => (
            <div
              role="row"
              key={feature}
              style={{ gridRow: i + 2 }}
              className={cn(
                'max-md:glass relative grid grid-cols-3 gap-2 rounded-lg p-4 transition-colors duration-base',
                'md:col-span-full md:grid-cols-subgrid md:gap-x-4 md:rounded-md md:p-0',
                '[@media(hover:hover)]:md:hover:bg-[var(--glass-thin-hover)]',
              )}
            >
              <span role="rowheader" className="col-span-3 font-semibold text-ink md:col-span-1 md:self-center md:px-5 md:py-4">
                {fmt(feature)}
              </span>
              {cells.map((value, c) => {
                const hero = c === cells.length - 1;
                return (
                  <span
                    role="cell"
                    key={c}
                    className={cn(
                      'flex flex-col items-center justify-start gap-1.5 rounded-md px-1 py-2 text-center md:justify-center md:py-3',
                      hero ? 'bg-accent-soft md:bg-transparent' : 'opacity-70 md:opacity-80',
                    )}
                  >
                    <Mark value={value} hero={hero} yes={yes} no={no} />
                    {/* Mobilde kurum adı her hücrede (başlık satırı gizli) */}
                    <span aria-hidden="true" className={cn('text-[0.6875rem] leading-tight md:hidden', hero ? 'font-semibold text-ink' : 'text-ink-2')}>
                      {[rivalA, rivalB, ours][c]}
                    </span>
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        <FinePrint className="mx-auto mt-10 max-w-3xl text-center">{note}</FinePrint>
      </div>
    </section>
  );
}
