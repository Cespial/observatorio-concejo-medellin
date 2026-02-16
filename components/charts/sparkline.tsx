"use client";

import { cn } from "@/lib/utils";

type SparklineProps = {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  className?: string;
};

export function Sparkline({
  data,
  width = 120,
  height = 32,
  color = "#1B3A5C",
  className,
}: SparklineProps) {
  if (!data.length) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 2;

  const points = data
    .map((value, i) => {
      const x = padding + (i / (data.length - 1)) * (width - padding * 2);
      const y = height - padding - ((value - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  const lastX = padding + ((data.length - 1) / (data.length - 1)) * (width - padding * 2);
  const lastY = height - padding - ((data[data.length - 1] - min) / range) * (height - padding * 2);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("overflow-visible", className)}
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={lastX} cy={lastY} r={2.5} fill={color} />
    </svg>
  );
}
