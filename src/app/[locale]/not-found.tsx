import { getTranslations } from 'next-intl/server';
import { buttonClass } from '@/components/ui/button';
import { ErrorView } from '@/components/ui/ErrorView';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations('errors');
  return (
    <ErrorView
      code="404"
      title={t('notFoundTitle')}
      body={t('notFoundBody')}
      actions={
        <>
          <Link href="/" className={buttonClass('glow')}>
            {t('toHome')}
          </Link>
          <Link href="/contact" className={buttonClass('glass')}>
            {t('toContact')}
          </Link>
        </>
      }
    />
  );
}
