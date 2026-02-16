"use client";

import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/utils";

type TickerItem = {
  label: string;
  value: number;
  change: number;
  unit?: string;
};

type TopTickerProps = {
  items: TickerItem[];
  className?: string;
};

export function TopTicker({ items, className }: TopTickerProps) {
  const duplicated = [...items, ...items];

  return (
    <div className={cn("overflow-hidden bg-institucional text-white text-xs py-1.5", className)}>
      <div className="flex animate-ticker-scroll whitespace-nowrap">
        {duplicated.map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-6">
            <span className="text-white/70">{item.label}</span>
            <span className="font-semibold">
              {formatNumber(item.value)}{item.unit}
            </span>
            <span
              className={cn(
                "font-medium",
                item.change > 0 ? "text-green-400" : item.change < 0 ? "text-red-400" : "text-white/50"
              )}
            >
              {item.change > 0 ? "\u25B2" : item.change < 0 ? "\u25BC" : "\u2013"}{" "}
              {Math.abs(item.change).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
