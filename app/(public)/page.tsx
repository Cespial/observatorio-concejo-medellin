import { HeroSection } from "./_components/hero-section";
import { TickerSection } from "./_components/ticker-section";
import { DashboardCardsSection } from "./_components/dashboard-cards-section";
import { ProductsCarousel } from "./_components/products-carousel";
import { CityPulseSection } from "./_components/city-pulse-section";
import { AlliancesSection } from "./_components/alliances-section";
import { MethodologySection } from "./_components/methodology-section";
import { RecentInitiativesSection } from "./_components/recent-initiatives-section";
import { getRecentIniciativas } from "@/lib/services/iniciativas";

export default async function HomePage() {
  const recentInitiatives = await getRecentIniciativas(4);

  return (
    <div className="min-w-0">
      <HeroSection />
      <TickerSection />
      <DashboardCardsSection />
      <ProductsCarousel />
      <CityPulseSection />
      <RecentInitiativesSection serverInitiatives={recentInitiatives} />
      <MethodologySection />
      <AlliancesSection />
    </div>
  );
}
