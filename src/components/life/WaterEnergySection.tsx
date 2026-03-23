import { motion } from "framer-motion";
import { Droplets, CloudRain, Wheat, Sun, Flame, Battery, Zap } from "lucide-react";
import ParallaxSection from "./ParallaxSection";
import PrincipleCard from "./PrincipleCard";
import BulletList from "./BulletList";
import waterImg from "@/assets/life-water.jpg";
import energyImg from "@/assets/life-energy.jpg";

const waterBullets = [
  "Rooftop rainwater harvesting on every structure",
  "Terraced retention ponds for monsoon storage",
  "Gravity-fed irrigation — no electric pumps",
  "Natural spring protection and aquifer recharge",
  "Greywater recycling through reed bed filtration",
  "Bio-sand filters for drinking water purification",
];

const energyBullets = [
  "Rooftop solar arrays on all shared structures",
  "Biogas cooking from kitchen & farm waste",
  "Passive cooling — no air conditioning required",
  "LED lighting & energy-conscious design",
  "Battery storage for overnight and cloudy days",
  "Target: 95% energy self-sufficiency",
];

const systemCards = [
  { icon: CloudRain, title: "Rainwater Harvesting", desc: "Every roofline channels monsoon rain into underground storage tanks — 50,000+ litres per structure annually." },
  { icon: Droplets, title: "Reed Bed Filtration", desc: "All greywater passes through constructed wetlands before returning to irrigate the food forest. Zero chemical treatment." },
  { icon: Wheat, title: "Gravity-Fed Irrigation", desc: "Terraced ponds at elevation distribute water downhill through bamboo and stone channels — no pumps, no electricity." },
  { icon: Sun, title: "Solar Power", desc: "Rooftop solar arrays on shared structures generate 80% of community electricity — co-working, kitchen, and workshop." },
  { icon: Flame, title: "Biogas Digesters", desc: "Kitchen waste and animal manure feed biogas units, providing clean cooking fuel and nutrient-rich slurry for composting." },
  { icon: Battery, title: "Energy Independence", desc: "Battery banks store excess solar, paired with grid backup. Target: 95% energy self-sufficiency by year three." },
];

const WaterEnergySection = () => (
  <>
    {/* Water Parallax */}
    <ParallaxSection image={waterImg} alt="Terraced rainwater harvesting system">
      <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/30 backdrop-blur-sm flex items-center justify-center">
            <Droplets className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
          </div>
          <p className="font-body text-sm tracking-[0.2em] uppercase text-sand">Stewardship</p>
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-medium text-primary-foreground leading-tight mb-6">
          Water <br /><span className="italic">Wisdom</span>
        </h2>
        <p className="font-body text-primary-foreground/85 text-base leading-relaxed mb-6">
          In Wayanad, water is sacred and seasonal. erdh's water management honours both
          monsoon abundance and dry-season scarcity through an integrated system of
          rainwater harvesting, terraced retention ponds, natural springs, and gravity-fed
          distribution. Every drop is captured, filtered, stored, and returned to the earth.
        </p>
        <BulletList items={waterBullets} />
      </motion.div>
    </ParallaxSection>

    {/* System Cards */}
    <section className="py-24 md:py-36 bg-background">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-secondary font-body text-sm tracking-[0.3em] uppercase mb-4">Systems</p>
          <h2 className="font-heading text-4xl md:text-6xl font-medium text-foreground leading-tight mb-6">
            Water & <span className="italic text-primary">Energy Cycles</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-3xl mx-auto">
            Two integrated systems designed to work with nature, not against it — minimising
            dependence on external infrastructure while maximising resilience.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {systemCards.map((item, i) => (
            <PrincipleCard key={item.title} icon={item.icon} title={item.title} description={item.desc} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>

    {/* Energy Parallax */}
    <ParallaxSection image={energyImg} alt="Solar-powered rammed earth home" reverse>
      <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/30 backdrop-blur-sm flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
          </div>
          <p className="font-body text-sm tracking-[0.2em] uppercase text-sand">Energy</p>
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-medium text-primary-foreground leading-tight mb-6">
          Powered by <br /><span className="italic">the Sun & Earth</span>
        </h2>
        <p className="font-body text-primary-foreground/85 text-base leading-relaxed mb-6">
          erdh is designed for energy independence. Rooftop solar panels generate the
          majority of electricity. Biogas digesters convert kitchen and farm waste into
          clean cooking fuel. Passive architectural design — thick rammed earth walls,
          cross-ventilation, and shaded courtyards — eliminates the need for air conditioning.
          The goal: live comfortably with a fraction of the energy a typical home consumes.
        </p>
        <BulletList items={energyBullets} />
      </motion.div>
    </ParallaxSection>
  </>
);

export default WaterEnergySection;
