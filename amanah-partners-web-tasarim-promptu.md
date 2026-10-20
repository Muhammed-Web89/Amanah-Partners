# Amanah Partners Web Sitesi: Üst Düzey Tasarım ve Geliştirme Promptu

> Bu belge, bir yapay zekâ asistanına ya da tasarım ve yazılım ekibine verilecek tek bir brif'tir. Amaç şablon hissi veren, "yapay zekâyla yapılmış" görünen bir site değil; bir ajansın üst düzey ekibinin hazırlayacağı, marka kimliği olan, teknik olarak sağlam ve ölçülebilir bir site üretmektir.
>
> **Girdi:** `amanah-partners-web-sitesi-plani.md` (yapı ve içerik planı). Bu prompt, içerik ve sayfa yapısı için o dosyayı kaynak kabul eder.

---

## 1. Rol ve ekip

Bu işi tek bir kişi değil, aşağıdaki rollerin birlikte çalıştığı bir ekip gibi yürüt. Her çıktının hangi role ait olduğunu başlığında belirt.

- **Kreatif yönetmen:** Konsept, marka yönü, kararların tutarlılığı.
- **UX araştırmacısı:** Kullanıcı yolculukları, kırılma noktaları, form akışları.
- **Ürün tasarımcısı (UI):** Tasarım sistemi, bileşenler, durumlar (hover, focus, error, disabled), responsive davranış.
- **Tipograf ve marka tasarımcısı:** Yazı tipi çifti, tip ölçeği, Özbekçe ve Rusça karakter desteği.
- **Frontend mühendisi:** Erişilebilir, hızlı, çok dilli ve SEO uyumlu uygulama.
- **Metin yazarı (çok dilli):** Özbekçe ana metin, Rusça ve İngilizce uyarlama.
- **Uyum notu:** KVKK, çerez ve sözleşme özeti taslaklarının işaretlenmesi. Bu rol hukuki onayın yerine geçmez.
- **QA mühendisi:** Test matrisi, erişilebilirlik ve performans kontrolleri.

Bir aşamayı atlarsan "atlandı" diye yaz ve nedenini belirt. Sessizce geçme.

---

## 2. Proje bağlamı

- **Marka:** Amanah Partners. Türkiye merkezli, yurt dışında A-Level ve üniversite eğitimi hedefleyen öğrencilere danışmanlık veren bir şirket.
- **Birincil kitle:** 14–18 yaş öğrenciler ve aileleri. Özbekistan ve çevre ülkeleri (Kazakistan, Kırgızistan, Türkmenistan, Tacikistan). Ebeveyn karar verici, öğrenci ara kullanıcı. Trafiğin büyük kısmı telefondan ve Telegram içi tarayıcıdan gelir.
- **İkincil kitle:** Kurumsal güven arayan okul yöneticileri, sınav merkezleri ve yurt dışı üniversite ortakları.
- **Sitenin tek işi:** Ziyaretçiyi güven içinde uygunluk formuna ya da Telegram destek hesabına götürmek.
- **Başarı ölçütleri:** Form tamamlama oranı, Telegram'a geçiş oranı, mobil performans, sayfa başına kalma süresi. Bunları ölçebilecek altyapıyı tasarıma ve koda dahil et.
- **Kısıtlar:** Fiyat yazılmaz. Garanti, kesin kabul ya da vize vaadi yoktur. Kişi yüzü ve kurucu fotoğrafı yoktur. Emlak sayfası yoktur. Doğrulanmamış merkez, rozet, sayı ve referans yazılmaz. Hukuki metinler taslaktır ve onay bekler.

Plandaki açık kararlar (bölüm 19) çözülmüş gibi yazılmaz. Her biri için "karar bekliyor" ya da "doğrulama sürüyor" işareti kullanılır.

---

## 3. Aşama 1: Keşif (kod ve tasarımdan önce)

**Çıktılar:**

- **Referans analizi:** Eğitim danışmanlığı yapan siteler ve uluslararası A-Level sağlayıcılarının sitelerinden 8–10 örnek. Her biri için: ne işe yarıyor, hangi güveni veriyor, neyi yanlış yapıyor. Yalnızca erişimi doğrulanmış siteleri yaz. Uydurma örnek yazılmaz.
- **Kullanıcı yolculukları:** Üç persona. (a) İlk kez Telegram'dan gelen ebeveyn, (b) 15 yaşında, kararı ailesiyle birlikte veren öğrenci, (c) süreci karşılaştırmak için geri dönen ziyaretçi. Her persona için: ilk 10 saniyede ne arar, hangi sorudan sonra durur, hangi noktada vazgeçer.
- **İçerik envanteri:** Plandaki her sayfa için bölüm listesi, zorunlu ve isteğe bağlı bölümler, "karar bekliyor" işaretli alanlar.
- **Bağlam kısıtları:** Mobil veri maliyeti, düşük ve orta segment Android cihazlar, Telegram içi tarayıcı davranışı, Özbekçe Latin yazım kuralları.

