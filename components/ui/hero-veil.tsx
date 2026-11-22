"use client";

import { DarkVeil } from "@/components/ui/dark-veil";

/**
 * Fond du héros : DarkVeil en mode clair, teinté vert bouteille (jeton --bottle),
 * discret pour garder le contraste du texte. Purement décoratif.
 */
export function HeroVeil() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <DarkVeil
        lightMode
        color="#1e4a3d"
        speed={0.35}
        scale={1.15}
        rotation={-12}
        glow={0.3}
        grain={0.02}
        sheen={0.6}
        mouseStrength={0.6}
        opacity={0.42}
        fade={0.35}
        quality={0.5}
      />
    </div>
  );
}
