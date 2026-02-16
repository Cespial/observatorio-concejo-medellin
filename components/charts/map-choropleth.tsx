"use client";

import { useEffect, useRef, useState } from "react";
import { ChartWrapper } from "./chart-wrapper";
import type { BaseChartProps, ChoroplethDatum } from "@/lib/types/chart";

type ObMapChoroplethProps = BaseChartProps & {
  data: ChoroplethDatum[];
  geojsonUrl?: string;
  onComunaClick?: (codigo: string) => void;
  onComunaHover?: (datum: ChoroplethDatum | null) => void;
};

export function ObMapChoropleth({
  data,
  title,
  source,
  height = 400,
  className,
  loading,
  geojsonUrl = "/geojson/comunas-medellin.geojson",
  onComunaClick,
  onComunaHover,
}: ObMapChoroplethProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) return;

    import("mapbox-gl").then((mapboxgl) => {
      mapboxgl.default.accessToken = token;

      const map = new mapboxgl.default.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/light-v11",
        center: [-75.5636, 6.2518],
        zoom: 11.5,
        attributionControl: false,
      });

      map.addControl(new mapboxgl.default.NavigationControl(), "top-right");

      map.on("load", () => {
        setMapLoaded(true);

        map.addSource("comunas", {
          type: "geojson",
          data: geojsonUrl,
        });

        const colorExpression: unknown[] = ["match", ["get", "codigo"]];
        data.forEach((d) => {
          if (d.color) {
            colorExpression.push(d.codigo, d.color);
          }
        });
        colorExpression.push("#E5E7EB");

        map.addLayer({
          id: "comunas-fill",
          type: "fill",
          source: "comunas",
          paint: {
            "fill-color": colorExpression as mapboxgl.Expression,
            "fill-opacity": 0.7,
          },
        });

        map.addLayer({
          id: "comunas-border",
          type: "line",
          source: "comunas",
          paint: {
            "line-color": "#1B3A5C",
            "line-width": 1,
          },
        });

        map.on("click", "comunas-fill", (e) => {
          const feature = e.features?.[0];
          if (feature && onComunaClick) {
            onComunaClick(feature.properties?.codigo);
          }
        });

        map.on("mousemove", "comunas-fill", (e) => {
          map.getCanvas().style.cursor = "pointer";
          const feature = e.features?.[0];
          if (feature && onComunaHover) {
            const codigo = feature.properties?.codigo;
            const datum = data.find((d) => d.codigo === codigo);
            onComunaHover(datum || null);
          }
        });

        map.on("mouseleave", "comunas-fill", () => {
          map.getCanvas().style.cursor = "";
          onComunaHover?.(null);
        });
      });

      mapRef.current = map;
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [data, geojsonUrl, onComunaClick, onComunaHover]);

  return (
    <ChartWrapper title={title} source={source} height={height} className={className} loading={loading || !mapLoaded}>
      <div ref={mapContainer} style={{ height }} className="rounded-md overflow-hidden" />
    </ChartWrapper>
  );
}
