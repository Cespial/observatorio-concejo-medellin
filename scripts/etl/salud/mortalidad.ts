import { log } from "../config";
import { fetchSocrataAggregated } from "../socrata-client";
import { normalizePeriodo } from "../utils";
import { loadIndicator } from "../load-indicators";
import type { DataPoint } from "../types";

const DATASET_ID = "rnvb-mkta";

export async function loadMortalidadInfantil(): Promise<number> {
  log("info", "Loading mortalidad infantil from datos.gov.co...");

  const raw = await fetchSocrataAggregated(DATASET_ID, {
    select: "anio as periodo, count(*) as total",
    where: "municipio = 'MEDELLÍN' AND anio >= '2015' AND grupo_edad_de_la_victima IN ('Menor de 1 año', 'De 1 a 4 años')",
    group: "anio",
    order: "anio ASC",
  });

  const points: DataPoint[] = raw
    .map((row) => ({
      periodo: normalizePeriodo(String(row.periodo)),
      territorio_codigo: "MDE",
      valor: Number(row.total),
    }))
    .filter((dp) => !isNaN(dp.valor));

  return loadIndicator({
    nombre: "Mortalidad infantil (menores de 5 anios)",
    slug: "mortalidad-infantil",
    descripcion: "Defunciones de menores de 5 anios en Medellin",
    unidad_medida: "casos",
    periodicidad: "anual",
    linea_tematica_slug: "salud",
    categoria_nombre: "Mortalidad",
    ficha_tecnica: {
      fuente: "datos.gov.co",
      dataset_id: DATASET_ID,
      granularidad: "municipal",
      filtro: "grupo_edad: Menor de 1 año, De 1 a 4 años",
    },
    valores: points,
  });
}
