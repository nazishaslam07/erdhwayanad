import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ExploreLifeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-36 px-6 bg-card">
      <div ref={ref} className="max-w-[800px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-secondary text-sm tracking-[0.3em] uppercase mb-4">
            Go Deeper
          </p>
          <h2 className="font-heading text-4xl md:text-6xl font-medium text-foreground leading-tight mb-6">
            Discover <span className="italic text-primary">Life at erdh</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Explore how we build, learn, grow food, manage water, and live — all shaped by
            the land, the seasons, and a commitment to intentional living.
          </p>
          <Link to="/life">
            <Button className="bg-primary text-primary-foreground font-body text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors duration-300 h-14 px-10 rounded-full gap-3">
              Explore Life at erdh
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ExploreLifeSection;
