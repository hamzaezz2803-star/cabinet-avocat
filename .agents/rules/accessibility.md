# Accessibilité et responsive

Objectif : **WCAG 2.2 niveau AA**.

## 1. Contraste

- Texte : 4,5:1 minimum ; grand texte (≥ 24 px ou 19 px gras) et éléments d'interface : 3:1.
- Couples validés : encre/papier 16:1, `muted-foreground`/papier 6,6:1, blanc/vert bouteille 9:1, `brass-text`/papier 6,4:1, `brass-light`/encre 7:1.
- `--brass` (#8C6D33) n'est **jamais** utilisé pour du texte de moins de 24 px.
- Texte sur photo : voile d'encre d'au moins 55 % sous le texte.

## 2. Clavier

- Tout est atteignable avec Tab / Maj+Tab, activable avec Entrée / Espace, fermable avec Échap.
- Focus visible partout : `outline: 2px solid var(--brass); outline-offset: 2px` (via `:focus-visible`).
- Lien d'évitement vers `#contenu`.
- Pas de piège de focus hors du menu mobile ouvert (piège voulu, Radix).

## 3. Sémantique et lecteurs d'écran

- Une seule balise `h1` par page ; niveaux de titre sans saut.
- Chaque `section` a un `aria-labelledby` pointant vers son titre.
- `lang="fr"` sur `html`.
- Images utiles : `alt` descriptif ; images décoratives et doublons du bandeau : `alt=""` et `aria-hidden`.
- Formulaire : `label` relié, `aria-invalid`, `aria-describedby` vers l'erreur, zone `aria-live` pour le résultat.
- Le bandeau photo défilant a un bouton pause accessible.

## 4. Responsive (mobile d'abord)

Points de rupture Tailwind : base 360 px, `sm` 640, `md` 768, `lg` 1024, `xl` 1280.

- Tester à 360, 390, 768, 1024, 1280 et 1440 px.
- **Aucun défilement horizontal** : conteneurs `overflow-x: clip` sur les éléments qui débordent volontairement (bandeau), jamais sur `body` pour masquer un bug.
- Zones cliquables ≥ 44 × 44 px sur mobile.
- Ordre de lecture identique à l'ordre visuel ; pas de `order-*` qui inverse le sens du contenu.
- Le héros ne chevauche jamais le bandeau photo, quelle que soit la hauteur d'écran (bandeau dans le flux, pas en `absolute`).
- Zoom texte à 200 % sans perte de contenu.

## 5. Langues et thème

- `lang` et `dir` corrects sur `<html>` pour chaque langue ; citations dans une autre langue marquées `lang="fr"` / `dir="auto"`.
- Tester chaque écran en arabe (RTL) et en mode sombre : contrastes AA vérifiés pour les deux thèmes.
- Le sélecteur de langue affiche chaque langue dans sa propre écriture (Français, English, العربية).
