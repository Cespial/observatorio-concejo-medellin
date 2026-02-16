"use client";

import { ObGaugeChart } from "@/components/charts/gauge-chart";
import type { GaugeMock } from "@/lib/mock-data/types";

type GaugeRowProps = {
  gauges: GaugeMock[];
};

export function GaugeRow({ gauges }: GaugeRowProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Cumplimiento Metas PDM</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {gauges.map((gauge) => (
          <ObGaugeChart
            key={gauge.title}
            data={{
              value: gauge.value,
              min: gauge.min,
              max: gauge.max,
              target: gauge.target,
              label: gauge.title,
              unit: gauge.unit,
            }}
            title={gauge.title}
            source="Plan de Desarrollo Municipal"
            height={180}
          />
        ))}
      </div>
    </section>
  );
}
