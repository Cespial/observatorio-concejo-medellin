"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search, BookOpen } from "lucide-react";

/* ---------- Glossary Data ---------- */
type GlossaryTerm = {
  term: string;
  definition: string;
  category?: string;
};

const GLOSSARY_TERMS: GlossaryTerm[] = [
  // A
  {
    term: "Acuerdo Municipal",
    definition:
      "Norma jurídica de carácter general expedida por el Concejo Municipal. Es el instrumento legislativo principal del nivel local y tiene fuerza de ley dentro del municipio.",
    category: "Legislativo",
  },
  {
    term: "Área Metropolitana",
    definition:
      "Entidad administrativa formada por un conjunto de municipios contiguos que comparten relaciones funcionales. El Área Metropolitana del Valle de Aburrá agrupa 10 municipios incluida Medellín.",
    category: "Territorio",
  },
  {
    term: "API",
    definition:
      "Interfaz de Programación de Aplicaciones (Application Programming Interface). Conjunto de protocolos y herramientas que permiten la comunicación entre diferentes sistemas de software para intercambiar datos.",
    category: "Tecnología",
  },
  // B
  {
    term: "Barrio",
    definition:
      "Unidad territorial menor dentro de una comuna. Medellín cuenta con 249 barrios distribuidos en 16 comunas urbanas.",
    category: "Territorio",
  },
  // C
  {
    term: "Choropleth",
    definition:
      "Tipo de mapa temático en el que las áreas geográficas se colorean o sombrean en proporción a un valor estadístico. Utilizado en el Observatorio para representar indicadores por comuna.",
    category: "Visualización",
  },
  {
    term: "Concejal",
    definition:
      "Miembro elegido del Concejo Municipal. Medellín cuenta con 21 concejales elegidos por voto popular para periodos de cuatro años.",
    category: "Legislativo",
  },
  {
    term: "Cobertura Neta",
    definition:
      "Indicador educativo que mide el porcentaje de la población en edad teórica para cursar un nivel educativo que efectivamente se encuentra matriculada en dicho nivel.",
    category: "Indicador",
  },
  {
    term: "Comuna",
    definition:
      "División administrativa urbana de Medellín. La ciudad tiene 16 comunas urbanas y 5 corregimientos rurales, cada una con su propia Junta Administradora Local (JAL).",
    category: "Territorio",
  },
  {
    term: "Corregimiento",
    definition:
      "División administrativa rural del municipio de Medellín. Son 5 corregimientos: San Sebastián de Palmitas, San Cristóbal, Altavista, San Antonio de Prado y Santa Elena.",
    category: "Territorio",
  },
  // D
  {
    term: "DANE",
    definition:
      "Departamento Administrativo Nacional de Estadística. Entidad del Gobierno de Colombia encargada de producir y difundir estadísticas oficiales del país, incluyendo censos, encuestas y cuentas nacionales.",
    category: "Institución",
  },
  {
    term: "Dato Abierto",
    definition:
      "Dato disponible públicamente que puede ser utilizado, reutilizado y redistribuido libremente por cualquier persona, sujeto como máximo a requisitos de atribución y distribución bajo la misma licencia.",
    category: "Datos",
  },
  {
    term: "Desagregación",
    definition:
      "Proceso de dividir un dato agregado en sus componentes según variables como territorio, sexo, edad, estrato socioeconómico u otras dimensiones de análisis.",
    category: "Datos",
  },
  {
    term: "Deserción Escolar",
    definition:
      "Abandono del sistema educativo por parte de un estudiante antes de completar el nivel educativo en el que se encontraba matriculado, sin obtener la certificación correspondiente.",
    category: "Indicador",
  },
  // E
  {
    term: "ETL",
    definition:
      "Extracción, Transformación y Carga (Extract, Transform, Load). Proceso de integración de datos que consiste en extraer datos de diversas fuentes, transformarlos según reglas de negocio y cargarlos en un sistema destino.",
    category: "Tecnología",
  },
  {
    term: "Encuesta de Hogares",
    definition:
      "Instrumento estadístico aplicado a una muestra representativa de hogares para recoger información sobre condiciones socioeconómicas, empleo, salud y otros temas. La principal es la GEIH del DANE.",
    category: "Datos",
  },
  // F
  {
    term: "Ficha Técnica",
    definition:
      "Documento estandarizado que describe las características metodológicas de un indicador: definición, fórmula de cálculo, unidad de medida, periodicidad, fuente y desagregaciones disponibles.",
    category: "Metodología",
  },
  {
    term: "Fuente de Datos",
    definition:
      "Entidad, sistema o mecanismo del cual se obtienen los datos utilizados para el cálculo de indicadores. Puede ser una entidad gubernamental, un sistema de información o un registro administrativo.",
    category: "Datos",
  },
  // G
  {
    term: "GeoJSON",
    definition:
      "Formato abierto estándar basado en JSON para representar entidades geográficas (puntos, líneas, polígonos) junto con sus propiedades no espaciales. Utilizado en el Observatorio para mapas interactivos.",
    category: "Tecnología",
  },
  {
    term: "Gobernanza de Datos",
    definition:
      "Conjunto de procesos, políticas, estándares y métricas que aseguran el uso efectivo, eficiente y seguro de los datos dentro de una organización. Define roles como Data Owner, Data Steward y Data Analyst.",
    category: "Datos",
  },
  // H
  {
    term: "Homicidio",
    definition:
      "Muerte de una persona causada por otra de manera intencional. Es uno de los principales indicadores de seguridad monitoreados por el Observatorio, medido como tasa por 100.000 habitantes.",
    category: "Indicador",
  },
  {
    term: "Hurto",
    definition:
      "Apoderamiento de bienes ajenos mediante medios distintos a la violencia. Se clasifica en hurto a personas, residencias, comercio, vehículos y motocicletas.",
    category: "Indicador",
  },
  // I
  {
    term: "ICFES",
    definition:
      "Instituto Colombiano para la Evaluación de la Educación. Entidad encargada de las pruebas estandarizadas de evaluación de la calidad educativa, incluyendo las pruebas Saber 11.",
    category: "Institución",
  },
  {
    term: "Indicador",
    definition:
      "Medida cuantitativa o cualitativa derivada de datos observables que permite evaluar y comparar el estado de un fenómeno social, económico o ambiental a lo largo del tiempo o entre territorios.",
    category: "Metodología",
  },
  {
    term: "Informalidad",
    definition:
      "Condición laboral en la que los trabajadores no cuentan con protección social, contrato formal o acceso a prestaciones. Se mide como porcentaje de la población ocupada.",
    category: "Indicador",
  },
  {
    term: "Iniciativa Legislativa",
    definition:
      "Propuesta formal presentada ante el Concejo Municipal para su debate y votación. Incluye proyectos de acuerdo, proposiciones y citaciones a debate.",
    category: "Legislativo",
  },
  // K
  {
    term: "KPI",
    definition:
      "Indicador Clave de Rendimiento (Key Performance Indicator). Métrica cuantificable utilizada para evaluar el progreso hacia un objetivo estratégico específico.",
    category: "Metodología",
  },
  // L
  {
    term: "Línea Temática",
    definition:
      "Eje o dimensión de análisis del Observatorio. El Observatorio trabaja con 6 líneas: Seguridad y Convivencia, Educación y Cultura, Economía y Empleo, Movilidad y Transporte, Medio Ambiente y Salud Pública.",
    category: "Metodología",
  },
  {
    term: "Ley de Transparencia",
    definition:
      "Ley 1712 de 2014 que establece el derecho de acceso a la información pública y las obligaciones de transparencia activa para las entidades del Estado colombiano.",
    category: "Legislativo",
  },
  // M
  {
    term: "Metadata",
    definition:
      "Datos sobre los datos. Información estructurada que describe, explica o facilita la recuperación, uso y gestión de los datos. Incluye origen, fecha, formato, calidad y restricciones de uso.",
    category: "Datos",
  },
  {
    term: "Mortalidad Infantil",
    definition:
      "Número de defunciones de niños menores de un año por cada 1.000 nacidos vivos en un periodo determinado. Es un indicador clave de la calidad del sistema de salud.",
    category: "Indicador",
  },
  {
    term: "Municipio",
    definition:
      "Entidad territorial fundamental de la organización político-administrativa del Estado colombiano. Medellín es un municipio con categoría de Distrito Especial de Ciencia, Tecnología e Innovación.",
    category: "Territorio",
  },
  // N
  {
    term: "NBI (Necesidades Básicas Insatisfechas)",
    definition:
      "Método de medición de pobreza basado en 5 indicadores: vivienda inadecuada, hacinamiento crítico, servicios inadecuados, alta dependencia económica e inasistencia escolar de niños.",
    category: "Indicador",
  },
  // O
  {
    term: "ODS (Objetivos de Desarrollo Sostenible)",
    definition:
      "17 objetivos globales adoptados por las Naciones Unidas en 2015 como parte de la Agenda 2030. Buscan erradicar la pobreza, proteger el planeta y asegurar la prosperidad para todos.",
    category: "Metodología",
  },
  {
    term: "Observatorio",
    definition:
      "Instancia técnica de carácter permanente del Concejo de Medellín, creada para el seguimiento, monitoreo y evaluación de políticas públicas mediante indicadores y datos abiertos.",
    category: "Institución",
  },
  // P
  {
    term: "PDM (Plan de Desarrollo Municipal)",
    definition:
      "Instrumento de planificación que define la hoja de ruta del gobierno municipal para un periodo de cuatro años. Contiene las metas, programas, proyectos y recursos de la administración.",
    category: "Legislativo",
  },
  {
    term: "PM2.5",
    definition:
      "Material particulado fino con diámetro aerodinámico menor a 2.5 micrómetros. Es uno de los contaminantes atmosféricos más perjudiciales para la salud y un indicador clave de calidad del aire.",
    category: "Indicador",
  },
  {
    term: "Proposición",
    definition:
      "Instrumento mediante el cual los concejales solicitan información a la administración municipal o citan a funcionarios a sesiones de control político.",
    category: "Legislativo",
  },
  // R
  {
    term: "Radicación",
    definition:
      "Acto formal de presentación de un proyecto de acuerdo o proposición ante la Secretaría General del Concejo, que inicia su trámite legislativo oficial.",
    category: "Legislativo",
  },
  {
    term: "Reciclaje",
    definition:
      "Proceso de transformación de residuos sólidos para su aprovechamiento como materia prima en nuevos procesos productivos. La tasa de reciclaje es un indicador ambiental monitoreado.",
    category: "Indicador",
  },
  {
    term: "RLS (Row Level Security)",
    definition:
      "Mecanismo de seguridad a nivel de fila en PostgreSQL/Supabase que permite controlar qué filas de una tabla pueden ser accedidas por cada usuario según su rol.",
    category: "Tecnología",
  },
  // S
  {
    term: "Saber 11",
    definition:
      "Prueba estandarizada aplicada por el ICFES a estudiantes de último año de educación media en Colombia. Evalúa competencias en lectura crítica, matemáticas, ciencias sociales, ciencias naturales e inglés.",
    category: "Indicador",
  },
  {
    term: "SIATA",
    definition:
      "Sistema de Alerta Temprana de Medellín y el Valle de Aburrá. Monitorea en tiempo real variables hidrometeorológicas y de calidad del aire para la gestión del riesgo.",
    category: "Institución",
  },
  {
    term: "SIVIGILA",
    definition:
      "Sistema Nacional de Vigilancia en Salud Pública de Colombia. Recolecta, procesa y analiza información sobre eventos de interés en salud pública como enfermedades transmisibles y mortalidad evitable.",
    category: "Institución",
  },
  {
    term: "Supabase",
    definition:
      "Plataforma de backend como servicio (BaaS) de código abierto basada en PostgreSQL. Utilizada como infraestructura de base de datos y autenticación del Observatorio.",
    category: "Tecnología",
  },
  // T
  {
    term: "Tasa",
    definition:
      "Cociente entre el número de eventos y la población expuesta al riesgo, generalmente multiplicado por un factor (1.000, 10.000 o 100.000) para facilitar la interpretación y comparación entre territorios.",
    category: "Metodología",
  },
  {
    term: "Territorio",
    definition:
      "Unidad geográfica utilizada para la desagregación de indicadores. En el contexto del Observatorio incluye: ciudad, comuna, corregimiento y barrio.",
    category: "Territorio",
  },
  {
    term: "Trazabilidad",
    definition:
      "Capacidad de rastrear el origen, procesamiento y transformaciones aplicadas a un dato desde su fuente hasta su presentación final. Es un principio fundamental de calidad de datos.",
    category: "Datos",
  },
  // V
  {
    term: "Vacunación",
    definition:
      "Administración de preparados biológicos (vacunas) para generar inmunidad contra enfermedades infecciosas. La cobertura de vacunación es un indicador clave de salud pública.",
    category: "Indicador",
  },
  {
    term: "Violencia Intrafamiliar",
    definition:
      "Todo acto de violencia física, psicológica, sexual o económica que tiene lugar dentro del ámbito familiar. Es un delito monitoreado por el Observatorio con desagregación por tipo, género y territorio.",
    category: "Indicador",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Legislativo: "bg-blue-100 text-blue-700",
  Territorio: "bg-green-100 text-green-700",
  Tecnología: "bg-purple-100 text-purple-700",
  Datos: "bg-amber-100 text-amber-700",
  Indicador: "bg-rose-100 text-rose-700",
  Metodología: "bg-cyan-100 text-cyan-700",
  Institución: "bg-indigo-100 text-indigo-700",
  Visualización: "bg-orange-100 text-orange-700",
};

export function GlosarioSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTerms = useMemo(() => {
    if (!searchQuery.trim()) return GLOSSARY_TERMS;
    const query = searchQuery.toLowerCase();
    return GLOSSARY_TERMS.filter(
      (t) =>
        t.term.toLowerCase().includes(query) ||
        t.definition.toLowerCase().includes(query) ||
        (t.category && t.category.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  // Group by first letter
  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach((term) => {
      const letter = term.term[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(term);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredTerms]);

  // All unique categories
  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    GLOSSARY_TERMS.forEach((t) => {
      if (t.category) cats.add(t.category);
    });
    return Array.from(cats).sort();
  }, []);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-serif text-2xl font-bold mb-2">Glosario</h2>
        <Separator className="mb-4" />
        <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
          Definiciones de los términos técnicos, institucionales y
          metodológicos utilizados en el Observatorio. Contiene{" "}
          {GLOSSARY_TERMS.length} términos organizados alfabéticamente.
        </p>

        {/* Search and category summary */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar término, definición o categoría..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-1.5 items-center">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSearchQuery(cat)}
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors hover:opacity-80 ${CATEGORY_COLORS[cat] || "bg-gray-100 text-gray-700"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Alphabet quick nav */}
        <div className="flex flex-wrap gap-1 mb-6">
          {groupedTerms.map(([letter]) => (
            <a
              key={letter}
              href={`#glosario-${letter}`}
              className="inline-flex items-center justify-center h-7 w-7 rounded-md text-xs font-semibold bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {letter}
            </a>
          ))}
        </div>

        {/* Terms */}
        {groupedTerms.length > 0 ? (
          <div className="space-y-6">
            {groupedTerms.map(([letter, terms]) => (
              <div key={letter} id={`glosario-${letter}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                    {letter}
                  </span>
                  <Separator className="flex-1" />
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {terms.map((item) => (
                    <Card key={item.term} className="hover:shadow-sm transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-sm font-semibold">{item.term}</h3>
                          {item.category && (
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-semibold shrink-0 ${CATEGORY_COLORS[item.category] || "bg-gray-100 text-gray-700"}`}
                            >
                              {item.category}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {item.definition}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <BookOpen className="h-10 w-10 text-muted-foreground/30 mb-4" />
              <p className="text-sm text-muted-foreground text-center">
                No se encontraron términos que coincidan con &quot;{searchQuery}&quot;
              </p>
            </CardContent>
          </Card>
        )}

        {/* Total count */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Mostrando {filteredTerms.length} de {GLOSSARY_TERMS.length} términos
          </p>
        </div>
      </section>
    </div>
  );
}
