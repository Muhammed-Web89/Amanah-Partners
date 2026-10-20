// Form alan sabitleri: hem istemci (form) hem sunucu (doğrulama) kullanır.
// Bu dosya zod içermez; böylece doğrulama kütüphanesi tarayıcıya gönderilmez.

export const grades = ['8', '9', '10', '11', 'graduate'] as const;
export const programs = ['a-level', 'igcse-a-level', 'sat', 'ielts', 'medicine', 'application', 'unsure'] as const;
export const countries = ['uk', 'usa', 'germany', 'italy', 'netherlands', 'canada', 'undecided'] as const;

// Hata sırası = formdaki alan sırası (hata özeti bu sırayla listelenir)
export const fieldOrder = [
  'studentName',
  'grade',
  'age',
  'program',
  'filledBy',
  'parentName',
  'parentPhone',
  'contact',
  'city',
  'message',
  'consent',
  'parentConsent',
] as const;
export type FieldName = (typeof fieldOrder)[number];

export type FormState = {
  attempt: number;
  errors: Partial<Record<FieldName | 'form', string>>;
  values: Record<string, string | string[]>;
};
