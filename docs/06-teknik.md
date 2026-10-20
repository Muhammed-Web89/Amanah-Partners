# Aşama 6: Teknik uygulama

*19 Ekim 2026 · Frontend mühendisi + uyum notu*

## Yığın ve gerekçe

**Next.js 16 (App Router, statik üretim) · TypeScript · Tailwind CSS v4 · next-intl · Supabase · zod.**
Prompt ve plan Astro'yu da öneriyor; Next.js, kullanıcının ilk talebiyle seçildi. Bedeli: JavaScript bütçesi (bkz. Performans).

Tüm sayfalar derlemede statik HTML olarak üretilir (3 dil × 37 sayfa). Sunucu yalnızca form gönderimi (Server Action) ve dil yönlendirmesi (`src/proxy.ts`) için çalışır.

## Katmanlar: içerik, tasarım, kod ayrı

| Katman | Yer | Değişiklik için |
|---|---|---|
| Sayfa metinleri | `content/<dil>/*.json` | JSON düzenle; yeni bölüm = yeni blok (`type`: text, cards, table, ledger, steps, list, faq, sources, finder, notice, exam, weekly, why, cta) |
| Rehber yazıları | `content/guides/<id>/<dil>.md` | Yeni klasör = yeni yazı; kod değişmez |
| Arayüz metinleri | `messages/<dil>.json` | |
| Token'lar | `src/styles/tokens.css` (+ `tailwind.config.js` eşlemesi) | |
| Açık kararlar ve teyitler | `src/config/site.ts` + ortam değişkenleri | `verified.*` bayrağı `true` yapılınca bölüm canlıda görünür |

Yeni dil: `routing.ts` içine dil kodu, `messages/<dil>.json`, `content/<dil>/` kopyası. Kod tarafında başka değişiklik gerekmez.

## Gereksinim karşılama tablosu (prompt §9)

| Gereksinim | Durum | Nerede |
|---|---|---|
| `/uz/ /ru/ /en/`, tarayıcı dili algılama, seçim hatırlanır | ✓ | `proxy.ts` (next-intl), `NEXT_LOCALE` çerezi |
| hreflang (uz-Latn, ru, en) + x-default + dile göre canonical | ✓ | `src/lib/seo.ts` |
| Sitemap (hreflang alternatifli), robots.txt | ✓ | `src/app/sitemap.ts`, `robots.ts` |
| Benzersiz başlık + açıklama, üç dilde | ✓ | Her içerik dosyasında `meta` |
| Open Graph + Twitter kartı, Telegram önizlemesi | ✓ | Dil başına üretilen 1200×630 görsel (`opengraph-image.tsx`) |
| Organization, WebSite, BreadcrumbList; FAQPage yalnızca SSS | ✓ | Course **eklenmedi**: ders listesi doğrulanmadı (`[TEYİT 5]`) |
| Sunucu tarafı doğrulama | ✓ | `src/lib/lead-schema.ts` (zod) |
| Bot koruması | ✓ | Görünmez honeypot + 2,5 sn zaman kontrolü (JS varsa) |
| İstek hız sınırı | ✓ | 10 dakikada 5 başvuru / IP özeti; bellek + Supabase |
| Kişisel veri onayı zorunlu, 18 yaş altı veli onayı | ✓ | Sunucuda ve veritabanı kısıtında (`minor_needs_parent`) |
| Yükleniyor, hata, başarı durumları | ✓ | `ConsultationForm.tsx`, `/aloqa/rahmat` |
| Formda üçüncü taraf betik yok | ✓ | Analitik iletişim sayfalarında yüklenmez; dönüşüm sunucudan bildirilir |
| Telegram sabit düğme + yazılı kullanıcı adı | ✓ | `TelegramLink` (`showUsername`); kullanıcı adı `[KARAR 3]` |
| Çerezsiz analitik | ✓ | Plausible (`NEXT_PUBLIC_PLAUSIBLE_DOMAIN` tanımlanınca) |
| Çerez bildirimi yalnızca gerekirse | ✓ | Yalnızca zorunlu `NEXT_LOCALE` çerezi var → banner yok; Cookie sayfasında açıklandı |
| WCAG 2.2 AA | ✓ | docs/07 |
| Güvenlik başlıkları | ✓ (bir sapma) | `next.config.ts`; aşağıya bakın |
| 404 ve 500, üç dilde | ✓ | `not-found.tsx`, `error.tsx`, `global-error.tsx` |
| README, ayrı içerik dizini, staging/canlı ayrımı | ✓ | `README.md`, `NEXT_PUBLIC_SITE_ENV` |

