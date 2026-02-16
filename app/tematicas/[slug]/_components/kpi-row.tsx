"use client";

import { KpiCard } from "@/components/shared/kpi-card";
import type { KpiMock } from "@/lib/mock-data/types";

type KpiRowProps = {
  kpis: KpiMock[];
  lineColor: string;
};

export function KpiRow({ kpis, lineColor }: KpiRowProps) {
  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.id}
            title={kpi.title}
            value={kpi.value}
            unit={kpi.unit}
            change={kpi.change}
            positiveIsGood={kpi.positiveIsGood}
            sparklineData={kpi.sparklineData}
            sparklineColor={lineColor}
          />
        ))}
      </div>
    </section>
  );
}
