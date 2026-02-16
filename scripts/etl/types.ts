// ── Shared ETL Types ─────────────────────────────────────────

export type SocrataRow = Record<string, string | number | null>;

export type ArcGISFeature = {
  type: "Feature";
  properties: Record<string, string | number | null>;
  geometry: {
    type: string;
    coordinates: unknown;
  };
};

export type ArcGISFeatureCollection = {
  type: "FeatureCollection";
  features: ArcGISFeature[];
};

export type IndicatorPayload = {
  nombre: string;
  slug: string;
  descripcion: string;
  unidad_medida: string;
  periodicidad: string;
  linea_tematica_slug: string;
  categoria_nombre?: string;
  fuente_nombre?: string;
  ficha_tecnica?: Record<string, unknown>;
  valores: DataPoint[];
};

export type DataPoint = {
  periodo: string;
  territorio_codigo: string;
  valor: number;
  metadata?: Record<string, unknown>;
};

export type ETLResult = {
  phase: string;
  success: boolean;
  rowsProcessed: number;
  rowsInserted: number;
  rowsSkipped: number;
  errors: string[];
  durationMs: number;
};

export type ComunaMapping = {
  nombre: string;
  codigo: string;
};
