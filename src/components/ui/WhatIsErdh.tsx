import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const WhatIsErdh = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-36 px-6 bg-background">
      <div ref={ref} className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading text-4xl md:text-6xl font-medium text-foreground leading-tight mb-8">
            What is <span className="italic text-primary">erdh</span>?
          </h2>
          <p className="font-body text-muted-foreground text-lg md:text-xl leading-relaxed mb-6">
            <span className="font-medium">erdh</span> is a design-led intentional living community stewarded by its residents, where families return to purpose, simplicity, and a life in harmony with nature and fitrah.
          </p>
          <p className="font-body text-muted-foreground text-lg md:text-xl leading-relaxed mb-8">
            Set in the lush hills of Wayanad, Kerala, 15 families are choosing to live differently — growing their own food, 
            raising their children together, and building a life rooted in 
            <span className="text-secondary font-medium"> faith, family, land, and community</span>.
          </p>
          <div className="w-16 h-px bg-secondary mx-auto" />
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIsErdh;
