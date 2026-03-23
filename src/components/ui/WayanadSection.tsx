import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import YouTubeFacade from "@/components/ui/YouTubeFacade";

const WayanadSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const navigate = useNavigate();

  const cards = [
    {
      stat: "20,000 sqft.",
      label: "Land",
      description:
        "Each family owns and stewards about 20,000 sq ft of land to grow food, plant trees, and live closer to the rhythms of nature.",
    },
    {
      stat: "15 Families",
      label: "Community",
      description:
        "A small group of around 15 families sharing spaces, resources, and responsibilities, building a life of cooperation and mutual care.",
    },
    {
      stat: "Shared Values",
      label: "Life",
      description:
        "A place for growing, learning, and living together. Families nurture the land, raise children in a wholesome environment, and practice a simpler, more purposeful way of life.",
    },
  ];

  return (
    <section id="land" className="py-24 md:py-36 px-6 bg-background">
      <div ref={ref} className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-secondary font-body text-sm tracking-[0.3em] uppercase mb-4">
            The Land
          </p>
          <h2 className="font-heading text-4xl md:text-6xl font-medium text-foreground leading-tight mb-6">
            Wayanad, <span className="italic text-primary">Kerala</span>
          </h2>
          <div className="w-16 h-px bg-secondary mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              stat: "700m+",
              label: "Elevation",
              detail: "Nestled in the Western Ghats, blessed with cool mountain air year-round.",
            },
            {
              stat: "3000mm",
              label: "Annual Rainfall",
              detail: "One of Kerala's most water-rich regions — perfect for regenerative agriculture.",
            },
            {
              stat: "UNESCO",
              label: "Biodiversity Hotspot",
              detail: "Part of the Western Ghats, a globally recognized center of ecological significance.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="text-center"
            >
              <p className="font-heading text-5xl md:text-6xl text-primary font-semibold mb-2">{item.stat}</p>
              <p className="font-body text-secondary text-sm tracking-[0.2em] uppercase mb-4">{item.label}</p>
              <p className="font-body text-muted-foreground leading-relaxed">{item.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Land Video with caption */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 relative rounded-lg overflow-hidden"
        >
          <YouTubeFacade videoId="Syj_3s0QtgA" title="erdh 1.0 — The Land, Wayanad" />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center mt-6 font-body text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
          >
            <span className="font-heading text-foreground font-medium">The land for erdh 1.0.</span>
            <br />
            A place where families will grow food, plant trees, and build a life together.
          </motion.p>
        </motion.div>

        {/* Three cards: Land, Community, Life */}
        <div className="grid md:grid-cols-3 gap-12 mt-16">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.15 }}
              className="text-center"
            >
              <p className="font-heading text-5xl md:text-6xl text-primary font-semibold mb-2">
                {card.stat}
              </p>
              <p className="font-body text-secondary text-sm tracking-[0.2em] uppercase mb-4">
                {card.label}
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="text-center mt-10"
        >
          <button
            onClick={() => navigate("/land")}
            className="inline-block font-body text-sm tracking-wider uppercase text-primary border border-primary px-10 py-4 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Explore The Land →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WayanadSection;
