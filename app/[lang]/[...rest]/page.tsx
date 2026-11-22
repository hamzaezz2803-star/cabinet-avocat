import { notFound } from "next/navigation";

/**
 * Toute URL inconnue sous une langue (ex. /fr/page-supprimee) affiche la page 404
 * du site, traduite et avec l'en-tête et le pied de page, au lieu de la 404 par défaut de Next.
 */
export default function CatchAllNotFound() {
  notFound();
}
