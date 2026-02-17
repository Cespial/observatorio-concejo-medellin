import { createClient } from "@/lib/supabase/server";
import { TERRITORIES } from "@/lib/mock-data/territories";
import type { TerritoryData, MapIndicatorData } from "@/lib/mock-data/types";
import {
  MAP_INDICATORS_DATA,
  MAP_INDICATOR_OPTIONS,
  type MapIndicatorOption,
} from "@/lib/mock-data/map-indicators";

type DbRow = Record<string, unknown>;

export async function getComunasWithIndicators(): Promise<{
  territories: TerritoryData[];
  indicatorOptions: MapIndicatorOption[];
}> {
  try {
    const supabase = createClient();

    const { data: territoriosRaw } = await (supabase
      .from("territorios")
      .select("codigo, nombre, tipo, poblacion, area_km2")
      .in("tipo", ["comuna", "corregimiento"])
      .order("codigo") as unknown as Promise<{ data: DbRow[] | null }>);

    if (!territoriosRaw?.length) {
      return { territories: TERRITORIES, indicatorOptions: MAP_INDICATOR_OPTIONS };
    }

    const territories: TerritoryData[] = territoriosRaw.map((t) => ({
      codigo: String(t.codigo).replace("COM", "").replace("COR", ""),
      nombre: String(t.nombre),
      tipo: String(t.tipo) as "comuna" | "corregimiento",
      poblacion: Number(t.poblacion ?? 0),
      area_km2: Number(t.area_km2 ?? 0),
    }));

    return {
      territories: territories.length > 0 ? territories : TERRITORIES,
      indicatorOptions: MAP_INDICATOR_OPTIONS,
    };
  } catch {
    return { territories: TERRITORIES, indicatorOptions: MAP_INDICATOR_OPTIONS };
  }
}

export async function getMapIndicatorData(): Promise<MapIndicatorData[]> {
  try {
    const supabase = createClient();

    // Get all active indicators that have per-comuna data
    const { data: indicadoresRaw } = await (supabase
      .from("indicadores")
      .select("id, slug")
      .eq("activo", true) as unknown as Promise<{ data: DbRow[] | null }>);

    if (!indicadoresRaw?.length) return MAP_INDICATORS_DATA;

    // Get all comunas and corregimientos
    const { data: territoriosRaw } = await (supabase
      .from("territorios")
      .select("id, codigo")
      .in("tipo", ["comuna", "corregimiento"]) as unknown as Promise<{ data: DbRow[] | null }>);

    if (!territoriosRaw?.length) return MAP_INDICATORS_DATA;

    const territorioIds = territoriosRaw.map((t) => String(t.id));
    const territorioMap = new Map(
      territoriosRaw.map((t) => [
        String(t.id),
        String(t.codigo).replace("COM", "").replace("COR", ""),
      ])
    );

    // Map indicator slugs to the map indicator keys
    const slugToMapKey: Record<string, string> = {
      "tasa-homicidios": "homicidios_tasa",
      "homicidios-absoluto": "homicidios_tasa",
      "hurtos-personas": "hurtos_total",
      "cobertura-neta-educativa": "cobertura_educativa",
      "tasa-desempleo": "desempleo",
      "pm25-promedio": "pm25",
      "pm25-promedio-estacion": "pm25",
      "accidentalidad-vial": "accidentes",
      "incidentes-viales-comuna": "accidentes",
      "cobertura-vacunacion": "vacunacion",
      "satisfaccion-transporte-comuna": "satisfaccion_transporte",
    };

    // Fetch per-comuna data for the last 3 years
    const { data: datosRaw } = await (supabase
      .from("datos_indicador")
      .select("indicador_id, territorio_id, periodo, valor")
      .in("territorio_id", territorioIds)
      .gte("periodo", "2023")
      .order("periodo", { ascending: true }) as unknown as Promise<{ data: DbRow[] | null }>);

    if (!datosRaw?.length) return MAP_INDICATORS_DATA;

    const indicadorMap = new Map(
      indicadoresRaw.map((ind) => [String(ind.id), String(ind.slug)])
    );

    const realData: MapIndicatorData[] = [];

    for (const dato of datosRaw) {
      const slug = indicadorMap.get(String(dato.indicador_id));
      if (!slug) continue;

      const mapKey = slugToMapKey[slug];
      if (!mapKey) continue;

      const territorioCodigo = territorioMap.get(String(dato.territorio_id));
      if (!territorioCodigo) continue;

      realData.push({
        territorio_codigo: territorioCodigo,
        indicador: mapKey,
        year: Number(String(dato.periodo).slice(0, 4)),
        valor: Number(dato.valor),
      });
    }

    // If we got real data, use it; otherwise fall back to mock
    return realData.length > 0 ? realData : MAP_INDICATORS_DATA;
  } catch {
    return MAP_INDICATORS_DATA;
  }
}

export async function getComunaDetail(codigo: string) {
  try {
    const supabase = createClient();
    const dbCodigo = codigo.length <= 2
      ? `COM${codigo.padStart(2, "0")}`
      : codigo;

    const { data: territorioRaw } = await (supabase
      .from("territorios")
      .select("*")
      .eq("codigo", dbCodigo)
      .single() as unknown as Promise<{ data: DbRow | null }>);

    return territorioRaw;
  } catch {
    return null;
  }
}
