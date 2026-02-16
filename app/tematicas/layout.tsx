import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function TematicasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
