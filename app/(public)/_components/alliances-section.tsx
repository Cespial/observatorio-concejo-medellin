"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { SectionWrapper } from "@/components/shared/section-wrapper";

type AllianceNode = d3.SimulationNodeDatum & {
  id: string;
  name: string;
  type: string;
  radius: number;
};

type AllianceLink = d3.SimulationLinkDatum<AllianceNode> & {
  source: string;
  target: string;
};

const nodesData: AllianceNode[] = [
  { id: "observatorio", name: "Observatorio", type: "centro", radius: 30 },
  { id: "eafit", name: "EAFIT", type: "universidad", radius: 22 },
  { id: "concejo", name: "Concejo", type: "gobierno", radius: 22 },
  { id: "dane", name: "DANE", type: "gobierno", radius: 16 },
  { id: "alcaldia", name: "Alcaldia", type: "gobierno", radius: 18 },
  { id: "metro", name: "Metro", type: "empresa", radius: 14 },
  { id: "epm", name: "EPM", type: "empresa", radius: 14 },
  { id: "camara", name: "Camara Com.", type: "empresa", radius: 14 },
  { id: "area", name: "Area Met.", type: "gobierno", radius: 14 },
  { id: "udea", name: "U de A", type: "universidad", radius: 14 },
  { id: "unal", name: "UNAL", type: "universidad", radius: 14 },
];

const linksData: AllianceLink[] = [
  { source: "observatorio", target: "eafit" },
  { source: "observatorio", target: "concejo" },
  { source: "observatorio", target: "dane" },
  { source: "observatorio", target: "alcaldia" },
  { source: "observatorio", target: "metro" },
  { source: "observatorio", target: "epm" },
  { source: "observatorio", target: "camara" },
  { source: "observatorio", target: "area" },
  { source: "eafit", target: "udea" },
  { source: "eafit", target: "unal" },
  { source: "concejo", target: "alcaldia" },
  { source: "alcaldia", target: "dane" },
];

const typeColors: Record<string, string> = {
  centro: "#C9A94E",
  universidad: "#2563EB",
  gobierno: "#1B3A5C",
  ong: "#16A34A",
  empresa: "#7C3AED",
};

export function AlliancesSection() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = svgRef.current.clientWidth || 700;
    const height = 400;

    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const nodes = nodesData.map((d) => ({ ...d }));
    const links = linksData.map((d) => ({ ...d }));

    const simulation = d3.forceSimulation<AllianceNode>(nodes)
      .force("link", d3.forceLink<AllianceNode, AllianceLink>(links).id((d) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide<AllianceNode>().radius((d) => d.radius + 5));

    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "hsl(var(--border))")
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.6);

    const node = svg.append("g")
      .selectAll<SVGGElement, AllianceNode>("g")
      .data(nodes)
      .join("g")
      .style("cursor", "pointer");

    node.append("circle")
      .attr("r", (d) => d.radius)
      .attr("fill", (d) => typeColors[d.type] || "#999")
      .attr("fill-opacity", 0.15)
      .attr("stroke", (d) => typeColors[d.type] || "#999")
      .attr("stroke-width", 2);

    node.append("text")
      .text((d) => d.name)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("class", "fill-foreground")
      .style("font-size", (d) => (d.type === "centro" ? "11px" : "9px"))
      .style("font-weight", (d) => (d.type === "centro" ? "600" : "400"))
      .style("pointer-events", "none");

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as AllianceNode).x || 0)
        .attr("y1", (d) => (d.source as AllianceNode).y || 0)
        .attr("x2", (d) => (d.target as AllianceNode).x || 0)
        .attr("y2", (d) => (d.target as AllianceNode).y || 0);

      node.attr("transform", (d) => `translate(${d.x || 0},${d.y || 0})`);
    });

    return () => { simulation.stop(); };
  }, []);

  return (
    <SectionWrapper className="bg-muted/30">
      <div className="mb-8 text-center">
        <h2 className="font-serif text-2xl font-bold lg:text-3xl">Red de Aliados</h2>
        <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
          Instituciones y organizaciones que aportan datos y conocimiento al Observatorio Distrital.
        </p>
      </div>
      <div className="mx-auto max-w-3xl">
        <svg ref={svgRef} width="100%" height={400} />
      </div>
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {Object.entries(typeColors).map(([type, color]) => (
          <div key={type} className="flex items-center gap-2 text-sm">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
            <span className="capitalize text-muted-foreground">{type}</span>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
