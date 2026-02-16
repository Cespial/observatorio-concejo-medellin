import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .eq("slug", params.slug)
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
  }
}
