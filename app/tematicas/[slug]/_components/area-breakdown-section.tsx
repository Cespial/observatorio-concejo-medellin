"use client";

import { ObAreaChart } from "@/components/charts/area-chart";
import type { TimeSeriesRow } from "@/lib/mock-data/types";

type AreaBreakdownSectionProps = {
  areaBreakdown: TimeSeriesRow[];
  areaBreakdownKeys: { key: string; name: string; color?: string }[];
};

export function AreaBreakdownSection({
  areaBreakdown,
  areaBreakdownKeys,
}: AreaBreakdownSectionProps) {
  return (
    <section>
      <ObAreaChart
        data={areaBreakdown}
        xKey="year"
        series={areaBreakdownKeys}
        title="Desagregacion por Categoria"
        source="Fuentes multiples — Observatorio Distrital"
        height={350}
        stacked
      />
    </section>
  );
}
