import { log } from "../config";
import { fetchSocrataAggregated } from "../socrata-client";
import { normalizeComuna, normalizePeriodo, groupBy } from "../utils";
import { loadIndicator } from "../load-indicators";
import type { DataPoint } from "../types";

const DATASET_ID = "77cz-vjjh";

export async function loadViolenciaIntrafamiliar(): Promise<number> {
  log("info", "Loading violencia intrafamiliar from datos.gov.co...");

  const raw = await fetchSocrataAggregated(DATASET_ID, {
    select: "anio as periodo, comuna, count(*) as total",
    where: "municipio = 'MEDELLÍN' AND anio >= '2015'",
    group: "anio, comuna",
  });

  const points: DataPoint[] = [];
  for (const row of raw) {
    const periodo = normalizePeriodo(String(row.periodo));
    const codigo = normalizeComuna(String(row.comuna ?? ""));
    const valor = Number(row.total);

    if (codigo && !isNaN(valor)) {
      points.push({ periodo, territorio_codigo: codigo, valor });
    }
  }

  const byYear = groupBy(points, "periodo" as keyof DataPoint);
  const cityTotals: DataPoint[] = Object.entries(byYear).map(([periodo, rows]) => ({
    periodo,
    territorio_codigo: "MDE",
    valor: rows.reduce((sum, r) => sum + r.valor, 0),
  }));

  return loadIndicator({
    nombre: "Violencia intrafamiliar",
    slug: "violencia-intrafamiliar",
    descripcion: "Casos de violencia intrafamiliar reportados por territorio y periodo",
    unidad_medida: "casos",
    periodicidad: "anual",
    linea_tematica_slug: "seguridad",
    categoria_nombre: "Convivencia ciudadana",
    ficha_tecnica: {
      fuente: "datos.gov.co",
      dataset_id: DATASET_ID,
      metodologia: "Conteo de registros de VIF agrupados por anio y comuna",
    },
    valores: [...points, ...cityTotals],
  });
}
