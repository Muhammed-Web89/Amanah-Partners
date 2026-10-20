import { Send } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { buttonClass } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { TelegramLink } from './TelegramLink';
import { consultationHref } from './nav';

// Plan v2 §4.2: mobilde her sayfada sabit iki düğme. JavaScript gerektirmez.
export async function MobileBar() {
  const t = await getTranslations('common');

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-paper px-gutter pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-overlay md:hidden">
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <Link href={consultationHref} className={buttonClass('primary', 'px-3')}>
          {t('consultationShort')}
        </Link>
        <TelegramLink className={buttonClass('secondary', 'px-4')}>
          <Send aria-hidden="true" className="size-4" />
          {t('telegram')}
        </TelegramLink>
      </div>
    </div>
  );
}
