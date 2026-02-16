"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  ShieldCheck,
  RefreshCw,
  Upload,
  TestTube2,
  ChevronDown,
  ChevronRight,
  Check,
  AlertTriangle,
} from "lucide-react";

/* ---------- ETL Steps Data ---------- */
type ETLStep = {
  number: number;
  title: string;
  subtitle: string;
  icon: typeof Download;
  color: string;
  bgColor: string;
  description: string;
  tools: string[];
  details: string[];
};

const ETL_STEPS: ETLStep[] = [
  {
    number: 1,
    title: "Extracción",
    subtitle: "Obtención de datos brutos",
    icon: Download,
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-200",
    description:
      "Recolección automatizada y manual de datos desde múltiples fuentes. Se emplean diferentes técnicas según el tipo de fuente y el formato de los datos disponibles.",
    tools: ["Python (requests, BeautifulSoup)", "APIs REST", "cron jobs", "Supabase Edge Functions"],
    details: [
      "APIs públicas: Conexión directa a endpoints REST de DANE, SIATA y otras entidades con autenticación cuando es requerida.",
      "Web scraping: Extracción estructurada de datos publicados en portales web del Concejo y entidades municipales, respetando robots.txt.",
      "Archivos CSV/Excel: Descarga y lectura automatizada de archivos publicados periódicamente en portales de datos abiertos (MEData).",
      "Carga manual: Para fuentes que solo proporcionan datos en formato PDF o mediante solicitud directa, se realiza transcripción asistida.",
    ],
  },
  {
    number: 2,
    title: "Validación",
    subtitle: "Control de calidad de datos brutos",
    icon: ShieldCheck,
    color: "text-amber-600",
    bgColor: "bg-amber-50 border-amber-200",
    description:
      "Verificación sistemática de la integridad y calidad de los datos recibidos antes de cualquier transformación. Se aplican reglas de validación definidas por indicador.",
    tools: ["Python (pandas, great_expectations)", "SQL checks", "TypeScript validators"],
    details: [
      "Tipos de datos: Verificación de que cada campo corresponda al tipo esperado (numérico, fecha, texto, geográfico).",
      "Rangos válidos: Comprobación de que los valores numéricos estén dentro de rangos plausibles (ej. tasas entre 0 y 100).",
      "Valores nulos: Identificación y cuantificación de campos vacíos. Se rechazan lotes con más del 5% de campos obligatorios nulos.",
      "Duplicados: Detección de registros duplicados mediante hash de campos clave. Se eliminan duplicados exactos y se marcan parciales.",
      "Anomalías estadísticas: Detección de outliers mediante IQR y z-score para identificar valores atípicos que requieran revisión manual.",
    ],
  },
  {
    number: 3,
    title: "Transformación",
    subtitle: "Normalización y cálculo",
    icon: RefreshCw,
    color: "text-purple-600",
    bgColor: "bg-purple-50 border-purple-200",
    description:
      "Procesamiento de datos validados para generar indicadores, tasas, agregaciones y formatos estandarizados para consumo por la plataforma.",
    tools: ["Python (pandas, numpy)", "SQL (PostgreSQL functions)", "dbt"],
    details: [
      "Normalización: Estandarización de nombres de territorios, códigos DANE, formatos de fecha y unidades de medida.",
      "Cálculo de tasas: Aplicación de fórmulas definidas en la ficha técnica de cada indicador (tasas por 100.000 hab., porcentajes, índices).",
      "Agregación territorial: Suma, promedio o cálculo ponderado de datos de barrio a comuna, de comuna a ciudad.",
      "Agregación temporal: Consolidación de datos diarios a semanales, mensuales, trimestrales y anuales según la periodicidad del indicador.",
      "Enriquecimiento: Cruce con tablas de referencia (territorios, líneas temáticas) para añadir contexto geográfico y temático.",
    ],
  },
  {
    number: 4,
    title: "Carga",
    subtitle: "Inserción en base de datos",
    icon: Upload,
    color: "text-green-600",
    bgColor: "bg-green-50 border-green-200",
    description:
      "Inserción de datos procesados en las tablas de producción de Supabase con control de versiones y políticas de seguridad.",
    tools: ["Supabase client (JS/Python)", "PostgreSQL COPY", "Supabase migrations"],
    details: [
      "Inserción con upsert: Se utiliza INSERT ... ON CONFLICT para actualizar registros existentes sin duplicar datos.",
      "Versionamiento: Cada lote de datos insertado se registra con un ID de versión, fecha y hash del lote para trazabilidad.",
      "RLS (Row Level Security): Los datos se protegen con políticas de acceso a nivel de fila según el rol del usuario (público, analista, admin).",
      "Transacciones: Las inserciones masivas se ejecutan dentro de transacciones atómicas para garantizar consistencia.",
    ],
  },
  {
    number: 5,
    title: "Verificación",
    subtitle: "Tests automatizados post-carga",
    icon: TestTube2,
    color: "text-rose-600",
    bgColor: "bg-rose-50 border-rose-200",
    description:
      "Validación posterior a la carga para confirmar que los datos en producción son correctos y consistentes con las expectativas.",
    tools: ["SQL assertions", "Supabase Edge Functions", "GitHub Actions"],
    details: [
      "Conteo de registros: Verificación de que el número de registros cargados coincide con el número esperado del lote.",
      "Checksums: Comparación de sumas de verificación entre datos fuente y datos cargados para detectar pérdida de datos.",
      "Consistencia referencial: Verificación de que todas las FK apuntan a registros existentes en las tablas relacionadas.",
      "Alertas automáticas: Generación de alertas en la tabla 'alertas' cuando un indicador supera umbrales definidos o muestra cambios bruscos.",
      "Notificaciones: Envío de notificaciones al equipo técnico cuando una verificación falla o se detecta una anomalía.",
    ],
  },
];

