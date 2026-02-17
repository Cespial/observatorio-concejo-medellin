import { log, startTimer } from "../config";
import { clearTerritoryCache } from "../utils";
import { loadCalidadAire } from "./calidad-aire";
import { loadAreasVerdes } from "./areas-verdes";
import { loadCalidadAireEstaciones } from "./calidad-aire-estaciones";

async function main() {
  const elapsed = startTimer();
  log("info", "=== ETL Medio Ambiente: Starting ===");

  let totalRows = 0;
  const errors: string[] = [];

  const loaders = [
    { name: "Calidad del Aire PM2.5", fn: loadCalidadAire },
    { name: "Areas Verdes", fn: loadAreasVerdes },
    { name: "Calidad Aire Estaciones per-comuna", fn: loadCalidadAireEstaciones },
  ];

  for (const loader of loaders) {
    try {
      const count = await loader.fn();
      totalRows += count;
      log("info", `${loader.name}: ${count} data points loaded`);
    } catch (err) {
      const msg = `${loader.name} failed: ${(err as Error).message}`;
      errors.push(msg);
      log("error", msg);
    }
  }

  clearTerritoryCache();
  log("info", `=== ETL Ambiente: Complete (${elapsed()}ms, ${totalRows} rows) ===`);
  if (errors.length) log("warn", `Errors: ${errors.length}`, errors);
}

main().catch((err) => {
  log("error", "ETL Ambiente failed", err);
  process.exit(1);
});
