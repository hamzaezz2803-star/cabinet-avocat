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
<<<<<<< HEAD
        color="#3f8c6e"
=======
        lightMode
        // En mode clair, la couverture dépend de la luminosité de la couleur et l'encre
        // est ramenée à une luminance fixe : on passe donc une version claire du vert
        // bouteille (même teinte), qui donne une encre verte du cabinet bien visible.
        color="#7fb8a0"
>>>>>>> fca4caa4c1de59e8c67cfb4079ebd8456c2898eb
        speed={0.35}
        scale={1.1}
        rotation={-12}
        brightness={0.85}
        glow={0.35}
        sheen={0.5}
        grain={0.025}
        mouseStrength={0.6}
<<<<<<< HEAD
=======
        brightness={1.2}
        opacity={0.55}
        fade={0.3}
>>>>>>> fca4caa4c1de59e8c67cfb4079ebd8456c2898eb
        quality={0.5}
      />
    </div>
  );
}
