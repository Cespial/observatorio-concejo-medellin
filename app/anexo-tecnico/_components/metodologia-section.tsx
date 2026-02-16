"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  FileSearch,
  Layers,
  BarChart3,
  Eye,
} from "lucide-react";

/* ---------- Pipeline Steps ---------- */
const PIPELINE_STEPS = [
  {
    title: "Recolección",
    icon: Download,
    color: "bg-blue-500",
    lightColor: "bg-blue-50 border-blue-200",
    textColor: "text-blue-700",
    description:
      "Obtención de datos desde APIs públicas, portales de datos abiertos, archivos CSV/Excel y scraping automatizado de fuentes oficiales.",
  },
  {
    title: "Validación",
    icon: ShieldCheck,
    color: "bg-amber-500",
    lightColor: "bg-amber-50 border-amber-200",
    textColor: "text-amber-700",
    description:
      "Verificación de tipos de datos, rangos válidos, detección de nulos, duplicados y anomalías estadísticas.",
  },
  {
    title: "Transformación",
    icon: RefreshCw,
    color: "bg-purple-500",
    lightColor: "bg-purple-50 border-purple-200",
    textColor: "text-purple-700",
    description:
      "Normalización, cálculo de tasas e indicadores, agregación territorial y temporal, estandarización de unidades.",
  },
  {
    title: "Almacenamiento",
    icon: Layers,
    color: "bg-green-500",
    lightColor: "bg-green-50 border-green-200",
    textColor: "text-green-700",
    description:
      "Inserción en base de datos PostgreSQL (Supabase) con versionamiento, trazabilidad y políticas de seguridad a nivel de fila (RLS).",
  },
  {
    title: "Visualización",
    icon: Eye,
    color: "bg-rose-500",
    lightColor: "bg-rose-50 border-rose-200",
    textColor: "text-rose-700",
    description:
      "Gráficos interactivos, mapas coropléticos, tablas dinámicas y paneles temáticos accesibles al ciudadano.",
  },
];

