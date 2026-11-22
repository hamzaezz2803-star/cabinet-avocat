import type { Metadata, Viewport } from "next";
import {
  IBM_Plex_Sans_Arabic,
  Libre_Caslon_Display,
  Noto_Naskh_Arabic,
  Public_Sans,
} from "next/font/google";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { hasLocale, localeDir, locales, ogLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { siteConfig } from "@/lib/site-config";
import "../globals.css";

const caslon = Libre_Caslon_Display({
  variable: "--font-caslon",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

// Polices arabes : chargées seulement quand des glyphes arabes sont affichés.
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  weight: ["400", "500", "600"],
  subsets: ["arabic"],
  display: "swap",
  preload: false,
});

const naskh = Noto_Naskh_Arabic({
  variable: "--font-naskh",
  weight: ["400", "600"],
  subsets: ["arabic"],
  display: "swap",
  preload: false,
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  const name = siteConfig.name[lang];
  const title = `${name} | ${dict.meta.titleSuffix}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: title, template: `%s | ${name}` },
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "website",
      locale: ogLocale[lang],
      siteName: name,
      title,
      description: dict.meta.description,
      images: [{ url: "/images/library-busts.jpg", alt: "" }],
    },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#0f2620",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const fonts = [caslon, publicSans, plexArabic, naskh].map((f) => f.variable).join(" ");

  return (
    <html lang={lang} dir={localeDir(lang)} className={`${fonts} antialiased`} suppressHydrationWarning>
      <body className="flex min-h-svh flex-col">
        <ThemeProvider>
          <a
            href="#contenu"
            className="sr-only z-[60] rounded-lg bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only focus:fixed focus:start-3 focus:top-3"
          >
            {dict.common.skipToContent}
          </a>
          <SiteHeader
            locale={lang}
            name={siteConfig.name[lang]}
            nav={dict.nav}
            common={dict.common}
          />
          <main id="contenu" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <SiteFooter locale={lang} dict={dict} />
        </ThemeProvider>
      </body>
    </html>
  );
}
