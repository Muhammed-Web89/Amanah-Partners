# Açık kararlar ve yayın öncesi kontrol listesi

*19 Ekim 2026 · Plan v2 §20 ile birebir · Her maddenin sitede nerede beklediği ve kapanınca ne yapılacağı*

## Kararlar `[KARAR]`

| # | Karar (plan §20) | Sitede şu an | Kapanınca |
|---|---|---|---|
| 1 | Ön görüşmenin süresi ve formatı | "Bir suhbat", "onlayn" (Nasıl çalışıyoruz adım 1) | `content/*/how-we-work.json` adım 1 |
| 2 | Form yanıt süresi sözü | Teşekkür sayfasında staging notu; söz yazılmıyor | `site.responseTimeKnown = true` + `messages/*.json → form.thanksBody` |
| 3 | Telegram destek kullanıcı adı, kanal adı, çalışma saatleri | Telegram düğmeleri staging'de pasif, canlıda gizli | `NEXT_PUBLIC_TELEGRAM_SUPPORT`, `NEXT_PUBLIC_TELEGRAM_CHANNEL`, `site.hours`; Resmi sahifalar listesi (`legal.json`) |
| 4 | Kurumsal e-posta | Gösterilmiyor | `NEXT_PUBLIC_CONTACT_EMAIL`; gizlilik metnindeki başvuru adresi |
| 5 | Haftalık ders saatleri ve yük tahmini | Saat tablosu staging'de, canlıda gizli | `verified.weeklyHours = true` + `shared.json → weekly` |
| 6 | Taksit ve ödeme kanalları | Ücretler sayfasında staging notu | `fees.json` notice bloğunu metinle değiştir; sözleşme özeti |
| 7 | Barındırma servisi | — | Öneri: Vercel (Next.js, AB bölgesi fonksiyon). Staging + canlı iki ortam |

## Teyitler `[TEYİT]`

| # | Teyit | Sitede bekleyen | Kapanınca |
|---|---|---|---|
| 1 | Faydalan'ın isim, ortak ağ, partner ve üniversite listesi için yazılı onayı | Hakkımızda paragrafı, "Kim neyi yürütür" satırı, SSS cevabı, Hamkorlar sayfası, üniversite listesi | `verified.faydalanName`, `verified.universityList` |
| 2 | ABC Horizon (91667) üzerinden kayıt teyidi | Güven şeridi maddesi, model tablosu, Nasıl çalışıyoruz genişletilmiş metni, SSS | `verified.centre91667` |
| 3 | Özbekistan'daki onaylı merkezler | Aynı yerler; merkez adları henüz yok | `verified.uzbekistanCentres` + `shared.json → exam.extended` metni |
| 4 | Amanah'ın kendi Pearson merkez numarası | "Amanah Pearson onaylı merkezdir" hiçbir yerde yazmıyor | Numara alınırsa numarasıyla eklenir |
| 5 | Sunulan A-Level ve IGCSE ders listesi | Ders rotası kartları staging notlu | `verified.courseList` (+ Course yapılandırılmış verisi eklenebilir) |
| 6 | BTEC kapsamı ve merkezi | BTEC sayfası ve menü öğesi canlıda yok | `verified.btec` |
| 7 | Profesör mentör sayısı ve alanları | Sayı yazılmıyor | Sayı yazılacaksa kaynakla |
| 8 | Hollanda ve Kanada örnek üniversite koşulları | Ülke sayfalarında staging notu | `destinations.json` + `verified.netherlandsCanada` |

## Ek açık noktalar (bu çalışmada çıktı)

