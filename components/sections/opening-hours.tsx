"use client";

import { useSyncExternalStore } from "react";

import type { DaySchedule } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface OpeningHoursProps {
  schedule: DaySchedule[];
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** Indice du jour (lundi = 0) à l'heure de Casablanca, quel que soit le fuseau du visiteur. */
function todayIndexInCasablanca(): number {
  const short = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "Africa/Casablanca",
  }).format(new Date());
  return WEEKDAYS.indexOf(short);
}

const subscribeNoop = () => () => {};

function describe(day: DaySchedule): string {
  if (day.appointmentOnly) return day.open ? `Sur rendez-vous, dès ${day.open}` : "Sur rendez-vous uniquement";
  if (!day.open) return "Fermé";
  if (!day.close) return `Dès ${day.open}`;
  return `${day.open} à ${day.close}`;
}

/**
 * Jours et horaires d'ouverture. Le jour courant est mis en avant après hydratation
 * (calculé côté client pour éviter un écart avec le rendu statique).
 */
export function OpeningHours({ schedule }: OpeningHoursProps) {
  // null au rendu serveur, jour réel côté client : pas d'écart d'hydratation.
  const today = useSyncExternalStore(subscribeNoop, todayIndexInCasablanca, () => null);

  return (
    <dl className="divide-y divide-border border-y">
      {schedule.map((day, i) => {
        const isToday = i === today;
        const closed = !day.open && !day.appointmentOnly;
        return (
          <div
            key={day.day}
            className={cn(
              "relative grid grid-cols-[1fr_auto] items-center gap-4 py-3.5 transition-colors duration-200",
              isToday && "bg-foreground/[0.04]"
            )}
          >
            {isToday ? (
              <span aria-hidden="true" className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-brass" />
            ) : null}
            <dt className={cn("flex items-center gap-3 pl-4", isToday && "font-semibold")}>
              {day.day}
              {isToday ? (
                <span className="rounded-sm border border-brass/50 px-1.5 text-sm font-medium text-brass-text">
                  Aujourd&apos;hui
                </span>
              ) : null}
            </dt>
            <dd
              className={cn(
                "pr-4 text-right tabular-nums",
                closed ? "text-muted-foreground" : "text-foreground",
                isToday && "font-semibold"
              )}
            >
              {describe(day)}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
