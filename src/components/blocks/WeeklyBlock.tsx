import { getLocale } from 'next-intl/server';
import { DataTable } from '@/components/ui/DataTable';
import { Ledger } from '@/components/ui/Ledger';
import { PendingNote } from '@/components/ui/Notice';
import { Section } from '@/components/ui/Section';
import { FinePrint, StatusTag } from '@/components/ui/misc';
import { shows } from '@/config/site';
import type { AppLocale } from '@/i18n/routing';
import { getContent } from '@/lib/content';

// Plan §8: haftalık program ayrı sayfa değil, program sayfalarında bölüm.
// Saat tablosu [KARAR 5] kesinleşmeden canlıda yayınlanmaz; "okulla birlikte" metni ve rapor örneği her zaman görünür.
export async function WeeklyBlock({ tone = 'paper' }: { tone?: 'paper' | 'file' }) {
  const locale = (await getLocale()) as AppLocale;
  const { weekly } = await getContent(locale, 'shared');

  return (
    <Section eyebrow={weekly.eyebrow} title={weekly.title} intro={weekly.intro} tone={tone}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        {shows('weeklyHours') ? (
          <div>
            <PendingNote code="KARAR 5">Haftalık ders saatleri ve yük tahmini kesinleşmedi.</PendingNote>
            <DataTable caption={weekly.caption} columns={weekly.columns} rows={weekly.rows} />
            <FinePrint className="mt-3">{weekly.tableNote}</FinePrint>
          </div>
        ) : null}
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-xl">{weekly.reportTitle}</h3>
            <StatusTag>{weekly.reportLabel}</StatusTag>
          </div>
          <p className="mt-3 text-ink-2">{weekly.reportBody}</p>
          <figure className="mt-5 rounded-md border border-rule bg-paper p-5">
            <Ledger rows={weekly.report} />
            <figcaption className="mt-3 text-xs text-ink-2">{weekly.reportNote}</figcaption>
          </figure>
        </div>
      </div>
    </Section>
  );
}
