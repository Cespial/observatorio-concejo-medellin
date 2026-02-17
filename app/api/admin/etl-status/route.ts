import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

type DbRow = Record<string, unknown>;

export async function GET() {
  try {
    const supabase = createAdminClient();

    const tables = [
      "territorios",
      "lineas_tematicas",
      "indicadores",
      "datos_indicador",
      "autores_iniciativa",
      "iniciativas",
      "iniciativas_autores",
      "poblacion_anual",
    ];

    const counts: Record<string, number> = {};
    for (const table of tables) {
      const { count } = await supabase
        .from(table)
        .select("id", { count: "exact", head: true });
      counts[table] = count ?? 0;
    }

    // Per-indicator freshness
    const { data: indicadoresRaw } = await (supabase
      .from("indicadores")
      .select("nombre, slug, ultimo_valor, variacion_porcentual, tendencia, updated_at, ficha_tecnica")
      .eq("activo", true)
      .order("updated_at", { ascending: false }) as unknown as Promise<{ data: DbRow[] | null }>);

    const { data: latestDataRaw } = await (supabase
      .from("datos_indicador")
      .select("created_at")
      .order("created_at", { ascending: false })
      .limit(1) as unknown as Promise<{ data: DbRow[] | null }>);

    // Data freshness per indicator
    const freshness: { slug: string; name: string; lastUpdated: string | null; source: string; hasPerComuna: boolean }[] = [];

    if (indicadoresRaw?.length) {
      // Check which indicators have per-comuna data
      const { data: comunaTerritorios } = await (supabase
        .from("territorios")
        .select("id")
        .eq("tipo", "comuna") as unknown as Promise<{ data: DbRow[] | null }>);

      const comunaIds = (comunaTerritorios ?? []).map((t) => String(t.id));

      for (const ind of indicadoresRaw) {
        let hasPerComuna = false;
        if (comunaIds.length > 0) {
          const { count } = await supabase
            .from("datos_indicador")
            .select("id", { count: "exact", head: true })
            .eq("indicador_id", String(ind.slug))
            .in("territorio_id", comunaIds);
          hasPerComuna = (count ?? 0) > 0;
        }

        const ficha = ind.ficha_tecnica as Record<string, unknown> | null;
        freshness.push({
          slug: String(ind.slug),
          name: String(ind.nombre),
          lastUpdated: ind.updated_at as string | null,
          source: String(ficha?.fuente ?? "Unknown"),
          hasPerComuna,
        });
      }
    }

    // Per-comuna data coverage
    const { data: comunasRaw } = await (supabase
      .from("territorios")
      .select("codigo, nombre")
      .eq("tipo", "comuna")
      .order("codigo") as unknown as Promise<{ data: DbRow[] | null }>);

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      counts,
      lastDataIngestion: latestDataRaw?.[0]?.created_at ?? null,
      indicadores: indicadoresRaw ?? [],
      freshness,
      comunaCount: comunasRaw?.length ?? 0,
    });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: (err as Error).message },
      { status: 500 }
    );
  }
}
