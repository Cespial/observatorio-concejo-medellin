import { NextResponse } from "next/server";
import { getIniciativas } from "@/lib/supabase/queries";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await getIniciativas({
      tipo: searchParams.get("tipo") ?? undefined,
      estado: searchParams.get("estado") ?? undefined,
      lineaTematicaId: searchParams.get("linea") ?? undefined,
      search: searchParams.get("q") ?? undefined,
      page: Number(searchParams.get("page") ?? 1),
      pageSize: Number(searchParams.get("pageSize") ?? 20),
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Error al obtener iniciativas" }, { status: 500 });
  }
}
