import { NextResponse } from "next/server";
import { getLineaTematicaBySlug, getIndicadoresByLinea } from "@/lib/supabase/queries";

export async function GET(
  _request: Request,
  { params }: { params: { lineaSlug: string } }
) {
  try {
    const linea = await getLineaTematicaBySlug(params.lineaSlug);
    const indicadores = await getIndicadoresByLinea(linea.id);
    return NextResponse.json({ linea, indicadores });
  } catch {
    return NextResponse.json({ error: "Línea temática no encontrada" }, { status: 404 });
  }
}
