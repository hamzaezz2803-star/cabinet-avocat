"use client";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { THEME_STORAGE_KEY } from "@/lib/theme";

interface ThemeToggleProps {
  labels: { toggle: string; light: string; dark: string };
}

/** Applique un thème et mémorise le choix (stockage local, jamais transmis au serveur). */
function applyTheme(dark: boolean) {
  const root = document.documentElement;
  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
  try {
    localStorage.setItem(THEME_STORAGE_KEY, dark ? "dark" : "light");
  } catch {
    // Stockage indisponible (navigation privée) : le choix vaut pour la page en cours.
  }
}

/**
 * Bascule clair / sombre. Les deux icônes sont rendues et masquées en CSS
 * (classe `dark`), ce qui évite tout écart d'hydratation.
 */
export function ThemeToggle({ labels }: ThemeToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => applyTheme(!document.documentElement.classList.contains("dark"))}
      aria-label={labels.toggle}
      title={labels.toggle}
    >
      <Moon aria-hidden="true" className="size-[1.125rem] dark:hidden" strokeWidth={1.5} />
      <Sun aria-hidden="true" className="hidden size-[1.125rem] dark:block" strokeWidth={1.5} />
      <span className="sr-only dark:hidden">{labels.dark}</span>
      <span className="sr-only hidden dark:inline">{labels.light}</span>
    </Button>
  );
}