---

## 4. Aşama 2: Tasarım yönü (üç aday, bir seçim)

Üç farklı yön öner. Her biri için şunları yaz:

- **Kavram:** Tek cümlede "bu site neye benziyor?"
- **Renk stratejisi:** 4–6 token ve her birinin rolü. Renk neden bu duyguyu veriyor?
- **Tipografi çifti:** Başlık ve gövde ailesi, gerekçesiyle. Latin genişletilmiş ve Kiril desteği zorunludur. Özbekçe `ʻ` ve `ʼ` karakterlerinin doğru görüntülendiği doğrulanır.
- **Düzen mantığı:** Grid, boşluk ritmi, yoğunluk.
- **Hareket yaklaşımı:** Hangi anlar hareketlidir, hangileri sabittir.
- **Görsel dil:** İkon seti, illüstrasyon ya da fotoğraf kuralları.
- **Bu yönün riski:** Nerede yanlış okunabilir?

Sonra birini seç ve seçimi gerekçelendir. Seçim ölçütleri: güven, sadelik, ciddiyet ve yurt dışı eğitimle bağ, mobil okunabilirlik, ailelerin algıladığı kurumsallık.

**İlham yönleri** (kopyalama değil, tartışma başlatmak için):

- *Arşiv ve kayıt defteri:* Belge hissi, ince çizgiler, ölçülü tipografi. Resmi ama sıcak.
- *Yol haritası:* Süreç ve harita dili, diyagram odaklı, sakin renkler.
- *Ölçülü editöryel:* Gazete tipografisi değil. Uzun metinde yüksek okunurluk, tek vurgu rengi.

---

## 5. Yasak liste: "yapay zekâ görünümlü" tasarım tuzakları

Aşağıdakilerden birini kullanıyorsan gerekçesini yaz ya da kaldır:

- Krem zemin, terracotta vurgu ve serif başlık kombinasyonu.
- Siyah zemin ve tek neon ya da asit yeşili vurgu.
- Beyaz zeminde mor-mavi gradyan hero.
- Inter, Space Grotesk ya da Roboto gibi "güvenli" diye seçilmiş varsayılan yazı tipleri.
- Her bölümün ortalanması. Uzun metin ortalanmaz.
- Her kartta aynı köşe yuvarlaklığı, gölge ve sol kenar çizgisi.
- Emoji ile bölüm işaretleme veya ikon yerine emoji.
- Sahte sayaçlar ("500+ öğrenci"), uydurma yorumlar, yıldız puanları.
- Gereksiz "01 / 02 / 03" numaralandırma. Yalnızca gerçek bir sıra varsa kullanılır (ör. altı adımlı süreç).
- Stok fotoğraflar: gülümseyen öğrenci, dizüstü bilgisayarda çalışan el, beyaz tahta. Görsel gerekiyorsa gerçek, izinli ve bağlamlı bir fotoğraf ya da özgün bir çizim kullanılır.
- 100vh'lik karşılama ekranı ve aşağı ok ikonu.
- Açılışta pop-up, zamanlayıcılı "son fırsat" sayacı, çerez duvarı.
- Otomatik oynayan video ve kritik bilgiyi gizleyen kaydırmalı karusel.

---

## 6. Aşama 3: Tasarım sistemi

**Üretilecekler:**

- **Token seti** (CSS özel özellikleri ya da token dosyası):
  - Renkler: açık tema zorunlu. Koyu tema yapılacaksa gerekçesiyle ve ayrı kontrast tablosuyla eklenir.
  - Tip ölçeği: sabit bir oran (ör. 1.2 veya 1.25) ve mobil–masaüstü geçişi.
  - Boşluk ölçeği: 4 ya da 8 tabanlı.
  - Köşe yuvarlaklığı: üç seviye. Her yerde aynı değer kullanılmaz.
  - Gölge: iki seviye, rol bazlı.
  - Hareket süreleri ve eğrileri.
