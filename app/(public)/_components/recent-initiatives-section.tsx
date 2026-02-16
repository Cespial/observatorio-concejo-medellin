"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, FileText } from "lucide-react";

const ESTADO_COLORS: Record<string, string> = {
  radicada: "bg-gray-100 text-gray-700",
  en_comision: "bg-blue-100 text-blue-700",
  primer_debate: "bg-amber-100 text-amber-700",
  segundo_debate: "bg-purple-100 text-purple-700",
  aprobada: "bg-green-100 text-green-700",
  archivada: "bg-red-100 text-red-700",
  retirada: "bg-orange-100 text-orange-700",
};

const ESTADO_LABELS: Record<string, string> = {
  radicada: "Radicada",
  en_comision: "En comisión",
  primer_debate: "Primer debate",
  segundo_debate: "Segundo debate",
  aprobada: "Aprobada",
  archivada: "Archivada",
  retirada: "Retirada",
};

const RECENT_INITIATIVES = [
  {
    id: "ini-001",
    radicado: "AC-2025-001",
    titulo: "Acuerdo de seguridad alimentaria y nutricional para el Distrito de Medellín",
    tipo: "acuerdo",
    estado: "segundo_debate",
    fecha: "2025-03-15",
    linea: "Salud",
  },
  {
    id: "ini-002",
    radicado: "PR-2025-008",
    titulo: "Proposición de control político sobre calidad del aire en el Valle de Aburrá",
    tipo: "proposicion",
    estado: "en_comision",
    fecha: "2025-04-02",
    linea: "Medio Ambiente",
  },
  {
    id: "ini-003",
    radicado: "AC-2025-003",
    titulo: "Acuerdo para la modernización del sistema integrado de transporte público",
    tipo: "acuerdo",
    estado: "primer_debate",
    fecha: "2025-03-28",
    linea: "Movilidad",
  },
  {
    id: "ini-004",
    radicado: "DB-2025-002",
    titulo: "Debate de control sobre ejecución presupuestal del sector educación 2024",
    tipo: "debate",
    estado: "aprobada",
    fecha: "2025-02-20",
    linea: "Educación",
  },
];

export function RecentInitiativesSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Últimas iniciativas
            </h2>
            <p className="mt-1 text-muted-foreground">
              Seguimiento en tiempo real de la actividad legislativa del Concejo
            </p>
          </div>
          <Button variant="outline" asChild className="hidden sm:flex">
            <Link href="/iniciativas">
              Ver todas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RECENT_INITIATIVES.map((initiative) => (
            <Card key={initiative.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <FileText className="h-3.5 w-3.5" />
                    <span className="font-mono">{initiative.radicado}</span>
                    <span>•</span>
                    <span className="capitalize">{initiative.tipo}</span>
                  </div>
                  <Badge className={ESTADO_COLORS[initiative.estado]} variant="secondary">
                    {ESTADO_LABELS[initiative.estado]}
                  </Badge>
                </div>
                <CardTitle className="text-sm leading-snug">{initiative.titulo}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{new Date(initiative.fecha).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">{initiative.linea}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/iniciativas">
              Ver todas las iniciativas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
