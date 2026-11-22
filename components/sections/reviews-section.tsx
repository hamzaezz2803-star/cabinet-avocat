import { BadgeCheck, ExternalLink, MessageSquareReply, Quote, Star } from "lucide-react";

import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { intlLocale, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/fr";
import { siteConfig, type GoogleReview } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const AVATAR_TONES = [
  "bg-primary text-primary-foreground",
  "bg-brass text-paper",
  "bg-foreground text-background",
];

/** Étoiles avec remplissage partiel (4,3 → 4 étoiles et 30 %). La note est aussi écrite en texte. */
function Stars({ rating, className }: { rating: number; className?: string }) {
  const row = (filled: boolean) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className="size-5 shrink-0"
        strokeWidth={1.5}
        fill={filled ? "currentColor" : "none"}
      />
    ));
  return (
    <span aria-hidden="true" dir="ltr" className={cn("relative inline-flex text-brass", className)}>
      <span className="flex gap-1 opacity-40">{row(false)}</span>
      <span className="absolute inset-y-0 left-0 flex gap-1 overflow-hidden" style={{ width: `${(rating / 5) * 100}%` }}>
        {row(true)}
      </span>
    </span>
  );
}

function ReviewCard({
  review,
  index,
  t,
}: {
  review: GoogleReview;
  index: number;
  t: Dictionary["reviews"];
}) {
  const text = t.showTranslation ? review.translationEn : review.original;
  const isOriginalFrench = !t.showTranslation;
  const response = review.ownerResponse
    ? t.showTranslation
      ? review.ownerResponse.translationEn
      : review.ownerResponse.original
    : null;

  return (
    <li className="flex flex-col rounded-lg border bg-card p-6 shadow-lift transition-colors duration-200 hover:border-brass/40 sm:p-7">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-full text-lg font-semibold",
            AVATAR_TONES[index % AVATAR_TONES.length]
          )}
        >
          {review.initial}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold">
            <bdi>{review.author}</bdi>
          </p>
          <p className="flex flex-wrap items-center gap-x-1.5 text-sm text-muted-foreground">
            {review.localGuide ? (
              <>
                <BadgeCheck aria-hidden="true" className="size-4 text-brass" strokeWidth={1.75} />
                <span>{t.localGuide}</span>
                <span aria-hidden="true">·</span>
              </>
            ) : null}
            <span>{t.authorReviews(review.authorReviews)}</span>
          </p>
        </div>
        <Quote aria-hidden="true" className="size-6 shrink-0 text-brass/60" strokeWidth={1.5} />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        <span>Google</span> <span aria-hidden="true">·</span> <span>{review.year}</span>
      </p>

      <blockquote className="mt-3 flex-1">
        <p
          lang={isOriginalFrench ? "fr" : "en"}
          dir="auto"
          className="font-[family-name:var(--font-caslon)] text-2xl leading-snug"
        >
          {t.showTranslation ? `“${text}”` : `« ${text} »`}
        </p>
      </blockquote>

      {t.showTranslation && t.translatedBy ? (
        <p className="mt-3 text-sm text-muted-foreground">
          {t.translatedBy}. {t.originalLanguageNote}.
        </p>
      ) : null}
      {!t.showTranslation && t.originalLanguageNote ? (
        <p className="mt-3 text-sm text-muted-foreground">{t.originalLanguageNote}</p>
      ) : null}

      {response ? (
        <div className="mt-5 rounded-md bg-secondary p-4">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <MessageSquareReply aria-hidden="true" className="size-4 text-brass" strokeWidth={1.5} />
            {t.ownerResponse}
          </p>
          <p lang={isOriginalFrench ? "fr" : "en"} dir="auto" className="mt-1 text-muted-foreground">
            {response}
          </p>
        </div>
      ) : null}
    </li>
  );
}

export function ReviewsSection({ locale, t }: { locale: Locale; t: Dictionary["reviews"] }) {
  const { rating, count, url, items } = siteConfig.reviews;
  const ratingText = rating.toLocaleString(intlLocale[locale], {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <section id="avis" aria-labelledby="avis-title" className="py-24 lg:py-36">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading id="avis-title" title={t.title} intro={t.intro} className="lg:col-span-6" />

          <div className="flex flex-col gap-5 rounded-lg border bg-card p-6 sm:flex-row sm:items-center sm:justify-between lg:col-span-6 lg:p-7">
            <div className="flex items-center gap-5">
              <p className="font-[family-name:var(--font-caslon)] text-6xl leading-none">
                <bdi dir="ltr">{ratingText}</bdi>
                <span className="sr-only">
                  {" "}
                  {t.outOf}
                </span>
              </p>
              <div>
                <Stars rating={rating} />
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {t.outOf}, {t.basedOn(count)}
                </p>
              </div>
            </div>
            <Button asChild variant="outline">
              <a href={url} target="_blank" rel="noopener noreferrer">
                {t.seeAll}
                <ExternalLink aria-hidden="true" className="rtl:-scale-x-100" strokeWidth={1.5} />
              </a>
            </Button>
          </div>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {items.map((review, i) => (
            <ReviewCard key={review.author} review={review} index={i} t={t} />
          ))}
        </ul>
      </div>
    </section>
  );
}
