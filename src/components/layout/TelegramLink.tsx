import type { ReactNode } from 'react';
import { isStaging, site, telegramUrl } from '@/config/site';
import { cn } from '@/lib/cn';

/**
 * Telegram destek bağlantısı. Prompt §9: bağlantı açılmazsa kullanıcı adı yazılı görünür (showUsername).
 * Kullanıcı adı henüz yoksa [KARAR 3]: canlıda hiç render edilmez, staging'de işaretli görünür.
 * plausible-event-name sınıfı: çerezsiz analitikte "Telegram" dönüşümü.
 */
export function TelegramLink({
  children,
  className,
  showUsername = false,
  channel = false,
}: {
  children: ReactNode;
  className?: string;
  showUsername?: boolean;
  channel?: boolean;
}) {
  const username = channel ? site.telegram.channelUsername : site.telegram.supportUsername;
  const url = telegramUrl(username);

  if (!url) {
    if (!isStaging) return null;
    return (
      <span className={cn(className, 'cursor-not-allowed')} title="[KARAR 3] Telegram kullanıcı adı bekleniyor" lang="tr">
        {children}
        {showUsername && <span className="text-sm font-normal"> (@[KARAR 3])</span>}
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(className, channel ? 'plausible-event-name=Telegram+Channel' : 'plausible-event-name=Telegram')}
    >
      {children}
      {showUsername && <span className="font-normal"> @{username}</span>}
    </a>
  );
}
