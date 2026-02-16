"use client";

import { useState, type ReactNode } from "react";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Column = {
  key: string;
  label: string;
  sortable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, row: any) => ReactNode;
};

type DataTableProps = {
  columns: Column[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  total?: number;
  page?: number;
  pageSize?: number;
  onSort?: (key: string, direction: "asc" | "desc") => void;
  onPageChange?: (page: number) => void;
  loading?: boolean;
};

export function DataTable({
  columns,
  data,
  total,
  page = 1,
  pageSize = 10,
  onSort,
  onPageChange,
  loading = false,
}: DataTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const totalItems = total ?? data.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  function handleSort(key: string) {
    const newDirection =
      sortKey === key && sortDirection === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortDirection(newDirection);
    onSort?.(key, newDirection);
  }

  if (loading) {
    return (
      <div className="w-full space-y-3">
        <div className="rounded-lg border">
          <div className="border-b bg-muted/50 p-3">
            <div className="flex gap-4">
              {columns.map((col) => (
                <Skeleton key={col.key} className="h-4 flex-1" />
              ))}
            </div>
          </div>
          {Array.from({ length: pageSize }).map((_, i) => (
            <div key={i} className="border-b last:border-b-0 p-3">
              <div className="flex gap-4">
                {columns.map((col) => (
                  <Skeleton key={col.key} className="h-4 flex-1" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="rounded-lg border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-4 py-3 text-left font-medium text-muted-foreground",
                    col.sortable && "cursor-pointer select-none hover:text-foreground"
                  )}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.label}</span>
                    {col.sortable && (
                      <ArrowUpDown
                        className={cn(
                          "h-3.5 w-3.5 shrink-0",
                          sortKey === col.key
                            ? "text-foreground"
                            : "text-muted-foreground/50"
                        )}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  No se encontraron resultados.
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b last:border-b-0 transition-colors hover:bg-muted/30"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      {col.render
                        ? col.render(row[col.key], row)
                        : (row[col.key] ?? "-")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-1">
          <p className="text-sm text-muted-foreground">
            Mostrando {(page - 1) * pageSize + 1} a{" "}
            {Math.min(page * pageSize, totalItems)} de {totalItems} resultados
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => onPageChange?.(page - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Anterior</span>
            </Button>
            <span className="text-sm text-muted-foreground">
              {page} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => onPageChange?.(page + 1)}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Siguiente</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
