import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tipo = searchParams.get("tipo");
    const linea = searchParams.get("linea");
    const q = searchParams.get("q");
    const page = Number(searchParams.get("page") ?? 1);
    const pageSize = Number(searchParams.get("pageSize") ?? 12);
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const supabase = createClient();
    let query = supabase
      .from("productos")
      .select("*", { count: "exact" })
      .eq("publicado", true)
      .order("fecha_publicacion", { ascending: false })
      .range(from, to);

    if (tipo) query = query.eq("tipo", tipo);
    if (linea) query = query.eq("linea_tematica_id", linea);
    if (q) query = query.ilike("titulo", `%${q}%`);

    const { data, error, count } = await query;
    if (error) throw error;
    return NextResponse.json({ data, total: count ?? 0 });
  } catch {
    return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 });
  }
}
