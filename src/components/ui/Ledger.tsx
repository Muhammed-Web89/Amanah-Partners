import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { fmt } from '@/lib/typo';

type Row = { label: string; value: ReactNode };

// Kayıt defteri satırı: büyük harf vurgu etiket + değer. docs/11: cam panel içinde kullanılır;
// satır ayraçları yumuşak çizgi, son satırda çizgi yok.
export function Ledger({ rows, className }: { rows: Row[]; className?: string }) {
  return (
    <dl className={cn(className)}>
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid gap-1 border-b border-(--rm-line) py-3.5 last:border-b-0 sm:grid-cols-[11rem_1fr] sm:gap-6"
        >
          <dt className="label-caps pt-1 text-accent">{row.label}</dt>
          <dd className="text-ink">{fmt(row.value)}</dd>
        </div>
      ))}
    </dl>
  );
}