- **Form verisinin Telegram bota gönderilmesi**: veri aktarımıdır; avukat değerlendirmesi.
- **Saklama süresi**: 12 ay varsayımı (SQL'de), avukat onayı.
- **Rusça "вы" / "Вы"**: editör kararı (docs/05).
- **Nottingham** örneği için kaynak bağlantısı yok (docs/05).
- **Hero görselleri** (`src/assets/hero/`): ekipten gelen markalı görseller (docs/09). Yapay üretimse ve gerçek bir kampüse benziyorsa yayın öncesi kullanım onayı.
- **JS bütçesi** sapması ve **CSP `unsafe-inline`**: kabul ya da Astro / nonce'lu CSP (docs/06).

## Yayın öncesi kontrol listesi

**Kapı 0: İçerik**
- [ ] Üç dilde anadil editörü kontrolü (uz, ru; en)
- [ ] Tüm `[TEYİT]` maddeleri kapandı ya da ilgili bayrak `false` kalıyor (bilinçli)
- [ ] `npm run check:content` → 0 hata; uyarılar elle gözden geçirildi
- [ ] Rehber yazıları (plan §15.2) kaynaklarıyla yazıldı ya da liste sayfası boş durumla yayında

**Kapı 1: Yasal**
- [ ] Gizlilik, kullanım koşulları, hizmet sözleşmesi özeti, iade, çerez metinleri avukat onaylı; `legal.json` dosyalarında `[KARAR]` kalmadı
- [ ] Özbekistan veri kanunu ve KVKK değerlendirmesi; Supabase bölgesi buna göre seçildi
- [ ] Faydalan'ın yazılı onayı (ad, ağ, liste)
- [ ] Resmi hesaplar listesi doğrulandı
- [ ] `LEGAL_APPROVED=yes`

**Kapı 2: Teknik**
- [ ] Supabase projesi (AB), `supabase/migrations/0001_leads.sql` çalıştırıldı, saklama işi zamanlandı
- [ ] Ortam değişkenleri tanımlı (`.env.example`); `LEAD_HASH_SALT` rastgele ve gizli
- [ ] Staging'de ekip içi deneme başvuruları (gerçek müşteri verisi olmadan), Telegram bildirimi
- [ ] Plausible alan adı ve hedefler: "Form Submit", "Telegram", "Telegram Channel"
- [ ] `npm run build && npm test` yeşil
- [ ] Telegram içi tarayıcı (Android + iOS), Firefox, gerçek düşük segment Android ile elle kontrol
- [ ] Ekran okuyucuyla ana akış; "beş saniye testi"
- [ ] Yandex Webmaster ve Google Search Console doğrulama dosyaları

**Kapı 3: Yayın**
- [ ] `NEXT_PUBLIC_SITE_ENV=production npm run build` kontrolü geçti
- [ ] Canlı alan adında Lighthouse (mobil): performans, erişilebilirlik, SEO, en iyi uygulamalar ≥ 90
- [ ] İlk iki hafta: form tamamlama ve Telegram geçiş oranı izleniyor

## Prompt §14: teslimden önce son kontrol

- **Hazır şablonla karıştırılabilir mi?** Hayır. Rota diyagramı, kayıt defteri satırları, serif/sans çifti, altın vurgu ve kartsız satır düzeni şablon dilinden ayırıyor. Değiştirilen: varsayılan Inter kaldırıldı, gradyan/fotoğraf/sayaç yok.
- **Ana sayfadaki her bölüm bir işe yarıyor mu?** Her bölüm plan v2'deki bir soruya cevap veriyor (docs/04 tablo).
- **Boş, yer tutucu ya da "yakında" hissi?** Canlıda yer tutucu render edilmiyor; boş rehber "Maqolalar tayyorlanmoqda" boş durumuyla ve eylemle. Staging'de karar bekleyenler açıkça işaretli.
- **Mobilde ilk ekranda "Başvur" ve "Telegram"?** Evet, sabit alt bar. (Telegram kullanıcı adı `[KARAR 3]` gelene kadar canlıda gizli olur.)
- **Üç dilde metin tamam ve editör kontrolünden geçti mi?** Yazıldı; **editör kontrolü bekliyor**.
- **Yasak ifade, fiyat, uydurma veri?** Tarama temiz; sayılar plan v2'deki ekip bilgisi, kaynaksız sayaç yok.
- **Bir ebeveyn ilk üç saniyede ne yapacağını bilir mi?** Varsayım: evet (H1 + tek birincil düğme). Gerçek kişiyle test edilmeli.