export function ProcesoEtlSection() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-serif text-2xl font-bold mb-2">
          Proceso ETL
        </h2>
        <Separator className="mb-4" />
        <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
          Pipeline de Extracción, Transformación y Carga (ETL) utilizado
          para procesar los datos del Observatorio. Cada paso incluye
          controles de calidad y documentación de herramientas utilizadas.
        </p>

        {/* Step-by-step */}
        <div className="space-y-4">
          {ETL_STEPS.map((step) => {
            const Icon = step.icon;
            const isExpanded = expandedStep === step.number;

            return (
              <Card
                key={step.number}
                className={`border transition-all ${isExpanded ? "ring-1 ring-primary/20 shadow-md" : ""}`}
              >
                <button
                  onClick={() =>
                    setExpandedStep(isExpanded ? null : step.number)
                  }
                  className="w-full text-left"
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      {/* Step number with icon */}
                      <div
                        className={`rounded-xl p-3 ${step.bgColor} border shrink-0`}
                      >
                        <Icon className={`h-6 w-6 ${step.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className={`${step.color} text-[10px]`}>
                            Paso {step.number}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">
                          {step.title}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {step.subtitle}
                        </CardDescription>
                      </div>
                      <div className="shrink-0">
                        {isExpanded ? (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </button>

                {isExpanded && (
                  <CardContent className="pt-0">
                    <Separator className="mb-4" />
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Tools */}
                    <div className="mb-4">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                        Herramientas utilizadas
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {step.tools.map((tool) => (
                          <Badge key={tool} variant="secondary" className="text-[10px]">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Details */}
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                        Detalle de operaciones
                      </p>
                      <div className="space-y-2">
                        {step.details.map((detail, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 rounded-md bg-muted/50 p-3"
                          >
                            <Check className={`h-4 w-4 ${step.color} shrink-0 mt-0.5`} />
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Connecting flow indicator */}
        <div className="mt-8">
          <Card className="bg-muted/30 border-dashed">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">
                    Criterio de rechazo de lotes
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Un lote de datos es rechazado si: (1) más del 5% de campos
                    obligatorios son nulos, (2) se detectan más de 3 desviaciones
                    estándar en valores clave, (3) el checksum no coincide con la
                    fuente, o (4) falla cualquier test de integridad referencial.
                    Los lotes rechazados se registran con su motivo y se notifica
                    al equipo técnico para revisión manual.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
