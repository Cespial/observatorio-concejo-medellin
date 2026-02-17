import { log } from "../config";
import { fetchSocrata } from "../socrata-client";
import { loadIndicator } from "../load-indicators";
import type { DataPoint } from "../types";

const DATASET_ID = "72sg-cybi"; // Lesiones Personales - Policia Nacional

export async function loadLesionesPersonales(): Promise<number> {
  log("info", "Loading lesiones personales from datos.gov.co (Policia Nacional)...");

  // fecha_hecho is text "DD/MM/YYYY" → use substring(fecha_hecho, 7, 4) for year
  // cantidad is text → use count(*) instead of sum(cantidad)
  // municipio value is "Medellín (CT)" → use LIKE filter
  const raw = await fetchSocrata(DATASET_ID, {
    $select: "substring(fecha_hecho, 7, 4) as anio, count(*) as total",
    $where: "municipio like '%edell%'",
    $group: "anio",
    $order: "anio ASC",
  });

  const valores: DataPoint[] = raw
    .filter((row) => {
      const year = Number(row.anio);
      return row.anio != null && row.total != null && year >= 2010 && year <= 2030;
    })
    .map((row) => ({
      periodo: String(row.anio),
      territorio_codigo: "MDE",
      valor: Number(row.total),
    }));

  log("info", `Parsed ${valores.length} year records for lesiones personales`);

  return loadIndicator({
    nombre: "Lesiones personales",
    slug: "lesiones-personales",
    descripcion: "Casos de lesiones personales reportados en Medellin por periodo",
    unidad_medida: "casos",
    periodicidad: "anual",
    linea_tematica_slug: "seguridad",
    categoria_nombre: "Convivencia ciudadana",
    ficha_tecnica: {
      fuente: "datos.gov.co - Policia Nacional",
      dataset_id: DATASET_ID,
      metodologia: "Conteo de registros de lesiones personales agrupados por anio, municipio LIKE '%edell%' (Medellín (CT))",
    },
    valores,
  });
}
