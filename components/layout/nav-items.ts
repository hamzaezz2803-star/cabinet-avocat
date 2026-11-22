import type { Dictionary } from "@/lib/i18n/dictionaries/fr";
import type { Locale } from "@/lib/i18n/config";

export interface NavItem {
  label: string;
  href: string;
}

const anchors: [keyof Dictionary["nav"], string][] = [
  ["about", "a-propos"],
  ["expertises", "expertises"],
  ["reviews", "avis"],
  ["method", "methode"],
  ["faq", "questions"],
  ["access", "acces"],
  ["contact", "contact"],
];

export function navItems(locale: Locale, nav: Dictionary["nav"]): NavItem[] {
  return anchors.map(([key, anchor]) => ({ label: nav[key], href: `/${locale}#${anchor}` }));
}
