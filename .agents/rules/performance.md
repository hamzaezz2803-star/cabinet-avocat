# Performance

Objectifs (mobile, 4G) : **LCP < 2,5 s**, **INP < 200 ms**, **CLS < 0,1**, Lighthouse Performance ≥ 90.

## 1. Rendu

- Toutes les pages sont **pré-rendues statiquement**. Ne pas lire `headers()`, `cookies()` ni d'autre API de requête dans les pages (cela impose un rendu dynamique avec `cacheComponents`).
- Les en-têtes de sécurité sont posés dans `next.config.ts` (compatibles avec le statique), pas dans `proxy.ts`.
- JavaScript client limité aux îlots interactifs : héros, en-tête, menu mobile, accordéon, formulaire, effets de défilement.

## 2. Images

- Fichiers sources dans `public/images` (JPEG ≤ 2000 px). `next/image` sert AVIF / WebP aux bonnes dimensions.
- `images.formats: ["image/avif", "image/webp"]`, `images.qualities: [70, 80]`.
- Attribut `sizes` précis sur chaque image (le bandeau : `(min-width: 768px) 192px, 144px`).
- Image LCP du héros : les premières photos du bandeau sont en `preload`. Le reste en chargement différé.
- Dimensions ou `fill` + conteneur dimensionné : jamais d'image sans réservation d'espace (CLS).

## 3. Polices

- `next/font` : auto-hébergées, `display: swap`, sous-ensemble `latin` (couvre les accents français), uniquement les graisses utilisées (Public Sans 400/500/600, Caslon Display 400).

## 4. JavaScript

- GSAP : importer uniquement `gsap` et `gsap/ScrollTrigger`, dans un seul composant client monté sur l'accueil.
- Pas de bibliothèque pour ce que CSS sait faire (survols, transitions, `details`).
- Vérifier la taille des bundles après chaque ajout de dépendance (`next build` affiche la taille des routes).

## 5. Contrôles

- `npm run build` puis `npm start` et test Lighthouse en navigation privée, profil mobile.
- Vérifier l'absence de requête vers un domaine tiers dans l'onglet Réseau.
