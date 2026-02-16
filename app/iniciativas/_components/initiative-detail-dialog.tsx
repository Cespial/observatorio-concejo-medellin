"use client";

import { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { TimelineStep } from "@/components/shared/timeline-step";
import { Button } from "@/components/ui/button";
import { THEMATIC_LINES } from "@/lib/constants";
import {
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

type InitiativeDetailDialogProps = {
  initiative: InitiativeMock | null;
  autores: AutorMock[];
  open: boolean;
  onClose: () => void;
};

export function InitiativeDetailDialog({
  initiative,
  autores,
  open,
  onClose,
}: InitiativeDetailDialogProps) {
  const lineaMap = useMemo(() => {
    const map: Record<string, string> = {};
    THEMATIC_LINES.forEach((l) => {
      map[l.slug] = l.name;
    });
    return map;
  }, []);

  const resolvedAutores = useMemo(() => {
    if (!initiative) return [];
    const autoresMap: Record<string, AutorMock> = {};
    autores.forEach((a) => {
      autoresMap[a.id] = a;
    });
    return initiative.autores_ids
      .map((id) => autoresMap[id])
      .filter(Boolean);
  }, [initiative, autores]);

  if (!initiative) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <FileText className="h-3.5 w-3.5" />
            <span className="font-mono">{initiative.numero_radicado}</span>
          </div>
          <DialogTitle className="text-lg leading-tight pr-8">
            {initiative.titulo}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Detalle de la iniciativa {initiative.numero_radicado}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          {/* Badges row */}
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
          <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
            <div className="flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5" />
              <span>Comision: {initiative.comision}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
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
            <h4 className="text-sm font-semibold mb-2">Descripcion</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {initiative.descripcion}
            </p>
          </div>

          {/* Tags */}
          {initiative.tags.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5" />
                Etiquetas
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {initiative.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-[10px] font-normal"
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
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                Autores
              </h4>
              <div className="space-y-2">
                {resolvedAutores.map((autor) => (
                  <div
                    key={autor.id}
                    className="flex items-center gap-3 rounded-lg border p-2.5"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-semibold">
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
              <h4 className="text-sm font-semibold mb-3">Trazabilidad</h4>
              <div>
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
            <div>
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <a
                  href={initiative.documento_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Ver documento
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
