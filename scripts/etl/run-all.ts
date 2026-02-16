import { log, startTimer } from "./config";
import type { ETLResult } from "./types";

type PhaseRunner = {
  name: string;
  module: string;
};

const PHASES: PhaseRunner[] = [
  { name: "GeoJSON Boundaries", module: "./fetch-geojson" },
  { name: "Concejales", module: "./seed-concejales" },
  { name: "Seguridad", module: "./seguridad/index" },
  { name: "Educacion", module: "./educacion/index" },
  { name: "Economia", module: "./economia/index" },
  { name: "Movilidad", module: "./movilidad/index" },
  { name: "Ambiente", module: "./ambiente/index" },
  { name: "Salud", module: "./salud/index" },
  { name: "Iniciativas", module: "./iniciativas/index" },
];

async function runPhase(phase: PhaseRunner): Promise<ETLResult> {
  const phaseTimer = startTimer();
  log("info", `\n${"=".repeat(60)}`);
  log("info", `Starting phase: ${phase.name}`);
  log("info", "=".repeat(60));

  try {
    // Dynamic import of the phase module
    await import(phase.module);

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

async function main() {
  const totalTimer = startTimer();
  log("info", "");
  log("info", "╔══════════════════════════════════════════════════════════╗");
  log("info", "║     OBSERVATORIO CONCEJO MEDELLIN - ETL MASTER RUN     ║");
  log("info", "╚══════════════════════════════════════════════════════════╝");
  log("info", "");

  const results: ETLResult[] = [];

  for (const phase of PHASES) {
    const result = await runPhase(phase);
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
    if (r.errors.length > 0) {
      for (const err of r.errors) {
        log("error", `    -> ${err}`);
      }
    }
  }

  log("info", "");
  log("info", `Total: ${successful} succeeded, ${failed} failed`);
  log("info", `Total duration: ${totalTimer()}ms`);

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  log("error", "ETL master run failed", err);
  process.exit(1);
});
