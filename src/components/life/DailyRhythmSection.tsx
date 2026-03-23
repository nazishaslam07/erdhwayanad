import { motion } from "framer-motion";
import ParallaxHero from "./ParallaxHero";
import DailyRhythmCircle from "./DailyRhythmCircle";
import dailyImg from "@/assets/life-daily.jpg";

const DailyRhythmSection = () => (
  <>
    <ParallaxHero image={dailyImg} alt="Dawn over the food forest">
      <div className="text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-body text-sm tracking-[0.3em] uppercase text-sand mb-4"
        >
          Daily Rhythms
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="font-heading text-4xl md:text-6xl font-medium text-primary-foreground leading-tight"
        >
          A Day at <span className="italic">erdh</span>
        </motion.h2>
      </div>
    </ParallaxHero>

    <section className="py-24 md:py-36 bg-background">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-muted-foreground text-lg text-center mb-16 max-w-2xl mx-auto"
        >
          Imagine a day shaped not by notifications, but by the sun, the seasons,
          and the gentle rhythm of community. Here's what it could feel like.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <DailyRhythmCircle />
        </motion.div>
      </div>
    </section>
  </>
);

export default DailyRhythmSection;
