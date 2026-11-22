import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site-config";

const routes = ["", "/mentions-legales", "/conditions-utilisation"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${route}`,
      changeFrequency: route === "" ? ("monthly" as const) : ("yearly" as const),
      priority: route === "" ? 1 : 0.3,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteConfig.url}/${l}${route}`])),
      },
    }))
  );
}
