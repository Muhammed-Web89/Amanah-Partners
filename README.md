# Amanah Partners web sitesi

Özbekistan ve çevre ülkelerdeki öğrenciler ve aileleri için çok dilli (Oʻzbekcha · Русский · English) kurumsal site.
Next.js 16 (statik üretim) · TypeScript · Tailwind CSS v4 · next-intl · Supabase.

- İçerik ve yapı brifi: `amanah-partners-web-sitesi-plani.md` (v2)
- Tasarım ve geliştirme brifi: `amanah-partners-web-tasarim-promptu.md`
- Aşama çıktıları: `docs/01-kesif.md` … `docs/08-acik-kararlar-ve-yayin-oncesi.md`

## Kurulum

```bash
npm install
cp .env.example .env.local   # değerleri doldurun; boş bırakılırsa staging olarak çalışır
npm run dev                  # http://localhost:3000/uz
```

Node 22+. Form, Supabase tanımlı değilken staging'de kayıtları `.data/leads.ndjson` dosyasına yazar.

## Komutlar

| Komut | Ne yapar |
|---|---|
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Canlıya çıkış kontrolü (yalnızca production'da) + derleme |
| `npm start` | Derlenmiş siteyi çalıştırır |
| `npm run typecheck` | TypeScript |
| `npm run check:content` | Üç dil yapı eşitliği, Özbekçe kesme işaretleri, yasak ifadeler |
| `npm test` | Playwright: erişilebilirlik, düzen, dil, form, klavye (önce `npm run build`) |
| `node scripts/screens.mjs [url] [light\|dark]` | Prototip ekran görüntüleri → `docs/prototip/` |
| `python3 scripts/contrast.py` | Renk kontrast tablosu |

## İçerik nasıl güncellenir?

| Ne | Nerede |
|---|---|
| Sayfa metinleri | `content/<uz\|ru\|en>/*.json`. Önce Özbekçe; üç dil aynı yapıda olmalı (`npm run check:content`) |
| Yeni bölüm | İlgili JSON'daki `blocks` listesine blok ekleyin (`type`: text, cards, table, ledger, steps, list, faq, sources, finder, notice, exam, weekly, why, cta) |
| Yeni rehber yazısı | `content/guides/<id>/uz.md`, `ru.md`, `en.md` (mevcut yazıyı örnek alın: frontmatter + Markdown) |
| Menü, düğme, form metinleri | `messages/<dil>.json` |
| Telegram, e-posta, saatler | `.env.local` / barındırma ortam değişkenleri ve `src/config/site.ts` |
| Teyit gelen bölümü açma | `src/config/site.ts → verified` |

**Yazım kuralı:** Özbekçede `oʻ`, `gʻ` için `ʻ` (U+02BB), tutuq belgisi için `ʼ` (U+02BC). Düz kesme işareti kullanmayın; betik yakalar.

## Ortamlar

- **Staging** (varsayılan): arama motorlarına kapalı, ekip notları ("Staging · KARAR / TEYİT", "Taslak") görünür.
- **Canlı** (`NEXT_PUBLIC_SITE_ENV=production`): ekip notları ve teyit bekleyen bölümler render edilmez. Derleme, `scripts/check-launch.mjs` geçmeden başlamaz (hukuki onay, zorunlu değişkenler, yasal metinlerde yer tutucu kalmaması).

## Dizinler

```
content/          sayfa metinleri (uz, ru, en) + guides/
messages/         arayüz metinleri
src/app/[locale]/ sayfalar (yollar İngilizce; Özbekçe adresler src/i18n/routing.ts)
src/components/   blocks/ (içerik blokları), layout/, ui/, forms/
src/config/       açık kararlar ve teyit bayrakları
src/styles/       tokens.css (tasarım değişkenleri), globals.css
supabase/         veritabanı şeması
tests/            Playwright testleri
docs/             aşama çıktıları ve prototip görüntüleri
```
