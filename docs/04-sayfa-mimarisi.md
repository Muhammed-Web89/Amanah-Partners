# Aşama 4: Sayfa mimarisi ve düzen

*19 Ekim 2026 · Prototipler: `docs/prototip/` (gerçek sayfaların ekran görüntüleri, açık ve koyu tema, mobil 390 px ve masaüstü 1440 px)*

Kritik dört sayfa (Aşama 1, karar 3): **ana sayfa, A-Level (akış sayfası), Nasıl çalışıyoruz (sınav süreci dahil), form.**
Prototipler ayrı bir tasarım dosyası değil, çalışan sitenin kendisidir; `node scripts/screens.mjs` ile yeniden üretilir.

## Genel kurallar · *UX araştırmacısı + kreatif yönetmen*

| Kural | Uygulama | Hangi sorunu çözüyor? |
|---|---|---|
| İlk ekranda "ne" ve "kime" | Hero üst etiketi "Pearson Edexcel International A-Level · 14–18 yosh", H1 teklifin kendisi | Persona (a): ilk 10 saniyede "bu ne, çocuğuma uygun mu?" |
| Birincil eylem her zaman erişilebilir | Masaüstünde üst menüde, mobilde sabit alt barda "Bepul konsultatsiya" + Telegram | Persona (a): Telegram'a yazmak formdan kolay bir ilk adım |
| Uzun metin ortalanmaz | Tüm bölümler sola hizalı, en fazla 65 karakter | Okunurluk; "her şey ortada" şablon hissi |
| Hero'da fotoğraf yok | Rota diyagramı: Onlayn darslar → Pearson imtihoni → Hujjatlar → Viza → Kampus | Plan §5.1 ve prompt §5 (stok fotoğraf yasağı) |
| Teyit bekleyen içerik | Canlıda hiç render edilmez; staging'de altın "Staging · TEYİT" notuyla | Prompt §2: çözülmemiş karar çözülmüş gibi yazılmaz |
| Bölüm ritmi | Beyaz ve "dosya" grisi (`paper-2`) dönüşümlü; her bölümde etiket + H2 | Uzun sayfada konum hissi |

## Sayfa bazlı düzen

### Ana sayfa (prototip: `ana-sayfa-*.png`)

| # | Bölüm (plan §5) | Masaüstü | Mobil |
|---|---|---|---|
| 1 | Hero + güven şeridi | İki sütun: metin ve rota diyagramı; altında 4 ikonlu güven satırı | Metin → düğmeler alt alta → diyagram → güven satırı |
| 2 | Neden A-Level | 2×2 kayıt satırı + küçük punto koşul notu | Tek sütun |
| 3 | Kime uygun | İki büyük kart + destek programı bağlantıları | Kartlar alt alta |
| 4 | Kim neyi yürütür | 3 sütunlu tablo | Satır blokları (sütun adı değerin üstünde) |
| 5 | Neden Amanah | Karşılaştırma tablosu, Amanah sütunu vurgulu | Satır blokları |
| 6 | Nasıl çalışıyoruz (özet) | 6 adımlı yatay gösterge | Dikey |
| 7 | Sınavlar nerede | Metin + sessiyalar kaydı + iki dürüst not | Tek sütun |
| 8 | Hedef ülkeler | 3×2 liste, son güncelleme tarihi | Tek sütun |
| 9 | Üniversiteler `[TEYİT 1]` | Logosuz isim listesi | Canlıda gizli |
| 10 | Uygun fiyat | Metin + düğme | Tek sütun |
| 11 | Ekip | Düz cümle + 3 etiket (sayaç kartı yok, Aşama 1 karar 2) | |
| 12 | SSS önizleme | 5 soru akordeon + tüm sorular bağlantısı | |
| 13 | Son yazılar | 3 kart (yazı yoksa bölüm hiç görünmez) | |
| 14 | Son çağrı | Koyu üst çizgili bant: başlık + iki eylem | |

