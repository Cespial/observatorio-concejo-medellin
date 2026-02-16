"use client";

import { formatNumber } from "@/lib/utils";

type MapLegendProps = {
  colorScale: string[];
  label: string;
  unit: string;
  min: number;
  max: number;
};

export function MapLegend({ colorScale, label, unit, min, max }: MapLegendProps) {
  if (colorScale.length === 0) return null;

  const mid = (min + max) / 2;
  const gradientStr = colorScale
    .map((c, i) => `${c} ${(i / (colorScale.length - 1)) * 100}%`)
    .join(", ");

  return (
    <div className="rounded-lg bg-background/95 backdrop-blur shadow-lg border p-3 w-56">
      <p className="text-xs font-medium text-foreground mb-1">{label}</p>
      {unit && (
        <p className="text-[10px] text-muted-foreground mb-2">{unit}</p>
      )}
      <div
        className="h-3 rounded-full w-full mb-1.5"
        style={{
          background: `linear-gradient(to right, ${gradientStr})`,
        }}
      />
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>{formatNumber(min, 1)}</span>
        <span>{formatNumber(mid, 1)}</span>
        <span>{formatNumber(max, 1)}</span>
      </div>
    </div>
  );
}
