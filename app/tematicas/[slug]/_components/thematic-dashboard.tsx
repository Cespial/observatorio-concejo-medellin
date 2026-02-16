"use client";

import { getMockDataBySlug } from "@/lib/mock-data";
import { THEMATIC_LINES } from "@/lib/constants";
import { AlertCircle } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";

import { HeaderSection } from "./header-section";
import { KpiRow } from "./kpi-row";
import { TimeSeriesSection } from "./time-series-section";
import { ComparativeBarSection } from "./comparative-bar-section";
import { AreaBreakdownSection } from "./area-breakdown-section";
import { HeatmapSection } from "./heatmap-section";
import { RadarSection } from "./radar-section";
import { GaugeRow } from "./gauge-row";
import { TerritorialTable } from "./territorial-table";
import { RelatedInitiativesSection } from "./related-initiatives-section";

type ThematicDashboardProps = {
  slug: string;
};

export function ThematicDashboard({ slug }: ThematicDashboardProps) {
  const data = getMockDataBySlug(slug);
  const line = THEMATIC_LINES.find((l) => l.slug === slug);

  if (!data || !line) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <EmptyState
          icon={AlertCircle}
          title="Datos no disponibles"
          description="Los datos para esta linea tematica aun no estan disponibles. Estamos trabajando para incorporarlos pronto."
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 space-y-8">
      <HeaderSection slug={slug} />
      <KpiRow kpis={data.kpis} lineColor={line.color} />
      <TimeSeriesSection
        timeSeries={data.timeSeries}
        timeSeriesKeys={data.timeSeriesKeys}
        annotations={data.annotations}
      />
      <ComparativeBarSection
        comunaComparison={data.comunaComparison}
        lineColor={line.color}
      />
      <AreaBreakdownSection
        areaBreakdown={data.areaBreakdown}
        areaBreakdownKeys={data.areaBreakdownKeys}
      />
      <HeatmapSection
        heatmap={data.heatmap}
        lineColor={line.color}
        bgColor={line.bgColor}
      />
      <RadarSection radar={data.radar} lineColor={line.color} />
      <GaugeRow gauges={data.gauges} />
      <TerritorialTable comunaComparison={data.comunaComparison} />
      <RelatedInitiativesSection
        relatedInitiatives={data.relatedInitiatives}
      />
    </div>
  );
}
