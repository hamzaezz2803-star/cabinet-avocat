import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, hasLocale, LOCALE_COOKIE, locales, type Locale } from "@/lib/i18n/config";

/** Langue préférée : cookie (choix explicite), sinon Accept-Language, sinon français. */
function preferredLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && hasLocale(cookie)) return cookie;

  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag = "", q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0] ?? "", q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of ranked) {
    if (hasLocale(lang)) return lang;
  }
  return defaultLocale;
}

/** Ajoute le préfixe de langue aux URL qui n'en ont pas (/ → /fr, /cookies → /fr/cookies). */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasPrefix = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasPrefix) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Tout sauf les fichiers internes, les images et les routes de métadonnées.
    "/((?!_next|images|icon\\.svg|sitemap\\.xml|robots\\.txt|.*\\..*).*)",
  ],
};
