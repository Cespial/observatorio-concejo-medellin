"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MAP_INDICATOR_OPTIONS } from "@/lib/mock-data/map-indicators";
import { BarChart3 } from "lucide-react";

type IndicatorSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

export function IndicatorSelector({ value, onChange }: IndicatorSelectorProps) {
  const selected = MAP_INDICATOR_OPTIONS.find((opt) => opt.value === value);

  return (
    <div className="rounded-lg bg-background/95 backdrop-blur shadow-lg border p-3 w-64">
      <div className="flex items-center gap-2 mb-2">
        <BarChart3 className="h-4 w-4 text-institucional" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Indicador
        </span>
      </div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full text-sm">
          <SelectValue placeholder="Selecciona indicador" />
        </SelectTrigger>
        <SelectContent>
          {MAP_INDICATOR_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex flex-col">
                <span>{option.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selected && (
        <p className="mt-1.5 text-xs text-muted-foreground">
          Unidad: {selected.unit}
        </p>
      )}
    </div>
  );
}
