import { log, startTimer } from "../config";
import { clearTerritoryCache } from "../utils";
import { loadHomicidios } from "./homicidios";
import { loadHurtos } from "./hurtos";
import { loadViolenciaIntrafamiliar } from "./violencia-intrafamiliar";
import { loadLesionesPersonales } from "./lesiones-personales";
import { loadExtorsion } from "./extorsion";
import { loadDelitosSexuales } from "./delitos-sexuales";

async function main() {
  const elapsed = startTimer();
  log("info", "=== ETL Seguridad y Convivencia: Starting ===");

  let totalRows = 0;
  const errors: string[] = [];

  const loaders = [
    { name: "Homicidios", fn: loadHomicidios },
    { name: "Hurtos", fn: loadHurtos },
    { name: "Violencia Intrafamiliar", fn: loadViolenciaIntrafamiliar },
    { name: "Lesiones Personales", fn: loadLesionesPersonales },
    { name: "Extorsion", fn: loadExtorsion },
    { name: "Delitos Sexuales", fn: loadDelitosSexuales },
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

  log("info", `=== ETL Seguridad: Complete ===`);
  log("info", `Total data points: ${totalRows}`);
  log("info", `Duration: ${elapsed()}ms`);
  if (errors.length) {
    log("warn", `Errors: ${errors.length}`, errors);
  }
}

main().catch((err) => {
  log("error", "ETL Seguridad failed", err);
  process.exit(1);
});
