/** Langues du site. Le français est la langue par défaut. */
export const locales = ["fr", "en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const localeDir = (locale: Locale): "ltr" | "rtl" => (locale === "ar" ? "rtl" : "ltr");

/** Locale Intl : formats marocains (chiffres latins, y compris en arabe). */
export const intlLocale: Record<Locale, string> = {
  fr: "fr-MA",
  en: "en-GB",
  ar: "ar-MA",
};

export const ogLocale: Record<Locale, string> = {
  fr: "fr_MA",
  en: "en_GB",
  ar: "ar_MA",
};

/** Nom de chaque langue écrit dans cette langue (sélecteur). */
export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  ar: "العربية",
};

export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Remplace (ou ajoute) le segment de langue d'un chemin. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const parts = pathname.split("/");
  if (parts[1] && hasLocale(parts[1])) parts[1] = target;
  else parts.splice(1, 0, target);
  return parts.join("/") || `/${target}`;
}
