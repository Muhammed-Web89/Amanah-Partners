import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

type Item = { id?: string; question: string; answer: ReactNode };

// <details>: JavaScript olmadan çalışır (Telegram içi tarayıcı), klavyeyle açılır.
export function Accordion({ items }: { items: Item[] }) {
  return (
    <div className="border-t border-rule">
      {items.map((item) => (
        <details key={item.question} id={item.id} className="group border-b border-rule">
          <summary className="flex min-h-14 items-center justify-between gap-4 py-4 font-semibold text-ink transition-colors duration-fast hover:text-link">
            <span>{item.question}</span>
            <ChevronDown
              aria-hidden="true"
              className="size-5 shrink-0 text-accent transition-transform duration-base ease-out group-open:rotate-180"
            />
          </summary>
          <div className="max-w-measure pb-5 text-ink-2 [&_a]:font-semibold">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
