import type { ComponentProps, CSSProperties, ReactNode } from 'react';
import { ArrowRight, type LucideIcon } from 'lucide-react';
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

/** Kart: buzlu cam panel (docs/11). Hover/odakta kalkar, kenarı neon yanar. Tüm kart tıklanabilir olabilir (href).
 *  icon: üstte küçük 3D cam karo; feature: büyük vitrin kartı (ana dallar). */
export function Card({
  title,
  eyebrow,
  children,
  href,
  linkLabel,
  icon: Icon,
  feature = false,
  className,
  style,
}: {
  title: string;
  eyebrow?: string;
  children?: ReactNode;
  href?: StaticPathname;
  linkLabel?: string;
  icon?: LucideIcon;
  feature?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <article
      style={style}
      className={cn(
        'group glass-card reveal relative flex flex-col rounded-lg',
        feature ? 'p-7 sm:p-9' : 'p-6 sm:p-7',
        href && 'has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-focus',
        className,
      )}
    >
      {Icon && (
        <span
          aria-hidden="true"
          className={cn('ds-icon mb-5 grid place-items-center rounded-[28%] text-accent', feature ? 'size-16' : 'size-12')}
          style={{
            background: 'linear-gradient(145deg, var(--tile-from), var(--tile-to))',
            boxShadow: 'inset 0 2px 0 var(--glass-highlight), 0 5px 0 -2px var(--tile-edge), var(--glass-shadow)',
          }}
        >
          <Icon strokeWidth={1.5} className={feature ? 'size-8' : 'size-6'} />
        </span>
      )}
      {eyebrow && <p className="label-caps mb-2 text-accent">{eyebrow}</p>}
      <h3 className={feature ? 'text-2xl' : 'text-xl'}>{fmt(title)}</h3>
      {children && <div className={cn('mt-3 flex-1 text-ink-2', feature && 'text-lg')}>{fmt(children)}</div>}
      {href && linkLabel && (
        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-1.5 font-semibold text-link no-underline after:absolute after:inset-0 group-hover:text-ink focus-visible:outline-none"
        >
          {linkLabel}
          <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-(--dur-ui) group-hover:translate-x-1" />
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
          variant === 'pill' && 'glass-faq rounded-full py-2 pr-2 pl-5 hover:text-ink',
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
    <div className="glass rounded-lg px-6 py-10 text-center">
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
