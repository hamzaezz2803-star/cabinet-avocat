import { Mail, Navigation, Phone } from "lucide-react";

import { LocationMap } from "@/components/sections/location-map";
import { OpeningHours } from "@/components/sections/opening-hours";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/fr";
import { formatPhoneMa, fullAddress, siteConfig } from "@/lib/site-config";

interface LocationSectionProps {
  locale: Locale;
  t: Dictionary["location"];
  newTab: string;
}

/** Accès au cabinet : carte (chargée au clic), adresse, itinéraires et jours de réception. */
export function LocationSection({ locale, t, newTab }: LocationSectionProps) {
  const { address, phone, email, schedule, mapQuery } = siteConfig;
  const name = siteConfig.name[locale];
  const addressText = fullAddress(locale);
  const googleRoute = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`;
  const wazeRoute = `https://waze.com/ul?q=${encodeURIComponent(fullAddress("fr"))}&navigate=yes`;
  const linkClass = "font-medium text-foreground underline decoration-brass underline-offset-4";

  return (
    <section id="acces" aria-labelledby="acces-title" className="border-t bg-card py-24 lg:py-36">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading id="acces-title" title={t.title} className="lg:col-span-7" />
          <p className="max-w-[46ch] text-lg leading-relaxed text-muted-foreground lg:col-span-5">{t.intro}</p>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="relative min-h-[22rem] overflow-hidden rounded-lg border sm:min-h-[26rem] lg:col-span-7 lg:min-h-full">
            <LocationMap
              query={mapQuery}
              label={name}
              address={addressText}
              hl={locale}
              labels={{ show: t.mapShow, note: t.mapNote, title: t.mapTitle(name) }}
            />
          </div>

          <div className="flex flex-col gap-10 lg:col-span-5">
            <div>
              <h3 className="text-[1.75rem] leading-tight">{t.addressTitle}</h3>
              <address className="mt-4 text-lg leading-relaxed not-italic">
                {address.street[locale]}
                <br />
                {address.postalCode} {address.city[locale]}, {address.country[locale]}
              </address>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <a href={googleRoute} target="_blank" rel="noopener noreferrer">
                    <Navigation aria-hidden="true" className="rtl:-scale-x-100" strokeWidth={1.5} />
                    {t.routeGoogle}
                    <span className="sr-only"> {newTab}</span>
                  </a>
                </Button>
                <Button asChild variant="ghost">
                  <a href={wazeRoute} target="_blank" rel="noopener noreferrer">
                    {t.routeWaze}
                    <span className="sr-only"> {newTab}</span>
                  </a>
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-[1.75rem] leading-tight">{t.hoursTitle}</h3>
              <div className="mt-5">
                <OpeningHours
                  schedule={schedule}
                  labels={{
                    days: t.days,
                    today: t.today,
                    closed: t.closed,
                    appointmentOnly: t.appointmentOnly,
                    from: t.from("{open}"),
                    range: t.range("{open}", "{close}"),
                  }}
                />
              </div>
              <ul className="mt-5 space-y-2 text-[0.9375rem] text-muted-foreground">
                <li className="flex flex-wrap items-center gap-2">
                  <Phone aria-hidden="true" className="size-4 shrink-0 text-brass" strokeWidth={1.5} />
                  {t.forAppointment}
                  <a href={`tel:${phone}`} className={linkClass}>
                    <bdi dir="ltr">{formatPhoneMa(phone)}</bdi>
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail aria-hidden="true" className="size-4 shrink-0 text-brass" strokeWidth={1.5} />
                  <a href={`mailto:${email}`} className={`${linkClass} break-all`}>
                    <bdi dir="ltr">{email}</bdi>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
