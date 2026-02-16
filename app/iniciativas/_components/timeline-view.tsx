"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { InitiativeMock } from "@/lib/mock-data/iniciativas";

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

const MONTH_NAMES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

type TimelineViewProps = {
  iniciativas: InitiativeMock[];
  onSelect: (id: string) => void;
};

type MonthGroup = {
  key: string;
  label: string;
  items: InitiativeMock[];
};

export function TimelineView({ iniciativas, onSelect }: TimelineViewProps) {
  const monthGroups = useMemo(() => {
    // Sort by date descending (newest first)
    const sorted = [...iniciativas].sort(
      (a, b) =>
        new Date(b.fecha_radicacion).getTime() -
        new Date(a.fecha_radicacion).getTime()
    );

    const groups: Record<string, InitiativeMock[]> = {};
    const order: string[] = [];

    for (const ini of sorted) {
      const d = new Date(ini.fecha_radicacion);
      const key = `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`;
      if (!groups[key]) {
        groups[key] = [];
        order.push(key);
      }
      groups[key].push(ini);
    }

    return order.map((key) => {
      const [year, monthIdx] = key.split("-");
      return {
        key,
        label: `${MONTH_NAMES[parseInt(monthIdx)]} ${year}`,
        items: groups[key],
      } as MonthGroup;
    });
  }, [iniciativas]);

  if (iniciativas.length === 0) {
    return (
      <EmptyState
        icon={Clock}
        title="Sin resultados"
        description="No se encontraron iniciativas que coincidan con los filtros seleccionados."
      />
    );
  }

  return (
    <div className="space-y-8">
      {monthGroups.map((group) => (
        <div key={group.key}>
          {/* Month header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-border" />
            <h3 className="text-sm font-semibold text-muted-foreground whitespace-nowrap">
              {group.label}
            </h3>
            <Badge variant="secondary" className="text-[10px] h-5">
              {group.items.length}
            </Badge>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Timeline items */}
          <div className="relative ml-4 border-l-2 border-border pl-8 space-y-4">
            {group.items.map((ini) => (
              <div key={ini.id} className="relative">
                {/* Dot on timeline */}
                <div className="absolute -left-[2.55rem] top-3 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full border-2 border-primary bg-background" />
                </div>

                {/* Card */}
                <Card
                  className="cursor-pointer transition-shadow hover:shadow-md"
                  onClick={() => onSelect(ini.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">
                          {new Date(ini.fecha_radicacion).toLocaleDateString(
                            "es-CO",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                        <h4 className="text-sm font-semibold leading-tight line-clamp-2">
                          {ini.titulo}
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <Badge
                        className={cn(
                          "border-transparent text-[10px] font-medium",
                          TIPO_COLORS[ini.tipo] || "bg-gray-100 text-gray-800"
                        )}
                      >
                        {TIPO_LABELS[ini.tipo] || ini.tipo}
                      </Badge>
                      <StatusBadge estado={ini.estado} size="sm" />
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {ini.descripcion}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
