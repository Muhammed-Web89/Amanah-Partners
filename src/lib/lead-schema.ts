import { z } from 'zod';

// Plan v2 §13.1 form alanları. Sunucu tarafı doğrulama: istemci kontrolüne güvenilmez.
// Hata değerleri, messages/*.json → form.errors anahtarlarıdır.

import { countries, grades, programs } from './lead-fields';

export { fieldOrder, type FieldName, type FormState } from './lead-fields';

const TELEGRAM = /^@[A-Za-z0-9_]{5,32}$/;
const PHONE = /^\+?[\d\s\-()]{9,20}$/;
const digits = (v: string) => v.replace(/\D/g, '').length;
const isPhone = (v: string) => PHONE.test(v) && digits(v) >= 9 && digits(v) <= 15;

export const leadSchema = z
  .object({
    studentName: z.string().trim().min(2, 'studentName').max(100, 'tooLong'),
    grade: z.enum(grades, { error: 'grade' }),
    age: z.enum(['minor', 'adult'], { error: 'age' }),
    program: z.enum(programs, { error: 'program' }),
    countries: z.array(z.enum(countries)).max(countries.length).default([]),
    filledBy: z.enum(['student', 'parent'], { error: 'filledBy' }),
    parentName: z.string().trim().max(100, 'tooLong').default(''),
    parentPhone: z.string().trim().max(30, 'tooLong').default(''),
    contact: z
      .string()
      .trim()
      .refine((v) => TELEGRAM.test(v) || isPhone(v), 'contact'),
    city: z.string().trim().max(80, 'tooLong').default(''),
    message: z.string().trim().max(1000, 'tooLong').default(''),
    consent: z.literal('on', { error: 'consent' }),
    parentConsent: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.age !== 'minor') return;
    if (data.parentName.length < 2) ctx.addIssue({ code: 'custom', path: ['parentName'], message: 'parentName' });
    if (!isPhone(data.parentPhone)) ctx.addIssue({ code: 'custom', path: ['parentPhone'], message: 'parentPhone' });
    if (data.parentConsent !== 'on') ctx.addIssue({ code: 'custom', path: ['parentConsent'], message: 'parentConsent' });
  });

export type Lead = z.infer<typeof leadSchema>;
