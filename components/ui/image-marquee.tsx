"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { Pause, Play } from "lucide-react";

import { cn } from "@/lib/utils";

export interface MarqueeImage {
  src: string;
  alt: string;
}

interface ImageMarqueeProps {
  images: MarqueeImage[];
  className?: string;
  style?: CSSProperties;
}

const TILTS = ["-2deg", "2.5deg", "-1deg", "1.5deg"];

/**
 * Bandeau photo à défilement continu.
 * Animation CSS (transform uniquement), en pause au survol, au focus
 * et via un bouton (WCAG 2.2.2). Arrêtée par `prefers-reduced-motion`.
 */
export function ImageMarquee({ images, className, style }: ImageMarqueeProps) {
  const [paused, setPaused] = useState(false);

  // Première copie décorative, seconde copie annoncée : la piste part de -50 %,
  // c'est donc la seconde qui est visible au chargement.
  const track = [
    ...images.map((image, i) => ({ ...image, key: `a-${i}`, decorative: true })),
    ...images.map((image, i) => ({ ...image, key: `b-${i}`, decorative: false })),
  ];

  return (
    <div className={cn("relative w-full pb-[clamp(0.5rem,2vh,1.5rem)]", className)} style={style}>
      <div
        className="group overflow-hidden py-[clamp(0.75rem,2vh,1.5rem)] [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]"
      >
        <ul
          aria-label="Photographies du cabinet et du monde juridique"
          className="flex w-max animate-marquee gap-5 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] md:gap-7"
          style={{ animationPlayState: paused ? "paused" : undefined }}
        >
          {track.map((image, index) => (
            <li
              key={image.key}
              aria-hidden={image.decorative || undefined}
              className="relative aspect-[3/4] h-[clamp(7.5rem,21vh,16rem)] shrink-0 overflow-hidden rounded-md bg-stone shadow-lift"
              style={{ rotate: TILTS[index % TILTS.length] }}
            >
              <Image
                src={image.src}
                alt={image.decorative ? "" : image.alt}
                fill
                sizes="192px"
                quality={70}
                loading={image.decorative ? "lazy" : "eager"}
                className="object-cover saturate-[0.85]"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute right-3 bottom-1 md:right-6">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Reprendre le défilement des photos" : "Mettre en pause le défilement des photos"}
          className="inline-flex size-11 items-center justify-center rounded-lg border bg-background/90 text-muted-foreground shadow-lift transition-colors duration-150 hover:text-foreground"
        >
          {paused ? (
            <Play aria-hidden="true" className="size-4" strokeWidth={1.5} />
          ) : (
            <Pause aria-hidden="true" className="size-4" strokeWidth={1.5} />
          )}
        </button>
      </div>
    </div>
  );
}
