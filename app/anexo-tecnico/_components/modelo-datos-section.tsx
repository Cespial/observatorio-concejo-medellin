"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Database,
  Key,
  Link2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

/* ---------- Entity Data ---------- */
type Column = {
  name: string;
  type: string;
  isPK?: boolean;
  isFK?: boolean;
  description: string;
};

type Entity = {
  name: string;
  displayName: string;
  description: string;
  columns: Column[];
  color: string;
};

const ENTITIES: Entity[] = [
  {
    name: "lineas_tematicas",
    displayName: "Líneas Temáticas",
    description: "Catálogo de las 6 líneas temáticas del Observatorio.",
    color: "border-t-blue-500",
    columns: [
      { name: "id", type: "uuid", isPK: true, description: "Identificador único" },
      { name: "nombre", type: "text", description: "Nombre de la línea temática" },
      { name: "slug", type: "text", description: "Identificador URL amigable" },
      { name: "color", type: "text", description: "Color hexadecimal para visualización" },
      { name: "icono", type: "text", description: "Nombre del ícono asociado" },
      { name: "descripcion", type: "text", description: "Descripción detallada" },
    ],
  },
  {
    name: "indicadores",
    displayName: "Indicadores",
    description: "Catálogo de indicadores con su ficha técnica.",
    color: "border-t-green-500",
    columns: [
      { name: "id", type: "uuid", isPK: true, description: "Identificador único" },
      { name: "linea_tematica_id", type: "uuid", isFK: true, description: "FK a lineas_tematicas" },
      { name: "nombre", type: "text", description: "Nombre del indicador" },
      { name: "definicion", type: "text", description: "Definición técnica" },
      { name: "formula", type: "text", description: "Fórmula de cálculo" },
      { name: "unidad", type: "text", description: "Unidad de medida" },
      { name: "periodicidad", type: "text", description: "Frecuencia de actualización" },
      { name: "fuente", type: "text", description: "Entidad fuente del dato" },
    ],
  },
  {
    name: "datos_indicador",
    displayName: "Datos de Indicador",
    description: "Valores observados de cada indicador por territorio y periodo.",
    color: "border-t-amber-500",
    columns: [
      { name: "id", type: "uuid", isPK: true, description: "Identificador único" },
      { name: "indicador_id", type: "uuid", isFK: true, description: "FK a indicadores" },
      { name: "territorio_id", type: "uuid", isFK: true, description: "FK a territorios" },
      { name: "periodo", type: "date", description: "Fecha del periodo de medición" },
      { name: "valor", type: "numeric", description: "Valor observado del indicador" },
      { name: "metadata", type: "jsonb", description: "Metadatos adicionales (desagregaciones)" },
      { name: "created_at", type: "timestamptz", description: "Fecha de inserción" },
    ],
  },
  {
    name: "territorios",
    displayName: "Territorios",
    description: "Catálogo geográfico: comunas, corregimientos, barrios.",
    color: "border-t-purple-500",
    columns: [
      { name: "id", type: "uuid", isPK: true, description: "Identificador único" },
      { name: "nombre", type: "text", description: "Nombre del territorio" },
      { name: "tipo", type: "text", description: "Tipo: comuna, corregimiento, barrio" },
      { name: "codigo", type: "text", description: "Código oficial DANE" },
      { name: "geometria", type: "geometry", description: "Polígono geográfico (PostGIS)" },
      { name: "parent_id", type: "uuid", isFK: true, description: "FK a territorio padre" },
    ],
  },
  {
    name: "iniciativas",
    displayName: "Iniciativas",
    description: "Proyectos de acuerdo y proposiciones del Concejo.",
    color: "border-t-rose-500",
    columns: [
      { name: "id", type: "uuid", isPK: true, description: "Identificador único" },
      { name: "titulo", type: "text", description: "Título de la iniciativa" },
      { name: "tipo", type: "text", description: "Tipo: proyecto de acuerdo, proposición" },
      { name: "estado", type: "text", description: "Estado: radicado, en debate, aprobado, archivado" },
      { name: "fecha_radicacion", type: "date", description: "Fecha de radicación" },
      { name: "resumen", type: "text", description: "Resumen del contenido" },
      { name: "linea_tematica_id", type: "uuid", isFK: true, description: "FK a lineas_tematicas" },
    ],
  },
  {
    name: "autores",
    displayName: "Autores",
    description: "Concejales y ponentes de iniciativas.",
    color: "border-t-cyan-500",
    columns: [
      { name: "id", type: "uuid", isPK: true, description: "Identificador único" },
      { name: "nombre", type: "text", description: "Nombre completo" },
      { name: "bancada", type: "text", description: "Bancada o partido político" },
      { name: "foto_url", type: "text", description: "URL de foto de perfil" },
      { name: "periodo", type: "text", description: "Periodo de ejercicio" },
    ],
  },
  {
    name: "iniciativas_autores",
    displayName: "Iniciativas - Autores",
    description: "Relación muchos a muchos entre iniciativas y autores.",
    color: "border-t-gray-500",
    columns: [
      { name: "iniciativa_id", type: "uuid", isPK: true, isFK: true, description: "FK a iniciativas" },
      { name: "autor_id", type: "uuid", isPK: true, isFK: true, description: "FK a autores" },
      { name: "rol", type: "text", description: "Rol: autor principal, coautor, ponente" },
    ],
  },
  {
    name: "productos",
    displayName: "Productos",
    description: "Informes, boletines, infografías publicados por el Observatorio.",
    color: "border-t-emerald-500",
    columns: [
      { name: "id", type: "uuid", isPK: true, description: "Identificador único" },
      { name: "titulo", type: "text", description: "Título del producto" },
      { name: "tipo", type: "text", description: "Tipo: informe, boletín, infografía, video" },
      { name: "fecha_publicacion", type: "date", description: "Fecha de publicación" },
      { name: "archivo_url", type: "text", description: "URL del archivo" },
      { name: "linea_tematica_id", type: "uuid", isFK: true, description: "FK a lineas_tematicas" },
    ],
  },
  {
    name: "alertas",
    displayName: "Alertas",
    description: "Alertas automáticas sobre cambios significativos en indicadores.",
    color: "border-t-red-500",
    columns: [
      { name: "id", type: "uuid", isPK: true, description: "Identificador único" },
      { name: "indicador_id", type: "uuid", isFK: true, description: "FK a indicadores" },
      { name: "tipo", type: "text", description: "Tipo: umbral, tendencia, anomalía" },
      { name: "mensaje", type: "text", description: "Descripción de la alerta" },
      { name: "severidad", type: "text", description: "Severidad: info, warning, critical" },
      { name: "created_at", type: "timestamptz", description: "Fecha de generación" },
      { name: "resuelta", type: "boolean", description: "Si la alerta fue revisada" },
    ],
  },
  {
    name: "alianzas",
    displayName: "Alianzas",
    description: "Entidades y organizaciones aliadas del Observatorio.",
    color: "border-t-indigo-500",
    columns: [
      { name: "id", type: "uuid", isPK: true, description: "Identificador único" },
      { name: "nombre", type: "text", description: "Nombre de la entidad" },
      { name: "tipo", type: "text", description: "Tipo: academia, gobierno, sociedad civil, ONG" },
      { name: "descripcion", type: "text", description: "Descripción del vínculo" },
      { name: "logo_url", type: "text", description: "URL del logo" },
      { name: "activa", type: "boolean", description: "Si la alianza está activa" },
    ],
  },
];

