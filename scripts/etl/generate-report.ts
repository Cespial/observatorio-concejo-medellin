import { supabaseAdmin, log, startTimer } from "./config";
import { writeFileSync } from "fs";
import { resolve } from "path";

async function main() {
  const elapsed = startTimer();
  log("info", "=== Generating Data Freshness Report ===\n");

  const lines: string[] = [];
  lines.push("# Observatorio Concejo Medellin - Data Freshness Report");
  lines.push(`\nGenerated: ${new Date().toISOString()}\n`);

  // Table counts
  lines.push("## Table Row Counts\n");
  lines.push("| Table | Rows |");
  lines.push("|-------|------|");

  const tables = [
    "territorios", "lineas_tematicas", "fuentes_datos",
    "categorias_indicador", "indicadores", "datos_indicador",
    "autores_iniciativa", "iniciativas", "iniciativas_autores",
    "tags", "comisiones", "productos",
  ];

  for (const table of tables) {
    const { count } = await supabaseAdmin
      .from(table)
      .select("id", { count: "exact", head: true });
    lines.push(`| ${table} | ${count ?? 0} |`);
  }

  // Indicators detail
  lines.push("\n## Indicators\n");
  lines.push("| Indicator | Slug | Unit | Last Value | Variation | Trend | Data Points |");
  lines.push("|-----------|------|------|------------|-----------|-------|-------------|");

  const { data: indicadores } = await supabaseAdmin
    .from("indicadores")
    .select("id, nombre, slug, unidad_medida, ultimo_valor, variacion_porcentual, tendencia")
    .eq("activo", true)
    .order("nombre");

  for (const ind of indicadores ?? []) {
    const { count } = await supabaseAdmin
      .from("datos_indicador")
      .select("id", { count: "exact", head: true })
      .eq("indicador_id", ind.id);

    const variation = ind.variacion_porcentual != null
      ? `${ind.variacion_porcentual > 0 ? "+" : ""}${ind.variacion_porcentual}%`
      : "N/A";

    lines.push(
      `| ${ind.nombre} | ${ind.slug} | ${ind.unidad_medida} | ${ind.ultimo_valor ?? "N/A"} | ${variation} | ${ind.tendencia ?? "N/A"} | ${count ?? 0} |`
    );
  }

  // Initiatives summary
  lines.push("\n## Initiatives by Status\n");

  // Manual count since RPC may not exist
  const estados = ["radicada", "en_comision", "primer_debate", "segundo_debate", "aprobada", "archivada", "retirada"];
  lines.push("| Status | Count |");
  lines.push("|--------|-------|");
  for (const estado of estados) {
    const { count } = await supabaseAdmin
      .from("iniciativas")
      .select("id", { count: "exact", head: true })
      .eq("estado", estado);
    lines.push(`| ${estado} | ${count ?? 0} |`);
  }

  const report = lines.join("\n");
  const outputPath = resolve(__dirname, "../../DATA_REPORT.md");
  writeFileSync(outputPath, report, "utf-8");

  log("info", `Report written to ${outputPath}`);
  log("info", `Duration: ${elapsed()}ms`);
}

main().catch((err) => {
  log("error", "Report generation failed", err);
  process.exit(1);
});
