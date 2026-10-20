import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { fmt } from '@/lib/typo';

type Row = { label: string; value: ReactNode };

// Kayıt defteri satırı: büyük harf altın etiket + değer. Tasarım yönü A'nın ana bileşeni.
export function Ledger({ rows, className }: { rows: Row[]; className?: string }) {
  return (
    <dl className={cn('border-t border-rule', className)}>
      {rows.map((row) => (
        <div key={row.label} className="grid gap-1 border-b border-rule py-3 sm:grid-cols-[10rem_1fr] sm:gap-6">
          <dt className="label-caps pt-1 text-accent">{row.label}</dt>
          <dd className="text-ink">{fmt(row.value)}</dd>
        </div>
      ))}
    </dl>
  );
}
