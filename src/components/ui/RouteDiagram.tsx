import { cn } from '@/lib/cn';

// Hero yol kutusu (plan §5.1): Dars → Imtihon → Hujjatlar → Viza → Kampus. Ekran okuyucu için sıralı liste.
// active verilmezse statik çizim (son durak vurgulu); verilirse kaydırma hikâyesinde o adım aydınlanır,
// öncekiler "geçildi" olur.
export function RouteDiagram({
  stops,
  label,
  className,
  active,
  details,
}: {
  stops: string[];
  label: string;
  className?: string;
  active?: number;
  details?: string[]; // her durağın kısa açıklaması (statik düzende durak adının altında)
}) {
  const story = active !== undefined;
  return (
    <figure className={cn('rounded-lg p-5 sm:p-6', className)}>
      <figcaption className="label-caps mb-5 text-ink-2">{label}</figcaption>
      <ol className="relative grid gap-3">
        <span aria-hidden="true" className="absolute top-3 bottom-3 left-[1.1875rem] w-px bg-accent-line" />
        {stops.map((stop, i) => {
          const current = story ? i === active : i === stops.length - 1;
          const done = story && i < active;
          const upcoming = story && i > active;
          return (
            <li
              key={stop}
              aria-current={story && current ? 'step' : undefined}
              className={cn(
                'relative flex gap-4 rounded-md px-3 py-1.5 transition-colors duration-500',
                details ? 'items-start' : 'items-center',
                story && current && 'bg-accent-soft',
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'relative z-10 size-3.5 shrink-0 rounded-full border-2 border-accent-line transition-all duration-500',
                  details && 'mt-1',
                  current || done ? 'bg-accent-line' : 'bg-paper',
                  story && current && 'scale-125 shadow-[0_0_0_6px_var(--beam)]',
                )}
              />
              <span className="min-w-0">
                <span
                  className={cn(
                    'block text-base transition-colors duration-500',
                    current ? 'font-semibold text-ink' : upcoming ? 'text-ink-2' : 'text-ink',
                  )}
                >
                  {stop}
                </span>
                {details?.[i] && <span className="mt-1 block text-sm text-ink-2">{details[i]}</span>}
              </span>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
