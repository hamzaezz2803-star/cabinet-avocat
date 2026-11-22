import Link from "next/link";

import { Brand } from "@/components/layout/brand";
import { navItems } from "@/components/layout/nav-items";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/fr";
import { formatPhoneMa, siteConfig } from "@/lib/site-config";

interface SiteFooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function SiteFooter({ locale, dict }: SiteFooterProps) {
  const { address, phone, email, legal } = siteConfig;
  const t = dict.footer;
  const legalLinks = [
    { label: dict.legal.links.mentions, href: `/${locale}/mentions-legales` },
    { label: dict.legal.links.terms, href: `/${locale}/conditions-utilisation` },
  ];
  const linkClass = "inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground";

  return (
    <footer className="theme-ink">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Brand locale={locale} name={siteConfig.name[locale]} />
          <p className="mt-6 max-w-[38ch] text-muted-foreground">{t.tagline}</p>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-sans text-sm font-semibold text-brass-light">{t.contactTitle}</h2>
          <address className="mt-4 space-y-1 text-muted-foreground not-italic">
            <p>{address.street[locale]}</p>
            <p>
              {address.postalCode} {address.city[locale]}, {address.country[locale]}
            </p>
            <p className="pt-3">
              <a href={`tel:${phone}`} className="hover:text-foreground">
                <bdi dir="ltr">{formatPhoneMa(phone)}</bdi>
              </a>
            </p>
            <p>
              <a href={`mailto:${email}`} className="break-all hover:text-foreground">
                <bdi dir="ltr">{email}</bdi>
              </a>
            </p>
          </address>
        </div>

        <nav aria-label={t.siteTitle} className="lg:col-span-2">
          <h2 className="font-sans text-sm font-semibold text-brass-light">{t.siteTitle}</h2>
          <ul className="mt-2">
            {navItems(locale, dict.nav).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.legalTitle} className="lg:col-span-3">
          <h2 className="font-sans text-sm font-semibold text-brass-light">{t.legalTitle}</h2>
          <ul className="mt-2">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t">
        <div className="container-site flex flex-col gap-2 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>{t.ids(legal.ice ?? dict.common.toComplete, legal.rc ?? dict.common.toComplete)}</p>
        </div>
      </div>
    </footer>
  );
}
