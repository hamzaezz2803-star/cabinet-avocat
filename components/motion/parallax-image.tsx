import Image from "next/image";

import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  /** Amplitude du déplacement, en pourcentage de la hauteur (8 par défaut). */
  strength?: number;
  /** Révélation de bas en haut à l'arrivée dans l'écran. */
  reveal?: boolean;
}

/**
 * Photo avec parallaxe verticale légère, animée par GSAP (components/motion/scroll-animations).
 * L'image déborde de ±strength % pour que le déplacement ne laisse jamais de bord vide.
 * Sans JavaScript ou avec mouvement réduit : image fixe.
 */
export function ParallaxImage({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  strength = 8,
  reveal = false,
}: ParallaxImageProps) {
  return (
    <div
      data-parallax={strength}
      data-reveal-clip={reveal ? "" : undefined}
      className={cn("relative overflow-hidden", className)}
    >
      <div
        data-parallax-inner
        className="absolute inset-x-0 will-change-transform"
        style={{ top: `-${strength}%`, bottom: `-${strength}%` }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} quality={80} className={cn("object-cover", imageClassName)} />
      </div>
    </div>
  );
}
