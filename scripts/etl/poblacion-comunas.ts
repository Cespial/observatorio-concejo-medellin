import { log, startTimer } from "./config";
import { supabaseAdmin } from "./config";
import { getTerritorioId, normalizeComuna } from "./utils";
import { getMedataPackage, getMedataRecords, findCsvResource, downloadMedataCsv } from "./medata-client";

const NODE_ID = "41596"; // Poblacion proyecciones 2018-2030 por comuna

/**
 * Parse a simple CSV string into rows.
 * Handles quoted fields and common delimiters.
 */
function parseCsv(text: string): Record<string, string>[] {
  const lines = text.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return [];

  // Detect delimiter
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

export async function loadPoblacionComunas(): Promise<number> {
  const elapsed = startTimer();
  log("info", "Loading poblacion per comuna from MEData...");

  const pkg = await getMedataPackage(NODE_ID);
  if (!pkg) {
    log("error", "Could not fetch MEData package for population data");
    return 0;
  }

  let rows: Record<string, string | number | null>[] = [];

  // Try datastore API first
  const csvResource = findCsvResource(pkg.resources);
  if (csvResource) {
    try {
      rows = await getMedataRecords(csvResource.id, { limit: 10000 });
    } catch {
      log("warn", "Datastore API failed, trying CSV download...");
    }

    // Fallback to CSV download
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
    log("warn", "No population data retrieved from MEData");
    return 0;
  }

  log("info", `Fetched ${rows.length} rows. Sample columns: ${Object.keys(rows[0]).join(", ")}`);

  let inserted = 0;
  const batch: { territorio_id: string; anio: number; poblacion: number }[] = [];

  for (const row of rows) {
    // Try to find comuna/territory column
    const comunaName = String(
      row.comuna ?? row.nombre_comuna ?? row.territorio ?? row.nombre ?? ""
    ).trim();

    if (!comunaName) continue;

    const codigo = normalizeComuna(comunaName);
    if (!codigo) continue;

    const territorioId = await getTerritorioId(codigo);
    if (!territorioId) continue;

    // Try to find year and population columns
    const anio = Number(row.anio ?? row.ano ?? row.year ?? row.periodo ?? 0);
    const poblacion = Number(
      row.poblacion ?? row.total ?? row.poblacion_total ?? row.habitantes ?? 0
    );

    if (anio > 2000 && poblacion > 0) {
      batch.push({ territorio_id: territorioId, anio, poblacion });
    }
  }

  // Batch upsert
  const BATCH_SIZE = 500;
  for (let i = 0; i < batch.length; i += BATCH_SIZE) {
    const chunk = batch.slice(i, i + BATCH_SIZE);
    const { error } = await supabaseAdmin
      .from("poblacion_anual")
      .upsert(chunk, { onConflict: "territorio_id,anio" });

    if (error) {
      log("error", `Batch upsert error for poblacion_anual`, error.message);
    } else {
      inserted += chunk.length;
    }
  }

  log("info", `Loaded ${inserted} population rows (${elapsed()}ms)`);
  return inserted;
}

// Run standalone
if (require.main === module) {
  loadPoblacionComunas()
    .then((n) => log("info", `Done: ${n} rows`))
    .catch((err) => {
      log("error", "Failed", err);
      process.exit(1);
    });
}
