"use client";

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
  Building2,
  GraduationCap,
  Users,
  Code2,
  ShieldCheck,
  Database,
  BarChart3,
  Settings,
  Scale,
  Eye,
  Heart,
  Globe,
} from "lucide-react";

/* ---------- Organizational Structure ---------- */
type OrgUnit = {
  title: string;
  entity: string;
  icon: typeof Building2;
  color: string;
  bgColor: string;
  description: string;
  responsibilities: string[];
};

const ORG_UNITS: OrgUnit[] = [
  {
    title: "Dirección",
    entity: "Concejo de Medellín",
    icon: Building2,
    color: "text-blue-700",
    bgColor: "bg-blue-50 border-blue-200",
    description:
      "La Mesa Directiva del Concejo de Medellín ejerce la dirección estratégica del Observatorio, definiendo prioridades temáticas y aprobando los planes de trabajo.",
    responsibilities: [
      "Definición de prioridades temáticas y alcance del Observatorio",
      "Aprobación del plan de trabajo anual",
      "Validación de productos y publicaciones estratégicas",
      "Articulación con la Administración Municipal y entidades del orden nacional",
    ],
  },
  {
    title: "Coordinación Técnica",
    entity: "Universidad EAFIT",
    icon: GraduationCap,
    color: "text-green-700",
    bgColor: "bg-green-50 border-green-200",
    description:
      "La Universidad EAFIT, como aliado académico, lidera la coordinación técnica del Observatorio, aportando rigor metodológico y capacidad analítica.",
    responsibilities: [
      "Diseño metodológico y marcos de indicadores",
      "Coordinación del equipo técnico",
      "Aseguramiento de calidad de datos y análisis",
      "Investigación aplicada y producción de conocimiento",
      "Formación y transferencia de capacidades",
    ],
  },
  {
    title: "Comité Asesor",
    entity: "Representantes de sociedad civil",
    icon: Users,
    color: "text-purple-700",
    bgColor: "bg-purple-50 border-purple-200",
    description:
      "Instancia consultiva conformada por representantes de la academia, organizaciones de la sociedad civil, gremios y expertos sectoriales.",
    responsibilities: [
      "Asesoría en temas técnicos y sectoriales",
      "Revisión de metodologías y productos",
      "Enlace con necesidades de información ciudadana",
      "Veeduría sobre la calidad y pertinencia de la información",
    ],
  },
  {
    title: "Equipo Técnico",
    entity: "Analistas, desarrolladores, diseñadores",
    icon: Code2,
    color: "text-rose-700",
    bgColor: "bg-rose-50 border-rose-200",
    description:
      "Equipo multidisciplinario responsable del desarrollo tecnológico, procesamiento de datos, análisis y producción de contenido del Observatorio.",
    responsibilities: [
      "Desarrollo y mantenimiento de la plataforma tecnológica",
      "Procesamiento ETL y gestión de bases de datos",
      "Análisis cuantitativo y cualitativo de indicadores",
      "Diseño de visualizaciones e infografías",
      "Producción de informes y boletines temáticos",
    ],
  },
];

/* ---------- Data Governance Roles ---------- */
type GovernanceRole = {
  title: string;
  icon: typeof ShieldCheck;
  color: string;
  bgColor: string;
  description: string;
  responsibilities: string[];
};

const GOVERNANCE_ROLES: GovernanceRole[] = [
  {
    title: "Data Owner",
    icon: ShieldCheck,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    description:
      "Responsable de la calidad, integridad y uso adecuado de los datos de un dominio temático.",
    responsibilities: [
      "Define políticas de acceso y uso de datos",
      "Aprueba cambios en la estructura de datos de su dominio",
      "Valida la calidad de los datos publicados",
      "Autoriza el acceso a datos sensibles",
    ],
  },
  {
    title: "Data Steward",
    icon: Eye,
    color: "text-green-600",
    bgColor: "bg-green-50",
    description:
      "Custodio operativo que asegura el cumplimiento de las políticas de datos en las operaciones diarias.",
    responsibilities: [
      "Monitorea la calidad de datos de forma continua",
      "Documenta metadatos y diccionarios de datos",
      "Gestiona incidentes de calidad de datos",
      "Coordina con las fuentes de datos externas",
    ],
  },
  {
    title: "Data Analyst",
    icon: BarChart3,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    description:
      "Profesional encargado de transformar datos en información útil para la toma de decisiones.",
    responsibilities: [
      "Realiza análisis estadístico y de tendencias",
      "Diseña y produce visualizaciones de datos",
      "Redacta informes y boletines temáticos",
      "Identifica hallazgos y genera alertas",
    ],
  },
  {
    title: "Data Engineer",
    icon: Settings,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    description:
      "Responsable de la infraestructura técnica, pipelines de datos y mantenimiento de la plataforma.",
    responsibilities: [
      "Diseña y mantiene los pipelines ETL",
      "Administra la base de datos y políticas de seguridad",
      "Implementa APIs y servicios de datos",
      "Garantiza el rendimiento y disponibilidad de la plataforma",
    ],
  },
];

