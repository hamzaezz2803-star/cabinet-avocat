import { SectionHeading } from "@/components/sections/section-heading";

interface MethodSectionProps {
  t: {
    title: string;
    intro: string;
    stepLabel: string;
    steps: { title: string; text: string }[];
  };
}

/**
 * Méthode : vraie séquence, donc numérotée. La frise se trace au défilement et les étapes
 * apparaissent en cascade (GSAP, data-draw / data-reveal-group). Sans JS : frise pleine.
 */
export function MethodSection({ t }: MethodSectionProps) {
  return (
    <section id="methode" aria-labelledby="methode-title" className="theme-ink py-24 lg:py-36">
      <div className="container-site">
        <SectionHeading id="methode-title" title={t.title} intro={t.intro} />

        <ol data-reveal-group className="relative mt-16 grid gap-12 lg:mt-24 lg:grid-cols-4 lg:gap-10">
          {/* Frise : verticale sur mobile, horizontale au bureau (sens de lecture respecté). */}
          <span
            aria-hidden="true"
            className="absolute start-[0.6875rem] top-2 bottom-2 w-px bg-border lg:start-0 lg:end-0 lg:top-[0.6875rem] lg:bottom-auto lg:h-px lg:w-auto"
          />
          <span
            aria-hidden="true"
            data-draw="y"
            className="absolute start-[0.6875rem] top-2 bottom-2 w-px origin-top bg-brass-light lg:hidden"
          />
          <span
            aria-hidden="true"
            data-draw="x"
            className="absolute start-0 end-0 top-[0.6875rem] hidden h-px origin-left bg-brass-light lg:block rtl:origin-right"
          />

          {t.steps.map((step, i) => (
            <li
              key={step.title}
              data-reveal-item
              className="relative grid grid-cols-[1.5rem_1fr] gap-x-6 lg:block"
            >
              <span
                aria-hidden="true"
                className="relative z-10 grid size-6 place-items-center rounded-full border border-brass-light bg-background"
              >
                <span className="size-1.5 rounded-full bg-brass-light" />
              </span>
              <div className="lg:mt-10">
                <p className="font-[family-name:var(--font-caslon)] text-[2.75rem] leading-none text-brass-light">
                  <span className="sr-only">{t.stepLabel} </span>
                  {i + 1}
                </p>
                <h3 className="mt-4 text-2xl leading-snug">{step.title}</h3>
                <p className="mt-3 max-w-[40ch] text-muted-foreground">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
