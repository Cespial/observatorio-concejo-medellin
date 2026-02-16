"use client";

import { useState, useMemo, useCallback } from "react";
import { MOCK_INICIATIVAS, type InitiativeMock } from "@/lib/mock-data/iniciativas";
import { MOCK_AUTORES, type AutorMock } from "@/lib/mock-data/autores";
import { StatsSummary } from "./stats-summary";
import { FilterBarIniciativas } from "./filter-bar-iniciativas";
import { ViewToggle } from "./view-toggle";
import { TableView } from "./table-view";
import { KanbanView } from "./kanban-view";
import { TimelineView } from "./timeline-view";
import { InitiativeDetailDialog } from "./initiative-detail-dialog";

type ViewMode = "table" | "kanban" | "timeline";

type Props = {
  serverIniciativas?: InitiativeMock[];
  serverAutores?: AutorMock[];
};

export function IniciativasPageClient({ serverIniciativas, serverAutores }: Props) {
  // Use server data if available, fall back to mock
  const allIniciativas = serverIniciativas ?? MOCK_INICIATIVAS;
  const allAutores = serverAutores ?? MOCK_AUTORES;

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTipo, setSelectedTipo] = useState("todos");
  const [selectedEstado, setSelectedEstado] = useState("todos");
  const [selectedLinea, setSelectedLinea] = useState("todas");
  const [selectedComision, setSelectedComision] = useState("todas");

  // View mode
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  // Pagination (for table view)
  const [currentPage, setCurrentPage] = useState(1);

  // Detail dialog
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Filter logic
  const filteredIniciativas = useMemo(() => {
    let result = allIniciativas;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (i) =>
          i.titulo.toLowerCase().includes(query) ||
          i.descripcion.toLowerCase().includes(query)
      );
    }

    // Tipo filter
    if (selectedTipo !== "todos") {
      result = result.filter((i) => i.tipo === selectedTipo);
    }

    // Estado filter
    if (selectedEstado !== "todos") {
      result = result.filter((i) => i.estado === selectedEstado);
    }

    // Linea tematica filter
    if (selectedLinea !== "todas") {
      result = result.filter((i) => i.linea_tematica === selectedLinea);
    }

    // Comision filter
    if (selectedComision !== "todas") {
      result = result.filter((i) => i.comision === selectedComision);
    }

    return result;
  }, [allIniciativas, searchQuery, selectedTipo, selectedEstado, selectedLinea, selectedComision]);

  // Reset page when filters change
  const handleSearchChange = useCallback((v: string) => {
    setSearchQuery(v);
    setCurrentPage(1);
  }, []);

  const handleTipoChange = useCallback((v: string) => {
    setSelectedTipo(v);
    setCurrentPage(1);
  }, []);

  const handleEstadoChange = useCallback((v: string) => {
    setSelectedEstado(v);
    setCurrentPage(1);
  }, []);

  const handleLineaChange = useCallback((v: string) => {
    setSelectedLinea(v);
    setCurrentPage(1);
  }, []);

  const handleComisionChange = useCallback((v: string) => {
    setSelectedComision(v);
    setCurrentPage(1);
  }, []);

  // Detail dialog handlers
  const handleSelectInitiative = useCallback((id: string) => {
    setSelectedId(id);
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
    setSelectedId(null);
  }, []);

  const selectedInitiative = useMemo(
    () => allIniciativas.find((i) => i.id === selectedId) ?? null,
    [allIniciativas, selectedId]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold mb-2">
          Iniciativas Legislativas
        </h1>
        <p className="text-muted-foreground">
          Repositorio de acuerdos, proposiciones y debates del Concejo de
          Medellin. Consulta el estado, trazabilidad y autores de cada
          iniciativa.
        </p>
      </div>

      {/* Stats Summary */}
      <StatsSummary iniciativas={filteredIniciativas} />

      {/* Filter Bar */}
      <FilterBarIniciativas
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedTipo={selectedTipo}
        onTipoChange={handleTipoChange}
        selectedEstado={selectedEstado}
        onEstadoChange={handleEstadoChange}
        selectedLinea={selectedLinea}
        onLineaChange={handleLineaChange}
        selectedComision={selectedComision}
        onComisionChange={handleComisionChange}
        filteredCount={filteredIniciativas.length}
        totalCount={allIniciativas.length}
      />

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <ViewToggle
          view={viewMode}
          onChange={(v) => {
            setViewMode(v as ViewMode);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Views */}
      {viewMode === "table" && (
        <TableView
          iniciativas={filteredIniciativas}
          onSelect={handleSelectInitiative}
          page={currentPage}
          onPageChange={setCurrentPage}
        />
      )}

      {viewMode === "kanban" && (
        <KanbanView
          iniciativas={filteredIniciativas}
          autores={allAutores}
          onSelect={handleSelectInitiative}
        />
      )}

      {viewMode === "timeline" && (
        <TimelineView
          iniciativas={filteredIniciativas}
          onSelect={handleSelectInitiative}
        />
      )}

      {/* Detail Dialog */}
      <InitiativeDetailDialog
        initiative={selectedInitiative}
        autores={allAutores}
        open={dialogOpen}
        onClose={handleCloseDialog}
      />
    </div>
  );
}
