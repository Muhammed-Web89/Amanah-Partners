'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

// Görev 15: içindekiler — okunan bölüm neon çizgiyle işaretlenir (aria-current="location").
export function ArticleToc({ items, label }: { items: Array<{ id: string; text: string }>; label: string }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const heads = items.map((i) => document.getElementById(i.id)).filter((h): h is HTMLElement => !!h);
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (seen[0]) setActive(seen[0].target.id);
      },
      { rootMargin: '-15% 0px -70% 0px' },
    );
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label={label}>
      <p className="label-caps text-accent">{label}</p>
      <ol className="mt-4 grid gap-1 border-l border-(--rm-line)">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? 'location' : undefined}
              className={cn(
                '-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-ink-2 no-underline transition-[color,border-color] duration-(--dur-ui) hover:border-(--rm-line) hover:text-ink',
                'aria-[current=location]:border-(--ds-neon) aria-[current=location]:font-semibold aria-[current=location]:text-ink',
              )}
            >
              {i.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
