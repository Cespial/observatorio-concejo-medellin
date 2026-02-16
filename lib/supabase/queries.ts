import { createClient } from "./server";
import type { Database } from "@/lib/types/database";

type Tables = Database["public"]["Tables"];
type LineaTematicaRow = Tables["lineas_tematicas"]["Row"];
type IndicadorRow = Tables["indicadores"]["Row"];
type DatoIndicadorRow = Tables["datos_indicador"]["Row"];
type IniciativaRow = Tables["iniciativas"]["Row"];
type TerritorioRow = Tables["territorios"]["Row"];

// ── Thematic Lines ──────────────────────────────────────────
export async function getLineasTematicas(): Promise<LineaTematicaRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lineas_tematicas")
    .select("*")
    .eq("activa", true)
    .order("orden");
  if (error) throw error;
  return data ?? [];
}

export async function getLineaTematicaBySlug(slug: string): Promise<LineaTematicaRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lineas_tematicas")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) throw error;
  return data as LineaTematicaRow;
}

// ── Indicators ──────────────────────────────────────────────
export async function getIndicadoresByLinea(lineaTematicaId: string): Promise<IndicadorRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("indicadores")
    .select("*")
    .eq("linea_tematica_id", lineaTematicaId)
    .eq("activo", true)
    .order("nombre");
  if (error) throw error;
  return data ?? [];
}

export async function getIndicadorBySlug(slug: string): Promise<IndicadorRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("indicadores")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) throw error;
  return data as IndicadorRow;
}

export async function getIndicadorTimeSeries(
  indicadorId: string,
  territorioId?: string,
  limit = 100
): Promise<DatoIndicadorRow[]> {
  const supabase = createClient();
  let query = supabase
    .from("datos_indicador")
    .select("*")
    .eq("indicador_id", indicadorId)
    .order("periodo", { ascending: true })
    .limit(limit);

  if (territorioId) {
    query = query.eq("territorio_id", territorioId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

// ── Initiatives ─────────────────────────────────────────────
export async function getIniciativas(params?: {
  tipo?: string;
  estado?: string;
  lineaTematicaId?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<{ data: IniciativaRow[]; total: number }> {
  const supabase = createClient();
  const page = params?.page ?? 1;
  const pageSize = params?.pageSize ?? 20;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("iniciativas")
    .select("*", { count: "exact" })
    .order("fecha_radicacion", { ascending: false })
    .range(from, to);

  if (params?.tipo) query = query.eq("tipo", params.tipo);
  if (params?.estado) query = query.eq("estado", params.estado);
  if (params?.lineaTematicaId) query = query.eq("linea_tematica_id", params.lineaTematicaId);
  if (params?.search) query = query.ilike("titulo", `%${params.search}%`);

  const { data, error, count } = await query;
  if (error) throw error;
  return { data: (data ?? []) as IniciativaRow[], total: count ?? 0 };
}

export async function getIniciativaById(id: string): Promise<IniciativaRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("iniciativas")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as IniciativaRow;
}

// ── Territories ─────────────────────────────────────────────
export async function getTerritorios(tipo?: string): Promise<TerritorioRow[]> {
  const supabase = createClient();
  let query = supabase
    .from("territorios")
    .select("*")
    .order("codigo");

  if (tipo) query = query.eq("tipo", tipo);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getTerritorioByCode(codigo: string): Promise<TerritorioRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("territorios")
    .select("*")
    .eq("codigo", codigo)
    .single();
  if (error) throw error;
  return data as TerritorioRow;
}

export async function getTerritorioIndicadores(
  territorioId: string,
  limit = 100
): Promise<DatoIndicadorRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("datos_indicador")
    .select("*")
    .eq("territorio_id", territorioId)
    .order("periodo", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as DatoIndicadorRow[];
}

// ── Indicator Data by Linea Slug ─────────────────────────────

type DbRow = Record<string, unknown>;

export async function getIndicadoresByLineaSlug(lineaSlug: string) {
  const supabase = createClient();

  const { data: linea } = await (supabase
    .from("lineas_tematicas")
    .select("id")
    .eq("slug", lineaSlug)
    .single() as unknown as Promise<{ data: DbRow | null }>);

  if (!linea) return [];

  const { data, error } = await (supabase
    .from("indicadores")
    .select("*, datos_indicador(valor, periodo, territorio_id)")
    .eq("linea_tematica_id", linea.id as string)
    .eq("activo", true)
    .order("nombre") as unknown as Promise<{ data: DbRow[] | null; error: unknown }>);

  if (error) throw error;
  return data ?? [];
}

// ── Latest values per indicator ──────────────────────────────

export async function getLatestValues(indicadorId: string) {
  const supabase = createClient();

  const { data: latest } = await (supabase
    .from("datos_indicador")
    .select("periodo")
    .eq("indicador_id", indicadorId)
    .order("periodo", { ascending: false })
    .limit(1) as unknown as Promise<{ data: DbRow[] | null }>);

  if (!latest?.length) return [];

  const { data, error } = await (supabase
    .from("datos_indicador")
    .select("*, territorios(nombre, codigo, tipo)")
    .eq("indicador_id", indicadorId)
    .eq("periodo", String(latest[0].periodo)) as unknown as Promise<{ data: DbRow[] | null; error: unknown }>);

  if (error) throw error;
  return data ?? [];
}

// ── Autores ──────────────────────────────────────────────────

export async function getAutoresIniciativa() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("autores_iniciativa")
    .select("*")
    .eq("activo", true)
    .order("nombre");
  if (error) throw error;
  return data ?? [];
}

// ── Data counts (for validation / landing page) ──────────────

export async function getDataCounts() {
  const supabase = createClient();

  const [indicadores, datos, iniciativas, territorios] = await Promise.all([
    supabase.from("indicadores").select("id", { count: "exact", head: true }).eq("activo", true),
    supabase.from("datos_indicador").select("id", { count: "exact", head: true }),
    supabase.from("iniciativas").select("id", { count: "exact", head: true }),
    supabase.from("territorios").select("id", { count: "exact", head: true }),
  ]);

  return {
    indicadores: indicadores.count ?? 0,
    datos: datos.count ?? 0,
    iniciativas: iniciativas.count ?? 0,
    territorios: territorios.count ?? 0,
  };
}
