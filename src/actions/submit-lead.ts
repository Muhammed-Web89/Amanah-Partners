'use server';

import { headers } from 'next/headers';
import { hasLocale } from 'next-intl';
import { redirect } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { site } from '@/config/site';
import { trackServerEvent } from '@/lib/analytics';
import { fieldOrder, leadSchema, type FieldName, type FormState } from '@/lib/lead-schema';
import { overDbRateLimit, saveLead } from '@/lib/leads';
import { hashIp, rateLimited } from '@/lib/rate-limit';

export async function submitLead(previous: FormState, formData: FormData): Promise<FormState> {
  const rawLocale = String(formData.get('locale') ?? '');
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const attempt = previous.attempt + 1;

  const values: FormState['values'] = {};
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('$') || key === 'website' || key === 'ts' || key === 'locale') continue;
    if (key === 'countries') values.countries = [...((values.countries as string[]) ?? []), String(value)];
    else values[key] = String(value);
  }

  // Bot koruması 1: görünmez honeypot alanı doluysa sessizce "başarılı" gibi davran, kaydetme.
  const ts = Number(formData.get('ts'));
  const tooFast = ts > 0 && Date.now() - ts < 2500; // Bot koruması 2: JS varsa form açılışından 2,5 sn önce gönderim
  if (String(formData.get('website') ?? '') !== '' || tooFast) {
    redirect({ href: '/contact/thank-you', locale });
  }

  const parsed = leadSchema.safeParse({ ...values, countries: values.countries ?? [] });
  if (!parsed.success) {
    const errors: FormState['errors'] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as FieldName;
      if (fieldOrder.includes(field) && !errors[field]) errors[field] = issue.message;
    }
    return { attempt, errors, values };
  }

  const h = await headers();
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown';
  const ipHash = hashIp(ip);

  try {
    if (rateLimited(ipHash) || (await overDbRateLimit(ipHash))) {
      return { attempt, errors: { form: 'rateLimit' }, values };
    }
    await saveLead({ ...parsed.data, locale, ipHash });
  } catch (error) {
    console.error('Başvuru kaydedilemedi', error);
    return { attempt, errors: { form: 'server' }, values };
  }

  await trackServerEvent('Form Submit', `${site.url}/${locale}/contact`);
  redirect({ href: '/contact/thank-you', locale });
  return { attempt, errors: {}, values: {} };
}
