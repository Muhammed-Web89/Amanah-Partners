# Aşama 7: QA raporu

*19 Ekim 2026 · QA mühendisi · Ortam: macOS (Darwin 27), yerel `next start` (staging derlemesi), Chrome 141+, Playwright 1.64, Lighthouse 12.8.2*

Tekrar çalıştırmak için: `npm run build && npm test` (otomatik matris), `npm run check:content` (metin), `node scripts/screens.mjs` (prototip görüntüleri).

## Özet

| Alan | Hedef | Sonuç |
|---|---|---|
| Otomatik testler | Hepsi geçer | **126 / 126 geçti** (3 tarayıcı projesi) |
| Erişilebilirlik (axe, WCAG 2.2 A/AA) | Kritik/ciddi sorun 0 | **0** (39 sayfa açık tema + 4 sayfa koyu tema) |
| Lighthouse erişilebilirlik | ≥ 90 | **100** (ölçülen 6 sayfa) |
| Lighthouse en iyi uygulamalar | ≥ 90 | **100** |
| Lighthouse performans (mobil, simülasyon) | ≥ 90 | **93–95** |
| Lighthouse SEO | ≥ 90 | **58 (staging)**: bilinçli `noindex` + canonical canlı alan adını gösteriyor. Canlı derlemede bu iki denetim kalkar; canlıda yeniden ölçülmeli |
| LCP (mobil 4G) | < 2,5 sn | **1,5 sn** gerçek yavaşlatma ile / **2,9–3,2 sn** simülasyon ile (aşağıya bakın) |
| CLS | — | **0** |
| JavaScript (gzip) | ≤ 100 KB | **Sağlanmadı**: ana sayfa ~166 KB, iletişim ~195 KB (gerekçe docs/06) |
| 360 px'te yatay kaydırma | Yok | **Yok** (39 sayfa) |
| Metin taraması | Yasak ifade yok | **0 hata**; 15 uyarının hepsi olumsuz kullanım ("garanti vermeyiz") |

## Test matrisi

