import { Clock, Info, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";

import { ContactForm } from "@/components/sections/contact-form";
import { SectionHeading } from "@/components/sections/section-heading";
import { contact } from "@/lib/content";
import { formatPhoneMa, siteConfig, TO_COMPLETE } from "@/lib/site-config";

interface ContactLine {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
}

export function ContactSection() {
  const { address, phone, email, hours } = siteConfig;
  const fullAddress = [address.street, [address.postalCode, address.city].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(", ");

  const lines: ContactLine[] = [
    { icon: MapPin, label: "Adresse", value: fullAddress || TO_COMPLETE },
    {
      icon: Phone,
      label: "Téléphone",
      value: phone ? (
        <a href={`tel:${phone}`} className="underline decoration-brass underline-offset-4">
          {formatPhoneMa(phone)}
        </a>
      ) : (
        TO_COMPLETE
      ),
    },
    {
      icon: Mail,
      label: "E-mail",
      value: email ? (
        <a href={`mailto:${email}`} className="underline decoration-brass underline-offset-4">
          {email}
        </a>
      ) : (
        TO_COMPLETE
      ),
    },
    { icon: Clock, label: "Horaires", value: hours ?? TO_COMPLETE },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-t bg-secondary py-24 lg:py-36"
    >
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading id="contact-title" title={contact.title} intro={contact.intro} />

          <p className="mt-8 flex max-w-[46ch] items-start gap-3 border-l-2 border-brass pl-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brass" strokeWidth={1.75} />
            {contact.warning}
          </p>

          <dl className="mt-12 space-y-5">
            {lines.map(({ icon: Icon, label, value }) => (
              <div key={label} className="grid grid-cols-[1.25rem_1fr] gap-x-4">
                <Icon aria-hidden="true" className="mt-1 size-5 text-brass" strokeWidth={1.5} />
                <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
                <dd className="col-start-2 text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
