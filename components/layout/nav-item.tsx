"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";

type NavItemProps = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  collapsed?: boolean;
  onClick?: () => void;
};

export function NavItem({ href, label, icon: Icon, badge, collapsed, onClick }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted",
        isActive
          ? "bg-institucional/10 text-institucional font-medium"
          : "text-muted-foreground hover:text-foreground"
      )}
      title={collapsed ? label : undefined}
    >
      <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-institucional")} />
      {!collapsed && (
        <>
          <span className="truncate">{label}</span>
          {badge && (
            <Badge variant="secondary" className="ml-auto text-[10px] px-1.5 py-0">
              {badge}
            </Badge>
          )}
        </>
      )}
    </Link>
  );
}
