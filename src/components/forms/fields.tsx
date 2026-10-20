import type { ReactNode } from 'react';
import { CircleAlert } from 'lucide-react';
import { cn } from '@/lib/cn';

// Form alanları: etiket alana bağlı (htmlFor), yardımcı metin ve hata aria-describedby ile,
// hata durumunda aria-invalid. Durumlar: default, hover, focus-visible, error, disabled.

const control =
  'w-full rounded-sm border bg-paper px-3 py-2.5 text-ink transition-colors duration-fast placeholder:text-ink-2 hover:border-ink disabled:cursor-not-allowed disabled:bg-paper-2 disabled:text-ink-2 aria-invalid:border-danger aria-invalid:border-2';

type Base = {
  name: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  requiredLabel?: string;
  optionalLabel?: string;
  className?: string;
};

export function describedBy(name: string, hint?: string, error?: string) {
  return [hint && `${name}-hint`, error && `${name}-error`].filter(Boolean).join(' ') || undefined;
}

function Label({ htmlFor, label, required, requiredLabel, optionalLabel }: { htmlFor?: string; label: string; required?: boolean; requiredLabel?: string; optionalLabel?: string }) {
  const Tag = htmlFor ? 'label' : 'span';
  return (
    <Tag htmlFor={htmlFor} className="mb-1.5 block font-semibold text-ink">
      {label}
      {required && requiredLabel && <span className="ml-1.5 text-sm font-normal text-ink-2">({requiredLabel})</span>}
      {!required && optionalLabel && <span className="ml-1.5 text-sm font-normal text-ink-2">({optionalLabel})</span>}
    </Tag>
  );
}

export function Hint({ name, children }: { name: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <p id={`${name}-hint`} className="mt-1.5 text-sm text-ink-2">
      {children}
    </p>
  );
}

export function FieldError({ name, children }: { name: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <p id={`${name}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm font-semibold text-danger">
      <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      {children}
    </p>
  );
}

export function TextField({
  name,
  label,
  hint,
  error,
  required,
  requiredLabel,
  optionalLabel,
  className,
  type = 'text',
  defaultValue,
  autoComplete,
  inputMode,
  maxLength,
}: Base & {
  type?: string;
  defaultValue?: string;
  autoComplete?: string;
  inputMode?: 'text' | 'tel' | 'email';
  maxLength?: number;
}) {
  return (
    <div className={className}>
      <Label htmlFor={name} label={label} required={required} requiredLabel={requiredLabel} optionalLabel={optionalLabel} />
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, hint, error)}
        className={cn(control, 'min-h-12 border-rule-strong')}
      />
      <Hint name={name}>{hint}</Hint>
      <FieldError name={name}>{error}</FieldError>
    </div>
  );
}

export function TextArea({ name, label, hint, error, optionalLabel, className, defaultValue, maxLength }: Base & { defaultValue?: string; maxLength?: number }) {
  return (
    <div className={className}>
      <Label htmlFor={name} label={label} optionalLabel={optionalLabel} />
      <textarea
        id={name}
        name={name}
        rows={4}
        defaultValue={defaultValue}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, hint, error)}
        className={cn(control, 'border-rule-strong')}
      />
      <Hint name={name}>{hint}</Hint>
      <FieldError name={name}>{error}</FieldError>
    </div>
  );
}

export function SelectField({
  name,
  label,
  hint,
  error,
  required,
  requiredLabel,
  className,
  options,
  placeholder,
  defaultValue,
}: Base & { options: Array<{ value: string; label: string }>; placeholder: string; defaultValue?: string }) {
  return (
    <div className={className}>
      <Label htmlFor={name} label={label} required={required} requiredLabel={requiredLabel} />
      <select
        id={name}
        name={name}
        defaultValue={defaultValue ?? ''}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, hint, error)}
        className={cn(control, 'min-h-12 border-rule-strong')}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <Hint name={name}>{hint}</Hint>
      <FieldError name={name}>{error}</FieldError>
    </div>
  );
}

/** Radyo ya da onay kutusu grubu (fieldset + legend). */
export function ChoiceGroup({
  name,
  label,
  hint,
  error,
  required,
  requiredLabel,
  optionalLabel,
  className,
  options,
  type = 'radio',
  defaultValue,
  columns = 1,
}: Base & {
  options: Array<{ value: string; label: string }>;
  type?: 'radio' | 'checkbox';
  defaultValue?: string | string[];
  columns?: 1 | 2 | 3;
}) {
  const selected = Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : [];
  return (
    <fieldset
      className={className}
      // Radyo grubu: radiogroup rolü aria-required / aria-invalid destekler; onay kutusu grubunda bu nitelikler yok.
      role={type === 'radio' ? 'radiogroup' : undefined}
      aria-describedby={describedBy(name, hint, error)}
      aria-invalid={type === 'radio' && error ? true : undefined}
      aria-required={type === 'radio' && required ? true : undefined}
    >
      <legend className="mb-1.5 font-semibold text-ink">
        {label}
        {required && requiredLabel && <span className="ml-1.5 text-sm font-normal text-ink-2">({requiredLabel})</span>}
        {!required && optionalLabel && <span className="ml-1.5 text-sm font-normal text-ink-2">({optionalLabel})</span>}
      </legend>
      <Hint name={name}>{hint}</Hint>
      <div className={cn('mt-2 grid gap-2', columns === 2 && 'sm:grid-cols-2', columns === 3 && 'grid-cols-2 sm:grid-cols-3')}>
        {options.map((o) => {
          const id = `${name}-${o.value}`;
          return (
            <label
              key={o.value}
              htmlFor={id}
              className={cn(
                'flex min-h-12 cursor-pointer items-center gap-3 rounded-sm border bg-paper px-3 py-2 transition-colors duration-fast hover:border-ink has-checked:border-ink has-checked:bg-paper-2 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus',
                error ? 'border-danger' : 'border-rule-strong',
              )}
            >
              <input
                id={id}
                type={type}
                name={name}
                value={o.value}
                defaultChecked={selected.includes(o.value)}
                className="size-5 shrink-0 accent-[var(--c-action)] focus-visible:outline-none"
              />
              <span>{o.label}</span>
            </label>
          );
        })}
      </div>
      <FieldError name={name}>{error}</FieldError>
    </fieldset>
  );
}

/** Tek onay kutusu (kişisel veri onayı). */
export function ConsentBox({
  name,
  children,
  hint,
  error,
  defaultChecked,
  className,
}: {
  name: string;
  children: ReactNode;
  hint?: string;
  error?: string;
  defaultChecked?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className={cn('flex gap-3 rounded-sm border p-3', error ? 'border-2 border-danger' : 'border-rule')}>
        <input
          id={name}
          name={name}
          type="checkbox"
          defaultChecked={defaultChecked}
          aria-required="true"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(name, hint, error)}
          className="mt-0.5 size-5 shrink-0 accent-[var(--c-action)]"
        />
        <label htmlFor={name} className="text-ink">
          {children}
        </label>
      </div>
      <Hint name={name}>{hint}</Hint>
      <FieldError name={name}>{error}</FieldError>
    </div>
  );
}