/* ---------- Quality Criteria ---------- */
const QUALITY_CRITERIA = [
  {
    title: "Completitud",
    metric: ">95%",
    metricLabel: "de registros completos",
    description:
      "Se verifica que cada conjunto de datos contenga al menos el 95% de los campos obligatorios con valores válidos. Los registros incompletos son marcados y documentados.",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Consistencia",
    metric: "Validación cruzada",
    metricLabel: "entre fuentes",
    description:
      "Se realizan cruces entre fuentes complementarias para detectar discrepancias. Las inconsistencias se resuelven mediante reglas de priorización documentadas.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Oportunidad",
    metric: "Actualización",
    metricLabel: "según periodicidad definida",
    description:
      "Cada indicador tiene una periodicidad de actualización definida. Se monitorea el cumplimiento y se generan alertas cuando hay retrasos.",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    title: "Trazabilidad",
    metric: "Registro completo",
    metricLabel: "de transformaciones",
    description:
      "Cada transformación aplicada a los datos queda documentada con fecha, responsable, versión del script y justificación del cambio.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

/* ---------- Update Frequency ---------- */
const UPDATE_FREQUENCY = [
  {
    frequency: "Diario",
    badge: "bg-red-100 text-red-700",
    sources: ["SIATA — Calidad del aire (PM2.5, ozono)"],
  },
  {
    frequency: "Semanal",
    badge: "bg-orange-100 text-orange-700",
    sources: [
      "SIVIGILA — Eventos de salud pública",
      "Secretaría de Salud — Vigilancia epidemiológica",
    ],
  },
  {
    frequency: "Mensual",
    badge: "bg-amber-100 text-amber-700",
    sources: [
      "Secretaría de Seguridad — Estadística delictiva",
      "Policía Nacional (SIEDCO) — Delitos",
      "Cámara de Comercio — Registro mercantil",
      "Secretaría de Movilidad — Accidentalidad",
      "Metro de Medellín — Pasajeros transportados",
    ],
  },
  {
    frequency: "Trimestral",
    badge: "bg-blue-100 text-blue-700",
    sources: [
      "DANE GEIH — Empleo y mercado laboral",
      "Secretaría de Educación — Matrícula y cobertura",
      "Área Metropolitana — Indicadores ambientales",
    ],
  },
  {
    frequency: "Anual",
    badge: "bg-green-100 text-green-700",
    sources: [
      "DANE — Censos y proyecciones demográficas",
      "ICFES — Resultados Saber 11",
    ],
  },
  {
    frequency: "Continuo",
    badge: "bg-purple-100 text-purple-700",
    sources: [
      "Concejo de Medellín — Actas, acuerdos, proposiciones",
    ],
  },
];

export function MetodologiaSection() {
  return (
    <div className="space-y-12">
      {/* Enfoque Metodológico */}
      <section>
        <h2 className="font-serif text-2xl font-bold mb-2">
          Enfoque Metodológico
        </h2>
        <Separator className="mb-6" />
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Componente Cuantitativo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                El Observatorio emplea un enfoque de{" "}
                <strong>métodos mixtos</strong> que integra análisis
                cuantitativo y cualitativo. El componente cuantitativo se basa
                en el procesamiento de datos estadísticos provenientes de
                fuentes oficiales, incluyendo registros administrativos, censos,
                encuestas de hogares e indicadores socioeconómicos. Se
                utilizan técnicas de estadística descriptiva, análisis de series
                de tiempo y georreferenciación para identificar tendencias,
                patrones territoriales y brechas sociales.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileSearch className="h-5 w-5 text-green-600" />
                Componente Cualitativo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                El componente cualitativo incorpora el análisis de documentos
                legislativos (acuerdos municipales, proposiciones, actas de
                debate), revisión de informes sectoriales y sistematización de
                buenas prácticas. Se aplican técnicas de análisis de contenido
                para evaluar la pertinencia y alcance de las iniciativas del
                Concejo, vinculándolas con indicadores de impacto y metas del
                Plan de Desarrollo Municipal 2024-2027.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pipeline de Datos */}
      <section>
        <h2 className="font-serif text-2xl font-bold mb-2">
          Pipeline de Datos
        </h2>
        <Separator className="mb-6" />
        <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
          Flujo completo desde la recolección de datos brutos hasta su
          visualización en la plataforma. Cada etapa incluye controles de
          calidad y documentación de transformaciones.
        </p>

        {/* Flowchart */}
        <div className="flex flex-col lg:flex-row items-stretch gap-2 lg:gap-0">
          {PIPELINE_STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex items-center lg:flex-1">
                <Card
                  className={`flex-1 border ${step.lightColor} transition-shadow hover:shadow-md`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`rounded-lg p-2 ${step.color} text-white`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <Badge variant="outline" className={step.textColor}>
                          Paso {index + 1}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-base mt-2">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
                {index < PIPELINE_STEPS.length - 1 && (
                  <div className="flex items-center justify-center px-1 shrink-0">
                    <ArrowRight className="h-5 w-5 text-muted-foreground hidden lg:block" />
                    <svg
                      className="h-5 w-5 text-muted-foreground lg:hidden"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a.75.75 0 01.53.22l4 4a.75.75 0 01-1.06 1.06L10.75 5.56V16a.75.75 0 01-1.5 0V5.56L6.53 8.28a.75.75 0 01-1.06-1.06l4-4A.75.75 0 0110 3z"
                        clipRule="evenodd"
                        transform="rotate(180 10 10)"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Criterios de Calidad */}
      <section>
        <h2 className="font-serif text-2xl font-bold mb-2">
          Criterios de Aseguramiento de Calidad
        </h2>
        <Separator className="mb-6" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUALITY_CRITERIA.map((criteria) => (
            <Card key={criteria.title} className="relative overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-1 ${criteria.bgColor}`} />
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`h-5 w-5 ${criteria.color}`} />
                  <CardTitle className="text-base">{criteria.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className={`rounded-md p-2 ${criteria.bgColor} mb-3`}>
                  <p className={`text-sm font-semibold ${criteria.color}`}>
                    {criteria.metric}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {criteria.metricLabel}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {criteria.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Frecuencia de Actualización */}
      <section>
        <h2 className="font-serif text-2xl font-bold mb-2">
          Frecuencia de Actualización
        </h2>
        <Separator className="mb-6" />
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">
                      Periodicidad
                    </th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Fuentes / Indicadores
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {UPDATE_FREQUENCY.map((item) => (
                    <tr
                      key={item.frequency}
                      className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-3 px-4 align-top">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${item.badge}`}
                        >
                          {item.frequency}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <ul className="space-y-1">
                          {item.sources.map((source) => (
                            <li
                              key={source}
                              className="text-muted-foreground text-xs"
                            >
                              {source}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
