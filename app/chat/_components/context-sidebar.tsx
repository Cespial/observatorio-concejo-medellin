"use client";

import {
  Shield,
  GraduationCap,
  TrendingUp,
  Bus,
  Leaf,
  Heart,
  PanelRightClose,
  PanelRightOpen,
  type LucideIcon,
} from "lucide-react";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkline } from "@/components/charts/sparkline";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Indicator = {
  name: string;
  value: string;
  unit: string;
  trend: "up" | "down" | "stable";
  sparkData: number[];
};

type ContextEntry = {
  keywords: string[];
  line: string;
  icon: LucideIcon;
  color: string;
  indicators: Indicator[];
};

const CONTEXT_MAP: ContextEntry[] = [
  {
    keywords: ["seguridad", "homicidio", "hurto", "delito", "crimen", "violencia"],
    line: "Seguridad y Convivencia",
    icon: Shield,
    color: "#DC2626",
    indicators: [
      {
        name: "Tasa de homicidios",
        value: "16.8",
        unit: "por 100k hab.",
        trend: "down",
        sparkData: [25.2, 23.1, 21.5, 20.3, 19.1, 18.4, 17.6, 16.8],
      },
      {
        name: "Hurtos reportados",
        value: "34,521",
        unit: "casos/año",
        trend: "down",
        sparkData: [41200, 39800, 38100, 36500, 35200, 34521],
      },
    ],
  },
  {
    keywords: ["educación", "cobertura", "escolar", "saber", "colegio", "universidad", "estudiante"],
    line: "Educación y Cultura",
    icon: GraduationCap,
    color: "#2563EB",
    indicators: [
      {
        name: "Cobertura educativa",
        value: "96.8",
        unit: "%",
        trend: "up",
        sparkData: [91.2, 92.5, 93.8, 94.6, 95.4, 96.1, 96.8],
      },
      {
        name: "Puntaje Saber 11",
        value: "263",
        unit: "promedio",
        trend: "up",
        sparkData: [248, 251, 254, 257, 260, 263],
      },
    ],
  },
  {
    keywords: ["economía", "empleo", "desempleo", "trabajo", "pobreza", "ingreso", "PIB"],
    line: "Economía y Empleo",
    icon: TrendingUp,
    color: "#16A34A",
    indicators: [
      {
        name: "Tasa de desempleo",
        value: "10.2",
        unit: "%",
        trend: "down",
        sparkData: [14.5, 13.8, 12.6, 11.9, 11.1, 10.6, 10.2],
      },
      {
        name: "Informalidad laboral",
        value: "42.1",
        unit: "%",
        trend: "down",
        sparkData: [46.8, 45.9, 44.7, 43.8, 42.9, 42.1],
      },
    ],
  },
  {
    keywords: ["movilidad", "transporte", "metro", "bus", "tráfico", "vía", "bicicleta"],
    line: "Movilidad y Transporte",
    icon: Bus,
    color: "#7C3AED",
    indicators: [
      {
        name: "Pasajeros/día transporte público",
        value: "892k",
        unit: "pasajeros",
        trend: "up",
        sparkData: [780, 810, 835, 856, 871, 885, 892],
      },
      {
        name: "Km ciclovías",
        value: "128",
        unit: "km",
        trend: "up",
        sparkData: [85, 92, 98, 106, 115, 122, 128],
      },
    ],
  },
  {
    keywords: ["ambiente", "aire", "PM2.5", "contaminación", "residuo", "árbol", "verde"],
    line: "Medio Ambiente",
    icon: Leaf,
    color: "#059669",
    indicators: [
      {
        name: "PM2.5 promedio",
        value: "28",
        unit: "µg/m³",
        trend: "down",
        sparkData: [35, 33, 31, 30, 29, 28.5, 28],
      },
      {
        name: "Árboles plantados",
        value: "45,200",
        unit: "unidades/año",
        trend: "up",
        sparkData: [28000, 31000, 35000, 38000, 41000, 45200],
      },
    ],
  },
  {
    keywords: ["salud", "mortalidad", "hospital", "vacunación", "enfermedad", "EPS"],
    line: "Salud Pública",
    icon: Heart,
    color: "#EA580C",
    indicators: [
      {
        name: "Mortalidad infantil",
        value: "7.2",
        unit: "por 1k nacidos vivos",
        trend: "down",
        sparkData: [9.8, 9.1, 8.6, 8.1, 7.8, 7.5, 7.2],
      },
      {
        name: "Cobertura vacunación",
        value: "94.3",
        unit: "%",
        trend: "up",
        sparkData: [88, 89.5, 91, 92.2, 93.1, 93.8, 94.3],
      },
    ],
  },
];

type ContextSidebarProps = {
  messages: Message[];
  isOpen: boolean;
  onToggle: () => void;
};

export function ContextSidebar({
  messages,
  isOpen,
  onToggle,
}: ContextSidebarProps) {
  const matchedContexts = useMemo(() => {
    const allText = messages
      .map((m) => m.content)
      .join(" ")
      .toLowerCase();

    if (!allText.trim()) return [];

    return CONTEXT_MAP.filter((ctx) =>
      ctx.keywords.some((kw) => allText.includes(kw.toLowerCase()))
    );
  }, [messages]);

  return (
    <div className="flex h-full">
      <div className="flex items-start pt-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8"
          title={isOpen ? "Cerrar panel de contexto" : "Abrir panel de contexto"}
        >
          {isOpen ? (
            <PanelRightClose className="h-4 w-4" />
          ) : (
            <PanelRightOpen className="h-4 w-4" />
          )}
        </Button>
      </div>

      {isOpen && (
        <div className="w-[300px] border-l bg-muted/30">
          <div className="border-b px-4 py-3">
            <h3 className="text-sm font-semibold">Contexto Relacionado</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Indicadores relevantes a la conversación
            </p>
          </div>

          <ScrollArea className="h-[calc(100%-56px)]">
            <div className="p-4 space-y-4">
              {matchedContexts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">
                    Los indicadores relacionados aparecerán aquí según el tema de
                    la conversación.
                  </p>
                </div>
              ) : (
                matchedContexts.map((ctx) => {
                  const Icon = ctx.icon;
                  return (
                    <Card key={ctx.line} className="overflow-hidden">
                      <CardHeader className="p-3 pb-2">
                        <CardTitle className="flex items-center gap-2 text-xs font-semibold">
                          <Icon
                            className="h-4 w-4"
                            style={{ color: ctx.color }}
                          />
                          {ctx.line}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-0 space-y-3">
                        {ctx.indicators.map((indicator) => (
                          <div
                            key={indicator.name}
                            className="flex items-center justify-between gap-2"
                          >
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-muted-foreground truncate">
                                {indicator.name}
                              </p>
                              <p className="text-sm font-semibold">
                                {indicator.value}
                                <span className="text-xs font-normal text-muted-foreground ml-1">
                                  {indicator.unit}
                                </span>
                              </p>
                            </div>
                            <Sparkline
                              data={indicator.sparkData}
                              width={80}
                              height={24}
                              color={ctx.color}
                              className={cn(
                                "shrink-0"
                              )}
                            />
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