/* ---------- Relationships ---------- */
const RELATIONSHIPS = [
  { from: "lineas_tematicas", to: "indicadores", label: "1:N" },
  { from: "indicadores", to: "datos_indicador", label: "1:N" },
  { from: "territorios", to: "datos_indicador", label: "1:N" },
  { from: "lineas_tematicas", to: "iniciativas", label: "1:N" },
  { from: "iniciativas", to: "iniciativas_autores", label: "1:N" },
  { from: "autores", to: "iniciativas_autores", label: "1:N" },
  { from: "lineas_tematicas", to: "productos", label: "1:N" },
  { from: "indicadores", to: "alertas", label: "1:N" },
  { from: "territorios", to: "territorios", label: "Auto-ref (padre)" },
];

export function ModeloDatosSection() {
  const [expandedEntity, setExpandedEntity] = useState<string | null>(null);

  return (
    <div className="space-y-12">
      {/* ER Diagram */}
      <section>
        <h2 className="font-serif text-2xl font-bold mb-2">
          Modelo de Datos
        </h2>
        <Separator className="mb-4" />
        <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
          Diagrama Entidad-Relación simplificado del modelo de datos del
          Observatorio, implementado en PostgreSQL a través de Supabase.
        </p>

        {/* Visual ER Diagram */}
        <Card className="mb-8">
          <CardContent className="pt-6 overflow-x-auto">
            <div className="min-w-[700px] relative">
              {/* Main flow: lineas_tematicas -> indicadores -> datos_indicador -> territorios */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {/* lineas_tematicas */}
                <div className="rounded-lg border-2 border-blue-300 bg-blue-50 p-3 text-center min-w-[140px]">
                  <p className="text-xs font-bold text-blue-700">lineas_tematicas</p>
                  <div className="mt-1 space-y-0.5">
                    <p className="text-[10px] text-blue-600 flex items-center justify-center gap-1">
                      <Key className="h-2.5 w-2.5" /> id
                    </p>
                    <p className="text-[10px] text-blue-600">nombre, slug</p>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-muted-foreground">1:N</span>
                  <svg width="40" height="12" className="text-muted-foreground">
                    <line x1="0" y1="6" x2="32" y2="6" stroke="currentColor" strokeWidth="1.5" />
                    <polygon points="32,2 40,6 32,10" fill="currentColor" />
                  </svg>
                </div>

                {/* indicadores */}
                <div className="rounded-lg border-2 border-green-300 bg-green-50 p-3 text-center min-w-[140px]">
                  <p className="text-xs font-bold text-green-700">indicadores</p>
                  <div className="mt-1 space-y-0.5">
                    <p className="text-[10px] text-green-600 flex items-center justify-center gap-1">
                      <Key className="h-2.5 w-2.5" /> id
                    </p>
                    <p className="text-[10px] text-green-600 flex items-center justify-center gap-1">
                      <Link2 className="h-2.5 w-2.5" /> linea_tematica_id
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-muted-foreground">1:N</span>
                  <svg width="40" height="12" className="text-muted-foreground">
                    <line x1="0" y1="6" x2="32" y2="6" stroke="currentColor" strokeWidth="1.5" />
                    <polygon points="32,2 40,6 32,10" fill="currentColor" />
                  </svg>
                </div>

                {/* datos_indicador */}
                <div className="rounded-lg border-2 border-amber-300 bg-amber-50 p-3 text-center min-w-[140px]">
                  <p className="text-xs font-bold text-amber-700">datos_indicador</p>
                  <div className="mt-1 space-y-0.5">
                    <p className="text-[10px] text-amber-600 flex items-center justify-center gap-1">
                      <Key className="h-2.5 w-2.5" /> id
                    </p>
                    <p className="text-[10px] text-amber-600 flex items-center justify-center gap-1">
                      <Link2 className="h-2.5 w-2.5" /> indicador_id, territorio_id
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-muted-foreground">N:1</span>
                  <svg width="40" height="12" className="text-muted-foreground">
                    <line x1="0" y1="6" x2="32" y2="6" stroke="currentColor" strokeWidth="1.5" />
                    <polygon points="32,2 40,6 32,10" fill="currentColor" />
                  </svg>
                </div>

                {/* territorios */}
                <div className="rounded-lg border-2 border-purple-300 bg-purple-50 p-3 text-center min-w-[140px]">
                  <p className="text-xs font-bold text-purple-700">territorios</p>
                  <div className="mt-1 space-y-0.5">
                    <p className="text-[10px] text-purple-600 flex items-center justify-center gap-1">
                      <Key className="h-2.5 w-2.5" /> id
                    </p>
                    <p className="text-[10px] text-purple-600">nombre, geometria</p>
                  </div>
                </div>
              </div>

              {/* Second row: iniciativas <-> autores, productos */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {/* iniciativas */}
                <div className="rounded-lg border-2 border-rose-300 bg-rose-50 p-3 text-center min-w-[140px]">
                  <p className="text-xs font-bold text-rose-700">iniciativas</p>
                  <div className="mt-1 space-y-0.5">
                    <p className="text-[10px] text-rose-600 flex items-center justify-center gap-1">
                      <Key className="h-2.5 w-2.5" /> id
                    </p>
                    <p className="text-[10px] text-rose-600 flex items-center justify-center gap-1">
                      <Link2 className="h-2.5 w-2.5" /> linea_tematica_id
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-muted-foreground">N:M</span>
                  <svg width="40" height="12" className="text-muted-foreground">
                    <line x1="0" y1="6" x2="32" y2="6" stroke="currentColor" strokeWidth="1.5" />
                    <polygon points="32,2 40,6 32,10" fill="currentColor" />
                  </svg>
                </div>

                {/* iniciativas_autores */}
                <div className="rounded-lg border-2 border-gray-300 bg-gray-50 p-3 text-center min-w-[140px]">
                  <p className="text-xs font-bold text-gray-700">iniciativas_autores</p>
                  <div className="mt-1 space-y-0.5">
                    <p className="text-[10px] text-gray-600 flex items-center justify-center gap-1">
                      <Key className="h-2.5 w-2.5" /><Link2 className="h-2.5 w-2.5" /> PKs compuestas
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-muted-foreground">N:M</span>
                  <svg width="40" height="12" className="text-muted-foreground">
                    <line x1="0" y1="6" x2="32" y2="6" stroke="currentColor" strokeWidth="1.5" />
                    <polygon points="32,2 40,6 32,10" fill="currentColor" />
                  </svg>
                </div>

                {/* autores */}
                <div className="rounded-lg border-2 border-cyan-300 bg-cyan-50 p-3 text-center min-w-[140px]">
                  <p className="text-xs font-bold text-cyan-700">autores</p>
                  <div className="mt-1 space-y-0.5">
                    <p className="text-[10px] text-cyan-600 flex items-center justify-center gap-1">
                      <Key className="h-2.5 w-2.5" /> id
                    </p>
                    <p className="text-[10px] text-cyan-600">nombre, bancada</p>
                  </div>
                </div>

                <div className="w-10" />

                {/* productos */}
                <div className="rounded-lg border-2 border-emerald-300 bg-emerald-50 p-3 text-center min-w-[140px]">
                  <p className="text-xs font-bold text-emerald-700">productos</p>
                  <div className="mt-1 space-y-0.5">
                    <p className="text-[10px] text-emerald-600 flex items-center justify-center gap-1">
                      <Key className="h-2.5 w-2.5" /> id
                    </p>
                    <p className="text-[10px] text-emerald-600 flex items-center justify-center gap-1">
                      <Link2 className="h-2.5 w-2.5" /> linea_tematica_id
                    </p>
                  </div>
                </div>
              </div>

              {/* Third row: alertas, alianzas */}
              <div className="flex items-center justify-center gap-6">
                <div className="rounded-lg border-2 border-red-300 bg-red-50 p-3 text-center min-w-[140px]">
                  <p className="text-xs font-bold text-red-700">alertas</p>
                  <div className="mt-1 space-y-0.5">
                    <p className="text-[10px] text-red-600 flex items-center justify-center gap-1">
                      <Key className="h-2.5 w-2.5" /> id
                    </p>
                    <p className="text-[10px] text-red-600 flex items-center justify-center gap-1">
                      <Link2 className="h-2.5 w-2.5" /> indicador_id
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border-2 border-indigo-300 bg-indigo-50 p-3 text-center min-w-[140px]">
                  <p className="text-xs font-bold text-indigo-700">alianzas</p>
                  <div className="mt-1 space-y-0.5">
                    <p className="text-[10px] text-indigo-600 flex items-center justify-center gap-1">
                      <Key className="h-2.5 w-2.5" /> id
                    </p>
                    <p className="text-[10px] text-indigo-600">nombre, tipo</p>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-[10px] text-muted-foreground border-t pt-4">
                <div className="flex items-center gap-1">
                  <Key className="h-3 w-3" />
                  <span>Clave primaria (PK)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Link2 className="h-3 w-3" />
                  <span>Clave foránea (FK)</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg width="20" height="8">
                    <line x1="0" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1.5" />
                    <polygon points="14,1 20,4 14,7" fill="currentColor" />
                  </svg>
                  <span>Relación</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Relationships Table */}
      <section>
        <h3 className="font-serif text-xl font-bold mb-2">
          Relaciones entre Entidades
        </h3>
        <Separator className="mb-4" />
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-semibold">Origen</th>
                    <th className="text-left py-2 px-4 font-semibold">Destino</th>
                    <th className="text-left py-2 px-4 font-semibold">Cardinalidad</th>
                  </tr>
                </thead>
                <tbody>
                  {RELATIONSHIPS.map((rel, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-2 px-4 font-mono text-xs">{rel.from}</td>
                      <td className="py-2 px-4 font-mono text-xs">{rel.to}</td>
                      <td className="py-2 px-4">
                        <Badge variant="outline" className="text-[10px]">{rel.label}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Data Dictionary */}
      <section>
        <h3 className="font-serif text-xl font-bold mb-2">
          Diccionario de Datos
        </h3>
        <Separator className="mb-4" />
        <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
          Documentación completa de todas las tablas del modelo con sus columnas,
          tipos de dato y descripciones. Haga clic en una tabla para expandir su detalle.
        </p>

        <div className="space-y-2">
          {ENTITIES.map((entity) => {
            const isExpanded = expandedEntity === entity.name;
            return (
              <Card key={entity.name} className={`${entity.color} border-t-4`}>
                <button
                  onClick={() =>
                    setExpandedEntity(isExpanded ? null : entity.name)
                  }
                  className="w-full text-left"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-muted-foreground" />
                        <CardTitle className="text-sm font-mono">
                          {entity.name}
                        </CardTitle>
                        <Badge variant="secondary" className="text-[10px]">
                          {entity.columns.length} columnas
                        </Badge>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {entity.description}
                    </p>
                  </CardHeader>
                </button>

                {isExpanded && (
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 px-3 font-semibold">Columna</th>
                            <th className="text-left py-2 px-3 font-semibold">Tipo</th>
                            <th className="text-left py-2 px-3 font-semibold">Claves</th>
                            <th className="text-left py-2 px-3 font-semibold">Descripción</th>
                          </tr>
                        </thead>
                        <tbody>
                          {entity.columns.map((col) => (
                            <tr key={col.name} className="border-b last:border-0">
                              <td className="py-2 px-3 font-mono font-medium">
                                {col.name}
                              </td>
                              <td className="py-2 px-3">
                                <Badge variant="outline" className="text-[10px] font-mono">
                                  {col.type}
                                </Badge>
                              </td>
                              <td className="py-2 px-3">
                                <div className="flex gap-1">
                                  {col.isPK && (
                                    <Badge className="text-[10px] bg-amber-100 text-amber-700 hover:bg-amber-100">
                                      PK
                                    </Badge>
                                  )}
                                  {col.isFK && (
                                    <Badge className="text-[10px] bg-blue-100 text-blue-700 hover:bg-blue-100">
                                      FK
                                    </Badge>
                                  )}
                                </div>
                              </td>
                              <td className="py-2 px-3 text-muted-foreground">
                                {col.description}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
