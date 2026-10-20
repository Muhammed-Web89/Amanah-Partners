import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'icon';

// Durumlar: hover, active, focus-visible (globals.css), disabled / aria-disabled, aria-busy (yükleniyor).
const base =
  'inline-flex items-center justify-center gap-2 font-semibold no-underline transition-colors duration-fast ease-out disabled:cursor-not-allowed aria-disabled:cursor-not-allowed aria-busy:cursor-progress';

const variants: Record<ButtonVariant, string> = {
  primary:
    'min-h-12 rounded-sm bg-action px-5 py-3 text-center text-action-text hover:bg-action-hover hover:text-action-text active:bg-action-active disabled:bg-rule disabled:text-ink-2 aria-disabled:bg-rule aria-disabled:text-ink-2',
  secondary:
    'min-h-12 rounded-sm border border-ink bg-paper px-5 py-3 text-center text-ink hover:bg-paper-2 hover:text-ink active:bg-paper-3 disabled:border-rule disabled:text-ink-2',
  text: 'min-h-11 text-link underline decoration-1 underline-offset-[0.2em] hover:text-ink active:text-ink',
  icon: 'size-11 rounded-sm text-ink hover:bg-paper-2 active:bg-paper-3',
};

export function buttonClass(variant: ButtonVariant = 'primary', className?: string) {
  return cn(base, variants[variant], className);
}
