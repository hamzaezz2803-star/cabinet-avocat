"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animations au défilement (GSAP + ScrollTrigger), pilotées par des attributs data-* :
 *
 *   data-reveal              apparition (montée + fondu) d'un bloc
 *   data-reveal-group        conteneur dont les enfants [data-reveal-item] apparaissent en cascade
 *   data-reveal-clip         image révélée de bas en haut (clip-path)
 *   data-parallax="8"        conteneur d'image ; son enfant [data-parallax-inner] glisse de ±8 %
 *   data-draw="x" | "y"      trait qui se trace avec le défilement (frise « Méthode »)
 *
 * Règles (voir .agents/rules/animations.md) :
 * - rendu serveur 100 % visible : GSAP ne masque les éléments qu'après hydratation ;
 * - rien si `prefers-reduced-motion: reduce` (gsap.matchMedia) ;
 * - opacité seulement (pas de visibility) : les éléments restent atteignables au clavier ;
 * - transform / opacity / clip-path uniquement ; apparitions jouées une seule fois.
 */
export function ScrollAnimations() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const start = "top 85%";

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start, once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-reveal-item]");
        if (!items.length) return;
        gsap.from(items, {
          y: 44,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: group, start, once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-clip]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power4.inOut",
            clearProps: "clipPath",
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((wrapper) => {
        const inner = wrapper.querySelector<HTMLElement>("[data-parallax-inner]");
        if (!inner) return;
        const strength = Number(wrapper.dataset.parallax) || 8;
        const shift = () => (wrapper.offsetHeight * strength) / 100;
        gsap.fromTo(
          inner,
          { y: () => -shift() },
          {
            y: () => shift(),
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-draw]").forEach((line) => {
        const vertical = line.dataset.draw === "y";
        gsap.fromTo(
          line,
          vertical ? { scaleY: 0 } : { scaleX: 0 },
          {
            ...(vertical ? { scaleY: 1 } : { scaleX: 1 }),
            ease: "none",
            scrollTrigger: {
              trigger: line.parentElement ?? line,
              start: "top 85%",
              end: "bottom 60%",
              scrub: 0.6,
            },
          }
        );
      });
    });

    // Contenu chargé après coup (carrousel, polices, images) : recalcul des positions.
    let frame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    observer.observe(document.body);

    // Les polices web changent la hauteur des textes : positions recalculées une fois chargées.
    let alive = true;
    document.fonts?.ready.then(() => {
      if (alive) ScrollTrigger.refresh();
    });

    return () => {
      alive = false;
      observer.disconnect();
      cancelAnimationFrame(frame);
      mm.revert();
    };
  }, []);

  return null;
}
