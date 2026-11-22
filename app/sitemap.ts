import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

const routes = ["", "/mentions-legales", "/confidentialite", "/cookies", "/conditions-utilisation"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : 0.3,
  }));
}
