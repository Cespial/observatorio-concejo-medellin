"use client";

import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/status-badge";
import type { RelatedInitiative } from "@/lib/mock-data/types";

type RelatedInitiativesSectionProps = {
  relatedInitiatives: RelatedInitiative[];
};

function formatFecha(fecha: string): string {
  const date = new Date(fecha);
  return new Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function mapEstadoToKey(estado: string): string {
  const mapping: Record<string, string> = {
    "En tramite": "en_comision",
    "En trámite": "en_comision",
    Aprobada: "aprobada",
    Programado: "radicada",
    Archivada: "archivada",
    Retirada: "retirada",
  };
  return mapping[estado] ?? estado.toLowerCase().replace(/\s+/g, "_");
}

export function RelatedInitiativesSection({
  relatedInitiatives,
}: RelatedInitiativesSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Iniciativas Relacionadas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relatedInitiatives.slice(0, 3).map((ini) => (
          <Card key={ini.id} className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="space-y-1 min-w-0">
                  <CardTitle className="text-sm leading-tight line-clamp-2">
                    {ini.titulo}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 pb-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="text-xs font-normal">
                  {ini.tipo}
                </Badge>
                <StatusBadge estado={mapEstadoToKey(ini.estado)} size="sm" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {formatFecha(ini.fecha)}
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Link
                href={`/iniciativas/${ini.id}`}
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                Ver detalle
                <ArrowRight className="h-3 w-3" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
