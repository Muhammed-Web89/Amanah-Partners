# Eğitim Projesi Web Sitesi - Tasarım ve Geliştirme Master Prompt'u

**Rolün:** Sen kıdemli bir UI/UX tasarımcısı ve Front-End (Geliştirici) uzmanısın. Yenilikçi, okunabilirliği yüksek ve etkileşimli modern web arayüzleri oluşturuyorsun.

**Amacımız:** Eğitim projem için sıfırdan, modern trendlere uygun bir web sitesi tasarlamak. Token israfını önlemek ve tasarım kontrolünü tamamen elimde tutmak için süreci **adım adım** ilerleteceğiz. Tüm siteyi tek seferde oluşturmaya çalışma; sadece senden istediğim bölümü tasarla ve onayımı bekle.

## 1. Global Tasarım Dili ve Sabit Bileşenler (Tüm Site İçin Geçerli)
Sayfa içerikleri ne olursa olsun, sitenin genelinde uygulanacak ana tasarım prensibi **Glassmorfizm (Buzlu Cam Efekti)** olacaktır.
*   **Temel Stil:** Yarı saydam arka planlar, yüksek arka plan bulanıklığı (`backdrop-filter: blur`), çok ince ve açık renkli kenarlıklar, yumuşak gölgeler. Okunabilirlik asla bu efekte kurban edilmeyecek; metinler her zaman yüksek kontrastlı ve net olacak.
*   **Header (Üst Menü):** Sayfanın en üstünde ekrana sabitlenmiş (sticky/fixed) olarak duracak. Aşağı kaydırıldığında arkasından geçen içerikleri flulaştırarak gösteren buzlu cam yapısında olacak.
*   **Footer (Alt Bilgi):** Sayfa sonlarında yer alan ve her sayfada standart olarak bulunan bu alan da yine Glassmorfizm stiliyle tasarlanacak.

## 2. İlk Görev: Hero Banner ve Scrollytelling Alanı (Sadece Bu Adımı Uygula)
Şu an sadece ilk karşılama ekranını ve hemen ardından başlayacak kaydırma (scroll) etkileşimini planlamanı/kodlamanı istiyorum. Diğer bölümlere geçme.

**A. Arka Plan:**
*   Düz renk yerine, eğitime atıfta bulunan, çok yavaş ve pürüzsüz hareket eden pastel tonlarda degrade (gradient) veya soyut 3D elementler içeren bir animasyon.

**B. Hero Banner Yerleşimi:**
*   **Sol Taraf (Metin):** Ana mesaj ve açıklamalar, arkasından geçen hareketli arka planı flulaştıran şık bir buzlu cam panel (kart) üzerinde yer alacak.
*   **Sağ Taraf (Görsel ve Menü):** Arka planı transparan (dekupe edilmiş) bir öğrenci fotoğrafı. Fotoğrafın arkasında derinlik katan çok hafif bir ışık hüzmesi olacak. Görselin üzerine binen "YO'LINGIZ" (Yol Haritası/Seçenekler) kutusu site açıldığında aşağıdan yumuşakça süzülerek yerine oturacak. Bu kutu da buzlu cam efektli olacak.

**C. Etkileşim (Scrollytelling - Kaydırma Hikayesi):**
Kullanıcı sayfayı aşağı kaydırmaya başladığında şu olaylar gerçekleşecek:
1.  Sol taraftaki ana metin paneli yukarı kayarak yavaşça kaybolacak.
2.  Sağ taraftaki alan (Öğrenci görseli ve YO'LINGIZ kutusu) ekranda sabitlenecek (sticky).
3.  Kaydırma devam ettikçe, kutunun içindeki adımlar ("Onlayn darslar", "Pearson imtihoni", "Universitetga hujjatlar", "Viza", "Kampus") sırayla aydınlanıp aktifleşecek.
4.  **Görsel Dönüşümü:** Kutu içindeki her yeni adım aktifleştiğinde, sağdaki büyük öğrenci görseli o adıma uygun yeni bir görsele (örneğin evraklar, pasaport, hareketli kampüs videosu) pürüzsüz bir geçişle (cross-fade) dönüşecek.

**Komut:** Bu talimatları anladığını onayla ve sadece "Header" ile "Hero Banner/Scrollytelling" alanı için yapısal planını (veya HTML/CSS/JS iskeletini) sun. Ardından sıradaki adımı (örneğin Hakkımızda veya Programlar bölümü) tasarlamak için benden komut bekle.