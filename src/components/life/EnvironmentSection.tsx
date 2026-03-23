import { motion } from "framer-motion";
import { TreePine, Droplets, Leaf, Wind } from "lucide-react";
import PrincipleCard from "./PrincipleCard";

const items = [
  { icon: TreePine, title: "Tropical Canopy", desc: "Dense teak, rosewood, and bamboo forests envelope the land, creating a natural microclimate 3–5°C cooler than surrounding areas." },
  { icon: Droplets, title: "Natural Waterways", desc: "Seasonal streams and natural springs provide year-round water, feeding the food forest and community through gravity-fed systems." },
  { icon: Leaf, title: "Biodiversity", desc: "Home to over 200 species of birds, medicinal plants, and endemic wildlife — a living laboratory for children and researchers." },
  { icon: Wind, title: "Monsoon Rhythms", desc: "Two monsoon seasons shape the agricultural calendar, filling rainwater harvesting tanks and renewing the soil's fertility." },
];

const EnvironmentSection = () => (
  <section className="py-24 md:py-36 bg-background">
    <div className="max-w-[1200px] mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="text-secondary font-body text-sm tracking-[0.3em] uppercase mb-4">The Land</p>
        <h2 className="font-heading text-4xl md:text-6xl font-medium text-foreground leading-tight mb-6">
          Wayanad's <span className="italic text-primary">Living Canvas</span>
        </h2>
        <p className="font-body text-muted-foreground text-lg max-w-3xl mx-auto">
          Nestled within the Western Ghats — a UNESCO biodiversity hotspot — erdh sits
          amidst one of the most ecologically rich landscapes on earth. Dense tropical
          forests, meandering streams, and misty valleys form not just a backdrop, but
          the foundation of how the community lives, builds, and grows.
        </p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((item, i) => (
          <PrincipleCard key={item.title} icon={item.icon} title={item.title} description={item.desc} delay={i * 0.1} />
        ))}
      </div>
    </div>
  </section>
);

export default EnvironmentSection;
