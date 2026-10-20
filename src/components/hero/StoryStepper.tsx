import { cn } from '@/lib/cn';

// tasarım02 §B: "Yoʻlingiz" görselin üstünde değil, metin ile görsel arasında bağımsız, ince uzun cam bir dikey
// ilerleme çubuğu. Dolgu çizgisi aktif adıma kadar uzar; aktif adım parlar, geçilenler dolu noktadır.
export function StoryStepper({ label, stops, active, className }: { label: string; stops: string[]; active: number; className?: string }) {
  const progress = active < 0 ? 0 : active / (stops.length - 1);
  return (
    <figure className={cn('glass-strong flex flex-col rounded-lg px-4 py-6', className)}>
      <figcaption className="label-caps text-accent">{label}</figcaption>
      <div className="relative mt-6 flex flex-1 flex-col">
        {/* Ray + ilerleme dolgusu (dekoratif; durum aria-current ile verilir) */}
        <span aria-hidden="true" className="absolute top-2 bottom-2 left-[0.4375rem] w-px bg-rule-strong/40" />
        <span
          aria-hidden="true"
          className="absolute top-2 left-[0.4375rem] w-px origin-top bg-accent-line transition-transform duration-700 ease-out"
          style={{ height: 'calc(100% - 1rem)', transform: `scaleY(${progress})` }}
        />
        <ol className="relative flex flex-1 flex-col justify-between gap-6">
        {stops.map((stop, i) => {
          const current = i === active;
          const done = i < active;
          return (
            <li key={stop} aria-current={current ? 'step' : undefined} className="relative flex items-start gap-3">
              <span
                aria-hidden="true"
                className={cn(
                  'relative z-10 mt-0.5 size-3.5 shrink-0 rounded-full border-2 border-accent-line transition-all duration-500',
                  current || done ? 'bg-accent-line' : 'bg-paper',
                  current && 'scale-125 shadow-[0_0_0_6px_var(--beam)]',
                )}
              />
              <span className="min-w-0">
                <span className="tabular block text-xs text-ink-2">{String(i + 1).padStart(2, '0')}</span>
                <span
                  className={cn(
                    'block text-sm leading-snug transition-colors duration-500',
                    current ? 'font-semibold text-ink' : done ? 'text-ink' : 'text-ink-2',
                  )}
                >
                  {stop}
                </span>
              </span>
            </li>
          );
        })}
        </ol>
      </div>
    </figure>
  );
}
