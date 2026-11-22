"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  labels: { toggle: string; light: string; dark: string };
}

/**
 * Bascule clair / sombre. Les deux icônes sont rendues et masquées en CSS
 * (classe `dark`), ce qui évite tout écart d'hydratation.
 */
export function ThemeToggle({ labels }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
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
