import { notFound } from "next/navigation";

/**
 * Toute URL inconnue sous une langue (ex. /fr/page-supprimee) affiche la page 404
 * du site, traduite et avec l'en-tête et le pied de page, au lieu de la 404 par défaut de Next.
 */

// Ce segment ne rend jamais de contenu (il renvoie toujours une 404) :
// la validation de navigation instantanée ne s'applique pas.
export const instant = false;

export default function CatchAllNotFound() {
  notFound();
}
