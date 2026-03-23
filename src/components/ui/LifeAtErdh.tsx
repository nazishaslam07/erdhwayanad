import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ExpressInterestCTA from "@/components/ui/ExpressInterestCTA";
import ParallaxHero from "@/components/life/ParallaxHero";
import EnvironmentSection from "@/components/life/EnvironmentSection";
import ArchitectureReturnSection from "@/components/life/ArchitectureReturnSection";
import ArchitectureModestySection from "@/components/life/ArchitectureModestySection";
import LearningSection from "@/components/life/LearningSection";
import FoodForestSection from "@/components/life/FoodForestSection";
import WaterEnergySection from "@/components/life/WaterEnergySection";
import DailyRhythmSection from "@/components/life/DailyRhythmSection";
import LifeCtaSection from "@/components/life/LifeCtaSection";
import environmentImg from "@/assets/life-environment.jpg";

const LifeAtErdh = () => (
  <div className="min-h-screen bg-background">
    {/* Back nav */}
    <div className="fixed top-0 left-0 right-0 z-50 bg-foreground/20 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center">
        <Link
          to="/"
          className="flex items-center gap-2 font-body text-sm text-primary-foreground hover:text-sand transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>

    {/* Hero */}
    <ParallaxHero image={environmentImg} alt="Wayanad forest canopy">
      <div className="text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-body text-sm tracking-[0.3em] uppercase text-sand mb-4"
        >
          Life at erdh
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-medium text-primary-foreground leading-tight mb-6"
        >
          Where the Earth <br />
          <span className="italic">Remembers You</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="font-body text-primary-foreground/80 text-lg max-w-2xl mx-auto"
        >
          A glimpse into the rhythms, architecture, and natural world that
          shape daily existence at <span className="font-medium">erdh</span> 1.0 wayanad.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12"
        >
          <div className="w-px h-16 bg-primary-foreground/40 mx-auto animate-pulse" />
        </motion.div>
      </div>
    </ParallaxHero>

    <EnvironmentSection />
    <ArchitectureReturnSection />
    <ArchitectureModestySection />
    <LearningSection />
    <FoodForestSection />
    <WaterEnergySection />
    <DailyRhythmSection />
    <LifeCtaSection />
    <ExpressInterestCTA />
    <Footer />
  </div>
);

export default LifeAtErdh;
