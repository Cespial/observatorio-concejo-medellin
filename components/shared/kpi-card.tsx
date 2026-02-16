"use client";

import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { TrendIndicator } from "@/components/shared/trend-indicator";
import { cn } from "@/lib/utils";

type KpiCardProps = {
  title: string;
  value: number;
  unit?: string;
  change?: number;
  positiveIsGood?: boolean;
  sparklineData?: number[];
  sparklineColor?: string;
  icon?: LucideIcon;
};

function Sparkline({
  data,
  color = "currentColor",
  className,
}: {
  data: number[];
  color?: string;
  className?: string;
}) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const width = 100;
  const height = 32;
  const padding = 2;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
      const y =
        height -
        padding -
        ((value - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("w-full h-8", className)}
      preserveAspectRatio="none"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function KpiCard({
  title,
  value,
  unit,
  change,
  positiveIsGood = true,
  sparklineData,
  sparklineColor = "hsl(var(--primary))",
  icon: Icon,
}: KpiCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            {Icon && (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                <Icon className="h-5 w-5" />
              </div>
            )}
            <p className="text-sm text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-1">
              <AnimatedCounter
                value={value}
                className="text-2xl font-bold tracking-tight"
              />
              {unit && (
                <span className="text-sm text-muted-foreground">{unit}</span>
              )}
            </div>
            {change !== undefined && (
              <TrendIndicator value={change} positiveIsGood={positiveIsGood} />
            )}
          </div>
        </div>

        {sparklineData && sparklineData.length >= 2 && (
          <div className="mt-4 -mx-1">
            <Sparkline data={sparklineData} color={sparklineColor} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
