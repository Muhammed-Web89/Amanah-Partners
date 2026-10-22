'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { CircleAlert, LoaderCircle } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { submitLead } from '@/actions/submit-lead';
import { buttonClass } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { countries, fieldOrder, grades, programs, type FormState } from '@/lib/lead-fields';
import { ChoiceGroup, ConsentBox, SelectField, TextArea, TextField } from './fields';

const initial: FormState = { attempt: 0, errors: {}, values: {} };

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations('form');
  return (
    <button type="submit" disabled={pending} aria-busy={pending || undefined} className={buttonClass('glow', 'w-full sm:w-auto')}>
      {pending && <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />}
      {pending ? t('submitting') : t('submit')}
    </button>
  );
}

/**
 * Ücretsiz görüşme formu (plan v2 §13.1).
 * JavaScript olmadan da çalışır (Server Action ile normal form gönderimi).
 * 18 yaş altı alanları: "18 yaş ve üstü" seçilince CSS (:has) ile gizlenir; JS gerekmez.
 */
export function ConsultationForm() {
  const t = useTranslations('form');
  const locale = useLocale();
  const [state, action] = useActionState(submitLead, initial);
  const summaryRef = useRef<HTMLDivElement>(null);
  const tsRef = useRef<HTMLInputElement>(null);

  const ordered = fieldOrder.filter((f) => state.errors[f]).map((f) => [f, state.errors[f]!] as const);
  const v = state.values;
  const str = (k: string) => (typeof v[k] === 'string' ? (v[k] as string) : undefined);
  const err = (k: keyof FormState['errors']) =>
    state.errors[k] ? t(`errors.${state.errors[k]}` as 'errors.contact') : undefined;

  useEffect(() => {
    if (tsRef.current) tsRef.current.value = String(Date.now());
  }, [state.attempt]);

  useEffect(() => {
    if (state.attempt > 0 && Object.keys(state.errors).length) summaryRef.current?.focus();
  }, [state.attempt]); // eslint-disable-line react-hooks/exhaustive-deps

  const labels = { requiredLabel: t('required'), optionalLabel: t('optional') };

  return (
    <form key={state.attempt} action={action} noValidate className="consultation-form grid gap-6" aria-describedby="form-storage">
      <input type="hidden" name="locale" value={locale} />
      <input ref={tsRef} type="hidden" name="ts" defaultValue="" />

      {/* Hata özeti: odak buraya taşınır, ekran okuyucu duyurur */}
      <div ref={summaryRef} tabIndex={-1} aria-live="assertive" className="focus:outline-none">
        {state.errors.form && (
          <div role="alert" className="flex gap-3 rounded-md border-2 border-danger bg-danger-soft p-4">
            <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-danger" />
            <p className="font-semibold">{t(`errors.${state.errors.form}` as 'errors.server')}</p>
          </div>
        )}
        {ordered.length > 0 && (
          <div role="alert" className="rounded-md border-2 border-danger bg-danger-soft p-4">
            <p className="font-semibold">{t('errorSummary', { count: ordered.length })}</p>
            <ul className="mt-2 grid gap-1">
              {ordered.map(([field, key]) => (
                <li key={field}>
                  <a href={`#${firstOption(field) ? `${field}-${firstOption(field)}` : field}`} className="text-danger">
                    {t(`errors.${key}` as 'errors.contact')}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          name="studentName"
          label={t('studentName')}
          required
          {...labels}
          autoComplete="name"
          maxLength={100}
          defaultValue={str('studentName')}
          error={err('studentName')}
        />
        <SelectField
          name="grade"
          label={t('grade')}
          required
          {...labels}
          placeholder={t('gradeChoose')}
          options={grades.map((g) => ({ value: g, label: t(`grades.${g}`) }))}
          defaultValue={str('grade')}
          error={err('grade')}
        />
      </div>

      <ChoiceGroup
        name="age"
        label={t('age')}
        required
        {...labels}
        columns={2}
        options={[
          { value: 'minor', label: t('ages.minor') },
          { value: 'adult', label: t('ages.adult') },
        ]}
        defaultValue={str('age')}
        error={err('age')}
      />

      <ChoiceGroup
        name="program"
        label={t('program')}
        required
        {...labels}
        columns={2}
        options={programs.map((p) => ({ value: p, label: t(`programs.${p}`) }))}
        defaultValue={str('program')}
        error={err('program')}
      />

      <ChoiceGroup
        name="countries"
        type="checkbox"
        label={t('countries')}
        hint={t('countriesHint')}
        {...labels}
        columns={3}
        options={countries.map((c) => ({ value: c, label: t(`countryOptions.${c}`) }))}
        defaultValue={(v.countries as string[]) ?? []}
      />

      <ChoiceGroup
        name="filledBy"
        label={t('filledBy')}
        required
        {...labels}
        columns={2}
        options={[
          { value: 'student', label: t('filledByOptions.student') },
          { value: 'parent', label: t('filledByOptions.parent') },
        ]}
        defaultValue={str('filledBy')}
        error={err('filledBy')}
      />

      {/* 18 yaş altı: veli bilgisi (CSS: .consultation-form:has(#age-adult:checked) .minor-only → gizli) */}
      <fieldset className="minor-only grid gap-6 rounded-lg border border-(--glass-border) bg-(--inner-card) p-4 shadow-[inset_0_1px_0_var(--glass-highlight)] sm:p-5">
        <legend className="px-1 font-serif text-lg font-semibold">{t('parentTitle')}</legend>
        <p className="-mt-2 text-sm text-ink-2">{t('parentHint')}</p>
        <div className="grid gap-6 sm:grid-cols-2">
          <TextField
            name="parentName"
            label={t('parentName')}
            maxLength={100}
            defaultValue={str('parentName')}
            error={err('parentName')}
          />
          <TextField
            name="parentPhone"
            label={t('parentPhone')}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            hint={t('parentPhoneHint')}
            maxLength={30}
            defaultValue={str('parentPhone')}
            error={err('parentPhone')}
          />
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          name="contact"
          label={t('contact')}
          required
          {...labels}
          hint={t('contactHint')}
          maxLength={40}
          defaultValue={str('contact')}
          error={err('contact')}
        />
        <TextField
          name="city"
          label={t('city')}
          {...labels}
          autoComplete="address-level2"
          maxLength={80}
          defaultValue={str('city')}
          error={err('city')}
        />
      </div>

      <TextArea
        name="message"
        label={t('message')}
        {...labels}
        hint={t('messageHint')}
        maxLength={1000}
        defaultValue={str('message')}
        error={err('message')}
      />

      {/* Honeypot: ekran dışında, ekran okuyucudan ve sekme sırasından gizli */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">{t('honeypot')}</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="grid gap-4">
        <ConsentBox name="consent" defaultChecked={str('consent') === 'on'} error={err('consent')}>
          {t.rich('consent', {
            link: (chunks) => (
              <Link href="/privacy" target="_blank">
                {chunks}
              </Link>
            ),
          })}
        </ConsentBox>
        <ConsentBox
          name="parentConsent"
          className="minor-only"
          hint={t('parentConsentHint')}
          defaultChecked={str('parentConsent') === 'on'}
          error={err('parentConsent')}
        >
          {t('parentConsent')}
        </ConsentBox>
      </div>

      <div className="grid gap-3">
        <SubmitButton />
        <p id="form-storage" className="text-sm text-ink-2">
          {t('storage')}
        </p>
      </div>
    </form>
  );
}

function firstOption(field: string) {
  return { age: 'minor', program: 'a-level', filledBy: 'student' }[field] ?? '';
}
