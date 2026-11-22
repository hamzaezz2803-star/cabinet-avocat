"use client";

import { useActionState, useEffect, useRef } from "react";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";

import { submitContact } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/fr";
import { cn } from "@/lib/utils";
import { initialContactState, type ContactField } from "@/lib/validation/contact-state";

const fieldClass =
  "block w-full rounded-lg border border-input bg-card px-4 text-base text-foreground transition-colors duration-150 placeholder:text-muted-foreground/70 hover:border-foreground/40 focus-visible:border-brass aria-invalid:border-destructive";

interface FieldProps {
  id: ContactField;
  label: string;
  optionalLabel?: string;
  error?: string;
  hint?: string;
  children: (describedBy: string | undefined) => React.ReactNode;
}

function Field({ id, label, optionalLabel, error, hint, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[0.9375rem] font-medium">
        {label}
        {optionalLabel ? <span className="font-normal text-muted-foreground"> {optionalLabel}</span> : null}
      </label>
      {children(describedBy)}
      {hint ? (
        <p id={hintId} className="mt-2 text-sm text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="mt-2 flex items-start gap-2 text-sm text-destructive">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={1.75} />
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface ContactFormProps {
  locale: Locale;
  t: Dictionary["contact"]["form"];
  topics: { value: string; label: string }[];
}

export function ContactForm({ locale, t, topics }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(submitContact, initialContactState);
  const startedAtRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Horodatage posé côté client (contrôle anti-robot), renouvelé après chaque envoi.
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, [state]);

  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  const err = state.fieldErrors;
  const v = state.values;
  // Clé qui force la réinitialisation des valeurs par défaut après un renvoi.
  const formKey = `${state.status}-${state.message}-${Object.keys(err).join()}`;

  return (
    <form key={formKey} action={formAction} noValidate className="rounded-lg border bg-card p-6 sm:p-8 lg:p-10">
      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none empty:hidden">
        {state.status === "success" ? (
          <p className="mb-8 flex items-start gap-3 rounded-lg border border-success/40 bg-success/[0.06] p-4 text-success">
            <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0" strokeWidth={1.75} />
            {state.message}
          </p>
        ) : null}
        {state.status === "error" ? (
          <p className="mb-8 flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/[0.05] p-4 text-destructive">
            <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" strokeWidth={1.75} />
            {state.message}
          </p>
        ) : null}
      </div>

      {/* Contrôles anti-robot : invisibles et ignorés par les technologies d'assistance. */}
      <div aria-hidden="true" className="absolute -start-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">{t.honeypot}</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="" />
      <input type="hidden" name="locale" value={locale} />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label={t.name} error={err.name}>
          {(describedBy) => (
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={100}
              defaultValue={v.name}
              aria-invalid={err.name ? true : undefined}
              aria-describedby={describedBy}
              className={cn(fieldClass, "h-12")}
            />
          )}
        </Field>

        <Field id="email" label={t.email} error={err.email}>
          {(describedBy) => (
            <input
              id="email"
              name="email"
              type="email"
              dir="ltr"
              autoComplete="email"
              inputMode="email"
              required
              maxLength={254}
              defaultValue={v.email}
              aria-invalid={err.email ? true : undefined}
              aria-describedby={describedBy}
              className={cn(fieldClass, "h-12 rtl:text-end")}
            />
          )}
        </Field>

        <Field id="phone" label={t.phone} optionalLabel={t.optional} error={err.phone}>
          {(describedBy) => (
            <input
              id="phone"
              name="phone"
              type="tel"
              dir="ltr"
              autoComplete="tel"
              inputMode="tel"
              maxLength={20}
              placeholder={t.phonePlaceholder}
              defaultValue={v.phone}
              aria-invalid={err.phone ? true : undefined}
              aria-describedby={describedBy}
              className={cn(fieldClass, "h-12 rtl:text-end")}
            />
          )}
        </Field>

        <Field id="topic" label={t.topic} error={err.topic}>
          {(describedBy) => (
            <select
              id="topic"
              name="topic"
              required
              defaultValue={v.topic ?? ""}
              aria-invalid={err.topic ? true : undefined}
              aria-describedby={describedBy}
              className={cn(
                fieldClass,
                "h-12 appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pe-10 rtl:bg-[left_1rem_center]"
              )}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238c6d33' stroke-width='1.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
              }}
            >
              <option value="" disabled>
                {t.topicPlaceholder}
              </option>
              {topics.map((topic) => (
                <option key={topic.value} value={topic.value}>
                  {topic.label}
                </option>
              ))}
            </select>
          )}
        </Field>

        <div className="sm:col-span-2">
          <Field id="message" label={t.message} error={err.message} hint={t.messageHint}>
            {(describedBy) => (
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                minLength={20}
                maxLength={2000}
                defaultValue={v.message}
                aria-invalid={err.message ? true : undefined}
                aria-describedby={describedBy}
                className={cn(fieldClass, "min-h-40 resize-y py-3 leading-relaxed")}
              />
            )}
          </Field>
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              required
              aria-invalid={err.consent ? true : undefined}
              aria-describedby={err.consent ? "consent-error" : undefined}
              className="mt-0.5 size-5 shrink-0 cursor-pointer rounded-sm border-input accent-primary"
            />
            <label htmlFor="consent" className="cursor-pointer text-[0.9375rem] leading-relaxed text-muted-foreground">
              {t.consentBefore}{" "}
              <a href={`/${locale}/confidentialite`} className="text-foreground underline decoration-brass underline-offset-4">
                {t.consentLink}
              </a>
              .
            </label>
          </div>
          {err.consent ? (
            <p id="consent-error" className="mt-2 flex items-start gap-2 text-sm text-destructive">
              <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={1.75} />
              {err.consent}
            </p>
          ) : null}
        </div>
      </div>

      <Button type="submit" size="lg" disabled={pending} className="mt-8 w-full sm:w-auto">
        {pending ? (
          <>
            <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
            {t.sending}
          </>
        ) : (
          t.submit
        )}
      </Button>
    </form>
  );
}
