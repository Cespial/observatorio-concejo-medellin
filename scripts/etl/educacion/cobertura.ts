import { log } from "../config";
import { fetchSocrata } from "../socrata-client";
import { normalizePeriodo } from "../utils";
import { loadIndicator } from "../load-indicators";
import type { DataPoint } from "../types";

const DATASET_ID = "nudc-7mev";

export async function loadCoberturaEducativa(): Promise<number> {
  log("info", "Loading cobertura educativa from datos.gov.co...");

  const raw = await fetchSocrata(DATASET_ID, {
    $select:
      "a_o as periodo, cobertura_neta, cobertura_neta_primaria, cobertura_neta_secundaria, cobertura_neta_media",
    $where: "municipio='Medell\u00edn'",
    $order: "a_o ASC",
  });

  // Build data points for overall net coverage
  const points: DataPoint[] = raw
    .map((row) => ({
      periodo: normalizePeriodo(String(row.periodo)),
      territorio_codigo: "MDE",
      valor: Math.round(Number(row.cobertura_neta) * 100) / 100,
      metadata: {
        cobertura_neta_primaria: Number(row.cobertura_neta_primaria) || null,
        cobertura_neta_secundaria: Number(row.cobertura_neta_secundaria) || null,
        cobertura_neta_media: Number(row.cobertura_neta_media) || null,
      },
    }))
    .filter((dp) => !isNaN(dp.valor));

  const n1 = await loadIndicator({
    nombre: "Cobertura neta educativa",
    slug: "cobertura-neta-educativa",
    descripcion:
      "Cobertura neta de educacion en Medellin (transicion, primaria, secundaria y media)",
    unidad_medida: "%",
    periodicidad: "anual",
    linea_tematica_slug: "educacion",
    categoria_nombre: "Cobertura educativa",
    ficha_tecnica: {
      fuente: "datos.gov.co - MEN Estadisticas en Educacion por Municipio",
      dataset_id: DATASET_ID,
      granularidad: "municipal",
      nota: "Datos disponibles solo a nivel municipal, no por comuna",
    },
    valores: points,
  });

  return n1;
}
