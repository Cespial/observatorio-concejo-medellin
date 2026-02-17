import { log, startTimer } from "../config";
import { normalizeComuna } from "../utils";
import { loadIndicator } from "../load-indicators";
import type { DataPoint } from "../types";

const METROPOL_BASE = "https://datosabiertos.metropol.gov.co";

// Mapping of known air quality stations to nearest comuna
const STATION_COMUNA_MAP: Record<string, string> = {
  "MED-UNNV": "COM07", // Universidad Nacional - Robledo
  "MED-ARME": "COM15", // Area Metropolitana - Guayabal
  "MED-POBL": "COM14", // El Poblado
  "MED-TRAF": "COM10", // Trafico Centro - La Candelaria
  "MED-MUSE": "COM10", // Museo de Antioquia - La Candelaria
  "MED-EXITO": "COM11", // Exito de San Antonio - Laureles
  "MED-ITAGUI": "MDE", // Metropolitan area station
};

export async function loadCalidadAireEstaciones(): Promise<number> {
  const elapsed = startTimer();
  log("info", "Loading calidad del aire per-estacion from Area Metropolitana...");

  try {
    // Try CKAN datastore API
    const url = `${METROPOL_BASE}/api/3/action/datastore_search?resource_id=99&limit=5000`;
    const response = await fetch(url);

    if (!response.ok) {
      log("warn", `Metropol API returned ${response.status}`);
      return 0;
    }

    const data = await response.json();
    if (!data.success) {
      log("warn", "Metropol API returned success=false");
      return 0;
    }

    const rows = data.result?.records ?? [];
    if (rows.length === 0) {
      log("warn", "No air quality station data from Metropol");
      return 0;
    }

    log("info", `Fetched ${rows.length} station records. Columns: ${Object.keys(rows[0]).join(", ")}`);

    // Aggregate PM2.5 averages per station per year, then map to comunas
    const stationYearSums = new Map<string, Map<string, { sum: number; count: number }>>();

    for (const row of rows) {
      const station = String(row.estacion ?? row.codigo_estacion ?? row.nombre_estacion ?? "");
      const rawDate = String(row.fecha ?? row.fecha_hora ?? "");
      const pm25 = Number(row.pm25 ?? row.pm2_5 ?? row.valor ?? NaN);

      if (!station || isNaN(pm25) || pm25 <= 0) continue;

      const yearMatch = rawDate.match(/(\d{4})/);
      if (!yearMatch) continue;
      const year = yearMatch[1];

      if (!stationYearSums.has(station)) {
        stationYearSums.set(station, new Map());
      }
      const yearMap = stationYearSums.get(station)!;
      const entry = yearMap.get(year) ?? { sum: 0, count: 0 };
      entry.sum += pm25;
      entry.count += 1;
      yearMap.set(year, entry);
    }

    // Map stations to comunas and create data points
    const valores: DataPoint[] = [];

    for (const [station, yearMap] of stationYearSums) {
      const comunaCodigo = STATION_COMUNA_MAP[station];
      if (!comunaCodigo) {
        log("warn", `Unknown station: ${station}, skipping`);
        continue;
      }

      for (const [year, { sum, count }] of yearMap) {
        valores.push({
          periodo: year,
          territorio_codigo: comunaCodigo,
          valor: Math.round((sum / count) * 100) / 100,
          metadata: { station, measurements: count },
        });
      }
    }

    if (valores.length === 0) {
      log("warn", "No PM2.5 per-station data could be mapped to comunas");
      return 0;
    }

    log("info", `Aggregated ${valores.length} per-station-year PM2.5 data points`);

    return loadIndicator({
      nombre: "PM2.5 promedio por estacion",
      slug: "pm25-promedio-estacion",
      descripcion: "Concentracion promedio de PM2.5 por estacion de monitoreo (mapeada a comuna mas cercana)",
      unidad_medida: "ug/m3",
      periodicidad: "anual",
      linea_tematica_slug: "ambiente",
      categoria_nombre: "Calidad ambiental",
      ficha_tecnica: {
        fuente: "Area Metropolitana del Valle de Aburra - Datos Abiertos",
        granularidad: "per_station_to_comuna",
        metodologia: "Promedio anual de PM2.5 por estacion, mapeado a la comuna mas cercana",
      },
      valores,
    });
  } catch (err) {
    log("error", "Failed to load air quality station data", (err as Error).message);
    return 0;
  }
}
