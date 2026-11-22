# Système de design

Source de référence : `README-design.md`. Ce fichier fixe l'identité visuelle du cabinet.

## 1. Intention

Un cabinet sobre, sûr de lui, discret. L'image évoque **le papier, l'encre et le cuir vert d'un bureau d'avocat**, pas une start-up.
Une seule audace par page : la typographie Caslon en grand format, associée aux photographies. Tout le reste reste calme.

À éviter absolument :
- dégradés décoratifs (violet ou autre), glassmorphism, halos lumineux ;
- fond crème + accent terracotta, fond noir + accent fluo ;
- cartes arrondies identiques alignées en grille avec la même ombre ;
- libellés en capitales espacées au-dessus de chaque titre, un mot mis en couleur dans un titre ;
- numérotation 01 / 02 / 03 hors d'une vraie séquence (seule la section « Méthode » est numérotée, car c'est un processus).

## 2. Couleurs

Définies **une seule fois** dans `app/globals.css` (variables CSS exposées à Tailwind). Jamais de couleur en dur dans un composant.

| Jeton | Valeur | Rôle |
|---|---|---|
| `--paper` / `background` | `#F6F6F3` | Fond principal, blanc cassé froid |
| `--surface` / `card` | `#FFFFFF` | Surfaces (formulaire, menus) |
| `--ink` / `foreground` | `#13201C` | Texte, sections sombres |
| `--stone` / `border` | `#DEDCD4` | Filets, bordures |
| `--muted-foreground` | `#4F5A55` | Texte secondaire (contraste 6,6:1) |
| `--primary` | `#1E4A3D` | Vert bouteille : bouton principal, liens actifs |
| `--brass` | `#8C6D33` | Laiton : filets, icônes, focus. Jamais pour du texte courant |
| `--brass-text` | `#6E5426` | Laiton lisible pour petits textes (6,4:1) |
| `--brass-light` | `#C9A66B` | Laiton sur fond encre (7:1) |
| `--forest` | `#0F2620` | Fond du héros (classe `.theme-hero`) : texte papier, bouton principal laiton clair, voile DarkVeil vert `#3F8C6E` |

Statuts (toujours avec icône + libellé, jamais la couleur seule) :
`--success #2E6B4A`, `--warning #8A5A00`, `--destructive #A1302A`, neutre = `muted-foreground`.

Thème clair uniquement (le projet ne prévoit pas de thème sombre). Les sections « encre » sont des inversions locales via la classe `.theme-ink`.

## 3. Typographie

- **Libre Caslon Display** (OFL) : titres `h1` à `h3`, citations. Caslon est la police historique des textes juridiques : c'est notre signature.
- **Public Sans** (OFL) : texte courant, interface, formulaires. Neutre, très lisible, conçue pour les services publics.
- Chargement local avec `next/font/google` (fichiers auto-hébergés au build). Deux familles, pas plus.

Échelle (mobile → bureau) :

| Rôle | Taille | Interligne | Police |
|---|---|---|---|
| Display (h1) | 44 → 88 px | 1.02 | Caslon, `-0.01em` |
| h2 | 34 → 56 px | 1.08 | Caslon |
| h3 | 24 → 30 px | 1.2 | Caslon |
| Intro | 18 → 20 px | 1.6 | Public Sans |
| Corps | 16 → 17 px | 1.65 | Public Sans |
| Secondaire | 14 px minimum | 1.5 | Public Sans 500 |

- Longueur de ligne : 60 à 72 caractères (`max-w-[62ch]`).
- Pas de capitales pour les libellés. Pas de mot isolé en italique ou en couleur dans un titre.
- Chiffres et formats marocains : « 14:30 », « ven. 14 nov. 2026 », « 05 22 00 00 00 ».

## 4. Formes, filets, ombres

- Rayon unique et modéré : `--radius: 0.5rem` (8 px) pour boutons et champs ; photos en `rounded-sm` (4 px) ou sans rayon. **Jamais de pilule.**
- Les filets fins (`1px` `border`) structurent la page plutôt que des cartes.
- Ombre unique et rare : `shadow-[0_1px_2px_rgb(19_32_28/0.06),0_12px_32px_-12px_rgb(19_32_28/0.18)]` (jeton `--shadow-lift`), réservée aux photos du bandeau et au menu mobile.

## 5. Espacement et grille

- Multiples de 4 px. Sections : `py-24` mobile, `py-32` à `py-40` bureau.
- Conteneur : `max-w-[1240px]`, gouttières `px-5` (mobile) / `px-8` (tablette) / `px-10` (bureau).
- Grille éditoriale 12 colonnes au bureau, alignement **à gauche** par défaut. Seul le héros est centré.

## 6. Iconographie

- Lucide uniquement, trait 1.5, taille 16 à 20 px, couleur `brass` ou `currentColor`.
- Pas d'emoji. `aria-label` sur toute icône seule ; `aria-hidden` sur les icônes décoratives.

## 7. Photographie

- Sujets : architecture judiciaire, bibliothèques, outils du droit, mains au travail. **Aucun visage** présenté comme membre du cabinet.
- Les photos de l'équipe réelle remplaceront les visuels d'ambiance quand elles seront disponibles.
- Traitement : légère désaturation (`saturate-[0.85]`) pour l'unité de ton.
- Licences listées dans `docs/licences.md`.
