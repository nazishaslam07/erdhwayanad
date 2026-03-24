import { lazy, Suspense } from "react";
import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/ui/HeroSection";
import Footer from "@/components/ui/Footer";

// Lazy load all heavy components to reduce initial bundle for mobile networks
const WhatIsErdh = lazy(() => import("@/components/ui/WhatIsErdh"));
const PillarsStrip = lazy(() => import("@/components/ui/PillarsStrip"));
const PhilosophySection = lazy(() => import("@/components/ui/PhilosophySection"));
const WayanadSection = lazy(() => import("@/components/ui/WayanadSection"));
const FAQSection = lazy(() => import("@/components/ui/FAQSection"));
const ExploreLifeSection = lazy(() => import("@/components/ui/ExploreLifeSection"));
const ExpressInterestCTA = lazy(() => import("@/components/ui/ExpressInterestCTA"));
const FloatingWhatsApp = lazy(() => import("@/components/ui/FloatingWhatsApp"));
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
      <Suspense fallback={<SectionFallback />}>
        <WhatIsErdh />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <PillarsStrip />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <PhilosophySection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <WayanadSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <CommunitySpaces />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <MasterplanDiagram />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <PillarsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FAQSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ExploreLifeSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <JoinSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ExpressInterestCTA />
      </Suspense>
      <Footer />
      <Suspense fallback={<SectionFallback />}>
        <FloatingWhatsApp />
      </Suspense>
    </div>
  );
};

export default Index;
