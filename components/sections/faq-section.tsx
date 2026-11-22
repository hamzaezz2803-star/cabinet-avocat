import { Mail, MessageCircleQuestion, Phone } from "lucide-react";

import { FaqAccordion } from "@/components/sections/faq-accordion";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n/dictionaries/fr";
import { formatPhoneMa, siteConfig } from "@/lib/site-config";

export function FaqSection({ t }: { t: Dictionary["faq"] }) {
  const { phone, email } = siteConfig;

  return (
    <section id="questions" aria-labelledby="questions-title" className="py-24 lg:py-36">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
            <SectionHeading id="questions-title" title={t.title} intro={t.intro} />

            <aside className="theme-hero relative mt-10 overflow-hidden rounded-lg bg-background p-7 sm:p-8">
              <MessageCircleQuestion
                aria-hidden="true"
                className="absolute -end-6 -top-6 size-36 text-brass-light/10"
                strokeWidth={1}
              />
              <h3 className="relative text-[1.75rem] leading-tight">{t.otherTitle}</h3>
              <p className="relative mt-3 text-muted-foreground">{t.otherText}</p>
              <div className="relative mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <a href={`tel:${phone}`}>
                    <Phone aria-hidden="true" strokeWidth={1.5} />
                    {t.call} <bdi dir="ltr">{formatPhoneMa(phone)}</bdi>
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={`mailto:${email}`}>
                    <Mail aria-hidden="true" strokeWidth={1.5} />
                    {t.write}
                  </a>
                </Button>
              </div>
            </aside>
          </div>
        </div>

        <div className="lg:col-span-7">
          <FaqAccordion items={t.items} />
        </div>
      </div>
    </section>
  );
}
