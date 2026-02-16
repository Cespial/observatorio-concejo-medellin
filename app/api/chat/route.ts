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
          "Eres el asistente del Observatorio Distrital del Concejo de Medellin. " +
          "Ayudas a ciudadanos, concejales y analistas a entender indicadores, " +
          "datos socioeconomicos e iniciativas legislativas de Medellin. " +
          "Responde siempre en espanol colombiano, de forma clara y concisa.",
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
