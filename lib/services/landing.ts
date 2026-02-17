import { createClient } from "@/lib/supabase/server";
import type { ChoroplethDatum } from "@/lib/types/chart";

type DbRow = Record<string, unknown>;

type TickerItem = {
  label: string;
  value: number;
  change: number;
  unit?: string;
};

type LineData = {
  mainKpi: { label: string; value: number; unit: string; change: number; positiveIsGood: boolean };
  sparkline: number[];
  count: number;
};

type LandingPageData = {
  tickerItems: TickerItem[] | undefined;
  dashboardCards: Record<string, LineData> | undefined;
  choroplethData: Record<string, ChoroplethDatum[]> | undefined;
};

// Map indicator slugs to user-friendly labels
const TICKER_INDICATORS: { slug: string; label: string; unit?: string }[] = [
  { slug: "homicidios-absoluto", label: "Homicidios" },
  { slug: "tasa-desempleo", label: "Tasa desempleo", unit: "%" },
  { slug: "pm25-promedio", label: "Calidad aire PM2.5", unit: " \u00B5g/m\u00B3" },
  { slug: "pasajeros-metro", label: "Pasajeros Metro (M)" },
  { slug: "cobertura-neta-educativa", label: "Cobertura educativa", unit: "%" },
  { slug: "hurtos-personas", label: "Hurtos" },
  { slug: "cobertura-vacunacion", label: "Vacunacion", unit: "%" },
  { slug: "mortalidad-infantil", label: "Mortalidad infantil" },
];

// Map linea slugs to their "lead" indicator slug for the dashboard card
const LINE_LEAD_INDICATOR: Record<string, { slug: string; positiveIsGood: boolean }> = {
  seguridad: { slug: "tasa-homicidios", positiveIsGood: false },
  educacion: { slug: "cobertura-neta-educativa", positiveIsGood: true },
  economia: { slug: "tasa-desempleo", positiveIsGood: false },
  movilidad: { slug: "pasajeros-metro", positiveIsGood: true },
  ambiente: { slug: "pm25-promedio", positiveIsGood: false },
  salud: { slug: "cobertura-vacunacion", positiveIsGood: true },
};

