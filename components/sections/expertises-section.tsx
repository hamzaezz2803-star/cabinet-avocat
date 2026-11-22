import { SectionHeading } from "@/components/sections/section-heading";
import { expertises } from "@/lib/content";

export function ExpertisesSection() {
  return (
    <section id="expertises" aria-labelledby="expertises-title" className="py-24 lg:py-36">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="expertises-title"
            title="Nos domaines d'intervention"
            className="lg:col-span-7"
          />
          <p className="max-w-[46ch] text-lg leading-relaxed text-muted-foreground lg:col-span-5">
            Nous conseillons en amont pour éviter le litige, et nous plaidons lorsque le différend
            ne peut pas se régler autrement.
          </p>
        </div>

        <ul className="mt-16 border-b lg:mt-24">
          {expertises.map((item) => (
            <li
              key={item.id}
              className="grid gap-4 border-t py-8 md:grid-cols-12 md:gap-8 lg:py-10"
            >
              <h3 className="text-2xl leading-tight md:col-span-5 lg:text-[1.875rem]">
                {item.title}
              </h3>
              <p className="max-w-[52ch] text-muted-foreground md:col-span-4">{item.summary}</p>
              <ul
                aria-label={`Exemples de sujets : ${item.title}`}
                className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium text-brass-text md:col-span-3 md:flex-col md:gap-y-1.5"
              >
                {item.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
