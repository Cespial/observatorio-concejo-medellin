"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { ChartWrapper } from "./chart-wrapper";
import { formatNumber } from "@/lib/utils";
import type { BaseChartProps, GaugeData } from "@/lib/types/chart";

type ObGaugeChartProps = BaseChartProps & {
  data: GaugeData;
};

export function ObGaugeChart({
  data,
  title,
  source,
  height = 200,
  className,
  loading,
}: ObGaugeChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = svgRef.current.clientWidth;
    const h = height;
    const radius = Math.min(width, h * 2) / 2 - 20;
    const centerX = width / 2;
    const centerY = h - 20;

    const g = svg.append("g").attr("transform", `translate(${centerX}, ${centerY})`);

    const scale = d3
      .scaleLinear()
      .domain([data.min, data.max])
      .range([-Math.PI / 2, Math.PI / 2])
      .clamp(true);

    const bgArc = d3.arc<unknown>()
      .innerRadius(radius - 20)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2)
      .cornerRadius(10);

    g.append("path")
      .attr("d", bgArc({}) as string)
      .attr("fill", "hsl(var(--muted))");

    const valueAngle = scale(data.value);
    const colorScale = d3.scaleLinear<string>()
      .domain([data.min, (data.min + data.max) / 2, data.max])
      .range(["#DC2626", "#F59E0B", "#16A34A"]);

    const valueArc = d3.arc<unknown>()
      .innerRadius(radius - 20)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(valueAngle)
      .cornerRadius(10);

    g.append("path")
      .attr("d", valueArc({}) as string)
      .attr("fill", colorScale(data.value));

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-1.5em")
      .attr("class", "fill-foreground text-2xl font-bold")
      .text(formatNumber(data.value));

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.2em")
      .attr("class", "fill-muted-foreground text-xs")
      .text(data.unit);

    if (data.target !== undefined) {
      const targetAngle = scale(data.target);
      const x1 = (radius - 25) * Math.cos(targetAngle - Math.PI / 2);
      const y1 = (radius - 25) * Math.sin(targetAngle - Math.PI / 2);
      const x2 = (radius + 5) * Math.cos(targetAngle - Math.PI / 2);
      const y2 = (radius + 5) * Math.sin(targetAngle - Math.PI / 2);

      g.append("line")
        .attr("x1", x1).attr("y1", y1)
        .attr("x2", x2).attr("y2", y2)
        .attr("stroke", "#1B3A5C")
        .attr("stroke-width", 2);
    }
  }, [data, height]);

  return (
    <ChartWrapper title={title} source={source} height={height} className={className} loading={loading}>
      <svg ref={svgRef} width="100%" height={height} />
    </ChartWrapper>
  );
}