export async function getLandingPageData(): Promise<LandingPageData> {
  try {
    const supabase = createClient();

    // Fetch all active indicators with their latest values
    const { data: indicadoresRaw } = await (supabase
      .from("indicadores")
      .select("id, nombre, slug, unidad_medida, ultimo_valor, variacion_porcentual, linea_tematica_id")
      .eq("activo", true) as unknown as Promise<{ data: DbRow[] | null }>);

    if (!indicadoresRaw?.length) {
      return { tickerItems: undefined, dashboardCards: undefined, choroplethData: undefined };
    }

    // Get lineas tematicas
    const { data: lineasRaw } = await (supabase
      .from("lineas_tematicas")
      .select("id, slug") as unknown as Promise<{ data: DbRow[] | null }>);

    const lineaIdToSlug = new Map(
      (lineasRaw ?? []).map((l) => [String(l.id), String(l.slug)])
    );

    // Build indicator map by slug
    const indicadorBySlug = new Map<string, DbRow>();
    for (const ind of indicadoresRaw) {
      indicadorBySlug.set(String(ind.slug), ind);
    }

    // ── Ticker Items ──────────────────────────────────────────
    const tickerItems: TickerItem[] = [];
    for (const cfg of TICKER_INDICATORS) {
      const ind = indicadorBySlug.get(cfg.slug);
      if (!ind || ind.ultimo_valor == null) continue;
      tickerItems.push({
        label: cfg.label,
        value: Number(ind.ultimo_valor),
        change: Number(ind.variacion_porcentual ?? 0),
        unit: cfg.unit,
      });
    }

    // ── Dashboard Cards ──────────────────────────────────────
    const dashboardCards: Record<string, LineData> = {};

    // Get MDE territory for sparkline data
    const { data: mdeRaw } = await (supabase
      .from("territorios")
      .select("id")
      .eq("codigo", "MDE")
      .single() as unknown as Promise<{ data: DbRow | null }>);

    for (const [lineaSlug, cfg] of Object.entries(LINE_LEAD_INDICATOR)) {
      const ind = indicadorBySlug.get(cfg.slug);
      if (!ind || ind.ultimo_valor == null) continue;

      // Count indicators in this line
      const lineaId = [...lineaIdToSlug.entries()].find(([, slug]) => slug === lineaSlug)?.[0];
      const lineIndicators = indicadoresRaw.filter(
        (i) => String(i.linea_tematica_id) === lineaId
      );

      // Get sparkline data
      let sparkline: number[] = [Number(ind.ultimo_valor)];
      if (mdeRaw) {
        const { data: seriesRaw } = await (supabase
          .from("datos_indicador")
          .select("valor")
          .eq("indicador_id", String(ind.id))
          .eq("territorio_id", String(mdeRaw.id))
          .order("periodo", { ascending: true })
          .limit(10) as unknown as Promise<{ data: DbRow[] | null }>);

        if (seriesRaw?.length) {
          sparkline = seriesRaw.map((s) => Number(s.valor));
        }
      }

      dashboardCards[lineaSlug] = {
        mainKpi: {
          label: String(ind.nombre),
          value: Number(ind.ultimo_valor),
          unit: String(ind.unidad_medida),
          change: Number(ind.variacion_porcentual ?? 0),
          positiveIsGood: cfg.positiveIsGood,
        },
        sparkline,
        count: lineIndicators.length,
      };
    }

    // ── Choropleth Data (per-comuna for city pulse) ──────────
    let choroplethData: Record<string, ChoroplethDatum[]> | undefined;

    // Get comunas
    const { data: comunasRaw } = await (supabase
      .from("territorios")
      .select("id, nombre, codigo")
      .eq("tipo", "comuna")
      .order("codigo") as unknown as Promise<{ data: DbRow[] | null }>);

    if (comunasRaw?.length) {
      const comunaIdToInfo = new Map(
        comunasRaw.map((c) => [String(c.id), { nombre: String(c.nombre), codigo: String(c.codigo) }])
      );
      const comunaIds = comunasRaw.map((c) => String(c.id));

      const slugMap: Record<string, string> = {
        "tasa-homicidios": "homicidios",
        "tasa-desempleo": "desempleo",
        "pm25-promedio": "pm25",
        "cobertura-neta-educativa": "cobertura_edu",
      };

      choroplethData = {};

      for (const [indSlug, mapKey] of Object.entries(slugMap)) {
        const ind = indicadorBySlug.get(indSlug);
        if (!ind) continue;

        // Get latest period for this indicator
        const { data: latestRaw } = await (supabase
          .from("datos_indicador")
          .select("periodo")
          .eq("indicador_id", String(ind.id))
          .order("periodo", { ascending: false })
          .limit(1) as unknown as Promise<{ data: DbRow[] | null }>);

        const latestPeriodo = latestRaw?.[0]?.periodo as string | undefined;
        if (!latestPeriodo) continue;

        // Get per-comuna values
        const { data: datosRaw } = await (supabase
          .from("datos_indicador")
          .select("territorio_id, valor")
          .eq("indicador_id", String(ind.id))
          .eq("periodo", latestPeriodo)
          .in("territorio_id", comunaIds) as unknown as Promise<{ data: DbRow[] | null }>);

        if (datosRaw?.length) {
          choroplethData[mapKey] = datosRaw
            .map((d) => {
              const info = comunaIdToInfo.get(String(d.territorio_id));
              if (!info) return null;
              return {
                codigo: info.codigo,
                nombre: info.nombre,
                valor: Number(d.valor),
              };
            })
            .filter((d): d is ChoroplethDatum => d !== null);
        }
      }

      // If no real choropleth data, return undefined to trigger fallback
      if (Object.keys(choroplethData).length === 0) {
        choroplethData = undefined;
      }
    }

    return {
      tickerItems: tickerItems.length > 0 ? tickerItems : undefined,
      dashboardCards: Object.keys(dashboardCards).length > 0 ? dashboardCards : undefined,
      choroplethData,
    };
  } catch {
    return { tickerItems: undefined, dashboardCards: undefined, choroplethData: undefined };
  }
}
