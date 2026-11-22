# Architecture front-end

## 1. Pile

- Next.js 16 (App Router, Turbopack, `cacheComponents`), React 19, TypeScript **strict**.
- Tailwind CSS v4 (jetons dans `app/globals.css`, pas de `tailwind.config`).
- shadcn/ui (base Radix) pour les primitives accessibles : `Button`, `Sheet`, `Accordion`.
- GSAP + ScrollTrigger pour les animations au défilement, zod pour la validation, Lucide pour les icônes.

Avant d'utiliser une API Next.js, lire le guide correspondant dans `node_modules/next/dist/docs/` (cette version diffère des versions connues : `proxy.ts` remplace `middleware.ts`, `preload` remplace `priority` sur `next/image`, `images.qualities` obligatoire...).

## 2. Arborescence

```
app/
  layout.tsx            polices, métadonnées, en-tête, pied de page
  page.tsx              composition de l'accueil (Server Component)
  (legal)/...           pages légales
  actions/contact.ts    Server Action du formulaire
  sitemap.ts, robots.ts, icon.svg, not-found.tsx
components/
  ui/                   composants génériques (shadcn + hero-3)
  layout/               en-tête, pied de page, menu mobile
  sections/             une section de l'accueil par fichier
  motion/               petits wrappers d'animation client
lib/
  site-config.ts        données du cabinet (source unique)
  content.ts            textes des sections
  validation/           schémas zod partagés client/serveur
  server/               code serveur uniquement (`import "server-only"`)
  utils.ts              `cn`
docs/licences.md        licences des ressources
```

## 3. Règles de composants

- **Server Components par défaut.** `"use client"` uniquement pour l'interactivité ou l'animation, au niveau le plus bas possible.
- Un composant = une responsabilité. Au-delà de ~150 lignes, découper.
- Props typées avec des `interface` explicites ; pas de `any`, pas de `as` sauf justification.
- Pas de texte en dur dans les composants de section : les contenus viennent de `lib/content.ts` et `lib/site-config.ts` (prépare une éventuelle traduction).
- Classes combinées avec `cn()`. Variantes avec `cva` si plus de deux.
- HTML sémantique : `header`, `nav`, `main`, `section` avec `aria-labelledby`, `footer`, `address`, listes réelles pour les listes.
- Images : `next/image` avec `sizes` précis, `alt` descriptif, `preload` uniquement pour l'image LCP.

## 4. Dépendances

Une dépendance n'est ajoutée que si elle évite plus de code qu'elle n'en apporte, est maintenue, et a une licence compatible. `shadcn` (CLI) reste en `devDependencies` hors de sa feuille CSS.

## 5. Qualité

- `npm run lint` et `npx tsc --noEmit` sans erreur ni avertissement.
- `npm run build` sans avertissement.
- Console du navigateur vide en développement et en production.
- Commits courts et descriptifs ; jamais de secret commité.

## 6. Langues (fr, en, ar)

- Routes sous `app/[lang]` (pré-rendues pour les 3 langues). `proxy.ts` ajoute le préfixe de langue (cookie `NEXT_LOCALE`, sinon `Accept-Language`, sinon `fr`).
- Tous les textes visibles sont dans `lib/i18n/dictionaries/{fr,en,ar}.ts`. `fr.ts` définit le type `Dictionary` : une clé manquante en anglais ou en arabe casse la compilation.
- Données non traduisibles (téléphone, e-mail, horaires, avis) : `lib/site-config.ts` ; champs traduits sous forme `{ fr, en, ar }`.
- Les dictionnaires contiennent des fonctions : ne jamais les passer entiers à un composant client, seulement les chaînes utiles.
- Arabe : `dir="rtl"` sur `<html>`, propriétés logiques uniquement (`ms-`, `pe-`, `start-`, `end-`, `text-start`, `border-s`), icônes directionnelles avec `rtl:rotate-180` ou `rtl:-scale-x-100`, numéros et e-mails dans `<bdi dir="ltr">`.

## 7. Thème clair / sombre

- Classe `dark` sur `<html>`, posée avant affichage par le script statique de `lib/theme.ts` (pas de dépendance, pas de flash). Préférence dans `localStorage`, sinon préférence système.
- Les couleurs sombres sont des redéfinitions des mêmes rôles dans `.dark` (`app/globals.css`) : aucun composant ne code une couleur sombre en dur.
