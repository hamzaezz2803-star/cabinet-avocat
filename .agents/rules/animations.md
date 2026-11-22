# Animations et mouvement

## 1. Principe

Le mouvement doit évoquer **la retenue** : rien ne rebondit, rien ne clignote. Un seul moment orchestré (l'entrée du héros), puis des effets discrets qui répondent au défilement ou à une action.

## 2. Outils retenus

- **Motion** (`motion/react`, successeur de Framer Motion, même API) : entrée du héros, bandeau photo, révélations au défilement, parallaxe légère, tracé de la frise « Méthode ».
- **CSS** : survols, focus, accordéon (animations Radix), menu mobile (`tw-animate-css`).

Écartés, avec raison :
- **GSAP / ScrollTrigger** : Motion couvre `useScroll` / `useTransform` / `whileInView` ; ajouter GSAP doublerait le poids JavaScript pour un même résultat. À reconsidérer seulement pour une séquence épinglée complexe.
- **Lenis** : le défilement « lissé » détourne la molette, gêne les lecteurs d'écran et la navigation clavier, et va à l'encontre de la sobriété voulue.
- Aceternity / Magic UI : effets (spotlight, particules, meteors) trop démonstratifs pour un cabinet.

## 3. Catalogue autorisé

| Effet | Où | Durée / courbe |
|---|---|---|
| Entrée du titre mot par mot | Héros | 0,7 s par mot, décalage 0,06 s, `[0.22, 1, 0.36, 1]` |
| Fondu + translation 12 px | Héros (accroche, texte, bouton) | 0,6 s, même courbe |
| Défilement horizontal continu | Bandeau photo du héros | linéaire, 60 s par boucle, pause au survol |
| Révélation de bloc | Titres de section uniquement | 0,6 s, une seule fois (`once: true`) |
| Parallaxe | 2 photos maximum | translation ±8 % liée au défilement, pas de zoom |
| Tracé de ligne | Frise « Méthode » | lié au défilement |
| Survol | Liens, lignes d'expertise, boutons | 150 à 200 ms |

Interdits : animation sur chaque section, compteurs animés, texte qui tape, curseur personnalisé, zoom au survol des photos de plus de 3 %, effets 3D.

## 4. Accessibilité du mouvement

- `prefers-reduced-motion: reduce` : le bandeau photo s'arrête, la parallaxe est supprimée, les révélations deviennent instantanées. Implémentation : `useReducedMotion()` de Motion et `MotionConfig reducedMotion="user"` à la racine.
- Le bandeau continu (plus de 5 s) se met en **pause au survol et au focus**, et un bouton « Mettre en pause le défilement » est disponible (WCAG 2.2.2).
- Aucun contenu n'est invisible sans JavaScript : l'état initial masqué n'est appliqué que par Motion côté client après hydratation du héros.

## 5. Performance

- Animer uniquement `transform` et `opacity`.
- `will-change` seulement pendant l'animation.
- Pas d'écouteur `scroll` manuel : `useScroll` de Motion.
