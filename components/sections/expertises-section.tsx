import {
  BriefcaseBusiness,
  Building2,
  Gavel,
  House,
  Scale,
  Users,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/sections/section-heading";
import type { Dictionary } from "@/lib/i18n/dictionaries/fr";

/** Une icône qui évoque chaque domaine (Lucide, trait 1.5). */
const ICONS: Record<string, LucideIcon> = {
  affaires: Building2,
  contentieux: Gavel,
  immobilier: House,
  travail: BriefcaseBusiness,
  famille: Users,
  penal: Scale,
};

export function ExpertisesSection({ t }: { t: Dictionary["expertises"] }) {
  return (
    <section
      id="expertises"
      aria-labelledby="expertises-title"
      className="border-t bg-secondary py-24 lg:py-36"
    >
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading id="expertises-title" title={t.title} className="lg:col-span-7" />
          <p className="max-w-[46ch] text-lg leading-relaxed text-muted-foreground lg:col-span-5">
            {t.intro}
          </p>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {t.items.map((item) => {
            const Icon = ICONS[item.id] ?? Scale;
            return (
              <li
                key={item.id}
                className="group relative flex flex-col bg-background p-7 transition-colors duration-200 hover:bg-card sm:p-8 lg:p-10"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brass transition-transform duration-200 group-hover:scale-x-100 rtl:origin-right"
                />
                <span className="grid size-14 place-items-center rounded-lg border border-brass/35 bg-brass/[0.07] text-brass-text transition-colors duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon aria-hidden="true" className="size-6" strokeWidth={1.5} />
                </span>
                <h3 className="mt-8 text-[1.625rem] leading-tight">{item.title}</h3>
                <p className="mt-3 text-muted-foreground">{item.summary}</p>
                <ul
                  aria-label={t.topicsLabel}
                  className="mt-auto flex flex-wrap gap-2 pt-7"
                >
                  {item.topics.map((topic) => (
                    <li
                      key={topic}
                      className="rounded-sm border px-2.5 py-1 text-sm text-muted-foreground"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