- **Kontrast tablosu:** Her metin–zemin ve bileşen–zemin çifti için WCAG AA değerleri. Gövde metni 4.5:1, büyük metin ve bileşen sınırları 3:1.
- **Tipografi uygulaması:** Google Fonts üzerinden iki aile (başlık ve gövde). Gerekirse üçüncü bir aile, yalnızca veri ve tablo için. Latin genişletilmiş ve Kiril alt kümeleri dahil. Yalnızca kullanılan ağırlıklar yüklenir. Her aile için yedek yazı tipi yığını tanımlanır.
- **Bileşen kütüphanesi:** Her bileşen için durumlar (default, hover, focus-visible, active, disabled, error, loading).
  - Dil seçici, üst menü, mobil menü
  - Sabit "Başvur" ve "Telegram" düğmeleri
  - Düğmeler (birincil, ikincil, metin)
  - Kart, süreç adımı (yatay ve mobilde dikey), tablo (sınav takvimi, yük tablosu)
  - SSS akordeonu, form alanları ve hata mesajları, KVKK onay kutusu
  - Uyarı kutusu (taslak ve "karar bekliyor" notları dahil)
  - Footer, breadcrumb, sayfa başlığı, boş durum (empty state)
- **Ritim ve ölçü:** Mobilde 16 px kenar boşluğu, masaüstünde içerik genişliği yaklaşık 1200 px, gövde metin satır uzunluğu yaklaşık 65 karakter. Bölümler arasında tutarlı dikey boşluk.

---

## 7. Aşama 4: Sayfa mimarisi ve düzen

Plandaki her sayfa için düzen kararı yazılır. Masaüstü ve mobil için bölüm sırası ve bileşen seçimi açıklanır. Kritik dört sayfa için görsel prototip üretilir: **ana sayfa, akış sayfası, sınav merkezleri, uygunluk formu.**

**Ana sayfa kuralları:**

- İlk ekranda iki bilgi görünür: ne sunulduğu ve kime sunulduğu. Marka adı ya da slogan tek başına ilk satırda olmaz. Örnek: "Pearson A-Level ile üniversite yoluna hazırlık, yerel okulunuzu sürdürürken."
- Birincil düğme her zaman görünür. Mobilde sabit "Başvur" bulunur.
- Hero'da fotoğraf yerine süreç diyagramı ya da özgün bir görsel kullanılır.
- Güven satırı yalnızca doğrulanmış ifadeler içerir. Doğrulanmayan ifade yazılmaz.

**Sayfa bazlı düzen notları:**

- *Sınav merkezleri:* Merkez kartları, bölgeye göre filtre ya da sekmeler. Onay durumu her kartta etiketle gösterilir ("Onaylı", "Doğrulama sürüyor"). Harita için Google Maps gömmesi yerine statik görsel ya da adres listesi kullanılır (gizlilik ve performans).
- *Haftalık program:* Gün ve saat ızgarası. Mobilde yatay kaydırma yerine gün gün dikey liste.
- *Nasıl çalışıyoruz:* Altı adımlı yatay gösterge. Mobilde dikey. Her adımda "ne olur", "sizden ne beklenir", "ne zaman tamamlanır" alanları.
- *Ülke sayfaları:* Aynı şablon. Kabul yolları karşılaştırmalı tablo olarak, "son güncelleme" tarihi her zaman görünür.
- *Ücretler:* Paket kapsamı tablosu (dahil / ayrıca ödenir). Fiyat alanı yoktur.
- *SSS:* Kategori sekmeleri ve arama. Her cevapta ilgili sayfaya bağlantı.

---

## 8. Aşama 5: Metin ve dil

- **Özbekçe (Latin)** ana metindir. Yazım kuralları: `oʻ`, `gʻ` için U+02BB (ʻ) kullanılır. Apostrof için doğru karakter seçilir ve tüm sayfada tutarlı olur. Kiril ile karıştırılmaz. Anadili Özbekçe bir editör kontrolü zorunludur.
- **Rusça:** "Вы" hitabı, resmi ama sıcak bir dil. Ayrı editör kontrolü.
- **İngilizce:** İngiliz yazımı (A-Level bağlamı). Üniversite ve ülke adları kaynağa göre.
- Her metin, plan dosyasındaki yasak kelime ve kalıp listesine göre taranır: garanti, kesin, en iyi, tek, son fırsat gibi ifadeler.
- Her ekran için ayrı metin yazılır: başlık, açıklama (meta), düğme, form etiketi, yardımcı metin, hata mesajı, boş durum, başarı mesajı.
- **Düğme metinleri** eylem odaklı ve somuttur. "Uygunluk formunu doldur" yeterlidir. "Başla!" ya da "Hemen keşfet" kullanılmaz.
- **Hata mesajları** ne olduğunu ve nasıl düzeltileceğini söyler. Örnek: "Telegram kullanıcı adınızı @ işaretiyle yazın."
- **Rakam, tarih ve kurum adı** plan dosyasındaki kaynak notlarıyla eşleşir. Eşleşmeyen veri yazılmaz, "karar bekliyor" olarak işaretlenir.
- Metinler **sade ve doğrudan** yazılır. Gereksiz süs, iç içe cümle, em dash ile kurulan kıvrımlı cümleler kullanılmaz.

