"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import { LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import type { InitiativeMock } from "@/lib/mock-data/iniciativas";
import type { AutorMock } from "@/lib/mock-data/autores";

const ESTADO_COLUMNS: {
  key: InitiativeMock["estado"];
  label: string;
  headerBg: string;
  headerText: string;
  dotColor: string;
}[] = [
  {
    key: "radicada",
    label: "Radicada",
    headerBg: "bg-blue-50 border-blue-200",
    headerText: "text-blue-800",
    dotColor: "bg-blue-500",
  },
  {
    key: "en_comision",
    label: "En Comision",
    headerBg: "bg-yellow-50 border-yellow-200",
    headerText: "text-yellow-800",
    dotColor: "bg-yellow-500",
  },
  {
    key: "primer_debate",
    label: "Primer Debate",
    headerBg: "bg-purple-50 border-purple-200",
    headerText: "text-purple-800",
    dotColor: "bg-purple-500",
  },
  {
    key: "segundo_debate",
    label: "Segundo Debate",
    headerBg: "bg-indigo-50 border-indigo-200",
    headerText: "text-indigo-800",
    dotColor: "bg-indigo-500",
  },
  {
    key: "aprobada",
    label: "Aprobada",
    headerBg: "bg-green-50 border-green-200",
    headerText: "text-green-800",
    dotColor: "bg-green-500",
  },
  {
    key: "archivada",
    label: "Archivada",
    headerBg: "bg-gray-50 border-gray-200",
    headerText: "text-gray-700",
    dotColor: "bg-gray-500",
  },
  {
    key: "retirada",
    label: "Retirada",
    headerBg: "bg-red-50 border-red-200",
    headerText: "text-red-800",
    dotColor: "bg-red-500",
  },
];

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

type KanbanViewProps = {
  iniciativas: InitiativeMock[];
  autores: AutorMock[];
  onSelect: (id: string) => void;
};

export function KanbanView({
  iniciativas,
  autores,
  onSelect,
}: KanbanViewProps) {
  const autoresMap = useMemo(() => {
    const map: Record<string, AutorMock> = {};
    autores.forEach((a) => {
      map[a.id] = a;
    });
    return map;
  }, [autores]);

  const grouped = useMemo(() => {
    const groups: Record<string, InitiativeMock[]> = {};
    for (const col of ESTADO_COLUMNS) {
      groups[col.key] = [];
    }
    for (const ini of iniciativas) {
      if (groups[ini.estado]) {
        groups[ini.estado].push(ini);
      }
    }
    return groups;
  }, [iniciativas]);

  if (iniciativas.length === 0) {
    return (
      <EmptyState
        icon={LayoutGrid}
        title="Sin resultados"
        description="No se encontraron iniciativas que coincidan con los filtros seleccionados."
      />
    );
  }

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-max">
        {ESTADO_COLUMNS.map((col) => {
          const items = grouped[col.key] || [];
          return (
            <div key={col.key} className="w-[280px] shrink-0">
              {/* Column header */}
              <div
                className={cn(
                  "flex items-center justify-between rounded-t-lg border px-3 py-2.5",
                  col.headerBg
                )}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={cn("h-2.5 w-2.5 rounded-full", col.dotColor)}
                  />
                  <span
                    className={cn("text-sm font-semibold", col.headerText)}
                  >
                    {col.label}
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="h-5 min-w-[20px] justify-center px-1.5 text-[10px]"
                >
                  {items.length}
                </Badge>
              </div>

              {/* Column body */}
              <div className="space-y-2 rounded-b-lg border border-t-0 bg-muted/30 p-2 min-h-[200px]">
                {items.length === 0 && (
                  <p className="py-8 text-center text-xs text-muted-foreground">
                    Sin iniciativas
                  </p>
                )}
                {items.map((ini) => {
                  const firstAutor = ini.autores_ids[0]
                    ? autoresMap[ini.autores_ids[0]]
                    : null;
                  return (
                    <Card
                      key={ini.id}
                      className="cursor-pointer transition-shadow hover:shadow-md"
                      onClick={() => onSelect(ini.id)}
                    >
                      <CardContent className="p-3 space-y-2">
                        <p className="text-sm font-medium leading-tight line-clamp-2">
                          {ini.titulo}
                        </p>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <Badge
                            className={cn(
                              "border-transparent text-[10px] font-medium",
                              TIPO_COLORS[ini.tipo] || "bg-gray-100 text-gray-800"
                            )}
                          >
                            {TIPO_LABELS[ini.tipo] || ini.tipo}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>
                            {new Date(ini.fecha_radicacion).toLocaleDateString(
                              "es-CO",
                              { month: "short", day: "numeric", year: "2-digit" }
                            )}
                          </span>
                          {firstAutor && (
                            <span className="truncate max-w-[120px]">
                              {firstAutor.nombre.split(" ").slice(0, 2).join(" ")}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
