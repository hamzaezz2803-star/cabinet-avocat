import type { Locale } from "@/lib/i18n/config";
import type { Dictionary, LegalFacts, LegalSection } from "@/lib/i18n/dictionaries/fr";
import { formatPhoneMa, fullAddress, siteConfig } from "@/lib/site-config";

export type LegalKey = "mentions" | "terms";

/** Faits du cabinet injectés dans les textes légaux (jamais inventés : null → « à compléter »). */
export function legalFacts(locale: Locale): LegalFacts {
  const { legal } = siteConfig;
  return {
    name: siteConfig.name[locale],
    address: fullAddress(locale),
    phone: formatPhoneMa(siteConfig.phone),
    email: siteConfig.email,
    bar: siteConfig.bar,
    legalForm: legal.legalForm,
    ice: legal.ice,
    rc: legal.rc,
    director: legal.publicationDirector,
    host: legal.host,
  };
}

interface LegalPageProps {
  locale: Locale;
  dict: Dictionary;
  page: LegalKey;
}

/** Gabarit des pages légales : colonne de lecture unique, typographie sobre. */
export function LegalPage({ locale, dict, page }: LegalPageProps) {
  const sections: LegalSection[] = dict.legal[page].sections(legalFacts(locale));

  return (
    <article className="container-site pt-[calc(var(--header-height)+4rem)] pb-24 lg:pb-32">
      <header className="max-w-[44rem] border-b pb-10">
        <h1 className="text-[2.5rem] leading-[1.06] sm:text-5xl lg:text-6xl">{dict.legal.links[page]}</h1>
        <p className="mt-6 text-sm text-muted-foreground">{dict.legal.updated}</p>
        <p className="mt-4 rounded-lg border border-warning/40 bg-warning/[0.06] p-4 text-sm text-warning">
          {dict.legal.draft}
        </p>
      </header>
      <div className="mt-10 max-w-[44rem] space-y-5 text-[1.0625rem] leading-[1.75] text-foreground/90">
        {sections.map((section) => (
          <section key={section.heading} className="space-y-4">
            <h2 className="pt-6 text-[1.75rem] leading-tight">{section.heading}</h2>
            {section.paragraphs?.map((p) => <p key={p}>{p}</p>)}
            {section.list ? (
              <ul className="ms-5 list-disc space-y-2">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}
