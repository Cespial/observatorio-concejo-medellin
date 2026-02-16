import { log } from "../config";
import { fetchSocrataAggregated } from "../socrata-client";
import { normalizePeriodo } from "../utils";
import { loadIndicator } from "../load-indicators";
import type { DataPoint } from "../types";

const DATASET_ID = "4hft-bep7";

export async function loadDesercionEscolar(): Promise<number> {
  log("info", "Loading desercion escolar from datos.gov.co...");

  const raw = await fetchSocrataAggregated(DATASET_ID, {
    select: "anio as periodo, avg(tasa_desercion) as tasa_promedio",
    where: "municipio = 'MEDELLÍN' AND anio >= '2015'",
    group: "anio",
    order: "anio ASC",
  });

  const points: DataPoint[] = raw
    .map((row) => ({
      periodo: normalizePeriodo(String(row.periodo)),
      territorio_codigo: "MDE",
      valor: Math.round(Number(row.tasa_promedio) * 100) / 100,
    }))
    .filter((dp) => !isNaN(dp.valor));

  return loadIndicator({
    nombre: "Tasa de desercion escolar intra-anual",
    slug: "desercion-escolar",
    descripcion: "Tasa promedio de desercion escolar intra-anual en Medellin",
    unidad_medida: "%",
    periodicidad: "anual",
    linea_tematica_slug: "educacion",
    categoria_nombre: "Cobertura educativa",
    ficha_tecnica: {
      fuente: "datos.gov.co",
      dataset_id: DATASET_ID,
      granularidad: "municipal",
    },
    valores: points,
  });
}
