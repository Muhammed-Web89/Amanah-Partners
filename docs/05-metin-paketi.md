# Aşama 5: Metin ve dil

*19 Ekim 2026 · Metinler: `content/<dil>/*.json` (sayfalar), `messages/<dil>.json` (arayüz), `content/guides/<id>/<dil>.md` (rehber)*

## Durum · *Metin yazarı (çok dilli)*

| Dil | Kapsam | Yazım | Editör kontrolü |
|---|---|---|---|
| **Oʻzbekcha** (ana metin) | Tüm sayfalar, arayüz, 1 rehber yazısı | Tamam | **Bekliyor**: anadil editörü (zorunlu, prompt §8) |
| **Русский** | Uz ile aynı yapı | Tamam | **Bekliyor**: anadil editörü |
| **English** | Uz ile aynı yapı; İngiliz yazımı (programme, centre, organise) | Tamam | **Bekliyor** |

Yapı eşitliği otomatik denetlenir: `npm run check:content` (ru ve en, uz ile aynı anahtar ve dizi uzunluğunda olmak zorunda).

## Uygulanan yazım kuralları

- **Özbekçe:** `oʻ`, `gʻ` için U+02BB; tutuq belgisi (`maʼlumot`, `taʼlim`, `masʼul`) için U+02BC. Düz kesme işareti (`'`) ve tipografik tırnak (`‘ ’`) yok; betik denetler. Arayüzde "KVKK" yok (plan §16): "Shaxsiy maʼlumotlar".
- **Rusça:** Resmi hitap "вы". Web metninde küçük harfle yazıldı; büyük harfli "Вы" kişisel yazışma geleneğidir. *Editör kararı:* büyük harf istenirse tek seferde değiştirilir.
- **İngilizce:** İngiliz yazımı; ülke adı "Türkiye".
- **Düğmeler eylem odaklı:** "Bepul konsultatsiyaga yoziling", "Arizani yuborish", "Yoʻlni koʻrish". "Başla!", "Hemen keşfet" yok.
- **Hata mesajları ne olduğunu ve nasıl düzeltileceğini söyler:** ör. "Telegram foydalanuvchi nomini @ bilan yozing yoki telefon raqamini kiriting."
- **Her ekran için ayrı metin:** sayfa başlığı ve meta açıklaması (her sayfa, üç dil), düğme, form etiketi, yardımcı metin, hata, boş durum (rehber), başarı (teşekkür sayfası), 404/500.
- **Superlatifler** (Aşama 1, karar 1): plan v2'deki "eng ishonchli yoʻl" gibi ifadeler yalnızca gerekçeyle birlikte ("çünkü ders, sınav ve başvuru tek ekipte").

## Tarama sonucu (`npm run check:content`)

- Yapı hatası: **0**. Özbekçe kesme işareti hatası: **0**.
- Uyarı: **15**, hepsi olumsuz kullanım: "kafolatlamaymiz", "не гарантирует", "Do you guarantee admission? … no consultancy can guarantee it". Plan v2 §2.4'e göre serbest.
- Rakamla fiyat, "%100", sahte aciliyet, BMAT, siyasi içerik: **yok**.

## Olgu eşleştirmesi (plan v2 §1 ve Ek A)

| İddia | Sitede | Kaynak |
|---|---|---|
| IAL dönemleri: Ekim, Ocak, Mayıs–Haziran | Ana sayfa, A-Level, SSS, rehber | Pearson IAL sayfası |
| IGCSE dönemleri: Kasım, Mayıs–Haziran | IGCSE sayfası, SSS, rehber | Pearson bülteni (Ek A) |
| IAL modüler, Hukuk hariç | A-Level, SSS, rehber | Pearson IAL sayfası |
| Özbek attestatı → foundation; A-Level → doğrudan (Edinburgh, Cardiff, Nottingham / Queen Mary, Liverpool) | İngiltere sayfası, ana sayfa | Üniversite sayfaları (Ek A). *Not:* Nottingham için Ek A'da kaynak bağlantısı yok; sayfada örnek olarak geçiyor, kaynak listesine eklenmedi |
| Almanya: 3 A-Level, en az C, ikisi A listesinden | Almanya sayfası | DAAD, Pearson blog |
| İtalya: 12 yıl kuralı, 3 farklı A-Level | İtalya sayfası | İtalya konsolosluğu, studiare-in-italia |
| ABD: seçkin üniversitelerde SAT/ACT yeniden zorunlu | ABD sayfası, SAT sayfası | Özet kaynak; *resmi sayfalardan teyit edilmeli* (sayfada da öyle yazılı) |
| BMAT kaldırıldı; UCAT, IMAT | Tıp sayfası | Ek A |
| Merkez no. 91667 | Yalnızca `[TEYİT 2]` kapanınca | Pearson merkez bulucu (henüz teyit yok) |

## Terim sözlüğü (plan §18.3, ilk sürüm)

| TR | Oʻzbekcha | Русский | English |
|---|---|---|---|
| Dış aday | xususiy nomzod | частный кандидат | private candidate |
| Ünite | boʻlim (unit) | модуль (unit) | unit |
| Sınav dönemi | imtihon sessiyasi | экзаменационная сессия | exam series |
| Foundation yılı | foundation yili | год foundation | foundation year |
| Kişisel beyan | shaxsiy bayonot | мотивационное эссе | personal statement |
| Referans mektubu | tavsiyanoma | рекомендательное письмо | reference |
| Burs | grant | грант | scholarship |
| Konaklama | turar joy / yotoqxona | жильё / общежитие | accommodation / halls |
| Veli | ota-ona (vasiy) | родитель (опекун) | parent (guardian) |
| Ücretsiz ön görüşme | bepul konsultatsiya | бесплатная консультация | free consultation |

## Editöre notlar

1. `about.json` başlığı "Farzandingizning kelajagi bizga omonat." — "omonat" yalnızca isim anlamıyla ve cümle içinde (plan §2.1). Editör onayı gerekli.
2. Hero H1 iki cümleye bölündü (Aşama 2 bulgusu); plan v2 metninden farkı onaylanmalı.
3. Rusça "вы" küçük harf (yukarıda).
4. Rehber: plan §15.2'deki 12 yazıdan yalnızca 4. yazı ("Pearson sınavları nasıl yapılır?") yazıldı; şablonu göstermek için. Diğer 11 yazı kaynak taraması gerektirdiği için **atlandı**.
