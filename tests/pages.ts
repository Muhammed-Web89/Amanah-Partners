// Test matrisindeki sayfalar: her dilde aynı yapı (prompt §12).
export const pages = {
  uz: ['/uz', '/uz/dasturlar', '/uz/dasturlar/a-level', '/uz/dasturlar/igcse-va-a-level', '/uz/dasturlar/sat', '/uz/qanday-ishlaymiz', '/uz/davlatlar', '/uz/davlatlar/germaniya', '/uz/narxlar', '/uz/maqolalar', '/uz/maqolalar/pearson-imtihonlari-qanday-otadi', '/uz/biz-haqimizda', '/uz/aloqa', '/uz/aloqa/rahmat', '/uz/savollar', '/uz/maxfiylik-siyosati', '/uz/rasmiy-sahifalar'],
  ru: ['/ru', '/ru/programs', '/ru/programs/a-level', '/ru/how-we-work', '/ru/destinations/italy', '/ru/fees', '/ru/guides', '/ru/about', '/ru/contact', '/ru/faq', '/ru/privacy'],
  en: ['/en', '/en/programs', '/en/programs/medicine-ucat-imat', '/en/how-we-work', '/en/destinations/uk', '/en/fees', '/en/guides/how-pearson-exams-work', '/en/about', '/en/contact', '/en/faq', '/en/terms'],
};
export const all = [...pages.uz, ...pages.ru, ...pages.en];