## Form verisi nereye gider, ne kadar saklanır? · *Uyum notu*

1. Tarayıcı → Server Action (`src/actions/submit-lead.ts`): doğrulama, honeypot, hız sınırı.
2. **Supabase** `leads` tablosu (`supabase/migrations/0001_leads.sql`). Önerilen bölge AB (Frankfurt). Satır düzeyinde güvenlik açık; anonim erişim yok. Yazma yalnızca sunucudaki service role anahtarıyla.
3. Saklanan alanlar: formdaki alanlar, dil, onay zaman damgaları, IP'nin tuzlu SHA-256 özeti (IP'nin kendisi saklanmaz).
4. İsteğe bağlı ekip bildirimi: Telegram bot (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`): program, öğrenci adı, iletişim. *Bu, verinin Telegram'a aktarılması demektir; avukat değerlendirmesine sunulmalı.*
5. Saklama süresi: **12 ay varsayımı** (`purge_old_leads()`); kesin süre `[KARAR — avukat]`. Özbekistan Kişisel Veri Kanunu (Mart 2026 değişikliği) ve KVKK değerlendirmesi avukata ait (plan §16).
6. Supabase tanımlı değilse ve ortam staging ise kayıtlar `.data/leads.ndjson` dosyasına yazılır (yerel QA). Canlıda bu yol kapalıdır; Supabase yoksa form hata verir ve canlı derleme zaten durur.

## Staging ve canlı ortam

| | Staging (varsayılan) | Canlı (`NEXT_PUBLIC_SITE_ENV=production`) |
|---|---|---|
| Arama motorları | `noindex`, robots `Disallow: /` | Açık |
| Ekip notları (Staging · KARAR/TEYİT, Taslak) | Görünür | Hiç render edilmez |
| Teyit bekleyen bölümler | Görünür (notla) | Gizli; Hamkorlar ve BTEC 404 |
| Derleme | Serbest | `scripts/check-launch.mjs` önce çalışır: hukuki onay, zorunlu ortam değişkenleri ve yasal metinlerde `[KARAR]` kalmaması şart |

## Performans kararları

- Fontlar kendi alan adımızdan, alt kümeli WOFF2; yalnızca Latin önceden yüklenir. Başlık fontu `display: optional`: yavaş ağda ilk ziyarette metrik uyumlu yedek fontla çizilir, sonraki sayfalarda web fontu kullanılır. Bedeli: yavaş bağlantıda ilk görüşte başlık Georgia benzeri yedek fontla görünebilir.
- Dil seçicideki "Русский" sistem fontuyla: Özbekçe sayfada Kiril web fontu inmez.
- Bağlantı önceden yüklemesi (prefetch) kapalı: mobil veri maliyeti (Aşama 1).
- İstemciye yalnızca istemci bileşenlerinin kullandığı çeviriler gider.
- Kritik akışlar JS'siz çalışır: menü (`<details>`), SSS akordeonu, form gönderimi, veli alanlarının gösterimi (CSS `:has`).

## Bilinen sapmalar

| Konu | Hedef | Durum | Gerekçe ve seçenek |
|---|---|---|---|
| **CSP `script-src 'unsafe-inline'`** | Katı CSP | Satır içi betiklere izin var | Next.js statik sayfaları satır içi hidrasyon betiği üretir; nonce her sayfayı dinamik yapar (statik üretim ve performans kaybı). Diğer yönergeler katı: `frame-ancestors 'none'`, `form-action 'self'`, `object-src 'none'`, `base-uri 'self'`. *Seçenek:* sayfaları dinamik yapıp nonce'lu CSP |
| **JS bütçesi** | ≤ 100 KB gzip | Ana sayfa ~166 KB (Lighthouse aktarımı), iletişim ~200 KB | Çoğu Next.js + React çalışma zamanı. *Seçenek:* Astro'ya geçiş (plan §17'nin ilk önerisi) bu bütçeyi karşılar |
| `upgrade-insecure-requests` | — | Yalnızca canlıda | WebKit, `http://localhost` testlerinde CSS/JS'yi kırıyordu |

## Ortam değişkenleri

`.env.example` dosyasına bakın.
