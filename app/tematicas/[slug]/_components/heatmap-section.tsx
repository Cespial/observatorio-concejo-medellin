"use client";

import { useMemo } from "react";
import { ObHeatmapChart } from "@/components/charts/heatmap-chart";
import type { HeatmapRow } from "@/lib/mock-data/types";
import type { HeatmapCell } from "@/lib/types/chart";

const MONTHS = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
] as const;

type HeatmapSectionProps = {
  heatmap: HeatmapRow[];
  lineColor: string;
  bgColor: string;
};

export function HeatmapSection({
  heatmap,
  lineColor,
  bgColor,
}: HeatmapSectionProps) {
  const cells: HeatmapCell[] = useMemo(() => {
    return heatmap.flatMap((row) =>
      MONTHS.map((m) => ({
        x: m,
        y: String(row.year),
        value: row[m],
      }))
    );
  }, [heatmap]);

  return (
    <section>
      <ObHeatmapChart
        data={cells}
        title="Mapa de Calor Mensual"
        source="Observatorio Distrital — Datos mensuales"
        height={280}
        colorRange={[bgColor, lineColor]}
      />
    </section>
  );
}
