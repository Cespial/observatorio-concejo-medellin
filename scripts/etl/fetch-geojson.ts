import { writeFileSync } from "fs";
import { resolve } from "path";
import { log, startTimer } from "./config";
import { fetchArcGISFeatures } from "./arcgis-client";
import type { ArcGISFeature } from "./types";

// GeoMedellin ArcGIS REST services
const COMUNAS_URL =
  "https://services.arcgis.com/8DAUWsXeaBVp7szS/arcgis/rest/services/Comuna_Barrio/FeatureServer/0";
const CORREGIMIENTOS_URL =
  "https://services.arcgis.com/8DAUWsXeaBVp7szS/arcgis/rest/services/Corregimiento_Vereda/FeatureServer/0";

function mapComunaCodigo(arcgisCode: string | number): string {
  const num = Number(arcgisCode);
  return `COM${String(num).padStart(2, "0")}`;
}

function mapCorregimientoCodigo(arcgisCode: string | number): string {
  const num = Number(arcgisCode);
  return `COR${num}`;
}

async function fetchComunas(): Promise<ArcGISFeature[]> {
  log("info", "Fetching comunas boundaries from GeoMedellin...");
  try {
    const features = await fetchArcGISFeatures(COMUNAS_URL, {
      where: "1=1",
      outFields: "CODIGO,NOMBRE,SHAPE_Area",
      outSR: 4326,
    });

    return features.map((f) => ({
      ...f,
      properties: {
        codigo: mapComunaCodigo(f.properties.CODIGO ?? f.properties.codigo ?? "0"),
        nombre: String(f.properties.NOMBRE ?? f.properties.nombre ?? ""),
        numero: Number(f.properties.CODIGO ?? f.properties.codigo ?? 0),
        area: Number(f.properties.SHAPE_Area ?? f.properties.shape_area ?? 0),
      },
    }));
  } catch (err) {
    log("warn", "Failed to fetch comunas from ArcGIS, trying alternative...", (err as Error).message);
    return [];
  }
}

async function fetchCorregimientos(): Promise<ArcGISFeature[]> {
  log("info", "Fetching corregimientos boundaries from GeoMedellin...");
  try {
    const features = await fetchArcGISFeatures(CORREGIMIENTOS_URL, {
      where: "1=1",
      outFields: "CODIGO,NOMBRE,SHAPE_Area",
      outSR: 4326,
    });

    return features.map((f) => ({
      ...f,
      properties: {
        codigo: mapCorregimientoCodigo(f.properties.CODIGO ?? f.properties.codigo ?? "0"),
        nombre: String(f.properties.NOMBRE ?? f.properties.nombre ?? ""),
        numero: Number(f.properties.CODIGO ?? f.properties.codigo ?? 0),
        area: Number(f.properties.SHAPE_Area ?? f.properties.shape_area ?? 0),
      },
    }));
  } catch (err) {
    log("warn", "Failed to fetch corregimientos from ArcGIS", (err as Error).message);
    return [];
  }
}

async function main() {
  const elapsed = startTimer();
  log("info", "=== GeoJSON Fetch: Starting ===");

  const [comunas, corregimientos] = await Promise.all([
    fetchComunas(),
    fetchCorregimientos(),
  ]);

  const allFeatures = [...comunas, ...corregimientos];

  if (allFeatures.length === 0) {
    log("error", "No features fetched. Check ArcGIS service availability.");
    log("info", "Keeping existing GeoJSON file unchanged.");
    process.exit(1);
  }

  log("info", `Fetched ${comunas.length} comunas + ${corregimientos.length} corregimientos`);

  const geojson = {
    type: "FeatureCollection" as const,
    features: allFeatures,
  };

  const outputPath = resolve(
    __dirname,
    "../../public/geojson/comunas-medellin.geojson"
  );

  writeFileSync(outputPath, JSON.stringify(geojson, null, 2), "utf-8");
  log("info", `GeoJSON written to ${outputPath} (${allFeatures.length} features)`);

  log("info", `=== GeoJSON Fetch: Complete (${elapsed()}ms) ===`);
}

main().catch((err) => {
  log("error", "GeoJSON fetch failed", err);
  process.exit(1);
});
