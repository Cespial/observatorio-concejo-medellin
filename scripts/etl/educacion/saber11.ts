import { log } from "../config";
import { fetchSocrata } from "../socrata-client";
import { loadIndicator } from "../load-indicators";
import type { DataPoint } from "../types";

const DATASET_ID = "kgxf-xxbe"; // Resultados Saber 11

export async function loadSaber11(): Promise<number> {
  log("info", "Loading puntajes Saber 11 from datos.gov.co (ICFES)...");

  // punt_global does NOT exist in this dataset.
  // Available score columns: punt_matematicas, punt_ingles (both text).
  // SoQL can't avg() text columns, so we fetch raw records and compute in TS.
  // We use punt_matematicas as representative score.
  // periodo format is "YYYYS" (e.g., "20232" = 2023 semester 2)

  const yearAverages = new Map<string, { sum: number; count: number }>();

  // Fetch in batches — dataset is huge, so we sample from recent periods
  const periods = [
    "20152", "20162", "20172", "20182", "20191", "20194",
    "20201", "20204", "20211", "20214", "20221", "20224",
    "20231", "20234", "20241",
  ];

  for (const period of periods) {
    const raw = await fetchSocrata(DATASET_ID, {
      $select: "periodo, punt_matematicas",
      $where: `periodo='${period}' AND (cole_mcpio_ubicacion like '%MEDELL%' OR cole_mcpio_ubicacion like '%edell%') AND punt_matematicas IS NOT NULL`,
      $limit: 50000,
    });

    for (const row of raw) {
      const score = Number(row.punt_matematicas);
      if (isNaN(score) || score <= 0) continue;

      const year = String(row.periodo).slice(0, 4);
      const entry = yearAverages.get(year) ?? { sum: 0, count: 0 };
      entry.sum += score;
      entry.count += 1;
      yearAverages.set(year, entry);
    }
  }

  const valores: DataPoint[] = Array.from(yearAverages.entries())
    .filter(([, v]) => v.count > 0)
    .map(([year, v]) => ({
      periodo: year,
      territorio_codigo: "MDE",
      valor: Math.round((v.sum / v.count) * 100) / 100,
    }))
    .sort((a, b) => Number(a.periodo) - Number(b.periodo));

  log("info", `Computed ${valores.length} year averages for Saber 11 (punt_matematicas)`);

  return loadIndicator({
    nombre: "Puntaje promedio Saber 11 (Matematicas)",
    slug: "puntaje-saber11-promedio",
    descripcion: "Puntaje promedio de matematicas en la prueba Saber 11 para estudiantes de Medellin",
    unidad_medida: "puntos",
    periodicidad: "anual",
    linea_tematica_slug: "educacion",
    categoria_nombre: "Calidad educativa",
    ficha_tecnica: {
      fuente: "datos.gov.co - ICFES",
      dataset_id: DATASET_ID,
      metodologia: "Promedio de punt_matematicas para colegios de Medellin, calculado en TypeScript a partir de registros individuales",
    },
    valores,
  });
}
