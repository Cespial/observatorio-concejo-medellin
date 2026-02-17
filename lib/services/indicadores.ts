import { createClient } from "@/lib/supabase/server";
import { getMockDataBySlug } from "@/lib/mock-data";
import type {
  KpiMock,
  TimeSeriesRow,
  ComunaComparison,
  ThematicMockData,
} from "@/lib/mock-data/types";

// Use explicit result types to avoid Supabase generic inference issues
type DbRow = Record<string, unknown>;

// ── KPIs for a thematic line ─────────────────────────────────

export async function getKPIsByLinea(lineaSlug: string): Promise<KpiMock[]> {
  try {
    const supabase = createClient();

    const { data: lineaRaw } = await (supabase
      .from("lineas_tematicas")
      .select("id")
      .eq("slug", lineaSlug)
      .single() as unknown as Promise<{ data: DbRow | null }>);

    if (!lineaRaw) return getMockDataBySlug(lineaSlug)?.kpis ?? [];

    const { data: indicadoresRaw } = await (supabase
      .from("indicadores")
      .select("id, nombre, slug, unidad_medida, ultimo_valor, variacion_porcentual, tendencia")
      .eq("linea_tematica_id", lineaRaw.id as string)
      .eq("activo", true)
      .order("nombre") as unknown as Promise<{ data: DbRow[] | null }>);

    if (!indicadoresRaw?.length) return getMockDataBySlug(lineaSlug)?.kpis ?? [];

    // Get MDE territory once
    const { data: mdeRaw } = await (supabase
      .from("territorios")
      .select("id")
      .eq("codigo", "MDE")
      .single() as unknown as Promise<{ data: DbRow | null }>);

    const kpis: KpiMock[] = [];
    for (const ind of indicadoresRaw) {
      let sparklineData: number[] = [];
      if (mdeRaw) {
        const { data: seriesRaw } = await (supabase
          .from("datos_indicador")
          .select("valor, periodo")
          .eq("indicador_id", ind.id as string)
          .eq("territorio_id", mdeRaw.id as string)
          .order("periodo", { ascending: true }) as unknown as Promise<{ data: DbRow[] | null }>);

        sparklineData = (seriesRaw ?? []).map((s) => Number(s.valor));
      }

      kpis.push({
        id: String(ind.slug),
        title: String(ind.nombre),
        value: Number(ind.ultimo_valor ?? 0),
        unit: String(ind.unidad_medida),
        change: Number(ind.variacion_porcentual ?? 0),
        positiveIsGood: String(ind.unidad_medida) === "%" ? true : false,
        sparklineData:
          sparklineData.length > 0
            ? sparklineData
            : [Number(ind.ultimo_valor ?? 0)],
      });
    }

    return kpis;
  } catch {
    return getMockDataBySlug(lineaSlug)?.kpis ?? [];
  }
}

// ── Time series for a thematic line ──────────────────────────

export async function getTimeSeriesByLinea(
  lineaSlug: string
): Promise<{ timeSeries: TimeSeriesRow[]; timeSeriesKeys: { key: string; name: string; color?: string }[] }> {
  const fallback = () => {
    const mock = getMockDataBySlug(lineaSlug);
    return { timeSeries: mock?.timeSeries ?? [], timeSeriesKeys: mock?.timeSeriesKeys ?? [] };
  };

  try {
    const supabase = createClient();

    const { data: lineaRaw } = await (supabase
      .from("lineas_tematicas")
      .select("id")
      .eq("slug", lineaSlug)
      .single() as unknown as Promise<{ data: DbRow | null }>);

    if (!lineaRaw) return fallback();

    const { data: indicadoresRaw } = await (supabase
      .from("indicadores")
      .select("id, nombre, slug")
      .eq("linea_tematica_id", lineaRaw.id as string)
      .eq("activo", true)
      .order("nombre")
      .limit(4) as unknown as Promise<{ data: DbRow[] | null }>);

    if (!indicadoresRaw?.length) return fallback();

    const { data: mdeRaw } = await (supabase
      .from("territorios")
      .select("id")
      .eq("codigo", "MDE")
      .single() as unknown as Promise<{ data: DbRow | null }>);

    if (!mdeRaw) return fallback();

    const colors = ["#DC2626", "#F97316", "#2563EB", "#16A34A"];
    const timeSeriesKeys = indicadoresRaw.map((ind, i) => ({
      key: String(ind.slug),
      name: String(ind.nombre),
      color: colors[i % colors.length],
    }));

    const yearMap = new Map<number, Record<string, number>>();

    for (const ind of indicadoresRaw) {
      const { data: seriesRaw } = await (supabase
        .from("datos_indicador")
        .select("valor, periodo")
        .eq("indicador_id", ind.id as string)
        .eq("territorio_id", mdeRaw.id as string)
        .order("periodo", { ascending: true }) as unknown as Promise<{ data: DbRow[] | null }>);

      for (const row of seriesRaw ?? []) {
        const year = Number(row.periodo);
        if (!yearMap.has(year)) yearMap.set(year, {});
        yearMap.get(year)![String(ind.slug)] = Number(row.valor);
      }
    }

    const timeSeries: TimeSeriesRow[] = Array.from(yearMap.entries())
      .sort(([a], [b]) => a - b)
      .map(([year, vals]) => ({ year, ...vals }));

    return { timeSeries, timeSeriesKeys };
  } catch {
    return fallback();
  }
}