---

## 9. Aşama 6: Teknik uygulama

**Yığın (önerilen):** Astro ya da Next.js ile statik üretim. TypeScript. Dil yönlendirmesi: `/uz/`, `/ru/`, `/en/`. Ekip farklı bir yığın seçerse gerekçesini yazar.

**İçerik ve tasarım katmanları ayrıdır.** Sayfa metinleri koda gömülmez. İçerik Markdown ya da JSON dosyalarında tutulur, token'lar ayrı bir katmandadır. Yeni bir dil ya da yeni bir yazı eklemek kod değişikliği gerektirmez.

**Zorunlu gereksinimler:**

- **Çok dilli SEO:** Her sayfada üç dil için `hreflang` ve `x-default`. Dile göre `canonical`. Sitemap ve robots.txt.
- **Meta ve paylaşım:** Her sayfa için benzersiz başlık ve açıklama (üç dilde). Open Graph ve Twitter kartları. Telegram'da önizleme görünmeli.
- **Yapılandırılmış veri:** Organization, WebSite, BreadcrumbList. FAQPage yalnızca SSS sayfasında. Course yalnızca yayınlanmış ve doğrulanmış ders bilgisi olduğunda.
- **Form:**
  - Sunucu tarafında doğrulama. Yalnızca istemci tarafı kontrol yetmez.
  - Bot koruması (honeypot ya da eşdeğeri) ve istek hız sınırı.
  - KVKK onay kutusu zorunlu. Onay olmadan gönderim yapılmaz.
  - Gönderim sırasında yükleniyor durumu, hata durumu ve başarı sayfası.
  - Form verisinin nereye gittiği ve ne kadar saklandığı dokümante edilir.
  - Formda üçüncü taraf betik bulunmaz. Gerekirse açık onayla eklenir.
- **Telegram:** Sabit destek düğmesi (`t.me` bağlantısı). Bağlantı açılmazsa görünür kullanıcı adı yazılı olarak gösterilir. Telegram içi tarayıcıda çalışır.
- **Analitik:** Çerez gerektirmeyen, gizlilik odaklı bir araç. Kişisel veri toplamayan ayarlar.
- **Çerez bildirimi:** Yalnızca gerçekten çerez kullanılıyorsa gösterilir. KVKK uyumlu, reddetme düğmesi eşit görünür. Çerez duvarı yoktur.
- **Erişilebilirlik (WCAG 2.2 AA):**
  - Tüm akışlar klavye ile tamamlanabilir.
  - Atla bağlantısı (skip link) ve net odak görünürlüğü.
  - Dil seçicide `lang` özniteliği ve uygun ARIA.
  - Form etiketleri alanlara bağlı. Hata mesajları `aria-live` ile duyurulur.
  - `prefers-reduced-motion` desteklenir.
- **Performans bütçesi:**
  - Orta segment Android ve mobil 4G'de LCP 2.5 saniyenin altında.
  - Toplam JavaScript mümkünse 100 KB (gzip) altında.
  - Görseller WebP veya AVIF, boyutları belirtilmiş, gerektiğinde tembel yükleme.
  - Fontlar alt kümeli, `font-display: swap`.
- **Güvenlik:** İçerik güvenlik politikası (CSP), HSTS, `X-Content-Type-Options`, `Referrer-Policy`. SSL zorunlu.
- **Hata sayfaları:** 404 ve 500, üç dilde, ana sayfaya ve iletişime bağlantılı.
- **Kod deposu:** README (kurulum, ortam değişkenleri, içerik güncelleme adımları), ayrı içerik dizini, staging ve canlı ortam ayrımı.

---

## 10. Aşama 7: QA ve kabul

**Test matrisi:**

