import Link from "next/link";

import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface BrandProps {
  className?: string;
  onNavigate?: () => void;
}

/** Monogramme + nom du cabinet, lien vers l'accueil. */
export function Brand({ className, onNavigate }: BrandProps) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className={cn("group inline-flex min-h-11 items-center gap-3 rounded-sm", className)}
    >
      <span
        aria-hidden="true"
        className="grid size-10 place-items-center rounded-sm border border-brass font-heading text-lg leading-none tracking-wide text-current"
      >
        {siteConfig.monogram}
      </span>
      <span className="font-heading text-xl leading-none">{siteConfig.name}</span>
    </Link>
  );
}
