import { supabaseAdmin, log } from "./config";
import { getTerritorioId, getLineaTematicaId, getCategoriaId, getFuenteDatosId, computeVariation, computeTendencia } from "./utils";
import type { IndicatorPayload } from "./types";

export async function loadIndicator(payload: IndicatorPayload): Promise<number> {
  const lineaId = await getLineaTematicaId(payload.linea_tematica_slug);
  if (!lineaId) {
    log("error", `Thematic line not found: ${payload.linea_tematica_slug}`);
    return 0;
  }

  // Resolve optional category
  let categoriaId: string | null = null;
  if (payload.categoria_nombre) {
    categoriaId = await getCategoriaId(payload.categoria_nombre);
  }

  // Resolve optional fuente_datos
  let fuenteDatosId: string | null = null;
  if (payload.fuente_nombre) {
    fuenteDatosId = await getFuenteDatosId(payload.fuente_nombre);
  } else if (payload.ficha_tecnica?.fuente) {
    fuenteDatosId = await getFuenteDatosId(String(payload.ficha_tecnica.fuente));
  }

  // Upsert indicator
  const { data: indicador, error: indError } = await supabaseAdmin
    .from("indicadores")
    .upsert(
      {
        nombre: payload.nombre,
        slug: payload.slug,
        descripcion: payload.descripcion,
        unidad_medida: payload.unidad_medida,
        periodicidad: payload.periodicidad,
        linea_tematica_id: lineaId,
        categoria_id: categoriaId,
        fuente_datos_id: fuenteDatosId,
        ficha_tecnica: payload.ficha_tecnica ?? {},
        activo: true,
      },
      { onConflict: "slug" }
    )
    .select("id")
    .single();

  if (indError || !indicador) {
    log("error", `Failed to upsert indicator: ${payload.nombre}`, indError?.message);
    return 0;
  }

  // Prepare data points
  let inserted = 0;
  const dataPoints: {
    indicador_id: string;
    territorio_id: string;
    periodo: string;
    valor: number;
    metadata: Record<string, unknown> | null;
  }[] = [];

  for (const val of payload.valores) {
    const territorioId = await getTerritorioId(val.territorio_codigo);
    if (!territorioId) {
      log("warn", `Territory not found: ${val.territorio_codigo}`);
      continue;
    }
    dataPoints.push({
      indicador_id: indicador.id,
      territorio_id: territorioId,
      periodo: val.periodo,
      valor: val.valor,
      metadata: val.metadata ?? null,
    });
  }

  // Batch upsert data points
  const BATCH_SIZE = 500;
  for (let i = 0; i < dataPoints.length; i += BATCH_SIZE) {
    const batch = dataPoints.slice(i, i + BATCH_SIZE);
    const { error: dataError } = await supabaseAdmin
      .from("datos_indicador")
      .upsert(batch, { onConflict: "indicador_id,territorio_id,periodo" });

    if (dataError) {
      log("error", `Batch upsert error for ${payload.slug}`, dataError.message);
    } else {
      inserted += batch.length;
    }
  }

  // Compute ultimo_valor, variacion_porcentual, tendencia from MDE data
  const mdeVals = payload.valores
    .filter((v) => v.territorio_codigo === "MDE")
    .sort((a, b) => a.periodo.localeCompare(b.periodo));

  if (mdeVals.length > 0) {
    const lastVal = mdeVals[mdeVals.length - 1];
    const prevVal = mdeVals.length > 1 ? mdeVals[mdeVals.length - 2] : null;

    await supabaseAdmin
      .from("indicadores")
      .update({
        ultimo_valor: lastVal.valor,
        variacion_porcentual: prevVal ? computeVariation(lastVal.valor, prevVal.valor) : null,
        tendencia: computeTendencia(mdeVals),
      })
      .eq("id", indicador.id);
  }

  log("info", `Loaded indicator: ${payload.nombre} (${inserted} data points)`);
  return inserted;
}
