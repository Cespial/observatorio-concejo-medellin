"use client";

import { ObLineChart } from "@/components/charts/line-chart";
import { Badge } from "@/components/ui/badge";
import type { TimeSeriesRow } from "@/lib/mock-data/types";

type TimeSeriesSectionProps = {
  timeSeries: TimeSeriesRow[];
  timeSeriesKeys: { key: string; name: string; color?: string }[];
  annotations: { year: number; label: string }[];
};

export function TimeSeriesSection({
  timeSeries,
  timeSeriesKeys,
  annotations,
}: TimeSeriesSectionProps) {
  return (
    <section className="space-y-3">
      <ObLineChart
        data={timeSeries}
        xKey="year"
        series={timeSeriesKeys}
        title="Evolucion Historica"
        source="Fuentes multiples — Observatorio Distrital"
        height={350}
      />
      {annotations.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 px-1">
          <span className="text-xs text-muted-foreground font-medium">
            Eventos relevantes:
          </span>
          {annotations.map((a) => (
            <Badge
              key={a.year}
              variant="outline"
              className="text-xs font-normal"
            >
              {a.year} — {a.label}
            </Badge>
          ))}
        </div>
      )}
    </section>
  );
}
