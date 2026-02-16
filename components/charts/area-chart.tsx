"use client";

import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartWrapper } from "./chart-wrapper";
import { ChartTooltip } from "./chart-tooltip";
import { INSTITUTIONAL_COLORS } from "./chart-colors";
import type { BaseChartProps } from "@/lib/types/chart";

type AreaSeries = {
  key: string;
  name: string;
  color?: string;
};

type ObAreaChartProps = BaseChartProps & {
  data: Record<string, unknown>[];
  xKey: string;
  series: AreaSeries[];
  stacked?: boolean;
};

export function ObAreaChart({
  data,
  xKey,
  series,
  title,
  source,
  height = 300,
  className,
  loading,
  stacked = false,
}: ObAreaChartProps) {
  return (
    <ChartWrapper title={title} source={source} height={height} className={className} loading={loading}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <defs>
            {series.map((s, i) => {
              const color = s.color || INSTITUTIONAL_COLORS[i % INSTITUTIONAL_COLORS.length];
              return (
                <linearGradient key={s.key} id={`gradient-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              );
            })}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey={xKey} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
          <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
          <Tooltip content={<ChartTooltip />} />
          {series.map((s, i) => (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.name}
              stroke={s.color || INSTITUTIONAL_COLORS[i % INSTITUTIONAL_COLORS.length]}
              fill={`url(#gradient-${s.key})`}
              strokeWidth={2}
              stackId={stacked ? "stack" : undefined}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
