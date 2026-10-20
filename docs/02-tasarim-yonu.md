# Aşama 2: Tasarım yönü

*19 Ekim 2026 · Görsel karşılaştırma: `docs/02-yonler.html` (tarayıcıda açın)*

Aşama 1 kararları önerildiği gibi uygulandı: superlatifler gerekçeyle serbest, sayı kartı yerine cümle, dördüncü prototip "Nasıl çalışıyoruz", onay bekleyen bölümler kapalı, karanlık mod korunuyor, form verisi AB bölgesinde, dönem adı "May–Iyun".

---

## 1. Ön koşul: hangi fontlar Özbekçeyi doğru yazıyor? · *Tipograf*

Prompt §4, Latin genişletilmiş, Kiril ve `ʻ` (U+02BB), `ʼ` (U+02BC) desteğini zorunlu tutuyor. 28 Google Fonts ailesi iki adımda test edildi.

**Adım 1: Karakter var mı?** (font dosyasının karakter tablosu okundu)

| Sonuç | Aileler |
|---|---|
| Tam | Source Serif 4, Source Sans 3, IBM Plex Sans/Serif/Mono, Commissioner, Onest, Literata, Spectral, Lora, Piazzolla, Alegreya Sans, Raleway, Mulish, Unbounded, Noto Serif Display, Bitter |
| `ʻ` yok | Golos Text, Rubik, Geologica, PT Serif, Tenor Sans, Martian Mono, JetBrains Mono |
| `ʻ` ve `ʼ` yok | Manrope |
| Kiril de yok | Fraunces, Newsreader, Instrument Sans |

**Adım 2: Karakter doğru görünüyor mu?** (tarayıcıda çizildi, `02-yonler.html` altındaki glif testi)

- **IBM Plex Sans reddedildi.** Karakter var ama çok geniş boşlukla çiziliyor; "toʻliq" kelimesi "to ʻliq" gibi iki parça görünüyor.
- **Mono fontlar veri için reddedildi.** Sabit genişlikte `ʻ` tam bir hücre kaplıyor. Tablo ve tarihlerde mono yerine gövde fontunun eşit genişlikli rakamları kullanılacak.
- Source Serif 4, Source Sans 3, Commissioner, Onest ve Literata sorunsuz.

Bu yüzden üçüncü bir veri fontu kullanılmıyor. İki aile yeterli, bu aynı zamanda indirilecek font miktarını azaltıyor.

---

## 2. Üç yön

### A · Kayıt defteri

- **Kavram:** Özenle tutulmuş bir öğrenci dosyası: her adım yazılı, her bilgi yerinde.
- **Renk stratejisi:**

  | Token | Değer | Rol | Beyazda kontrast |
  |---|---|---|---|
  | Mürekkep | `#14233C` | Metin, başlık, birincil düğme | 15.73 |
  | Gri mürekkep | `#4A5568` | İkincil metin | 7.53 |
  | Bağlantı | `#1D4E89` | Bağlantılar | 8.39 |
  | Mühür altını | `#8A5F17` | Etiket ve vurgu metni, rota çizgisi | 5.63 |
  | Dosya | `#F4F5F7` | Alternatif bölüm zemini | — |
  | Çizgi | `#D3D8DF` / form sınırı `#7A8494` | Ayırıcı (dekoratif) / alan sınırı | 1.43 / 3.78 |

  *Neden bu duygu:* Lacivert, sertifika ve resmi belge mürekkebidir; ciddiyet verir. Altın, mühür ve "emanet edilen değerli şey" çağrışımı taşır, az kullanıldığı için anlamlı kalır. Plan §2.6'daki "lacivert + altın/kum" tarifine birebir uyar.
