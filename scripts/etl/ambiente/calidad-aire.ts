import { log } from "../config";
import { fetchSocrata } from "../socrata-client";
import { loadIndicator } from "../load-indicators";
import type { DataPoint } from "../types";

// Calidad Del Aire En Colombia (Promedio Anual) — AMVA
// Columns: nombre_del_municipio, variable, a_o, promedio, estaci_n, tiempo_de_exposici_n_horas, unidades
const DATASET_ID = "kekd-7v7h";

export async function loadCalidadAire(): Promise<number> {
  log("info", "Loading calidad del aire (PM2.5) from datos.gov.co (AMVA)...");

  // Dataset has 4 spelling variants of Medellín. Fetch each and merge.
  const variants = ["Medellín", "MEDELLÍN", "Medellin", "MEDELLIN"];
  const yearMap = new Map<string, { sum: number; count: number }>();

  for (const variant of variants) {
    const raw = await fetchSocrata(DATASET_ID, {
      $select: "a_o, promedio",
      $where:
        `nombre_del_municipio='${variant}' ` +
        "AND variable='PM2.5' " +
        "AND tiempo_de_exposici_n_horas='24'",
      $order: "a_o ASC",
      $limit: 5000,
    });

    for (const row of raw) {
      if (row.a_o == null || row.promedio == null) continue;
      const year = String(row.a_o);
      const val = Number(row.promedio);
      if (isNaN(val)) continue;

      const entry = yearMap.get(year) ?? { sum: 0, count: 0 };
      entry.sum += val;
      entry.count += 1;
      yearMap.set(year, entry);
    }
  }

  const valores: DataPoint[] = Array.from(yearMap.entries())
    .filter(([, v]) => v.count > 0)
    .map(([year, v]) => ({
      periodo: year,
      territorio_codigo: "MDE",
      valor: Math.round((v.sum / v.count) * 100) / 100,
    }))
    .sort((a, b) => Number(a.periodo) - Number(b.periodo));

  log("info", `Parsed ${valores.length} year records for PM2.5 (from ${DATASET_ID})`);

  return loadIndicator({
    nombre: "PM2.5 promedio anual",
    slug: "pm25-promedio",
    descripcion: "Concentracion promedio anual de material particulado PM2.5 en Medellin",
    unidad_medida: "ug/m3",
    periodicidad: "anual",
    linea_tematica_slug: "ambiente",
    categoria_nombre: "Calidad ambiental",
    ficha_tecnica: {
      fuente: "datos.gov.co - AMVA (Area Metropolitana del Valle de Aburra)",
      dataset_id: DATASET_ID,
      metodologia: "Promedio anual de PM2.5 (24h) en estaciones de Medellin. Fuente: Calidad Del Aire En Colombia Promedio Anual",
      umbral_oms: 15,
      umbral_nacional: 25,
    },
    valores,
  });
}
