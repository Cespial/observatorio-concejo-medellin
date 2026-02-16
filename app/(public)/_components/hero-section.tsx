"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Map, FileText, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/shared/animated-counter";

const stats = [
  { label: "Indicadores", value: 247, suffix: "+" },
  { label: "Comunas", value: 16, suffix: "" },
  { label: "Iniciativas", value: 1842, suffix: "" },
  { label: "Fuentes de datos", value: 14, suffix: "" },
];

const quickLinks = [
  { label: "Dashboard", href: "/", icon: BarChart3 },
  { label: "Mapa", href: "/mapa", icon: Map },
  { label: "Iniciativas", href: "/iniciativas", icon: FileText },
  { label: "Asistente IA", href: "/chat", icon: Bot },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-institucional via-institucional-700 to-institucional-900 text-white">
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm mb-6 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-dorado animate-pulse" />
              Datos actualizados — Febrero 2026
            </div>

            <h1 className="font-serif text-4xl font-bold leading-tight lg:text-5xl xl:text-6xl">
              Observatorio Distrital del{" "}
              <span className="text-dorado">Concejo de Medellin</span>
            </h1>

            <p className="mt-4 text-lg text-white/80 max-w-xl leading-relaxed">
              Plataforma de datos abiertos para el seguimiento, analisis y control
              politico del Distrito de Medellin. Una alianza entre el Concejo de
              Medellin y la Universidad EAFIT.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="bg-dorado text-institucional hover:bg-dorado-400 font-semibold" asChild>
                <Link href="/tematicas">
                  Explorar indicadores
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/productos">Ver publicaciones</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="rounded-xl bg-white/10 backdrop-blur p-5 text-center"
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="text-3xl font-bold text-dorado"
                  />
                  <p className="mt-1 text-sm text-white/70">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 rounded-lg bg-white/5 border border-white/10 p-3 text-sm hover:bg-white/10 transition-colors"
                >
                  <link.icon className="h-5 w-5 text-dorado" />
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full">
          <path
            d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
}
