import { lazy, Suspense } from "react";
import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/ui/HeroSection";
import WhatIsErdh from "@/components/ui/WhatIsErdh";
import PillarsStrip from "@/components/ui/PillarsStrip";
import PhilosophySection from "@/components/ui/PhilosophySection";
import WayanadSection from "@/components/ui/WayanadSection";
import FAQSection from "@/components/ui/FAQSection";
import Footer from "@/components/ui/Footer";
import ExploreLifeSection from "@/components/ui/ExploreLifeSection";
import ExpressInterestCTA from "@/components/ui/ExpressInterestCTA";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";

// Lazy load heavy below-fold sections to reduce initial bundle
// CommunitySpaces: loads 15+ images + embla carousel
// MasterplanDiagram: 716 lines of interactive SVG
// JoinSection: imports country-state-city (~2MB)
// PillarsSection: can be deferred safely
const CommunitySpaces = lazy(() => import("@/components/ui/CommunitySpaces"));
const MasterplanDiagram = lazy(() => import("@/components/infographic/MasterplanDiagram"));
const JoinSection = lazy(() => import("@/components/ui/JoinSection"));
const PillarsSection = lazy(() => import("@/components/ui/PillarsSection"));

const SectionFallback = () => (
  <div className="py-24 flex items-center justify-center">
    <div className="w-8 h-px bg-primary mx-auto animate-pulse" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <WhatIsErdh />
      <PillarsStrip />
      <PhilosophySection />
      <WayanadSection />
      <Suspense fallback={<SectionFallback />}>
        <CommunitySpaces />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <MasterplanDiagram />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <PillarsSection />
      </Suspense>
      <FAQSection />
      <ExploreLifeSection />
      <Suspense fallback={<SectionFallback />}>
        <JoinSection />
      </Suspense>
      <ExpressInterestCTA />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
