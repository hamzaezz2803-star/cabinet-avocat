"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { defaultLocale, hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { sendContactEmail } from "@/lib/server/mailer";
import { rateLimit } from "@/lib/server/rate-limit";
import { createContactSchema } from "@/lib/validation/contact";
import type { ContactField, ContactFormState } from "@/lib/validation/contact-state";

const MIN_FILL_MS = 3_000;
const MAX_FIELD_ECHO = 2_000;

function echoValues(formData: FormData): ContactFormState["values"] {
  const pick = (key: string) => {
    const v = formData.get(key);
    return typeof v === "string" ? v.slice(0, MAX_FIELD_ECHO) : undefined;
  };
  return {
    name: pick("name"),
    email: pick("email"),
    phone: pick("phone"),
    topic: pick("topic"),
    message: pick("message"),
  };
}

/**
 * Server Action du formulaire de contact. Ordre des contrôles :
 * honeypot → durée de remplissage → limitation de débit → validation zod → envoi.
 * La protection CSRF (vérification de l'Origin) est assurée par Next.js.
 * La langue vient d'un champ caché, vérifiée contre la liste fermée des langues.
 */
export async function submitContact(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const rawLocale = formData.get("locale");
  const locale = typeof rawLocale === "string" && hasLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getDictionary(locale).contact;

  const success: ContactFormState = {
    status: "success",
    message: t.status.success,
    fieldErrors: {},
    values: {},
  };

  // 1. Champ piège : un robot le remplit. On répond « succès » sans rien envoyer.
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.length > 0) return success;

  // 2. Durée de remplissage trop courte : même traitement silencieux.
  const startedAt = Number(formData.get("startedAt"));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) return success;

  // 3. Limitation de débit : 5 demandes par heure et par adresse IP.
  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "unknown";
  if (!rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000)) {
    return { status: "error", message: t.status.rateLimited, fieldErrors: {}, values: echoValues(formData) };
  }

  // 4. Validation côté serveur.
  const parsed = createContactSchema(t.errors).safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    topic: formData.get("topic"),
    message: formData.get("message"),
    consent: formData.get("consent"),
  });

  if (!parsed.success) {
    const flat = z.flattenError(parsed.error).fieldErrors as Partial<Record<ContactField, string[]>>;
    const fieldErrors: ContactFormState["fieldErrors"] = {};
    for (const [key, messages] of Object.entries(flat) as [ContactField, string[] | undefined][]) {
      if (messages?.[0]) fieldErrors[key] = messages[0];
    }
    return { status: "error", message: t.status.invalid, fieldErrors, values: echoValues(formData) };
  }

  // 5. Envoi.
  const result = await sendContactEmail(parsed.data, locale);
  if (result === "sent" || result === "simulated") return success;

  return { status: "error", message: t.status.failed, fieldErrors: {}, values: echoValues(formData) };
}
