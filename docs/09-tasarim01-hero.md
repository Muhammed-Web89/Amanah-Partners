# tasarım01.md · Adım 1: Global cam dili + Hero / kaydırma hikâyesi

*20 Ekim 2026 · Yalnızca bu adım uygulandı; sonraki bölüm için komut bekleniyor (tasarım01 "Komut").*

## Yapılanlar

| Talep | Uygulama | Dosya |
|---|---|---|
| §1 Glassmorfizm, okunabilirlik önce | `glass` ve `glass-bar` yardımcıları: yarı saydam zemin, `backdrop-filter: blur`, ince açık kenar, yumuşak gölge. Desteklemeyen tarayıcıda düz zemin | `src/styles/globals.css`, `tokens.css` (`--glass-*`) |
| §1 Sabit buzlu cam üst menü | `sticky` + `glass-bar` (açık %86 / koyu %84 opak) | `Header.tsx` |
| §1 Buzlu cam alt bilgi | Hareketsiz pastel zemin üzerinde cam panel | `Footer.tsx` |
| §2A Hareketli pastel arka plan | 3 pastel leke (36–52 sn döngü, yalnızca `transform`) + soluk süzülen eğitim simgeleri ve logo işareti | `src/components/hero/HeroBackdrop.tsx` |
| §2B Sol: cam metin paneli | Başlık, açıklama, düğmeler cam kart içinde | `HeroStory.tsx`, `app/[locale]/page.tsx` |
| §2B Sağ: görsel + ışık hüzmesi + "Yoʻlingiz" | Fotoğraf arkasında bulanık mavi hüzme; kutu açılışta aşağıdan süzülür (cam) | `HeroStory.tsx`, `RouteDiagram.tsx` |
| §2C-1 Metin paneli yukarı kayıp kaybolur | Kaydırmanın ilk %14'ünde | `HeroStory.tsx` (`FADE_END`) |
| §2C-2 Sağ alan sabitlenir | Sahne üst menünün altına yapışır; hikâye 3,2 ekran boyu sürer | `SCROLL_SCREENS` |
| §2C-3 Adımlar sırayla aydınlanır | Aktif adım vurgulu (`aria-current="step"`), öncekiler dolu nokta; sol tarafta büyük "02 / 05" ve adım adı | `RouteDiagram.tsx` (`active`) |
| §2C-4 Görsel cross-fade | 1 sn opaklık + hafif ölçek geçişi | `src/assets/hero/*.webp` |

Görsel eşleşmesi (klasördeki PNG'ler, WebP'ye sıkıştırıldı ~140–240 KB): açılış ve Kampus = `IMG_7782` (kampüs), Onlayn darslar = `IMG_7784` (laptop), Pearson imtihoni = `IMG_7783` (kitaplar, Londra), Universitetga hujjatlar = `IMG_7785` (pasaport, evrak), Viza = `IMG_7781` (havalimanı).

## Bilinçli sınırlar

- **Hikâye modu yalnızca** ≥ 1024 px genişlik, ≥ 672 px yükseklik, "hareketi azalt" kapalı ve metin paneli ekrana sığıyorsa açılır. Mobilde, JS kapalıyken ve hareket azaltmada aynı içerik statik düzende (panel → görsel → yol kutusu). Mobil veri: adım görselleri yalnızca hikâye modunda indirilir.
- **Dekupe (arka planı transparan) öğrenci fotoğrafı yok**: verilen görseller arka planlı. Transparan PNG gelirse aynı yere konur; ışık hüzmesi hazır.
- **Kampüs videosu yok**: dosya verilmedi; gelirse son adımda `<video muted loop playsInline>` ile değiştirilebilir (mobil veri nedeniyle yalnızca masaüstünde önerilir).
- Görseller markalı ve yapay üretim görünümünde; Londra ve gotik kampüs belirli bir üniversiteyle ilişki iddiası taşımıyor. Yayın öncesi ekip onayı önerilir.

## Ölçüm (üretim derlemesi, `/uz`)

