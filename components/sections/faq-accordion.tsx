"use client";

import { Accordion as AccordionPrimitive } from "radix-ui";
import { Banknote, CalendarClock, FolderOpen, Plus, ShieldCheck, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  calendar: CalendarClock,
  fees: Banknote,
  secret: ShieldCheck,
  documents: FolderOpen,
};

interface FaqAccordionProps {
  items: { icon: string; question: string; answer: string }[];
}

/**
 * Questions en cartes dépliables (Radix : clavier, aria-expanded, région liée).
 * La carte ouverte passe en surface, avec filet laiton et « + » qui pivote en « × ».
 */
export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <AccordionPrimitive.Root type="single" collapsible defaultValue="faq-0" className="space-y-3">
      {items.map((item, i) => {
        const Icon = ICONS[item.icon] ?? CalendarClock;
        return (
          <AccordionPrimitive.Item
            key={item.question}
            value={`faq-${i}`}
            className="group/item overflow-hidden rounded-lg border bg-background transition-[background-color,border-color,box-shadow] duration-200 data-[state=open]:border-brass/50 data-[state=open]:bg-card data-[state=open]:shadow-lift"
          >
            <AccordionPrimitive.Header>
              <AccordionPrimitive.Trigger className="flex w-full items-center gap-4 p-5 text-start outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring sm:gap-5 sm:p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-brass/35 bg-brass/[0.07] text-brass-text transition-colors duration-200 group-data-[state=open]/item:border-primary group-data-[state=open]/item:bg-primary group-data-[state=open]/item:text-primary-foreground">
                  <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                </span>
                <span className="flex-1 font-heading text-xl leading-snug md:text-[1.375rem]">
                  {item.question}
                </span>
                <span className="grid size-9 shrink-0 place-items-center rounded-full border transition-[transform,border-color] duration-200 group-data-[state=open]/item:rotate-45 group-data-[state=open]/item:border-brass">
                  <Plus aria-hidden="true" className="size-4" strokeWidth={1.75} />
                </span>
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <p className="max-w-[62ch] ps-5 pe-5 pb-6 leading-relaxed text-muted-foreground sm:ps-[5.25rem] sm:pe-16">
                {item.answer}
              </p>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        );
      })}
    </AccordionPrimitive.Root>
  );
}
