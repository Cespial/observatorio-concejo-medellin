import { log, startTimer } from "../config";
import { normalizeComuna, getTerritorioId } from "../utils";
import { loadIndicator } from "../load-indicators";
import { getMedataPackage, getMedataRecords, findCsvResource } from "../medata-client";
import type { DataPoint } from "../types";

const NODE_ID = "16609"; // Incidentes Viales Medellin (2014+)

export async function loadIncidentesVialesMedata(): Promise<number> {
  const elapsed = startTimer();
  log("info", "Loading incidentes viales per-comuna from MEData...");

  const pkg = await getMedataPackage(NODE_ID);
  if (!pkg) {
    log("error", "Could not fetch MEData package for incidentes viales");
    return 0;
  }

  const csvResource = findCsvResource(pkg.resources);
  if (!csvResource) {
    log("error", "No CSV resource found in incidentes viales package");
    return 0;
  }

  let rows: Record<string, string | number | null>[] = [];
  try {
    rows = await getMedataRecords(csvResource.id, { limit: 50000 });
  } catch (err) {
    log("error", "Failed to fetch incidentes viales records", (err as Error).message);
    return 0;
  }

  if (rows.length === 0) {
    log("warn", "No incidentes viales data from MEData");
    return 0;
  }

  log("info", `Fetched ${rows.length} incidentes viales rows. Columns: ${Object.keys(rows[0]).join(", ")}`);

  // Aggregate: count incidents per comuna per year
  const comunaYearCounts = new Map<string, Map<string, number>>();

  for (const row of rows) {
    // Try to find comuna column
    const comunaName = String(
      row.comuna ?? row.nombre_comuna ?? row.barrio_comuna ?? ""
    ).trim();

    if (!comunaName) continue;

    const codigo = normalizeComuna(comunaName);
    if (!codigo) continue;

    // Extract year
    const rawDate = String(row.fecha ?? row.fecha_ocurrencia ?? row.ano ?? row.anio ?? "");
    let year = "";
    const yearMatch = rawDate.match(/(\d{4})/);
    if (yearMatch) {
      year = yearMatch[1];
    }
    if (!year || Number(year) < 2015) continue;

    if (!comunaYearCounts.has(codigo)) {
      comunaYearCounts.set(codigo, new Map());
    }
    const yearMap = comunaYearCounts.get(codigo)!;
    yearMap.set(year, (yearMap.get(year) ?? 0) + 1);
  }

  // Convert to DataPoints
  const valores: DataPoint[] = [];
  for (const [codigo, yearMap] of comunaYearCounts) {
    for (const [year, count] of yearMap) {
      valores.push({
        periodo: year,
        territorio_codigo: codigo,
        valor: count,
      });
    }
  }

  log("info", `Aggregated ${valores.length} per-comuna-year data points for incidentes viales`);

  const n = await loadIndicator({
    nombre: "Incidentes viales por comuna",
    slug: "incidentes-viales-comuna",
    descripcion: "Numero de incidentes viales por comuna y anio en Medellin",
    unidad_medida: "incidentes",
    periodicidad: "anual",
    linea_tematica_slug: "movilidad",
    categoria_nombre: "Seguridad vial",
    ficha_tecnica: {
      fuente: "MEData - Incidentes Viales Medellin",
      node_id: NODE_ID,
      granularidad: "per_comuna",
      metodologia: "Conteo de incidentes viales agregados por comuna y anio",
    },
    valores,
  });

  log("info", `Incidentes viales: ${n} data points loaded (${elapsed()}ms)`);
  return n;
}
