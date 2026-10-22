import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { markPaths } from '@/components/layout/Logo';
import { routing, type AppLocale } from '@/i18n/routing';

// Paylaşım görseli (Open Graph / Telegram önizlemesi). Her dil için bir tane, derlemede üretilir.
// Fontlar alt kümeli WOFF (Latin, Latin genişletilmiş, Kiril): Özbekçe ʻ ve Rusça doğru çizilir.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Amanah Partners';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const fontDir = path.join(process.cwd(), 'src/app/fonts');
const load = (file: string) => readFile(path.join(fontDir, file));

export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as AppLocale, namespace: 'meta' });
  const common = await getTranslations({ locale: locale as AppLocale, namespace: 'common' });

  const fonts = await Promise.all(
    (['latin', 'latin-ext', 'cyrillic'] as const).flatMap((sub) => [
      load(`serif-${sub}.woff`).then((data) => ({ name: 'Serif', data, weight: 600 as const })),
      load(`sans-${sub}.woff`).then((data) => ({ name: 'Sans', data, weight: 400 as const })),
    ]),
  );

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#ffffff',
        padding: '64px 72px',
        color: '#13202f',
        fontFamily: 'Sans',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <svg width="84" height="64" viewBox="0 0 100 76">
          <path d={markPaths.outer} fill="#13202f" />
          <path d={markPaths.inner} fill="#7ba8bf" />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 20 }}>
          <div style={{ fontSize: 40, letterSpacing: 8, fontWeight: 400 }}>AMANAH</div>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: 15, letterSpacing: 6, color: '#4a5568', marginTop: 4 }}>
            <div style={{ width: 24, height: 1, background: '#a8ccda', marginRight: 10 }} />
            PARTNERS
            <div style={{ width: 24, height: 1, background: '#a8ccda', marginLeft: 4 }} />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', borderTop: '2px solid #a8ccda', paddingTop: 28 }}>
        <div style={{ fontFamily: 'Serif', fontSize: 58, lineHeight: 1.12, maxWidth: 1000 }}>{t('ogTagline')}</div>
        <div style={{ display: 'flex', marginTop: 28, fontSize: 28, color: '#4a5568' }}>
          Pearson Edexcel International A-Level · {common('slogan')}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', fontSize: 24, color: '#4a5568' }}>
        {['Dars', 'Imtihon', 'Hujjatlar', 'Viza', 'Kampus'].map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
            {i > 0 && <div style={{ width: 48, height: 2, background: '#5e88a0', margin: '0 16px' }} />}
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                border: '2px solid #5e88a0',
                background: i === 4 ? '#5e88a0' : '#fff',
                marginRight: 10,
              }}
            />
            {locale === 'uz'
              ? s
              : {
                  Dars: locale === 'ru' ? 'Уроки' : 'Lessons',
                  Imtihon: locale === 'ru' ? 'Экзамен' : 'Exams',
                  Hujjatlar: locale === 'ru' ? 'Документы' : 'Applications',
                  Viza: locale === 'ru' ? 'Виза' : 'Visa',
                  Kampus: locale === 'ru' ? 'Кампус' : 'Campus',
                }[s]}
          </div>
        ))}
      </div>
    </div>,
    { ...size, fonts },
  );
}
