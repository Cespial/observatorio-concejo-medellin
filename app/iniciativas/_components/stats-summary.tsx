"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ObPieChart } from "@/components/charts/pie-chart";
import { ObBarChart } from "@/components/charts/bar-chart";
import type { InitiativeMock } from "@/lib/mock-data/iniciativas";
import type { DataPoint } from "@/lib/types/chart";
import {
  FileText,
  CheckCircle2,
  Clock,
  Archive,
  CalendarDays,
} from "lucide-react";

const ESTADO_COLORS: Record<string, string> = {
  radicada: "#3B82F6",
  en_comision: "#EAB308",
  primer_debate: "#8B5CF6",
  segundo_debate: "#6366F1",
  aprobada: "#22C55E",
  archivada: "#6B7280",
  retirada: "#EF4444",
};

const ESTADO_LABELS: Record<string, string> = {
  radicada: "Radicada",
  en_comision: "En Comision",
  primer_debate: "Primer Debate",
  segundo_debate: "Segundo Debate",
  aprobada: "Aprobada",
  archivada: "Archivada",
  retirada: "Retirada",
};

const TIPO_LABELS: Record<string, string> = {
  acuerdo: "Acuerdo",
  proposicion: "Proposicion",
  resolucion: "Resolucion",
  debate: "Debate",
  otro: "Otro",
};

type StatsSummaryProps = {
  iniciativas: InitiativeMock[];
};

export function StatsSummary({ iniciativas }: StatsSummaryProps) {
  const total = iniciativas.length;
  const aprobadas = iniciativas.filter((i) => i.estado === "aprobada").length;
  const enTramite = iniciativas.filter((i) =>
    ["radicada", "en_comision", "primer_debate", "segundo_debate"].includes(
      i.estado
    )
  ).length;
  const archivadas = iniciativas.filter(
    (i) => i.estado === "archivada"
  ).length;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const esteMes = iniciativas.filter((i) => {
    const d = new Date(i.fecha_radicacion);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  }).length;

  const approvalRate =
    total > 0 ? ((aprobadas / total) * 100).toFixed(1) : "0.0";

  // Pie chart data: distribution by estado
  const estadoCounts: Record<string, number> = {};
  for (const ini of iniciativas) {
    estadoCounts[ini.estado] = (estadoCounts[ini.estado] || 0) + 1;
  }
  const pieData: DataPoint[] = Object.entries(estadoCounts).map(
    ([estado, count]) => ({
      label: ESTADO_LABELS[estado] || estado,
      value: count,
      color: ESTADO_COLORS[estado] || "#6B7280",
    })
  );

  // Bar chart data: count by tipo
  const tipoCounts: Record<string, number> = {};
  for (const ini of iniciativas) {
    tipoCounts[ini.tipo] = (tipoCounts[ini.tipo] || 0) + 1;
  }
  const barData = Object.entries(tipoCounts).map(([tipo, count]) => ({
    tipo: TIPO_LABELS[tipo] || tipo,
    cantidad: count,
  }));

  const statCards = [
    {
      label: "Total",
      value: total,
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Aprobadas",
      value: aprobadas,
      suffix: total > 0 ? ` (${((aprobadas / total) * 100).toFixed(0)}%)` : "",
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "En Tramite",
      value: enTramite,
      icon: Clock,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Archivadas",
      value: archivadas,
      icon: Archive,
      color: "text-gray-600",
      bg: "bg-gray-50",
    },
    {
      label: "Este Mes",
      value: esteMes,
      icon: CalendarDays,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stat cards row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-3 p-4">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.bg}`}
              >
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold leading-none">
                  {stat.value}
                  {stat.suffix && (
                    <span className="text-sm font-normal text-muted-foreground">
                      {stat.suffix}
                    </span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mini charts row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ObPieChart
          data={pieData}
          title="Distribucion por Estado"
          height={220}
          donut
          centerLabel="Total"
          centerValue={total}
        />

        <ObBarChart
          data={barData}
          xKey="tipo"
          series={[{ key: "cantidad", name: "Cantidad" }]}
          title="Iniciativas por Tipo"
          height={220}
        />

        <Card>
          <CardContent className="flex flex-col items-center justify-center h-full py-8">
            <p className="text-sm text-muted-foreground mb-2">
              Tasa de Aprobacion
            </p>
            <p className="text-5xl font-bold text-green-600">{approvalRate}%</p>
            <p className="text-xs text-muted-foreground mt-2">
              {aprobadas} de {total} iniciativas aprobadas
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
