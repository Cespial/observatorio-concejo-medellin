"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { THEMATIC_LINES } from "@/lib/constants";
import {
  Scale,
  FileText,
  ExternalLink,
  Globe2,
} from "lucide-react";

/* ---------- Legal Framework ---------- */
type LegalNorm = {
  name: string;
  type: string;
  year: number;
  description: string;
  relevance: string;
  url?: string;
};

const LEGAL_NORMS: LegalNorm[] = [
  {
    name: "Ley 1712 de 2014",
    type: "Ley Nacional",
    year: 2014,
    description:
      "Ley de Transparencia y del Derecho de Acceso a la Información Pública Nacional. Establece la obligación de las entidades públicas de publicar información de manera proactiva.",
    relevance:
      "Fundamento legal para la publicación de datos abiertos y la transparencia de la información del Concejo y el Observatorio. Obliga a garantizar el acceso ciudadano a la información pública.",
    url: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=56882",
  },
  {
    name: "Ley 1581 de 2012",
    type: "Ley Nacional",
    year: 2012,
    description:
      "Régimen General de Protección de Datos Personales. Regula la recolección, almacenamiento, uso, circulación y supresión de datos personales.",
    relevance:
      "Marco para el tratamiento de datos personales en el Observatorio. Garantiza que los datos publicados sean anonimizados y agregados, protegiendo la privacidad de los ciudadanos.",
    url: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981",
  },
  {
    name: "Acuerdo Municipal 28 de 2023",
    type: "Acuerdo Municipal",
    year: 2023,
    description:
      "Acuerdo por medio del cual se crea el Observatorio Distrital del Concejo de Medellín como herramienta de seguimiento, monitoreo y evaluación de políticas públicas.",
    relevance:
      "Acto normativo fundacional del Observatorio. Define su objeto, alcance, estructura de gobernanza, líneas temáticas y mecanismos de articulación institucional.",
  },
  {
    name: "Plan de Desarrollo Municipal 2024-2027",
    type: "Acuerdo Municipal",
    year: 2024,
    description:
      "Plan de Desarrollo del Distrito Especial de Ciencia, Tecnología e Innovación de Medellín. Define las metas, programas y proyectos del gobierno municipal.",
    relevance:
      "Referente principal para el seguimiento de indicadores. El Observatorio monitorea el cumplimiento de metas del PDM a través de los indicadores temáticos definidos.",
  },
  {
    name: "Ley 1955 de 2019 (Plan Nacional de Desarrollo)",
    type: "Ley Nacional",
    year: 2019,
    description:
      "Plan Nacional de Desarrollo 2018-2022 que establece lineamientos sobre gobierno digital, datos abiertos e innovación pública.",
    relevance:
      "Contexto normativo nacional para la apertura de datos, interoperabilidad y uso de tecnología en la gestión pública territorial.",
  },
  {
    name: "CONPES 3920 de 2018",
    type: "Documento CONPES",
    year: 2018,
    description:
      "Política Nacional de Explotación de Datos (Big Data). Establece lineamientos para el aprovechamiento de datos en la toma de decisiones públicas.",
    relevance:
      "Marco de política pública para el uso de datos en el Observatorio. Promueve la cultura de decisiones basadas en evidencia y la gobernanza de datos.",
  },
];

/* ---------- ODS Alignment ---------- */
type ODSAlignment = {
  lineSlug: string;
  ods: number[];
};

const ODS_ALIGNMENT: ODSAlignment[] = [
  { lineSlug: "seguridad", ods: [5, 11, 16] },
  { lineSlug: "educacion", ods: [4, 5, 10] },
  { lineSlug: "economia", ods: [1, 8, 9, 10] },
  { lineSlug: "movilidad", ods: [9, 11, 13] },
  { lineSlug: "ambiente", ods: [6, 7, 11, 13, 15] },
  { lineSlug: "salud", ods: [2, 3, 5, 6] },
];

const ODS_NAMES: Record<number, string> = {
  1: "Fin de la pobreza",
  2: "Hambre cero",
  3: "Salud y bienestar",
  4: "Educación de calidad",
  5: "Igualdad de género",
  6: "Agua limpia y saneamiento",
  7: "Energía asequible",
  8: "Trabajo decente",
  9: "Industria e innovación",
  10: "Reducción de desigualdades",
  11: "Ciudades sostenibles",
  12: "Producción responsable",
  13: "Acción por el clima",
  14: "Vida submarina",
  15: "Vida de ecosistemas terrestres",
  16: "Paz, justicia e instituciones",
  17: "Alianzas para los objetivos",
};

