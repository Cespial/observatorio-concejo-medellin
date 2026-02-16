export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      territorios: {
        Row: {
          id: string;
          nombre: string;
          tipo: string;
          codigo: string;
          padre_id: string | null;
          geojson: Json | null;
          poblacion: number | null;
          area_km2: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["territorios"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["territorios"]["Insert"]>;
      };
      lineas_tematicas: {
        Row: {
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
        Insert: Omit<Database["public"]["Tables"]["lineas_tematicas"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["lineas_tematicas"]["Insert"]>;
      };
      indicadores: {
        Row: {
          id: string;
          nombre: string;
          slug: string;
          descripcion: string;
          unidad_medida: string;
          periodicidad: string;
          linea_tematica_id: string;
          categoria_id: string | null;
          fuente_datos_id: string | null;
          ficha_tecnica: Json;
          ultimo_valor: number | null;
          variacion_porcentual: number | null;
          tendencia: string | null;
          activo: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["indicadores"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["indicadores"]["Insert"]>;
      };
      datos_indicador: {
        Row: {
          id: string;
          indicador_id: string;
          territorio_id: string;
          periodo: string;
          valor: number;
          metadata: Json | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["datos_indicador"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["datos_indicador"]["Insert"]>;
      };
      iniciativas: {
        Row: {
          id: string;
          numero_radicado: string;
          titulo: string;
          descripcion: string;
          tipo: string;
          estado: string;
          fecha_radicacion: string;
          comision_id: string | null;
          linea_tematica_id: string | null;
          tags: string[];
          trazabilidad: Json;
          documento_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["iniciativas"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["iniciativas"]["Insert"]>;
      };
      productos: {
        Row: {
          id: string;
          titulo: string;
          slug: string;
          tipo: string;
          descripcion: string;
          contenido: string | null;
          imagen_url: string | null;
          archivo_url: string | null;
          linea_tematica_id: string | null;
          publicado: boolean;
          fecha_publicacion: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["productos"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["productos"]["Insert"]>;
      };
      autores_iniciativa: {
        Row: {
          id: string;
          nombre: string;
          cargo: string | null;
          partido: string | null;
          foto_url: string | null;
          activo: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["autores_iniciativa"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["autores_iniciativa"]["Insert"]>;
      };
      iniciativas_autores: {
        Row: {
          iniciativa_id: string;
          autor_id: string;
          rol: string;
        };
        Insert: Database["public"]["Tables"]["iniciativas_autores"]["Row"];
        Update: Partial<Database["public"]["Tables"]["iniciativas_autores"]["Insert"]>;
      };
      comisiones: {
        Row: {
          id: string;
          nombre: string;
          numero: number;
          descripcion: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["comisiones"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["comisiones"]["Insert"]>;
      };
      fuentes_datos: {
        Row: {
          id: string;
          nombre: string;
          entidad: string | null;
          url: string | null;
          periodicidad: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["fuentes_datos"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["fuentes_datos"]["Insert"]>;
      };
      categorias_indicador: {
        Row: {
          id: string;
          nombre: string;
          linea_tematica_id: string;
          orden: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["categorias_indicador"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["categorias_indicador"]["Insert"]>;
      };
      tags: {
        Row: {
          id: string;
          nombre: string;
          slug: string;
          categoria: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["tags"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["tags"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: {
      match_documentos: {
        Args: {
          query_embedding: number[];
          match_threshold: number;
          match_count: number;
        };
        Returns: {
          id: string;
          contenido: string;
          metadata: Json;
          similarity: number;
        }[];
      };
    };
    Enums: Record<string, never>;
  };
};
