"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { sendContactEmail } from "@/lib/server/mailer";
import { rateLimit } from "@/lib/server/rate-limit";
import { contactSchema } from "@/lib/validation/contact";
import type { ContactField, ContactFormState } from "@/lib/validation/contact-state";

const MIN_FILL_MS = 3_000;
const MAX_FIELD_ECHO = 2_000;

const SUCCESS: ContactFormState = {
  status: "success",
  message: "Demande envoyée. Le cabinet vous recontacte pour fixer un rendez-vous.",
  fieldErrors: {},
  values: {},
};

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
 */
export async function submitContact(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // 1. Champ piège : un robot le remplit. On répond « succès » sans rien envoyer.
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.length > 0) return SUCCESS;

  // 2. Durée de remplissage trop courte : même traitement silencieux.
  const startedAt = Number(formData.get("startedAt"));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) return SUCCESS;

  // 3. Limitation de débit : 5 demandes par heure et par adresse IP.
  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "unknown";
  if (!rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000)) {
    return {
      status: "error",
      message: "Trop de demandes envoyées depuis cette connexion. Réessayez dans une heure ou appelez le cabinet.",
      fieldErrors: {},
      values: echoValues(formData),
    };
  }

  // 4. Validation côté serveur.
  const parsed = contactSchema.safeParse({
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
    return {
      status: "error",
      message: "Certains champs sont à corriger.",
      fieldErrors,
      values: echoValues(formData),
    };
  }

  // 5. Envoi.
  const result = await sendContactEmail(parsed.data);
  if (result === "sent" || result === "simulated") return SUCCESS;

  return {
    status: "error",
    message:
      "La demande n'a pas pu être envoyée. Réessayez dans quelques minutes ou contactez le cabinet par téléphone.",
    fieldErrors: {},
    values: echoValues(formData),
  };
}
