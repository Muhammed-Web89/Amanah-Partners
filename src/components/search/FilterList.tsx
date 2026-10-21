'use client';

import { useId, useState, type ReactNode } from 'react';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

// Özbekçe aramada oʻ, o', o‘, o` aynı kabul edilir (Aşama 1, bağlam kısıtları).
export function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[ʻʼ'‘’`´]/g, '')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '');
}

type Item = { key: string; text: string; category?: string; node: ReactNode };

/**
 * İstemci tarafı arama + kategori filtresi. JavaScript yoksa tüm liste görünür (sunucuda üretilir).
 * Sonuç sayısı aria-live ile duyurulur.
 */
export function FilterList({
  items,
  categories,
  allLabel,
  categoryLabel,
  searchLabel,
  placeholder,
  emptyText,
  listClassName,
}: {
  items: Item[];
  categories?: Array<{ id: string; label: string }>;
  allLabel?: string;
  categoryLabel?: string;
  searchLabel: string;
  placeholder: string;
  emptyText: string;
  /** Liste kabı (ör. SSS cam panelleri arasında boşluk: 'grid gap-3') */
  listClassName?: string;
}) {
  const t = useTranslations('common');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const id = useId();
  const q = normalize(query.trim());
  const visible = items.filter((i) => (!category || i.category === category) && (!q || normalize(i.text).includes(q)));

  return (
    <div>
      <div className="mb-6 grid gap-4">
        <div className="max-w-md">
          <label htmlFor={id} className="mb-1.5 block font-semibold">
            {searchLabel}
          </label>
          <div className="relative">
            <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-2" />
            <input
              id={id}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="min-h-12 w-full rounded-sm border border-rule-strong bg-paper py-2 pr-3 pl-9 text-ink placeholder:text-ink-2"
            />
          </div>
        </div>
        {categories && (
          <div role="group" aria-label={categoryLabel} className="flex flex-wrap gap-2">
            {[{ id: null as string | null, label: allLabel ?? '' }, ...categories].map((c) => (
              <button
                key={c.id ?? 'all'}
                type="button"
                aria-pressed={category === c.id}
                onClick={() => setCategory(c.id)}
                className="min-h-10 rounded-full border border-rule-strong px-4 text-sm text-ink transition-colors duration-fast hover:bg-paper-2 aria-pressed:border-ink aria-pressed:bg-action aria-pressed:text-action-text"
              >
                {c.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <p aria-live="polite" className="sr-only">
        {t('results', { count: visible.length })}
      </p>
      {visible.length ? (
        <div className={listClassName}>{visible.map((i) => <div key={i.key}>{i.node}</div>)}</div>
      ) : (
        <p className="rounded-md border border-dashed border-rule-strong bg-paper-2 p-6 text-ink-2">{emptyText}</p>
      )}
    </div>
  );
}
