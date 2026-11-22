import { z } from "zod";

import { contactTopics } from "@/lib/content";

/** Schéma partagé navigateur / serveur. Le serveur reste la seule validation qui fait foi. */

const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

const cleanText = (value: unknown) =>
  typeof value === "string" ? value.replace(CONTROL_CHARS, "").trim() : value;

/** Texte sur une seule ligne : retours à la ligne également supprimés. */
const cleanLine = (value: unknown) =>
  typeof value === "string" ? value.replace(/[\r\n\t]+/g, " ").replace(CONTROL_CHARS, "").trim() : value;

const topicValues = contactTopics.map((t) => t.value) as [string, ...string[]];

export const contactSchema = z.object({
  name: z.preprocess(
    cleanLine,
    z
      .string({ error: "Indiquez votre nom." })
      .min(2, { error: "Indiquez votre nom." })
      .max(100, { error: "100 caractères maximum." })
  ),
  email: z.preprocess(
    cleanLine,
    z
      .string({ error: "Indiquez votre adresse e-mail." })
      .max(254, { error: "Adresse e-mail trop longue." })
      .pipe(z.email({ error: "Adresse e-mail invalide, par exemple nom@domaine.ma." }))
  ),
  phone: z.preprocess(
    (v) => {
      const cleaned = cleanLine(v);
      return cleaned === "" || cleaned === null ? undefined : cleaned;
    },
    z
      .string()
      .regex(/^\+?[0-9 .()-]{9,20}$/, {
        error: "Numéro invalide, par exemple 06 12 34 56 78.",
      })
      .optional()
  ),
  topic: z.enum(topicValues, { error: "Choisissez un domaine." }),
  message: z.preprocess(
    cleanText,
    z
      .string({ error: "Décrivez brièvement votre demande." })
      .min(20, { error: "Décrivez votre demande en au moins 20 caractères." })
      .max(2000, { error: "2 000 caractères maximum." })
  ),
  consent: z.literal("on", {
    error: "Votre accord est nécessaire pour traiter la demande.",
  }),
});

export type ContactInput = z.infer<typeof contactSchema>;
