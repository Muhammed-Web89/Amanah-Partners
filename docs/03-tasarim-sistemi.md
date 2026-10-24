# Aşama 3: Tasarım sistemi

*19 Ekim 2026 · Yön A "Kayıt defteri" · Kaynak dosyalar: `src/styles/tokens.css` (değerler), `tailwind.config.js` (Tailwind eşlemesi)*

## 1. Token seti · *Ürün tasarımcısı*

| Grup | Değerler | Not |
|---|---|---|
| **Renk** | `paper`, `paper-2` (dosya), `paper-3` (hover) · `ink`, `ink-2` · `link` · `gold`, `gold-line`, `gold-soft` · `rule`, `rule-strong` · `danger`, `success` · `action` (+ hover, active, text) · `focus` | Anlamsal adlar. Koyu tema yalnızca `tokens.css` içinde değişir; bileşenlerde `dark:` sınıfı yok |
| **Tip ölçeği** | Akışkan: mobil (360 px) taban 16 px, oran 1.2 → masaüstü (1240 px) taban 17 px, oran 1.25. Adımlar: `xs` (-1), `base` (0), `lg` (1), `xl` (2), `2xl` (3), `3xl` (4), `display` (hero: 28 → 48 px) | Hero mobilde bilerek küçük: uzun Özbekçe başlık 5 satırı geçmez |
| **Boşluk** | Tailwind 4 px ölçeği; bileşenler 8'in katları. `gutter` 16 px, `section` 56 → 96 px, `section-sm` 40 → 64 px | Bölümler arası boşluk her sayfada aynı token |
| **Ölçü** | İçerik `max-w-content` 1200 px · gövde satırı `max-w-measure` 65ch | Prompt §6 |
| **Köşe** | `sm` 2 px (düğme, alan) · `md` 6 px (kart, panel, menü) · `full` (durum etiketi) | Üç seviye; "her kartta aynı köşe" tuzağına karşı satır düzeni ağırlıklı |
| **Gölge** | `raised` (açılır menü) · `overlay` (mobil bar, menü paneli) | İki seviye, rol bazlı; kartlarda gölge yok, kenarlık var |
| **Hareket** | `fast` 120 ms (renk) · `base` 200 ms (akordeon, menü) · eğri `cubic-bezier(.2,.7,.2,1)` | `prefers-reduced-motion` ile kapanır |

## 2. Tipografi uygulaması · *Tipograf*

- **Source Serif 4** (başlık, 600) + **Source Sans 3** (gövde, 400/600), `next/font` ile kendi sunucumuzdan.
- Alt kümeler: Latin, Latin genişletilmiş, Kiril (`unicode-range`); yalnızca Latin önceden yüklenir. Kiril yalnızca Rusça metinde iner.
- `ʻ` (U+02BB) ve `ʼ` (U+02BC): karakter tablosu ve tarayıcıda görsel test (docs/02). IBM Plex Sans ve mono fontlar görsel testte elendi.
- Yedek yığınlar: serif → Georgia, Cambria, Times New Roman; sans → Segoe UI, Roboto, Helvetica Neue, Arial. `next/font` metrik uyumlu yedek üretir (CLS 0).
- Başlık fontu `display: optional`, gövde `swap` (gerekçe: docs/06 §Performans).
- Üçüncü (veri) ailesi **kullanılmadı**: tablolarda eşit genişlikli rakamlar (`tabular-nums`).
- Bölünmemesi gereken terimler ("A-Level", "UCAT/IMAT", "Safe / Target / Reach") `src/lib/typo.tsx` ile tek parça tutulur.

## 3. Kontrast tablosu · *Ürün tasarımcısı*

Hesaplama: WCAG 2.x göreli parlaklık formülü (`scripts/contrast.py`). Gövde metni ≥ 4.5:1, bileşen sınırları ve anlamlı grafikler ≥ 3:1. Ayrıca axe ile 43 sayfa/tema kombinasyonunda otomatik kontrast denetimi: kritik/ciddi sorun 0 (docs/07).

