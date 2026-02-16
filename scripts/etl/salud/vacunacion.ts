import { log } from "../config";
import { fetchSocrataAggregated } from "../socrata-client";
import { normalizePeriodo } from "../utils";
import { loadIndicator } from "../load-indicators";
import type { DataPoint } from "../types";

const DATASET_ID = "8kii-6ire";

export async function loadVacunacion(): Promise<number> {
  log("info", "Loading cobertura de vacunacion from datos.gov.co...");

  const raw = await fetchSocrataAggregated(DATASET_ID, {
    select: "anio as periodo, avg(cobertura) as cobertura_promedio",
    where: "municipio = 'MEDELLÍN' AND anio >= '2015'",
    group: "anio",
    order: "anio ASC",
  });

  const points: DataPoint[] = raw
    .map((row) => ({
      periodo: normalizePeriodo(String(row.periodo)),
      territorio_codigo: "MDE",
      valor: Math.round(Number(row.cobertura_promedio) * 100) / 100,
    }))
    .filter((dp) => !isNaN(dp.valor));

  return loadIndicator({
    nombre: "Cobertura de vacunacion PAI",
    slug: "cobertura-vacunacion",
    descripcion: "Cobertura promedio del Programa Ampliado de Inmunizaciones en Medellin",
    unidad_medida: "%",
    periodicidad: "anual",
    linea_tematica_slug: "salud",
    categoria_nombre: "Atencion en salud",
    ficha_tecnica: {
      fuente: "datos.gov.co",
      dataset_id: DATASET_ID,
      granularidad: "municipal",
    },
    valores: points,
  });
}
