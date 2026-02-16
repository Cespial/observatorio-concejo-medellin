"use client";

import { THEMATIC_LINES } from "@/lib/constants";
import { Calendar } from "lucide-react";

type HeaderSectionProps = {
  slug: string;
};

export function HeaderSection({ slug }: HeaderSectionProps) {
  const line = THEMATIC_LINES.find((l) => l.slug === slug);
  if (!line) return null;

  const Icon = line.icon;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-4">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-xl"
          style={{ backgroundColor: line.bgColor }}
        >
          <Icon className="h-7 w-7" style={{ color: line.color }} />
        </div>
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">
            {line.name}
          </h1>
          <p className="text-muted-foreground mt-1">
            Dashboard de indicadores y seguimiento
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>Periodo de analisis: 2015 — 2025</span>
      </div>
    </section>
  );
}