- **Tipografi:** Source Serif 4 (başlık, 600) + Source Sans 3 (gövde, 400/600). Aynı tasarım ailesinden geldikleri için birlikte uyumlu çalışırlar. Serif başlık "belge" hissini, sans gövde küçük ekranda okunurluğu taşır. Source Serif 4'ün optik boyut ekseni küçük başlıklarda harfleri otomatik kalınlaştırır.
- **Düzen mantığı:** Etiket ve değer satırları ("DARSLAR → Onlayn, jonli"), ince yatay çizgiler, 8 tabanlı boşluk. Orta yoğunluk: kart yerine çoğunlukla satır ve tablo. Masaüstünde 12 sütunlu grid; metin sola hizalı, en fazla ~65 karakter.
- **Hareket:** Neredeyse sabit. Yalnızca durum geçişleri (150–200 ms): hover, akordeon açılışı, menü. Kaydırmaya bağlı animasyon yok.
- **Görsel dil:** İnce çizgili ikonlar (tek set, tek kalınlık). Fotoğraf yok. Özgün rota diyagramı (Dars — Imtihon — Hujjatlar — Viza — Kampus). Haftalık rapor için "namuna" etiketli örnek ekran.
- **Risk:** Soğuk, bürokratik ya da devlet portalı gibi okunabilir. Bu, plan §0'daki "siyasi içerik yok" kuralıyla birlikte düşünüldüğünde önemli. *Önlem:* Arma, bayrak, resmi mühür benzeri öğe kullanılmaz. Sıcaklık metin tonundan ve altın vurgudan gelir.

### B · Yol haritası

- **Kavram:** Okuldan kampüse uzanan, durakları belli bir güzergâh haritası.
- **Renk stratejisi:** Petrol `#0E4D5A` (ana renk, başlık, düğme; 9.43) · mürekkep `#172326` (metin; 16.09) · okra `#C48A2C` (rota çizgisi, dekoratif) / `#835A12` (okra metin; 6.11) · sis `#EEF4F4` (zemin) · bağlantı `#0B6375` (6.87). *Neden:* Petrol sakin ve güven veren bir ton, lacivertten daha çağdaş. Okra yolculuk ve hareket çağrışımı yapar.
- **Tipografi:** Commissioner (başlık, 600) + Onest (gövde). İkisi de geometrik ve çağdaş sans.
- **Düzen mantığı:** Diyagram merkezli. Her sayfada süreç çizgisi, büyük yuvarlatılmış paneller, düşük yoğunluk.
- **Hareket:** Rota çizgisi görünür alana girdiğinde bir kez çizilir. Hareket azaltma tercihi olan kullanıcıda kapalıdır.
- **Görsel dil:** Harita ve güzergâh çizimleri, durak ikonları.
- **Risk:** Seyahat acentesi ya da girişim (SaaS) sitesi gibi okunabilir. Özgün çizim yükü yüksek. Okra rota çizgisi 2.99:1 ile anlam taşıyan grafikler için gereken 3:1'in altında, koyulaştırılması gerekir.

### C · Ölçülü editöryel

- **Kavram:** Bir ailenin oturup dikkatle okuyacağı, iyi yazılmış bir rehber.
- **Renk stratejisi:** Grafit `#23262B` (metin; 15.18) · ikincil `#5B6068` (6.33) · tek vurgu mürekkep mavisi `#2141A0` (bağlantı ve düğme; 9.02) · çizgi `#E1E3E8` · açık zemin `#F3F4F8`. *Neden:* Tek vurgu rengi dikkati içeriğe verir. Ama plan §2.6'daki sıcak vurgu rengi bu yönde yoktur.
- **Tipografi:** Literata (başlık, 600) + Source Sans 3 (gövde).
- **Düzen mantığı:** Tek sütun, büyük gövde metni, bol beyaz alan, az bileşen.
- **Hareket:** Yok denecek kadar az.
- **Görsel dil:** Görselsiz; tipografi ve boşluk taşır.
- **Risk:** Telegram'dan gelen, hızlı tarayan veli için fazla metin. Kurumsal değil blog gibi algılanabilir. Satış odaklı plan v2 tonuyla zayıf eşleşir.

---

