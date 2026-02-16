"use client";

import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  MAP_INDICATORS_DATA,
  MAP_INDICATOR_OPTIONS,
} from "@/lib/mock-data/map-indicators";
import { TERRITORIES } from "@/lib/mock-data/territories";

type MapContainerProps = {
  selectedIndicator: string;
  selectedYear: number;
  viewMode: "choropleth" | "bubble";
  selectedComuna: string | null;
  onComunaSelect: (codigo: string | null) => void;
};

const MEDELLIN_CENTER: [number, number] = [-75.5812, 6.2442];
const MEDELLIN_ZOOM = 11.5;
const GEOJSON_URL = "/geojson/comunas-medellin.geojson";

// Map GeoJSON "codigo" property (e.g. "COM01") to our territory codigo (e.g. "1")
function geoJsonCodigoToTerritorio(geoCode: string): string {
  // GeoJSON uses "COM01" format - extract number and remove leading zeros
  const match = geoCode.match(/COM(\d+)/);
  if (match) return String(parseInt(match[1], 10));
  // fallback: try direct match
  return geoCode;
}

function buildColorExpression(
  indicador: string,
  year: number
): mapboxgl.Expression {
  const indicatorOption = MAP_INDICATOR_OPTIONS.find(
    (o) => o.value === indicador
  );
  const colorScale = indicatorOption?.colorScale ?? [
    "#eff6ff",
    "#60a5fa",
    "#2563eb",
    "#1e3a8a",
  ];

  // Get values for this indicator + year
  const values = MAP_INDICATORS_DATA.filter(
    (d) => d.indicador === indicador && d.year === year
  );

  if (values.length === 0) {
    return ["literal", "#cccccc"] as unknown as mapboxgl.Expression;
  }

  const nums = values.map((v) => v.valor);
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  const range = max - min || 1;

  // Build a match expression: ["match", ["get", "codigo"], "COM01", color1, "COM02", color2, ..., fallback]
  const matchExpr: (string | mapboxgl.Expression)[] = [
    "match",
    ["get", "codigo"],
  ];

  for (const entry of values) {
    // Find which GeoJSON codigo maps to this territory
    const padded = entry.territorio_codigo.padStart(2, "0");
    const geoCode = `COM${padded}`;
    // Normalize value to 0-1
    const t = (entry.valor - min) / range;
    // Pick color from scale
    const colorIdx = Math.min(
      Math.floor(t * (colorScale.length - 1)),
      colorScale.length - 2
    );
    const localT =
      t * (colorScale.length - 1) - colorIdx;
    // Simple lerp between two hex colors
    const color = lerpColor(
      colorScale[colorIdx],
      colorScale[colorIdx + 1],
      localT
    );
    matchExpr.push(geoCode as string);
    matchExpr.push(color as string);
  }

  // Fallback
  matchExpr.push("#cccccc");

  return matchExpr as unknown as mapboxgl.Expression;
}

function buildBubbleRadiusExpression(
  indicador: string,
  year: number
): mapboxgl.Expression {
  const values = MAP_INDICATORS_DATA.filter(
    (d) => d.indicador === indicador && d.year === year
  );

  if (values.length === 0) {
    return ["literal", 10] as unknown as mapboxgl.Expression;
  }

  const nums = values.map((v) => v.valor);
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  const range = max - min || 1;

  const matchExpr: (string | number | mapboxgl.Expression)[] = [
    "match",
    ["get", "codigo"],
  ];

  for (const entry of values) {
    const padded = entry.territorio_codigo.padStart(2, "0");
    const geoCode = `COM${padded}`;
    const t = (entry.valor - min) / range;
    const radius = 8 + t * 30; // 8px to 38px
    matchExpr.push(geoCode as string);
    matchExpr.push(radius);
  }

  matchExpr.push(10); // fallback
  return matchExpr as unknown as mapboxgl.Expression;
}

