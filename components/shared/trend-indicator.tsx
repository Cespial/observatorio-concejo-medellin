"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type TrendIndicatorProps = {
  value: number;
  positiveIsGood?: boolean;
  showIcon?: boolean;
  className?: string;
};

export function TrendIndicator({
  value,
  positiveIsGood = true,
  showIcon = true,
  className,
}: TrendIndicatorProps) {
  const isPositive = value > 0;
  const isNeutral = value === 0;

  const isGood = positiveIsGood ? isPositive : !isPositive;
  const colorClass = isNeutral
    ? "text-muted-foreground"
    : isGood
    ? "text-positivo"
    : "text-negativo";

  const Icon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;

  return (
    <span className={cn("inline-flex items-center gap-1 text-sm font-medium", colorClass, className)}>
      {showIcon && <Icon className="h-3.5 w-3.5" />}
      <span>{isPositive ? "+" : ""}{value.toFixed(1)}%</span>
    </span>
  );
}
