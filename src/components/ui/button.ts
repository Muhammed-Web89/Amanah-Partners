import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'icon' | 'glow' | 'glass';

// Durumlar: hover, active, focus-visible (globals.css), disabled / aria-disabled, aria-busy (yükleniyor).
// cn sınıf çakışmasını çözmez: geçiş sınıfı tabanda değil, varyantta (glow/glass kendi geçişini taşır).
const base =
  'inline-flex items-center justify-center gap-2 font-semibold no-underline ease-out disabled:cursor-not-allowed aria-disabled:cursor-not-allowed aria-busy:cursor-progress';
const colorFade = 'transition-colors duration-fast';

const variants: Record<ButtonVariant, string> = {
  primary:
    'min-h-12 rounded-sm bg-action px-5 py-3 text-center text-action-text hover:bg-action-hover hover:text-action-text active:bg-action-active disabled:bg-rule disabled:text-ink-2 aria-disabled:bg-rule aria-disabled:text-ink-2',
  secondary:
    'min-h-12 rounded-sm border border-ink bg-paper px-5 py-3 text-center text-ink hover:bg-paper-2 hover:text-ink active:bg-paper-3 disabled:border-rule disabled:text-ink-2',
  text: 'min-h-11 text-link underline decoration-1 underline-offset-[0.2em] hover:text-ink active:text-ink',
  icon: 'size-11 rounded-sm text-ink hover:bg-paper-2 active:bg-paper-3',
  // Global tasarım sistemi (docs/11): cam sayfalardaki eylem düğmeleri. glow = birincil (dolu, parlayan),
  // glass = ikincil (cam hap). İkisi de hover'da büyür; içindeki ok ikonuna group-hover:translate-x-1 verilir.
  glow: 'group min-h-13 rounded-full bg-action px-7 py-3.5 text-base text-action-text shadow-[0_10px_30px_-10px_var(--ds-glow)] transition-[transform,box-shadow,background-color] duration-(--dur-ui) hover:scale-[1.04] hover:bg-action-hover hover:text-action-text hover:shadow-[0_0_0_3px_var(--glass-border),0_0_34px_-2px_var(--ds-glow)] active:scale-100 motion-reduce:hover:scale-100',
  glass:
    'group glass min-h-13 rounded-full px-7 py-3.5 text-ink transition-[transform,box-shadow,border-color] duration-(--dur-ui) hover:scale-[1.04] hover:border-(--ds-neon) hover:text-ink hover:shadow-[0_0_0_1px_var(--ds-neon),0_0_28px_-4px_var(--ds-glow)] active:scale-100 motion-reduce:hover:scale-100',
};

export function buttonClass(variant: ButtonVariant = 'primary', className?: string) {
  return cn(base, variant !== 'glow' && variant !== 'glass' && colorFade, variants[variant], className);
}
