"use client";

import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartWrapper } from "./chart-wrapper";
import { ChartTooltip } from "./chart-tooltip";
import { INSTITUTIONAL_COLORS } from "./chart-colors";
import { formatNumber } from "@/lib/utils";
import type { BaseChartProps, DataPoint } from "@/lib/types/chart";

type ObPieChartProps = BaseChartProps & {
  data: DataPoint[];
  donut?: boolean;
  centerLabel?: string;
  centerValue?: number;
};

export function ObPieChart({
  data,
  title,
  source,
  height = 300,
  className,
  loading,
  donut = true,
  centerLabel,
  centerValue,
}: ObPieChartProps) {
  const innerRadius = donut ? "55%" : 0;

  return (
    <ChartWrapper title={title} source={source} height={height} className={className} loading={loading}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius="80%"
            dataKey="value"
            nameKey="label"
            paddingAngle={2}
          >
            {data.map((entry, i) => (
              <Cell
                key={entry.label}
                fill={entry.color || INSTITUTIONAL_COLORS[i % INSTITUTIONAL_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip />} />
          {donut && centerValue !== undefined && (
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
              <tspan x="50%" dy="-0.5em" className="fill-foreground text-2xl font-bold">
                {formatNumber(centerValue)}
              </tspan>
              {centerLabel && (
                <tspan x="50%" dy="1.5em" className="fill-muted-foreground text-xs">
                  {centerLabel}
                </tspan>
              )}
            </text>
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
