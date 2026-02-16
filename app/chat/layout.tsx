"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <Header onMobileMenuToggle={() => setMobileMenuOpen(true)} />
      <MobileSidebar
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
