'use client';

import { useTranslations } from 'next-intl';
import { buttonClass } from '@/components/ui/button';
import { ErrorView } from '@/components/ui/ErrorView';
import { Link } from '@/i18n/navigation';

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations('errors');
  return (
    <ErrorView
      code="500"
      title={t('errorTitle')}
      body={t('errorBody')}
      actions={
        <>
          <button type="button" onClick={reset} className={buttonClass('glow')}>
            {t('retry')}
          </button>
          <Link href="/" className={buttonClass('glass')}>
            {t('toHome')}
          </Link>
          <Link href="/contact" className={buttonClass('text')}>
            {t('toContact')}
          </Link>
        </>
      }
    />
  );
}
