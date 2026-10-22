import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Handshake } from 'lucide-react';
import { BlockPage } from '@/components/blocks/BlockPage';
import { PendingNote } from '@/components/ui/Notice';
import { shows } from '@/config/site';
import { getContent } from '@/lib/content';
import { resolveLocale } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

// Plan §12.1 [TEYİT 1b]: Faydalan onayı alındı; listedeki her partnerin onayı gelene kadar canlıda yok.
export async function generateMetadata({ params }: PageProps<'/[locale]/partners'>) {
  const locale = await resolveLocale(params);
  const { meta } = await getContent(locale, 'partners');
  return pageMetadata({ locale, href: '/partners', ...meta });
}

export default async function PartnersPage({ params }: PageProps<'/[locale]/partners'>) {
  const locale = await resolveLocale(params);
  if (!shows('partnersPage')) notFound();
  const page = await getContent(locale, 'partners');
  const footer = await getTranslations('footer');
  return (
    <>
      <div className="container-page pt-6">
        <PendingNote code="TEYİT 1b">Faydalan Academy onayı alındı; listedeki her partnerin kendi onayı bekleniyor.</PendingNote>
      </div>
      <BlockPage header={page.header} blocks={page.blocks} crumbs={[{ label: footer('partners') }]} icon={Handshake} />
    </>
  );
}
