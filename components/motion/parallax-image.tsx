"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  /** Amplitude du déplacement, en pourcentage de la hauteur (8 par défaut). */
  strength?: number;
}

/**
 * Photo avec parallaxe verticale légère (transform uniquement).
 * Supprimée si l'utilisateur préfère réduire les animations.
 */
export function ParallaxImage({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  strength = 8,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-x-0"
        style={{
          y: reduce ? 0 : y,
          top: `-${strength}%`,
          bottom: `-${strength}%`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={80}
          className={cn("object-cover", imageClassName)}
        />
      </motion.div>
    </div>
  );
}
