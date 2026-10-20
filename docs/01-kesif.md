# Aşama 1: Keşif

*19 Ekim 2026 · Girdi: `amanah-partners-web-sitesi-plani.md` (v2) ve `amanah-partners-web-tasarim-promptu.md`*

Bu aşamada kod ve tasarım üretilmedi. Aşama 2'ye (tasarım yönü) geçmeden önce bölüm 6'daki kararlar gerekiyor.

---

## 1. Referans analizi · *UX araştırmacısı*

Yöntem: Her site 19 Ekim 2026'da açıldı ve ana sayfası okundu. Görsel değerlendirme metin çıktısına dayanır; renk ve tipografi yorumu yapılmadı.

Açılamayan ve bu yüzden listeye **alınmayan** siteler: kingsinterhigh.co.uk (403), crimsoneducation.org (429), wolseyhall.com ve minervavirtual.academy (alan adı çözülmedi), cardiff.ac.uk (403), qmul.ac.uk Özbekistan sayfası (404), britishcouncil.uz (zaman aşımı). Taşkent'te A-Level odaklı yerel bir danışmanlık sitesi aramada bulunamadı.

| # | Site | Ne işe yarıyor | Hangi güveni veriyor | Neyi yanlış yapıyor | Amanah için ders |
|---|---|---|---|---|---|
| 1 | **faydalanacademy.com** (iş modeli kardeşi) | Okulu bırakmadan IAL; ders Faydalan'da, sınav ABC Horizon'da | Merkez no. 91667, Pearson logosu, rol ayrımı (ders / sınav / başvuru), karşılaştırma tablosu | 91667'nin kime ait olduğu ana sayfada belirsiz; form üç kez tekrar; 01–06 numaralandırma her yerde; "Dersler online" ile "sınav merkezde" ancak SSS'te açılıyor | Rol ayrımı tablosu güçlü, alınmalı. Merkez numarası **tüzel kişiyle birlikte** yazılmalı. "Sınav online değil" bilgisi ilk ekrana yakın olmalı |
| 2 | **cambrilearn.com** | Online okul, Pearson Edexcel dahil altı yol | Akreditasyon adları, 390 bağımsız yorum, üniversite logoları + "onay anlamına gelmez" notu | Online hazırlık ile fiziksel sınavın ilişkisi zayıf anlatılıyor; tanımsız "%98 kabul"; tarihli indirim afişiyle baskı | Online ders → fiziksel sınav köprüsü bizim en kritik açıklamamız; burada boşluk var. Tanımsız yüzde kullanılmaz |
| 3 | **qualifications.pearson.com** (IAL sayfası) | Resmi IAL tanımı | Kaynağın kendisi: modüler yapı, dönemler, tanınırlık | "Cash-in", ünite kodları veli için anlaşılmaz; sayfada doldurulmamış şablon kalıntıları var | Modülerliği velinin diliyle anlatmalıyız ("tüm yılı değil, bir üniteyi tekrar"). Kaynak bağlantısı olarak kullanılır |
| 4 | **wiut.uz** (Taşkent) | Yerel uluslararası üniversite; foundation ve A-Level de sunuyor | 25 yıl, Westminster derecesi, mezun hikâyeleri, UZ/RU dil seçeneği | ~80 bağlantılı menü; ilk ekranı etkinlikler kaplıyor; karışık UZ/EN etiketler | Velinin tanıdığı yerel referans. Foundation'ı yerelde de sunuyor; "foundation yılı yok" mesajı bu alternatife karşı konumlanmalı. Menü yoğunluğundan kaçın |
| 5 | **everstudy.uz** (Özbekistan) | Yurt dışı eğitim danışmanlığı | Sertifika numaraları (QEAC, ITAC), ekip, İngilizce/Rusça/Özbekçe | Yalnızca İngilizce site, sayısız "yüksek başarı" iddiası, hizmetler açıklamasız, logo duvarı tekrarlı | Doğrudan rakip tipi. Özbekçe/Rusça içerik ve **açıklamalı hizmet** bizi ayırır. Doğrulanabilir numara (91667 gibi) iyi bir güven aracı |
| 6 | **kaplanpathways.com** | Pathway (foundation) programları | Üniversite logoları, isimli öğrenci yorumları, footer'da şirket no., öğrenci koruma planı, şikâyet sayfası | "Foundation" kelimesini hiç kullanmıyor; süre/ücret/koşul yok; boş alt metinler | Footer'daki yasal ve şikâyet bağlantıları güven veriyor; "Resmi hesaplar" sayfamız aynı işi görür. Terimler sözlükle sabitlenmeli |
| 7 | **applyboard.com** | Küresel başvuru platformu | Büyük sayılar, isimli yorumlar | Aynı sayfada çelişen sayılar (1.5M+ / 1M+); tanımsız "%95 başarı" | Sayı kullanırsak tek kaynak, tek değer, her yerde aynı. Çelişen sayı güveni hemen yıkar |
| 8 | **ed.ac.uk** (Özbekistan sayfası) | Özbek attestatıyla giriş koşulu | Resmi kaynak | "Above national qualification" ifadesi belirsiz; A-Level'ın Özbek öğrenci için gerçekçi olup olmadığını söylemiyor | Planın ana satış noktasının ("attestat → foundation, A-Level → doğrudan") kaynağı. Bu boşluğu biz sade dille dolduruyoruz |

