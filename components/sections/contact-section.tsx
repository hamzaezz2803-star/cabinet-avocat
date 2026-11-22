import { CalendarClock, Info, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";

import { ContactForm } from "@/components/sections/contact-form";
import { SectionHeading } from "@/components/sections/section-heading";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/fr";
import { formatPhoneMa, fullAddress, siteConfig } from "@/lib/site-config";

interface ContactLine {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
}

interface ContactSectionProps {
  locale: Locale;
  t: Dictionary["contact"];
  expertises: Dictionary["expertises"]["items"];
}

export function ContactSection({ locale, t, expertises }: ContactSectionProps) {
  const { phone, email } = siteConfig;
  const linkClass = "underline decoration-brass underline-offset-4";
  const topics = [
    ...expertises.map((e) => ({ value: e.id, label: e.title })),
    { value: "autre", label: t.form.otherTopic },
  ];

  const lines: ContactLine[] = [
    { icon: MapPin, label: t.labels.address, value: fullAddress(locale) },
    {
      icon: Phone,
      label: t.labels.phone,
      value: (
        <a href={`tel:${phone}`} className={linkClass}>
          <bdi dir="ltr">{formatPhoneMa(phone)}</bdi>
        </a>
      ),
    },
    {
      icon: Mail,
      label: t.labels.email,
      value: (
        <a href={`mailto:${email}`} className={`${linkClass} break-all`}>
          <bdi dir="ltr">{email}</bdi>
        </a>
      ),
    },
    { icon: CalendarClock, label: t.labels.hours, value: t.hoursSummary },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t bg-secondary py-24 lg:py-36">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading id="contact-title" title={t.title} intro={t.intro} />

          <p className="mt-8 flex max-w-[46ch] items-start gap-3 border-s-2 border-brass ps-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brass" strokeWidth={1.75} />
            {t.warning}
          </p>

          <dl data-reveal-group className="mt-12 space-y-5">
            {lines.map(({ icon: Icon, label, value }) => (
              <div key={label} data-reveal-item className="grid grid-cols-[1.25rem_1fr] gap-x-4">
                <Icon aria-hidden="true" className="mt-1 size-5 text-brass" strokeWidth={1.5} />
                <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
                <dd className="col-start-2 text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-reveal className="lg:col-span-7">
          <ContactForm locale={locale} t={t.form} topics={topics} />
        </div>
      </div>
    </section>
  );
}