- Lighthouse mobil: performans 93, erişilebilirlik 100, en iyi uygulamalar 100, CLS 0. Masaüstü: performans 100, LCP 0,7 sn.
- Cam üzerindeki ikincil metin en kötü durumda (siyah/beyaz fotoğraf alanı) ≥ 5,3:1.
- Playwright: 126 / 126.

## Revizyon · tasarım02 (20 Ekim 2026)

| Talep | Uygulama |
|---|---|
| §A Sol metin güçlü ve dikey ortalı | Panel kaybolunca sol sütunda cam kart: büyük "01 / 05", adım başlığı ve 2–3 cümlelik açıklama (`content/*/home.json → hero.routeSteps`, üç dil). Beş kart üst üste, yalnızca aktif olan görünür; ekran okuyucu hepsini okur |
| §B "Yoʻlingiz" görselin üstünden ayrıldı | Metin ile görsel arasında bağımsız, ince uzun cam dikey ilerleme çubuğu (`StoryStepper.tsx`): dolgu çizgisi aktif adıma kadar uzar; panel kaybolunca aşağıdan süzülür |
| Grid | Hikâye: `1fr · 11–12rem · 24–27rem` üç sütun, tümü `items-center`. Statik düzende sol sütun aynı genişlikte (sığma ölçümü tutarlı) |
| §C Görsel konseptleri | Promptlar ve dosya şartları: docs/10. Mevcut görseller yer tutucu; durağan hissi azaltmak için aktif görselde 14 sn yavaş yakınlaşma |
| Statik düzen | Mobil: kart → görsel → yol kutusu (açıklamalarla). Geniş ekran + "hareketi azalt": görselin altında beş adımlık yatay cam şerit |

Hikâye modu artık 1024×768, 1280×800, 1366×768, 1440×900 ve 1920×1080'de üç dilde açılıyor (başlık masaüstünde 30–40 px).

## tasarım03 · "Nega aynan A-Level?" (20 Ekim 2026)

| Talep | Uygulama |
|---|---|
| §A Pastel zemin sürer | Güven şeridi + bölüm, hero ile aynı hareketli zeminde (`HeroBackdrop fade="both" icons={false}`); hero zemini alt kenarda, bu zemin iki kenarda düz `paper-2`'ye erir, dikiş görünmez |
| §B Ortalı, büyük, kalın başlık + parlama | 32–52 px kalın başlık; arkasında bulanık beyaz/mavi ışık ve yumuşak `text-shadow` |
| §C 2×2 cam kart | `md:grid-cols-2`; `glass` (yarı saydam, `blur(20px)`, ince açık kenar, gölge) |
| §C Hover | `translateY(-5px)` + kenar buz mavisine döner ve hafif dış parlama; ikon %10 büyür. "Hareketi azalt"ta geçişler kapanır |
| §D İkonlar | Pastel degrade cam karo + neon parlamalı Lucide ikon + köşede cam rozet: hedef + çapraz ok · kum saati + cüzdan · pusula + rota · yapboz + bloklar |

Dosya: `src/components/home/WhyALevel.tsx`. Programlar sayfasındaki aynı içerik bloğu (`Blocks.tsx → why`) eski düz düzende; istenirse aynı bileşene geçirilir.

## tasarım04 · "Kim nimani olib boradi?" (20 Ekim 2026)

| Talep | Uygulama |
|---|---|
| §A Kareli defter zemini | `bg-notebook`: sabit 32 px ince ızgara (`--grid-line`, açık mavi-gri), üst/alt kenarda kaybolur; arkasından iki pastel ışık kümesi 36–44 sn döngüyle geçer |
| §B Ortalı başlık + parlama | Üst başlık ve 30–48 px kalın başlık ortalı, `text-shadow` ile hafif parlama |
| §C Tablo yerine yatay cam paneller | `<table>` kaldırıldı; `<ul>` + CSS Grid. Panel: `glass-thin` (açıkta `rgba(255,255,255,0.1)`, `blur(16px)`), ızgara camın içinden bulanık görünür |
| §C Üç sütun | Sol: ikonlu hizmet adı (h3) · Orta: "kim yürütür" rozeti (Amanah için logo işareti, merkezler için bina ikonu; teyitli ayrıntı rozetin altında) · Sağ: nasıl çalışır. Mobilde alt alta, sütun adlarıyla |
| §D Hover | Panel `scale(1.02)`, cam aydınlanır (%42), kenar neon mavi parlar; diğer paneller %70 opaklığa iner. Yalnızca fareli cihazlarda (`hover: hover`); "hareketi azalt"ta geçiş yok |

