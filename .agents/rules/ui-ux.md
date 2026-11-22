# UI / UX

## 1. Parcours visé

Le visiteur doit, en moins d'une minute, comprendre **ce que fait le cabinet, pour qui, et comment prendre rendez-vous**.
Ordre de la page d'accueil : En-tête → Héros → Expertises → Le cabinet → Méthode → Confidentialité → Questions fréquentes → Contact → Pied de page.

## 2. Contenu

- Titre principal précis (ce qui est proposé, pour qui, le résultat), une phrase d'appui, un bouton d'action.
- **Aucun faux** : pas d'avis, de note, de chiffre (« 500 dossiers gagnés »), de logo client, de distinction non vérifiée.
- Pas de promesse de résultat : la déontologie interdit de garantir l'issue d'un litige.
- Pas de tiret cadratin (—) dans les textes visibles.
- Ton : vouvoiement, phrases courtes, verbes actifs, vocabulaire compréhensible par un non-juriste.
- Les informations du cabinet (nom, adresse, barreau, ICE, RC) viennent **uniquement** de `lib/site-config.ts`. Les valeurs non fournies restent marquées « à compléter ».

## 3. Boutons et actions

- Un seul bouton principal par écran : « Demander un rendez-vous ». Le reste en contour ou fantôme.
- Libellés qui disent ce qui se passe : « Envoyer ma demande », pas « Valider ».
- Pas de flèche « → » ajoutée systématiquement aux liens.
- Hauteur minimale 44 px ; états survol, focus (anneau laiton 2 px, décalé de 2 px) et désactivé visibles.

## 4. Navigation

- En-tête fixe, fond opaque au défilement, hauteur 72 px.
- Lien d'évitement « Aller au contenu » en premier élément focusable.
- Mobile : menu en panneau latéral (shadcn `Sheet`, Radix Dialog) avec piège de focus, fermeture par Échap et retour du focus au bouton.
- Ancres internes avec `scroll-margin-top` pour ne pas passer sous l'en-tête.

## 5. Formulaires

- Libellé visible au-dessus de chaque champ, indication « facultatif » sur les champs non obligatoires.
- Erreur sous le champ, reliée par `aria-describedby`, champ marqué `aria-invalid`.
- Résumé d'état annoncé dans une zone `aria-live="polite"`.
- Bouton désactivé pendant l'envoi, avec libellé « Envoi en cours ».
- Message de succès qui dit la suite : « Demande envoyée. Le cabinet vous recontacte pour fixer un rendez-vous. »
- Les valeurs saisies sont conservées en cas d'erreur.

## 6. États

Toute zone dynamique prévoit chargement, erreur et vide. Le site étant statique, seul le formulaire est concerné : `pending`, `error` (avec action « Réessayer » implicite : le formulaire reste rempli), `success`.

## 7. Pages légales

Mentions légales et conditions d'utilisation, reliées depuis le pied de page. Pas de ligne de copyright.
Politique de confidentialité et politique de cookies retirées à la demande du client (22 nov. 2026) : à rétablir avant la mise en production si la loi 09-08 / la CNDP l'exigent (le formulaire collecte des données personnelles). Toute URL inconnue affiche la 404 traduite (`app/[lang]/[...rest]`).
