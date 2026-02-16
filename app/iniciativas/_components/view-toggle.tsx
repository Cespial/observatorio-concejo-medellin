"use client";

import { Button } from "@/components/ui/button";
import { TableProperties, LayoutGrid, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "table" | "kanban" | "timeline";

type ViewToggleProps = {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
};

const VIEW_OPTIONS: { value: ViewMode; label: string; icon: typeof Clock }[] = [
  { value: "table", label: "Tabla", icon: TableProperties },
  { value: "kanban", label: "Kanban", icon: LayoutGrid },
  { value: "timeline", label: "Cronologia", icon: Clock },
];

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border p-1">
      {VIEW_OPTIONS.map((opt) => (
        <Button
          key={opt.value}
          variant={view === opt.value ? "default" : "ghost"}
          size="sm"
          className={cn(
            "h-8 gap-1.5 text-xs",
            view === opt.value && "shadow-sm"
          )}
          onClick={() => onChange(opt.value)}
        >
          <opt.icon className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{opt.label}</span>
        </Button>
      ))}
    </div>
  );
}