| Boyut | Kapsam | Sonuç |
|---|---|---|
| **Genişlikler** | 360, 375, 390, 430, 768, 1280, 1440 px | Tüm genişliklerde yatay kaydırma yok |
| **Tarayıcılar** | Chrome masaüstü · Android Chrome (Pixel 7 öykünmesi) · iOS Safari motoru (WebKit, iPhone 13 öykünmesi) | Geçti |
| | Firefox masaüstü | **Atlandı**: Playwright Firefox bu makinede başlatılamadı ("Could not find profile folder", sandbox dışında da). Gerçek Firefox'ta elle kontrol edilmeli |
| | Edge | **Doğrudan test edilmedi**: Chromium tabanlı, Chrome sonuçlarıyla aynı motor |
| | Telegram içi tarayıcı | **Atlandı**: otomasyon mümkün değil. Yedeği test edildi: JS kapalıyken form gönderimi geçti. Gerçek cihazda (Android + iOS) elle kontrol edilmeli |
| | Gerçek cihaz (düşük segment Android, iPhone) | **Atlandı**: cihaz erişimi yok; öykünme kullanıldı |
| **Diller** | uz, ru, en: 39 sayfa | Aynı yapı (betik denetimi), hreflang doğru, dil değişimi aynı sayfanın karşılığına gidiyor (rehber yazısında farklı slug'a yönlendirme dahil) |
| **Temalar** | Açık + koyu | Her ikisi axe'ten geçti; koyu tema seçimi yeniden yüklemede korunuyor |
| **Ağ** | Yavaş 4G (DevTools: 1,6 Mbps, 150 ms, 4× CPU) | LCP 1,46–1,51 sn, performans 100 (3'er ölçüm medyanı; /uz, /uz/aloqa, /ru) |
| | Yavaş 3G (400 kbps, 2000 ms gecikme, 4× CPU) | /uz: FCP = LCP 4,8 sn, etkileşime hazır 11,4 sn. İçerik ve form JS'siz kullanılabilir |

### Form senaryoları (her tarayıcı projesinde)

| Senaryo | Sonuç |
|---|---|
| Başarılı gönderim → teşekkür sayfası, kayıt yazıldı | ✓ |
| Eksik alanlar → hata özeti (odak özete taşınır), alanlarda `aria-invalid` | ✓ |
| Geçersiz Telegram adı → "Telegram foydalanuvchi nomini @ bilan yozing…", girilen değerler korunur | ✓ |
| Kişisel veri onayı olmadan → gönderilmez, kayıt yok | ✓ |
| 18 yaş altı: veli bilgisi ve veli onayı zorunlu; 18+ seçilince veli alanları gizlenir | ✓ |
| Sunucu hatası → açık mesaj + Telegram alternatifi, veriler korunur | ✓ |
| JavaScript kapalı → form gönderilir | ✓ |
| Honeypot dolu → kayıt yapılmaz | ✓ |

### Diğer otomatik kontroller

Atla bağlantısı · Programlar menüsü klavye + Escape · mobil menü Escape ve odak dönüşü · SSS aramasında `oʻ` / `o'` eşdeğerliği · kök adresin tarayıcı diline göre yönlendirmesi (ru, uz, en, desteklenmeyen dil → uz) · 404 üç dilde · noindex, robots, sitemap (hreflang'lı) · yapılandırılmış veri (FAQPage yalnızca SSS'te) · güvenlik başlıkları.

### Canlı ortam doğrulaması

- `NEXT_PUBLIC_SITE_ENV=production npm run build` → **durdu**: hukuki onay, 5 eksik ortam değişkeni ve yasal metinlerdeki `[KARAR]` yer tutucuları listelendi.
- Kontrol atlanarak canlı modda derlenen sitede 9 sayfa tarandı: "Staging", "KARAR", "TEYİT", "Faydalan", "91667", üniversite listesi ve `noindex` **hiçbirinde yok**. Hamkorlar ve BTEC 404, robots.txt açık + sitemap.

## LCP: iki ölçüm neden farklı?

Lighthouse'un varsayılan "simülasyon" yöntemi, yerel (gecikmesiz) yüklemede LCP'den önce biten tüm istekleri, JavaScript dosyaları dahil, yavaş ağda yeniden hesaplar. Bu yüzden 2,9–3,2 sn çıkıyor. Gerçek yavaşlatmada (DevTools yöntemi) LCP 1,5 sn. Sayfa statik HTML olduğu ve LCP öğesi (H1) fontu beklemediği için gerçek değer daha yakın. **Canlı alan adında, gerçek CDN gecikmesiyle yeniden ölçülmeli** (Kapı 3: ilk iki hafta).

## QA sırasında bulunan ve düzeltilen hatalar

| # | Bulgu | Etki | Düzeltme |
|---|---|---|---|
| 1 | Üst menüdeki düğme mobilde gizlenmiyordu (`hidden` ile `inline-flex` çakışması) | 360 px'te 44 px yatay taşma | `max-md:hidden` |
| 2 | Tablo hücreleri mobilde flex: "A-Level" sarmalayıcıları satır kırılmasını engelledi | Ücretler sayfasında 103 px taşma | Mobilde etiket üstte, blok düzen |
| 3 | `/ru/privacy` başlığında uzun Rusça kelime | 24 px taşma | Başlıklarda `hyphens: auto` + `overflow-wrap` |
| 4 | Staging Telegram yer tutucusu %70 opaklık | Kontrast ihlali (tüm sayfalar) | Opaklık kaldırıldı |
| 5 | `fieldset` üzerinde izin verilmeyen `aria-invalid` | axe ciddi | Radyo grupları `role="radiogroup"` |
| 6 | SSS: arama kutusu ve kategori grubu aynı etiket | Ekran okuyucuda belirsizlik | Kategori grubuna ayrı etiket |
| 7 | CSP `upgrade-insecure-requests` WebKit'te localhost'u kırıyor | Test ortamı (canlıyı etkilemez) | Yalnızca canlıda |
| 8 | Zod istemci paketine giriyordu (`new Function`) | CSP ihlali + ~34 KB fazla JS | Sabitler zod'suz dosyaya taşındı |
| 9 | Favicon yok | Konsol 404 | `app/icon.svg` |
| 10 | Kiril ve italik fontlar her sayfada iniyordu | +110 KB, LCP | Yalnızca Latin önyükleme, italik kaldırıldı, dil adları sistem fontuyla |

## Atlanan veya elle yapılması gerekenler

1. **Ekran okuyucuyla ana akış denemesi** (VoiceOver / TalkBack): yapılmadı. Otomatik denetim ve ARIA testleri geçti; elle deneme gerekli.
2. **"Beş saniye testi"** (prompt §12): ana sayfayı bir kişiye gösterip ne sunulduğunu sorma. Gerçek kişiyle yapılmalı.
3. **Telegram içi tarayıcı, gerçek cihazlar, Firefox**: yukarıda.
4. **Canlı alan adında Lighthouse ve SEO**: staging noindex olduğu için.
5. **Supabase uçtan uca**: proje anahtarları olmadığı için kayıt yerel dosyaya yazılarak test edildi. Migration hazır; anahtarlar gelince staging'de bir deneme başvurusu yapılmalı (Kapı 2).
