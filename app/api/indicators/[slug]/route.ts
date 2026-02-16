import { NextResponse } from "next/server";
import { getIndicadorBySlug, getIndicadorTimeSeries } from "@/lib/supabase/queries";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const indicador = await getIndicadorBySlug(params.slug);
    const timeSeries = await getIndicadorTimeSeries(indicador.id);
    return NextResponse.json({ indicador, timeSeries });
  } catch {
    return NextResponse.json({ error: "Indicador no encontrado" }, { status: 404 });
  }
}
