"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Footer } from "@/components/layout/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onMobileMenuToggle={() => setMobileMenuOpen(true)} />
      <div className="flex flex-1">
        <Sidebar />
        <MobileSidebar
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
