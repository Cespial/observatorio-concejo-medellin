import { supabaseAdmin, log, startTimer } from "./config";

type ValidationCheck = {
  table: string;
  minRows: number;
  description: string;
};

const CHECKS: ValidationCheck[] = [
  { table: "territorios", minRows: 22, description: "22 territories (MDE + 16 comunas + 5 corregimientos)" },
  { table: "lineas_tematicas", minRows: 6, description: "6 thematic lines" },
  { table: "fuentes_datos", minRows: 14, description: "14 data sources" },
  { table: "categorias_indicador", minRows: 20, description: "20 indicator categories" },
  { table: "indicadores", minRows: 5, description: "At least 5 indicators loaded" },
  { table: "datos_indicador", minRows: 20, description: "At least 20 data points" },
  { table: "autores_iniciativa", minRows: 15, description: "At least 15 authors" },
  { table: "iniciativas", minRows: 10, description: "At least 10 initiatives" },
  { table: "tags", minRows: 30, description: "30 tags" },
  { table: "comisiones", minRows: 3, description: "3 comisiones" },
];

async function main() {
  const elapsed = startTimer();
  log("info", "=== Data Validation: Starting ===\n");

  let passed = 0;
  let failed = 0;

  for (const check of CHECKS) {
    const { count, error } = await supabaseAdmin
      .from(check.table)
      .select("id", { count: "exact", head: true });

    if (error) {
      log("error", `  FAIL  ${check.table}: query error - ${error.message}`);
      failed++;
      continue;
    }

    const rowCount = count ?? 0;
    if (rowCount >= check.minRows) {
      log("info", `  PASS  ${check.table}: ${rowCount} rows (expected >= ${check.minRows})`);
      passed++;
    } else {
      log("error", `  FAIL  ${check.table}: ${rowCount} rows (expected >= ${check.minRows}) — ${check.description}`);
      failed++;
    }
  }

  // Additional checks
  log("info", "\n--- Additional Checks ---\n");

  // Check for null ultimo_valor in active indicators
  const { data: nullIndicators } = await supabaseAdmin
    .from("indicadores")
    .select("slug")
    .eq("activo", true)
    .is("ultimo_valor", null);

  if (nullIndicators?.length) {
    log("warn", `  WARN  ${nullIndicators.length} active indicators with null ultimo_valor: ${nullIndicators.map((i) => i.slug).join(", ")}`);
  } else {
    log("info", "  PASS  All active indicators have ultimo_valor set");
    passed++;
  }

  // Check date range of datos_indicador
  const { data: dateRange } = await supabaseAdmin
    .from("datos_indicador")
    .select("periodo")
    .order("periodo", { ascending: true })
    .limit(1);

  const { data: dateRangeMax } = await supabaseAdmin
    .from("datos_indicador")
    .select("periodo")
    .order("periodo", { ascending: false })
    .limit(1);

  if (dateRange?.length && dateRangeMax?.length) {
    log("info", `  INFO  Data range: ${dateRange[0].periodo} to ${dateRangeMax[0].periodo}`);
  }

  // Summary
  log("info", `\n${"=".repeat(50)}`);
  log("info", `Validation complete: ${passed} passed, ${failed} failed`);
  log("info", `Duration: ${elapsed()}ms`);

  if (failed > 0) {
    log("error", "\nValidation FAILED. Fix the issues above before deploying.");
    process.exit(1);
  } else {
    log("info", "\nAll checks PASSED.");
  }
}

main().catch((err) => {
  log("error", "Validation failed", err);
  process.exit(1);
});
