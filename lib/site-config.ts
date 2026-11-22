/**
 * Source unique des informations du cabinet.
 *
 * IMPORTANT : les valeurs `null` sont à fournir par le cabinet.
 * Elles s'affichent « à compléter » sur le site et ne doivent jamais être inventées
 * (voir .agents/rules/ui-ux.md et README-design.md, section 10).
 */

export interface SiteConfig {
  /** Nom ou raison sociale affiché. */
  name: string;
  /** Initiales du monogramme de l'en-tête et du favicon. */
  monogram: string;
  /** Description courte (SEO, partage). */
  description: string;
  /** URL de production, sans barre finale. */
  url: string;
  locale: string;
  bar: string | null;
  address: {
    street: string | null;
    postalCode: string | null;
    city: string | null;
    country: string;
  };
  /** Téléphone au format international (E.164), affiché au format marocain. */
  phone: string | null;
  email: string | null;
  hours: string | null;
  legal: {
    legalForm: string | null;
    ice: string | null;
    rc: string | null;
    publicationDirector: string | null;
    host: string | null;
  };
}

export const siteConfig: SiteConfig = {
  name: "Maître Fatna Sabour",
  monogram: "FS",
  description:
    "Cabinet de Maître Fatna Sabour, avocat à Casablanca : conseil et défense juridique pour les entreprises et les particuliers.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "fr_MA",
  bar: null,
  address: {
    street: "Espace Yousra, 7e étage, 355 (N° 93) boulevard Mohammed V",
    postalCode: null,
    city: "Casablanca",
    country: "Maroc",
  },
  phone: "+212664559661",
  email: null,
  /** D'après la fiche Google : ouverture à 8:00, fermé le dimanche. Horaires de fermeture à confirmer. */
  hours: "À partir de 8:00, fermé le dimanche",
  legal: {
    legalForm: null,
    ice: null,
    rc: null,
    publicationDirector: null,
    host: null,
  },
};

export const TO_COMPLETE = "à compléter";

/** « +212522000000 » → « 05 22 00 00 00 ». */
export function formatPhoneMa(e164: string): string {
  const digits = e164.replace(/\D/g, "");
  const national = digits.startsWith("212") ? `0${digits.slice(3)}` : digits;
  return national.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
}
