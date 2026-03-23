import { motion } from "framer-motion";
import { Home } from "lucide-react";
import ParallaxSection from "./ParallaxSection";
import BulletList from "./BulletList";
import archReturnImg from "@/assets/life-architecture-return.jpg";

const bullets = [
  "Rammed earth & laterite stone walls",
  "Bamboo & reclaimed timber frameworks",
  "Courtyard-centric floor plans",
  "Passive cooling — no air conditioning needed",
  "Rainwater harvesting integrated into every roofline",
];

const ArchitectureReturnSection = () => (
  <ParallaxSection image={archReturnImg} alt="Rammed earth courtyard home">
    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary/30 backdrop-blur-sm flex items-center justify-center">
          <Home className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
        </div>
        <p className="font-body text-sm tracking-[0.2em] uppercase text-sand">Built Form</p>
      </div>
      <h2 className="font-heading text-4xl md:text-5xl font-medium text-primary-foreground leading-tight mb-6">
        The Architecture <br /><span className="italic">of Return</span>
      </h2>
      <p className="font-body text-primary-foreground/85 text-base leading-relaxed mb-6">
        Every home at erdh is a return to fitrah — the innate human disposition
        toward harmony with the natural world. A return to the earth beneath your
        feet, to the materials your ancestors trusted, to a way of building that
        heals rather than extracts. Rammed earth walls breathe with the seasons.
        Bamboo frameworks flex in the monsoon wind. Courtyards open to the sky,
        inviting rain, light, and birdsong into the heart of domestic life.
      </p>
      <BulletList items={bullets} />
    </motion.div>
  </ParallaxSection>
);

export default ArchitectureReturnSection;
