import type { ReactNode } from 'react';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/cn';
import { fmt } from '@/lib/typo';

type Props = {
  caption: string;
  columns: string[];
  rows: ReactNode[][];
  /** İlk sütun satır başlığıdır (th scope="row"). */
  rowHeaders?: boolean;
  /** Vurgulanan sütun (ör. "Amanah Partners") */
  highlight?: number;
  note?: string;
  className?: string;
};

// Masaüstünde tablo. Mobilde (<768 px) yatay kaydırma yerine her satır bir blok olur;
// sütun adı data-label ile hücrenin üstünde görünür.
export function DataTable({ caption, columns, rows, rowHeaders = true, highlight, note, className }: Props) {
  return (
    <figure className={cn('w-full', className)}>
      <table className="w-full border-collapse text-left max-md:block">
        <caption className="sr-only">{caption}</caption>
        <thead className="max-md:sr-only">
          <tr className="border-b-2 border-ink">
            {columns.map((col, i) => (
              <th
                key={col || i}
                scope="col"
                className={cn(
                  'label-caps px-3 py-3 align-bottom text-ink-2 first:pl-0',
                  i === highlight && 'bg-accent-soft text-accent first:pl-3',
                )}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="max-md:block">
          {rows.map((row, r) => (
            <tr key={r} className="border-b border-rule max-md:block max-md:py-3">
              {row.map((cell, c) => {
                const Cell = rowHeaders && c === 0 ? 'th' : 'td';
                return (
                  <Cell
                    key={c}
                    scope={Cell === 'th' ? 'row' : undefined}
                    data-label={columns[c]}
                    className={cn(
                      'px-3 py-3 align-top first:pl-0 max-md:block max-md:px-0 max-md:py-1.5',
                      Cell === 'th' ? 'font-semibold max-md:pb-2' : 'text-ink',
                      c > 0 &&
                        'max-md:before:label-caps max-md:before:mb-0.5 max-md:before:block max-md:before:text-ink-2 max-md:before:content-[attr(data-label)]',
                      c === highlight && 'bg-accent-soft/60 font-semibold max-md:bg-transparent',
                    )}
                  >
                    {fmt(cell)}
                  </Cell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {note && <figcaption className="mt-3 max-w-measure text-sm text-ink-2">{note}</figcaption>}
    </figure>
  );
}

/** Karşılaştırma hücresi: ✓ / — / metin. Ekran okuyucu için metin karşılığı. */
export function Mark({ value, yes, no }: { value: string; yes: string; no: string }) {
  if (value === 'yes')
    return (
      <span className="inline-flex items-center">
        <Check aria-hidden="true" className="size-5 text-success" />
        <span className="sr-only">{yes}</span>
      </span>
    );
  if (value === 'no')
    return (
      <span className="inline-flex items-center">
        <Minus aria-hidden="true" className="size-5 text-ink-2" />
        <span className="sr-only">{no}</span>
      </span>
    );
  return <span className="text-sm text-ink-2">{value}</span>;
}
