import { log, startTimer } from "../config";
import { clearTerritoryCache } from "../utils";
import { loadMortalidadInfantil } from "./mortalidad";
import { loadVacunacion } from "./vacunacion";

async function main() {
  const elapsed = startTimer();
  log("info", "=== ETL Salud Publica: Starting ===");

  let totalRows = 0;
  const errors: string[] = [];

  const loaders = [
    { name: "Mortalidad Infantil", fn: loadMortalidadInfantil },
    { name: "Vacunacion", fn: loadVacunacion },
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
  log("info", `=== ETL Salud: Complete (${elapsed()}ms, ${totalRows} rows) ===`);
  if (errors.length) log("warn", `Errors: ${errors.length}`, errors);
}

main().catch((err) => {
  log("error", "ETL Salud failed", err);
  process.exit(1);
});
