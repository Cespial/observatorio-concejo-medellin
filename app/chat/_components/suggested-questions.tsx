"use client";

import {
  Shield,
  GraduationCap,
  TrendingUp,
  Bus,
  Leaf,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";

type SuggestedQuestionsProps = {
  onSelect: (question: string) => void;
};

type Suggestion = {
  question: string;
  icon: LucideIcon;
  color: string;
};

const SUGGESTIONS: Suggestion[] = [
  {
    question: "¿Cuál es la tasa actual de homicidios en Medellín?",
    icon: Shield,
    color: "text-tematica-seguridad",
  },
  {
    question: "¿Cómo ha evolucionado la cobertura educativa?",
    icon: GraduationCap,
    color: "text-tematica-educacion",
  },
  {
    question: "¿Qué comunas tienen mayor desempleo?",
    icon: TrendingUp,
    color: "text-tematica-economia",
  },
  {
    question: "¿Cuáles son las principales iniciativas de movilidad?",
    icon: Bus,
    color: "text-tematica-movilidad",
  },
  {
    question: "¿Cómo está la calidad del aire en el Valle de Aburrá?",
    icon: Leaf,
    color: "text-tematica-ambiente",
  },
  {
    question: "¿Qué avances hay en salud pública?",
    icon: Heart,
    color: "text-tematica-salud",
  },
];

export function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 max-w-3xl mx-auto">
      {SUGGESTIONS.map((suggestion) => {
        const Icon = suggestion.icon;
        return (
          <Card
            key={suggestion.question}
            className="cursor-pointer border border-border/60 p-4 transition-all hover:border-institucional/40 hover:shadow-card-hover"
            onClick={() => onSelect(suggestion.question)}
          >
            <div className="flex items-start gap-3">
              <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${suggestion.color}`} />
              <p className="text-sm text-foreground leading-snug">
                {suggestion.question}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
