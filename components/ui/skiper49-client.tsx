"use client";

import dynamic from "next/dynamic";

/**
 * Swiper lit l'horloge pendant son initialisation : il ne peut pas être pré-rendu
 * avec cacheComponents. Le carrousel est donc monté côté client uniquement,
 * avec un espace réservé de même hauteur (pas de décalage de mise en page).
 */
export const Carousel003Client = dynamic(
  () => import("@/components/ui/skiper49").then((m) => m.Carousel_003),
  {
    ssr: false,
    loading: () => (
      <div aria-hidden="true" className="flex flex-col items-center">
        <div className="mt-4 aspect-[4/5] w-[clamp(14rem,62vw,20rem)] animate-pulse rounded-lg bg-stone/60" />
        <div className="mt-[6.25rem] h-11" />
      </div>
    ),
  }
);
