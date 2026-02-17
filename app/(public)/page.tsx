import { HeroSection } from "./_components/hero-section";
import { TickerSection } from "./_components/ticker-section";
import { DashboardCardsSection } from "./_components/dashboard-cards-section";
import { ProductsCarousel } from "./_components/products-carousel";
import { CityPulseSection } from "./_components/city-pulse-section";
import { AlliancesSection } from "./_components/alliances-section";
import { MethodologySection } from "./_components/methodology-section";
import { RecentInitiativesSection } from "./_components/recent-initiatives-section";
import { getRecentIniciativas } from "@/lib/services/iniciativas";
import { getLandingPageData } from "@/lib/services/landing";

export default async function HomePage() {
  const [recentInitiatives, landingData] = await Promise.all([
    getRecentIniciativas(4),
    getLandingPageData(),
  ]);

  return (
    <div className="min-w-0">
      <HeroSection />
      <TickerSection serverData={landingData.tickerItems} />
      <DashboardCardsSection serverData={landingData.dashboardCards} />
      <ProductsCarousel />
      <CityPulseSection serverChoroplethData={landingData.choroplethData} />
      <RecentInitiativesSection serverInitiatives={recentInitiatives} />
      <MethodologySection />
      <AlliancesSection />
    </div>
  );
}
