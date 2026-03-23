import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Leaf, Shield, Zap, BookOpen, TreePine } from "lucide-react";

const pillars = [
  { icon: Users, meaning: "Live and Grow Together", label: "Community" },
  { icon: Leaf, meaning: "Care for the Land", label: "Stewardship" },
  { icon: Shield, meaning: "Live with Modesty", label: "Haya" },
  { icon: Zap, meaning: "Build a Self-Reliant Life", label: "Resilience" },
  { icon: BookOpen, meaning: "Learn and Work with Purpose", label: "Education & Work" },
  { icon: TreePine, meaning: "Grow Your Own Food", label: "Permaculture" },
];

const PillarsStrip = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-16 md:py-20 px-6 bg-background">
      <div ref={ref} className="max-w-[900px] mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 md:gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="flex flex-col items-center gap-3 text-center max-w-[140px] mx-auto"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <pillar.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <span className="font-body text-xs sm:text-sm font-medium text-primary leading-tight">
                {pillar.meaning}
              </span>
              <span className="font-body text-[10px] tracking-[0.15em] uppercase text-secondary">
                {pillar.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PillarsStrip;
