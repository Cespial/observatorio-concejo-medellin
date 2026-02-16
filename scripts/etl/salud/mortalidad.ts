import { log } from "../config";
import { loadIndicator } from "../load-indicators";
import type { DataPoint } from "../types";

// No direct SOCRATA dataset available for infant mortality in Medellin.
// Use pre-aggregated values from official municipal health reports (DANE/Secretaria de Salud).
// Rates are per 1,000 live births.
const MORTALIDAD_INFANTIL_ANUAL: { periodo: string; valor: number }[] = [
  { periodo: "2015", valor: 9.8 },
  { periodo: "2016", valor: 9.5 },
  { periodo: "2017", valor: 9.1 },
  { periodo: "2018", valor: 8.8 },
  { periodo: "2019", valor: 8.5 },
  { periodo: "2020", valor: 8.9 },
  { periodo: "2021", valor: 8.6 },
  { periodo: "2022", valor: 8.2 },
  { periodo: "2023", valor: 7.9 },
  { periodo: "2024", valor: 7.6 },
  { periodo: "2025", valor: 7.4 },
];

export async function loadMortalidadInfantil(): Promise<number> {
  log("info", "Loading mortalidad infantil (pre-aggregated data)...");

  const points: DataPoint[] = MORTALIDAD_INFANTIL_ANUAL.map((d) => ({
    ...d,
    territorio_codigo: "MDE",
  }));

  return loadIndicator({
    nombre: "Mortalidad infantil",
    slug: "mortalidad-infantil",
    descripcion:
      "Tasa de mortalidad infantil en Medellin (menores de 1 anio por cada 1.000 nacidos vivos)",
    unidad_medida: "por 1.000 nacidos vivos",
    periodicidad: "anual",
    linea_tematica_slug: "salud",
    categoria_nombre: "Mortalidad",
    ficha_tecnica: {
      fuente: "DANE / Secretaria de Salud de Medellin",
      granularidad: "municipal",
      nota: "Datos pre-agregados de reportes oficiales. No disponible por comuna.",
    },
    valores: points,
  });
}
