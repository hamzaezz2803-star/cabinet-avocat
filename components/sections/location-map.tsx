"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";

interface LocationMapProps {
  query: string;
  label: string;
  address: string;
  hl: string;
  labels: { show: string; note: string; title: string };
}

/**
 * Carte Google Maps chargée uniquement au clic : aucune requête vers Google
 * (ni cookie tiers) tant que le visiteur ne l'a pas demandée.
 */
export function LocationMap({ query, label, address, hl, labels }: LocationMapProps) {
  const [loaded, setLoaded] = useState(false);
  // URL d'intégration finale de Google (évite la redirection de « ?output=embed »).
  const q = encodeURIComponent(query).replace(/%20/g, "+");
  const src = `https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${q}!6i17!3m1!1s${hl}!5m1!1s${hl}`;

  if (loaded) {
    return (
      <iframe
        title={labels.title}
        src={src}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 size-full border-0 saturate-[0.8]"
      />
    );
  }

  return (
    <div className="theme-hero absolute inset-0 flex flex-col items-center justify-center bg-background px-6 text-center">
      {/* Repère de plan : rues stylisées, purement décoratives */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 size-full text-paper/[0.07]"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 400 300"
        fill="none"
        stroke="currentColor"
      >
        <path d="M-20 210 L420 120" strokeWidth="14" />
        <path d="M120 -20 L180 320" strokeWidth="8" />
        <path d="M290 -20 L250 320" strokeWidth="6" />
        <path d="M-20 70 L420 40" strokeWidth="4" />
        <path d="M-20 270 L420 250" strokeWidth="3" />
        <path d="M30 -20 L70 320" strokeWidth="3" />
      </svg>

      <span className="relative grid size-16 place-items-center rounded-full border border-brass-light/60">
        <MapPin aria-hidden="true" className="size-6 text-brass-light" strokeWidth={1.5} />
      </span>
      <p className="relative mt-5 font-heading text-2xl">{label}</p>
      <p className="relative mt-1 max-w-[34ch] text-sm text-muted-foreground">{address}</p>

      <Button variant="outline" className="relative mt-6" onClick={() => setLoaded(true)}>
        {labels.show}
      </Button>
      <p className="relative mt-3 max-w-[40ch] text-sm leading-relaxed text-muted-foreground">
        {labels.note}
      </p>
    </div>
  );
}
