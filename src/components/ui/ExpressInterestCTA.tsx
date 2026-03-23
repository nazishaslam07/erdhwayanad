import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const ExpressInterestCTA = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const navigate = useNavigate();

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-[700px] mx-auto text-center"
      >
        <p className="text-secondary font-body text-sm tracking-[0.3em] uppercase mb-4">
          Be Part of It
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground leading-tight mb-4">
          Interested in joining <span className="italic text-primary">erdh 1.0</span>?
        </h2>
        <p className="font-body text-muted-foreground leading-relaxed mb-8">
          We're building a community of 15 families who share a vision for intentional, earth-rooted living in Wayanad. If this resonates with you, we'd love to hear from you.
        </p>
        <button
          onClick={() => navigate("/express-interest")}
          className="inline-block font-body text-sm tracking-wider uppercase text-primary-foreground bg-primary px-10 py-4 rounded-full hover:bg-primary/90 transition-colors"
        >
          Express Interest →
        </button>
      </motion.div>
    </section>
  );
};

export default ExpressInterestCTA;
