"use client";

import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/utils";

type ChartTooltipProps = {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    unit?: string;
  }>;
  label?: string;
  className?: string;
};

export function ChartTooltip({ active, payload, label, className }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className={cn(
        "rounded-lg border bg-background/95 backdrop-blur p-3 shadow-lg text-sm",
        className
      )}
    >
      {label && <p className="font-medium text-foreground mb-1.5">{label}</p>}
      <div className="space-y-1">
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="h-2.5 w-2.5 rounded-full shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium ml-auto">
              {formatNumber(entry.value)}
              {entry.unit && <span className="text-muted-foreground ml-0.5">{entry.unit}</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
