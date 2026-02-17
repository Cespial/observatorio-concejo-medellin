import { log } from "../config";
import { fetchSocrata } from "../socrata-client";
import { loadIndicator } from "../load-indicators";
import type { DataPoint } from "../types";

const DATASET_ID = "4e4i-ua65"; // Indicadores mortalidad y morbilidad por municipio

type MortalityIndicator = {
  filterName: string;
  slug: string;
  nombre: string;
  descripcion: string;
  unidad_medida: string;
  categoria_nombre: string;
};

// filterName must match EXACT API indicator names (uppercase with accents)
const MORTALITY_INDICATORS: MortalityIndicator[] = [
  {
    filterName: "TASA DE MORTALIDAD EN MENORES DE UN AÑO DE EDAD",
    slug: "mortalidad-infantil",
    nombre: "Mortalidad infantil",
    descripcion: "Tasa de mortalidad infantil en Medellin (menores de 1 anio por cada 1.000 nacidos vivos)",
    unidad_medida: "por 1.000 nacidos vivos",
    categoria_nombre: "Mortalidad",
  },
  {
    filterName: "RAZÓN DE MORTALIDAD MATERNA A 42 DIAS",
    slug: "mortalidad-materna",
    nombre: "Mortalidad materna",
    descripcion: "Razon de mortalidad materna en Medellin por cada 100.000 nacidos vivos",
    unidad_medida: "por 100.000 nacidos vivos",
    categoria_nombre: "Mortalidad",
  },
  {
    filterName: "TASA DE MORTALIDAD NEONATAL",
    slug: "mortalidad-neonatal",
    nombre: "Mortalidad neonatal",
    descripcion: "Tasa de mortalidad neonatal en Medellin por cada 1.000 nacidos vivos",
    unidad_medida: "por 1.000 nacidos vivos",
    categoria_nombre: "Mortalidad",
  },
  {
    filterName: "PORCENTAJE DE NACIDOS VIVOS CON BAJO PESO AL NACER",
    slug: "bajo-peso-al-nacer",
    nombre: "Bajo peso al nacer",
    descripcion: "Porcentaje de nacidos vivos con bajo peso al nacer (<2500g) en Medellin",
    unidad_medida: "%",
    categoria_nombre: "Morbilidad",
  },
];

export async function loadMortalidad(): Promise<number> {
  log("info", "Loading mortalidad indicators from datos.gov.co...");

  // Column is codmunicipio (not codigo_municipio). Medellin code is 05001.
  const raw = await fetchSocrata(DATASET_ID, {
    $where: "codmunicipio='05001'",
    $order: "a_o ASC",
    $limit: 5000,
  });

  log("info", `Fetched ${raw.length} raw rows from mortalidad dataset`);

  if (raw.length === 0) {
    log("warn", "No data returned for codmunicipio=05001, trying municipio filter...");

    const rawAlt = await fetchSocrata(DATASET_ID, {
      $where: "municipio='Medellín'",
      $order: "a_o ASC",
      $limit: 5000,
    });

    raw.push(...rawAlt);
    log("info", `Alternative query returned ${rawAlt.length} rows`);
  }

  let totalInserted = 0;

  for (const ind of MORTALITY_INDICATORS) {
    // Exact match on indicator name
    const matching = raw.filter((row) => {
      const indicador = String(row.indicador ?? "");
      return indicador === ind.filterName;
    });

    if (matching.length === 0) {
      log("warn", `No matching rows for indicator: ${ind.filterName}`);
      continue;
    }

    const valores: DataPoint[] = matching
      .filter((row) => row.a_o != null && row.valor_indicador != null)
      .map((row) => ({
        periodo: String(row.a_o),
        territorio_codigo: "MDE",
        valor: Math.round(Number(row.valor_indicador) * 100) / 100,
      }))
      // Deduplicate by periodo (keep first)
      .reduce((acc, dp) => {
        const existing = acc.find((d) => d.periodo === dp.periodo);
        if (!existing) acc.push(dp);
        return acc;
      }, [] as DataPoint[]);

    log("info", `Indicator ${ind.slug}: ${valores.length} year records`);

    const n = await loadIndicator({
      nombre: ind.nombre,
      slug: ind.slug,
      descripcion: ind.descripcion,
      unidad_medida: ind.unidad_medida,
      periodicidad: "anual",
      linea_tematica_slug: "salud",
      categoria_nombre: ind.categoria_nombre,
      ficha_tecnica: {
        fuente: "datos.gov.co - MSPS / DANE",
        dataset_id: DATASET_ID,
        metodologia: `Filtro: indicador='${ind.filterName}', codmunicipio='05001'`,
      },
      valores,
    });

    totalInserted += n;
  }

  return totalInserted;
}

// Keep backwards-compatible export name
export const loadMortalidadInfantil = loadMortalidad;
