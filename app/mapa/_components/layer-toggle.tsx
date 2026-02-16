"use client";

import { Map, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LayerToggleProps = {
  value: "choropleth" | "bubble";
  onChange: (value: "choropleth" | "bubble") => void;
};

export function LayerToggle({ value, onChange }: LayerToggleProps) {
  return (
    <div className="rounded-lg bg-background/95 backdrop-blur shadow-lg border p-1 flex gap-1">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-3 text-xs gap-1.5",
          value === "choropleth" &&
            "bg-institucional text-white hover:bg-institucional/90 hover:text-white"
        )}
        onClick={() => onChange("choropleth")}
      >
        <Map className="h-3.5 w-3.5" />
        Coropleta
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-8 px-3 text-xs gap-1.5",
          value === "bubble" &&
            "bg-institucional text-white hover:bg-institucional/90 hover:text-white"
        )}
        onClick={() => onChange("bubble")}
      >
        <Circle className="h-3.5 w-3.5" />
        Burbujas
      </Button>
    </div>
  );
}
