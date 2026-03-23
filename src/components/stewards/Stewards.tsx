import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ExpressInterestCTA from "@/components/ui/ExpressInterestCTA";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import StewardCard from "@/components/stewards/StewardCard";
import StewardModal from "@/components/stewards/StewardModal";
import InviteCard from "@/components/stewards/InviteCard";
import { stewards, type Steward } from "@/components/stewards/stewardsData";

const Stewards = () => {
  const [selectedSteward, setSelectedSteward] = useState<Steward | null>(null);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 md:pt-24">
        <Breadcrumbs />
      </div>

      {/* Hero */}
      <section ref={heroRef} className="py-16 md:py-24 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-secondary font-body text-sm tracking-[0.3em] uppercase mb-4">
              The People of erdh
            </p>
            <h1 className="font-heading text-4xl md:text-6xl font-medium text-foreground leading-tight mb-6">
              Our <span className="italic text-primary">Stewards</span>
            </h1>
            <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
              erdh is its people. Every family, every individual who joins this journey 
              becomes a steward — someone who cares for the land, the community, and 
              the shared vision. These are their stories, in their own words.
            </p>
            <div className="w-16 h-px bg-secondary mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Steward Cards Grid */}
      <section className="pb-24 md:pb-36 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stewards.map((steward, i) => (
              <StewardCard
                key={steward.name}
                steward={steward}
                index={i}
                onClick={() => setSelectedSteward(steward)}
              />
            ))}
            <InviteCard index={stewards.length} />
          </div>
        </div>
      </section>

      <StewardModal steward={selectedSteward} onClose={() => setSelectedSteward(null)} />
      <ExpressInterestCTA />
      <Footer />
    </div>
  );
};

export default Stewards;