### A-Level (prototip: `a-level-*.png`)
Başlık (breadcrumb, etiket, H1, giriş) → Program nedir → Neden A-Level (4 kart) → Yönelime göre ders rotaları (4 kart, `[TEYİT 5]` notu) → Haftalık düzen (saat tablosu `[KARAR 5]` canlıda gizli; okul ile birlikte metni ve "namuna" veli raporu görünür) → Sınav planı → Sınav bloğu → Sonraki adım → Son çağrı.

### Nasıl çalışıyoruz (prototip: `nasil-calisiyoruz-*.png`)
6 adım dikey kart: her adımda "ne olur", "sizden ne beklenir", "süre / ne alırsınız". Ardından sınav bloğu (merkez adlı genişletilmiş metin yalnızca burada, `[TEYİT 2, 3]`), 5 adımlı sınav süreci, sık hatalar, yazılı alınanlar.

### Form (prototip: `form-*.png`)
Masaüstünde iki sütun: solda form, sağda Telegram kutusu, konum, çalışma saatleri ve "resmi hesaplar" uyarısı. Mobilde form önce.
Alan sırası (plan §13.1): öğrenci adı, sınıf → 18 yaş sorusu → program → hedef ülke (mobilde 2 sütun) → formu dolduran → veli bilgisi (yalnızca 18 yaş altı; CSS ile, JS gerekmez) → Telegram/telefon, şehir → mesaj → onay kutuları → gönder.

### Diğer sayfalar

| Sayfa | Düzen kararı |
|---|---|
| Programlar | Ana programlar (2 büyük kart) → destek programları (3 sütun) → karşılaştırma tablosu → "Hangi yol bana uygun?" 3 soru (her seçenek bir bağlantı; JS yok) |
| Destek programları (×6) | Kısa sayfa: başlık + 1–2 blok + son çağrı. BTEC canlıda 404 `[TEYİT 6]` |
| Ülkeler + 6 ülke | Aynı şablon: kayıt satırlarıyla "Özbek öğrenci için yol", dil koşulu, 3 soru, kaynaklar, son güncelleme tarihi, koşul uyarısı |
| Ücretler | Paket kapsamı tablosu (fiyat alanı yok) → uygun fiyat gerekçeleri → ayrıca ödenenler → ödeme adımları (yatay 3 adım) |
| Rehber | Arama + kategori filtresi (JS ile; JS yoksa tüm liste) → yazı listesi. Yazı: "Qisqa javob" kutusu, H2'ler, kaynaklar, son güncelleme |
| SSS | Kategori sekmeleri (buton grubu) + arama; her cevapta ilgili sayfa bağlantısı |
| Hakkımızda | Biz kimiz (Faydalan paragrafı `[TEYİT 1]`) → ne yapıyoruz → ekip (rol bazlı, isimsiz) → ilkeler |
| Hamkorlar | Canlıda 404 `[TEYİT 1]` |
| Yasal (×6) | Tek sütun metin; staging'de kırmızı "Taslak" notu; canlı derleme hukuki onay olmadan durur |
| 404 / 500 | Üç dilde; ana sayfa + iletişim bağlantısı |

## Plan v2'den bilinçli sapmalar

| Konu | Plan | Uygulama | Gerekçe |
|---|---|---|---|
| Hero H1 | Uzun tireyle tek cümle | İki kısa cümle | Prompt §8 (uzun tireyle kurulan cümleler) |
| Ekip sayıları | "10+ / Yüzlerce / 10+ yıl" kartları | Düz cümle | Prompt §5 (sayaç), Aşama 1 karar 2 |
| Hamkorlar ve üniversite listesi | Sitede | Kodlandı, canlıda kapalı | `[TEYİT 1]`, Aşama 1 karar 4 |
| Haftalık saat tablosu | Örnek tablo | Staging'de görünür, canlıda gizli | Plan §8: "Rakamlar kesinleşmeden tablo yayınlanmaz" |
