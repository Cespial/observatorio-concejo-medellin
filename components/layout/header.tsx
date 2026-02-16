"use client";

import Link from "next/link";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SITE_NAME } from "@/lib/constants";

type HeaderProps = {
  onMobileMenuToggle: () => void;
};

export function Header({ onMobileMenuToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 lg:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 lg:hidden"
          onClick={onMobileMenuToggle}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>

        <Link href="/" className="flex items-center gap-2 mr-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-institucional text-white font-serif font-bold text-sm">
            OD
          </div>
          <div className="hidden md:block">
            <h1 className="text-sm font-semibold leading-none">{SITE_NAME}</h1>
            <p className="text-xs text-muted-foreground">Concejo de Medellín</p>
          </div>
        </Link>

        <div className="flex-1 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar indicadores, iniciativas..."
              className="pl-9 h-9 bg-muted/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <Button variant="outline" size="sm" className="hidden sm:flex" asChild>
            <Link href="/productos">Publicaciones</Link>
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:flex" asChild>
            <Link href="/anexo-tecnico">Anexo Técnico</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
