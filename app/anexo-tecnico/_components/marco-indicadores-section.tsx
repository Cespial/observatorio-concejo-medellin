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
import { THEMATIC_LINES } from "@/lib/constants";
import {
  ChevronDown,
  ChevronRight,
  FileText,
} from "lucide-react";

/* ---------- Indicator Type ---------- */
type Indicator = {
  name: string;
  definition: string;
  formula: string;
  unit: string;
  periodicity: string;
  source: string;
  disaggregation: string;
};

type Category = {
  name: string;
  indicators: Indicator[];
};

type ThematicBlock = {
  slug: string;
  categories: Category[];
};

/* ---------- Indicator Taxonomy Data ---------- */
const INDICATOR_TAXONOMY: ThematicBlock[] = [
  {
    slug: "seguridad",
    categories: [
      {
        name: "Delitos contra la vida",
        indicators: [
          {
            name: "Tasa de homicidios",
            definition: "Número de homicidios por cada 100.000 habitantes en un periodo determinado.",
            formula: "(Homicidios / Población) x 100.000",
            unit: "Tasa por 100.000 hab.",
            periodicity: "Mensual",
            source: "Secretaría de Seguridad / SIEDCO",
            disaggregation: "Comuna, corregimiento, sexo, rango de edad",
          },
          {
            name: "Tasa de lesiones personales",
            definition: "Número de casos de lesiones personales por cada 100.000 habitantes.",
            formula: "(Lesiones personales / Población) x 100.000",
            unit: "Tasa por 100.000 hab.",
            periodicity: "Mensual",
            source: "Secretaría de Seguridad",
            disaggregation: "Comuna, tipo de lesión, sexo",
          },
        ],
      },
      {
        name: "Delitos contra el patrimonio",
        indicators: [
          {
            name: "Hurtos totales",
            definition: "Total de hurtos registrados, incluyendo hurto a personas, residencias, comercio y vehículos.",
            formula: "Sumatoria de hurtos por tipología",
            unit: "Número absoluto",
            periodicity: "Mensual",
            source: "Secretaría de Seguridad / SIEDCO",
            disaggregation: "Comuna, tipo de hurto, modalidad",
          },
          {
            name: "Extorsiones",
            definition: "Número de denuncias por extorsión registradas en el municipio.",
            formula: "Conteo de denuncias",
            unit: "Número absoluto",
            periodicity: "Mensual",
            source: "Fiscalía / Policía Nacional",
            disaggregation: "Comuna, actividad económica afectada",
          },
        ],
      },
      {
        name: "Convivencia",
        indicators: [
          {
            name: "Violencia intrafamiliar",
            definition: "Casos reportados de violencia intrafamiliar (física, psicológica, sexual).",
            formula: "Conteo de denuncias",
            unit: "Número absoluto y tasa",
            periodicity: "Mensual",
            source: "Secretaría de Seguridad / CAVIF",
            disaggregation: "Comuna, tipo de violencia, sexo, rango de edad",
          },
          {
            name: "Percepción de seguridad",
            definition: "Porcentaje de ciudadanos que se sienten seguros en su barrio.",
            formula: "(Encuestados que se sienten seguros / Total encuestados) x 100",
            unit: "Porcentaje",
            periodicity: "Anual",
            source: "Encuesta de Percepción Ciudadana — Medellín Cómo Vamos",
            disaggregation: "Estrato, zona, sexo",
          },
        ],
      },
    ],
  },
  {
    slug: "educacion",
    categories: [
      {
        name: "Cobertura y acceso",
        indicators: [
          {
            name: "Cobertura neta en educación básica",
            definition: "Porcentaje de la población en edad escolar que se encuentra matriculada en el nivel correspondiente.",
            formula: "(Matriculados en edad oficial / Población en edad oficial) x 100",
            unit: "Porcentaje",
            periodicity: "Trimestral",
            source: "Secretaría de Educación",
            disaggregation: "Nivel educativo, comuna, sector (oficial/privado)",
          },
          {
            name: "Tasa de deserción escolar",
            definition: "Porcentaje de estudiantes que abandonan el sistema educativo durante el año lectivo.",
            formula: "(Desertores / Matriculados inicio) x 100",
            unit: "Porcentaje",
            periodicity: "Anual",
            source: "Secretaría de Educación",
            disaggregation: "Nivel educativo, comuna, sexo",
          },
        ],
      },
      {
        name: "Calidad educativa",
        indicators: [
          {
            name: "Puntaje promedio Saber 11",
            definition: "Promedio del puntaje global obtenido por estudiantes de Medellín en las pruebas Saber 11.",
            formula: "Promedio aritmético de puntajes globales",
            unit: "Puntaje (0-500)",
            periodicity: "Anual",
            source: "ICFES",
            disaggregation: "Institución educativa, sector, estrato",
          },
          {
            name: "Brecha educativa urbano-rural",
            definition: "Diferencia en puntaje promedio entre instituciones educativas urbanas y rurales.",
            formula: "Promedio urbano - Promedio rural",
            unit: "Puntos de diferencia",
            periodicity: "Anual",
            source: "ICFES / Secretaría de Educación",
            disaggregation: "Zona (urbano/rural)",
          },
        ],
      },
      {
        name: "Cultura y bibliotecas",
        indicators: [
          {
            name: "Asistencia a bibliotecas públicas",
            definition: "Número de visitas registradas en la red de bibliotecas públicas de Medellín.",
            formula: "Sumatoria de visitas registradas",
            unit: "Número de visitas",
            periodicity: "Trimestral",
            source: "Sistema de Bibliotecas Públicas",
            disaggregation: "Biblioteca, comuna, tipo de actividad",
          },
        ],
      },
    ],
  },
  {
    slug: "economia",
    categories: [
      {
        name: "Empleo y mercado laboral",
        indicators: [
          {
            name: "Tasa de desempleo",
            definition: "Porcentaje de la población económicamente activa que se encuentra desempleada.",
            formula: "(Desocupados / PEA) x 100",
            unit: "Porcentaje",
            periodicity: "Trimestral",
            source: "DANE — GEIH",
            disaggregation: "Sexo, rango de edad, nivel educativo",
          },
          {
            name: "Tasa de informalidad",
            definition: "Porcentaje de ocupados que trabajan en condiciones de informalidad laboral.",
            formula: "(Ocupados informales / Total ocupados) x 100",
            unit: "Porcentaje",
            periodicity: "Trimestral",
            source: "DANE — GEIH",
            disaggregation: "Sexo, rama de actividad económica",
          },
        ],
      },
      {
        name: "Tejido empresarial",
        indicators: [
          {
            name: "Empresas creadas",
            definition: "Número de nuevas empresas registradas en la Cámara de Comercio.",
            formula: "Conteo de registros nuevos",
            unit: "Número absoluto",
            periodicity: "Mensual",
            source: "Cámara de Comercio de Medellín",
            disaggregation: "Tamaño, actividad CIIU, comuna",
          },
          {
            name: "Tasa de supervivencia empresarial",
            definition: "Porcentaje de empresas que continúan activas después de 3 años desde su creación.",
            formula: "(Empresas activas a 3 años / Empresas creadas) x 100",
            unit: "Porcentaje",
            periodicity: "Anual",
            source: "Cámara de Comercio de Medellín",
            disaggregation: "Tamaño, actividad económica",
          },
        ],
      },
      {
        name: "Pobreza y desigualdad",
        indicators: [
          {
            name: "Incidencia de pobreza monetaria",
            definition: "Porcentaje de la población con ingresos por debajo de la línea de pobreza.",
            formula: "(Población bajo línea de pobreza / Población total) x 100",
            unit: "Porcentaje",
            periodicity: "Anual",
            source: "DANE",
            disaggregation: "Zona (urbano/rural)",
          },
        ],
      },
    ],
  },
  {
    slug: "movilidad",
    categories: [
      {
        name: "Seguridad vial",
        indicators: [
          {
            name: "Tasa de siniestros viales fatales",
            definition: "Muertes en siniestros viales por cada 100.000 habitantes.",
            formula: "(Fallecidos en siniestros / Población) x 100.000",
            unit: "Tasa por 100.000 hab.",
            periodicity: "Mensual",
            source: "Secretaría de Movilidad",
            disaggregation: "Tipo de actor vial, comuna, corredor",
          },
          {
            name: "Siniestros viales totales",
            definition: "Número total de siniestros de tránsito registrados.",
            formula: "Conteo de siniestros",
            unit: "Número absoluto",
            periodicity: "Mensual",
            source: "Secretaría de Movilidad",
            disaggregation: "Gravedad, tipo de actor, comuna",
          },
        ],
      },
      {
        name: "Transporte público",
        indicators: [
          {
            name: "Pasajeros en sistema Metro",
            definition: "Número total de pasajeros transportados por el sistema integrado Metro (metro, tranvía, metrocable, buses).",
            formula: "Sumatoria de validaciones",
            unit: "Número de pasajeros",
            periodicity: "Mensual",
            source: "Metro de Medellín",
            disaggregation: "Línea, estación, tipo de servicio",
          },
        ],
      },
      {
        name: "Movilidad sostenible",
        indicators: [
          {
            name: "Viajes en bicicleta (EnCicla)",
            definition: "Número de viajes realizados en el sistema de bicicletas públicas EnCicla.",
            formula: "Conteo de viajes registrados",
            unit: "Número de viajes",
            periodicity: "Mensual",
            source: "Área Metropolitana / EnCicla",
            disaggregation: "Estación, día de semana",
          },
        ],
      },
    ],
  },
  {
    slug: "ambiente",
    categories: [
      {
        name: "Calidad del aire",
        indicators: [
          {
            name: "Concentración promedio de PM2.5",
            definition: "Promedio mensual de material particulado fino (PM2.5) en microgramos por metro cúbico.",
            formula: "Promedio de mediciones diarias",
            unit: "µg/m³",
            periodicity: "Diario / Mensual",
            source: "SIATA",
            disaggregation: "Estación de monitoreo, zona",
          },
          {
            name: "Días con calidad del aire buena",
            definition: "Número de días en que el ICA (Índice de Calidad del Aire) estuvo en categoría 'Buena'.",
            formula: "Conteo de días con ICA ≤ 50",
            unit: "Días",
            periodicity: "Mensual",
            source: "SIATA",
            disaggregation: "Estación de monitoreo",
          },
        ],
      },
      {
        name: "Gestión ambiental",
        indicators: [
          {
            name: "Tasa de reciclaje",
            definition: "Porcentaje de residuos sólidos que son reciclados o aprovechados.",
            formula: "(Toneladas recicladas / Toneladas generadas) x 100",
            unit: "Porcentaje",
            periodicity: "Trimestral",
            source: "Área Metropolitana / EMVARIAS",
            disaggregation: "Tipo de material, comuna",
          },
        ],
      },
      {
        name: "Espacio público verde",
        indicators: [
          {
            name: "Metros cuadrados de espacio verde por habitante",
            definition: "Superficie de áreas verdes públicas accesibles por habitante.",
            formula: "m² de áreas verdes / Población",
            unit: "m² por habitante",
            periodicity: "Anual",
            source: "Departamento Administrativo de Planeación",
            disaggregation: "Comuna, tipo de espacio verde",
          },
        ],
      },
    ],
  },
  {
    slug: "salud",
    categories: [
      {
        name: "Mortalidad",
        indicators: [
          {
            name: "Tasa de mortalidad infantil",
            definition: "Número de defunciones de menores de un año por cada 1.000 nacidos vivos.",
            formula: "(Defunciones < 1 año / Nacidos vivos) x 1.000",
            unit: "Tasa por 1.000 nacidos vivos",
            periodicity: "Anual",
            source: "Secretaría de Salud / DANE Estadísticas Vitales",
            disaggregation: "Comuna, causa de muerte, sexo",
          },
          {
            name: "Razón de mortalidad materna",
            definition: "Muertes maternas por cada 100.000 nacidos vivos.",
            formula: "(Muertes maternas / Nacidos vivos) x 100.000",
            unit: "Razón por 100.000 nacidos vivos",
            periodicity: "Anual",
            source: "Secretaría de Salud / SIVIGILA",
            disaggregation: "Grupo de edad, régimen de afiliación",
          },
        ],
      },
      {
        name: "Morbilidad y vigilancia",
        indicators: [
          {
            name: "Incidencia de dengue",
            definition: "Casos nuevos de dengue por cada 100.000 habitantes en un periodo determinado.",
            formula: "(Casos nuevos de dengue / Población) x 100.000",
            unit: "Tasa por 100.000 hab.",
            periodicity: "Semanal",
            source: "SIVIGILA / Secretaría de Salud",
            disaggregation: "Comuna, tipo (clásico/grave), semana epidemiológica",
          },
          {
            name: "Cobertura de vacunación",
            definition: "Porcentaje de la población objetivo que recibió el esquema completo de vacunación.",
            formula: "(Vacunados / Población objetivo) x 100",
            unit: "Porcentaje",
            periodicity: "Trimestral",
            source: "Secretaría de Salud / PAI",
            disaggregation: "Tipo de biológico, grupo de edad, comuna",
          },
        ],
      },
      {
        name: "Salud mental",
        indicators: [
          {
            name: "Tasa de intento de suicidio",
            definition: "Intentos de suicidio por cada 100.000 habitantes.",
            formula: "(Intentos de suicidio / Población) x 100.000",
            unit: "Tasa por 100.000 hab.",
            periodicity: "Trimestral",
            source: "SIVIGILA / Secretaría de Salud",
            disaggregation: "Sexo, rango de edad, comuna",
          },
        ],
      },
    ],
  },
];

