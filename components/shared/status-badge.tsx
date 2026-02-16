"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ESTADO_CONFIG: Record<
  string,
  { label: string; bg: string; text: string }
> = {
  radicada: {
    label: "Radicada",
    bg: "bg-blue-100",
    text: "text-blue-800",
  },
  en_comision: {
    label: "En Comision",
    bg: "bg-yellow-100",
    text: "text-yellow-800",
  },
  primer_debate: {
    label: "Primer Debate",
    bg: "bg-purple-100",
    text: "text-purple-800",
  },
  segundo_debate: {
    label: "Segundo Debate",
    bg: "bg-indigo-100",
    text: "text-indigo-800",
  },
  aprobada: {
    label: "Aprobada",
    bg: "bg-green-100",
    text: "text-green-800",
  },
  archivada: {
    label: "Archivada",
    bg: "bg-gray-100",
    text: "text-gray-800",
  },
  retirada: {
    label: "Retirada",
    bg: "bg-red-100",
    text: "text-red-800",
  },
};

type StatusBadgeProps = {
  estado: string;
  size?: "sm" | "md";
};

export function StatusBadge({ estado, size = "md" }: StatusBadgeProps) {
  const config = ESTADO_CONFIG[estado] ?? {
    label: estado,
    bg: "bg-gray-100",
    text: "text-gray-800",
  };

  return (
    <Badge
      className={cn(
        "border-transparent font-medium",
        config.bg,
        config.text,
        size === "sm" && "px-1.5 py-0 text-[10px]",
        size === "md" && "px-2.5 py-0.5 text-xs"
      )}
    >
      {config.label}
    </Badge>
  );
}