**Koyu tema gerekçesi** (Aşama 1, karar 5): akşam saatlerindeki dersler ve Telegram'ın koyu temasıyla süreklilik. Açık tema varsayılan; koyu tema sistem tercihini izler, kullanıcı değiştirebilir.


### Açık tema

| Çift | Ön plan | Zemin | Oran | Hedef | Sonuç |
|---|---|---|---|---|---|
| Gövde metni (ink) | `#13202F` | paper `#FFFFFF` | 16.47 | 4.5 | ✓ |
| Gövde metni (ink) | `#13202F` | paper2 `#F1F6F9` | 15.13 | 4.5 | ✓ |
| Gövde metni (ink) | `#13202F` | paper3 `#E4EDF3` | 13.88 | 4.5 | ✓ |
| İkincil metin (ink-2) | `#4A5568` | paper `#FFFFFF` | 7.53 | 4.5 | ✓ |
| İkincil metin (ink-2) | `#4A5568` | paper2 `#F1F6F9` | 6.91 | 4.5 | ✓ |
| İkincil metin (ink-2) | `#4A5568` | paper3 `#E4EDF3` | 6.35 | 4.5 | ✓ |
| Bağlantı | `#1D4E89` | paper `#FFFFFF` | 8.39 | 4.5 | ✓ |
| Bağlantı | `#1D4E89` | paper2 `#F1F6F9` | 7.71 | 4.5 | ✓ |
| Turkuaz etiket/vurgu metni | `#0E6B75` | paper `#FFFFFF` | 6.22 | 4.5 | ✓ |
| Turkuaz etiket/vurgu metni | `#0E6B75` | paper2 `#F1F6F9` | 5.71 | 4.5 | ✓ |
| Turkuaz etiket/vurgu metni | `#0E6B75` | accentsoft `#E3F4F5` | 5.48 | 4.5 | ✓ |
| Turkuaz çizgi (rota, anlamlı grafik) | `#2B8F99` | paper `#FFFFFF` | 3.82 | 3.0 | ✓ |
| Turkuaz çizgi (rota, anlamlı grafik) | `#2B8F99` | paper2 `#F1F6F9` | 3.51 | 3.0 | ✓ |
| Form alanı sınırı | `#7A8494` | paper `#FFFFFF` | 3.78 | 3.0 | ✓ |
| Form alanı sınırı | `#7A8494` | paper2 `#F1F6F9` | 3.47 | 3.0 | ✓ |
| Odak halkası | `#1D4E89` | paper `#FFFFFF` | 8.39 | 3.0 | ✓ |
| Odak halkası | `#1D4E89` | paper2 `#F1F6F9` | 7.71 | 3.0 | ✓ |
| Hata metni | `#A3312A` | paper `#FFFFFF` | 6.93 | 4.5 | ✓ |
| Hata metni | `#A3312A` | dangersoft `#FBECEA` | 6.04 | 4.5 | ✓ |
| Başarı / Onaylı metni | `#1F6658` | paper `#FFFFFF` | 6.77 | 4.5 | ✓ |
| Başarı / Onaylı metni | `#1F6658` | successsoft `#E4F1ED` | 5.84 | 4.5 | ✓ |
| Birincil düğme metni | `#FFFFFF` | btn `#13202F` | 16.47 | 4.5 | ✓ |
| Birincil düğme metni | `#FFFFFF` | btnhover `#23364D` | 12.31 | 4.5 | ✓ |
| Birincil düğme zemini (bileşen sınırı) | `#13202F` | paper `#FFFFFF` | 16.47 | 3.0 | ✓ |

### Koyu tema

