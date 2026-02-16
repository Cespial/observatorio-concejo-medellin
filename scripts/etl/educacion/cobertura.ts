import { log } from "../config";
import { fetchSocrataAggregated } from "../socrata-client";
import { normalizePeriodo } from "../utils";
import { loadIndicator } from "../load-indicators";
import type { DataPoint } from "../types";

const DATASET_ID = "jbqe-3u4z";

export async function loadCoberturaEducativa(): Promise<number> {
  log("info", "Loading cobertura educativa from datos.gov.co...");

  const raw = await fetchSocrataAggregated(DATASET_ID, {
    select: "anio as periodo, sum(matricula) as total_matricula",
    where: "municipio = 'MEDELLÍN' AND anio >= '2015'",
    group: "anio",
    order: "anio ASC",
  });

  // Education coverage is typically available at municipality level only
  const points: DataPoint[] = raw
    .map((row) => ({
      periodo: normalizePeriodo(String(row.periodo)),
      territorio_codigo: "MDE",
      valor: Number(row.total_matricula),
    }))
    .filter((dp) => !isNaN(dp.valor));

  const n1 = await loadIndicator({
    nombre: "Matricula total educacion basica y media",
    slug: "matricula-educacion",
    descripcion: "Total de estudiantes matriculados en educacion basica y media en Medellin",
    unidad_medida: "estudiantes",
    periodicidad: "anual",
    linea_tematica_slug: "educacion",
    categoria_nombre: "Cobertura educativa",
    ficha_tecnica: {
      fuente: "datos.gov.co",
      dataset_id: DATASET_ID,
      granularidad: "municipal",
      nota: "Datos disponibles solo a nivel municipal, no por comuna",
    },
    valores: points,
  });

  return n1;
}
