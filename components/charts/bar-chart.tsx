"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartWrapper } from "./chart-wrapper";
import { ChartTooltip } from "./chart-tooltip";
import { INSTITUTIONAL_COLORS } from "./chart-colors";
import type { BaseChartProps } from "@/lib/types/chart";

type BarSeries = {
  key: string;
  name: string;
  color?: string;
};

type ObBarChartProps = BaseChartProps & {
  data: Record<string, unknown>[];
  xKey: string;
  series: BarSeries[];
  layout?: "vertical" | "horizontal";
  stacked?: boolean;
};

export function ObBarChart({
  data,
  xKey,
  series,
  title,
  source,
  height = 300,
  className,
  loading,
  layout = "horizontal",
  stacked = false,
}: ObBarChartProps) {
  const stackId = stacked ? "stack" : undefined;

  return (
    <ChartWrapper title={title} source={source} height={height} className={className} loading={loading}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          layout={layout === "vertical" ? "vertical" : "horizontal"}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          {layout === "vertical" ? (
            <>
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey={xKey} type="category" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" width={100} />
            </>
          ) : (
            <>
              <XAxis dataKey={xKey} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
            </>
          )}
          <Tooltip content={<ChartTooltip />} />
          <Legend />
          {series.map((s, i) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.name}
              fill={s.color || INSTITUTIONAL_COLORS[i % INSTITUTIONAL_COLORS.length]}
              stackId={stackId}
              radius={stacked ? 0 : [4, 4, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
