## 2.1 Görev Güncellemesi: Hero Banner ve Scrollytelling Alanı Revizyonu

Önceki adımda hazırladığımız Scrollytelling bölümünde yerleşim ve görsel sorunları var. Tasarımı aşağıdaki kurallara göre derhal güncellemeni istiyorum:

**A. Düzen (Layout) ve Denge Sorunu:**
*   **Sorun:** Kaydırma başladığında sol tarafta beliren "01/05 Onlayn darslar" gibi metinler çok cılız kalıyor ve sayfanın sol tarafı tamamen boş görünüyor.
*   **Çözüm:** Sol taraftaki metin alanı genişletilmeli. Sadece başlık ("01/05 Onlayn darslar") değil, her adım için **2-3 cümlelik açıklayıcı, ilham verici bir alt metin** (örneğin: "Uzman eğitmenlerimizle nerede olursanız olun interaktif ve canlı derslere katılın...") eklenmeli.
*   **Hizalama:** Sol metin bloğu (başlık + açıklama) dikey olarak sayfanın tam ortasında (vertically centered) yer almalı.

**B. "YO'LINGIZ" Menüsü ve Görsel İlişkisi:**
*   **Sorun:** Sağ taraftaki "YO'LINGIZ" (Yol Haritası) menüsü, ana görselin çok fazla üzerine biniyor ve tasarımı boğuyor.
*   **Çözüm:** "YO'LINGIZ" menüsü, sağdaki büyük görselin sol alt köşesine değil, **görselin tamamen soluna, metin ile görsel arasına** bağımsız, ince uzun, buzlu cam (glassmorphism) bir dikey ilerleme çubuğu (progress bar/stepper) olarak yerleştirilmeli.

**C. Görsel Değişimi ve İlham Vericilik (Görsel Promptları):**
Sağ taraftaki görseller statik stok fotoğraflar gibi duruyor. Aşağıdaki adımlar için kullanılacak görselleri AI ile üretirken veya seçerken şu temaları kullan:

*   **Adım 1: Onlayn darslar (01/05):** Masa üzerinde sadece bir laptop değil; ekranda odaklanmış bir öğrenci, etrafında süzülen 3D dijital eğitim ikonları (kitap, formül, dünya) olan fütüristik/aydınlık bir çalışma ortamı.
*   **Adım 2: Pearson imtihoni (02/05):** Klasik bir kağıt/kalem yerine; başarıyı ve global geçerliliği simgeleyen, parlayan bir dijital sertifika veya rozet hologramı, arka planda güven veren lacivert tonlar.
*   **Adım 3: Universitetga hujjatlar (03/05):** Dünyanın prestijli üniversitelerinin silüetleri önünde (Oxford, Harvard vb.), kabul mektubunu temsil eden, altın mühürlü uçan bir zarf animasyonu veya 3D render'ı.
*   **Adım 4: Viza (04/05):** Havalimanı camı yerine; pasaportun içinden çıkan bir uçak rotası animasyonu, arka planda hedef ülkenin (İngiltere/Avrupa) ikonik, minimalist bir vektörel çizimi.
*   **Adım 5: Kampus (05/05):** Çok canlı, yeşil bir kampüs ortamında, geleceğe umutla bakan çeşitli öğrencilerin oluşturduğu enerjik bir atmosfer.

**Komut:** Bu yerleşim düzeltmelerini (sol metni güçlendirme ve ortalama, menüyü ayırma) ve belirttiğim yeni görsel konseptlerini HTML/CSS yapısına (özellikle Flexbox/CSS Grid kurallarına) entegre et. Scrollytelling geçişlerinin düzgün çalışmasını sağla.