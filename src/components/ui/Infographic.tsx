import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Home, Salad, TreePine, Tractor, Laptop,
  Church, CookingPot, GraduationCap, BookOpen, Briefcase, Flower2, Users,
  Sprout, Baby, HandHeart, Leaf,
} from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import landIllustration from "@/assets/infographic-land.png";
import MasterplanDiagram from "@/components/infographic/MasterplanDiagram";

/* ─── Fade-in wrapper ─── */
const Reveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── Plot icon helper ─── */
const PlotIcon = ({
  icon: Icon,
  label,
  delay,
  x,
  y,
}: {
  icon: React.ElementType;
  label: string;
  delay: number;
  x: string;
  y: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className="absolute flex flex-col items-center gap-1"
    style={{ left: x, top: y }}
  >
    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
      <Icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
    </div>
    <span className="font-body text-[10px] text-muted-foreground whitespace-nowrap">
      {label}
    </span>
  </motion.div>
);

/* ─── Mini plot for community view ─── */
const MiniPlot = ({ delay, className }: { delay: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.6 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={`w-10 h-10 md:w-12 md:h-12 rounded-md border border-primary/30 bg-primary/5 ${className}`}
  />
);

/* ─── Commons icon ─── */
const CommonsIcon = ({
  icon: Icon,
  label,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col items-center gap-1.5"
  >
    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
      <Icon className="w-4.5 h-4.5 text-secondary" strokeWidth={1.5} />
    </div>
    <span className="font-body text-[11px] text-muted-foreground text-center leading-tight max-w-[72px]">
      {label}
    </span>
  </motion.div>
);

/* ─── Life card ─── */
const LifeCard = ({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.6, delay }}
    className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8"
  >
    <Icon className="w-6 h-6 text-primary mb-3" strokeWidth={1.5} />
    <h4 className="font-heading text-lg md:text-xl text-foreground mb-2">{title}</h4>
    <p className="font-body text-sm text-muted-foreground leading-relaxed">{description}</p>
  </motion.div>
);

/* ═══════════════════════════════════════════════════ */

const Infographic = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── Section 1 : Intro ── */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-6">
              erdh · wayanad
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="font-heading text-4xl md:text-6xl font-medium text-foreground leading-tight mb-6">
              A Different Way <br className="hidden md:block" />
              of <span className="italic text-primary">Living</span>
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-body text-muted-foreground text-lg md:text-xl leading-relaxed max-w-lg mx-auto mb-10">
              A small group of families choosing a simpler life closer to land, nature, and community.
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <img
              src={landIllustration}
              alt="Soft watercolor illustration of rolling green hills"
              className="w-full max-w-md mx-auto"
              loading="lazy"
              decoding="async"
            />
          </Reveal>
        </div>
      </section>

      {/* ── Interactive Masterplan Diagram ── */}
      <MasterplanDiagram />

      {/* ── Section 2 : Your Family Plot ── */}
      <section className="py-20 md:py-28 px-6 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-4">
              Your Family Plot
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-medium text-foreground leading-tight mb-3">
              Your Family Stewards
            </h2>
            <p className="font-heading text-2xl md:text-4xl text-primary italic mb-4">
              20,000 sq ft of Land
            </p>
            <p className="font-body text-muted-foreground text-base md:text-lg leading-relaxed max-w-md mx-auto mb-14">
              Space to build your home, grow food, and shape a life closer to nature.
            </p>
          </Reveal>

          {/* Plot diagram */}
          <Reveal delay={0.1}>
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
              {/* Plot background */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5"
              />

              {/* Icons appearing on the plot */}
              <PlotIcon icon={Home} label="Home" delay={0.3} x="38%" y="30%" />
              <PlotIcon icon={Salad} label="Kitchen Garden" delay={0.5} x="10%" y="60%" />
              <PlotIcon icon={TreePine} label="Fruit Trees" delay={0.7} x="65%" y="12%" />
              <PlotIcon icon={Tractor} label="Small Farm" delay={0.9} x="62%" y="62%" />
              <PlotIcon icon={Laptop} label="Workspace" delay={1.1} x="12%" y="10%" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Section 3 : A Small Community ── */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-4">
              A Small Community
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-medium text-foreground leading-tight mb-4">
              You are part of a small community of
            </h2>
            <p className="font-heading text-5xl md:text-7xl text-primary font-semibold mb-12">
              15 families
            </p>
          </Reveal>

          {/* Community cluster */}
          <div className="relative flex flex-wrap justify-center gap-2 md:gap-3 max-w-xs md:max-w-sm mx-auto py-8">
            {/* Highlighted "your" plot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 md:w-12 md:h-12 rounded-md border-2 border-primary bg-primary/15"
            />
            {Array.from({ length: 14 }).map((_, i) => (
              <MiniPlot
                key={i}
                delay={0.15 + i * 0.08}
                className={i % 3 === 0 ? "mt-1" : i % 3 === 1 ? "-mt-1" : ""}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4 : Shared Spaces ── */}
      <section className="py-20 md:py-28 px-6 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-4">
              Shared Spaces
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-medium text-foreground leading-tight mb-3">
              Community <span className="italic text-primary">Commons</span>
            </h2>
            <p className="font-body text-muted-foreground text-base md:text-lg leading-relaxed max-w-md mx-auto mb-14">
              At the heart of the community, shared spaces bring families together.
            </p>
          </Reveal>

          {/* Commons icons grid */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 max-w-md mx-auto">
            <CommonsIcon icon={Church} label="Prayer Pavilion" delay={0.1} />
            <CommonsIcon icon={CookingPot} label="Community Kitchen" delay={0.2} />
            <CommonsIcon icon={GraduationCap} label="Children's Learning" delay={0.3} />
            <CommonsIcon icon={BookOpen} label="Library" delay={0.4} />
            <CommonsIcon icon={Briefcase} label="Shared Workspace" delay={0.5} />
            <CommonsIcon icon={Flower2} label="Gardens" delay={0.6} />
            <CommonsIcon icon={Users} label="Gathering Areas" delay={0.7} />
          </div>
        </div>
      </section>

      {/* ── Section 5 : Life in ERDH ── */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-4">
              Daily Life
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-medium text-foreground leading-tight">
              Life in <span className="italic text-primary">erdh</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            <LifeCard
              icon={Sprout}
              title="Growing Food"
              description="Families cultivate gardens and regenerative farms."
              delay={0.1}
            />
            <LifeCard
              icon={Baby}
              title="Children Learning from Life"
              description="Nature, craft, and community become the classroom."
              delay={0.2}
            />
            <LifeCard
              icon={HandHeart}
              title="Shared Moments"
              description="Meals, learning circles, and gatherings."
              delay={0.3}
            />
            <LifeCard
              icon={Leaf}
              title="Stewarding the Land"
              description="Living in a way that regenerates soil and nature."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* ── Section 6 : Summary ── */}
      <section className="py-24 md:py-36 px-6 bg-primary/5">
        <div className="max-w-xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex w-14 h-14 rounded-2xl border-2 border-primary bg-primary/10 items-center justify-center mb-8">
              <Home className="w-6 h-6 text-primary" strokeWidth={1.5} />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="font-heading text-2xl md:text-3xl text-foreground leading-relaxed mb-2">
              <span className="text-primary font-semibold">20,000 sq ft</span> for your family
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="font-heading text-2xl md:text-3xl text-foreground leading-relaxed mb-2">
              Within a small community of
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="font-heading text-4xl md:text-5xl text-primary font-semibold mb-3">
              15 families
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <p className="font-body text-muted-foreground text-base md:text-lg leading-relaxed mb-12">
              Sharing spaces for prayer, learning, and gathering.
            </p>
          </Reveal>

          <Reveal delay={0.55}>
            <div className="w-16 h-px bg-secondary mx-auto mb-10" />
            <p className="font-heading text-xl md:text-2xl italic text-foreground/80 leading-relaxed mb-12">
              A return to a slower, more grounded way of living.
            </p>
          </Reveal>

          <Reveal delay={0.65}>
            <button
              onClick={() => navigate("/express-interest")}
              className="inline-block bg-primary text-primary-foreground font-body text-sm tracking-wider uppercase px-12 py-4 rounded-full hover:bg-primary/90 transition-colors"
            >
              Express Interest
            </button>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Infographic;