export function EquipoSection() {
  return (
    <div className="space-y-12">
      {/* Organizational Structure */}
      <section>
        <h2 className="font-serif text-2xl font-bold mb-2">
          Estructura Organizacional
        </h2>
        <Separator className="mb-4" />
        <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
          El Observatorio Distrital opera bajo un esquema de gobernanza que
          articula la dirección política del Concejo con la coordinación técnica
          académica y la participación de la sociedad civil.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {ORG_UNITS.map((unit) => {
            const Icon = unit.icon;
            return (
              <Card key={unit.title} className={`border ${unit.bgColor}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-white p-2 shadow-sm shrink-0">
                      <Icon className={`h-5 w-5 ${unit.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-base">{unit.title}</CardTitle>
                      <CardDescription className="text-xs">
                        {unit.entity}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    {unit.description}
                  </p>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                      Funciones principales
                    </p>
                    <ul className="space-y-1.5">
                      {unit.responsibilities.map((resp) => (
                        <li
                          key={resp}
                          className="flex items-start gap-2 text-xs text-muted-foreground"
                        >
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-current mt-1.5 shrink-0" />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Data Governance Model */}
      <section>
        <h2 className="font-serif text-2xl font-bold mb-2">
          Modelo de Gobernanza de Datos
        </h2>
        <Separator className="mb-4" />
        <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
          Roles y responsabilidades para la gestión de datos del Observatorio,
          siguiendo las mejores prácticas de gobernanza de datos.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GOVERNANCE_ROLES.map((role) => {
            const Icon = role.icon;
            return (
              <Card key={role.title}>
                <CardHeader className="pb-2">
                  <div
                    className={`rounded-lg p-2 ${role.bgColor} w-fit mb-2`}
                  >
                    <Icon className={`h-5 w-5 ${role.color}`} />
                  </div>
                  <CardTitle className="text-sm">{role.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    {role.description}
                  </p>
                  <ul className="space-y-1.5">
                    {role.responsibilities.map((resp) => (
                      <li
                        key={resp}
                        className="flex items-start gap-2 text-[10px] text-muted-foreground"
                      >
                        <span className="inline-block h-1 w-1 rounded-full bg-current mt-1.5 shrink-0" />
                        {resp}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Ethics and Open Data Policy */}
      <section>
        <h2 className="font-serif text-2xl font-bold mb-2">
          Principios Éticos y Política de Datos Abiertos
        </h2>
        <Separator className="mb-4" />

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-rose-500" />
                <CardTitle className="text-base">Principios Éticos</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                El Observatorio se rige por principios éticos que garantizan el
                uso responsable de los datos y la información producida:
              </p>
              <ul className="space-y-2">
                {[
                  {
                    title: "Veracidad",
                    desc: "Los datos e indicadores publicados reflejan fielmente la información de las fuentes oficiales, sin manipulación ni sesgo.",
                  },
                  {
                    title: "Imparcialidad",
                    desc: "El análisis se realiza con rigor técnico, independientemente de intereses políticos o partidistas.",
                  },
                  {
                    title: "Privacidad",
                    desc: "Se respeta la Ley 1581 de 2012 de protección de datos personales. Toda la información publicada es agregada y anonimizada.",
                  },
                  {
                    title: "Inclusión",
                    desc: "La información se presenta en formatos accesibles y lenguaje comprensible para todos los ciudadanos.",
                  },
                  {
                    title: "No maleficencia",
                    desc: "Los datos no se utilizan para discriminar, estigmatizar o perjudicar a comunidades o territorios.",
                  },
                ].map((principle) => (
                  <li key={principle.title} className="rounded-md border p-3">
                    <p className="text-xs font-semibold mb-1">
                      {principle.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      {principle.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-base">
                  Política de Datos Abiertos
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                El Observatorio adopta los principios internacionales de datos
                abiertos, promoviendo el acceso libre a la información pública:
              </p>
              <ul className="space-y-2">
                {[
                  {
                    title: "Completos",
                    desc: "Se publican todos los datos posibles, a menos que estén sujetos a limitaciones de privacidad o seguridad.",
                  },
                  {
                    title: "Primarios",
                    desc: "Los datos se publican en el mayor nivel de granularidad posible, permitiendo a los usuarios realizar sus propios análisis.",
                  },
                  {
                    title: "Oportunos",
                    desc: "Los datos se publican tan pronto como estén disponibles, respetando los tiempos de validación.",
                  },
                  {
                    title: "Accesibles",
                    desc: "Los datos están disponibles para el mayor rango posible de usuarios y propósitos, a través de la plataforma web y API.",
                  },
                  {
                    title: "Procesables por máquinas",
                    desc: "Los datos se publican en formatos estructurados (JSON, CSV) que permiten su procesamiento automatizado.",
                  },
                ].map((principle) => (
                  <li key={principle.title} className="rounded-md border p-3">
                    <p className="text-xs font-semibold mb-1">
                      {principle.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      {principle.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* License */}
      <section>
        <Card className="bg-muted/30 border-dashed">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-white p-3 shadow-sm shrink-0">
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-base mb-2">
                  Licencia de Uso
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Todo el contenido, datos e indicadores publicados por el
                  Observatorio Distrital del Concejo de Medellín están
                  disponibles bajo la licencia{" "}
                  <strong>Creative Commons Atribución-CompartirIgual 4.0
                  Internacional (CC BY-SA 4.0)</strong>.
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  Esto significa que usted es libre de compartir (copiar y
                  redistribuir el material en cualquier medio o formato) y
                  adaptar (remezclar, transformar y construir a partir del
                  material para cualquier propósito, incluso comercial), siempre
                  que: (1) se otorgue crédito adecuado al Observatorio, (2) se
                  proporcione un enlace a la licencia, y (3) las obras derivadas
                  se distribuyan bajo la misma licencia.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    CC BY-SA 4.0
                  </Badge>
                  <a
                    href="https://creativecommons.org/licenses/by-sa/4.0/deed.es"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                  >
                    Ver texto completo de la licencia
                    <Database className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