| Çift | Ön plan | Zemin | Oran | Hedef | Sonuç |
|---|---|---|---|---|---|
| Gövde metni (ink) | `#E8ECF2` | paper `#0F1A28` | 14.78 | 4.5 | ✓ |
| Gövde metni (ink) | `#E8ECF2` | paper2 `#142336` | 13.38 | 4.5 | ✓ |
| Gövde metni (ink) | `#E8ECF2` | paper3 `#1B2D44` | 11.77 | 4.5 | ✓ |
| İkincil metin (ink-2) | `#AEB8C7` | paper `#0F1A28` | 8.74 | 4.5 | ✓ |
| İkincil metin (ink-2) | `#AEB8C7` | paper2 `#142336` | 7.92 | 4.5 | ✓ |
| İkincil metin (ink-2) | `#AEB8C7` | paper3 `#1B2D44` | 6.96 | 4.5 | ✓ |
| Bağlantı | `#93B9EC` | paper `#0F1A28` | 8.67 | 4.5 | ✓ |
| Bağlantı | `#93B9EC` | paper2 `#142336` | 7.85 | 4.5 | ✓ |
| Turkuaz etiket/vurgu metni | `#7FDADF` | paper `#0F1A28` | 10.84 | 4.5 | ✓ |
| Turkuaz etiket/vurgu metni | `#7FDADF` | paper2 `#142336` | 9.82 | 4.5 | ✓ |
| Turkuaz etiket/vurgu metni | `#7FDADF` | accentsoft `#12303A` | 8.61 | 4.5 | ✓ |
| Turkuaz çizgi (rota, anlamlı grafik) | `#4FB8C0` | paper `#0F1A28` | 7.47 | 3.0 | ✓ |
| Turkuaz çizgi (rota, anlamlı grafik) | `#4FB8C0` | paper2 `#142336` | 6.76 | 3.0 | ✓ |
| Form alanı sınırı | `#7584A0` | paper `#0F1A28` | 4.64 | 3.0 | ✓ |
| Form alanı sınırı | `#7584A0` | paper2 `#142336` | 4.20 | 3.0 | ✓ |
| Odak halkası | `#93B9EC` | paper `#0F1A28` | 8.67 | 3.0 | ✓ |
| Odak halkası | `#93B9EC` | paper2 `#142336` | 7.85 | 3.0 | ✓ |
| Hata metni | `#F2978F` | paper `#0F1A28` | 8.01 | 4.5 | ✓ |
| Hata metni | `#F2978F` | dangersoft `#3A1F22` | 6.86 | 4.5 | ✓ |
| Başarı / Onaylı metni | `#86CDBD` | paper `#0F1A28` | 9.58 | 4.5 | ✓ |
| Başarı / Onaylı metni | `#86CDBD` | successsoft `#15302C` | 7.70 | 4.5 | ✓ |
| Birincil düğme metni | `#0F1A28` | btn `#7FDADF` | 10.84 | 4.5 | ✓ |
| Birincil düğme metni | `#0F1A28` | btnhover `#A5ECEF` | 13.22 | 4.5 | ✓ |
| Birincil düğme zemini (bileşen sınırı) | `#7FDADF` | paper `#0F1A28` | 10.84 | 3.0 | ✓ |

## 4. Bileşen kütüphanesi · *Ürün tasarımcısı + frontend*

Durumlar: **D** default · **H** hover · **F** focus-visible (2 px `focus` halkası, 2 px boşluk, tüm etkileşimli öğelerde) · **A** active · **X** disabled · **E** error · **L** loading.

