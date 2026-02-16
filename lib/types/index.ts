export type ThematicLine = {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string;
  color: string;
  icono: string;
  orden: number;
  activa: boolean;
  created_at: string;
  updated_at: string;
};

export type Territory = {
  id: string;
  nombre: string;
  tipo: "distrito" | "comuna" | "corregimiento" | "barrio";
  codigo: string;
  padre_id: string | null;
  geojson: Record<string, unknown> | null;
  poblacion: number | null;
  area_km2: number | null;
  created_at: string;
};

export type IndicatorCategory = {
  id: string;
  nombre: string;
  linea_tematica_id: string;
  descripcion: string | null;
  orden: number;
};

export type IndicatorSummary = {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string;
  unidad_medida: string;
  periodicidad: "mensual" | "trimestral" | "semestral" | "anual";
  linea_tematica_id: string;
  categoria_id: string | null;
  fuente_datos_id: string | null;
  ficha_tecnica: Record<string, unknown>;
  ultimo_valor: number | null;
  variacion_porcentual: number | null;
  tendencia: "alza" | "baja" | "estable" | null;
  activo: boolean;
};

export type IndicatorDataPoint = {
  id: string;
  indicador_id: string;
  territorio_id: string;
  periodo: string;
  valor: number;
  metadata: Record<string, unknown> | null;
};

export type Initiative = {
  id: string;
  numero_radicado: string;
  titulo: string;
  descripcion: string;
  tipo: "acuerdo" | "proposicion" | "resolucion" | "debate" | "otro";
  estado: "radicada" | "en_comision" | "primer_debate" | "segundo_debate" | "aprobada" | "archivada" | "retirada";
  fecha_radicacion: string;
  comision_id: string | null;
  linea_tematica_id: string | null;
  tags: string[];
  trazabilidad: Record<string, unknown>;
  documento_url: string | null;
};

export type Product = {
  id: string;
  titulo: string;
  slug: string;
  tipo: "informe" | "boletin" | "infografia" | "video" | "podcast" | "otro";
  descripcion: string;
  contenido: string | null;
  imagen_url: string | null;
  archivo_url: string | null;
  linea_tematica_id: string | null;
  publicado: boolean;
  fecha_publicacion: string | null;
  created_at: string;
};

export type Alliance = {
  id: string;
  nombre: string;
  tipo: "universidad" | "gobierno" | "ong" | "empresa" | "organismo_internacional" | "otro";
  descripcion: string | null;
  logo_url: string | null;
  sitio_web: string | null;
  activo: boolean;
};

export type Alert = {
  id: string;
  titulo: string;
  mensaje: string;
  tipo: "info" | "exito" | "advertencia" | "error";
  prioridad: number;
  activa: boolean;
  fecha_inicio: string;
  fecha_fin: string | null;
};
