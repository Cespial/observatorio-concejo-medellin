import { log } from "../config";
import { fetchSocrata } from "../socrata-client";
import { loadIndicator } from "../load-indicators";
import type { DataPoint } from "../types";

const DATASET_ID = "bz43-8ahq"; // DELITOS SEXUALES - Policia Nacional

export async function loadDelitosSexuales(): Promise<number> {
  log("info", "Loading delitos sexuales from datos.gov.co (Policia Nacional)...");

  const raw = await fetchSocrata(DATASET_ID, {
    $select: "date_extract_y(fecha_hecho) as periodo, sum(cantidad) as total",
    $where: "municipio='MEDELLIN' AND fecha_hecho>='2015-01-01T00:00:00.000'",
    $group: "periodo",
    $order: "periodo ASC",
  });

  const valores: DataPoint[] = raw
    .filter((row) => row.periodo != null && row.total != null)
    .map((row) => ({
      periodo: String(row.periodo),
      territorio_codigo: "MDE",
      valor: Number(row.total),
    }));

  log("info", `Parsed ${valores.length} year records for delitos sexuales`);

  if (valores.length === 0) {
    log("warn", "No data from primary query, trying alternative column names...");

    const rawAlt = await fetchSocrata(DATASET_ID, {
      $select: "anio as periodo, sum(cantidad) as total",
      $where: "municipio='MEDELLIN'",
      $group: "periodo",
      $order: "periodo ASC",
    });

    for (const row of rawAlt) {
      if (row.periodo != null && row.total != null) {
        valores.push({
          periodo: String(row.periodo),
          territorio_codigo: "MDE",
          valor: Number(row.total),
        });
      }
    }

    log("info", `Alternative query returned ${valores.length} records`);
  }

  return loadIndicator({
    nombre: "Delitos sexuales",
    slug: "delitos-sexuales",
    descripcion: "Casos de delitos sexuales reportados en Medellin por periodo",
    unidad_medida: "casos",
    periodicidad: "anual",
    linea_tematica_slug: "seguridad",
    categoria_nombre: "Delitos contra la vida",
    ficha_tecnica: {
      fuente: "datos.gov.co - Policia Nacional",
      dataset_id: DATASET_ID,
      metodologia: "Suma de cantidad de delitos sexuales agrupados por anio, filtrado por municipio MEDELLIN",
    },
    valores,
  });
}
