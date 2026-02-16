import { NextResponse } from "next/server";
import { getTerritorioByCode, getTerritorioIndicadores } from "@/lib/supabase/queries";

export async function GET(
  _request: Request,
  { params }: { params: { codigo: string } }
) {
  try {
    const territorio = await getTerritorioByCode(params.codigo);
    const indicadores = await getTerritorioIndicadores(territorio.id);
    return NextResponse.json({ territorio, indicadores });
  } catch {
    return NextResponse.json({ error: "Territorio no encontrado" }, { status: 404 });
  }
}
