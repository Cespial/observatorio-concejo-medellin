import {
  LayoutDashboard,
  Shield,
  GraduationCap,
  TrendingUp,
  Bus,
  Leaf,
  Heart,
  Map,
  FileText,
  BookOpen,
  Bot,
  BookCheck,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const SITE_NAME = "Observatorio Distrital";
export const SITE_DESCRIPTION =
  "Observatorio del Concejo de Medellín — Plataforma de datos abiertos, indicadores y seguimiento legislativo";

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Dashboard",
    items: [
      { label: "Panel General", href: "/", icon: LayoutDashboard },
    ],
  },
  {
    label: "Líneas Temáticas",
    items: [
      { label: "Seguridad", href: "/tematicas/seguridad", icon: Shield },
      { label: "Educación", href: "/tematicas/educacion", icon: GraduationCap },
      { label: "Economía", href: "/tematicas/economia", icon: TrendingUp },
      { label: "Movilidad", href: "/tematicas/movilidad", icon: Bus },
      { label: "Medio Ambiente", href: "/tematicas/ambiente", icon: Leaf },
      { label: "Salud", href: "/tematicas/salud", icon: Heart },
    ],
  },
  {
    label: "Herramientas",
    items: [
      { label: "Mapa Distrital", href: "/mapa", icon: Map },
      { label: "Iniciativas", href: "/iniciativas", icon: FileText },
      { label: "Productos", href: "/productos", icon: BookOpen },
      { label: "Asistente IA", href: "/chat", icon: Bot, badge: "Beta" },
      { label: "Anexo Técnico", href: "/anexo-tecnico", icon: BookCheck },
    ],
  },
];

export type ThematicLineConfig = {
  slug: string;
  name: string;
  color: string;
  bgColor: string;
  icon: LucideIcon;
};

export const THEMATIC_LINES: ThematicLineConfig[] = [
  { slug: "seguridad", name: "Seguridad y Convivencia", color: "#DC2626", bgColor: "#FEE2E2", icon: Shield },
  { slug: "educacion", name: "Educación y Cultura", color: "#2563EB", bgColor: "#DBEAFE", icon: GraduationCap },
  { slug: "economia", name: "Economía y Empleo", color: "#16A34A", bgColor: "#DCFCE7", icon: TrendingUp },
  { slug: "movilidad", name: "Movilidad y Transporte", color: "#7C3AED", bgColor: "#EDE9FE", icon: Bus },
  { slug: "ambiente", name: "Medio Ambiente", color: "#059669", bgColor: "#D1FAE5", icon: Leaf },
  { slug: "salud", name: "Salud Pública", color: "#EA580C", bgColor: "#FED7AA", icon: Heart },
];

export const CHART_COLORS = [
  "#1B3A5C",
  "#C9A94E",
  "#E8632B",
  "#2563EB",
  "#16A34A",
  "#7C3AED",
  "#059669",
  "#EA580C",
  "#DC2626",
  "#0891B2",
];

export const CHART_COLORS_LIGHT = [
  "#D4DDE8",
  "#F5EBD0",
  "#FADACE",
  "#DBEAFE",
  "#DCFCE7",
  "#EDE9FE",
  "#D1FAE5",
  "#FED7AA",
  "#FEE2E2",
  "#CFFAFE",
];
