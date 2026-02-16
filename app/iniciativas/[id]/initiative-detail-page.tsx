"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { TimelineStep } from "@/components/shared/timeline-step";
import { BreadcrumbNav } from "@/components/shared/breadcrumb-nav";
import { THEMATIC_LINES } from "@/lib/constants";
import {
  ArrowLeft,
  ExternalLink,
  User,
  FileText,
  Tag,
  Building2,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { InitiativeMock } from "@/lib/mock-data/iniciativas";
import type { AutorMock } from "@/lib/mock-data/autores";

const TIPO_LABELS: Record<string, string> = {
  acuerdo: "Acuerdo",
  proposicion: "Proposicion",
  resolucion: "Resolucion",
  debate: "Debate",
  otro: "Otro",
};

const TIPO_COLORS: Record<string, string> = {
  acuerdo: "bg-blue-100 text-blue-800",
  proposicion: "bg-amber-100 text-amber-800",
  resolucion: "bg-teal-100 text-teal-800",
  debate: "bg-purple-100 text-purple-800",
  otro: "bg-gray-100 text-gray-800",
};

type InitiativeDetailPageProps = {
  initiative: InitiativeMock;
  autores: AutorMock[];
};

export function InitiativeDetailPage({
  initiative,
  autores,
}: InitiativeDetailPageProps) {
  const lineaMap = useMemo(() => {
    const map: Record<string, string> = {};
    THEMATIC_LINES.forEach((l) => {
      map[l.slug] = l.name;
    });
    return map;
  }, []);

  const resolvedAutores = useMemo(() => {
    const autoresMap: Record<string, AutorMock> = {};
    autores.forEach((a) => {
      autoresMap[a.id] = a;
    });
    return initiative.autores_ids
      .map((id) => autoresMap[id])
      .filter(Boolean);
  }, [initiative, autores]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 lg:px-6 space-y-6">
      {/* Breadcrumb */}
      <BreadcrumbNav
        items={[
          { label: "Inicio", href: "/" },
          { label: "Iniciativas", href: "/iniciativas" },
          { label: initiative.titulo.slice(0, 60) + (initiative.titulo.length > 60 ? "..." : "") },
        ]}
      />

      {/* Back button */}
      <Button variant="ghost" size="sm" className="gap-1.5" asChild>
        <Link href="/iniciativas">
          <ArrowLeft className="h-4 w-4" />
          Volver a iniciativas
        </Link>
      </Button>

      {/* Main content card */}
      <Card>
        <CardContent className="p-6 lg:p-8 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <FileText className="h-4 w-4" />
              <span className="font-mono font-medium">
                {initiative.numero_radicado}
              </span>
            </div>
            <h1 className="font-serif text-2xl font-bold leading-tight">
              {initiative.titulo}
            </h1>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              className={cn(
                "border-transparent font-medium",
                TIPO_COLORS[initiative.tipo] || "bg-gray-100 text-gray-800"
              )}
            >
              {TIPO_LABELS[initiative.tipo] || initiative.tipo}
            </Badge>
            <StatusBadge estado={initiative.estado} />
            <Badge variant="outline">
              {lineaMap[initiative.linea_tematica] ||
                initiative.linea_tematica}
            </Badge>
          </div>

          {/* Meta info */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground flex-wrap border-b pb-4">
            <div className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4" />
              <span>Comision: {initiative.comision}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>
                Radicacion:{" "}
                {new Date(initiative.fecha_radicacion).toLocaleDateString(
                  "es-CO",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-base font-semibold mb-3">Descripcion</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {initiative.descripcion}
            </p>
          </div>

          {/* Tags */}
          {initiative.tags.length > 0 && (
            <div>
              <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Etiquetas
              </h2>
              <div className="flex flex-wrap gap-2">
                {initiative.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs font-normal"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Authors */}
          {resolvedAutores.length > 0 && (
            <div>
              <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
                <User className="h-4 w-4" />
                Autores ({resolvedAutores.length})
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {resolvedAutores.map((autor) => (
                  <div
                    key={autor.id}
                    className="flex items-center gap-3 rounded-lg border p-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                      {autor.nombre
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{autor.nombre}</p>
                      <p className="text-xs text-muted-foreground">
                        {autor.partido} &middot; {autor.cargo}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trazabilidad */}
          {initiative.trazabilidad.length > 0 && (
            <div>
              <h2 className="text-base font-semibold mb-4">Trazabilidad</h2>
              <div className="pl-2">
                {initiative.trazabilidad.map((step, idx) => (
                  <TimelineStep
                    key={idx}
                    fecha={step.fecha}
                    estado={step.estado}
                    descripcion={step.descripcion}
                    notas={step.notas}
                    isLast={idx === initiative.trazabilidad.length - 1}
                    isActive={idx === initiative.trazabilidad.length - 1}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Document link */}
          {initiative.documento_url && (
            <div className="border-t pt-4">
              <Button variant="outline" className="gap-2" asChild>
                <a
                  href={initiative.documento_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  Ver documento completo
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
