import { readFileSync } from "fs";
import { resolve } from "path";
import { supabaseAdmin, log, startTimer } from "./config";

async function main() {
  const elapsed = startTimer();
  log("info", "=== Territory GeoJSON Update: Starting ===");

  const geojsonPath = resolve(
    __dirname,
    "../../public/geojson/comunas-medellin.geojson"
  );

  const raw = readFileSync(geojsonPath, "utf-8");
  const geojson = JSON.parse(raw) as {
    type: string;
    features: {
      type: string;
      properties: { codigo: string; nombre: string };
      geometry: unknown;
    }[];
  };

  log("info", `Loaded ${geojson.features.length} features from GeoJSON`);

  let updated = 0;
  let skipped = 0;

  for (const feature of geojson.features) {
    const codigo = feature.properties.codigo;
    if (!codigo) {
      skipped++;
      continue;
    }

    const { error } = await supabaseAdmin
      .from("territorios")
      .update({ geojson: feature.geometry })
      .eq("codigo", codigo);

    if (error) {
      log("warn", `Failed to update geojson for ${codigo}`, error.message);
      skipped++;
    } else {
      updated++;
    }
  }

  log("info", `Updated ${updated} territories, skipped ${skipped}`);
  log("info", `=== Territory GeoJSON Update: Complete (${elapsed()}ms) ===`);
}

main().catch((err) => {
  log("error", "Territory GeoJSON update failed", err);
  process.exit(1);
});
