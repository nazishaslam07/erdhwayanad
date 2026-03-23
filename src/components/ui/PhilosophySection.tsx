import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sprout, Users, Leaf } from "lucide-react";
import { useIsMobile } from "@/components/ui/use-mobile";
import communitySketch from "@/assets/community-sketch.jpg";

const PhilosophySection = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();
  const nudgeControls = useAnimation();
  const hasNudged = useRef(false);

  const cards = [
    { icon: Sprout, title: "Grounded Living", desc: "Trade screen time for time in nature. Grow what you eat, build with your hands, live under open skies.", accent: "from-primary/15 to-primary/5" },
    { icon: Users, title: "Intentional Community", desc: "15 families choosing depth over distraction — raising children who know where their food comes from.", accent: "from-secondary/15 to-secondary/5" },
    { icon: Leaf, title: "Ecological Stewardship", desc: "Permaculture, regenerative farming, and zero-waste living. We heal the land as the land heals us.", accent: "from-primary/10 to-accent/10" },
  ];

  useEffect(() => {
    if (isMobile && isInView && !hasNudged.current) {
      hasNudged.current = true;
      const timer = setTimeout(() => {
        nudgeControls.start({
          x: [0, -30, 0],
          transition: { duration: 0.8, ease: "easeInOut" },
        });
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isMobile, isInView, nudgeControls]);

  return (
    <section id="philosophy" className="py-24 md:py-36 px-6 bg-background">
      <div ref={ref} className="max-w-[1200px] mx-auto">
        {/* What FitrahAligned Living means in practice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mb-20"
        >
          <h3 className="font-heading text-3xl md:text-4xl text-foreground text-center mb-6">
            So what does it <span className="italic text-primary">look like</span>?
          </h3>

          {/* Sketch illustration — right below the header */}
          <div className="mb-12 flex justify-center">
            <img
              src={communitySketch}
              alt="A sketch of the erdh intentional living community with homes, food forests, and gathering spaces"
              className="w-full max-w-5xl rounded-xl shadow-sm object-cover"
              loading="lazy"
              decoding="async"
              width="800"
              height="450"
            />
          </div>

          <div className="font-body text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-16 space-y-5">
            <p>
              A life where your days follow a natural rhythm. Where mornings begin with light, fresh air, and quiet moments of reflection. Where food is simple and close to the land. Where children grow up learning from nature, community, and real life around them.
            </p>
            <p>
              A place where homes, work, learning, and community are shaped around the way human beings were meant to live.
            </p>
            <p>
              We call it <span className="text-foreground font-medium">FitrahAligned Living</span> — not about escaping the world, but about returning to what is natural.
            </p>
          </div>

          {isMobile ? (
            <div className="overflow-hidden -mx-6">
              <motion.div
                className="flex gap-4 px-6"
                drag="x"
                dragConstraints={{ left: -(cards.length * 280 - window.innerWidth + 48), right: 0 }}
                animate={nudgeControls}
              >
                {cards.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                    className="relative bg-card border border-border rounded-2xl p-8 text-center shrink-0 overflow-hidden"
                    style={{ width: "78vw", maxWidth: 320 }}
                  >
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                        <item.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                      </div>
                      <h4 className="font-heading text-xl text-foreground mb-3">{item.title}</h4>
                      <p className="font-body text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {cards.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                  className="relative bg-card border border-border rounded-2xl p-10 text-center hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-500 group overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 group-hover:rounded-xl transition-all duration-500">
                      <item.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                    </div>
                    <h4 className="font-heading text-xl text-foreground mb-3">{item.title}</h4>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* CTA to full philosophy page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-center mt-16"
        >
          <button
            onClick={() => navigate("/philosophy")}
            className="inline-block bg-primary text-primary-foreground font-body text-sm tracking-wider uppercase px-12 py-4 rounded-full hover:bg-primary/90 transition-colors"
          >
            Read the Full Philosophy
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PhilosophySection;
