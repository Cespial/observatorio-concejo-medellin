import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { log, startTimer } from "./config";

// ArcGIS service with both comunas and corregimientos (21 features total)
const SERVICE_URL =
  "https://services1.arcgis.com/Qrk4Z5vQ94JXkdYM/arcgis/rest/services/Limite_Comuna_Corregimiento/FeatureServer/0";

const QUERY_URL = `${SERVICE_URL}/query?where=1%3D1&outFields=COMUNA,NOMBRE,SHAPEAREA&outSR=4326&f=geojson`;

const MAX_RETRIES = 3;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Map the COMUNA field from ArcGIS to our internal codigo format.
 * Codes 01-16 are comunas -> COM01..COM16
 * Codes 50, 60, 70, 80, 90 are corregimientos -> COR50..COR90
 */
function mapCodigo(comunaCode: string): string {
  const num = parseInt(comunaCode, 10);
  if (num >= 1 && num <= 16) {
    return `COM${String(num).padStart(2, "0")}`;
  }
  // Corregimientos: 50, 60, 70, 80, 90
  return `COR${num}`;
}

async function fetchWithRetry(url: string): Promise<unknown> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      log("info", `Fetch attempt ${attempt}/${MAX_RETRIES}...`);
      const response = await fetch(url);
      if (!response.ok) {
        const body = await response.text();
        throw new Error(`HTTP ${response.status}: ${body.slice(0, 300)}`);
      }
      return await response.json();
    } catch (err) {
      lastError = err as Error;
      log("warn", `Attempt ${attempt} failed: ${lastError.message}`);
      if (attempt < MAX_RETRIES) {
        const delay = Math.pow(2, attempt) * 1000;
        log("info", `Retrying in ${delay}ms...`);
        await sleep(delay);
      }
    }
  }

  throw lastError;
}

async function main() {
  const elapsed = startTimer();
  log("info", "=== GeoJSON Fetch: Starting ===");
  log("info", `Fetching comunas and corregimientos from ArcGIS...`);

  const geojsonRaw = (await fetchWithRetry(QUERY_URL)) as {
    type: string;
    features: Array<{
      type: string;
      properties: Record<string, string | number | null>;
      geometry: unknown;
    }>;
  };

  if (!geojsonRaw.features || geojsonRaw.features.length === 0) {
    log("error", "No features fetched. Check ArcGIS service availability.");
    log("info", "Keeping existing GeoJSON file unchanged.");
    process.exit(1);
  }

  log("info", `Fetched ${geojsonRaw.features.length} features from ArcGIS`);

  // Map properties to our format
  const features = geojsonRaw.features.map((f) => {
    const comunaCode = String(f.properties.COMUNA ?? "0");
    const codigo = mapCodigo(comunaCode);
    const nombre = String(f.properties.NOMBRE ?? "").trim();

    return {
      type: "Feature" as const,
      properties: {
        codigo,
        nombre,
      },
      geometry: f.geometry,
    };
  });

  const geojson = {
    type: "FeatureCollection" as const,
    features,
  };

  const outputPath = resolve(
    __dirname,
    "../../public/geojson/comunas-medellin.geojson"
  );

  // Ensure output directory exists
  mkdirSync(dirname(outputPath), { recursive: true });

  writeFileSync(outputPath, JSON.stringify(geojson, null, 2), "utf-8");
  log("info", `GeoJSON written to ${outputPath} (${features.length} features)`);

  log("info", `=== GeoJSON Fetch: Complete (${elapsed()}ms) ===`);
}

main().catch((err) => {
  log("error", "GeoJSON fetch failed", err);
  process.exit(1);
});
