import type { CSSProperties } from 'react';
import { cn } from '@/lib/cn';
import { fmt } from '@/lib/typo';

export type Step = {
  title: string;
  body?: string;
  details?: Array<{ label: string; text: string }>;
};

type Props = {
  steps: Step[];
  /** compact: masaüstünde yatay gösterge (ana sayfa özeti). detailed: her zaman dikey, ayrıntılı kart. */
  variant?: 'compact' | 'detailed';
  className?: string;
};

// Gerçek sıra olduğu için numaralı (prompt §5: numara yalnızca gerçek sıra varsa).
// Mobilde dikey: neon çizgi adımları bağlar. Masaüstünde compact varyant yatay.
// docs/11: numaralar parlayan cam rozet; detailed adımlar hover'da kalkan cam kart; kaydırınca sırayla belirir.
export function ProcessSteps({ steps, variant = 'detailed', className }: Props) {
  const horizontal = variant === 'compact';
  return (
    <ol className={cn('relative', horizontal ? 'grid gap-0 lg:auto-cols-fr lg:grid-flow-col lg:gap-5' : 'grid gap-0', className)}>
      {steps.map((step, index) => (
        <li
          key={step.title}
          style={{ '--reveal-delay': `${(index % 3) * 90}ms` } as CSSProperties}
          className={cn('reveal relative grid grid-cols-[2.75rem_1fr] gap-x-4 pb-6 last:pb-0', horizontal && 'lg:block lg:pb-0')}
        >
          {/* bağlantı çizgisi */}
          {index < steps.length - 1 && (
            <span
              aria-hidden="true"
              className={cn(
                'absolute top-11 bottom-0 left-[1.375rem] w-0.5 rounded-full bg-linear-to-b from-(--ds-neon) to-(--rm-line)',
                horizontal && 'lg:top-[1.375rem] lg:right-[-1rem] lg:bottom-auto lg:left-14 lg:h-0.5 lg:w-auto lg:bg-linear-to-r',
              )}
            />
          )}
          <span
            aria-hidden="true"
            className="tabular glass relative z-10 flex size-11 items-center justify-center rounded-full font-serif text-lg font-bold text-accent"
            style={{ borderColor: 'var(--ds-neon)', boxShadow: '0 0 18px -4px var(--ds-glow), var(--glass-shadow)' }}
          >
            {index + 1}
          </span>
          <div className={cn('glass-card group rounded-lg p-5 sm:p-6', horizontal && 'lg:mt-4')}>
            <h3 className={cn('font-sans text-base font-semibold', !horizontal && 'text-lg')}>{fmt(step.title)}</h3>
            {step.body && <p className="mt-2 max-w-measure text-ink-2">{fmt(step.body)}</p>}
            {step.details && (
              <dl className="mt-4 grid max-w-measure gap-3 rounded-lg border border-(--glass-border) bg-(--inner-card) p-4 shadow-[inset_0_1px_0_var(--glass-highlight)] sm:p-5">
                {step.details.map((d) => (
                  <div key={d.label}>
                    <dt className="label-caps text-accent">{d.label}</dt>
                    <dd className="mt-1 text-ink">{fmt(d.text)}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
