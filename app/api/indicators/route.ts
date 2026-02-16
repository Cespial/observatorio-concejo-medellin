import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);

    const lineaSlug = searchParams.get("linea");
    const limit = parseInt(searchParams.get("limit") || "50");

    let query = supabase
      .from("indicadores")
      .select(`
        *,
        lineas_tematicas (nombre, slug, color),
        categorias_indicador (nombre)
      `)
      .eq("activo", true)
      .order("nombre")
      .limit(limit);

    if (lineaSlug) {
      query = query.eq("lineas_tematicas.slug", lineaSlug);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Indicators API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
