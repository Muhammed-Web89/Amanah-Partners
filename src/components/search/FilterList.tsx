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
 * docs/11: arama kutusu ve kategori düğmeleri cam kapsül; seçili kategori dolu.
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
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-(--ds-neon)"
            />
            <input
              id={id}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="min-h-12 w-full rounded-full border border-rule-strong bg-(--glass-bg-strong) py-2 pr-4 pl-10 text-ink shadow-(--glass-shadow) backdrop-blur-md transition-[border-color,box-shadow] duration-(--dur-ui) placeholder:text-ink-2 hover:border-(--ds-neon) focus:border-(--ds-neon) focus:shadow-(--ds-ring)"
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
                className="glass glow-hover min-h-11 rounded-full px-4 text-sm font-medium text-ink aria-pressed:border-transparent aria-pressed:bg-action aria-pressed:text-action-text aria-pressed:shadow-[0_8px_24px_-10px_var(--ds-glow)]"
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
        <div className={listClassName}>
          {visible.map((i) => (
            <div key={i.key}>{i.node}</div>
          ))}
        </div>
      ) : (
        <p className="glass rounded-lg p-6 text-ink-2">{emptyText}</p>
      )}
    </div>
  );
}
