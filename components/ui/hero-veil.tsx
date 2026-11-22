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
        // En mode clair, la couverture dépend de la luminosité de la couleur et l'encre
        // est ramenée à une luminance fixe : on passe donc une version claire du vert
        // bouteille (même teinte), qui donne une encre verte du cabinet bien visible.
        color="#7fb8a0"
        speed={0.35}
        scale={1.15}
        rotation={-12}
        glow={0.3}
        grain={0.02}
        sheen={0.6}
        mouseStrength={0.6}
        brightness={1.2}
        opacity={0.55}
        fade={0.3}
        quality={0.5}
      />
    </div>
  );
}
