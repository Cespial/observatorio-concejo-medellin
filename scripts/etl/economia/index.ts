import { log, startTimer } from "../config";
import { clearTerritoryCache } from "../utils";
import { loadEmpleo } from "./empleo";

async function main() {
  const elapsed = startTimer();
  log("info", "=== ETL Economia y Empleo: Starting ===");

  let totalRows = 0;
  const errors: string[] = [];

  try {
    const count = await loadEmpleo();
    totalRows += count;
    log("info", `Empleo: ${count} data points loaded`);
  } catch (err) {
    const msg = `Empleo failed: ${(err as Error).message}`;
    errors.push(msg);
    log("error", msg);
  }

  clearTerritoryCache();
  log("info", `=== ETL Economia: Complete (${elapsed()}ms, ${totalRows} rows) ===`);
  if (errors.length) log("warn", `Errors: ${errors.length}`, errors);
}

main().catch((err) => {
  log("error", "ETL Economia failed", err);
  process.exit(1);
});
