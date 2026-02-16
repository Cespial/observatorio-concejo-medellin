"use client";

import {
  RadarChart as RechartsRadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChartWrapper } from "./chart-wrapper";
import { INSTITUTIONAL_COLORS } from "./chart-colors";
import type { BaseChartProps } from "@/lib/types/chart";

type RadarSeries = {
  key: string;
  name: string;
  color?: string;
};

type ObRadarChartProps = BaseChartProps & {
  data: Record<string, unknown>[];
  labelKey: string;
  series: RadarSeries[];
};

export function ObRadarChart({
  data,
  labelKey,
  series,
  title,
  source,
  height = 300,
  className,
  loading,
}: ObRadarChartProps) {
  return (
    <ChartWrapper title={title} source={source} height={height} className={className} loading={loading}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis dataKey={labelKey} tick={{ fontSize: 11 }} />
          <PolarRadiusAxis tick={{ fontSize: 10 }} />
          <Tooltip />
          {series.map((s, i) => (
            <Radar
              key={s.key}
              name={s.name}
              dataKey={s.key}
              stroke={s.color || INSTITUTIONAL_COLORS[i % INSTITUTIONAL_COLORS.length]}
              fill={s.color || INSTITUTIONAL_COLORS[i % INSTITUTIONAL_COLORS.length]}
              fillOpacity={0.2}
            />
          ))}
        </RechartsRadarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
