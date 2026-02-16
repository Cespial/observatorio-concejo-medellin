import { log } from "../config";
import { fetchSocrataAggregated } from "../socrata-client";
import { normalizePeriodo } from "../utils";
import { loadIndicator } from "../load-indicators";
import type { DataPoint } from "../types";

const DATASET_ID = "bfmn-8gfa";

export async function loadPasajerosMetro(): Promise<number> {
  log("info", "Loading pasajeros Metro de Medellin from datos.gov.co...");

  const raw = await fetchSocrataAggregated(DATASET_ID, {
    select: "anio as periodo, sum(pasajeros) as total_pasajeros",
    where: "anio >= '2015'",
    group: "anio",
    order: "anio ASC",
  });

  const points: DataPoint[] = raw
    .map((row) => ({
      periodo: normalizePeriodo(String(row.periodo)),
      territorio_codigo: "MDE",
      valor: Number(row.total_pasajeros),
    }))
    .filter((dp) => !isNaN(dp.valor));

  return loadIndicator({
    nombre: "Pasajeros transportados Metro de Medellin",
    slug: "pasajeros-metro",
    descripcion: "Total de pasajeros transportados por el sistema Metro (metro, tranvia, cable) por anio",
    unidad_medida: "pasajeros",
    periodicidad: "anual",
    linea_tematica_slug: "movilidad",
    categoria_nombre: "Transporte masivo",
    ficha_tecnica: {
      fuente: "datos.gov.co",
      dataset_id: DATASET_ID,
      granularidad: "municipal",
      nota: "Incluye Metro, Tranvia y cables aereos",
    },
    valores: points,
  });
}
