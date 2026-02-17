import { log } from "../config";
import { normalizeComuna } from "../utils";
import type { DataPoint } from "../types";

/**
 * ECV (Encuesta de Calidad de Vida) per-comuna indicator extractor.
 * Takes raw rows from MEData and extracts indicator values per comuna.
 */

type EcvIndicatorConfig = {
  slug: string;
  nombre: string;
  descripcion: string;
  unidad_medida: string;
  linea_tematica_slug: string;
  categoria_nombre: string;
  /** Column name patterns to search for the value */
  valueColumns: string[];
  /** Optional transform on the raw value */
  transform?: (val: number) => number;
};

export const ECV_INDICATORS: EcvIndicatorConfig[] = [
  {
    slug: "satisfaccion-vida-comuna",
    nombre: "Satisfaccion con la vida por comuna",
    descripcion: "Porcentaje de personas satisfechas con su vida en general, por comuna",
    unidad_medida: "%",
    linea_tematica_slug: "salud",
    categoria_nombre: "Bienestar",
    valueColumns: ["satisfaccion", "satisfaccion_vida", "bienestar"],
  },
  {
    slug: "cobertura-salud-comuna",
    nombre: "Cobertura de salud por comuna",
    descripcion: "Porcentaje de personas con afiliacion al sistema de salud, por comuna",
    unidad_medida: "%",
    linea_tematica_slug: "salud",
    categoria_nombre: "Acceso a salud",
    valueColumns: ["cobertura_salud", "afiliacion_salud", "salud"],
  },
  {
    slug: "escolaridad-promedio-comuna",
    nombre: "Escolaridad promedio por comuna",
    descripcion: "Anios promedio de escolaridad por comuna",
    unidad_medida: "anios",
    linea_tematica_slug: "educacion",
    categoria_nombre: "Nivel educativo",
    valueColumns: ["escolaridad", "anios_escolaridad", "escolaridad_promedio"],
  },
  {
    slug: "acceso-internet-comuna",
    nombre: "Acceso a internet por comuna",
    descripcion: "Porcentaje de hogares con acceso a internet por comuna",
    unidad_medida: "%",
    linea_tematica_slug: "educacion",
    categoria_nombre: "Conectividad",
    valueColumns: ["internet", "acceso_internet", "conectividad"],
  },
  {
    slug: "percepcion-seguridad-comuna",
    nombre: "Percepcion de seguridad por comuna",
    descripcion: "Porcentaje de personas que se sienten seguras en su barrio, por comuna",
    unidad_medida: "%",
    linea_tematica_slug: "seguridad",
    categoria_nombre: "Convivencia ciudadana",
    valueColumns: ["seguridad", "percepcion_seguridad", "seguridad_barrio"],
  },
  {
    slug: "satisfaccion-transporte-comuna",
    nombre: "Satisfaccion con transporte por comuna",
    descripcion: "Porcentaje de personas satisfechas con el transporte publico, por comuna",
    unidad_medida: "%",
    linea_tematica_slug: "movilidad",
    categoria_nombre: "Transporte masivo",
    valueColumns: ["transporte", "satisfaccion_transporte", "movilidad"],
  },
];

/**
 * Try to find a matching column from the actual row data.
 */
function findValue(row: Record<string, string | number | null>, patterns: string[]): number | null {
  const keys = Object.keys(row).map((k) => k.toLowerCase());

  for (const pattern of patterns) {
    // Exact match
    const exactIdx = keys.indexOf(pattern.toLowerCase());
    if (exactIdx >= 0) {
      const val = Number(Object.values(row)[exactIdx]);
      if (!isNaN(val)) return val;
    }

    // Partial match
    const partialIdx = keys.findIndex((k) => k.includes(pattern.toLowerCase()));
    if (partialIdx >= 0) {
      const val = Number(Object.values(row)[partialIdx]);
      if (!isNaN(val)) return val;
    }
  }

  return null;
}

/**
 * Extract per-comuna data points from ECV records for a given indicator.
 */
export function extractEcvIndicator(
  rows: Record<string, string | number | null>[],
  config: EcvIndicatorConfig,
  defaultPeriodo: string = "2023"
): DataPoint[] {
  const points: DataPoint[] = [];

  for (const row of rows) {
    const comunaName = String(
      row.comuna ?? row.nombre_comuna ?? row.territorio ?? row.nombre ?? ""
    ).trim();

    if (!comunaName) continue;

    const codigo = normalizeComuna(comunaName);
    if (!codigo) continue;

    const rawValue = findValue(row, config.valueColumns);
    if (rawValue === null) continue;

    const valor = config.transform ? config.transform(rawValue) : rawValue;
    const periodo = String(row.anio ?? row.ano ?? row.periodo ?? defaultPeriodo);

    points.push({
      periodo,
      territorio_codigo: codigo,
      valor: Math.round(valor * 100) / 100,
    });
  }

  log("info", `ECV ${config.slug}: extracted ${points.length} per-comuna data points`);
  return points;
}
