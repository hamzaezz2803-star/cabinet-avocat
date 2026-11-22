import Image from "next/image";
import Link from "next/link";
import { CalendarClock, Languages, MapPin, type LucideIcon } from "lucide-react";

import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/fr";
import { siteConfig } from "@/lib/site-config";

const FACT_ICONS: LucideIcon[] = [MapPin, CalendarClock, Languages];

interface AboutSectionProps {
  locale: Locale;
  t: Dictionary["about"];
}

/**
 * Présentation de l'avocat. Sans photo réelle, un portrait typographique (monogramme)
 * la remplace : aucune photo de banque d'images ne représente l'avocat.
 */
export function AboutSection({ locale, t }: AboutSectionProps) {
  const { photo, credentials } = siteConfig.lawyer;
  const name = siteConfig.name[locale];

  return (
    <section id="a-propos" aria-labelledby="a-propos-title" className="py-24 lg:py-36">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
        <figure className="relative lg:col-span-5">
          <div className="theme-hero relative aspect-[4/5] overflow-hidden rounded-lg bg-background shadow-lift">
            {photo ? (
              <Image
                src={photo}
                alt={t.portraitAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            ) : (
              <>
                <div aria-hidden="true" className="absolute inset-5 rounded-md border border-brass-light/35" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span
                    aria-hidden="true"
                    dir="ltr"
                    className="font-[family-name:var(--font-caslon)] text-[clamp(6rem,16vw,10rem)] leading-none text-brass-light"
                  >
                    {siteConfig.monogram}
                  </span>
                  <span aria-hidden="true" className="mt-6 h-px w-12 bg-brass-light/60" />
                </div>
              </>
            )}
          </div>
          <figcaption className="absolute inset-x-5 bottom-5 rounded-md bg-background/92 px-5 py-4 shadow-lift backdrop-blur-sm sm:inset-x-8 sm:bottom-8">
            <p className="font-heading text-xl leading-tight">{name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t.role}</p>
          </figcaption>
        </figure>

        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHeading id="a-propos-title" title={t.title} />
          <p className="mt-4 font-heading text-2xl text-brass-text">{name}</p>

          <div className="mt-8 max-w-[60ch] space-y-5 text-lg leading-relaxed text-muted-foreground">
            {t.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <h3 className="sr-only">{t.factsTitle}</h3>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-3">
            {t.facts.map((fact, i) => {
              const Icon = FACT_ICONS[i % FACT_ICONS.length];
              return (
                <div key={fact.label} className="bg-card p-5">
                  <Icon aria-hidden="true" className="size-5 text-brass" strokeWidth={1.5} />
                  <dt className="mt-3 text-sm font-medium text-muted-foreground">{fact.label}</dt>
                  <dd className="mt-1 leading-snug">{fact.value}</dd>
                </div>
              );
            })}
          </dl>

          {credentials.length > 0 ? (
            <div className="mt-10">
              <h3 className="text-2xl">{t.credentialsTitle}</h3>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                {credentials.map((item) => (
                  <li key={item.fr} className="border-s-2 border-brass ps-4">
                    {item[locale]}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <Button asChild size="lg" className="mt-10">
            <Link href={`/${locale}#contact`}>{t.cta}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
