# tasarım02 §C · Hero adım görselleri: üretim promptları

> **Güncelleme (tasarım06, 20 Ekim 2026):** Hero'da fotoğraf kullanılmıyor; her adımın cam/3D illüstrasyonu kodla çiziliyor (`src/components/hero/StepIllustration.tsx`). Aşağıdaki promptlar başka sayfalarda (Hakkımızda, ülke sayfaları vb.) görsel gerekirse referans olarak duruyor.

*20 Ekim 2026 · Görseller bu ortamda üretilemedi; aşağıdaki promptlarla üretilip aynı dosya adlarıyla konduğunda kod değişmeden çalışır.*

## Teknik şartlar (beşi için ortak)

- **Dosya:** `src/assets/hero/<ad>.webp` (PNG/JPEG de olur; uzantı değişirse `HeroStory.tsx` içindeki import satırı da değişir).
- **Boyut:** en az **1600 × 2000 px, dikey 4:5**. Hikâye çerçevesi dikey. Statik düzen ve mobil 4:3 / 5:4 kırpar; ana nesneyi ortada tutun.
- **Ağırlık:** WebP kalite ~78 ile 150–250 KB. Next.js ekran boyutuna göre küçültür.
- **Sol üst ve sol alt köşe sade olsun:** görselin solunda ilerleme çubuğu duruyor; kalabalık kenar dikkat dağıtır.
- **Renk:** lacivert (#101c2a) ve buz mavisi (#a8ccda) ağırlıklı, sıcak gün batımı vurgusu serbest. Logodaki "Λ" işareti en fazla bir küçük yerde.
- **Yasak:** gerçek üniversite logosu, arması, adı ya da tanınabilir tekil bina (Oxford Radcliffe Camera, Harvard Memorial Hall vb.). Plan v2: kurumla ilişki izlenimi verilmez. Pearson logosu da kullanılmaz (marka izni yok). Gerçek kişi yüzü yerine arkadan, yandan ya da bulanık figür tercih edilir (model izni).

## Promptlar

### 1 · Onlayn darslar → `step-lessons.webp`
> Vertical 4:5 photorealistic render. A focused teenage student seen from behind-the-shoulder at a bright, minimal desk, live online class on a laptop screen (teacher on video, soft glow). Around the student, floating translucent 3D education icons: an open book, a math formula card, a small globe, a lightbulb, gently glowing in icy blue (#a8ccda). Futuristic but warm and airy study room, large window with soft daylight, navy (#101c2a) accents. Shallow depth of field, clean composition, empty space on the left edge. No text, no brand logos.

### 2 · Pearson imtihoni → `step-exam.webp`
> Vertical 4:5 cinematic 3D render. A glowing holographic digital certificate and a circular achievement badge floating above a dark navy (#101c2a) desk surface, thin icy-blue (#a8ccda) light lines tracing a world map behind it, subtle particles, sense of global recognition and trust. Elegant, premium, calm. Certificate shows only abstract lines, no readable text, no real exam board logo. Deep navy gradient background, soft rim light.

### 3 · Universitetga hujjatlar → `step-documents.webp`
> Vertical 4:5 3D render. A cream envelope sealed with a gold wax seal flying forward in mid-air, slight motion blur, letter edge visible, symbolising an acceptance letter. Behind it, soft silhouettes of generic historic and modern university buildings (gothic towers, a dome, a glass faculty building) at golden hour, deliberately non-identifiable, in muted navy and icy blue tones. Hopeful, dreamy, clean sky on the left side. No text, no coats of arms, no real university names.

### 4 · Viza → `step-visa.webp`
> Vertical 4:5 stylised illustration mixed with photo-real passport. A dark navy passport lying open at the bottom; from its pages a thin glowing icy-blue (#a8ccda) flight path line rises in an arc with a small airplane at its tip. In the background a minimalist flat vector skyline of London and European landmarks (Big Ben, a bridge, a generic cathedral dome) in pale blue and white line art. Clean, modern, lots of negative space, soft sunrise gradient. No readable passport text, no national emblem.

### 5 · Kampus → `step-campus.webp`
> Vertical 4:5 photorealistic image. A lively green university campus in spring: lawns, trees, sunlight through leaves. A diverse group of four or five international students (seen from behind or three-quarter, faces not in sharp focus) walking together and looking ahead toward the buildings, backpacks and books, energetic and hopeful mood. Generic architecture, not a real identifiable university. Warm golden light, vivid greens, navy and icy-blue clothing accents. No logos, no text.

*Not:* "Açılış görseli" de `step-campus.webp`'dir (hikâye kampüsle başlar ve biter).

## Animasyon seçenekleri (zarf uçuşu, uçak rotası)

Bu sürüm, durağan hissi kırmak için aktif görselde yavaş yakınlaşma (Ken Burns) kullanıyor. Gerçek hareket isteniyorsa iki yol var:

1. **Kısa döngü video** (3–5 sn, sessiz, WebM + MP4, ≤ 1 MB): adım 3 ve 4 için. Yalnızca hikâye modunda (masaüstü) yüklenir, mobil veri harcamaz. `prefers-reduced-motion` açıkken ilk kare gösterilir.
2. **Katmanlı görsel + CSS/SVG:** arka plan ayrı, zarf ya da uçak ayrı transparan PNG. Kod içinde yörünge animasyonu yapılır, dosya küçük kalır.

Hangisi seçilirse dosyalar geldiğinde entegre edilir.
