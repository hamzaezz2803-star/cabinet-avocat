"use client";

import { DarkVeil } from "@/components/ui/dark-veil";

/**
 * Fond du héros : DarkVeil en mode sombre sur vert forêt.
 * Lumière verte du cabinet, reflets légers ; purement décoratif.
 */
export function HeroVeil() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <DarkVeil
        color="#3f8c6e"
        speed={0.35}
        scale={1.1}
        rotation={-12}
        brightness={0.85}
        glow={0.35}
        sheen={0.5}
        grain={0.025}
        mouseStrength={0.6}
        quality={0.5}
      />
    </div>
  );
}