- **Ekran genişlikleri:** 360 px (küçük Android), 375 px (iPhone SE), 390–430 px (modern telefon), 768 px (tablet), 1280 px ve 1440 px (masaüstü).
- **Tarayıcılar:** Chrome (Android), Safari (iOS), Telegram içi tarayıcı, Firefox ve Edge (masaüstü).
- **Diller:** Üç dil tam olarak test edilir. Rusça ve Özbekçe metinler genelde daha uzundur, düzen bozulmamalıdır.
- **Temalar:** Açık tema. Koyu tema yapıldıysa o da.
- **Ağ:** 4G ve yavaş 3G simülasyonu.
- **Form senaryoları:** Başarılı gönderim, eksik alan, geçersiz Telegram adı, KVKK onaysız gönderim, sunucu hatası.
- **Bağlantılar:** Tüm iç ve dış bağlantılar çalışır. Dil değiştirildiğinde aynı sayfanın karşılığına gider.
- **Erişilebilirlik:** Otomatik araçta (axe veya eşdeğeri) kritik sorun sıfır. Klavye ile tam gezinme. Ekran okuyucu ile ana akış denemesi.
- **Performans:** Lighthouse mobil skorları: performans, erişilebilirlik, SEO ve en iyi uygulamalar için hedef 90 ve üzeri. Ölçüm raporu eklenir.
- **Metin kontrolü:** Bölüm 8'deki kurallara göre tarama.
- **Yasal işaretler:** Taslak notları yalnızca staging ortamında görünür. Hukuki onay tamamlanmadan canlıya alınmaz.

---

## 11. Teslim edilecekler

1. Kreatif brief ve üç yönün karşılaştırması, seçim gerekçesi.
2. Tasarım sistemi dokümanı ve token dosyası, kontrast tablosu.
3. Sayfa bazlı düzen notları ve dört kritik sayfanın görsel prototipi (masaüstü ve mobil).
4. Üç dilde metin paketi, her dil için editör kontrol durumu.
5. Çalışan kod deposu ve staging bağlantısı.
6. QA raporu: test matrisi sonucu, performans ve erişilebilirlik ölçümleri.
7. Açık kararlar listesi. Plandaki bölüm 19 ile birebir eşleşir.
8. Yayın öncesi kontrol listesi.

---

## 12. Kabul kriterleri

Hepsi sağlanmadan "tamamlandı" denmez:

- Bölüm 5 ve 8'deki tasarım tuzakları ve yasak ifadeler temizdir.
- Ana sayfa ilk ekranda ne sunulduğunu beş saniyede anlatır. Test: bir kişiye göster ve sor.
- 360 px genişlikte yatay kaydırma yoktur ve tüm bileşenler çalışır.
- Üç dilde aynı yapı vardır ve `hreflang` doğrudur.
- Form uçtan uca çalışır ve KVKK onayı zorunludur.
- Erişilebilirlik ve performans hedefleri tutturulmuştur ya da sapma nedeni yazılıdır.
- Hiçbir sayfada fiyat, garanti, uydurma sayı, referans veya kişi yüzü yoktur.
- Açık kararlar işaretlidir. Hukuki onayı olmayan içerik canlıda değildir.

---

## 13. Çalışma kuralları

- Varsayım yapıyorsan açıkça yaz: "Varsayım: ...".
- Bilgi eksikse uydurma. "[karar bekliyor]" ya da "[doğrulama sürüyor]" yaz.
- Her aşamanın kısa çıktısını ver, onay al, sonra bir sonrakine geç. Tüm işi tek seferde üretme.
- Geri bildirimde önce neyin değiştiğini ve nedenini açıkla. Yalnızca istenen kısmı değiştir.
- Her tasarım kararını gerekçesiyle yaz. "Daha güzel görünsün" gerekçe değildir; hangi kullanıcı sorununu çözdüğünü yaz.
- Bir şeyi sen de doğrulayamıyorsan doğrulanmamış olarak işaretle.

---

## 14. Teslimden önce son kontrol

- [ ] Bu site bir hazır şablonla karıştırılabilir mi? Evetse neyi değiştirdin?
- [ ] Ana sayfadaki her bölüm bir işe yarıyor mu?
- [ ] Hiçbir ekran boş, yer tutucu ya da "yakında" hissi vermiyor mu? (Karar bekleyen alanlar açıkça işaretli olmalı.)
- [ ] Mobilde ilk ekranda "Başvur" ve "Telegram" erişilebilir mi?
- [ ] Üç dilde metin tamamlandı ve editör kontrolünden geçti mi?
- [ ] Yasak ifadeler, fiyatlar ve uydurma veriler temizlendi mi?
- [ ] Sen bu siteyi bir ebeveyn olarak açsaydın, ilk üç saniyede ne yapacağını bilir miydin?
