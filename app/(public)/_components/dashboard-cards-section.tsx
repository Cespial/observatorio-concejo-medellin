"use client";

import { ThemeCard } from "./theme-card";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { THEMATIC_LINES } from "@/lib/constants";

const mockData: Record<string, {
  mainKpi: { label: string; value: number; unit: string; change: number; positiveIsGood: boolean };
  sparkline: number[];
  count: number;
}> = {
  seguridad: {
    mainKpi: { label: "Tasa de homicidios", value: 16.8, unit: "por 100k", change: -12.3, positiveIsGood: false },
    sparkline: [25, 23, 21, 19, 18, 17.5, 17, 16.8],
    count: 42,
  },
  educacion: {
    mainKpi: { label: "Cobertura neta", value: 96.8, unit: "%", change: 1.2, positiveIsGood: true },
    sparkline: [92, 93, 94, 94.5, 95, 95.5, 96, 96.8],
    count: 38,
  },
  economia: {
    mainKpi: { label: "Tasa de desempleo", value: 10.2, unit: "%", change: -0.8, positiveIsGood: false },
    sparkline: [14, 13, 12.5, 11.8, 11.2, 10.8, 10.5, 10.2],
    count: 35,
  },
  movilidad: {
    mainKpi: { label: "Pasajeros diarios", value: 892000, unit: "", change: 3.1, positiveIsGood: true },
    sparkline: [750, 780, 800, 820, 840, 860, 880, 892],
    count: 28,
  },
  ambiente: {
    mainKpi: { label: "PM2.5 promedio", value: 28, unit: "\u00B5g/m\u00B3", change: 4.2, positiveIsGood: false },
    sparkline: [32, 30, 29, 27, 26, 27, 28, 28],
    count: 31,
  },
  salud: {
    mainKpi: { label: "Cobertura vacunacion", value: 94.5, unit: "%", change: 2.1, positiveIsGood: true },
    sparkline: [88, 89, 90, 91, 92, 93, 94, 94.5],
    count: 33,
  },
};

export function DashboardCardsSection() {
  return (
    <SectionWrapper>
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-bold lg:text-3xl">Lineas Tematicas</h2>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Explore los indicadores clave de Medellin organizados en 6 lineas tematicas
          de seguimiento al Plan de Desarrollo.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {THEMATIC_LINES.map((line) => {
          const data = mockData[line.slug];
          return (
            <ThemeCard
              key={line.slug}
              slug={line.slug}
              name={line.name}
              color={line.color}
              bgColor={line.bgColor}
              icon={line.icon}
              mainKpi={data.mainKpi}
              sparklineData={data.sparkline}
              indicatorCount={data.count}
            />
          );
        })}
      </div>
    </SectionWrapper>
  );
}