const ODS_COLORS: Record<number, string> = {
  1: "bg-red-600",
  2: "bg-amber-600",
  3: "bg-green-600",
  4: "bg-red-500",
  5: "bg-orange-500",
  6: "bg-sky-500",
  7: "bg-yellow-500",
  8: "bg-rose-700",
  9: "bg-orange-600",
  10: "bg-pink-600",
  11: "bg-amber-500",
  12: "bg-yellow-700",
  13: "bg-green-700",
  14: "bg-blue-600",
  15: "bg-lime-600",
  16: "bg-blue-800",
  17: "bg-indigo-700",
};

const RELEVANT_ODS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 16];

export function MarcoNormativoSection() {
  return (
    <div className="space-y-12">
      {/* Legal Framework */}
      <section>
        <h2 className="font-serif text-2xl font-bold mb-2">
          Marco Normativo
        </h2>
        <Separator className="mb-4" />
        <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
          Normas, leyes y acuerdos que fundamentan la creación, operación y
          obligaciones del Observatorio Distrital del Concejo de Medellín.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {LEGAL_NORMS.map((norm) => (
            <Card key={norm.name} className="h-full">
              <CardHeader className="pb-2">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-muted p-2 shrink-0">
                    {norm.type.includes("Ley") ? (
                      <Scale className="h-5 w-5 text-primary" />
                    ) : norm.type.includes("CONPES") ? (
                      <Globe2 className="h-5 w-5 text-primary" />
                    ) : (
                      <FileText className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-sm">{norm.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-[10px]">
                        {norm.type}
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">
                        {norm.year}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {norm.description}
                </p>
                <div className="rounded-md bg-primary/5 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-primary font-semibold mb-1">
                    Relevancia para el Observatorio
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {norm.relevance}
                  </p>
                </div>
                {norm.url && (
                  <a
                    href={norm.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Ver texto completo
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ODS Alignment Matrix */}
      <section>
        <h2 className="font-serif text-2xl font-bold mb-2">
          Alineación con Objetivos de Desarrollo Sostenible (ODS)
        </h2>
        <Separator className="mb-4" />
        <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
          Matriz de alineación entre las líneas temáticas del Observatorio y
          los Objetivos de Desarrollo Sostenible de la Agenda 2030 de Naciones
          Unidas.
        </p>

        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 font-semibold min-w-[180px] sticky left-0 bg-card z-10">
                      Línea Temática
                    </th>
                    {RELEVANT_ODS.map((ods) => (
                      <th
                        key={ods}
                        className="text-center py-2 px-1 font-semibold min-w-[40px]"
                        title={ODS_NAMES[ods]}
                      >
                        <div className="flex flex-col items-center gap-0.5">
                          <span
                            className={`inline-flex items-center justify-center h-6 w-6 rounded-md text-white text-[10px] font-bold ${ODS_COLORS[ods]}`}
                          >
                            {ods}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ODS_ALIGNMENT.map((alignment) => {
                    const lineConfig = THEMATIC_LINES.find(
                      (l) => l.slug === alignment.lineSlug
                    );
                    if (!lineConfig) return null;
                    const Icon = lineConfig.icon;

                    return (
                      <tr
                        key={alignment.lineSlug}
                        className="border-b last:border-0 hover:bg-muted/50"
                      >
                        <td className="py-3 px-3 sticky left-0 bg-card z-10">
                          <div className="flex items-center gap-2">
                            <div
                              className="h-2 w-2 rounded-full shrink-0"
                              style={{ backgroundColor: lineConfig.color }}
                            />
                            <Icon
                              className="h-3.5 w-3.5 shrink-0"
                              style={{ color: lineConfig.color }}
                            />
                            <span className="font-medium whitespace-nowrap">
                              {lineConfig.name}
                            </span>
                          </div>
                        </td>
                        {RELEVANT_ODS.map((ods) => {
                          const isAligned = alignment.ods.includes(ods);
                          return (
                            <td key={ods} className="text-center py-3 px-1">
                              {isAligned ? (
                                <div
                                  className="mx-auto h-5 w-5 rounded-md flex items-center justify-center"
                                  style={{
                                    backgroundColor: lineConfig.color,
                                    opacity: 0.8,
                                  }}
                                  title={`${lineConfig.name} → ODS ${ods}: ${ODS_NAMES[ods]}`}
                                >
                                  <span className="text-white text-[9px] font-bold">
                                    ✓
                                  </span>
                                </div>
                              ) : (
                                <div className="mx-auto h-5 w-5 rounded-md bg-muted/30" />
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ODS Legend */}
            <div className="mt-6 border-t pt-4">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-3">
                Objetivos de Desarrollo Sostenible incluidos
              </p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {RELEVANT_ODS.map((ods) => (
                  <div key={ods} className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center justify-center h-5 w-5 rounded-md text-white text-[9px] font-bold shrink-0 ${ODS_COLORS[ods]}`}
                    >
                      {ods}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {ODS_NAMES[ods]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
