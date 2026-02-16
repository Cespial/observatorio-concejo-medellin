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
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  ChevronRight,
  Search,
  Globe,
  FileSpreadsheet,
  Calendar,
  MapPin,
  Database,
  ExternalLink,
} from "lucide-react";

/* ---------- Sources Data ---------- */
type DataSource = {
  id: number;
  name: string;
  entity: string;
  description: string;
  frequency: string;
  scope: string;
  dataFormat: string;
  coveragePeriod: string;
  accessMethod: string;
  url: string;
};

const DATA_SOURCES: DataSource[] = [
  {
    id: 1,
    name: "Demografía, censos y encuestas",
    entity: "DANE",
    description:
      "Censos de población, proyecciones demográficas, estadísticas vitales y encuestas nacionales. Incluye datos desagregados por municipio, comuna y corregimiento cuando están disponibles.",
    frequency: "Anual",
    scope: "Nacional",
    dataFormat: "CSV, XLSX, API REST",
    coveragePeriod: "2005 - presente",
    accessMethod: "Portal de datos abiertos DANE",
    url: "https://www.dane.gov.co",
  },
  {
    id: 2,
    name: "Delitos y contravenciones",
    entity: "Secretaría de Seguridad",
    description:
      "Registros de hechos delictivos reportados en Medellín, incluyendo homicidios, hurtos, lesiones personales, extorsiones y violencia intrafamiliar. Datos georreferenciados por comuna y barrio.",
    frequency: "Mensual",
    scope: "Municipal",
    dataFormat: "CSV, JSON",
    coveragePeriod: "2018 - presente",
    accessMethod: "Solicitud directa / MEData",
    url: "https://medata.gov.co",
  },
  {
    id: 3,
    name: "Estadística delictiva (SIEDCO)",
    entity: "Policía Nacional",
    description:
      "Sistema de Información Estadístico, Delincuencial, Contravencional y Operativo. Consolidado nacional de delitos con desagregación departamental y municipal.",
    frequency: "Mensual",
    scope: "Nacional",
    dataFormat: "XLSX, PDF",
    coveragePeriod: "2010 - presente",
    accessMethod: "Portal institucional Policía Nacional",
    url: "https://www.policia.gov.co",
  },
  {
    id: 4,
    name: "Matrícula y cobertura educativa",
    entity: "Secretaría de Educación",
    description:
      "Datos de matrícula oficial y privada, cobertura neta y bruta por nivel educativo, deserción escolar y aprobación. Desagregado por institución educativa, comuna y corregimiento.",
    frequency: "Trimestral",
    scope: "Municipal",
    dataFormat: "CSV, XLSX",
    coveragePeriod: "2015 - presente",
    accessMethod: "Sistema de Matrícula / MEData",
    url: "https://medata.gov.co",
  },
  {
    id: 5,
    name: "Resultados Saber 11",
    entity: "ICFES",
    description:
      "Resultados de las pruebas estandarizadas Saber 11 aplicadas a estudiantes de último año de educación media. Incluye puntajes por área, promedios por institución y municipio.",
    frequency: "Anual",
    scope: "Nacional",
    dataFormat: "CSV, SAS, SPSS",
    coveragePeriod: "2006 - presente",
    accessMethod: "FTP de datos abiertos ICFES",
    url: "https://www.icfes.gov.co",
  },
  {
    id: 6,
    name: "Gran Encuesta Integrada de Hogares (GEIH)",
    entity: "DANE",
    description:
      "Indicadores del mercado laboral: tasa de desempleo, ocupación, informalidad, ingresos laborales. Representatividad para las 13 principales ciudades, incluida Medellín.",
    frequency: "Trimestral",
    scope: "Nacional",
    dataFormat: "CSV, XLSX, Microdatos",
    coveragePeriod: "2007 - presente",
    accessMethod: "Portal de datos abiertos DANE / Microdatos",
    url: "https://www.dane.gov.co",
  },
  {
    id: 7,
    name: "Registro mercantil",
    entity: "Cámara de Comercio",
    description:
      "Creación y cancelación de empresas, renovaciones mercantiles, distribución por actividad económica (CIIU) y tamaño empresarial en el Área Metropolitana.",
    frequency: "Mensual",
    scope: "Municipal",
    dataFormat: "XLSX, PDF",
    coveragePeriod: "2016 - presente",
    accessMethod: "Informes periódicos / Solicitud directa",
    url: "https://www.camaramedellin.com.co",
  },
  {
    id: 8,
    name: "Accidentalidad y flujos vehiculares",
    entity: "Secretaría de Movilidad",
    description:
      "Registros de accidentes de tránsito (con lesionados y fallecidos), flujos vehiculares en intersecciones principales y datos de la red ciclista.",
    frequency: "Mensual",
    scope: "Municipal",
    dataFormat: "CSV, GeoJSON",
    coveragePeriod: "2015 - presente",
    accessMethod: "MEData / Geoportal de Movilidad",
    url: "https://medata.gov.co",
  },
  {
    id: 9,
    name: "Pasajeros y operación",
    entity: "Metro de Medellín",
    description:
      "Datos de pasajeros transportados por línea (Metro, Tranvía, Metrocable, buses alimentadores), indicadores de operación y puntualidad del sistema.",
    frequency: "Mensual",
    scope: "Municipal",
    dataFormat: "XLSX, PDF",
    coveragePeriod: "2012 - presente",
    accessMethod: "Informe de gestión / Solicitud directa",
    url: "https://www.metrodemedellin.gov.co",
  },
  {
    id: 10,
    name: "Calidad del aire",
    entity: "SIATA",
    description:
      "Mediciones en tiempo real de material particulado (PM2.5, PM10), ozono, dióxido de nitrógeno y otras variables ambientales en las estaciones de monitoreo del Valle de Aburrá.",
    frequency: "Diario",
    scope: "Municipal",
    dataFormat: "CSV, API REST, JSON",
    coveragePeriod: "2013 - presente",
    accessMethod: "API pública SIATA / Portal de datos",
    url: "https://siata.gov.co",
  },
  {
    id: 11,
    name: "Indicadores ambientales",
    entity: "Área Metropolitana",
    description:
      "Indicadores de gestión ambiental: residuos sólidos, reciclaje, cobertura de áreas verdes, consumo de agua per cápita y emisiones de gases de efecto invernadero.",
    frequency: "Trimestral",
    scope: "Regional",
    dataFormat: "XLSX, PDF",
    coveragePeriod: "2016 - presente",
    accessMethod: "Informes institucionales / Solicitud directa",
    url: "https://www.metropol.gov.co",
  },
  {
    id: 12,
    name: "Vigilancia epidemiológica",
    entity: "Secretaría de Salud",
    description:
      "Eventos de notificación obligatoria: dengue, malaria, enfermedades respiratorias agudas, mortalidad materna e infantil, cobertura de vacunación.",
    frequency: "Semanal",
    scope: "Municipal",
    dataFormat: "CSV, XLSX",
    coveragePeriod: "2015 - presente",
    accessMethod: "SIVIGILA local / Solicitud directa",
    url: "https://www.medellin.gov.co/salud",
  },
  {
    id: 13,
    name: "Eventos de salud pública",
    entity: "SIVIGILA",
    description:
      "Sistema Nacional de Vigilancia en Salud Pública. Consolidado de eventos de interés en salud pública con desagregación por departamento y municipio.",
    frequency: "Semanal",
    scope: "Nacional",
    dataFormat: "CSV, XLSX",
    coveragePeriod: "2007 - presente",
    accessMethod: "Portal INS / Datos abiertos",
    url: "https://www.ins.gov.co",
  },
  {
    id: 14,
    name: "Actas, acuerdos y proposiciones",
    entity: "Concejo de Medellín",
    description:
      "Registro legislativo completo: proyectos de acuerdo, acuerdos aprobados, proposiciones, debates de control político y actas de sesiones plenarias y de comisión.",
    frequency: "Continuo",
    scope: "Municipal",
    dataFormat: "PDF, XLSX, JSON",
    coveragePeriod: "2020 - presente",
    accessMethod: "Secretaría General del Concejo / Scraping",
    url: "https://www.concejodemedellin.gov.co",
  },
];

