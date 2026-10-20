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
// Mobilde dikey: altın çizgi adımları bağlar. Masaüstünde compact varyant yatay.
export function ProcessSteps({ steps, variant = 'detailed', className }: Props) {
  const horizontal = variant === 'compact';
  return (
    <ol
      className={cn(
        'relative',
        horizontal ? 'grid gap-0 lg:grid-cols-6 lg:gap-4' : 'grid gap-0',
        className,
      )}
    >
      {steps.map((step, index) => (
        <li
          key={step.title}
          className={cn(
            'relative grid grid-cols-[2.5rem_1fr] gap-x-4 pb-8 last:pb-0',
            horizontal && 'lg:block lg:pb-0',
          )}
        >
          {/* bağlantı çizgisi */}
          {index < steps.length - 1 && (
            <span
              aria-hidden="true"
              className={cn(
                'absolute top-10 bottom-0 left-5 w-px bg-accent-line',
                horizontal && 'lg:top-5 lg:right-[-1rem] lg:bottom-auto lg:left-12 lg:h-px lg:w-auto',
              )}
            />
          )}
          <span
            aria-hidden="true"
            className="tabular relative z-10 flex size-10 items-center justify-center rounded-full border border-accent-line bg-paper font-serif text-lg font-semibold text-accent"
          >
            {index + 1}
          </span>
          <div className={cn('pt-1.5', horizontal && 'lg:pt-4')}>
            <h3 className={cn('font-sans text-base font-semibold', !horizontal && 'text-lg')}>{fmt(step.title)}</h3>
            {step.body && <p className="mt-2 max-w-measure text-ink-2">{fmt(step.body)}</p>}
            {step.details && (
              <dl className="mt-4 grid max-w-measure gap-3 rounded-md border border-rule bg-paper p-4 sm:p-5">
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
