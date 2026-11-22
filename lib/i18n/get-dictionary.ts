import "server-only";

import { ar } from "./dictionaries/ar";
import { en } from "./dictionaries/en";
import { fr, type Dictionary } from "./dictionaries/fr";
import type { Locale } from "./config";

const dictionaries: Record<Locale, Dictionary> = { fr, en, ar };

/** Dictionnaire d'une langue (serveur uniquement : il contient des fonctions). */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
