import { log } from "../config";
import { fetchSocrata } from "../socrata-client";
import { normalizePeriodo } from "../utils";
import { loadIndicator } from "../load-indicators";
import type { DataPoint } from "../types";

const DATASET_ID = "8u7u-645t";

export async function loadVacunacion(): Promise<number> {
  log("info", "Loading cobertura de vacunacion from datos.gov.co...");

  const raw = await fetchSocrata(DATASET_ID, {
    $select:
      "a_o as periodo, nombrevacuna, numerovacunados, numeropoblacionobjetivo",
    $where: "nombremunicipio='Medell\u00edn' AND a_o >= '2015'",
    $order: "a_o ASC",
  });

  // Group rows by year and compute an average coverage rate across all vaccines,
  // or filter for a representative vaccine if available.
  const byYear = new Map<
    string,
    { totalVacunados: number; totalPoblacion: number }
  >();

  for (const row of raw) {
    const periodo = normalizePeriodo(String(row.periodo));
    const vacunados = Number(row.numerovacunados) || 0;
    const poblacion = Number(row.numeropoblacionobjetivo) || 0;

    if (poblacion <= 0) continue;

    if (!byYear.has(periodo)) {
      byYear.set(periodo, { totalVacunados: 0, totalPoblacion: 0 });
    }
    const entry = byYear.get(periodo)!;
    entry.totalVacunados += vacunados;
    entry.totalPoblacion += poblacion;
  }

  const points: DataPoint[] = [];

  for (const [periodo, { totalVacunados, totalPoblacion }] of byYear) {
    if (totalPoblacion > 0) {
      const cobertura =
        Math.round((totalVacunados / totalPoblacion) * 10000) / 100;
      points.push({
        periodo,
        territorio_codigo: "MDE",
        valor: cobertura,
      });
    }
  }

  // Sort by period ascending
  points.sort((a, b) => a.periodo.localeCompare(b.periodo));

  return loadIndicator({
    nombre: "Cobertura de vacunacion",
    slug: "cobertura-vacunacion",
    descripcion:
      "Cobertura promedio de vacunacion en Medellin (todas las vacunas del PAI)",
    unidad_medida: "%",
    periodicidad: "anual",
    linea_tematica_slug: "salud",
    categoria_nombre: "Atencion en salud",
    ficha_tecnica: {
      fuente: "datos.gov.co - Consolidado Cobertura Vacunacion Antioquia",
      dataset_id: DATASET_ID,
      granularidad: "municipal",
      nota: "Cobertura calculada como (numerovacunados / numeropoblacionobjetivo) * 100, promediada sobre todas las vacunas.",
    },
    valores: points,
  });
}
