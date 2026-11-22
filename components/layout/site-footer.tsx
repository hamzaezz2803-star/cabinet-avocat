import Link from "next/link";

import { Brand } from "@/components/layout/brand";
import { navItems } from "@/lib/content";
import { formatPhoneMa, siteConfig, TO_COMPLETE } from "@/lib/site-config";

const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
  { label: "Politique de cookies", href: "/cookies" },
  { label: "Conditions d'utilisation", href: "/conditions-utilisation" },
];

async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  const { address, phone, email, legal } = siteConfig;
  const city = [address.postalCode, address.city].filter(Boolean).join(" ");

  return (
    <footer className="theme-ink">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Brand />
          <p className="mt-6 max-w-[38ch] text-muted-foreground">
            Conseil et défense juridique pour les entreprises et les particuliers.
          </p>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-sans text-sm font-semibold text-brass-light">Coordonnées</h2>
          <address className="mt-4 space-y-1 text-muted-foreground not-italic">
            <p>{address.street ?? `Adresse ${TO_COMPLETE}`}</p>
            {city ? <p>{city}</p> : null}
            <p>{address.country}</p>
            <p className="pt-3">
              {phone ? (
                <a href={`tel:${phone}`} className="hover:text-foreground">
                  {formatPhoneMa(phone)}
                </a>
              ) : (
                `Téléphone ${TO_COMPLETE}`
              )}
            </p>
            <p>
              {email ? (
                <a href={`mailto:${email}`} className="hover:text-foreground">
                  {email}
                </a>
              ) : (
                `E-mail ${TO_COMPLETE}`
              )}
            </p>
          </address>
        </div>

        <nav aria-label="Plan du site" className="lg:col-span-2">
          <h2 className="font-sans text-sm font-semibold text-brass-light">Le site</h2>
          <ul className="mt-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Informations légales" className="lg:col-span-3">
          <h2 className="font-sans text-sm font-semibold text-brass-light">Informations légales</h2>
          <ul className="mt-2">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t">
        <div className="container-site flex flex-col gap-2 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © <CopyrightYear /> {siteConfig.name}. Tous droits réservés.
          </p>
          <p>
            ICE : {legal.ice ?? TO_COMPLETE}. RC : {legal.rc ?? TO_COMPLETE}.
          </p>
        </div>
      </div>
    </footer>
  );
}
