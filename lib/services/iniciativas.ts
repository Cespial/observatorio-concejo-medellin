import { createClient } from "@/lib/supabase/server";
import { MOCK_INICIATIVAS, type InitiativeMock } from "@/lib/mock-data/iniciativas";
import { MOCK_AUTORES, type AutorMock } from "@/lib/mock-data/autores";

type DbRow = Record<string, unknown>;

export async function getIniciativasFromDb(): Promise<{
  iniciativas: InitiativeMock[];
  autores: AutorMock[];
}> {
  try {
    const supabase = createClient();

    const { data: dbIniciativasRaw } = await (supabase
      .from("iniciativas")
      .select("id, numero_radicado, titulo, descripcion, tipo, estado, fecha_radicacion, comision_id, linea_tematica_id, tags, trazabilidad, documento_url")
      .order("fecha_radicacion", { ascending: false }) as unknown as Promise<{ data: DbRow[] | null }>);

    if (!dbIniciativasRaw?.length) {
      return { iniciativas: MOCK_INICIATIVAS, autores: MOCK_AUTORES };
    }

    const { data: dbAutoresRaw } = await (supabase
      .from("autores_iniciativa")
      .select("id, nombre, partido, cargo, foto_url")
      .eq("activo", true) as unknown as Promise<{ data: DbRow[] | null }>);

    const { data: dbRelacionesRaw } = await (supabase
      .from("iniciativas_autores")
      .select("iniciativa_id, autor_id") as unknown as Promise<{ data: DbRow[] | null }>);

    const { data: comisionesRaw } = await (supabase
      .from("comisiones")
      .select("id, nombre") as unknown as Promise<{ data: DbRow[] | null }>);

    const { data: lineasRaw } = await (supabase
      .from("lineas_tematicas")
      .select("id, slug") as unknown as Promise<{ data: DbRow[] | null }>);

    const comisionMap = new Map((comisionesRaw ?? []).map((c) => [String(c.id), String(c.nombre)]));
    const lineaMap = new Map((lineasRaw ?? []).map((l) => [String(l.id), String(l.slug)]));

    const iniAutores = new Map<string, string[]>();
    for (const rel of dbRelacionesRaw ?? []) {
      const iniId = String(rel.iniciativa_id);
      if (!iniAutores.has(iniId)) iniAutores.set(iniId, []);
      iniAutores.get(iniId)!.push(String(rel.autor_id));
    }

    const iniciativas: InitiativeMock[] = dbIniciativasRaw.map((ini) => ({
      id: String(ini.id),
      numero_radicado: String(ini.numero_radicado),
      titulo: String(ini.titulo),
      descripcion: String(ini.descripcion ?? ""),
      tipo: String(ini.tipo) as InitiativeMock["tipo"],
      estado: String(ini.estado) as InitiativeMock["estado"],
      fecha_radicacion: String(ini.fecha_radicacion),
      comision: comisionMap.get(String(ini.comision_id ?? "")) ?? "Sin comision",
      linea_tematica: lineaMap.get(String(ini.linea_tematica_id ?? "")) ?? "",
      tags: (ini.tags as string[]) ?? [],
      autores_ids: iniAutores.get(String(ini.id)) ?? [],
      trazabilidad: (ini.trazabilidad as unknown as InitiativeMock["trazabilidad"]) ?? [],
      documento_url: ini.documento_url as string | null,
    }));

    const autores: AutorMock[] = (dbAutoresRaw ?? []).map((a) => ({
      id: String(a.id),
      nombre: String(a.nombre),
      partido: String(a.partido ?? ""),
      cargo: String(a.cargo ?? "Concejal"),
      foto_url: a.foto_url as string | null,
      email: "",
      iniciativas_count: 0,
    }));

    return {
      iniciativas: iniciativas.length > 0 ? iniciativas : MOCK_INICIATIVAS,
      autores: autores.length > 0 ? autores : MOCK_AUTORES,
    };
  } catch {
    return { iniciativas: MOCK_INICIATIVAS, autores: MOCK_AUTORES };
  }
}

