import { supabaseAdmin, log } from "./config";

type IndicatorRow = {
  nombre: string;
  slug: string;
  descripcion: string;
  unidad_medida: string;
  periodicidad: string;
  linea_tematica_slug: string;
  valores: { periodo: string; territorio_codigo: string; valor: number }[];
};

async function loadIndicator(row: IndicatorRow) {
  const { data: linea } = await supabaseAdmin
    .from("lineas_tematicas")
    .select("id")
    .eq("slug", row.linea_tematica_slug)
    .single();

  if (!linea) {
    log("error", `Thematic line not found: ${row.linea_tematica_slug}`);
    return;
  }

  const { data: indicador, error: indError } = await supabaseAdmin
    .from("indicadores")
    .upsert(
      {
        nombre: row.nombre,
        slug: row.slug,
        descripcion: row.descripcion,
        unidad_medida: row.unidad_medida,
        periodicidad: row.periodicidad,
        linea_tematica_id: linea.id,
      },
      { onConflict: "slug" }
    )
    .select("id")
    .single();

  if (indError || !indicador) {
    log("error", `Failed to upsert indicator: ${row.nombre}`, indError);
    return;
  }

  for (const val of row.valores) {
    const { data: territorio } = await supabaseAdmin
      .from("territorios")
      .select("id")
      .eq("codigo", val.territorio_codigo)
      .single();

    if (!territorio) {
      log("warn", `Territory not found: ${val.territorio_codigo}`);
      continue;
    }

    const { error: dataError } = await supabaseAdmin.from("datos_indicador").upsert(
      {
        indicador_id: indicador.id,
        territorio_id: territorio.id,
        periodo: val.periodo,
        valor: val.valor,
      },
      { onConflict: "indicador_id,territorio_id,periodo" }
    );

    if (dataError) log("error", `Failed data point: ${row.slug} / ${val.periodo}`, dataError);
  }

  const lastVal = row.valores[row.valores.length - 1];
  if (lastVal) {
    await supabaseAdmin
      .from("indicadores")
      .update({ ultimo_valor: lastVal.valor })
      .eq("id", indicador.id);
  }

  log("info", `Loaded indicator: ${row.nombre} (${row.valores.length} data points)`);
}

async function main() {
  log("info", "Starting indicator load...");

  const sampleIndicator: IndicatorRow = {
    nombre: "Tasa de homicidios por 100.000 habitantes",
    slug: "tasa-homicidios",
    descripcion: "Numero de homicidios por cada 100.000 habitantes en el periodo",
    unidad_medida: "por 100k hab",
    periodicidad: "anual",
    linea_tematica_slug: "seguridad",
    valores: [
      { periodo: "2020", territorio_codigo: "MDE", valor: 23.7 },
      { periodo: "2021", territorio_codigo: "MDE", valor: 21.2 },
      { periodo: "2022", territorio_codigo: "MDE", valor: 19.8 },
      { periodo: "2023", territorio_codigo: "MDE", valor: 18.1 },
      { periodo: "2024", territorio_codigo: "MDE", valor: 17.3 },
      { periodo: "2025", territorio_codigo: "MDE", valor: 16.8 },
    ],
  };

  await loadIndicator(sampleIndicator);
  log("info", "Indicator load complete");
}

main().catch(console.error);
