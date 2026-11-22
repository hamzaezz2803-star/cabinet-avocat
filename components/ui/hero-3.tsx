import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { ImageMarquee, type MarqueeImage } from "@/components/ui/image-marquee";
import { cn } from "@/lib/utils";

/**
 * Héros « marquee » inspiré du composant hero-3 (21st.dev), adapté aux règles du projet :
 * - entrée en CSS (visible sans JavaScript, sans retarder le LCP) ;
 * - bouton à rayon 8 px, couleurs issues des jetons ;
 * - bandeau photo dans le flux (aucun chevauchement du texte), pausable, `alt` descriptifs ;
 * - mouvement coupé si `prefers-reduced-motion`.
 */
export interface AnimatedMarqueeHeroProps {
  tagline: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  secondaryText?: string;
  secondaryHref?: string;
  images: MarqueeImage[];
  className?: string;
  children?: ReactNode;
}

const STAGGER_MS = 55;

export function AnimatedMarqueeHero({
  tagline,
  title,
  description,
  ctaText,
  ctaHref,
  secondaryText,
  secondaryHref,
  images,
  className,
}: AnimatedMarqueeHeroProps) {
  const words = title.split(" ");
  const afterTitle = 250 + words.length * STAGGER_MS;

  return (
    <section
      aria-labelledby="hero-title"
      className={cn(
        "relative flex min-h-[100svh] flex-col overflow-x-clip pt-(--header-height)",
        className
      )}
    >
      <div className="container-site flex flex-1 flex-col items-center justify-center py-14 text-center md:py-20">
        <p className="flex animate-rise items-center gap-3 text-sm font-medium text-brass-text md:text-[0.9375rem]">
          <span aria-hidden="true" className="hidden h-px w-8 bg-brass sm:block" />
          {tagline}
          <span aria-hidden="true" className="hidden h-px w-8 bg-brass sm:block" />
        </p>

        <h1
          id="hero-title"
          className="mt-6 max-w-[19ch] text-[2.625rem] leading-[1.04] tracking-[-0.01em] sm:text-6xl lg:text-[5.25rem] lg:leading-[1.02]"
        >
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="inline-block animate-rise"
              style={{ animationDelay: `${150 + i * STAGGER_MS}ms` }}
            >
              {word}
              {i < words.length - 1 ? " " : null}
            </span>
          ))}
        </h1>

        <p
          className="mt-7 max-w-[58ch] animate-rise text-lg leading-relaxed text-muted-foreground md:text-xl"
          style={{ animationDelay: `${afterTitle}ms` }}
        >
          {description}
        </p>

        <div
          className="mt-10 flex animate-rise flex-col items-center gap-4 sm:flex-row sm:gap-6"
          style={{ animationDelay: `${afterTitle + 120}ms` }}
        >
          <Button asChild size="lg">
            <Link href={ctaHref}>{ctaText}</Link>
          </Button>
          {secondaryText && secondaryHref ? (
            <Button asChild variant="link" size="lg">
              <Link href={secondaryHref}>{secondaryText}</Link>
            </Button>
          ) : null}
        </div>
      </div>

      <ImageMarquee
        images={images}
        className="animate-rise"
        style={{ animationDelay: `${afterTitle + 240}ms` }}
      />
    </section>
  );
}
