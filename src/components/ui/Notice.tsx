import type { ReactNode } from 'react';
import { CircleAlert, FileClock, Info } from 'lucide-react';
import { isStaging } from '@/config/site';
import { cn } from '@/lib/cn';

type Tone = 'info' | 'pending' | 'draft';

const styles: Record<Tone, string> = {
  info: 'glass border-(--glass-border) text-ink', // docs/11: cam not
  pending: 'border-accent-line bg-accent-soft text-ink',
  draft: 'border-danger bg-danger-soft text-ink',
};

const icons = { info: Info, pending: FileClock, draft: CircleAlert };

/**
 * info: ziyaretçiye görünen bilgi notu (ör. "Koşullar üniversiteye göre değişir").
 * pending / draft: ekip notu — yalnızca staging'de görünür, canlıda hiç render edilmez.
 */
export function Notice({
  tone = 'info',
  title,
  children,
  className,
}: {
  tone?: Tone;
  title?: string;
  children?: ReactNode;
  className?: string;
}) {
  if (tone !== 'info' && !isStaging) return null;
  const Icon = icons[tone];
  return (
    <div
      role={tone === 'info' ? 'note' : undefined}
      lang={tone === 'info' ? undefined : 'tr'}
      className={cn('flex gap-3 rounded-lg border p-4 text-sm', styles[tone], className)}
    >
      <Icon
        aria-hidden="true"
        className={cn(
          'mt-0.5 size-4.5 shrink-0',
          tone === 'draft' ? 'text-danger' : tone === 'info' ? 'text-(--ds-neon)' : 'text-accent',
        )}
      />
      <div>
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className={cn(title && 'mt-1', 'text-ink-2')}>{children}</div>}
      </div>
    </div>
  );
}

/** Teyit bekleyen bölümün üstüne konan staging notu. */
export function PendingNote({ code, children }: { code: string; children: ReactNode }) {
  return (
    <Notice tone="pending" title={`Staging · ${code}`} className="mb-6">
      {children} Canlı sitede bu bölüm gizlidir.
    </Notice>
  );
}
