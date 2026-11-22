import type { Metadata } from "next";

import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig, TO_COMPLETE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Comment le cabinet traite les données transmises par le formulaire de contact.",
};

export default function ConfidentialitePage() {
  return (
    <LegalPage title="Politique de confidentialité" updatedAt="22 nov. 2026">
      <p>
        Cette politique décrit les données collectées par ce site et leur utilisation, conformément
        à la loi n° 09-08 relative à la protection des personnes physiques à l&apos;égard du
        traitement des données à caractère personnel.
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        {siteConfig.name}, {siteConfig.email ?? `e-mail ${TO_COMPLETE}`}. Numéro de déclaration ou
        d&apos;autorisation CNDP : {TO_COMPLETE}.
      </p>

      <h2>Données collectées</h2>
      <p>Le site ne collecte des données que lorsque vous envoyez le formulaire de contact :</p>
      <ul>
        <li>nom et prénom ;</li>
        <li>adresse e-mail ;</li>
        <li>numéro de téléphone, si vous choisissez de l&apos;indiquer ;</li>
        <li>domaine concerné et message.</li>
      </ul>
      <p>
        Nous vous demandons de ne pas transmettre de détails confidentiels ni de pièces par ce
        formulaire.
      </p>

      <h2>Finalité et base légale</h2>
      <p>
        Ces données servent uniquement à répondre à votre demande et à organiser un éventuel
        rendez-vous. Le traitement repose sur votre consentement, exprimé en cochant la case prévue.
        Aucune prospection commerciale n&apos;est réalisée à partir de ces données.
      </p>

      <h2>Destinataires et sous-traitants</h2>
      <ul>
        <li>Les avocats et collaborateurs du cabinet chargés de répondre.</li>
        <li>Hébergeur du site : {TO_COMPLETE}.</li>
        <li>Service d&apos;envoi d&apos;e-mails : {TO_COMPLETE} (par exemple Resend).</li>
      </ul>
      <p>
        Si un sous-traitant héberge les données hors du Maroc, les conditions de transfert sont
        celles autorisées par la CNDP : {TO_COMPLETE}.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Le site ne stocke pas les demandes : elles sont transmises par e-mail au cabinet. Sans suite
        donnée, elles sont supprimées au bout de {TO_COMPLETE}. Si un dossier est ouvert, les règles
        de conservation propres à la profession s&apos;appliquent.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;opposition et de
        suppression. Pour l&apos;exercer, écrivez à {siteConfig.email ?? `l'adresse ${TO_COMPLETE}`}.
        Vous pouvez également saisir la Commission nationale de contrôle de la protection des
        données à caractère personnel (CNDP).
      </p>

      <h2>Sécurité</h2>
      <p>
        Le site est servi exclusivement en HTTPS. Les données du formulaire sont validées par le
        serveur et ne figurent dans aucun journal technique.
      </p>
    </LegalPage>
  );
}
