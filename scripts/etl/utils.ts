import { supabaseAdmin, log } from "./config";
import type { ComunaMapping } from "./types";

// ── Sleep ────────────────────────────────────────────────────

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── Rate Limiter ─────────────────────────────────────────────

export function rateLimiter(requestsPerSecond: number) {
  const interval = 1000 / requestsPerSecond;
  let lastCall = 0;

  return async function throttle() {
    const now = Date.now();
    const elapsed = now - lastCall;
    if (elapsed < interval) {
      await sleep(interval - elapsed);
    }
    lastCall = Date.now();
  };
}

// ── Comuna Name → Codigo Mapping ─────────────────────────────

const COMUNA_MAP: Record<string, string> = {
  // Uppercase normalized names → our codes
  POPULAR: "COM01",
  "SANTA CRUZ": "COM02",
  MANRIQUE: "COM03",
  ARANJUEZ: "COM04",
  CASTILLA: "COM05",
  "DOCE DE OCTUBRE": "COM06",
  "12 DE OCTUBRE": "COM06",
  ROBLEDO: "COM07",
  "VILLA HERMOSA": "COM08",
  "BUENOS AIRES": "COM09",
  "LA CANDELARIA": "COM10",
  CANDELARIA: "COM10",
  "LAURELES-ESTADIO": "COM11",
  LAURELES: "COM11",
  "LA AMERICA": "COM12",
  "LA AMÉRICA": "COM12",
  "SAN JAVIER": "COM13",
  "EL POBLADO": "COM14",
  POBLADO: "COM14",
  GUAYABAL: "COM15",
  BELEN: "COM16",
  BELÉN: "COM16",
  // Corregimientos
  "SAN SEBASTIAN DE PALMITAS": "COR50",
  "SAN SEBASTIÁN DE PALMITAS": "COR50",
  PALMITAS: "COR50",
  "SAN CRISTOBAL": "COR60",
  "SAN CRISTÓBAL": "COR60",
  ALTAVISTA: "COR70",
  "SAN ANTONIO DE PRADO": "COR80",
  "SANTA ELENA": "COR90",
  // Special
  MEDELLIN: "MDE",
  MEDELLÍN: "MDE",
  "MEDELLIN (CT)": "MDE",
  "MEDELLÍN (CT)": "MDE",
};

export function normalizeComuna(name: string): string | null {
  if (!name) return null;
  const normalized = name.trim().toUpperCase().replace(/\s+/g, " ");

  // Direct match
  if (COMUNA_MAP[normalized]) return COMUNA_MAP[normalized];

  // Try removing accents
  const noAccents = normalized
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  if (COMUNA_MAP[noAccents]) return COMUNA_MAP[noAccents];

  // Try partial match
  for (const [key, code] of Object.entries(COMUNA_MAP)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return code;
    }
  }

  return null;
}

// ── Periodo Normalization ────────────────────────────────────

export function normalizePeriodo(dateOrYear: string | number): string {
  if (typeof dateOrYear === "number") return String(dateOrYear);
  const str = String(dateOrYear).trim();
  // If it's a 4-digit year
  if (/^\d{4}$/.test(str)) return str;
  // If it's a date string, extract year
  const match = str.match(/(\d{4})/);
  return match ? match[1] : str;
}

// ── Batch Upsert ─────────────────────────────────────────────

export async function batchUpsert(
  table: string,
  rows: Record<string, unknown>[],
  conflictColumns: string,
  batchSize = 500
): Promise<{ inserted: number; errors: number }> {
  let inserted = 0;
  let errors = 0;

  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const { error } = await supabaseAdmin
      .from(table)
      .upsert(batch as never[], { onConflict: conflictColumns });

    if (error) {
      log("error", `Batch upsert error on ${table} (batch ${Math.floor(i / batchSize) + 1})`, error.message);
      errors += batch.length;
    } else {
      inserted += batch.length;
    }
  }

  return { inserted, errors };
}

// ── Territory Lookup Cache ───────────────────────────────────

let territoryCache: Map<string, string> | null = null;

export async function getTerritorioId(codigo: string): Promise<string | null> {
  if (!territoryCache) {
    const { data } = await supabaseAdmin
      .from("territorios")
      .select("id, codigo");
    territoryCache = new Map();
    for (const t of data ?? []) {
      territoryCache.set(t.codigo, t.id);
    }
  }
  return territoryCache.get(codigo) ?? null;
}

export function clearTerritoryCache() {
  territoryCache = null;
}

// ── Linea Tematica Lookup Cache ──────────────────────────────

let lineaCache: Map<string, string> | null = null;

export async function getLineaTematicaId(slug: string): Promise<string | null> {
  if (!lineaCache) {
    const { data } = await supabaseAdmin
      .from("lineas_tematicas")
      .select("id, slug");
    lineaCache = new Map();
    for (const l of data ?? []) {
      lineaCache.set(l.slug, l.id);
    }
  }
  return lineaCache.get(slug) ?? null;
}

// ── Categoria Lookup Cache ───────────────────────────────────

let categoriaCache: Map<string, string> | null = null;

export async function getCategoriaId(nombre: string): Promise<string | null> {
  if (!categoriaCache) {
    const { data } = await supabaseAdmin
      .from("categorias_indicador")
      .select("id, nombre");
    categoriaCache = new Map();
    for (const c of data ?? []) {
      categoriaCache.set(c.nombre, c.id);
    }
  }
  return categoriaCache.get(nombre) ?? null;
}

// ── Comision Lookup Cache ────────────────────────────────────

let comisionCache: Map<string, string> | null = null;

export async function getComisionId(nombre: string): Promise<string | null> {
  if (!comisionCache) {
    const { data } = await supabaseAdmin
      .from("comisiones")
      .select("id, nombre");
    comisionCache = new Map();
    for (const c of data ?? []) {
      comisionCache.set(c.nombre, c.id);
    }
  }
  return comisionCache.get(nombre) ?? null;
}

// ── Progress Bar ─────────────────────────────────────────────

export function progressBar(current: number, total: number, label: string) {
  const pct = Math.round((current / total) * 100);
  const filled = Math.round(pct / 5);
  const bar = "█".repeat(filled) + "░".repeat(20 - filled);
  process.stdout.write(`\r  ${bar} ${pct}% ${label} (${current}/${total})`);
  if (current === total) process.stdout.write("\n");
}

// ── Group By ─────────────────────────────────────────────────

export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce(
    (acc, item) => {
      const k = String(item[key]);
      if (!acc[k]) acc[k] = [];
      acc[k].push(item);
      return acc;
    },
    {} as Record<string, T[]>
  );
}

// ── Compute Variation ────────────────────────────────────────

export function computeVariation(
  current: number,
  previous: number
): number | null {
  if (previous === 0) return null;
  return Math.round(((current - previous) / previous) * 10000) / 100;
}

// ── Compute Tendencia ────────────────────────────────────────

export function computeTendencia(
  values: { periodo: string; valor: number }[]
): "ascendente" | "descendente" | "estable" {
  if (values.length < 2) return "estable";
  const sorted = [...values].sort((a, b) => a.periodo.localeCompare(b.periodo));
  const recent = sorted.slice(-3);
  const diffs = [];
  for (let i = 1; i < recent.length; i++) {
    diffs.push(recent[i].valor - recent[i - 1].valor);
  }
  const avgDiff = diffs.reduce((a, b) => a + b, 0) / diffs.length;
  if (avgDiff > 0.5) return "ascendente";
  if (avgDiff < -0.5) return "descendente";
  return "estable";
}
