import { Mail, Navigation, Phone } from "lucide-react";

import { LocationMap } from "@/components/sections/location-map";
import { OpeningHours } from "@/components/sections/opening-hours";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { formatPhoneMa, siteConfig } from "@/lib/site-config";

/** Accès au cabinet : carte (chargée au clic), adresse, itinéraires et jours d'ouverture. */
export function LocationSection() {
  const { address, phone, email, schedule, mapQuery, accessNote, name } = siteConfig;
  const cityLine = [address.postalCode, address.city].filter(Boolean).join(" ");
  const fullAddress = [address.street, cityLine].filter(Boolean).join(", ");
  const destination = encodeURIComponent(mapQuery);
  const googleRoute = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
  const wazeRoute = `https://waze.com/ul?q=${encodeURIComponent(fullAddress)}&navigate=yes`;

  return (
    <section id="acces" aria-labelledby="acces-title" className="border-t bg-card py-24 lg:py-36">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading id="acces-title" title="Venir au cabinet" className="lg:col-span-7" />
          <p className="max-w-[46ch] text-lg leading-relaxed text-muted-foreground lg:col-span-5">
            Le cabinet, en plein centre de Casablanca, reçoit uniquement sur rendez-vous le mardi,
            le mercredi et le jeudi. Appelez ou écrivez pour fixer un créneau.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="relative min-h-[22rem] overflow-hidden rounded-lg border sm:min-h-[26rem] lg:col-span-7 lg:min-h-full">
            <LocationMap query={mapQuery} label={name} address={fullAddress} />
          </div>

          <div className="flex flex-col gap-10 lg:col-span-5">
            <div>
              <h3 className="text-[1.75rem] leading-tight">Adresse</h3>
              <address className="mt-4 text-lg leading-relaxed not-italic">
                {address.street}
                <br />
                {cityLine}, {address.country}
              </address>
              {accessNote ? (
                <p className="mt-2 text-[0.9375rem] text-muted-foreground">{accessNote}</p>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <a href={googleRoute} target="_blank" rel="noopener noreferrer">
                    <Navigation aria-hidden="true" strokeWidth={1.5} />
                    Itinéraire Google Maps
                    <span className="sr-only">(nouvel onglet)</span>
                  </a>
                </Button>
                <Button asChild variant="ghost">
                  <a href={wazeRoute} target="_blank" rel="noopener noreferrer">
                    Ouvrir dans Waze
                    <span className="sr-only">(nouvel onglet)</span>
                  </a>
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-[1.75rem] leading-tight">Jours de réception</h3>
              <div className="mt-5">
                <OpeningHours schedule={schedule} />
              </div>
              <ul className="mt-5 space-y-2 text-[0.9375rem] text-muted-foreground">
                {phone ? (
                  <li className="flex items-center gap-2">
                    <Phone aria-hidden="true" className="size-4 shrink-0 text-brass" strokeWidth={1.5} />
                    Pour un rendez-vous :{" "}
                    <a
                      href={`tel:${phone}`}
                      className="font-medium text-foreground underline decoration-brass underline-offset-4"
                    >
                      {formatPhoneMa(phone)}
                    </a>
                  </li>
                ) : null}
                {email ? (
                  <li className="flex items-center gap-2">
                    <Mail aria-hidden="true" className="size-4 shrink-0 text-brass" strokeWidth={1.5} />
                    <a
                      href={`mailto:${email}`}
                      className="font-medium break-all text-foreground underline decoration-brass underline-offset-4"
                    >
                      {email}
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
