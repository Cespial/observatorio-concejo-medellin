import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function IniciativasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
