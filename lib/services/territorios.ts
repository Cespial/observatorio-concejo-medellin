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
  // For now return mock data — real data requires complex joins
  // This can be enhanced when real indicator data is loaded
  return MAP_INDICATORS_DATA;
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
