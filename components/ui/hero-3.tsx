import Link from "next/link";

import { HeroVeil } from "@/components/ui/hero-veil";
import { Button } from "@/components/ui/button";
import { ImageMarquee, type MarqueeImage } from "@/components/ui/image-marquee";
import { cn } from "@/lib/utils";

/**
 * Héros « marquee » inspiré du composant hero-3 (21st.dev), adapté aux règles du projet :
 * - tient dans la hauteur de l'écran, bandeau photo compris (tailles en fonction de vh) ;
 * - fond DarkVeil (React Bits) aux couleurs du cabinet ;
 * - entrée en CSS (visible sans JavaScript, sans retarder le LCP) ;
 * - bandeau pausable, `alt` descriptifs, mouvement coupé si `prefers-reduced-motion`.
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
        "relative isolate flex h-svh min-h-[34rem] flex-col overflow-hidden pt-(--header-height)",
        className
      )}
    >
      <HeroVeil />

      <div className="container-site flex min-h-0 flex-1 flex-col items-center justify-center py-[clamp(0.75rem,3vh,2.5rem)] text-center">
        <p className="flex animate-rise items-center gap-3 text-sm font-medium text-brass-text md:text-[0.9375rem]">
          <span aria-hidden="true" className="h-px w-8 bg-brass" />
          {tagline}
          <span aria-hidden="true" className="h-px w-8 bg-brass" />
        </p>

        <h1
          id="hero-title"
          className="mt-[clamp(0.75rem,2.2vh,1.5rem)] max-w-[19ch] text-[clamp(2.125rem,min(7.4vw,7.6vh),5.25rem)] leading-[1.03] tracking-[-0.01em]"
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
          className="mt-[clamp(0.75rem,2.4vh,1.75rem)] max-w-[58ch] animate-rise text-base leading-relaxed text-muted-foreground md:text-lg"
          style={{ animationDelay: `${afterTitle}ms` }}
        >
          {description}
        </p>

        <div
          className="mt-[clamp(1rem,3.4vh,2.5rem)] flex animate-rise items-center gap-6"
          style={{ animationDelay: `${afterTitle + 120}ms` }}
        >
          <Button asChild size="lg">
            <Link href={ctaHref}>{ctaText}</Link>
          </Button>
          {secondaryText && secondaryHref ? (
            <Button asChild variant="link" size="lg" className="hidden sm:inline-flex">
              <Link href={secondaryHref}>{secondaryText}</Link>
            </Button>
          ) : null}
        </div>
      </div>

      <ImageMarquee
        images={images}
        className="shrink-0 animate-rise"
        style={{ animationDelay: `${afterTitle + 240}ms` }}
      />
    </section>
  );
}
