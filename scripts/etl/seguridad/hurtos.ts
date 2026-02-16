import { log } from "../config";
import { fetchSocrata } from "../socrata-client";
import { loadIndicator } from "../load-indicators";
import type { DataPoint } from "../types";

const DATASET_ID = "4rxi-8m8d"; // HURTO PERSONAS - Policia Nacional

// Medellin population for rate computation
const MEDELLIN_POPULATION = 2_533_424;

export async function loadHurtos(): Promise<number> {
  log("info", "Loading hurtos a personas from datos.gov.co (Policia Nacional)...");

  const raw = await fetchSocrata(DATASET_ID, {
    $select: "date_extract_y(fecha_hecho) as periodo, sum(cantidad) as total",
    $where: "municipio='MEDELLIN' AND fecha_hecho>='2015-01-01T00:00:00.000'",
    $group: "periodo",
    $order: "periodo ASC",
  });

  // Map to city-level data points
  const absolutePoints: DataPoint[] = raw
    .filter((row) => row.periodo != null && row.total != null)
    .map((row) => ({
      periodo: String(row.periodo),
      territorio_codigo: "MDE",
      valor: Number(row.total),
    }));

  log("info", `Parsed ${absolutePoints.length} year records for hurtos`);

  // Compute rates per 100k
  const ratePoints: DataPoint[] = absolutePoints.map((dp) => ({
    periodo: dp.periodo,
    territorio_codigo: "MDE",
    valor: Math.round((dp.valor / MEDELLIN_POPULATION) * 100000 * 100) / 100,
  }));

  // Load absolute indicator
  const n1 = await loadIndicator({
    nombre: "Hurtos a personas",
    slug: "hurtos-personas",
    descripcion: "Numero total de hurtos a personas reportados en Medellin por periodo",
    unidad_medida: "casos",
    periodicidad: "anual",
    linea_tematica_slug: "seguridad",
    categoria_nombre: "Delitos contra el patrimonio",
    ficha_tecnica: {
      fuente: "datos.gov.co - Policia Nacional",
      dataset_id: DATASET_ID,
      metodologia: "Suma de cantidad de hurtos a personas agrupados por anio, filtrado por municipio MEDELLIN",
    },
    valores: absolutePoints,
  });

  // Load rate indicator
  const n2 = await loadIndicator({
    nombre: "Tasa de hurtos por 100.000 habitantes",
    slug: "tasa-hurtos",
    descripcion: "Numero de hurtos a personas por cada 100.000 habitantes en el periodo",
    unidad_medida: "por 100k hab",
    periodicidad: "anual",
    linea_tematica_slug: "seguridad",
    categoria_nombre: "Delitos contra el patrimonio",
    ficha_tecnica: {
      fuente: "datos.gov.co - Policia Nacional",
      dataset_id: DATASET_ID,
      metodologia: "Tasa = (hurtos / poblacion) * 100000. Poblacion: 2,533,424",
    },
    valores: ratePoints,
  });

  return n1 + n2;
}
