import { NextRequest, NextResponse } from "next/server";

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
        system:
          "Eres el asistente inteligente del Observatorio Distrital del Concejo de Medellín. " +
          "Tienes acceso a datos de 6 líneas temáticas: Seguridad y Convivencia, Educación y Cultura, " +
          "Economía y Empleo, Movilidad y Transporte, Medio Ambiente, y Salud Pública. " +
          "Los datos cubren 16 comunas y 5 corregimientos de Medellín, con series históricas desde 2015. " +
          "Indicadores clave incluyen: tasa de homicidios (16.8/100k), cobertura educativa (96.8%), " +
          "desempleo (10.2%), PM2.5 (28µg/m³), pasajeros de transporte público (892k/día), " +
          "mortalidad infantil (7.2/1k nacidos vivos). " +
          "Responde siempre en español colombiano, de forma clara, precisa y basada en datos. " +
          "Cuando cites cifras, menciona la fuente o período. Si no tienes datos específicos, indícalo.",
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
