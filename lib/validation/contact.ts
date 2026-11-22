import { z } from "zod";

import type { Dictionary } from "@/lib/i18n/dictionaries/fr";

/** Schéma de validation serveur (seule validation qui fait foi), messages dans la langue du visiteur. */

const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

const cleanText = (value: unknown) =>
  typeof value === "string" ? value.replace(CONTROL_CHARS, "").trim() : value;

/** Texte sur une seule ligne : retours à la ligne également supprimés. */
const cleanLine = (value: unknown) =>
  typeof value === "string"
    ? value.replace(/[\r\n\t]+/g, " ").replace(CONTROL_CHARS, "").trim()
    : value;

export const TOPIC_VALUES = [
  "affaires",
  "contentieux",
  "immobilier",
  "travail",
  "famille",
  "penal",
  "autre",
] as const;

export function createContactSchema(e: Dictionary["contact"]["errors"]) {
  return z.object({
    name: z.preprocess(
      cleanLine,
      z.string({ error: e.name }).min(2, { error: e.name }).max(100, { error: e.nameMax })
    ),
    email: z.preprocess(
      cleanLine,
      z
        .string({ error: e.email })
        .min(1, { error: e.email })
        .max(254, { error: e.emailInvalid })
        .pipe(z.email({ error: e.emailInvalid }))
    ),
    phone: z.preprocess(
      (v) => {
        const cleaned = cleanLine(v);
        return cleaned === "" || cleaned === null ? undefined : cleaned;
      },
      z
        .string()
        .regex(/^\+?[0-9 .()-]{9,20}$/, { error: e.phone })
        .optional()
    ),
    topic: z.enum(TOPIC_VALUES, { error: e.topic }),
    message: z.preprocess(
      cleanText,
      z
        .string({ error: e.message })
        .min(20, { error: e.message })
        .max(2000, { error: e.messageMax })
    ),
    consent: z.literal("on", { error: e.consent }),
  });
}

export type ContactInput = z.infer<ReturnType<typeof createContactSchema>>;
