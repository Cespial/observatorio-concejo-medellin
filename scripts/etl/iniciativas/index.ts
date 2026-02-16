import { log, startTimer } from "../config";
import { seedIniciativasFromCsv } from "./seed-from-csv";

async function main() {
  const elapsed = startTimer();
  log("info", "=== ETL Iniciativas Legislativas: Starting ===");

  try {
    const count = await seedIniciativasFromCsv();
    log("info", `Seeded ${count} initiatives from CSV`);
  } catch (err) {
    log("error", "Failed to seed initiatives", (err as Error).message);
    process.exit(1);
  }

  log("info", `=== ETL Iniciativas: Complete (${elapsed()}ms) ===`);
}

main().catch((err) => {
  log("error", "ETL Iniciativas failed", err);
  process.exit(1);
});
