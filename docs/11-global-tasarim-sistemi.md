# Global tasarım sistemi: etkileşimli buzlu cam

*22 Ekim 2026 · Ana sayfadaki tasarım01–09 dilinin tüm sayfalara genellenmesi. Bundan sonra yapılan her sayfa ve bileşen bu kurallara uyar.*

## 1. Kurallar

| # | Kural | Uygulama |
|---|---|---|
| 1 | **İçerik cam panelde.** Bloklar, tablolar, formlar ve listeler yarı saydam, 12–20 px bulanık, ince parlak kenarlı panellerde durur. Düz, katı zeminli kutu kullanılmaz. | `glass-card` (etkileşimli kart), `glass` (durağan panel), `glass-strong` (öne çıkan panel: CTA, form) |
| 2 | **Zeminde ışık hareket eder.** Her bölümün altında çok yavaş süzülen pastel lekeler bulunur; cam bunu bulanık kırar. | `GlassSection` (içinde `HeroBackdrop`). Art arda gelen bölümler `fade` ile dikişsiz birleşir |
| 3 | **Hiçbir öğe durağan değil.** Kart, düğme, bağlantı ve tablo satırı hover'da 5 px kalkar veya %2 büyür. Kenar neon yanar, içindeki ikon tepki verir. | `glass-card` (+ ikona `ds-icon`), `glow-hover`, `buttonClass('glow' \| 'glass')` |
| 4 | **Geçişler yumuşak.** 300 ms, `ease-in-out`. | `--dur-ui`. `transition: all` yerine yalnızca `transform`, `box-shadow` ve `border-color` geçer, böylece düzen kaymaz |
| 5 | **Kaydırınca belirme.** Uzun metin ve adımlar görünüme girince aşağıdan süzülür. Sıralı giriş için `style={{ '--reveal-delay': '120ms' }}` verilir. | `reveal` sınıfı (layout'taki `RevealObserver`) |
| 6 | **Hiyerarşi.** Metin sola yaslıdır. Eylem çağrısı ortalanmış, vurgulu cam panelde durur. Uygun yerde asimetrik düzen kullanılır (ör. 7/5 sütun, kayık kartlar, S-eğrisi). | `GlassSection align="left"` varsayılandır. `center` yalnızca kısa vitrin başlıklarında kullanılır |
| 7 | **Okunurluk.** Cam üzerindeki metin `ink`/`ink-2` ile ≥ 4.5:1 kontrastta kalır. Başlıklarda hafif parlama vardır. | `[text-shadow:0_0_32px_var(--glass-border)]` (GlassSection başlığında hazır) |
| 8 | **Görseller.** Stok fotoğraf kullanılmaz. Görseller kodla çizilir: 3D cam karo, vektör ikon, soyut degrade. | `StepIllustration`, `GuideCards` kapakları ve `CountryIcons` örnek alınır |

## 2. Erişilebilirlik ve performans sınırları

Bunlar tasarım kurallarının önüne geçer; çatışma olursa bu bölüm kazanır.

- **Tablolar.** Klasik tablo görünümü kalkar, ancak anlam korunur. Gerçek `<table>` ya da ARIA `table/row/cell` rolleri cam kartların içinde kalır (`CompareGrid` örneği). Ekran okuyucu tabloyu yine tablo olarak duyar.
- **Hareketi azalt.** `prefers-reduced-motion` açıkken hover'daki kalkma ve büyüme, `reveal` gizlemesi ve zemin animasyonları kapanır; içerik hemen görünür.
- **JS yoksa** `reveal` içerik gizlenmez: gizleme yalnızca `html.js` altında uygulanır, bu sınıfı ThemeScript ekler.
- **Klavye.** Hover'da olan her şey `:focus-within`/`:focus-visible` ile de olur. Odak halkası kaldırılmaz.
- **Dokunmatik.** Hover efektleri yalnızca `@media (hover: hover)` cihazlarda çalışır; mobilde "yapışık hover" olmaz.
- **İlk ekran.** Sayfanın ilk ekranındaki başlığa ve en büyük öğeye (LCP) `reveal` verilmez. Hızı ve CLS 0'ı korur.
- **Bulanıklık maliyeti.** İç içe cam (cam içinde cam) en fazla 2 seviye olur. Uzun listelerde her satıra değil, kapsayıcıya `backdrop-filter` verilir.

## 3. Token'lar (`src/styles/tokens.css`)

| Token | Değer | Not |
|---|---|---|
| `--ds-neon` | `--rm-neon` (açık `#1497a6`, koyu `#4fd8e0`: turkuaz) | Hover kenarı, ikon vurgusu |
| `--ds-glow` | `--rm-neon-glow` | Dış parlama |
| `--ds-ring` | 1 px neon kenar + 28 px parlama | Kart ve düğme hover gölgesi |
| `--ds-lift` | `-5px` | Hover'da kalkma |
| `--dur-ui` | `300ms` | Etkileşim geçişi |

Cam yüzey token'ları (`--glass-*`, `--glass-strong-*`, `--pastel-1..4`) ve koyu tema karşılıkları daha önce tanımlandı (docs/09). Yeni sayfa bileşenlerinde ham `rgba` değil, bu token'lar kullanılır.

## 4. Yapı taşları

- **`GlassSection`** (`src/components/ui/GlassSection.tsx`): bölüm kabı. Hareketli zemin, parlamalı eyebrow/başlık/giriş ve `reveal` başlığı içerir.
- **`glass-card`**: tıklanabilir ya da okunacak kart.
- **`glow-hover`**: kart olmayan etkileşimli öğe (hap bağlantı, rozet, satır).
- **`buttonClass('glow')` / `buttonClass('glass')`**: birincil dolu parlayan düğme ve ikincil cam hap düğme. `ConsultationBand` bunları kullanır.
- **`reveal`**: kaydırınca süzülerek gelme.
- **Mevcut özel bileşenler:** `Roadmap` (adımlar), `CompareGrid` (karşılaştırma), `Accordion` (`glass-faq`), `PriceCta`, `GuideCards`, `CountryCards`.

## 5. Durum (22 Ekim 2026)

Sitenin tüm sayfaları bu sisteme taşındı:

| Sayfa | Nasıl |
|---|---|
| Tüm iç sayfa başlıkları | `PageHeader`: hareketli zemin + rotalar, cam breadcrumb, parlamalı H1, sağda sayfanın konusunu gösteren 3D cam karo (`icon`) |
| Blok sayfaları (Dasturlar, 8 program, Qanday ishlaymiz, Narxlar, 6 davlat, Biz haqimizda, Hamkorlar) | `Blocks` → her blok `GlassSection`; kartlar `glass-card` (+ program simgesi), tablo/ledger/liste/metin cam panelde, adımlar parlayan numaralı cam kartlar, finder numaralı cam kartlar + cam kapsül seçenekler. Başlıksız blok önceki bölümün devamı (küçük üst boşluk) |
| Sınav ve haftalık program blokları | `ExamBlock` artık her yerde ana sayfadaki cam kart; `WeeklyBlock` cam bölüm + rapor cam kartı |
| Davlatlar | Ana sayfanın `CountryCards` cam kartları (başlıksız) |
| Maqolalar | `GuideCardView` kartları (illüstrasyonlu kapak), cam arama kutusu ve kategori kapsülleri |
| Makale okuma sayfası (görev 15) | Aşağıda |
| Savollar | Mevcut `glass-faq` akordeon + cam arama/filtre |
| Aloqa | Form `glass-strong` panelde, yan bilgiler `glass-card`; form alanları cam (`fields.tsx`), gönder düğmesi `glow` |
| Yasal sayfalar | Tek, neredeyse opak cam metin paneli |
| Rahmat, 404, 500 | Ortalanmış `glass-strong` panel, `glow`/`glass` düğmeler |

## 6. Makale okuma şablonu (görev 15)

- **Okuma kartı:** `glass-article` (yeni token `--article-bg`: açıkta %93 beyaz, koyuda %92 lacivert). Uzun metin için bilerek daha opak; gövde `ink`, 17–18 px, satır aralığı 1.75.
- **Üst illüstrasyon:** `ArticleArt` (`src/components/guides/ArticleArt.tsx`) kodla çizilir: `programs` (IGCSE → A-Level → universitet basamakları), `countries` (Toshkentdan 6 davlatga rotalar; `CountryIcons`), `exams` (IELTS/TOEFL ve SAT kesişimi). Aynı çizim kart kapağında da kullanılır. Makale ön bilgisinde `art:` alanıyla seçilir.
- **Asimetrik düzen:** solda okuma kartı, sağda (lg+) yapışkan içindekiler (`ArticleToc`, okunan bölüm neon çizgiyle işaretli) ve mini konsultatsiya kartı.
- **Kart içi sıra:** "Qisqa javob" özeti → gövde (`##` başlıklar neon sol çizgili, otomatik `bolim-n` id) → ilgili sayfalar (`related:`, cam kapsül bağlantılar) → kaynaklar.
- **Diğer:** üstte okuma ilerleme çubuğu (`ReadingProgress`); başlık etiketinde kategori ve okuma süresi.
- **Yeni ön bilgi alanları:** `art`, `related` (`Etiket | /programs/a-level`, dil öneki yok). Yeni kategori: `programs` (Dasturlar).
- **Makaleler:** `a-level-igcse`, `destinations-guide`, `exams-guide`, her biri uz/ru/en. Sitedeki mevcut bilgilerle uyumlu hâle getirildi; kesin sonuç vaadi yok (ör. "doğrudan yerleştirir" yerine "doğrudan başvuru imkânı; kararı üniversite verir").
- **Hata düzeltmesi:** simge degradeleri `userSpaceOnUse` (0–24) oldu. `objectBoundingBox` düz çizgilerde boyanmıyordu: Landmark sütunları ve kart/başlık karolarındaki bazı simge çizgileri görünmüyordu.

## 7. Renk paleti: turkuaz vurgu (görev 16, 24 Ekim 2026)

**Kural:** Işık ve vurgu renklerinde mor/violet/lavanta, pembe ve şeftali **kullanılmaz** (eğitim yerine "AI/Web3" havası veriyordu). Vurgu ve parlama, logoyla ve tablolardaki yeşil tiklerle uyumlu turkuaz/camgöbeği ailesindendir. Lacivert/gece mavisi zemin, logo renkleri, bağlantı mavisi ve odak halkası değişmez.

| Token | Açık | Koyu | Kullanım |
|---|---|---|---|
| `--c-accent` | `#0e6b75` (6.2:1) | `#7fdadf` (10.8:1) | Etiket, vurgu metni |
| `--c-accent-line` | `#2b8f99` | `#4fb8c0` | Rota çizgisi, anlamlı grafik (≥ 3:1) |
| `--c-accent-soft` | `#e3f4f5` | `#12303a` | Not zemini, seçili seçenek |
| `--rm-neon` / `--ds-neon` | `#1497a6` | `#4fd8e0` | Hover kenarı, neon çizgi, ikon |
| `--rm-neon-glow` / `--ds-glow` | `rgb(20 151 166 / .5)` | `rgb(79 216 224 / .55)` | Dış parlama, düğme gölgesi |
| `--c-action` (koyu) | — (lacivert `#13202f`) | `#7fdadf` | Birincil düğme |
| `--pastel-1…4` | `#c9e0ec` buz · `#cdeef0` aqua · `#d3eee4` nane · `#d8eff5` gök | `#1b3a52` gece · `#0f3a44` koyu turkuaz · `#14393a` · `#12344a` okyanus | Arka plan ışık kümeleri, kapak/illüstrasyon degradeleri |
| `--ink-grad-*` | `#2b8f99 → #13202f` | `#a5ecef → #4fb8c0` | 3D karo simgeleri |

Renkler yalnızca `tokens.css`'te değişir; bileşenler token kullandığı için (`HeroBackdrop`, `PriceCta` dönen ışık, kapaklar, `ArticleArt`, hover'lar) kod değişikliği gerekmedi. İstisna: ülke kartlarındaki bayrak renkleri (gerçek bayraklar) korunur.

