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
    ];

    const counts: Record<string, number> = {};
    for (const table of tables) {
      const { count } = await supabase
        .from(table)
        .select("id", { count: "exact", head: true });
      counts[table] = count ?? 0;
    }

    const { data: indicadoresRaw } = await (supabase
      .from("indicadores")
      .select("nombre, slug, ultimo_valor, variacion_porcentual, tendencia, updated_at")
      .eq("activo", true)
      .order("updated_at", { ascending: false }) as unknown as Promise<{ data: DbRow[] | null }>);

    const { data: latestDataRaw } = await (supabase
      .from("datos_indicador")
      .select("created_at")
      .order("created_at", { ascending: false })
      .limit(1) as unknown as Promise<{ data: DbRow[] | null }>);

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      counts,
      lastDataIngestion: latestDataRaw?.[0]?.created_at ?? null,
      indicadores: indicadoresRaw ?? [],
    });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: (err as Error).message },
      { status: 500 }
    );
  }
}
