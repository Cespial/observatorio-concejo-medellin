import { log, startTimer } from "../config";
import { clearTerritoryCache } from "../utils";
import { loadCoberturaEducativa } from "./cobertura";
import { loadDesercionEscolar } from "./desercion";

async function main() {
  const elapsed = startTimer();
  log("info", "=== ETL Educacion y Cultura: Starting ===");

  let totalRows = 0;
  const errors: string[] = [];

  const loaders = [
    { name: "Cobertura Educativa", fn: loadCoberturaEducativa },
    { name: "Desercion Escolar", fn: loadDesercionEscolar },
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
  log("info", `=== ETL Educacion: Complete (${elapsed()}ms, ${totalRows} rows) ===`);
  if (errors.length) log("warn", `Errors: ${errors.length}`, errors);
}

main().catch((err) => {
  log("error", "ETL Educacion failed", err);
  process.exit(1);
});
