import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface BrandProps {
  locale: Locale;
  name: string;
  className?: string;
  onNavigate?: () => void;
}

/** Monogramme + nom du cabinet, lien vers l'accueil de la langue courante. */
export function Brand({ locale, name, className, onNavigate }: BrandProps) {
  return (
    <Link
      href={`/${locale}`}
      onClick={onNavigate}
      className={cn("group inline-flex min-h-11 items-center gap-3 rounded-sm", className)}
    >
      <span
        aria-hidden="true"
        dir="ltr"
        className="grid size-10 shrink-0 place-items-center rounded-sm border border-brass font-[family-name:var(--font-caslon)] text-lg leading-none tracking-wide text-current"
      >
        {siteConfig.monogram}
      </span>
      <span className="font-heading text-lg leading-tight whitespace-nowrap max-[419px]:sr-only sm:text-xl">{name}</span>
    </Link>
  );
}