// ── Territorial comparison ───────────────────────────────────

export async function getTerritorialComparison(
  lineaSlug: string
): Promise<ComunaComparison[]> {
  try {
    const supabase = createClient();

    const { data: lineaRaw } = await (supabase
      .from("lineas_tematicas")
      .select("id")
      .eq("slug", lineaSlug)
      .single() as unknown as Promise<{ data: DbRow | null }>);

    if (!lineaRaw) return getMockDataBySlug(lineaSlug)?.comunaComparison ?? [];

    const { data: indicadoresRaw } = await (supabase
      .from("indicadores")
      .select("id")
      .eq("linea_tematica_id", lineaRaw.id as string)
      .eq("activo", true)
      .order("nombre")
      .limit(1) as unknown as Promise<{ data: DbRow[] | null }>);

    if (!indicadoresRaw?.length) return getMockDataBySlug(lineaSlug)?.comunaComparison ?? [];

    const indicadorId = indicadoresRaw[0].id as string;

    const { data: latestRaw } = await (supabase
      .from("datos_indicador")
      .select("periodo")
      .eq("indicador_id", indicadorId)
      .order("periodo", { ascending: false })
      .limit(1) as unknown as Promise<{ data: DbRow[] | null }>);

    const latestPeriodo = latestRaw?.[0]?.periodo as string | undefined;
    if (!latestPeriodo) return getMockDataBySlug(lineaSlug)?.comunaComparison ?? [];

    const { data: comunasRaw } = await (supabase
      .from("territorios")
      .select("id, nombre, codigo, poblacion")
      .eq("tipo", "comuna")
      .order("codigo") as unknown as Promise<{ data: DbRow[] | null }>);

    if (!comunasRaw?.length) return getMockDataBySlug(lineaSlug)?.comunaComparison ?? [];

    const comparison: ComunaComparison[] = [];
    for (const comuna of comunasRaw) {
      const { data: datoRaw } = await (supabase
        .from("datos_indicador")
        .select("valor")
        .eq("indicador_id", indicadorId)
        .eq("territorio_id", comuna.id as string)
        .eq("periodo", latestPeriodo)
        .maybeSingle() as unknown as Promise<{ data: DbRow | null }>);

      if (datoRaw) {
        comparison.push({
          nombre: String(comuna.nombre),
          codigo: String(comuna.codigo).replace("COM", ""),
          valor: Number(datoRaw.valor),
          poblacion: Number(comuna.poblacion ?? 0),
        });
      }
    }

    return comparison.length > 0
      ? comparison
      : getMockDataBySlug(lineaSlug)?.comunaComparison ?? [];
  } catch {
    return getMockDataBySlug(lineaSlug)?.comunaComparison ?? [];
  }
}

// ── Area Breakdown (stacked by indicator per year) ──────────

