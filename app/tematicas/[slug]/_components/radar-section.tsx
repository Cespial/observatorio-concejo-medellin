"use client";

import { ObRadarChart } from "@/components/charts/radar-chart";
import type { RadarDimension } from "@/lib/mock-data/types";

type RadarSectionProps = {
  radar: RadarDimension[];
  lineColor: string;
};

export function RadarSection({ radar, lineColor }: RadarSectionProps) {
  return (
    <section>
      <ObRadarChart
        data={radar}
        labelKey="dimension"
        series={[
          { key: "2024", name: "2024", color: "#94a3b8" },
          { key: "2025", name: "2025", color: lineColor },
        ]}
        title="Comparativo Dimensional 2024 vs 2025"
        source="Observatorio Distrital — Evaluacion multidimensional"
        height={350}
      />
    </section>
  );
}
