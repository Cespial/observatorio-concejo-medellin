"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

type ChartWrapperProps = {
  title?: string;
  source?: string;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  error?: string | null;
  height?: number;
  exportable?: boolean;
};

export function ChartWrapper({
  title,
  source,
  children,
  className,
  loading = false,
  error = null,
  height = 300,
  exportable = false,
}: ChartWrapperProps) {
  if (loading) {
    return (
      <Card className={className}>
        {title && (
          <CardHeader className="pb-2">
            <Skeleton className="h-5 w-48" />
          </CardHeader>
        )}
        <CardContent>
          <Skeleton style={{ height }} className="w-full rounded-md" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        {title && (
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{title}</CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <div
            style={{ height }}
            className="flex items-center justify-center text-sm text-muted-foreground"
          >
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      {(title || exportable) && (
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            {title && <CardTitle className="text-base">{title}</CardTitle>}
            {exportable && (
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
      )}
      <CardContent className="pb-2">
        {children}
        {source && (
          <p className="mt-2 text-[10px] text-muted-foreground">
            Fuente: {source}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
