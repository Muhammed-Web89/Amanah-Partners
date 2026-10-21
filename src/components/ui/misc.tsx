import type { ComponentProps, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { StaticPathname } from '@/i18n/routing';
import { cn } from '@/lib/cn';
import { fmt } from '@/lib/typo';

/** Durum etiketi (ör. sınav merkezi "Onaylı"). Renk tek başına anlam taşımaz; metin her zaman yazılır. */
export function StatusTag({ tone = 'neutral', children }: { tone?: 'neutral' | 'success' | 'pending'; children: ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        tone === 'success' && 'border-success/40 bg-success-soft text-success',
        tone === 'pending' && 'border-accent-line/50 bg-accent-soft text-accent',
        tone === 'neutral' && 'border-rule bg-paper-2 text-ink-2',
      )}
    >
      {children}
    </span>
  );
}

/** Kart: varsayılan kenarlıklı panel. Tüm kart tıklanabilir olabilir (href). */
export function Card({
  title,
  eyebrow,
  children,
  href,
  linkLabel,
  className,
}: {
  title: string;
  eyebrow?: string;
  children?: ReactNode;
  href?: StaticPathname;
  linkLabel?: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        'relative flex flex-col rounded-md border border-rule bg-paper p-5 sm:p-6',
        href && 'transition-colors duration-fast hover:border-ink has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-focus',
        className,
      )}
    >
      {eyebrow && <p className="label-caps mb-2 text-accent">{eyebrow}</p>}
      <h3 className="text-xl">{fmt(title)}</h3>
      {children && <div className="mt-3 flex-1 text-ink-2">{fmt(children)}</div>}
      {href && linkLabel && (
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-1.5 font-semibold no-underline after:absolute after:inset-0 focus-visible:outline-none"
        >
          {linkLabel}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      )}
    </article>
  );
}

/** Metin bağlantısı + ok (üçüncül eylem). */
export function ArrowLink({
  href,
  children,
  className,
  variant = 'plain',
}: {
  href: ComponentProps<typeof Link>['href'];
  children: ReactNode;
  className?: string;
  /** tasarım08: 'sweep' = alt çizgisi soldan dolan metin bağlantısı, 'pill' = cam düğme; ikisinde de ok sağa kayar */
  variant?: 'plain' | 'sweep' | 'pill';
}) {
  if (variant !== 'plain') {
    return (
      <Link
        href={href}
        className={cn(
          'group/al inline-flex min-h-11 items-center gap-2 font-semibold text-link no-underline',
          variant === 'pill' &&
            'glass-faq rounded-full py-2 pr-2 pl-5 hover:text-ink',
          className,
        )}
      >
        <span className="bg-gradient-to-r from-current to-current bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-out group-hover/al:bg-[length:100%_1.5px] group-focus-visible/al:bg-[length:100%_1.5px] motion-reduce:transition-none">
          {children}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            'grid place-items-center transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover/al:translate-x-1 group-focus-visible/al:translate-x-1 motion-reduce:transition-none',
            variant === 'pill' && 'size-8 rounded-full bg-accent text-paper',
          )}
        >
          <ArrowRight className="size-4" />
        </span>
      </Link>
    );
  }
  return (
    <Link href={href} className={cn('inline-flex min-h-11 items-center gap-1.5 font-semibold', className)}>
      {children}
      <ArrowRight aria-hidden="true" className="size-4" />
    </Link>
  );
}

/** Boş durum: içerik yokken sayfa "yakında" hissi vermez; ne yapılabileceğini söyler. */
export function EmptyState({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <div className="rounded-md border border-dashed border-rule-strong bg-paper-2 px-6 py-10 text-center">
      <p className="font-serif text-xl font-semibold">{title}</p>
      <p className="mx-auto mt-2 max-w-measure text-ink-2">{body}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

/** Küçük punto uyarı satırı (ör. "Kabul koşulları üniversiteye göre değişir"). */
export function FinePrint({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('max-w-measure text-sm text-ink-2', className)}>{children}</p>;
}
