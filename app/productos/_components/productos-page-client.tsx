"use client";

import { useState, useMemo } from "react";
import { SearchX } from "lucide-react";
import { MOCK_PRODUCTOS } from "@/lib/mock-data/productos";
import { EmptyState } from "@/components/shared/empty-state";
import { FilterBarProductos } from "./filter-bar-productos";
import { ProductGrid } from "./product-grid";
import { ProductList } from "./product-list";

export function ProductosPageClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTipo, setSelectedTipo] = useState("todos");
  const [selectedLinea, setSelectedLinea] = useState("todas");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProductos = useMemo(() => {
    return MOCK_PRODUCTOS.filter((producto) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          producto.titulo.toLowerCase().includes(query) ||
          producto.descripcion.toLowerCase().includes(query) ||
          producto.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          producto.autor.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Tipo filter
      if (selectedTipo !== "todos" && producto.tipo !== selectedTipo) {
        return false;
      }

      // Linea tematica filter
      if (
        selectedLinea !== "todas" &&
        producto.linea_tematica !== selectedLinea
      ) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedTipo, selectedLinea]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold mb-2">
          Productos y Publicaciones
        </h1>
        <p className="text-muted-foreground">
          Informes, boletines, infografías y contenido multimedia del
          Observatorio Distrital del Concejo de Medellín.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <FilterBarProductos
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTipo={selectedTipo}
          onTipoChange={setSelectedTipo}
          selectedLinea={selectedLinea}
          onLineaChange={setSelectedLinea}
          viewMode={viewMode}
          onViewChange={setViewMode}
        />
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-4">
        Mostrando {filteredProductos.length} de {MOCK_PRODUCTOS.length} productos
      </p>

      {/* Content */}
      {filteredProductos.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="Sin resultados"
          description="No se encontraron productos que coincidan con los filtros seleccionados. Intenta ajustar tu búsqueda."
          action={{
            label: "Limpiar filtros",
            onClick: () => {
              setSearchQuery("");
              setSelectedTipo("todos");
              setSelectedLinea("todas");
            },
          }}
        />
      ) : viewMode === "grid" ? (
        <ProductGrid productos={filteredProductos} />
      ) : (
        <ProductList productos={filteredProductos} />
      )}
    </div>
  );
}
