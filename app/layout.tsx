import type { Metadata, Viewport } from "next";
import { Libre_Caslon_Display, Public_Sans } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Conseil et défense juridique`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Conseil et défense juridique`,
    description: siteConfig.description,
    images: [{ url: "/images/library-busts.jpg", alt: "" }],
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#f6f6f3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${caslon.variable} ${publicSans.variable} antialiased`}>
      <body className="flex min-h-svh flex-col">
        <a
          href="#contenu"
          className="sr-only z-[60] rounded-lg bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Aller au contenu
        </a>
        <SiteHeader />
        <main id="contenu" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
