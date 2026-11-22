/**
 * Source unique des informations du cabinet (hors textes traduits, voir lib/i18n).
 *
 * IMPORTANT : les valeurs `null` sont à fournir par le cabinet.
 * Elles s'affichent « à compléter » et ne doivent jamais être inventées
 * (voir .agents/rules/ui-ux.md et README-design.md, section 10).
 */

import type { Locale } from "@/lib/i18n/config";

type Localized = Record<Locale, string>;

export interface DaySchedule {
  /** null : fermé (sauf si `appointmentOnly`). */
  open: string | null;
  /** null avec `open` renseigné : heure de fermeture non communiquée. */
  close: string | null;
  /** Reçoit uniquement sur rendez-vous. */
  appointmentOnly?: boolean;
}

export interface GoogleReview {
  author: string;
  /** Initiale affichée dans l'avatar. */
  initial: string;
  localGuide: boolean;
  /** Nombre d'avis publiés par l'auteur sur Google. */
  authorReviews: number;
  /** Année de publication (Google n'affiche qu'une date relative). */
  year: number;
  /** Texte original (français). À VÉRIFIER : reconstitué depuis la traduction Google. */
  original: string;
  /** Traduction anglaise fournie par Google. */
  translationEn: string;
  ownerResponse?: { original: string; translationEn: string };
}

export interface SiteConfig {
  name: Localized;
  /** Initiales du monogramme de l'en-tête et du favicon. */
  monogram: string;
  url: string;
  bar: string | null;
  address: {
    street: Localized;
    postalCode: string;
    city: Localized;
    country: Localized;
  };
  /** Téléphone au format international (E.164), affiché au format marocain. */
  phone: string;
  email: string;
  /** Du lundi (0) au dimanche (6). Communiqué par le cabinet le 22 nov. 2026. */
  schedule: DaySchedule[];
  /** Recherche Google Maps (plus code de la fiche Google). */
  mapQuery: string;
  reviews: {
    rating: number;
    count: number;
    url: string;
    items: GoogleReview[];
  };
  lawyer: {
    /** Photo réelle de l'avocat (chemin dans /public). null : monogramme affiché. */
    photo: string | null;
    /** Parcours vérifiable (barreau, prestation de serment, diplômes). Vide : bloc masqué. */
    credentials: Localized[];
  };
  legal: {
    legalForm: string | null;
    ice: string | null;
    rc: string | null;
    publicationDirector: string | null;
    host: string | null;
  };
}

export const siteConfig: SiteConfig = {
  name: { fr: "Maître Fatna Sabour", en: "Maître Fatna Sabour", ar: "الأستاذة فاطنة صابور" },
  monogram: "FS",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  bar: null,
  address: {
    street: {
      fr: "Espace Yousra, 7e étage, 355 (N° 93) boulevard Mohammed V",
      en: "Espace Yousra, 7th floor, 355 (No. 93) Boulevard Mohammed V",
      ar: "إسباس يسرى، الطابق السابع، 355 (رقم 93) شارع محمد الخامس",
    },
    postalCode: "20232",
    city: { fr: "Casablanca", en: "Casablanca", ar: "الدار البيضاء" },
    country: { fr: "Maroc", en: "Morocco", ar: "المغرب" },
  },
  phone: "+212664559661",
  email: "sabour.fatna@gmail.com",
  schedule: [
    { open: null, close: null },
    { open: null, close: null, appointmentOnly: true },
    { open: null, close: null, appointmentOnly: true },
    { open: null, close: null, appointmentOnly: true },
    { open: null, close: null },
    { open: null, close: null },
    { open: null, close: null },
  ],
  mapQuery: "H9VX+F3 Casablanca",
  reviews: {
    rating: 4.3,
    count: 6,
    url: "https://www.google.com/maps/search/?api=1&query=Avocat%20Maitre%20Sabour%20Fatna%20Casablanca",
    items: [
      {
        author: "Med S.",
        initial: "M",
        localGuide: true,
        authorReviews: 14,
        year: 2026,
        original: "Bon courage… Sérieux et rigoureux…",
        translationEn: "Good luck… serious and rigorous…",
      },
      {
        author: "Amine E.",
        initial: "A",
        localGuide: true,
        authorReviews: 46,
        year: 2022,
        original: "Meilleur avocat à Casablanca",
        translationEn: "Best lawyer in Casablanca",
        ownerResponse: { original: "Merci Amine", translationEn: "Thank you Amine" },
      },
      {
        author: "Mouna Z.",
        initial: "M",
        localGuide: false,
        authorReviews: 1,
        year: 2025,
        original: "Meilleur avocat",
        translationEn: "Best lawyer",
      },
    ],
  },
  lawyer: {
    photo: null,
    credentials: [],
  },
  legal: {
    legalForm: null,
    ice: null,
    rc: null,
    publicationDirector: null,
    host: null,
  },
};

/** « +212522000000 » → « 05 22 00 00 00 ». */
export function formatPhoneMa(e164: string): string {
  const digits = e164.replace(/\D/g, "");
  const national = digits.startsWith("212") ? `0${digits.slice(3)}` : digits;
  return national.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
}

export function fullAddress(locale: Locale): string {
  const { street, postalCode, city, country } = siteConfig.address;
  return `${street[locale]}, ${postalCode} ${city[locale]}, ${country[locale]}`;
}
