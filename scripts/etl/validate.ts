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

  // Check per-comuna data coverage
  log("info", "\n--- Per-Comuna Data Coverage ---\n");

  const { data: comunas } = await supabaseAdmin
    .from("territorios")
    .select("id, nombre, codigo")
    .eq("tipo", "comuna")
    .order("codigo");

  if (comunas?.length) {
    const comunaIds = comunas.map((c) => c.id);

    const { count: perComunaCount } = await supabaseAdmin
      .from("datos_indicador")
      .select("id", { count: "exact", head: true })
      .in("territorio_id", comunaIds);

    if ((perComunaCount ?? 0) > 0) {
      log("info", `  PASS  Per-comuna data: ${perComunaCount} data points across ${comunas.length} comunas`);
      passed++;

      // Check how many comunas have data
      const comunasWithData = new Set<string>();
      const { data: comunaDatos } = await supabaseAdmin
        .from("datos_indicador")
        .select("territorio_id")
        .in("territorio_id", comunaIds)
        .limit(1000);

      for (const d of comunaDatos ?? []) {
        comunasWithData.add(d.territorio_id);
      }

      log("info", `  INFO  ${comunasWithData.size}/${comunas.length} comunas have indicator data`);
    } else {
      log("warn", `  WARN  No per-comuna data found (only city-level MDE data)`);
    }
  }

  // Check data source freshness
  log("info", "\n--- Data Source Freshness ---\n");

  const { data: indicators } = await supabaseAdmin
    .from("indicadores")
    .select("slug, nombre, ficha_tecnica, updated_at")
    .eq("activo", true)
    .order("updated_at", { ascending: true });

  if (indicators?.length) {
    const now = new Date();
    for (const ind of indicators) {
      const updatedAt = new Date(ind.updated_at);
      const daysSinceUpdate = Math.floor((now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60 * 24));
      const ficha = ind.ficha_tecnica as Record<string, unknown> | null;
      const source = ficha?.fuente ? String(ficha.fuente).slice(0, 40) : "unknown";
      const datasetId = ficha?.dataset_id ? ` [${ficha.dataset_id}]` : "";

      if (daysSinceUpdate > 30) {
        log("warn", `  STALE ${ind.slug}: updated ${daysSinceUpdate}d ago — ${source}${datasetId}`);
      } else {
        log("info", `  FRESH ${ind.slug}: updated ${daysSinceUpdate}d ago — ${source}${datasetId}`);
      }
    }
  }

  // Check fuente_datos linkage
  log("info", "\n--- Fuente Datos Linkage ---\n");

  const { data: unlinkedIndicators } = await supabaseAdmin
    .from("indicadores")
    .select("slug")
    .eq("activo", true)
    .is("fuente_datos_id", null);

  if (unlinkedIndicators?.length) {
    log("warn", `  WARN  ${unlinkedIndicators.length} indicators without fuente_datos link: ${unlinkedIndicators.map((i) => i.slug).join(", ")}`);
  } else {
    log("info", "  PASS  All active indicators have fuente_datos_id linked");
    passed++;
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
