import { execSync } from "child_process";
import { log, startTimer } from "./config";
import type { ETLResult } from "./types";

type Phase = {
  name: string;
  script: string;
};

const PHASES: Phase[] = [
  { name: "GeoJSON Boundaries", script: "scripts/etl/fetch-geojson.ts" },
  { name: "Concejales", script: "scripts/etl/seed-concejales.ts" },
  { name: "Seguridad", script: "scripts/etl/seguridad/index.ts" },
  { name: "Educacion", script: "scripts/etl/educacion/index.ts" },
  { name: "Economia", script: "scripts/etl/economia/index.ts" },
  { name: "Movilidad", script: "scripts/etl/movilidad/index.ts" },
  { name: "Ambiente", script: "scripts/etl/ambiente/index.ts" },
  { name: "Salud", script: "scripts/etl/salud/index.ts" },
  { name: "Iniciativas", script: "scripts/etl/iniciativas/index.ts" },
  { name: "Poblacion Comunas", script: "scripts/etl/poblacion-comunas.ts" },
  { name: "ECV per-comuna", script: "scripts/etl/ecv/index.ts" },
];

function runPhase(phase: Phase): ETLResult {
  const phaseTimer = startTimer();
  log("info", `\n${"=".repeat(60)}`);
  log("info", `Starting phase: ${phase.name}`);
  log("info", "=".repeat(60));

  try {
    execSync(`npx tsx ${phase.script}`, {
      stdio: "inherit",
      timeout: 120_000,
    });

    return {
      phase: phase.name,
      success: true,
      rowsProcessed: 0,
      rowsInserted: 0,
      rowsSkipped: 0,
      errors: [],
      durationMs: phaseTimer(),
    };
  } catch (err) {
    const error = err as Error;
    log("error", `Phase ${phase.name} failed`, error.message);
    return {
      phase: phase.name,
      success: false,
      rowsProcessed: 0,
      rowsInserted: 0,
      rowsSkipped: 0,
      errors: [error.message],
      durationMs: phaseTimer(),
    };
  }
}

function main() {
  const totalTimer = startTimer();
  log("info", "");
  log("info", "╔══════════════════════════════════════════════════════════╗");
  log("info", "║     OBSERVATORIO CONCEJO MEDELLIN - ETL MASTER RUN     ║");
  log("info", "╚══════════════════════════════════════════════════════════╝");
  log("info", "");

  const results: ETLResult[] = [];

  for (const phase of PHASES) {
    const result = runPhase(phase);
    results.push(result);

    if (!result.success) {
      log("warn", `Phase "${phase.name}" failed but continuing with next phase...`);
    }
  }

  // Summary
  log("info", "\n" + "=".repeat(60));
  log("info", "ETL RUN SUMMARY");
  log("info", "=".repeat(60));

  const successful = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;

  for (const r of results) {
    const status = r.success ? "OK" : "FAIL";
    log("info", `  [${status}] ${r.phase} (${r.durationMs}ms)`);
  }

  log("info", "");
  log("info", `Total: ${successful} succeeded, ${failed} failed`);
  log("info", `Total duration: ${totalTimer()}ms`);

  if (failed > 0) {
    process.exit(1);
  }
}

main();
