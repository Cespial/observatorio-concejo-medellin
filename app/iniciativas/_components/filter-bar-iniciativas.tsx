"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { THEMATIC_LINES } from "@/lib/constants";

const TIPO_OPTIONS = [
  { value: "todos", label: "Todos los tipos" },
  { value: "acuerdo", label: "Acuerdo" },
  { value: "proposicion", label: "Proposicion" },
  { value: "resolucion", label: "Resolucion" },
  { value: "debate", label: "Debate" },
  { value: "otro", label: "Otro" },
];

const ESTADO_OPTIONS = [
  { value: "todos", label: "Todos los estados" },
  { value: "radicada", label: "Radicada" },
  { value: "en_comision", label: "En Comision" },
  { value: "primer_debate", label: "Primer Debate" },
  { value: "segundo_debate", label: "Segundo Debate" },
  { value: "aprobada", label: "Aprobada" },
  { value: "archivada", label: "Archivada" },
  { value: "retirada", label: "Retirada" },
];

const LINEA_OPTIONS = [
  { value: "todas", label: "Todas las lineas" },
  ...THEMATIC_LINES.map((l) => ({ value: l.slug, label: l.name })),
];

const COMISION_OPTIONS = [
  { value: "todas", label: "Todas las comisiones" },
  { value: "Primera", label: "Comision Primera" },
  { value: "Segunda", label: "Comision Segunda" },
  { value: "Tercera", label: "Comision Tercera" },
  { value: "Plan y Tierras", label: "Plan y Tierras" },
  { value: "Plenaria", label: "Plenaria" },
];

type FilterBarIniciativasProps = {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  selectedTipo: string;
  onTipoChange: (v: string) => void;
  selectedEstado: string;
  onEstadoChange: (v: string) => void;
  selectedLinea: string;
  onLineaChange: (v: string) => void;
  selectedComision: string;
  onComisionChange: (v: string) => void;
  filteredCount: number;
  totalCount: number;
};

export function FilterBarIniciativas({
  searchQuery,
  onSearchChange,
  selectedTipo,
  onTipoChange,
  selectedEstado,
  onEstadoChange,
  selectedLinea,
  onLineaChange,
  selectedComision,
  onComisionChange,
  filteredCount,
  totalCount,
}: FilterBarIniciativasProps) {
  const hasFilters =
    searchQuery !== "" ||
    selectedTipo !== "todos" ||
    selectedEstado !== "todos" ||
    selectedLinea !== "todas" ||
    selectedComision !== "todas";

  function clearFilters() {
    onSearchChange("");
    onTipoChange("todos");
    onEstadoChange("todos");
    onLineaChange("todas");
    onComisionChange("todas");
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por titulo o descripcion..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-9"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <Select value={selectedTipo} onValueChange={onTipoChange}>
            <SelectTrigger className="h-9 w-[170px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              {TIPO_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedEstado} onValueChange={onEstadoChange}>
            <SelectTrigger className="h-9 w-[180px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              {ESTADO_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLinea} onValueChange={onLineaChange}>
            <SelectTrigger className="h-9 w-[190px]">
              <SelectValue placeholder="Linea Tematica" />
            </SelectTrigger>
            <SelectContent>
              {LINEA_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedComision} onValueChange={onComisionChange}>
            <SelectTrigger className="h-9 w-[190px]">
              <SelectValue placeholder="Comision" />
            </SelectTrigger>
            <SelectContent>
              {COMISION_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count and clear */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Mostrando{" "}
          <span className="font-medium text-foreground">{filteredCount}</span>{" "}
          de {totalCount} iniciativas
        </p>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-8 gap-1 text-muted-foreground"
          >
            <X className="h-3.5 w-3.5" />
            Limpiar filtros
          </Button>
        )}
      </div>
    </div>
  );
}
