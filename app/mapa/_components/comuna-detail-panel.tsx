"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Users, Ruler, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sparkline } from "@/components/charts/sparkline";
import { TERRITORIES } from "@/lib/mock-data/territories";
import {
  MAP_INDICATORS_DATA,
  MAP_INDICATOR_OPTIONS,
} from "@/lib/mock-data/map-indicators";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";

type ComunaDetailPanelProps = {
  comunaCodigo: string | null;
  selectedIndicator: string;
  selectedYear: number;
  onClose: () => void;
};

export function ComunaDetailPanel({
  comunaCodigo,
  selectedIndicator,
  selectedYear,
  onClose,
}: ComunaDetailPanelProps) {
  const territory = comunaCodigo
    ? TERRITORIES.find((t) => t.codigo === comunaCodigo)
    : null;

  // Get data for the selected comuna across all years for the selected indicator
  const trendData = comunaCodigo
    ? [2023, 2024, 2025]
        .map((year) => {
          const d = MAP_INDICATORS_DATA.find(
            (item) =>
              item.territorio_codigo === comunaCodigo &&
              item.indicador === selectedIndicator &&
              item.year === year
          );
          return d?.valor ?? 0;
        })
    : [];

  // Current value
  const currentValue = comunaCodigo
    ? MAP_INDICATORS_DATA.find(
        (d) =>
          d.territorio_codigo === comunaCodigo &&
          d.indicador === selectedIndicator &&
          d.year === selectedYear
      )?.valor
    : undefined;

  // District average for the indicator + year
  const allValuesForYear = MAP_INDICATORS_DATA.filter(
    (d) => d.indicador === selectedIndicator && d.year === selectedYear
  );
  const districtAvg =
    allValuesForYear.length > 0
      ? allValuesForYear.reduce((sum, d) => sum + d.valor, 0) /
        allValuesForYear.length
      : 0;

  const currentIndicatorOption = MAP_INDICATOR_OPTIONS.find(
    (o) => o.value === selectedIndicator
  );

  // All indicators for this comuna in the selected year
  const allIndicatorsForComuna = comunaCodigo
    ? MAP_INDICATOR_OPTIONS.map((opt) => {
        const d = MAP_INDICATORS_DATA.find(
          (item) =>
            item.territorio_codigo === comunaCodigo &&
            item.indicador === opt.value &&
            item.year === selectedYear
        );
        return {
          ...opt,
          valor: d?.valor,
        };
      })
    : [];

  return (
    <AnimatePresence>
      {comunaCodigo && territory && (
        <motion.div
          key="detail-panel"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="absolute top-0 right-0 z-20 h-full w-full max-w-sm bg-background/95 backdrop-blur-sm border-l shadow-xl overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b p-4 flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                {territory.tipo === "comuna" ? "Comuna" : "Corregimiento"}{" "}
                {territory.codigo}
              </p>
              <h2 className="text-lg font-serif font-bold text-institucional">
                {territory.nombre}
              </h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Cerrar</span>
            </Button>
          </div>

          <div className="p-4 space-y-5">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-muted/50 p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Poblacion
                  </span>
                </div>
                <p className="text-sm font-bold">
                  {formatNumber(territory.poblacion)}
                </p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Ruler className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Area
                  </span>
                </div>
                <p className="text-sm font-bold">
                  {territory.area_km2} km<sup>2</sup>
                </p>
              </div>
            </div>

            {/* Main indicator value */}
            <div className="rounded-lg border p-4">
              <p className="text-xs text-muted-foreground mb-1">
                {currentIndicatorOption?.label ?? selectedIndicator}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-institucional">
                  {currentValue !== undefined
                    ? formatNumber(currentValue, 1)
                    : "N/D"}
                </span>
                {currentIndicatorOption?.unit && (
                  <span className="text-sm text-muted-foreground">
                    {currentIndicatorOption.unit}
                  </span>
                )}
              </div>

              {/* Comparison to district average */}
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">
                  Promedio distrital:
                </span>
                <span className="font-medium">
                  {formatNumber(districtAvg, 1)}
                </span>
                {currentValue !== undefined && (
                  <span
                    className={
                      currentValue > districtAvg
                        ? currentIndicatorOption?.positiveIsGood
                          ? "text-positivo"
                          : "text-negativo"
                        : currentIndicatorOption?.positiveIsGood
                          ? "text-negativo"
                          : "text-positivo"
                    }
                  >
                    {currentValue > districtAvg ? "+" : ""}
                    {formatNumber(
                      ((currentValue - districtAvg) / districtAvg) * 100,
                      1
                    )}
                    %
                  </span>
                )}
              </div>

              {/* Sparkline trend */}
              {trendData.length >= 2 && (
                <div className="mt-3">
                  <p className="text-[10px] text-muted-foreground mb-1">
                    Tendencia 2023-2025
                  </p>
                  <Sparkline
                    data={trendData}
                    width={260}
                    height={40}
                    color="#1B3A5C"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
                    <span>2023</span>
                    <span>2024</span>
                    <span>2025</span>
                  </div>
                </div>
              )}
            </div>

            {/* All indicators for this comuna */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Todos los indicadores ({selectedYear})
              </h3>
              <div className="space-y-2">
                {allIndicatorsForComuna.map((ind) => {
                  const avg =
                    MAP_INDICATORS_DATA.filter(
                      (d) =>
                        d.indicador === ind.value && d.year === selectedYear
                    ).reduce((sum, d) => sum + d.valor, 0) /
                    (allValuesForYear.length || 1);

                  return (
                    <div
                      key={ind.value}
                      className={`rounded-md border p-3 transition-colors cursor-pointer hover:bg-muted/50 ${
                        ind.value === selectedIndicator
                          ? "border-institucional/30 bg-institucional/5"
                          : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {ind.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {ind.unit}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between mt-1">
                        <span className="text-sm font-bold">
                          {ind.valor !== undefined
                            ? formatNumber(ind.valor, 1)
                            : "N/D"}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          prom. {formatNumber(avg, 1)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Link to thematic pages */}
            <Button variant="outline" className="w-full gap-2" asChild>
              <Link href="/tematicas/seguridad">
                Ver todas las lineas tematicas
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
