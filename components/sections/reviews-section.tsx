import { ExternalLink, Star } from "lucide-react";

import { SectionHeading } from "@/components/sections/section-heading";
import { reviews } from "@/lib/content";

const formatRating = (value: number) =>
  value.toLocaleString("fr-MA", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** Avis réels issus de la fiche Google, avec la note, le nombre d'avis et la source. */
export function ReviewsSection() {
  const rating = formatRating(reviews.rating);
  const fullStars = Math.round(reviews.rating);

  return (
    <section id="avis" aria-labelledby="avis-title" className="py-24 lg:py-36">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading id="avis-title" title={reviews.title} />

          <div className="mt-10 flex items-end gap-4">
            <p className="font-heading text-[4.5rem] leading-[0.85]">{rating}</p>
            <div>
              <div className="flex gap-1" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className="size-4 text-brass"
                    strokeWidth={1.5}
                    fill={i < fullStars ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                sur 5, d&apos;après {reviews.count} avis {reviews.source}
                <span className="sr-only"> (relevé en {reviews.retrievedAt})</span>
              </p>
            </div>
          </div>

          <a
            href={reviews.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-11 items-center gap-2 text-foreground underline decoration-brass underline-offset-[6px] hover:decoration-2"
          >
            Voir tous les avis sur Google
            <ExternalLink aria-hidden="true" className="size-4 text-brass" strokeWidth={1.5} />
            <span className="sr-only">(nouvel onglet)</span>
          </a>
        </div>

        <ul className="border-t lg:col-span-7 lg:col-start-6">
          {reviews.items.map((review) => (
            <li key={review.author} className="border-b py-8 lg:py-10">
              <figure>
                <blockquote className="font-heading text-[1.75rem] leading-snug lg:text-[2.25rem]">
                  <p>« {review.text} »</p>
                </blockquote>
                <figcaption className="mt-4 text-sm text-muted-foreground">
                  {review.author}, avis {reviews.source}, {review.date}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
