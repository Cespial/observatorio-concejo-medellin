"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { ChartWrapper } from "./chart-wrapper";
import type { BaseChartProps, HeatmapCell } from "@/lib/types/chart";

type ObHeatmapChartProps = BaseChartProps & {
  data: HeatmapCell[];
  colorRange?: [string, string];
};

export function ObHeatmapChart({
  data,
  title,
  source,
  height = 300,
  className,
  loading,
  colorRange = ["#EFF3F7", "#1B3A5C"],
}: ObHeatmapChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 30, right: 10, bottom: 10, left: 80 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    const xLabels = [...new Set(data.map((d) => d.x))];
    const yLabels = [...new Set(data.map((d) => d.y))];
    const values = data.map((d) => d.value);

    const x = d3.scaleBand().domain(xLabels).range([0, width]).padding(0.05);
    const y = d3.scaleBand().domain(yLabels).range([0, h]).padding(0.05);
    const color = d3.scaleLinear<string>()
      .domain([Math.min(...values), Math.max(...values)])
      .range(colorRange);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.x) || 0)
      .attr("y", (d) => y(d.y) || 0)
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .attr("rx", 3)
      .attr("fill", (d) => color(d.value));

    g.append("g")
      .attr("transform", "translate(0, -5)")
      .selectAll("text")
      .data(xLabels)
      .join("text")
      .attr("x", (d) => (x(d) || 0) + x.bandwidth() / 2)
      .attr("text-anchor", "middle")
      .attr("class", "fill-muted-foreground text-[10px]")
      .text((d) => d);

    g.append("g")
      .attr("transform", "translate(-5, 0)")
      .selectAll("text")
      .data(yLabels)
      .join("text")
      .attr("y", (d) => (y(d) || 0) + y.bandwidth() / 2)
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "middle")
      .attr("class", "fill-muted-foreground text-[10px]")
      .text((d) => d);
  }, [data, height, colorRange]);

  return (
    <ChartWrapper title={title} source={source} height={height} className={className} loading={loading}>
      <svg ref={svgRef} width="100%" height={height} />
    </ChartWrapper>
  );
}
