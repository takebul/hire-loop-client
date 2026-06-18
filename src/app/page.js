import CallToActionSection from "@/components/CallToActionSection";
import FeaturesSection from "@/components/FeaturesSection";
import Hero from "@/components/Hero";
import PricingSection from "@/components/PricingSection";
import StatsSection from "@/components/StatsSection";
import Stats from "../components/Stats";
import JobDiscoverySection from "@/components/JobDiscoverySection";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <JobDiscoverySection />
      <FeaturesSection />
      <PricingSection />
      <CallToActionSection />
    </main>
  );
}
