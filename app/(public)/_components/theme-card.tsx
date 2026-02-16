"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkline } from "@/components/charts/sparkline";
import { TrendIndicator } from "@/components/shared/trend-indicator";
import { formatNumber } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type ThemeCardProps = {
  slug: string;
  name: string;
  color: string;
  bgColor: string;
  icon: LucideIcon;
  mainKpi: {
    label: string;
    value: number;
    unit: string;
    change: number;
    positiveIsGood: boolean;
  };
  sparklineData: number[];
  indicatorCount: number;
};

export function ThemeCard({
  slug, name, color, bgColor, icon: Icon,
  mainKpi, sparklineData, indicatorCount,
}: ThemeCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link href={`/tematicas/${slug}`}>
        <Card className="group relative overflow-hidden border hover:shadow-card-hover transition-all duration-300 h-full">
          <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: color }} />
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: bgColor }}
                >
                  <Icon className="h-5 w-5" style={{ color }} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm leading-tight">{name}</h3>
                  <Badge variant="secondary" className="mt-1 text-[10px]">
                    {indicatorCount} indicadores
                  </Badge>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{mainKpi.label}</p>
                <p className="text-2xl font-bold mt-0.5">
                  {formatNumber(mainKpi.value)}
                  <span className="text-sm font-normal text-muted-foreground ml-1">{mainKpi.unit}</span>
                </p>
                <TrendIndicator
                  value={mainKpi.change}
                  positiveIsGood={mainKpi.positiveIsGood}
                  className="mt-1"
                />
              </div>
              <Sparkline data={sparklineData} color={color} />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
