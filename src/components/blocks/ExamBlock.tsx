import { getLocale } from 'next-intl/server';
import { Ledger } from '@/components/ui/Ledger';
import { PendingNote } from '@/components/ui/Notice';
import { Section } from '@/components/ui/Section';
import { ArrowLink, FinePrint } from '@/components/ui/misc';
import { shows } from '@/config/site';
import type { AppLocale } from '@/i18n/routing';
import { getContent } from '@/lib/content';

// Plan §7: ayrı sınav merkezi sayfası yok; bu blok ana sayfa, A-Level, Nasıl çalışıyoruz ve SSS'te kullanılır.
// Merkez adı geçen genişletilmiş metin yalnızca Nasıl çalışıyoruz sayfasında ve [TEYİT 2] kapandıysa.
export async function ExamBlock({
  id,
  extended = false,
  showLink = false,
  tone = 'paper',
}: {
  id?: string;
  extended?: boolean;
  showLink?: boolean;
  tone?: 'paper' | 'file';
}) {
  const locale = (await getLocale()) as AppLocale;
  const { exam } = await getContent(locale, 'shared');

  return (
    <Section id={id ?? 'exams'} eyebrow={exam.eyebrow} title={exam.title} tone={tone}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,65ch)_1fr] lg:gap-12">
        <div className="space-y-4">
          <p>{exam.body}</p>
          {extended && shows('centre91667') && (
            <>
              <PendingNote code="TEYİT 2, 3">Merkez no. 91667 üzerinden kayıt ve Özbekistan merkezleri yazılı teyit bekliyor.</PendingNote>
              <p>{exam.extended}</p>
            </>
          )}
          {showLink && (
            <ArrowLink href={{ pathname: '/how-we-work', hash: 'imtihon' }}>{exam.link}</ArrowLink>
          )}
        </div>
        <div>
          <Ledger rows={[{ label: exam.sessionsLabel, value: exam.sessions }]} />
          <ul className="mt-4 grid gap-2">
            {exam.notes.map((n) => (
              <li key={n}>
                <FinePrint>{n}</FinePrint>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
