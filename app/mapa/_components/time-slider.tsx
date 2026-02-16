"use client";

import { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TimeSliderProps = {
  value: number;
  onChange: (year: number) => void;
};

const YEARS = [2023, 2024, 2025];
const ANIMATION_INTERVAL = 1500; // ms

export function TimeSlider({ value, onChange }: TimeSliderProps) {
  const [playing, setPlaying] = useState(false);

  // Auto-cycle through years when playing
  useEffect(() => {
    if (!playing) return;

    const timer = setTimeout(() => {
      const currentIndex = YEARS.indexOf(value);
      const nextIndex = (currentIndex + 1) % YEARS.length;
      onChange(YEARS[nextIndex]);
    }, ANIMATION_INTERVAL);

    return () => clearTimeout(timer);
  }, [playing, value, onChange]);

  const stop = () => setPlaying(false);
  const toggle = () => setPlaying((prev) => !prev);

  return (
    <div className="rounded-lg bg-background/95 backdrop-blur shadow-lg border px-4 py-3 flex items-center gap-4 min-w-[300px]">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0"
        onClick={toggle}
      >
        {playing ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
        <span className="sr-only">
          {playing ? "Pausar" : "Reproducir"} animacion
        </span>
      </Button>

      <div className="flex-1">
        <input
          type="range"
          min={0}
          max={YEARS.length - 1}
          step={1}
          value={YEARS.indexOf(value)}
          onChange={(e) => {
            stop();
            onChange(YEARS[parseInt(e.target.value)]);
          }}
          className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-institucional
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-institucional
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-institucional
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:cursor-pointer"
        />
        <div className="flex justify-between mt-1">
          {YEARS.map((year) => (
            <button
              key={year}
              onClick={() => {
                stop();
                onChange(year);
              }}
              className={cn(
                "text-[11px] font-medium transition-colors",
                value === year
                  ? "text-institucional font-bold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
