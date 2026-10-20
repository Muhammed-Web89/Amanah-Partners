// Form dönüşümü sunucudan bildirilir; iletişim sayfasında üçüncü taraf betik yok (prompt §9).
// Kişisel veri ve IP gönderilmez.
export async function trackServerEvent(name: string, url: string) {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return;
  const endpoint = process.env.PLAUSIBLE_API ?? 'https://plausible.io/api/event';
  await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'user-agent': 'amanah-server' },
    body: JSON.stringify({ name, url, domain }),
  }).catch(() => undefined);
}
