"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { IndicatorSelector } from "./indicator-selector";
import { LayerToggle } from "./layer-toggle";
import { MapLegend } from "./map-legend";
import { TimeSlider } from "./time-slider";
import { ComunaDetailPanel } from "./comuna-detail-panel";
import { ComparisonMode } from "./comparison-mode";
import {
  MAP_INDICATORS_DATA,
  MAP_INDICATOR_OPTIONS,
  type MapIndicatorOption,
} from "@/lib/mock-data/map-indicators";
import type { MapIndicatorData } from "@/lib/mock-data/types";

const MapContainer = dynamic(() => import("./map-container"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-muted/30">
      <div className="text-center space-y-3">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-institucional border-t-transparent" />
        <p className="text-sm text-muted-foreground">Cargando mapa...</p>
      </div>
    </div>
  ),
});

type MapPageClientProps = {
  serverIndicatorData?: MapIndicatorData[];
  serverIndicatorOptions?: MapIndicatorOption[];
};

export function MapPageClient({
  serverIndicatorData,
  serverIndicatorOptions,
}: MapPageClientProps) {
  // Use server data if available, fall back to mock
  const indicatorData = serverIndicatorData?.length
    ? serverIndicatorData
    : MAP_INDICATORS_DATA;
  const indicatorOptions = serverIndicatorOptions?.length
    ? serverIndicatorOptions
    : MAP_INDICATOR_OPTIONS;

  const [selectedIndicator, setSelectedIndicator] = useState("homicidios_tasa");
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedComuna, setSelectedComuna] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"choropleth" | "bubble">(
    "choropleth"
  );
  const [comparisonComuna, setComparisonComuna] = useState<string | null>(null);

  const currentIndicatorOption = indicatorOptions.find(
    (opt) => opt.value === selectedIndicator
  );

  // Get min/max for current indicator + year (for legend)
  const currentValues = indicatorData.filter(
    (d) => d.indicador === selectedIndicator && d.year === selectedYear
  ).map((d) => d.valor);

  const minValue = currentValues.length ? Math.min(...currentValues) : 0;
  const maxValue = currentValues.length ? Math.max(...currentValues) : 100;

  const handleComunaSelect = useCallback(
    (codigo: string | null) => {
      // If clicking a second comuna while one is already selected,
      // set as comparison. Otherwise replace.
      if (codigo && selectedComuna && codigo !== selectedComuna) {
        setComparisonComuna(codigo);
      } else {
        setSelectedComuna(codigo);
        setComparisonComuna(null);
      }
    },
    [selectedComuna]
  );

  const handleClosePanel = useCallback(() => {
    setSelectedComuna(null);
    setComparisonComuna(null);
  }, []);

  const handleCloseComparison = useCallback(() => {
    setComparisonComuna(null);
  }, []);

  return (
    <div className="relative h-full w-full">
      {/* Map layer */}
      <div className="absolute inset-0 z-0">
        <MapContainer
          selectedIndicator={selectedIndicator}
          selectedYear={selectedYear}
          viewMode={viewMode}
          selectedComuna={selectedComuna}
          onComunaSelect={handleComunaSelect}
        />
      </div>

      {/* Overlay: Top-left controls */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none flex flex-col gap-2">
        <div className="pointer-events-auto">
          <IndicatorSelector
            value={selectedIndicator}
            onChange={setSelectedIndicator}
          />
        </div>
        <div className="pointer-events-auto">
          <LayerToggle value={viewMode} onChange={setViewMode} />
        </div>
      </div>

      {/* Overlay: Bottom-left legend */}
      <div className="absolute bottom-20 left-4 z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <MapLegend
            colorScale={currentIndicatorOption?.colorScale ?? []}
            label={currentIndicatorOption?.label ?? ""}
            unit={currentIndicatorOption?.unit ?? ""}
            min={minValue}
            max={maxValue}
          />
        </div>
      </div>

      {/* Overlay: Bottom-center time slider */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <TimeSlider value={selectedYear} onChange={setSelectedYear} />
        </div>
      </div>

      {/* Right panel: Comuna detail */}
      <ComunaDetailPanel
        comunaCodigo={selectedComuna}
        selectedIndicator={selectedIndicator}
        selectedYear={selectedYear}
        onClose={handleClosePanel}
      />

      {/* Comparison overlay */}
      {selectedComuna && comparisonComuna && (
        <ComparisonMode
          comunaA={selectedComuna}
          comunaB={comparisonComuna}
          selectedYear={selectedYear}
          onClose={handleCloseComparison}
        />
      )}
    </div>
  );
}