## 8. Mobil açılış ekranı (24 Ekim 2026)

Yalnızca < 768 px (`max-md:` / `md:hidden`); tablet ve masaüstü değişmedi.

- **Kısa başlık ve tek cümle:** `content/*/home.json → hero.mobileTitle / hero.mobileSubtitle`. Uzun başlık ve paragraf mobilde `display:none`, ekran okuyucu yalnızca görünen başlığı okur. Uzbekçe alt metinde "kiring" yerine "hujjat topshiring" yazıldı: kabul kararını universitet verir, söz verilmez.
- **"Universitetgacha 5 qadam" dikey listesi** (hero `RouteDiagram`) mobilde gizli. 6 adımlı yol haritası (`Roadmap`) ve Qanday ishlaymiz sayfası kalır.
- **3D illüstrasyon paneli** (yüzen cam kare + kep ikonu): 1024 px altında, yani metnin altına düştüğü her düzende kaldırıldı. Geniş ekranda metnin yanında kalır ve kaydırma hikâyesinin adım görsellerini taşır.
- **"Bepul konsultatsiyaga yoziling":** mobilde tam genişlik, 56 px yükseklik, yuvarlak, `--ds-glow` gölgeli. Kontrast lacivert/beyaz 16.5:1, koyu temada turkuaz/lacivert 10.8:1. İkincil düğme de tam genişlik.
