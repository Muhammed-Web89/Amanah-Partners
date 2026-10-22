import { Blocks, type Block } from './Blocks';
import { PageHeader, type Crumb, type PageIcon } from '@/components/ui/PageHeader';

type Header = { eyebrow?: string; title: string; lede?: string; updated?: string };

/** İçerik dosyasından gelen başlık + blok listesi ile standart iç sayfa. */
export function BlockPage({
  header,
  blocks,
  crumbs,
  icon,
}: {
  header: Header;
  blocks: unknown[];
  crumbs: Crumb[];
  icon?: PageIcon;
}) {
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        eyebrow={header.eyebrow}
        title={header.title}
        lede={header.lede}
        updated={header.updated}
        icon={icon}
      />
      <Blocks blocks={blocks as Block[]} />
    </>
  );
}
