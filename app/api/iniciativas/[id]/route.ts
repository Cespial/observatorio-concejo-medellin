import { NextResponse } from "next/server";
import { getIniciativaById } from "@/lib/supabase/queries";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const iniciativa = await getIniciativaById(params.id);
    return NextResponse.json(iniciativa);
  } catch {
    return NextResponse.json({ error: "Iniciativa no encontrada" }, { status: 404 });
  }
}
