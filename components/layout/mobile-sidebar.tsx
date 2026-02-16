"use client";

import { NAV_GROUPS, SITE_NAME } from "@/lib/constants";
import { NavItem } from "./nav-item";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-institucional text-white font-serif font-bold text-sm">
              OD
            </div>
            <span className="text-sm">{SITE_NAME}</span>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <nav className="space-y-6 px-3 py-4">
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
                      onClick={onClose}
                    />
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
