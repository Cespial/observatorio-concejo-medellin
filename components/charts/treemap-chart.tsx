"use client";

import {
  Treemap,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChartWrapper } from "./chart-wrapper";
import { ChartTooltip } from "./chart-tooltip";
import { INSTITUTIONAL_COLORS } from "./chart-colors";
import type { BaseChartProps, TreemapNode } from "@/lib/types/chart";

type ObTreemapChartProps = BaseChartProps & {
  data: TreemapNode[];
};

function TreemapContent(props: Record<string, unknown>) {
  const { x, y, width, height, name, index } = props as {
    x: number; y: number; width: number; height: number; name: string; index: number;
  };

  if (width < 40 || height < 30) return null;

  return (
    <g>
      <rect
        x={x} y={y} width={width} height={height}
        fill={INSTITUTIONAL_COLORS[index % INSTITUTIONAL_COLORS.length]}
        stroke="white" strokeWidth={2} rx={4}
      />
      <text
        x={x + width / 2} y={y + height / 2}
        textAnchor="middle" dominantBaseline="middle"
        className="fill-white text-xs font-medium"
      >
        {name}
      </text>
    </g>
  );
}

export function ObTreemapChart({
  data, title, source, height = 300, className, loading,
}: ObTreemapChartProps) {
  return (
    <ChartWrapper title={title} source={source} height={height} className={className} loading={loading}>
      <ResponsiveContainer width="100%" height={height}>
        <Treemap data={data} dataKey="value" nameKey="name" content={<TreemapContent />}>
          <Tooltip content={<ChartTooltip />} />
        </Treemap>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
