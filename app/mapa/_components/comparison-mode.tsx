"use client";

import { motion } from "framer-motion";
import { X, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TERRITORIES } from "@/lib/mock-data/territories";
import {
  MAP_INDICATORS_DATA,
  MAP_INDICATOR_OPTIONS,
} from "@/lib/mock-data/map-indicators";
import { formatNumber } from "@/lib/utils";

type ComparisonModeProps = {
  comunaA: string;
  comunaB: string;
  selectedYear: number;
  onClose: () => void;
};

export function ComparisonMode({
  comunaA,
  comunaB,
  selectedYear,
  onClose,
}: ComparisonModeProps) {
  const territoryA = TERRITORIES.find((t) => t.codigo === comunaA);
  const territoryB = TERRITORIES.find((t) => t.codigo === comunaB);

  if (!territoryA || !territoryB) return null;

  const getIndicatorValue = (
    territorio: string,
    indicador: string
  ): number | undefined => {
    return MAP_INDICATORS_DATA.find(
      (d) =>
        d.territorio_codigo === territorio &&
        d.indicador === indicador &&
        d.year === selectedYear
    )?.valor;
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 w-full max-w-2xl pointer-events-auto"
    >
      <div className="rounded-xl bg-background/95 backdrop-blur shadow-xl border overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-institucional/5">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-institucional" />
            <span className="text-sm font-semibold text-institucional">
              Comparacion territorial
            </span>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-[1fr_100px_100px] gap-2 px-4 py-2 border-b bg-muted/30">
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            Indicador
          </span>
          <span className="text-[10px] font-medium text-institucional uppercase tracking-wider text-center">
            {territoryA.nombre}
          </span>
          <span className="text-[10px] font-medium text-institucional uppercase tracking-wider text-center">
            {territoryB.nombre}
          </span>
        </div>

        {/* Rows */}
        <div className="max-h-60 overflow-y-auto">
          {MAP_INDICATOR_OPTIONS.map((opt) => {
            const valA = getIndicatorValue(comunaA, opt.value);
            const valB = getIndicatorValue(comunaB, opt.value);

            // Determine which is better
            let aHighlight = "";
            let bHighlight = "";
            if (valA !== undefined && valB !== undefined) {
              const aIsBetter = opt.positiveIsGood
                ? valA > valB
                : valA < valB;
              const bIsBetter = opt.positiveIsGood
                ? valB > valA
                : valB < valA;
              if (aIsBetter) aHighlight = "text-positivo font-bold";
              if (bIsBetter) bHighlight = "text-positivo font-bold";
              if (!aIsBetter && !bIsBetter) {
                // Equal
                aHighlight = "font-bold";
                bHighlight = "font-bold";
              }
            }

            return (
              <div
                key={opt.value}
                className="grid grid-cols-[1fr_100px_100px] gap-2 px-4 py-2 border-b last:border-b-0 hover:bg-muted/20 transition-colors"
              >
                <div>
                  <span className="text-xs">{opt.label}</span>
                  <span className="text-[10px] text-muted-foreground ml-1">
                    {opt.unit}
                  </span>
                </div>
                <span className={`text-xs text-center ${aHighlight}`}>
                  {valA !== undefined ? formatNumber(valA, 1) : "N/D"}
                </span>
                <span className={`text-xs text-center ${bHighlight}`}>
                  {valB !== undefined ? formatNumber(valB, 1) : "N/D"}
                </span>
              </div>
            );
          })}
        </div>

        <div className="px-4 py-2 border-t bg-muted/20">
          <p className="text-[10px] text-muted-foreground text-center">
            Haz clic en otra comuna para cambiar la comparacion. Los valores en
            verde indican mejor desempeno relativo.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
