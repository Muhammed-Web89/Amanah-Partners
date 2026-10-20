import type { MetadataRoute } from 'next';
import { isStaging, site } from '@/config/site';

// Staging arama motorlarına tamamen kapalıdır.
export default function robots(): MetadataRoute.Robots {
  if (isStaging) return { rules: { userAgent: '*', disallow: '/' } };
  return { rules: { userAgent: '*', allow: '/', disallow: ['/*/aloqa/rahmat', '/*/contact/thank-you'] }, sitemap: `${site.url}/sitemap.xml` };
}
