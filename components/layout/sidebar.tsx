"use client";

import { NAV_GROUPS } from "@/lib/constants";
import { NavItem } from "./nav-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r bg-background">
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-6 px-3">
          {NAV_GROUPS.map((group, i) => (
            <div key={group.label}>
              {i > 0 && <Separator className="mb-4" />}
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavItem
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                    badge={item.badge}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t p-4">
        <p className="text-xs text-muted-foreground mb-2">Ultima actualizacion</p>
        <p className="text-sm font-medium">Febrero 2026</p>
      </div>
    </aside>
  );
}
