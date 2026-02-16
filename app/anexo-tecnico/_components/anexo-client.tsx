"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FlaskConical,
  Database,
  BarChart3,
  Boxes,
  ArrowRightLeft,
  Scale,
  Users,
  BookOpen,
} from "lucide-react";
import { MetodologiaSection } from "./metodologia-section";
import { FuentesSection } from "./fuentes-section";
import { MarcoIndicadoresSection } from "./marco-indicadores-section";
import { ModeloDatosSection } from "./modelo-datos-section";
import { ProcesoEtlSection } from "./proceso-etl-section";
import { MarcoNormativoSection } from "./marco-normativo-section";
import { EquipoSection } from "./equipo-section";
import { GlosarioSection } from "./glosario-section";

const TABS = [
  { value: "metodologia", label: "Metodología", icon: FlaskConical },
  { value: "fuentes", label: "Fuentes de Datos", icon: Database },
  { value: "indicadores", label: "Marco de Indicadores", icon: BarChart3 },
  { value: "modelo", label: "Modelo de Datos", icon: Boxes },
  { value: "etl", label: "Proceso ETL", icon: ArrowRightLeft },
  { value: "normativo", label: "Marco Normativo", icon: Scale },
  { value: "equipo", label: "Equipo", icon: Users },
  { value: "glosario", label: "Glosario", icon: BookOpen },
] as const;

export function AnexoClient() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold mb-2">Anexo Técnico</h1>
        <p className="text-muted-foreground max-w-3xl">
          Marco metodológico, fuentes de datos y documentación técnica del
          Observatorio Distrital del Concejo de Medellín. Este anexo detalla los
          procesos, estándares y herramientas utilizadas para garantizar la
          calidad y transparencia de la información.
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="metodologia" className="w-full">
        <div className="overflow-x-auto -mx-4 px-4 pb-2">
          <TabsList className="inline-flex h-auto w-max gap-1 bg-muted p-1 rounded-lg">
            {TABS.map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm whitespace-nowrap"
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">
                  {label.split(" ")[0]}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="mt-6">
          <TabsContent value="metodologia">
            <MetodologiaSection />
          </TabsContent>
          <TabsContent value="fuentes">
            <FuentesSection />
          </TabsContent>
          <TabsContent value="indicadores">
            <MarcoIndicadoresSection />
          </TabsContent>
          <TabsContent value="modelo">
            <ModeloDatosSection />
          </TabsContent>
          <TabsContent value="etl">
            <ProcesoEtlSection />
          </TabsContent>
          <TabsContent value="normativo">
            <MarcoNormativoSection />
          </TabsContent>
          <TabsContent value="equipo">
            <EquipoSection />
          </TabsContent>
          <TabsContent value="glosario">
            <GlosarioSection />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
