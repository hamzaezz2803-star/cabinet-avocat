"use client";

import { useSyncExternalStore } from "react";

import type { DaySchedule } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface OpeningHoursProps {
  schedule: DaySchedule[];
  labels: {
    days: string[];
    today: string;
    closed: string;
    appointmentOnly: string;
    /** Modèles résolus côté serveur, avec {open} et {close}. */
    from: string;
    range: string;
  };
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

/** Jours de réception. Le jour courant est mis en avant côté client (pas d'écart d'hydratation). */
export function OpeningHours({ schedule, labels }: OpeningHoursProps) {
  const today = useSyncExternalStore(subscribeNoop, todayIndexInCasablanca, () => null);

  const describe = (day: DaySchedule) => {
    if (day.appointmentOnly && !day.open) return labels.appointmentOnly;
    if (!day.open) return labels.closed;
    if (!day.close) return labels.from.replace("{open}", day.open);
    return labels.range.replace("{open}", day.open).replace("{close}", day.close);
  };

  return (
    <dl className="divide-y divide-border border-y">
      {schedule.map((day, i) => {
        const isToday = i === today;
        const closed = !day.open && !day.appointmentOnly;
        return (
          <div
            key={labels.days[i]}
            className={cn(
              "relative grid grid-cols-[1fr_auto] items-center gap-4 py-3.5 transition-colors duration-200",
              isToday && "bg-foreground/[0.04]"
            )}
          >
            {isToday ? (
              <span aria-hidden="true" className="absolute inset-y-2 start-0 w-0.5 rounded-full bg-brass" />
            ) : null}
            <dt className={cn("flex items-center gap-3 ps-4", isToday && "font-semibold")}>
              {labels.days[i]}
              {isToday ? (
                <span className="rounded-sm border border-brass/50 px-1.5 text-sm font-medium text-brass-text">
                  {labels.today}
                </span>
              ) : null}
            </dt>
            <dd
              className={cn(
                "flex items-center gap-2 pe-4 text-end tabular-nums",
                closed ? "text-muted-foreground" : "font-medium text-foreground",
                isToday && "font-semibold"
              )}
            >
              {!closed ? <span aria-hidden="true" className="size-1.5 rounded-full bg-success" /> : null}
              {describe(day)}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