export async function getAreaBreakdown(
  lineaSlug: string
): Promise<{ areaBreakdown: TimeSeriesRow[]; areaBreakdownKeys: { key: string; name: string; color?: string }[] }> {
  const fallback = () => {
    const mock = getMockDataBySlug(lineaSlug);
    return { areaBreakdown: mock?.areaBreakdown ?? [], areaBreakdownKeys: mock?.areaBreakdownKeys ?? [] };
  };

  try {
    const supabase = createClient();

    const { data: lineaRaw } = await (supabase
      .from("lineas_tematicas")
      .select("id")
      .eq("slug", lineaSlug)
      .single() as unknown as Promise<{ data: DbRow | null }>);

    if (!lineaRaw) return fallback();

    const { data: indicadoresRaw } = await (supabase
      .from("indicadores")
      .select("id, nombre, slug")
      .eq("linea_tematica_id", lineaRaw.id as string)
      .eq("activo", true)
      .order("nombre")
      .limit(6) as unknown as Promise<{ data: DbRow[] | null }>);

    if (!indicadoresRaw?.length) return fallback();

    const { data: mdeRaw } = await (supabase
      .from("territorios")
      .select("id")
      .eq("codigo", "MDE")
      .single() as unknown as Promise<{ data: DbRow | null }>);

    if (!mdeRaw) return fallback();

    const colors = ["#DC2626", "#F97316", "#A855F7", "#EAB308", "#06B6D4", "#16A34A"];
    const areaBreakdownKeys = indicadoresRaw.map((ind, i) => ({
      key: String(ind.slug),
      name: String(ind.nombre),
      color: colors[i % colors.length],
    }));

    const yearMap = new Map<number, Record<string, number>>();

    for (const ind of indicadoresRaw) {
      const { data: seriesRaw } = await (supabase
        .from("datos_indicador")
        .select("valor, periodo")
        .eq("indicador_id", ind.id as string)
        .eq("territorio_id", mdeRaw.id as string)
        .order("periodo", { ascending: true }) as unknown as Promise<{ data: DbRow[] | null }>);

      for (const row of seriesRaw ?? []) {
        const year = Number(row.periodo);
        if (!yearMap.has(year)) yearMap.set(year, {});
        yearMap.get(year)![String(ind.slug)] = Number(row.valor);
      }
    }

    const areaBreakdown: TimeSeriesRow[] = Array.from(yearMap.entries())
      .sort(([a], [b]) => a - b)
      .map(([year, vals]) => ({ year, ...vals }));

    return {
      areaBreakdown: areaBreakdown.length > 0 ? areaBreakdown : fallback().areaBreakdown,
      areaBreakdownKeys: areaBreakdown.length > 0 ? areaBreakdownKeys : fallback().areaBreakdownKeys,
    };
  } catch {
    return fallback();
  }
}

// ── Related Initiatives ─────────────────────────────────────

export async function getRelatedInitiatives(lineaSlug: string) {
  try {
    const supabase = createClient();

    const { data: lineaRaw } = await (supabase
      .from("lineas_tematicas")
      .select("id")
      .eq("slug", lineaSlug)
      .single() as unknown as Promise<{ data: DbRow | null }>);

    if (!lineaRaw) return getMockDataBySlug(lineaSlug)?.relatedInitiatives ?? [];

    const { data: iniciativasRaw } = await (supabase
      .from("iniciativas")
      .select("id, titulo, tipo, estado, fecha_radicacion")
      .eq("linea_tematica_id", lineaRaw.id as string)
      .order("fecha_radicacion", { ascending: false })
      .limit(5) as unknown as Promise<{ data: DbRow[] | null }>);

    if (!iniciativasRaw?.length) return getMockDataBySlug(lineaSlug)?.relatedInitiatives ?? [];

    return iniciativasRaw.map((ini) => ({
      id: String(ini.id),
      titulo: String(ini.titulo),
      tipo: String(ini.tipo),
      estado: String(ini.estado),
      fecha: String(ini.fecha_radicacion),
    }));
  } catch {
    return getMockDataBySlug(lineaSlug)?.relatedInitiatives ?? [];
  }
}

// ── Full thematic data ───────────────────────────────────────

export async function getThematicData(lineaSlug: string): Promise<ThematicMockData | undefined> {
  const mock = getMockDataBySlug(lineaSlug);
  if (!mock) return undefined;

  const [
    kpis,
    { timeSeries, timeSeriesKeys },
    comunaComparison,
    { areaBreakdown, areaBreakdownKeys },
    relatedInitiatives,
  ] = await Promise.all([
    getKPIsByLinea(lineaSlug),
    getTimeSeriesByLinea(lineaSlug),
    getTerritorialComparison(lineaSlug),
    getAreaBreakdown(lineaSlug),
    getRelatedInitiatives(lineaSlug),
  ]);

  return {
    ...mock,
    kpis: kpis.length > 0 ? kpis : mock.kpis,
    timeSeries: timeSeries.length > 0 ? timeSeries : mock.timeSeries,
    timeSeriesKeys: timeSeriesKeys.length > 0 ? timeSeriesKeys : mock.timeSeriesKeys,
    comunaComparison: comunaComparison.length > 0 ? comunaComparison : mock.comunaComparison,
    areaBreakdown: areaBreakdown.length > 0 ? areaBreakdown : mock.areaBreakdown,
    areaBreakdownKeys: areaBreakdownKeys.length > 0 ? areaBreakdownKeys : mock.areaBreakdownKeys,
    relatedInitiatives: relatedInitiatives.length > 0 ? relatedInitiatives : mock.relatedInitiatives,
  };
}