| Bileşen | Dosya | Durumlar | Not |
|---|---|---|---|
| Dil seçici (kısa / tam) | `layout/LanguageSwitcher.tsx` | D H F, etkin dil `aria-current` | Her ad kendi `lang` özniteliğiyle; aynı sayfanın karşılığına gider |
| Üst menü + Programlar açılır menüsü | `layout/Header.tsx`, `ProgramsMenu.tsx` | D H F, etkin sayfa altın alt çizgi | `<details>`: JS olmadan açılır; Escape / dışarı tıklama ile kapanır |
| Mobil menü | `layout/MobileMenu.tsx` | D H F, açık/kapalı `aria-expanded` | Escape, odak düğmeye döner; arka plan kaydırması kilitli |
| Sabit "Bepul konsultatsiya" + Telegram | `layout/MobileBar.tsx` | D H F A | Yalnızca < 768 px; güvenli alan (iPhone çentiği) payı |
| Düğmeler: birincil, ikincil, metin, ikon | `ui/button.ts` | D H F A X L | En az 44–48 px dokunma alanı |
| Kart | `ui/misc.tsx → Card` | D H F (tüm kart tıklanır) | |
| Kayıt satırı (etiket → değer) | `ui/Ledger.tsx` | — | Yön A'nın ana bileşeni |
| Süreç adımı (yatay / dikey) | `ui/ProcessSteps.tsx` | — | Masaüstünde yatay, mobilde dikey; yalnızca gerçek sıra numaralı |
| Rota diyagramı | `ui/RouteDiagram.tsx` | — | Hero görseli; ekran okuyucuya sıralı liste |
| Tablo | `ui/DataTable.tsx` | — | Mobilde yatay kaydırma yerine satır blokları; `th scope` |
| SSS akordeonu | `ui/Accordion.tsx` | D H F | `<details>`; JS gerekmez |
| Form alanları, seçim grupları | `forms/fields.tsx` | D H F E X | Etiket bağlı, `aria-describedby`, `aria-invalid`, `radiogroup` |
| Hata özeti + alan hataları | `forms/ConsultationForm.tsx` | E | `role="alert"`, `aria-live`, odak özete taşınır, bağlantılar alanlara gider |
| Kişisel veri onay kutusu (+ veli onayı) | `forms/fields.tsx → ConsentBox` | D F E | |
| Gönder düğmesi | `ConsultationForm.tsx → SubmitButton` | D H F A X L | Yüklenirken döner ikon + "Yuborilmoqda…", `aria-busy` |
| Uyarı kutusu | `ui/Notice.tsx` | info / pending / draft | `pending` ve `draft` yalnızca staging'de render edilir |
| Durum etiketi | `ui/misc.tsx → StatusTag` | — | Renk + metin |
| Footer | `layout/Footer.tsx` | D H F | Plan §4.3 dört sütun |
| Breadcrumb + sayfa başlığı | `ui/PageHeader.tsx` | D H F | BreadcrumbList yapılandırılmış verisi |
| Boş durum | `ui/misc.tsx → EmptyState` | — | Ne yapılabileceğini söyler, eylem verir |
| 404 / 500 | `ui/ErrorView.tsx` | — | Üç dilde; ana sayfa + iletişim |

## Güncelleme (19 Ekim 2026): logo renkleri

Altın vurgu kaldırıldı; renkler `Logo.jpeg`'den alındı. `gold*` token'ları `accent*` oldu.

| Token | Açık | Koyu | Kullanım |
|---|---|---|---|
| `accent` | `#3f6680` (6.1:1) | `#a8ccda` | Etiket ve vurgu metni |
| `accent-line` | `#5e88a0` (≥3:1) | `#7ba8bf` | Rota çizgisi, anlamlı grafik |
| `accent-soft` | `#e6f0f6` | `#16293c` | Not kutusu, vurgulu sütun |
| `accent-light` | `#a8ccda` | `#5f8aa3` | Logo mavisi; yalnızca dekoratif |
| `paper-2` | `#f1f6f9` | `#142336` | Alternatif bölüm (buz mavisi tonu) |
| `action` (koyu) | — | `#a8ccda` | Koyu temada birincil düğme |

Logo: `src/components/layout/Logo.tsx` (SVG işaret + AMANAH / PARTNERS), favicon `src/app/icon.svg`, OG görseli aynı işareti kullanır. Kontrol: `python3 scripts/contrast.py` → tüm çiftler geçer.

## Güncelleme (24 Ekim 2026): turkuaz vurgu (görev 16)

Mor/lavanta ve şeftali ışıklar kaldırıldı. Vurgu ve parlama artık turkuaz/camgöbeği: açıkta `accent #0e6b75`, `accent-line #2b8f99`, neon `#1497a6`; koyuda `accent #7fdadf`, neon `#4fd8e0`, birincil düğme `#7fdadf`. Pastel ışıklar buz mavisi, aqua, nane ve deniz köpüğü (koyuda gece mavisi, koyu turkuaz, okyanus). Lacivert zemin ve logo renkleri değişmedi. Kontrast tablosu yukarıda yeniden üretildi (`scripts/contrast.py`), tüm çiftler ✓. Ayrıntı: docs/11 §7.
