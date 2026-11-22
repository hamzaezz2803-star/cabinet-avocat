"use client";

/**
 * Script inline exécuté pendant l'analyse du HTML (avant le premier affichage).
 * Méthode du guide Next « Preventing flash before hydration » : `text/javascript`
 * au rendu serveur, `text/plain` côté client (React ne l'exécute pas et n'avertit plus).
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
