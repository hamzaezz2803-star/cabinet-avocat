import type { ReactNode } from "react";

interface LegalPageProps {
  title: string;
  updatedAt: string;
  children: ReactNode;
}

/** Gabarit des pages légales : colonne de lecture unique, typographie sobre. */
export function LegalPage({ title, updatedAt, children }: LegalPageProps) {
  return (
    <article className="container-site pt-[calc(var(--header-height)+4rem)] pb-24 lg:pb-32">
      <header className="max-w-[44rem] border-b pb-10">
        <h1 className="text-[2.5rem] leading-[1.06] sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-6 text-sm text-muted-foreground">Dernière mise à jour : {updatedAt}</p>
        <p className="mt-4 rounded-lg border border-warning/40 bg-warning/[0.06] p-4 text-sm text-warning">
          Document provisoire : les mentions « à compléter » doivent être renseignées par le cabinet,
          et le texte relu par un juriste avant la mise en ligne.
        </p>
      </header>
      <div className="mt-10 max-w-[44rem] space-y-5 text-[1.0625rem] leading-[1.75] text-foreground/90 [&_a]:underline [&_a]:decoration-brass [&_a]:underline-offset-4 [&_h2]:pt-6 [&_h2]:text-[1.75rem] [&_h2]:leading-tight [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
        {children}
      </div>
    </article>
  );
}
