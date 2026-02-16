"use client";

import { StatusBadge } from "@/components/shared/status-badge";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

type TimelineStepProps = {
  fecha: string;
  estado: string;
  descripcion: string;
  notas?: string;
  isLast?: boolean;
  isActive?: boolean;
};

export function TimelineStep({
  fecha,
  estado,
  descripcion,
  notas,
  isLast = false,
  isActive = false,
}: TimelineStepProps) {
  return (
    <div className="relative flex gap-4">
      {/* Dot and connecting line */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "mt-1 h-3 w-3 shrink-0 rounded-full border-2",
            isActive
              ? "border-green-500 bg-green-500"
              : "border-muted-foreground/30 bg-background"
          )}
        />
        {!isLast && (
          <div className="w-px flex-1 bg-border min-h-[2rem]" />
        )}
      </div>

      {/* Content */}
      <div className={cn("pb-6", isLast && "pb-0")}>
        <p className="text-xs text-muted-foreground mb-1">
          {formatDate(fecha)}
        </p>
        <div className="mb-1">
          <StatusBadge estado={estado} size="sm" />
        </div>
        <p className="text-sm text-foreground">{descripcion}</p>
        {notas && (
          <p className="mt-1 text-xs text-muted-foreground italic">{notas}</p>
        )}
      </div>
    </div>
  );
}
