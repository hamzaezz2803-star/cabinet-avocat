import type { CSSProperties } from "react";

interface SplashScreenProps {
  name: string;
  role: string;
}

/** Délai d'apparition de chaque trait (ordre : anneau, socle, colonne, fléau, chaînes, plateaux). */
const d = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

/**
 * Écran d'accueil : la balance de la Justice se dessine, le fléau oscille puis s'équilibre,
 * puis l'écran s'efface. 100 % CSS (visible sans JavaScript), décoratif (aria-hidden),
 * sans blocage des clics, affiché une fois par session, absent si mouvement réduit.
 */
export function SplashScreen({ name, role }: SplashScreenProps) {
  return (
    <div aria-hidden="true" className="splash theme-hero">
      <div className="flex flex-col items-center text-center">
        <svg
          viewBox="0 0 120 120"
          className="splash-scales size-32 text-brass-light sm:size-44"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Anneau */}
          <circle cx="60" cy="60" r="57" pathLength={1} className="splash-draw opacity-40" style={d(0)} />
          {/* Socle et colonne */}
          <path d="M38 100 H82" pathLength={1} className="splash-draw" style={d(120)} />
          <path d="M48 100 Q60 91 72 100" pathLength={1} className="splash-draw" style={d(180)} />
          <path d="M60 94 V27" pathLength={1} className="splash-draw" style={d(240)} />
          <circle cx="60" cy="22" r="4" pathLength={1} className="splash-draw" style={d(320)} />

          {/* Fléau, chaînes et plateaux : oscillent ensemble autour du pivot */}
          <g className="splash-beam">
            <path d="M24 31 H96" pathLength={1} className="splash-draw" style={d(380)} />
            <path d="M24 31 L14 63 M24 31 L34 63" pathLength={1} className="splash-draw" style={d(480)} />
            <path d="M96 31 L86 63 M96 31 L106 63" pathLength={1} className="splash-draw" style={d(480)} />
            <path d="M10 63 H38 Q24 78 10 63 Z" pathLength={1} className="splash-draw" style={d(580)} />
            <path d="M82 63 H110 Q96 78 82 63 Z" pathLength={1} className="splash-draw" style={d(580)} />
          </g>
        </svg>

        <p className="splash-text mt-7 font-heading text-2xl leading-tight text-foreground sm:text-[1.75rem]" style={d(760)}>
          {name}
        </p>
        <span className="splash-rule mt-3 h-px w-14 bg-brass-light/70" style={d(880)} />
        <p className="splash-text mt-3 text-sm text-muted-foreground" style={d(940)}>
          {role}
        </p>
      </div>
    </div>
  );
}
