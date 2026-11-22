import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[70svh] flex-col justify-center pt-(--header-height)">
      <h1 className="max-w-[18ch] text-[2.5rem] leading-[1.06] sm:text-6xl">
        Cette page n&apos;existe pas ou a été déplacée
      </h1>
      <p className="mt-6 max-w-[48ch] text-lg text-muted-foreground">
        Vérifiez l&apos;adresse saisie, ou revenez à l&apos;accueil pour retrouver nos expertises et
        nos coordonnées.
      </p>
      <div className="mt-10">
        <Button asChild size="lg">
          <Link href="/">Revenir à l&apos;accueil</Link>
        </Button>
      </div>
    </section>
  );
}
