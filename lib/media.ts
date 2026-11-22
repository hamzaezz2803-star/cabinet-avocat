/**
 * Photographies d'illustration (Unsplash, voir docs/licences.md).
 * Les textes alternatifs sont traduits dans les dictionnaires (`media.alts`), même ordre que `photoKeys`.
 */
export const photoKeys = [
  "justice-statue-wood",
  "library-busts",
  "signing",
  "courthouse-columns",
  "gavel",
  "bookcase",
  "handshake",
  "courthouse",
  "books-pen",
  "towers",
  "justice-statue",
] as const;

export type PhotoKey = (typeof photoKeys)[number];

export const photoSrc = (key: PhotoKey) => `/images/${key}.jpg`;

/** Bandeau du héros : 10 premières photos. */
export const heroPhotos: PhotoKey[] = photoKeys.slice(0, 10);

/** Galerie : toutes les photos, dans un ordre différent du héros. */
export const galleryPhotos: PhotoKey[] = [
  "library-busts",
  "justice-statue",
  "courthouse-columns",
  "bookcase",
  "signing",
  "gavel",
  "courthouse",
  "books-pen",
  "handshake",
  "towers",
  "justice-statue-wood",
];
