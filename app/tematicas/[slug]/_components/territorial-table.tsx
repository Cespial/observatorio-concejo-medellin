"use client";

import { useState, useMemo, useCallback } from "react";
import { Download, ArrowUpDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { ComunaComparison } from "@/lib/mock-data/types";

type SortKey = "nombre" | "valor" | "poblacion" | "tasa";
type SortDir = "asc" | "desc";

type TerritorialTableProps = {
  comunaComparison: ComunaComparison[];
};

type EnrichedRow = ComunaComparison & { tasa: number };

export function TerritorialTable({ comunaComparison }: TerritorialTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("valor");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const enrichedData: EnrichedRow[] = useMemo(() => {
    return comunaComparison.map((c) => ({
      ...c,
      tasa: c.poblacion > 0 ? (c.valor / c.poblacion) * 100_000 : 0,
    }));
  }, [comunaComparison]);

  const sortedData = useMemo(() => {
    return [...enrichedData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      const aNum = Number(aVal);
      const bNum = Number(bVal);
      return sortDir === "asc" ? aNum - bNum : bNum - aNum;
    });
  }, [enrichedData, sortKey, sortDir]);

  const handleSort = useCallback(
    (key: SortKey) => {
      if (sortKey === key) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      } else {
        setSortKey(key);
        setSortDir("desc");
      }
    },
    [sortKey]
  );

  const handleExportCsv = useCallback(() => {
    const header = "Nombre,Codigo,Valor,Poblacion,Tasa por 100k";
    const rows = sortedData.map(
      (r) => `"${r.nombre}",${r.codigo},${r.valor},${r.poblacion},${r.tasa.toFixed(1)}`
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "datos_territoriales.csv";
    link.click();
    URL.revokeObjectURL(url);
  }, [sortedData]);

  const columns: { key: SortKey; label: string }[] = [
    { key: "nombre", label: "Nombre" },
    { key: "valor", label: "Valor" },
    { key: "poblacion", label: "Poblacion" },
    { key: "tasa", label: "Tasa por 100k" },
  ];

  return (
    <section>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">
              Datos Territoriales por Comuna
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCsv}
              className="gap-1.5"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Exportar CSV</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground"
                      onClick={() => handleSort(col.key)}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{col.label}</span>
                        <ArrowUpDown
                          className={cn(
                            "h-3.5 w-3.5 shrink-0",
                            sortKey === col.key
                              ? "text-foreground"
                              : "text-muted-foreground/50"
                          )}
                        />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedData.map((row) => (
                  <tr
                    key={row.codigo}
                    className="border-b last:border-b-0 transition-colors hover:bg-muted/30"
                  >
                    <td className="px-4 py-3 font-medium">{row.nombre}</td>
                    <td className="px-4 py-3">{formatNumber(row.valor, 1)}</td>
                    <td className="px-4 py-3">
                      {formatNumber(row.poblacion)}
                    </td>
                    <td className="px-4 py-3">{formatNumber(row.tasa, 1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground">
            Fuente: Observatorio Distrital — Datos 2025. Tasa calculada por
            100.000 habitantes.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
