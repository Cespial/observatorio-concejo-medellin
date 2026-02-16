import { log } from "../config";
import { fetchSocrata } from "../socrata-client";
import { loadIndicator } from "../load-indicators";
import type { DataPoint } from "../types";

const DATASET_ID = "ntej-qq7v";

export async function loadAccidentalidad(): Promise<number> {
  log("info", "Loading accidentalidad vial from datos.gov.co...");

  const raw = await fetchSocrata(DATASET_ID, {
    $select:
      "date_extract_y(fecha_hecho) as periodo, sum(cantidad) as total",
    $where:
      "municipio='MEDELLIN' AND fecha_hecho>='2015-01-01T00:00:00.000'",
    $group: "periodo",
    $order: "periodo ASC",
  });

  const points: DataPoint[] = raw
    .map((row) => ({
      periodo: String(row.periodo),
      territorio_codigo: "MDE",
      valor: Number(row.total),
    }))
    .filter((dp) => !isNaN(dp.valor));

  return loadIndicator({
    nombre: "Accidentalidad vial",
    slug: "accidentalidad-vial",
    descripcion:
      "Lesiones por accidentes de transito reportadas por la Policia Nacional en Medellin",
    unidad_medida: "casos",
    periodicidad: "anual",
    linea_tematica_slug: "movilidad",
    categoria_nombre: "Infraestructura vial",
    ficha_tecnica: {
      fuente: "datos.gov.co - Policia Nacional",
      dataset_id: DATASET_ID,
      metodologia:
        "Suma de lesiones por accidentes de transito agrupados por anio (LESIONES ACCIDENTES DE TRANSITO)",
    },
    valores: points,
  });
}