function lerpColor(a: string, b: string, t: number): string {
  const ar = parseInt(a.slice(1, 3), 16);
  const ag = parseInt(a.slice(3, 5), 16);
  const ab = parseInt(a.slice(5, 7), 16);
  const br = parseInt(b.slice(1, 3), 16);
  const bg = parseInt(b.slice(3, 5), 16);
  const bb = parseInt(b.slice(5, 7), 16);

  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const blue = Math.round(ab + (bb - ab) * t);

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;
}

export default function MapContainer({
  selectedIndicator,
  selectedYear,
  viewMode,
  selectedComuna,
  onComunaSelect,
}: MapContainerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [noToken, setNoToken] = useState(false);

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!token) {
      setNoToken(true);
      return;
    }

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: MEDELLIN_CENTER,
      zoom: MEDELLIN_ZOOM,
      attributionControl: false,
      pitchWithRotate: false,
    });

    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "top-right"
    );

    map.addControl(new mapboxgl.AttributionControl({ compact: true }));

    map.on("load", () => {
      // Add GeoJSON source
      map.addSource("comunas", {
        type: "geojson",
        data: GEOJSON_URL,
      });

      // Choropleth fill layer
      map.addLayer({
        id: "comunas-fill",
        type: "fill",
        source: "comunas",
        paint: {
          "fill-color": buildColorExpression(
            selectedIndicator,
            selectedYear
          ),
          "fill-opacity": [
            "case",
            ["==", ["get", "codigo"], ""],
            0.9,
            0.75,
          ],
        },
      });

      // Outline layer
      map.addLayer({
        id: "comunas-outline",
        type: "line",
        source: "comunas",
        paint: {
          "line-color": "#1B3A5C",
          "line-width": [
            "case",
            ["boolean", ["feature-state", "selected"], false],
            3,
            1,
          ],
          "line-opacity": 0.6,
        },
      });

      // Label layer
      map.addLayer({
        id: "comunas-labels",
        type: "symbol",
        source: "comunas",
        layout: {
          "text-field": ["get", "nombre"],
          "text-size": 11,
          "text-font": ["DIN Pro Medium", "Arial Unicode MS Regular"],
          "text-anchor": "center",
          "text-allow-overlap": false,
          "text-ignore-placement": false,
        },
        paint: {
          "text-color": "#1B3A5C",
          "text-halo-color": "#ffffff",
          "text-halo-width": 1.5,
        },
      });

      // Bubble layer (hidden by default)
      map.addLayer({
        id: "comunas-bubble",
        type: "circle",
        source: "comunas",
        layout: {
          visibility: "none",
        },
        paint: {
          "circle-radius": buildBubbleRadiusExpression(
            selectedIndicator,
            selectedYear
          ),
          "circle-color": "#1B3A5C",
          "circle-opacity": 0.6,
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 1.5,
        },
      });

      setMapLoaded(true);
    });

    // Click handler
    map.on("click", "comunas-fill", (e) => {
      if (e.features && e.features.length > 0) {
        const feature = e.features[0];
        const geoCode = feature.properties?.codigo as string;
        const terrCode = geoJsonCodigoToTerritorio(geoCode);
        onComunaSelect(terrCode);
      }
    });

    map.on("click", "comunas-bubble", (e) => {
      if (e.features && e.features.length > 0) {
        const feature = e.features[0];
        const geoCode = feature.properties?.codigo as string;
        const terrCode = geoJsonCodigoToTerritorio(geoCode);
        onComunaSelect(terrCode);
      }
    });

    // Hover handler
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 10,
      className: "comuna-tooltip",
    });
    popupRef.current = popup;

    const handleHover = (
      e: mapboxgl.MapMouseEvent & { features?: mapboxgl.GeoJSONFeature[] }
    ) => {
      if (!e.features || e.features.length === 0) return;
      map.getCanvas().style.cursor = "pointer";

      const feature = e.features[0];
      const nombre = feature.properties?.nombre ?? "Desconocido";
      const geoCode = feature.properties?.codigo as string;
      const terrCode = geoJsonCodigoToTerritorio(geoCode);

      // Get current value
      const dataPoint = MAP_INDICATORS_DATA.find(
        (d) =>
          d.territorio_codigo === terrCode &&
          d.indicador === selectedIndicator &&
          d.year === selectedYear
      );

      const indicatorOption = MAP_INDICATOR_OPTIONS.find(
        (o) => o.value === selectedIndicator
      );

      popup
        .setLngLat(e.lngLat)
        .setHTML(
          `<div style="font-family: system-ui, sans-serif; padding: 4px 0;">
            <div style="font-weight: 600; font-size: 13px; color: #1B3A5C;">${nombre}</div>
            <div style="font-size: 12px; color: #64748b; margin-top: 2px;">
              ${indicatorOption?.label ?? selectedIndicator}:
              <strong style="color: #0f172a;">${dataPoint ? dataPoint.valor.toLocaleString("es-CO") : "N/D"}</strong>
              ${indicatorOption?.unit ? `<span style="color: #94a3b8;"> ${indicatorOption.unit}</span>` : ""}
            </div>
          </div>`
        )
        .addTo(map);
    };

    map.on("mouseenter", "comunas-fill", handleHover);
    map.on("mousemove", "comunas-fill", handleHover);
    map.on("mouseenter", "comunas-bubble", handleHover);
    map.on("mousemove", "comunas-bubble", handleHover);

    const handleLeave = () => {
      map.getCanvas().style.cursor = "";
      popup.remove();
    };

    map.on("mouseleave", "comunas-fill", handleLeave);
    map.on("mouseleave", "comunas-bubble", handleLeave);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Update choropleth colors when indicator or year changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    try {
      map.setPaintProperty(
        "comunas-fill",
        "fill-color",
        buildColorExpression(selectedIndicator, selectedYear)
      );

      map.setPaintProperty(
        "comunas-bubble",
        "circle-radius",
        buildBubbleRadiusExpression(selectedIndicator, selectedYear)
      );
    } catch {
      // Layer may not be ready yet
    }
  }, [selectedIndicator, selectedYear, mapLoaded]);

  // Toggle view mode
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    try {
      if (viewMode === "choropleth") {
        map.setLayoutProperty("comunas-fill", "visibility", "visible");
        map.setLayoutProperty("comunas-bubble", "visibility", "none");
      } else {
        map.setLayoutProperty("comunas-fill", "visibility", "none");
        map.setLayoutProperty("comunas-bubble", "visibility", "visible");
      }
    } catch {
      // Layer may not be ready yet
    }
  }, [viewMode, mapLoaded]);

  // Highlight selected comuna
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    try {
      if (selectedComuna) {
        const padded = selectedComuna.padStart(2, "0");
        const geoCode = `COM${padded}`;
        map.setPaintProperty("comunas-outline", "line-width", [
          "case",
          ["==", ["get", "codigo"], geoCode],
          3.5,
          1,
        ]);
        map.setPaintProperty("comunas-fill", "fill-opacity", [
          "case",
          ["==", ["get", "codigo"], geoCode],
          0.9,
          0.55,
        ]);
      } else {
        map.setPaintProperty("comunas-outline", "line-width", 1);
        map.setPaintProperty("comunas-fill", "fill-opacity", 0.75);
      }
    } catch {
      // Layer may not be ready
    }
  }, [selectedComuna, mapLoaded]);

  // No token fallback
  if (noToken) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-institucional-50 to-institucional-100">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-institucional/10">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-8 w-8 text-institucional"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-serif font-bold text-institucional mb-2">
            Mapa Distrital de Medellin
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Configura la variable de entorno{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
              NEXT_PUBLIC_MAPBOX_TOKEN
            </code>{" "}
            para visualizar el mapa interactivo con datos de las 16 comunas.
          </p>
          <div className="grid grid-cols-4 gap-1.5 max-w-xs mx-auto">
            {TERRITORIES.filter((t) => t.tipo === "comuna").map((t) => (
              <div
                key={t.codigo}
                className="rounded bg-institucional/10 px-2 py-1 text-[10px] text-institucional truncate text-center"
                title={t.nombre}
              >
                {t.nombre}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={mapContainerRef} className="h-full w-full" />
  );
}