## 3. Seçim: A · Kayıt defteri (B'nin rota diyagramıyla) · *Kreatif yönetmen*

| Ölçüt (prompt §4) | A | B | C |
|---|---|---|---|
| Güven | Güçlü: belge dili, doğrulanabilir bilgiler satır satır | Orta: dostane ama hafif | Orta: güven metinden gelir |
| Sadelik | Güçlü | Orta: çok sayıda panel ve çizim | Çok güçlü |
| Ciddiyet ve yurt dışı eğitimle bağ | Güçlü: sertifika, transkript, UCAS dosyası dünyası | Orta: yolculuk metaforu | Orta |
| Mobil okunabilirlik | Güçlü | Güçlü | Güçlü, ama uzun |
| Ailelerin algıladığı kurumsallık | Güçlü | Orta | Orta |
| Plan §2.6 renk tarifi | Uyar | Uyar | Sıcak vurgu yok |

**Gerekçe (hangi kullanıcı sorununu çözüyor):**

1. **Persona (a), ilk kez gelen veli:** Sorusu "güvenilir mi?". Etiket–değer satırları ("IMTIHON → Pearson tasdiqlagan markazda") en kritik bilgiyi taranabilir ve doğrulanabilir hâle getiriyor. Aşama 1'de gördüğümüz sektör sorunu (tanımsız sayılar) bu dilin tam tersi.
2. **Persona (c), karşılaştıran ziyaretçi:** Kayıt defteri dili tablolar için doğal. "Kim neyi yürütür" ve karşılaştırma tablosu (plan §5.4, §5.5) bu yönde ana bileşen olur, eklenti değil.
3. **Plan §5.1, hero'da süreç diyagramı istiyor:** B'nin en güçlü öğesi olan rota diyagramı A'ya alınıyor. Ama ince çizgi ve altın renkle, A'nın sade dilinde.
4. **Performans:** A'nın hareketsiz yapısı ve iki font ailesi, düşük segment Android ve 100 KB JavaScript bütçesine en uygun yön.

**Yasak liste kontrolü (prompt §5):**
- Krem + terracotta + serif kombinasyonu: Kullanılmıyor. Zemin beyaz, vurgu altın, başlık serif. Serif başlık tek başına yasak değil.
- Inter / Space Grotesk / Roboto: Kullanılmıyor.
- Her kartta aynı köşe ve gölge: A çoğunlukla kart değil satır kullanıyor. Köşe yuvarlaklığı üç seviyede kalacak (Aşama 3).
- 01/02/03 numaralandırma: Yalnızca 6 adımlı süreçte ve 5 adımlı sınav sürecinde.

---

## 4. Bu aşamada çıkan ve sonraki aşamalara aktarılan bulgular

| Bulgu | Aşama | Yapılacak |
|---|---|---|
| "A-Level" dar sütunda "A-" / "Level" olarak bölünüyor (C önizlemesi) | 3 ve 6 | Bölünmeyen tire (U+2011) ya da `white-space: nowrap` ile tek parça tutulur. "IGCSE + A-Level", "UCAT/IMAT" gibi terimler de aynı kuralla |
| Plan v2 hero başlığı uzun tire (—) ile kurulmuş. Prompt §8 uzun tireyle kurulan kıvrımlı cümleleri istemiyor | 5 | Başlık iki kısa cümleye bölünür. Örnek: "Maktabingizda oʻqishni davom ettiring. Pearson Edexcel International A-Level bilan orzuingizdagi universitetga yoʻl oching." |
| Mevcut kod Inter kullanıyor | 3 | Source Serif 4 + Source Sans 3; yalnızca kullanılan ağırlıklar, Latin + Latin genişletilmiş + Kiril |
| Karanlık mod | 3 | A'nın koyu varyantı ve ayrı kontrast tablosu |
| B'den alınan rota diyagramı | 3 | Bileşen: yatay (masaüstü) ve dikey (mobil) süreç göstergesi |
