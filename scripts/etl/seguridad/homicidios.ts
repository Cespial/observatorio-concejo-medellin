import { log } from "../config";
import { fetchSocrataAggregated } from "../socrata-client";
import { normalizeComuna, normalizePeriodo, groupBy } from "../utils";
import { loadIndicator } from "../load-indicators";
import type { DataPoint } from "../types";

const DATASET_ID = "ha6j-pa2r";

// Population estimates by territory (for rate computation)
const POPULATION: Record<string, number> = {
  MDE: 2569007,
  COM01: 131191, COM02: 111452, COM03: 160253, COM04: 162585,
  COM05: 150284, COM06: 194967, COM07: 174048, COM08: 137726,
  COM09: 136774, COM10: 85505, COM11: 121234, COM12: 96788,
  COM13: 138063, COM14: 130920, COM15: 97479, COM16: 200178,
  COR50: 5412, COR60: 67462, COR70: 39441, COR80: 106789, COR90: 17524,
};

export async function loadHomicidios(): Promise<number> {
  log("info", "Loading homicidios from datos.gov.co...");

  const raw = await fetchSocrataAggregated(DATASET_ID, {
    select: "anio as periodo, comuna, count(*) as total",
    where: "municipio = 'MEDELLÍN' AND anio >= '2015'",
    group: "anio, comuna",
  });

  // Map to data points (absolute count)
  const absolutePoints: DataPoint[] = [];
  for (const row of raw) {
    const periodo = normalizePeriodo(String(row.periodo));
    const codigo = normalizeComuna(String(row.comuna ?? ""));
    const valor = Number(row.total);

    if (codigo && !isNaN(valor)) {
      absolutePoints.push({ periodo, territorio_codigo: codigo, valor });
    }
  }

  // Compute city-wide totals
  const byYear = groupBy(absolutePoints, "periodo" as keyof DataPoint);
  const cityTotals: DataPoint[] = Object.entries(byYear).map(([periodo, rows]) => ({
    periodo,
    territorio_codigo: "MDE",
    valor: rows.reduce((sum, r) => sum + r.valor, 0),
  }));

  const allAbsolute = [...absolutePoints, ...cityTotals];

  // Compute rates per 100k
  const ratePoints: DataPoint[] = allAbsolute
    .map((dp) => {
      const pop = POPULATION[dp.territorio_codigo];
      if (!pop) return null;
      return {
        periodo: dp.periodo,
        territorio_codigo: dp.territorio_codigo,
        valor: Math.round((dp.valor / pop) * 100000 * 100) / 100,
      };
    })
    .filter((dp): dp is DataPoint => dp !== null);

  // Load absolute indicator
  const n1 = await loadIndicator({
    nombre: "Homicidios (absoluto)",
    slug: "homicidios-absoluto",
    descripcion: "Numero total de homicidios por territorio y periodo",
    unidad_medida: "casos",
    periodicidad: "anual",
    linea_tematica_slug: "seguridad",
    categoria_nombre: "Delitos contra la vida",
    ficha_tecnica: {
      fuente: "datos.gov.co",
      dataset_id: DATASET_ID,
      metodologia: "Conteo de registros de homicidios agrupados por anio y comuna",
    },
    valores: allAbsolute,
  });

  // Load rate indicator
  const n2 = await loadIndicator({
    nombre: "Tasa de homicidios por 100.000 habitantes",
    slug: "tasa-homicidios",
    descripcion: "Numero de homicidios por cada 100.000 habitantes en el periodo",
    unidad_medida: "por 100k hab",
    periodicidad: "anual",
    linea_tematica_slug: "seguridad",
    categoria_nombre: "Delitos contra la vida",
    ficha_tecnica: {
      fuente: "datos.gov.co",
      dataset_id: DATASET_ID,
      metodologia: "Tasa = (homicidios / poblacion) * 100000",
    },
    valores: ratePoints,
  });

  return n1 + n2;
}
