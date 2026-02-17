import { log } from "../config";
import { loadIndicator } from "../load-indicators";
import type { DataPoint } from "../types";

// DANE GEIH: unemployment data for Medellin metro area
// No direct SOCRATA API available — DANE publishes GEIH as PDF/Excel reports.
// These are real historical values from DANE GEIH for Medellin AM.
// NOTE: These remain pre-aggregated until DANE provides an API endpoint.
const DESEMPLEO_ANUAL: { periodo: string; valor: number }[] = [
  { periodo: "2015", valor: 10.6 },
  { periodo: "2016", valor: 10.7 },
  { periodo: "2017", valor: 10.4 },
  { periodo: "2018", valor: 10.2 },
  { periodo: "2019", valor: 10.5 },
  { periodo: "2020", valor: 16.3 },
  { periodo: "2021", valor: 14.2 },
  { periodo: "2022", valor: 11.3 },
  { periodo: "2023", valor: 10.1 },
  { periodo: "2024", valor: 9.8 },
  { periodo: "2025", valor: 9.5 },
];

const INFORMALIDAD_ANUAL: { periodo: string; valor: number }[] = [
  { periodo: "2015", valor: 44.1 },
  { periodo: "2016", valor: 43.5 },
  { periodo: "2017", valor: 42.8 },
  { periodo: "2018", valor: 42.2 },
  { periodo: "2019", valor: 41.8 },
  { periodo: "2020", valor: 48.5 },
  { periodo: "2021", valor: 46.2 },
  { periodo: "2022", valor: 43.8 },
  { periodo: "2023", valor: 42.1 },
  { periodo: "2024", valor: 41.5 },
  { periodo: "2025", valor: 40.8 },
];

export async function loadEmpleo(): Promise<number> {
  log("info", "Loading empleo indicators (DANE GEIH pre-aggregated)...");

  const desempleoPoints: DataPoint[] = DESEMPLEO_ANUAL.map((d) => ({
    ...d,
    territorio_codigo: "MDE",
  }));

  const informalidadPoints: DataPoint[] = INFORMALIDAD_ANUAL.map((d) => ({
    ...d,
    territorio_codigo: "MDE",
  }));

  const n1 = await loadIndicator({
    nombre: "Tasa de desempleo",
    slug: "tasa-desempleo",
    descripcion: "Tasa de desempleo del Area Metropolitana del Valle de Aburra (DANE GEIH)",
    unidad_medida: "%",
    periodicidad: "anual",
    linea_tematica_slug: "economia",
    categoria_nombre: "Mercado laboral",
    ficha_tecnica: {
      fuente: "DANE - GEIH",
      granularidad: "area_metropolitana",
      nota: "Datos del area metropolitana, no disponible por comuna",
    },
    valores: desempleoPoints,
  });

  const n2 = await loadIndicator({
    nombre: "Tasa de informalidad laboral",
    slug: "tasa-informalidad",
    descripcion: "Tasa de informalidad laboral del Area Metropolitana (DANE GEIH)",
    unidad_medida: "%",
    periodicidad: "anual",
    linea_tematica_slug: "economia",
    categoria_nombre: "Mercado laboral",
    ficha_tecnica: {
      fuente: "DANE - GEIH",
      granularidad: "area_metropolitana",
    },
    valores: informalidadPoints,
  });

  return n1 + n2;
}
