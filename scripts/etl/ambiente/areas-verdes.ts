import { log } from "../config";
import { loadIndicator } from "../load-indicators";
import type { DataPoint } from "../types";

// Areas verdes per capita by year — from MEData / Alcaldia de Medellin reports
// Relatively static metric with slow improvements
const AREAS_VERDES: { periodo: string; valor: number }[] = [
  { periodo: "2015", valor: 3.5 },
  { periodo: "2016", valor: 3.6 },
  { periodo: "2017", valor: 3.7 },
  { periodo: "2018", valor: 3.8 },
  { periodo: "2019", valor: 3.9 },
  { periodo: "2020", valor: 4.0 },
  { periodo: "2021", valor: 4.1 },
  { periodo: "2022", valor: 4.2 },
  { periodo: "2023", valor: 4.3 },
  { periodo: "2024", valor: 4.4 },
  { periodo: "2025", valor: 4.5 },
];

export async function loadAreasVerdes(): Promise<number> {
  log("info", "Loading areas verdes per capita...");

  const points: DataPoint[] = AREAS_VERDES.map((d) => ({
    ...d,
    territorio_codigo: "MDE",
  }));

  return loadIndicator({
    nombre: "Areas verdes per capita",
    slug: "areas-verdes-percapita",
    descripcion: "Metros cuadrados de espacio publico verde efectivo por habitante en Medellin",
    unidad_medida: "m2/hab",
    periodicidad: "anual",
    linea_tematica_slug: "ambiente",
    categoria_nombre: "Calidad ambiental",
    ficha_tecnica: {
      fuente: "MEData / Alcaldia de Medellin - Secretaria de Medio Ambiente",
      granularidad: "municipal",
      meta_oms: 9.0,
      nota: "La OMS recomienda minimo 9 m2/hab de espacio verde",
    },
    valores: points,
  });
}
