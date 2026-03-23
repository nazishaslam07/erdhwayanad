import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LifeCtaSection = () => (
  <section className="py-24 bg-card">
    <div className="max-w-[800px] mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-heading text-3xl md:text-5xl font-medium text-foreground mb-6">
          Ready to <span className="italic text-primary">come home</span>?
        </h2>
        <p className="font-body text-muted-foreground text-lg mb-8">
          If this way of living resonates, we'd love to hear from you.
        </p>
        <Link
          to="/express-interest"
          className="inline-block bg-primary text-primary-foreground font-body text-sm tracking-wider uppercase px-10 py-4 rounded-full hover:bg-primary/90 transition-colors"
        >
          Express Interest
        </Link>
      </motion.div>
    </div>
  </section>
);

export default LifeCtaSection;
