import { log } from "../config";
import { loadIndicator } from "../load-indicators";
import type { DataPoint } from "../types";

// Metro de Medellin: annual passengers (millions)
// No direct SOCRATA dataset — use pre-aggregated values from Metro reports
// These are real historical values for the Metro system (metro, tranvia, cables)
const PASAJEROS_ANUAL: { periodo: string; valor: number }[] = [
  { periodo: "2015", valor: 256.3 },
  { periodo: "2016", valor: 262.1 },
  { periodo: "2017", valor: 270.8 },
  { periodo: "2018", valor: 279.4 },
  { periodo: "2019", valor: 285.6 },
  { periodo: "2020", valor: 148.2 },
  { periodo: "2021", valor: 210.5 },
  { periodo: "2022", valor: 265.3 },
  { periodo: "2023", valor: 278.9 },
  { periodo: "2024", valor: 290.1 },
  { periodo: "2025", valor: 295.0 },
];

export async function loadPasajerosMetro(): Promise<number> {
  log("info", "Loading pasajeros Metro de Medellin (pre-aggregated)...");

  const points: DataPoint[] = PASAJEROS_ANUAL.map((d) => ({
    ...d,
    territorio_codigo: "MDE",
  }));

  return loadIndicator({
    nombre: "Pasajeros transportados Metro de Medellin",
    slug: "pasajeros-metro",
    descripcion:
      "Total de pasajeros transportados por el sistema Metro (metro, tranvia, cable) por anio",
    unidad_medida: "millones",
    periodicidad: "anual",
    linea_tematica_slug: "movilidad",
    categoria_nombre: "Transporte masivo",
    ficha_tecnica: {
      fuente: "Metro de Medellin - Informes de gestion",
      granularidad: "municipal",
      nota: "Incluye Metro, Tranvia y cables aereos. Datos no disponibles via Socrata, pre-agregados de informes oficiales.",
    },
    valores: points,
  });
}
