import { NextResponse } from "next/server";
import { getTerritorios } from "@/lib/supabase/queries";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tipo = searchParams.get("tipo") ?? undefined;
    const data = await getTerritorios(tipo);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Error al obtener territorios" }, { status: 500 });
  }
}
