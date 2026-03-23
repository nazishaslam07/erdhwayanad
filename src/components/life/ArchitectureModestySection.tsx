import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import ParallaxSection from "./ParallaxSection";
import BulletList from "./BulletList";
import archHayaImg from "@/assets/life-architecture-haya.jpg";

const bullets = [
  "Layered entry thresholds — public, semi-private, private",
  "Timber jali screens for filtered light and visual privacy",
  "Gender-considerate circulation in shared spaces",
  "Private family courtyards screened from communal pathways",
  "Natural sound buffering through planting and earth walls",
];

const ArchitectureModestySection = () => (
  <ParallaxSection image={archHayaImg} alt="Lattice screen privacy-conscious interior" reverse>
    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary/30 backdrop-blur-sm flex items-center justify-center">
          <Eye className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
        </div>
        <p className="font-body text-sm tracking-[0.2em] uppercase text-sand">Sacred Design</p>
      </div>
      <h2 className="font-heading text-4xl md:text-5xl font-medium text-primary-foreground leading-tight mb-6">
        The Architecture <br /><span className="italic">of Modesty</span>
      </h2>
      <p className="font-body text-primary-foreground/85 text-base leading-relaxed mb-6">
        Rooted in the concept of Hayā' — a deep, reverent modesty — every
        structure is designed to protect private family life while nurturing
        communal connection. Lattice screens (jali) filter light and gaze.
        Entrances are layered, never exposing the interior directly.
        Thoughtful pathways ensure comfort and dignity for all.
      </p>
      <BulletList items={bullets} />
    </motion.div>
  </ParallaxSection>
);

export default ArchitectureModestySection;
