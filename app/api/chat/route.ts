import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

async function buildSystemPrompt(): Promise<string> {
  const base =
    "Eres el asistente inteligente del Observatorio Distrital del Concejo de Medellin. " +
    "Tienes acceso a datos de 6 lineas tematicas: Seguridad y Convivencia, Educacion y Cultura, " +
    "Economia y Empleo, Movilidad y Transporte, Medio Ambiente, y Salud Publica. " +
    "Los datos cubren 16 comunas y 5 corregimientos de Medellin, con series historicas desde 2015. ";

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return base + "Responde siempre en espanol colombiano, de forma clara, precisa y basada en datos.";
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch latest indicator values
    const { data: indicadores } = await supabase
      .from("indicadores")
      .select("nombre, slug, unidad_medida, ultimo_valor, variacion_porcentual, tendencia")
      .eq("activo", true)
      .not("ultimo_valor", "is", null)
      .order("nombre");

    // Fetch counts
    const [{ count: indicatorCount }, { count: dataCount }, { count: iniciativaCount }] = await Promise.all([
      supabase.from("indicadores").select("id", { count: "exact", head: true }).eq("activo", true),
      supabase.from("datos_indicador").select("id", { count: "exact", head: true }),
      supabase.from("iniciativas").select("id", { count: "exact", head: true }),
    ]);

    let dynamicContext = `\nDatos actuales del observatorio (${indicatorCount ?? 0} indicadores activos, ${dataCount ?? 0} puntos de datos, ${iniciativaCount ?? 0} iniciativas legislativas):\n`;

    if (indicadores?.length) {
      for (const ind of indicadores) {
        const trend = ind.tendencia === "alza" ? "alza" : ind.tendencia === "baja" ? "baja" : "estable";
        const change = ind.variacion_porcentual != null
          ? ` (variacion: ${ind.variacion_porcentual > 0 ? "+" : ""}${ind.variacion_porcentual}%)`
          : "";
        dynamicContext += `- ${ind.nombre}: ${ind.ultimo_valor} ${ind.unidad_medida} [tendencia: ${trend}]${change}\n`;
      }
    }

    return (
      base +
      dynamicContext +
      "\nResponde siempre en espanol colombiano, de forma clara, precisa y basada en datos. " +
      "Cuando cites cifras, menciona la fuente o periodo. Si no tienes datos especificos, indicalo."
    );
  } catch {
    return base + "Responde siempre en espanol colombiano, de forma clara, precisa y basada en datos.";
  }
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    const apiKey = process.env.CLAUDE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const systemPrompt = await buildSystemPrompt();

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 1024,
        system: systemPrompt,
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || "Claude API error" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
