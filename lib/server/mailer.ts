import "server-only";

import type { ContactInput } from "@/lib/validation/contact";
import { fr } from "@/lib/i18n/dictionaries/fr";

/**
 * Envoi de la demande au cabinet via l'API Resend (appel HTTP, sans SDK).
 * Variables requises (jamais préfixées NEXT_PUBLIC_) :
 *   RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
 */

export type SendResult = "sent" | "simulated" | "unavailable" | "failed";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** L'e-mail au cabinet est toujours rédigé en français ; la langue du visiteur est indiquée. */
export async function sendContactEmail(data: ContactInput, locale: string): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Aucun fournisseur e-mail configuré : envoi simulé en développement.");
      return "simulated";
    }
    console.error("[contact] CONTACT_MAILER_NOT_CONFIGURED");
    return "unavailable";
  }

  const topic =
    fr.expertises.items.find((t) => t.id === data.topic)?.title ??
    (data.topic === "autre" ? fr.contact.form.otherTopic : data.topic);
  const rows: [string, string][] = [
    ["Nom", data.name],
    ["E-mail", data.email],
    ["Téléphone", data.phone ?? "Non indiqué"],
    ["Langue du site", locale.toUpperCase()],
    ["Domaine", topic],
  ];

  const html = `
    <h1 style="font-family:Georgia,serif;font-weight:400">Nouvelle demande de rendez-vous</h1>
    <table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><th align="left">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`
        )
        .join("")}
    </table>
    <p style="font-family:Arial,sans-serif;white-space:pre-wrap">${escapeHtml(data.message)}</p>
  `;

  const text = `${rows.map(([l, v]) => `${l} : ${v}`).join("\n")}\n\n${data.message}`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `Demande de rendez-vous : ${topic}`,
        html,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error(`[contact] CONTACT_MAILER_HTTP_${response.status}`);
      return "failed";
    }
    return "sent";
  } catch {
    console.error("[contact] CONTACT_MAILER_NETWORK");
    return "failed";
  }
}
