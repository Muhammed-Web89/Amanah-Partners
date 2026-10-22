// Yapılandırılmış veri (schema.org). "<" kaçışı: içerikteki metin script etiketini kapatamaz.
export function JsonLd({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
  );
}
