# Animations et mouvement

## 1. Principe

Le mouvement doit évoquer **la retenue** : rien ne rebondit, rien ne clignote. Un seul moment orchestré (l'entrée du héros), puis des effets discrets qui répondent au défilement ou à une action.

## 2. Outils retenus

- **GSAP + ScrollTrigger** (demande du client, 22 nov. 2026) : toutes les animations liées au défilement. Un seul pilote, `components/motion/scroll-animations.tsx`, monté sur l'accueil, qui lit des attributs :
  - `data-reveal` : bloc qui monte et apparaît (titres de section, colonnes) ;
  - `data-reveal-group` + `data-reveal-item` : cartes en cascade (expertises, avis, étapes, questions) ;
  - `data-reveal-clip` : image révélée de bas en haut (portrait, statue, carte) ;
  - `data-parallax="8"` + `data-parallax-inner` : parallaxe verticale ;
  - `data-draw="x" | "y"` : frise « Méthode » tracée au défilement.
- **CSS** : écran d'accueil, entrée du héros, bandeau photo, survols, accordéon, menu mobile.
- Motion a été retiré : une seule bibliothèque d'animation au défilement.

Règles d'implémentation :
- Le HTML rendu par le serveur est entièrement visible ; GSAP ne masque qu'après hydratation, et uniquement sous `prefers-reduced-motion: no-preference` (`gsap.matchMedia`).
- Opacité seulement, jamais `visibility` / `autoAlpha` : les éléments restent atteignables au clavier.
- Apparitions jouées une seule fois (`once: true`) ; parallaxe et frise en `scrub`.
- Ne jamais imbriquer un `data-reveal` dans un `data-reveal-item` (double fondu).

Écartés : Lenis (détourne la molette, gêne clavier et lecteurs d'écran), effets démonstratifs (Aceternity, Magic UI).

## 3. Catalogue autorisé

| Effet | Où | Durée / courbe |
|---|---|---|
| Écran d'accueil (balance de la Justice) | Premier chargement de la session uniquement | tracé 0,75 s, oscillation 1,1 s, disparition à 1,45 s (total ~1,9 s), CSS pur, absent si mouvement réduit, n'intercepte pas les clics |
| Entrée du titre mot par mot | Héros | 0,7 s par mot, décalage 0,06 s, `[0.22, 1, 0.36, 1]` |
| Fondu + translation 12 px | Héros (accroche, texte, bouton) | 0,6 s, même courbe |
| Défilement horizontal continu | Bandeau photo du héros | linéaire, 70 s par boucle, pause au survol, au focus et par bouton |
| Voile WebGL (DarkVeil, React Bits) | Fond du héros uniquement | lent (`speed` 0,35), en pause hors écran et onglet masqué, figé si mouvement réduit |
| Parallaxe | 2 photos maximum | translation ±8 % liée au défilement, pas de zoom |
| Tracé de ligne | Frise « Méthode » | lié au défilement |
| Survol | Liens, lignes d'expertise, boutons | 150 à 200 ms |

Interdits : animation sur chaque section, compteurs animés, texte qui tape, curseur personnalisé, zoom au survol des photos de plus de 3 %, effets 3D.

## 4. Accessibilité du mouvement

- `prefers-reduced-motion: reduce` : le bandeau photo s'arrête, la parallaxe est supprimée, les révélations deviennent instantanées. Implémentation : `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` dans le pilote GSAP, et règle CSS globale pour les animations CSS.
- Le bandeau continu (plus de 5 s) se met en **pause au survol et au focus**, et un bouton « Mettre en pause le défilement » est disponible (WCAG 2.2.2).
- Aucun contenu n'est invisible sans JavaScript : le serveur rend tout visible, GSAP n'agit qu'après hydratation.

## 5. Performance

- Animer uniquement `transform` et `opacity`.
- `will-change` seulement pendant l'animation.
- Pas d'écouteur `scroll` manuel : ScrollTrigger (recalcul via `ScrollTrigger.refresh()` quand la hauteur de la page change).
