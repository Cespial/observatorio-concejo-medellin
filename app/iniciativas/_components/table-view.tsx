"use client";

import { useMemo, useState } from "react";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { THEMATIC_LINES } from "@/lib/constants";
import { Eye, FileText } from "lucide-react";
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

type TableViewProps = {
  iniciativas: InitiativeMock[];
  onSelect: (id: string) => void;
  page: number;
  onPageChange: (page: number) => void;
};

export function TableView({
  iniciativas,
  onSelect,
  page,
  onPageChange,
}: TableViewProps) {
  const pageSize = 10;
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const lineaMap = useMemo(() => {
    const map: Record<string, string> = {};
    THEMATIC_LINES.forEach((l) => {
      map[l.slug] = l.name;
    });
    return map;
  }, []);

  const sorted = useMemo(() => {
    if (!sortKey) return iniciativas;
    return [...iniciativas].sort((a, b) => {
      let va: string = "";
      let vb: string = "";
      if (sortKey === "fecha_radicacion") {
        va = a.fecha_radicacion;
        vb = b.fecha_radicacion;
      } else if (sortKey === "numero_radicado") {
        va = a.numero_radicado;
        vb = b.numero_radicado;
      }
      const cmp = va.localeCompare(vb);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [iniciativas, sortKey, sortDir]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page]);

  if (iniciativas.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="Sin resultados"
        description="No se encontraron iniciativas que coincidan con los filtros seleccionados."
      />
    );
  }

  const columns = [
    {
      key: "numero_radicado",
      label: "Radicado",
      sortable: true,
      render: (val: string) => (
        <span className="font-mono text-xs font-medium">{val}</span>
      ),
    },
    {
      key: "titulo",
      label: "Titulo",
      render: (val: string, row: InitiativeMock) => (
        <button
          onClick={() => onSelect(row.id)}
          className="text-left text-sm font-medium text-foreground hover:text-primary hover:underline line-clamp-2 max-w-[300px]"
        >
          {val}
        </button>
      ),
    },
    {
      key: "tipo",
      label: "Tipo",
      render: (val: string) => (
        <Badge
          className={`border-transparent text-[10px] font-medium ${TIPO_COLORS[val] || "bg-gray-100 text-gray-800"}`}
        >
          {TIPO_LABELS[val] || val}
        </Badge>
      ),
    },
    {
      key: "estado",
      label: "Estado",
      render: (val: string) => <StatusBadge estado={val} size="sm" />,
    },
    {
      key: "linea_tematica",
      label: "Linea",
      render: (val: string) => (
        <span className="text-xs text-muted-foreground">
          {lineaMap[val] || val}
        </span>
      ),
    },
    {
      key: "comision",
      label: "Comision",
      render: (val: string) => (
        <span className="text-xs text-muted-foreground">{val}</span>
      ),
    },
    {
      key: "fecha_radicacion",
      label: "Fecha",
      sortable: true,
      render: (val: string) => (
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {new Date(val).toLocaleDateString("es-CO", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "id",
      label: "Acciones",
      render: (_val: string, row: InitiativeMock) => (
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => onSelect(row.id)}
        >
          <Eye className="h-3.5 w-3.5" />
          <span className="sr-only">Ver detalle</span>
        </Button>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={paginatedData}
      total={iniciativas.length}
      page={page}
      pageSize={pageSize}
      onSort={(key, direction) => {
        setSortKey(key);
        setSortDir(direction);
      }}
      onPageChange={onPageChange}
    />
  );
}
