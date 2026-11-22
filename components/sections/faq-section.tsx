import Link from "next/link";

import { SectionHeading } from "@/components/sections/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/content";

export function FaqSection() {
  return (
    <section id="questions" aria-labelledby="questions-title" className="py-24 lg:py-36">
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="questions-title" title="Questions fréquentes" />
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-muted-foreground">
            Une autre question ?{" "}
            <Link
              href="/#contact"
              className="text-foreground underline decoration-brass underline-offset-[6px] hover:decoration-2"
            >
              Écrivez au cabinet
            </Link>
            .
          </p>
        </div>

        <Accordion type="single" collapsible className="border-t lg:col-span-7">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.question} value={`faq-${i}`} className="border-b">
              <AccordionTrigger className="min-h-16 items-center gap-6 rounded-none py-5 font-heading text-xl leading-snug font-normal hover:no-underline md:text-[1.375rem] **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-brass">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="max-w-[62ch] pb-6 text-base leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