**Ortak çıkarımlar**

1. Sektörde en sık güven kırıcı unsur **tanımsız sayılar ve yüzdeler**. Bizim fark yaratma alanımız doğrulanabilir somut bilgi (merkez numarası, sınav dönemleri, resmi kaynak bağlantısı).
2. "Online ders, fiziksel sınav" ayrımı referansların hiçbirinde ilk ekranda net değil. Bunu ana sayfada tek cümleyle çözmek bir farklılaşma.
3. Yerel siteler ya yalnızca İngilizce ya da karışık dilli. Tutarlı Özbekçe ana metin başlı başına bir güven unsuru.
4. Kaçınılacaklar: tekrarlanan formlar, logo duvarları, yoğun menüler, tarihli indirim baskısı.

---

## 2. Kullanıcı yolculukları · *UX araştırmacısı*

> **Varsayım:** Gerçek kullanıcı görüşmesi yapılmadı. Personalar plan dosyasındaki kitle tanımından türetildi ve ilk yayından sonraki iki haftalık ölçümle (plan §19, Kapı 3) doğrulanmalıdır.

### (a) Ebeveyn, Telegram'dan ilk kez geliyor

- **Bağlam:** Bir Telegram grubunda ya da kanalda paylaşılan bağlantı. Telegram içi tarayıcı, telefon, büyük olasılıkla Özbekçe, belki Rusça.
- **İlk 10 saniyede arar:** Bu ne? Çocuğuma uygun mu (yaş)? Okulunu bırakması gerekiyor mu? Güvenilir mi?
- **Durduğu soru:** "Fiyat ne kadar?" Rakam yok, yerine "ücretsiz görüşmede" yazıyor. Gerekçe görmezse burada şüphelenir.
- **Vazgeçme noktası:** Formun uzun görünmesi (plan §13.1'de 10 alan); sayfanın yavaş açılması; "garanti" kokan bir dil (güvensizlik) ya da tersine çok belirsiz bir dil.
- **Tasarım sonucu:** İlk ekranda kime / ne / okul devam ediyor üçlüsü. Fiyat bloğunda "neden tek fiyat yok" gerekçesi. Telegram düğmesi her an erişilebilir. Bu kişi için Telegram'a yazmak, formdan daha kolay bir ilk adım.

### (b) 15 yaşında öğrenci, kararı ailesiyle veriyor

- **Bağlam:** Kendi telefonu; İngilizce ya da Rusça sürümü açabilir; bağlantıyı ailesine iletecek.
- **İlk 10 saniyede arar:** Hangi derslerle hangi bölüme gidilir? Ne kadar yük getirir? Okul + A-Level birlikte nasıl olur?
- **Durduğu soru:** Haftalık yük. Plan §8'de saatler `[KARAR]`; bilgi yoksa bölüm boş kalmamalı, gizlenmelidir.
- **Vazgeçme noktası:** Formun "veli adı ve telefonu" alanı. Öğrenci ailesine sormadan dolduramaz ve çıkar.
- **Tasarım sonucu:** Ders rotaları (mühendislik / tıp / işletme / hukuk) görsel ve taranabilir olmalı. Her sayfada **"Bu sayfayı velinize gönderin"** paylaşım bağlantısı (Telegram paylaşımı). Formda öğrenci yolu kısa tutulur; veli alanı 18 yaş altında açılır, ama "veliniz sonra ekleyebilir" seçeneği değerlendirilir `[KARAR]`.

### (c) Karşılaştırmak için geri dönen ziyaretçi

- **Bağlam:** Başka bir danışmanlıkla görüşmüş; masaüstü ya da telefon; hangi sayfayı hatırladığını arıyor.
- **İlk 10 saniyede arar:** Somut farklar. Kim neyi yürütüyor? Sınav nerede? Sözleşme ve iade koşulları?
- **Durduğu soru:** "Bu iddia doğru mu?" Kaynak, merkez numarası, resmi hesap listesi.
- **Vazgeçme noktası:** Aradığı bilgiyi menüde bulamaması; yasal sayfaların "taslak" görünmesi.
- **Tasarım sonucu:** Karşılaştırma tablosu (plan §5.5) ve "Kim neyi yürütür" tablosu (§5.4). Ülke sayfalarında kaynak ve "son güncelleme" görünür. SSS'te arama. Footer'da resmi hesaplar ve sözleşme özeti.

---

## 3. İçerik envanteri · *UX araştırmacısı + metin yazarı*

Kaynak: plan v2. **Z** = zorunlu bölüm, **O** = isteğe bağlı. İşaretli alanlar canlıda gizlenir (plan v2 "İşaretler").

| Sayfa | Zorunlu bölümler | İsteğe bağlı | Bekleyen |
|---|---|---|---|
| **Ana sayfa** (§5) | Hero + güven şeridi, Neden A-Level, Kime uygun, Kim neyi yürütür, Nasıl çalışıyoruz özeti, Sınavlar nerede, Hedef ülkeler, Uygun fiyat, Son çağrı | Neden Amanah (karşılaştırma), Ekip ve tecrübe, SSS önizleme, Son yazılar | Üniversite listesi `[TEYİT 1]`; Özbekistan merkezleri `[TEYİT 3]`; Faydalan adı `[TEYİT 1]` |
| **Programlar** (§6.1) | Giriş, iki ana program kartı, karşılaştırma tablosu | Destek programları kartları, "Hangi yol bana uygun?" | BTEC `[TEYİT 6]` |
| **A-Level** (§6.2) | Program nedir, Neden A-Level, ders rotaları, sınav planı, sınav nerede, sonraki adım, CTA | Haftalık düzen (§8) | Ders listesi `[TEYİT 5]`; haftalık saatler `[KARAR 5]` |
| **IGCSE + A-Level** (§6.3) | Yol, kimler için, sınav dönemleri (Kasım, Mayıs–Haziran), IGCSE'nin yeri, geçiş, CTA | Ders tablosu | Ders listesi `[TEYİT 5]` |
| **Destek programları ×6** (§6.4) | Kısa tanım, CTA | Ayrıntı | BTEC sayfası tamamen `[TEYİT 6]` |
| **Nasıl çalışıyoruz** (§9) | 6 adım (ne olur / sizden beklenen / süre), sınav süreci (5 adım), dürüst notlar | Sık hatalar, yazılı aldıklarınız | Görüşme süresi `[KARAR 1]`; merkez adları `[TEYİT 2, 3]` |
| **Ücretler** (§10) | Neden tek fiyat yok, paketler (rakamsız), ayrıca ödenenler, ödeme adımları, CTA | Uygun fiyat gerekçeleri | Taksit `[KARAR 6]` |
| **Ülkeler + 6 ülke** (§11) | Şablonun 8 bölümü, kaynaklar, son güncelleme, uyarı notu | Örnek üniversiteler | Hollanda, Kanada koşulları `[TEYİT 8]` |
| **Maqolalar** (§15) | Liste, kategori filtresi, yazı şablonu | Arama | 12 yazının metni (yazılmadı) |
| **Biz haqimizda** (§12) | Biz kimiz, ne yapıyoruz, ekip (rol bazlı), ilkeler | Bütüncül değerlendirme | Şirket bilgisi; Faydalan adı `[TEYİT 1]` |
| **Hamkorlar** (§12.1) | Tamamı | — | Sayfanın tamamı `[TEYİT 1]`, onay gelene kadar yayınlanmaz |
| **Aloqa** (§13) | Form, teşekkür sayfası, Telegram destek | Kısa SSS | Yanıt süresi `[KARAR 2]`; kullanıcı adı, saatler `[KARAR 3]`; e-posta `[KARAR 4]` |
| **Savollar** (§14) | 7 kategori, sorular, arama | — | — |
| **Yasal ×6** (§16) | Tamamı | — | Avukat onayı (Kapı 1); taslak notu yalnızca staging'de |
| **404 / 500** (prompt §9) | Üç dilde, ana sayfa + iletişim bağlantısı | — | — |

---

## 4. Bağlam kısıtları · *UX araştırmacısı + frontend mühendisi*

**Doğrulanmış ya da kaynağı belli olanlar**

- Trafiğin büyük bölümü telefondan ve Telegram içi tarayıcıdan gelir (plan §17, ekip bilgisi).
- Pearson IAL: Hukuk dışındaki dersler modüler; dönemler Ocak, Haziran, Ekim (pearson.com IAL sayfası, 19.10.2026). Plan "Mayıs–Haziran" diyor; Pearson sayfası "June". Metinlerde aynı ifade kullanılmalı `[KARAR: "Mayıs–Haziran" mı "Haziran" mı]`.
- Özbek Latin yazımı: oʻ, gʻ için U+02BB; tutuq belgisi için U+02BC (plan §2.6).

**Varsayımlar (QA aşamasında ölçülecek)**

- *Varsayım:* Mobil veri birçok kullanıcı için ücretli ve sınırlı. JavaScript bütçesi bu yüzden 100 KB gzip'in altında tutulur. Görseller yalnızca anlam taşıyorsa kullanılır.
- *Varsayım:* Cihazların önemli bir bölümü düşük ve orta segment Android. Tasarım 360 px genişlikte ve yavaş işlemcide test edilir; ağır animasyon ve büyük JavaScript paketlerinden kaçınılır.
- *Varsayım (Telegram içi tarayıcı):* `localStorage` oturumlar arasında kalıcı olmayabilir, yeni sekme açma davranışı farklı olabilir, `t.me` bağlantıları Telegram'ın içinden doğrudan sohbet açar. Kritik akış (form, dil seçimi) JavaScript'e ve tarayıcı belleğine dayanmamalıdır. Gerçek cihazda test edilecek.

**Özbekçe metin kuralları (uygulama için)**

- Ziyaretçiler `oʻ` yerine sıklıkla `o'`, `o‘` ya da `` o` `` yazar. Arama (SSS, makaleler) bu varyantları aynı kabul edecek şekilde normalleştirilmelidir. Form alanları her varyantı kabul eder.
- Seçilecek fontlarda U+02BB ve U+02BC glifleri gözle test edilir (prompt §4).
- Özbekçe ve Rusça metinler İngilizceden belirgin biçimde uzundur. Düğmeler ve menü bu uzunluğa göre tasarlanır.

---

## 5. Mevcut kodun bu brif karşısındaki durumu · *Kreatif yönetmen + frontend mühendisi*

Önceki adımlarda kurulan iskelet (Next.js 16, next-intl, Tailwind v4) korunabilir. Ancak aşağıdakiler brifle çelişiyor ve Aşama 3 ile 6'da değişecek:

| Mevcut | Brif | Ne olacak |
|---|---|---|
| Inter tek font | Prompt §5: Inter "yapay zekâ görünümlü" listede; §6: iki aile istenir | Aşama 2'de yeni font çifti |
| Karanlık mod | Prompt §6: açık tema zorunlu, koyu tema ancak gerekçe ve ayrı kontrast tablosuyla | Bkz. Karar 5 |
| 8 menü bağlantısı, sınav merkezleri, haftalık program | Plan v2 §4.1: 7 bağlantı, "Dasturlar" açılır menü; sınav merkezleri ve haftalık program ayrı sayfa değil | Rotalar ve menü yeniden kurulur |
| Rusçada ayrı slug (`/ru/programmy`) | Plan v2 §3: Rusça ve İngilizce ortak İngilizce slug | `routing.ts` güncellenir |
| "Ariza qoldirish" düğmesi | Plan v2 §4.1: "Bepul konsultatsiya" | Metin paketi güncellenir |
| Yer tutucular footer'da görünüyor | Plan v2: yer tutucular canlıda görünmez | Bilgi yoksa alan gizlenir; yalnızca staging'de işaret görünür |
| Footer'da "KVKK" geçiyor | Plan v2 §16: UZ/RU'da "KVKK" kullanılmaz | Kaldırılır |

---

## 6. Aşama 2'den önce gereken kararlar · *Kreatif yönetmen*

Plan v2 ile prompt arasında çelişen noktalar var. Prompt, içerik için plan dosyasını kaynak kabul ediyor; ama aşağıdakiler tasarımı doğrudan etkilediği için sizin kararınız gerekiyor.

1. **Superlatifler.** Plan v2 "en güvenilir yol", "en güçlü seçenek" gibi ifadelere açıkça izin veriyor (§0, §2.4). Prompt §8 ise "en iyi, tek" ifadelerini yasak listesinde sayıyor.
   **Önerim:** Plan v2'yi izlemek (daha yeni içerik kararı), ama her superlatifin yanına somut bir gerekçe koymak (plan §2.3 de bunu istiyor). Sonuç garantisi yasağı iki belgede de aynı.

2. **Sayı kartları.** Plan v2 §5.11 "10+ üniversite · Yüzlerce öğrenci · 10+ yıl" kartları istiyor. Prompt §5 "sahte sayaçlar" ve doğrulanmamış sayıları yasaklıyor.
   **Önerim:** Bu bilgiyi büyük sayaç kartları yerine düz cümle olarak yazmak. "Yüzlerce" bir sayı değildir, sayaç kartında kullanılmaz. Kaynağı olan bir sayı varsa (ör. "12 üniversite") kart olabilir.

3. **Sınav merkezleri prototipi.** Prompt §7 dört kritik prototipten birini "sınav merkezleri" sayfası olarak tanımlıyor. Plan v2 §3 bu sayfayı bu sürümde kurmuyor.
   **Önerim:** Bu prototipin yerine **Nasıl çalışıyoruz** sayfası (sınav süreci bölümü dahil). Böylece dört prototip: ana sayfa, A-Level, Nasıl çalışıyoruz, form.

4. **Faydalan, partnerler ve üniversite listesi.** Hepsi `[TEYİT 1]`, yani Faydalan'ın yazılı onayını bekliyor.
   **Önerim:** Bölümleri tasarlayıp kodlamak, ama onay gelene kadar canlıda kapalı tutmak (içerik dosyasında bir bayrakla).

5. **Karanlık mod.** Önceki adımda sizin isteğinizle eklendi. Prompt açık temayı zorunlu tutuyor, koyu temayı ise gerekçe ve ayrı kontrast tablosuyla kabul ediyor.
   **Önerim:** Korumak. Gerekçe: akşam ve gece yapılan derslere ve Telegram'ın koyu temasına uyum. Bedeli: her bileşen için ikinci bir kontrast tablosu ve test matrisinde ikinci tema.

6. **Form verisi.** Supabase istediniz. Plan v2 §16, Özbekistan veri kanunundaki Mart 2026 değişikliğine dikkat çekiyor.
   **Önerim:** Supabase'in AB (Frankfurt) bölgesi. Hukuki uygunluk avukat onayına bağlı; `[KARAR]` olarak işaretlenir.

7. **IAL dönem adı.** "Mayıs–Haziran" (plan) mı, "Haziran" (Pearson sayfası) mı? Önerim: plan v2'yi izlemek, çünkü sınavlar Mayıs sonunda başlıyor `[TEYİT: Pearson takvimi]`.

---

## Atlanan ya da eksik kalanlar

- **Gerçek kullanıcı araştırması:** Atlandı. Görüşme yapılacak kişiye erişim yok; personalar varsayım olarak işaretlendi.
- **Yerel (Özbekistan) A-Level danışmanlık referansı:** Aramada doğrulanabilir bir site bulunamadı; yalnızca everstudy.uz (genel danışmanlık) ve wiut.uz (üniversite) alındı.
- **Görsel referans incelemesi:** Siteler metin olarak okundu; renk ve tipografi değerlendirmesi yapılmadı. Aşama 2'de ekran görüntüsüyle tamamlanabilir.
