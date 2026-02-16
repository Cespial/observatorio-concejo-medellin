"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, BarChart3, MapPin, RefreshCw, ArrowRight } from "lucide-react";

const STATS = [
  { icon: Database, value: "14", label: "Fuentes de datos", description: "Institucionales y oficiales" },
  { icon: BarChart3, value: "247+", label: "Indicadores", description: "En 6 líneas temáticas" },
  { icon: MapPin, value: "22", label: "Territorios", description: "Comunas y corregimientos" },
  { icon: RefreshCw, value: "12", label: "Actualizaciones/año", description: "Datos verificados" },
];

export function MethodologySection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Rigor metodológico
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Nuestros datos provienen de fuentes oficiales verificadas y siguen estrictos
            protocolos de calidad para garantizar la confiabilidad de cada indicador.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-institucional/10">
                    <Icon className="h-6 w-6 text-institucional" />
                  </div>
                  <p className="text-2xl font-bold text-institucional">{stat.value}</p>
                  <p className="text-sm font-medium">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button asChild>
            <Link href="/anexo-tecnico">
              Explorar anexo técnico
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