Erişilebilirlik: sütun adları geniş ekranda bir kez görünür, her panelde ekran okuyucu için tekrar edilir. Dosya: `src/components/home/ServiceModel.tsx`.

## tasarım05 · "Nega aynan Amanah Partners?" (20 Ekim 2026)

| Talep | Uygulama |
|---|---|
| §A Ortalı başlık + açıklama, parlama | Üst başlık, 30–48 px kalın başlık ve açıklama ortalı; `text-shadow` parlaması. Zemin: hareketli pastel (`HeroBackdrop fade="both"`) |
| §B `<table>` yok, CSS Grid | 4 sütunlu grid; her satır `grid-cols-subgrid`. Ekran okuyucu için `role="table/row/columnheader/rowheader/cell"` korunur |
| §C Kahraman sütun | Amanah sütunu ayrı, satırların arkasında duran cam kart: `scale(1.05)` ile dışa taşar, neon mavi kenar parlaması, üstte buz mavisi degrade zemin; başlıkta logo işareti |
| §D Rakip sütunlar | Kenarlıksız çok şeffaf cam zemin (`opacity: .7`), hücreler soluk |
| §E İşaretler | Amanah: beyaz daire içinde parlayan yeşil tik (`--check`, açıkta ≥ 3:1). Rakipler: gri tik (var) / soluk gri çizgi (yok); "farq qiladi" soluk italik. Ekran okuyucu: "Ha / Yoʻq" |
| §E Hover | Satır boydan boya aydınlanır (fareli cihazlarda) |
| Mobil | Her özellik bir cam kart: başlık + 3 hücre (kurum adı + işaret), Amanah hücresi vurgulu |

Rakip işaretinin anlamı korunur: rakip "var" ise gri tik gösterilir (çizgi/çarpı yalnızca "yok" için) — karşılaştırma yanıltıcı olmasın. Dosya: `src/components/home/CompareGrid.tsx`.

## tasarım06 · Hero adımları: fotoğraf yerine illüstrasyon (20 Ekim 2026)

| Talep | Uygulama |
|---|---|
| §A Fotoğraflar kaldırıldı | `src/assets/hero/` silindi; hero'da hiç fotoğraf indirilmiyor |
| §A Cam/3D illüstrasyonlar | `StepIllustration.tsx`: perspektifle eğik, kalınlığı olan degrade cam karo + degrade çizgili ana ikon + süzülen üç cam çip. Sahneler: açılış (kep, dünya, kitap) · dersler (ekran, kitap, formül) · sınav (rozet, sertifika, kalkan) · belgeler (zarf + altın mühür, belge, üniversite) · vize (pasaport + kesik çizgili uçuş rotası, damga, uçak, konum) · kampüs (üniversite, kep, öğrenciler, ağaçlar) |
| §B Belirgin cam | Adım metin kartı, ilerleme çubuğu ve illüstrasyon sahnesi `glass-strong`: degrade dolgu, parlak üst kenar, `blur(28px)`, derin gölge |
| §B Seyahat + eğitim arka planı | `HeroBackdrop travel`: soluk dünya meridyenleri, 40–60 sn'de akan kesik çizgili uçuş rotaları, süzülen uçak/kep/kitap simgeleri; pastel lekeler sürüyor |

Statik düzende (mobil, "hareketi azalt") açılış sahnesi gösterilir. Hepsi dekoratif (`aria-hidden`); anlamı adım metni taşır.
