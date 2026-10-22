import { cn } from '@/lib/cn';

// Logo.jpeg'den çizilen işaret: iç içe iki "Λ". Dış çizgi --c-logo-a, iç çizgi --c-logo-b (tokens.css);
// açık ve koyu temada token'lar değişir. OG görseli ve favicon aynı koordinatları kullanır.
export const markPaths = {
  outer: 'M49.6 0 100 76H81.6L49.6 22 18.4 76H0Z',
  inner: 'M50.4 35.5 78.5 76H64.8L50.4 52 36 76H22.3Z',
};

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 76" aria-hidden="true" focusable="false" className={className}>
      <path d={markPaths.outer} fill="var(--c-logo-a)" />
      <path d={markPaths.inner} fill="var(--c-logo-b)" />
    </svg>
  );
}

// Yatay kilit: işaret + AMANAH / — PARTNERS —. Büyük harfli görünür metin gizli; ekran okuyucu "Amanah Partners" okur.
export function Logo({ className, size = 'md' }: { className?: string; size?: 'md' | 'lg' }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5 text-ink', className)}>
      <LogoMark className={size === 'lg' ? 'h-10 w-auto' : 'h-8 w-auto'} />
      <span className="sr-only">Amanah Partners</span>
      <span aria-hidden="true" className="flex flex-col items-center leading-none">
        <span className={cn('font-sans font-semibold tracking-[0.2em]', size === 'lg' ? 'text-2xl' : 'text-xl')}>AMANAH</span>
        <span className="mt-1 flex items-center gap-1.5 font-sans text-[0.5625rem] font-medium tracking-[0.38em] text-ink-2">
          <span className="h-px w-3 bg-accent-light" />
          PARTNERS
          <span className="h-px w-3 bg-accent-light" />
        </span>
      </span>
    </span>
  );
}
