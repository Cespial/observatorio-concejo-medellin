"use client";

import { Search, LayoutGrid, List } from "lucide-react";
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
import { cn } from "@/lib/utils";

const TIPO_OPTIONS = [
  { value: "todos", label: "Todos los tipos" },
  { value: "informe", label: "Informe" },
  { value: "boletin", label: "Boletín" },
  { value: "infografia", label: "Infografía" },
  { value: "video", label: "Video" },
  { value: "podcast", label: "Podcast" },
  { value: "otro", label: "Otro" },
] as const;

const LINEA_OPTIONS = [
  { value: "todas", label: "Todas las líneas" },
  ...THEMATIC_LINES.map((line) => ({
    value: line.slug,
    label: line.name,
  })),
] as const;

type FilterBarProductosProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedTipo: string;
  onTipoChange: (value: string) => void;
  selectedLinea: string;
  onLineaChange: (value: string) => void;
  viewMode: "grid" | "list";
  onViewChange: (mode: "grid" | "list") => void;
};

export function FilterBarProductos({
  searchQuery,
  onSearchChange,
  selectedTipo,
  onTipoChange,
  selectedLinea,
  onLineaChange,
  viewMode,
  onViewChange,
}: FilterBarProductosProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-9"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Tipo filter */}
        <Select value={selectedTipo} onValueChange={onTipoChange}>
          <SelectTrigger className="h-9 w-[170px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            {TIPO_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Linea tematica filter */}
        <Select value={selectedLinea} onValueChange={onLineaChange}>
          <SelectTrigger className="h-9 w-[200px]">
            <SelectValue placeholder="Línea Temática" />
          </SelectTrigger>
          <SelectContent>
            {LINEA_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* View toggle */}
        <div className="flex items-center rounded-md border border-input">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-9 w-9 rounded-r-none",
              viewMode === "grid" &&
                "bg-accent text-accent-foreground"
            )}
            onClick={() => onViewChange("grid")}
            aria-label="Vista de cuadrícula"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-9 w-9 rounded-l-none border-l border-input",
              viewMode === "list" &&
                "bg-accent text-accent-foreground"
            )}
            onClick={() => onViewChange("list")}
            aria-label="Vista de lista"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
