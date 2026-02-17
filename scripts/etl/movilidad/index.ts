import { log, startTimer } from "../config";
import { clearTerritoryCache } from "../utils";
import { loadPasajerosMetro } from "./metro";
import { loadAccidentalidad } from "./accidentalidad";
import { loadIncidentesVialesMedata } from "./incidentes-viales-medata";

async function main() {
  const elapsed = startTimer();
  log("info", "=== ETL Movilidad y Transporte: Starting ===");

  let totalRows = 0;
  const errors: string[] = [];

  const loaders = [
    { name: "Pasajeros Metro", fn: loadPasajerosMetro },
    { name: "Accidentalidad", fn: loadAccidentalidad },
    { name: "Incidentes Viales per-comuna", fn: loadIncidentesVialesMedata },
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
  log("info", `=== ETL Movilidad: Complete (${elapsed()}ms, ${totalRows} rows) ===`);
  if (errors.length) log("warn", `Errors: ${errors.length}`, errors);
}

main().catch((err) => {
  log("error", "ETL Movilidad failed", err);
  process.exit(1);
});
