import { log, startTimer } from "../config";
import { clearTerritoryCache } from "../utils";
import { loadIndicator } from "../load-indicators";
import { getMedataPackage, getMedataRecords, findCsvResource, downloadMedataCsv } from "../medata-client";
import { ECV_INDICATORS, extractEcvIndicator } from "./parse-ecv";

const NODE_ID = "16426"; // Encuesta de Calidad de Vida - Medellin

/**
 * Parse a simple CSV string into rows.
 */
function parseCsv(text: string): Record<string, string>[] {
  const lines = text.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return [];

  const delimiter = lines[0].includes(";") ? ";" : ",";
  const headers = lines[0].split(delimiter).map((h) => h.trim().replace(/^"|"$/g, "").toLowerCase());

  return lines.slice(1).map((line) => {
    const values = line.split(delimiter).map((v) => v.trim().replace(/^"|"$/g, ""));
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = values[i] ?? "";
    });
    return row;
  });
}

async function main() {
  const elapsed = startTimer();
  log("info", "=== ETL Encuesta de Calidad de Vida (ECV): Starting ===");

  const pkg = await getMedataPackage(NODE_ID);
  if (!pkg) {
    log("error", "Could not fetch MEData package for ECV");
    return;
  }

  let rows: Record<string, string | number | null>[] = [];

  const csvResource = findCsvResource(pkg.resources);
  if (csvResource) {
    try {
      rows = await getMedataRecords(csvResource.id, { limit: 50000 });
    } catch {
      log("warn", "Datastore API failed, trying CSV download...");
    }

    if (rows.length === 0) {
      try {
        const csvText = await downloadMedataCsv(csvResource.url);
        rows = parseCsv(csvText) as unknown as Record<string, string | number | null>[];
      } catch (err) {
        log("error", "CSV download also failed", (err as Error).message);
      }
    }
  }

  if (rows.length === 0) {
    log("warn", "No ECV data retrieved from MEData");
    return;
  }

  log("info", `Fetched ${rows.length} ECV rows. Sample columns: ${Object.keys(rows[0]).join(", ")}`);

  let totalInserted = 0;
  const errors: string[] = [];

  for (const config of ECV_INDICATORS) {
    try {
      const points = extractEcvIndicator(rows, config);

      if (points.length === 0) {
        log("warn", `No data extracted for ECV indicator: ${config.slug}`);
        continue;
      }

      const n = await loadIndicator({
        nombre: config.nombre,
        slug: config.slug,
        descripcion: config.descripcion,
        unidad_medida: config.unidad_medida,
        periodicidad: "anual",
        linea_tematica_slug: config.linea_tematica_slug,
        categoria_nombre: config.categoria_nombre,
        ficha_tecnica: {
          fuente: "MEData - Encuesta de Calidad de Vida Medellin",
          node_id: NODE_ID,
          granularidad: "per_comuna",
        },
        valores: points,
      });

      totalInserted += n;
      log("info", `ECV ${config.slug}: ${n} data points loaded`);
    } catch (err) {
      const msg = `ECV ${config.slug} failed: ${(err as Error).message}`;
      errors.push(msg);
      log("error", msg);
    }
  }

  clearTerritoryCache();
  log("info", `=== ETL ECV: Complete (${elapsed()}ms, ${totalInserted} rows) ===`);
  if (errors.length) log("warn", `Errors: ${errors.length}`, errors);
}

main().catch((err) => {
  log("error", "ETL ECV failed", err);
  process.exit(1);
});
