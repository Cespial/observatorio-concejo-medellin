"use client";

import { useState } from "react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { ObMapChoropleth } from "@/components/charts/map-choropleth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatNumber } from "@/lib/utils";
import { getSequentialColor } from "@/components/charts/chart-colors";
import type { ChoroplethDatum } from "@/lib/types/chart";

const indicators = [
  { value: "homicidios", label: "Tasa de homicidios" },
  { value: "desempleo", label: "Tasa de desempleo" },
  { value: "pm25", label: "PM2.5 promedio" },
  { value: "cobertura_edu", label: "Cobertura educativa" },
];

const fallbackChoropleth: ChoroplethDatum[] = [
  { codigo: "COM01", nombre: "Popular", valor: 32.1 },
  { codigo: "COM02", nombre: "Santa Cruz", valor: 28.4 },
  { codigo: "COM03", nombre: "Manrique", valor: 25.7 },
  { codigo: "COM04", nombre: "Aranjuez", valor: 18.2 },
  { codigo: "COM05", nombre: "Castilla", valor: 14.6 },
  { codigo: "COM06", nombre: "Doce de Octubre", valor: 20.1 },
  { codigo: "COM07", nombre: "Robledo", valor: 12.3 },
  { codigo: "COM08", nombre: "Villa Hermosa", valor: 22.8 },
  { codigo: "COM09", nombre: "Buenos Aires", valor: 19.5 },
  { codigo: "COM10", nombre: "La Candelaria", valor: 35.2 },
  { codigo: "COM11", nombre: "Laureles-Estadio", valor: 5.1 },
  { codigo: "COM12", nombre: "La America", valor: 7.8 },
  { codigo: "COM13", nombre: "San Javier", valor: 27.3 },
  { codigo: "COM14", nombre: "El Poblado", valor: 3.2 },
  { codigo: "COM15", nombre: "Guayabal", valor: 11.4 },
  { codigo: "COM16", nombre: "Belen", valor: 9.7 },
];

type CityPulseSectionProps = {
  serverChoroplethData?: Record<string, ChoroplethDatum[]>;
};

export function CityPulseSection({ serverChoroplethData }: CityPulseSectionProps) {
  const [selectedIndicator, setSelectedIndicator] = useState("homicidios");
  const [hoveredComuna, setHoveredComuna] = useState<ChoroplethDatum | null>(null);

  // Use server data if available, fall back to mock transformations
  const choroplethMap = serverChoroplethData ?? {
    homicidios: fallbackChoropleth,
    desempleo: fallbackChoropleth.map((d) => ({ ...d, valor: Math.round((d.valor * 0.4 + 5) * 10) / 10 })),
    pm25: fallbackChoropleth.map((d) => ({ ...d, valor: Math.round((d.valor * 0.8 + 15) * 10) / 10 })),
    cobertura_edu: fallbackChoropleth.map((d) => ({ ...d, valor: Math.round((100 - d.valor * 0.3) * 10) / 10 })),
  };

  const data = choroplethMap[selectedIndicator] || [];
  const values = data.map((d) => d.valor);
  const min = Math.min(...values);
  const max = Math.max(...values);

  const coloredData = data.map((d) => ({
    ...d,
    color: getSequentialColor(d.valor, min, max),
  }));

  return (
    <SectionWrapper>
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-bold lg:text-3xl">Pulso de la Ciudad</h2>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Explora indicadores a nivel de comuna. Selecciona un indicador y haz hover
          sobre cada zona para ver el detalle.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-4">
            <Select value={selectedIndicator} onValueChange={setSelectedIndicator}>
              <SelectTrigger className="w-64"><SelectValue /></SelectTrigger>
              <SelectContent>
                {indicators.map((ind) => (
                  <SelectItem key={ind.value} value={ind.value}>{ind.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ObMapChoropleth data={coloredData} height={450} onComunaHover={setHoveredComuna} />
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                {hoveredComuna ? hoveredComuna.nombre : "Seleccione una comuna"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {hoveredComuna ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Codigo</p>
                    <p className="font-medium">{hoveredComuna.codigo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Valor</p>
                    <p className="text-2xl font-bold">{formatNumber(hoveredComuna.valor, 1)}</p>
                  </div>
                  <div className="h-3 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${((hoveredComuna.valor - min) / (max - min)) * 100}%`,
                        backgroundColor: getSequentialColor(hoveredComuna.valor, min, max),
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Rango: {formatNumber(min, 1)} — {formatNumber(max, 1)}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Pase el cursor sobre una comuna en el mapa para ver detalles.
                </p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Ranking</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {[...data].sort((a, b) => b.valor - a.valor).slice(0, 5).map((d, i) => (
                <div key={d.codigo} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{i + 1}. {d.nombre}</span>
                  <span className="font-medium">{formatNumber(d.valor, 1)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionWrapper>
  );
}
