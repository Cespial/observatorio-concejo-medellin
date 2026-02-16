import { readFileSync } from "fs";
import { resolve } from "path";
import { supabaseAdmin, log } from "../config";
import { getLineaTematicaId, getComisionId } from "../utils";

type CsvRow = {
  numero_radicado: string;
  titulo: string;
  tipo: string;
  estado: string;
  fecha_radicacion: string;
  comision: string;
  linea_tematica: string;
  autores: string;
  tags: string;
};

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      fields.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  fields.push(current.trim());
  return fields;
}

function parseCsv(content: string): CsvRow[] {
  const lines = content.split("\n").filter((l) => l.trim());
  const headers = parseCsvLine(lines[0]);
  const rows: CsvRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const fields = parseCsvLine(lines[i]);
    if (fields.length < headers.length) continue;

    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = fields[idx] ?? "";
    });
    rows.push(row as unknown as CsvRow);
  }

  return rows;
}

export async function seedIniciativasFromCsv(): Promise<number> {
  const csvPath = resolve(__dirname, "../../../data/iniciativas-2024-2025.csv");
  const content = readFileSync(csvPath, "utf-8");
  const rows = parseCsv(content);

  log("info", `Parsed ${rows.length} initiatives from CSV`);

  // Pre-fetch author name → id mapping
  const { data: autoresDb } = await supabaseAdmin
    .from("autores_iniciativa")
    .select("id, nombre");
  const autorMap = new Map<string, string>();
  for (const a of autoresDb ?? []) {
    autorMap.set(a.nombre, a.id);
  }

  let inserted = 0;

  for (const row of rows) {
    // Resolve comision
    const comisionId = await getComisionId(row.comision);

    // Resolve linea tematica
    const lineaId = await getLineaTematicaId(row.linea_tematica);

    // Parse tags
    const tags = row.tags.split(";").map((t) => t.trim()).filter(Boolean);

    // Upsert initiative
    const { data: ini, error: iniError } = await supabaseAdmin
      .from("iniciativas")
      .upsert(
        {
          numero_radicado: row.numero_radicado,
          titulo: row.titulo,
          descripcion: "",
          tipo: row.tipo,
          estado: row.estado,
          fecha_radicacion: row.fecha_radicacion,
          comision_id: comisionId,
          linea_tematica_id: lineaId,
          tags,
          trazabilidad: [],
        },
        { onConflict: "numero_radicado" }
      )
      .select("id")
      .single();

    if (iniError || !ini) {
      log("error", `Failed to upsert initiative: ${row.numero_radicado}`, iniError?.message);
      continue;
    }

    // Link authors
    const autorNames = row.autores.split(";").map((a) => a.trim()).filter(Boolean);
    for (const autorName of autorNames) {
      const autorId = autorMap.get(autorName);
      if (!autorId) {
        log("warn", `Author not found in DB: "${autorName}"`);
        continue;
      }
      await supabaseAdmin
        .from("iniciativas_autores")
        .upsert(
          { iniciativa_id: ini.id, autor_id: autorId, rol: "autor" },
          { onConflict: "iniciativa_id,autor_id" }
        );
    }

    inserted++;
  }

  return inserted;
}