const FREQUENCY_COLORS: Record<string, string> = {
  Diario: "bg-red-100 text-red-700",
  Semanal: "bg-orange-100 text-orange-700",
  Mensual: "bg-amber-100 text-amber-700",
  Trimestral: "bg-blue-100 text-blue-700",
  Anual: "bg-green-100 text-green-700",
  Continuo: "bg-purple-100 text-purple-700",
};

const SCOPE_COLORS: Record<string, string> = {
  Nacional: "bg-sky-100 text-sky-700",
  Municipal: "bg-emerald-100 text-emerald-700",
  Regional: "bg-violet-100 text-violet-700",
};

export function FuentesSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredSources = DATA_SOURCES.filter(
    (source) =>
      source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-serif text-2xl font-bold mb-2">
          Fuentes de Datos
        </h2>
        <Separator className="mb-4" />
        <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
          El Observatorio integra {DATA_SOURCES.length} fuentes de datos oficiales
          provenientes de entidades de orden municipal, regional y nacional.
          Cada fuente está documentada con su periodicidad, cobertura y método
          de acceso.
        </p>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar fuente por nombre, entidad o descripción..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Summary badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="outline" className="gap-1">
            <Database className="h-3 w-3" />
            {DATA_SOURCES.length} fuentes
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Globe className="h-3 w-3" />
            {DATA_SOURCES.filter((s) => s.scope === "Nacional").length} nacionales
          </Badge>
          <Badge variant="outline" className="gap-1">
            <MapPin className="h-3 w-3" />
            {DATA_SOURCES.filter((s) => s.scope === "Municipal").length} municipales
          </Badge>
        </div>

        {/* Sources list */}
        <div className="space-y-3">
          {filteredSources.map((source) => {
            const isExpanded = expandedId === source.id;
            return (
              <Card
                key={source.id}
                className={`transition-all ${isExpanded ? "ring-1 ring-primary/20 shadow-md" : "hover:shadow-sm"}`}
              >
                <button
                  onClick={() =>
                    setExpandedId(isExpanded ? null : source.id)
                  }
                  className="w-full text-left"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <span className="text-xs text-muted-foreground font-mono mt-1 shrink-0 w-5 text-right">
                          {source.id}.
                        </span>
                        <div className="min-w-0">
                          <CardTitle className="text-sm flex items-center gap-2 flex-wrap">
                            <span className="font-bold">{source.entity}</span>
                            <span className="text-muted-foreground font-normal">
                              — {source.name}
                            </span>
                          </CardTitle>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${FREQUENCY_COLORS[source.frequency] || ""}`}
                            >
                              <Calendar className="h-3 w-3" />
                              {source.frequency}
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${SCOPE_COLORS[source.scope] || ""}`}
                            >
                              <MapPin className="h-3 w-3" />
                              {source.scope}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="shrink-0 mt-1">
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
                      {source.description}
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="rounded-md border p-3">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                          Formato de datos
                        </p>
                        <div className="flex items-center gap-1.5">
                          <FileSpreadsheet className="h-3.5 w-3.5 text-muted-foreground" />
                          <p className="text-xs font-medium">
                            {source.dataFormat}
                          </p>
                        </div>
                      </div>
                      <div className="rounded-md border p-3">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                          Periodo de cobertura
                        </p>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <p className="text-xs font-medium">
                            {source.coveragePeriod}
                          </p>
                        </div>
                      </div>
                      <div className="rounded-md border p-3">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                          Método de acceso
                        </p>
                        <div className="flex items-center gap-1.5">
                          <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                          <p className="text-xs font-medium">
                            {source.accessMethod}
                          </p>
                        </div>
                      </div>
                      <div className="rounded-md border p-3">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                          Enlace
                        </p>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          {source.url.replace("https://", "")}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {filteredSources.length === 0 && (
          <div className="rounded-lg border bg-muted/50 p-8 text-center">
            <p className="text-sm text-muted-foreground">
              No se encontraron fuentes que coincidan con &quot;{searchQuery}&quot;
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