/* ---------- Component ---------- */
export function MarcoIndicadoresSection() {
  const [expandedLines, setExpandedLines] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedIndicator, setSelectedIndicator] = useState<Indicator | null>(null);

  const toggleLine = (slug: string) =>
    setExpandedLines((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );

  const toggleCategory = (key: string) =>
    setExpandedCategories((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );

  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-serif text-2xl font-bold mb-2">
          Marco de Indicadores
        </h2>
        <Separator className="mb-4" />
        <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
          Taxonomía jerárquica de indicadores organizados por línea temática,
          categoría y ficha técnica. Haga clic en cada nivel para expandir el
          contenido.
        </p>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* Tree */}
          <div className="space-y-2">
            {INDICATOR_TAXONOMY.map((block) => {
              const lineConfig = THEMATIC_LINES.find(
                (l) => l.slug === block.slug
              );
              if (!lineConfig) return null;
              const Icon = lineConfig.icon;
              const isLineExpanded = expandedLines.includes(block.slug);

              return (
                <div key={block.slug}>
                  {/* Thematic Line */}
                  <button
                    onClick={() => toggleLine(block.slug)}
                    className="w-full flex items-center gap-2 rounded-lg p-3 transition-colors hover:bg-muted/50"
                    style={{
                      borderLeft: `4px solid ${lineConfig.color}`,
                    }}
                  >
                    {isLineExpanded ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                    <Icon
                      className="h-4 w-4 shrink-0"
                      style={{ color: lineConfig.color }}
                    />
                    <span className="text-sm font-semibold">
                      {lineConfig.name}
                    </span>
                    <Badge variant="secondary" className="ml-auto text-[10px]">
                      {block.categories.reduce(
                        (acc, cat) => acc + cat.indicators.length,
                        0
                      )}{" "}
                      indicadores
                    </Badge>
                  </button>

                  {/* Categories */}
                  {isLineExpanded && (
                    <div className="ml-6 border-l border-border pl-4 space-y-1 mt-1">
                      {block.categories.map((category) => {
                        const catKey = `${block.slug}-${category.name}`;
                        const isCatExpanded =
                          expandedCategories.includes(catKey);

                        return (
                          <div key={catKey}>
                            <button
                              onClick={() => toggleCategory(catKey)}
                              className="w-full flex items-center gap-2 rounded-md p-2 text-left transition-colors hover:bg-muted/50"
                            >
                              {isCatExpanded ? (
                                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                              ) : (
                                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                              )}
                              <span className="text-sm text-muted-foreground font-medium">
                                {category.name}
                              </span>
                              <span className="text-[10px] text-muted-foreground ml-auto">
                                {category.indicators.length}
                              </span>
                            </button>

                            {/* Indicators */}
                            {isCatExpanded && (
                              <div className="ml-6 border-l border-dashed border-border pl-3 space-y-0.5 mt-0.5">
                                {category.indicators.map((indicator) => (
                                  <button
                                    key={indicator.name}
                                    onClick={() =>
                                      setSelectedIndicator(indicator)
                                    }
                                    className={`w-full flex items-center gap-2 rounded-md p-2 text-left transition-colors text-xs ${
                                      selectedIndicator?.name ===
                                      indicator.name
                                        ? "bg-primary/10 text-primary"
                                        : "hover:bg-muted/50 text-muted-foreground"
                                    }`}
                                  >
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-current shrink-0" />
                                    <span>{indicator.name}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Ficha Técnica Detail */}
          <div className="lg:sticky lg:top-4 self-start">
            {selectedIndicator ? (
              <Card className="shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Ficha Técnica
                    </span>
                  </div>
                  <CardTitle className="text-lg">
                    {selectedIndicator.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                      Definición
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedIndicator.definition}
                    </p>
                  </div>
                  <Separator />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                        Fórmula
                      </p>
                      <p className="text-xs font-mono bg-muted rounded-md p-2">
                        {selectedIndicator.formula}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                        Unidad de medida
                      </p>
                      <p className="text-sm">{selectedIndicator.unit}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                        Periodicidad
                      </p>
                      <Badge variant="secondary">
                        {selectedIndicator.periodicity}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                        Fuente
                      </p>
                      <p className="text-sm">{selectedIndicator.source}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                      Desagregación disponible
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {selectedIndicator.disaggregation
                        .split(", ")
                        .map((item) => (
                          <Badge
                            key={item}
                            variant="outline"
                            className="text-[10px]"
                          >
                            {item}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <FileText className="h-10 w-10 text-muted-foreground/30 mb-4" />
                  <p className="text-sm text-muted-foreground text-center">
                    Seleccione un indicador del árbol para ver su ficha técnica
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
