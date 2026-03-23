import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TreePine, Home, Users, BookOpen, Wifi, Sun } from "lucide-react";

const pillars = [
  {
    number: "01",
    icon: TreePine,
    title: "Permaculture & Food Forests",
    description: "Regenerative agriculture that works with nature, not against it. Your family eats what the land provides — seasonal, organic, and hyper-local.",
  },
  {
    number: "02",
    icon: Home,
    title: "Earth-Responsive Homes",
    description: "Climate-responsive architecture rooted in local materials and techniques — laterite, bamboo, rammed earth, compressed earth blocks, lime plaster, reclaimed wood, and terracotta. Homes that breathe with the land.",
  },
  {
    number: "03",
    icon: Users,
    title: "Community Governance (Shura)",
    description: "No HOA politics. Decisions are made through consultative circles rooted in mutual respect, transparency, and collective wisdom.",
  },
  {
    number: "04",
    icon: BookOpen,
    title: "Holistic Education",
    description: "Your children learn through nature immersion, storytelling, mentorship, and real-world skills — not standardized tests.",
  },
  {
    number: "05",
    icon: Wifi,
    title: "Remote Work Integration",
    description: "You don't have to quit your career. Thoughtfully designed co-working spaces let you earn while living intentionally.",
  },
  {
    number: "06",
    icon: Sun,
    title: "Spiritual Rhythms",
    description: "Daily life structured around prayer, reflection, and gratitude. The community prayer pavilion anchors every day in purpose.",
  },
];

const PillarsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const navigate = useNavigate();

  return (
    <section id="pillars" className="py-24 md:py-36 px-6 bg-primary text-primary-foreground">
      <div ref={ref} className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-sand font-body text-sm tracking-[0.3em] uppercase mb-4">
            How We Live
          </p>
          <h2 className="font-heading text-4xl md:text-6xl font-medium leading-tight mb-6">
            Six Pillars of <span className="italic text-sand">Fitrah Living</span>
          </h2>
          <div className="w-16 h-px bg-sand mx-auto" />
        </motion.div>

        <div className="space-y-0">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="border-t border-primary-foreground/20 py-8 grid md:grid-cols-[80px_1fr_2fr] gap-4 md:gap-8 items-start"
            >
              <span className="font-heading text-3xl text-sand/60">{pillar.number}</span>
              <div className="flex items-center gap-3">
                <pillar.icon className="w-6 h-6 text-sand shrink-0" />
                <h3 className="font-heading text-2xl md:text-3xl">{pillar.title}</h3>
              </div>
              <p className="font-body text-primary-foreground/70 leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-center mt-16"
        >
          <button
            onClick={() => navigate("/life")}
            className="inline-block font-body text-sm tracking-wider uppercase text-sand border border-sand px-10 py-4 rounded-full hover:bg-sand hover:text-primary transition-colors"
          >
            Explore Life at erdh →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PillarsSection;