export async function getIniciativaById(id: string): Promise<{
  iniciativa: InitiativeMock | null;
  autores: AutorMock[];
}> {
  try {
    const supabase = createClient();

    const { data: iniRaw } = await (supabase
      .from("iniciativas")
      .select("id, numero_radicado, titulo, descripcion, tipo, estado, fecha_radicacion, comision_id, linea_tematica_id, tags, trazabilidad, documento_url")
      .eq("id", id)
      .single() as unknown as Promise<{ data: DbRow | null }>);

    if (!iniRaw) {
      // Try mock data as fallback
      const mockIni = MOCK_INICIATIVAS.find((i) => i.id === id);
      return { iniciativa: mockIni ?? null, autores: MOCK_AUTORES };
    }

    const { data: comisionesRaw } = await (supabase
      .from("comisiones")
      .select("id, nombre") as unknown as Promise<{ data: DbRow[] | null }>);

    const { data: lineasRaw } = await (supabase
      .from("lineas_tematicas")
      .select("id, slug") as unknown as Promise<{ data: DbRow[] | null }>);

    const comisionMap = new Map((comisionesRaw ?? []).map((c) => [String(c.id), String(c.nombre)]));
    const lineaMap = new Map((lineasRaw ?? []).map((l) => [String(l.id), String(l.slug)]));

    const { data: relacionesRaw } = await (supabase
      .from("iniciativas_autores")
      .select("autor_id")
      .eq("iniciativa_id", id) as unknown as Promise<{ data: DbRow[] | null }>);

    const autoresIds = (relacionesRaw ?? []).map((r) => String(r.autor_id));

    const { data: dbAutoresRaw } = await (supabase
      .from("autores_iniciativa")
      .select("id, nombre, partido, cargo, foto_url")
      .eq("activo", true) as unknown as Promise<{ data: DbRow[] | null }>);

    const iniciativa: InitiativeMock = {
      id: String(iniRaw.id),
      numero_radicado: String(iniRaw.numero_radicado),
      titulo: String(iniRaw.titulo),
      descripcion: String(iniRaw.descripcion ?? ""),
      tipo: String(iniRaw.tipo) as InitiativeMock["tipo"],
      estado: String(iniRaw.estado) as InitiativeMock["estado"],
      fecha_radicacion: String(iniRaw.fecha_radicacion),
      comision: comisionMap.get(String(iniRaw.comision_id ?? "")) ?? "Sin comision",
      linea_tematica: lineaMap.get(String(iniRaw.linea_tematica_id ?? "")) ?? "",
      tags: (iniRaw.tags as string[]) ?? [],
      autores_ids: autoresIds,
      trazabilidad: (iniRaw.trazabilidad as unknown as InitiativeMock["trazabilidad"]) ?? [],
      documento_url: iniRaw.documento_url as string | null,
    };

    const autores: AutorMock[] = (dbAutoresRaw ?? []).map((a) => ({
      id: String(a.id),
      nombre: String(a.nombre),
      partido: String(a.partido ?? ""),
      cargo: String(a.cargo ?? "Concejal"),
      foto_url: a.foto_url as string | null,
      email: "",
      iniciativas_count: 0,
    }));

    return { iniciativa, autores: autores.length > 0 ? autores : MOCK_AUTORES };
  } catch {
    const mockIni = MOCK_INICIATIVAS.find((i) => i.id === id);
    return { iniciativa: mockIni ?? null, autores: MOCK_AUTORES };
  }
}

export async function getRecentIniciativas(limit = 4) {
  try {
    const supabase = createClient();

    const { data: dataRaw } = await (supabase
      .from("iniciativas")
      .select("id, numero_radicado, titulo, tipo, estado, fecha_radicacion, linea_tematica_id")
      .order("fecha_radicacion", { ascending: false })
      .limit(limit) as unknown as Promise<{ data: DbRow[] | null }>);

    if (!dataRaw?.length) return null;

    const { data: lineasRaw } = await (supabase
      .from("lineas_tematicas")
      .select("id, nombre") as unknown as Promise<{ data: DbRow[] | null }>);

    const lineaMap = new Map((lineasRaw ?? []).map((l) => [String(l.id), String(l.nombre)]));

    return dataRaw.map((ini) => ({
      id: String(ini.id),
      radicado: String(ini.numero_radicado),
      titulo: String(ini.titulo),
      tipo: String(ini.tipo),
      estado: String(ini.estado),
      fecha: String(ini.fecha_radicacion),
      linea: lineaMap.get(String(ini.linea_tematica_id ?? "")) ?? "",
    }));
  } catch {
    return null;
  }
}
