"use client";

import {
  LineChart as RechartsLineChart,
  Line,
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

type LineChartSeries = {
  key: string;
  name: string;
  color?: string;
};

type ObLineChartProps = BaseChartProps & {
  data: Record<string, unknown>[];
  xKey: string;
  series: LineChartSeries[];
};

export function ObLineChart({
  data,
  xKey,
  series,
  title,
  source,
  height = 300,
  className,
  loading,
}: ObLineChartProps) {
  return (
    <ChartWrapper title={title} source={source} height={height} className={className} loading={loading}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey={xKey} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
          <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
          <Tooltip content={<ChartTooltip />} />
          <Legend />
          {series.map((s, i) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.name}
              stroke={s.color || INSTITUTIONAL_COLORS[i % INSTITUTIONAL_COLORS.length]}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
