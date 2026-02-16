"use client";

import { useMemo } from "react";
import { ObBarChart } from "@/components/charts/bar-chart";
import type { ComunaComparison } from "@/lib/mock-data/types";

type ComparativeBarSectionProps = {
  comunaComparison: ComunaComparison[];
  lineColor: string;
};

export function ComparativeBarSection({
  comunaComparison,
  lineColor,
}: ComparativeBarSectionProps) {
  const top10 = useMemo(() => {
    return [...comunaComparison]
      .sort((a, b) => b.valor - a.valor)
      .slice(0, 10);
  }, [comunaComparison]);

  return (
    <section>
      <ObBarChart
        data={top10}
        xKey="nombre"
        series={[{ key: "valor", name: "Valor", color: lineColor }]}
        title="Comparativo por Comunas"
        source="Observatorio Distrital — Datos 2025"
        height={350}
        layout="vertical"
      />
    </section>
  );
}
