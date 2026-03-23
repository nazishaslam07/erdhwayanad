import { motion } from "framer-motion";
import { Apple, TreePine, Leaf, Sprout, Wheat, Layers, Wind } from "lucide-react";
import ParallaxSection from "./ParallaxSection";
import PrincipleCard from "./PrincipleCard";
import BulletList from "./BulletList";
import foodForestImg from "@/assets/life-food-forest.jpg";

const foodBullets = [
  "7-layer permaculture food forest design",
  "50+ edible species across canopy, shrub & ground layers",
  "Compost-fed from kitchen waste — zero external inputs",
  "Seasonal harvest calendar shared at Shura",
  "Children's garden plots for hands-on learning",
  "Surplus sold at the erdh Marketplace",
];

const layers = [
  { icon: TreePine, title: "1. Canopy", desc: "Coconut palms, jackfruit, and breadfruit trees forming the tallest tier — providing shade, structure, and long-term yields." },
  { icon: Leaf, title: "2. Sub-Canopy", desc: "Banana, papaya, and moringa trees filling the mid-storey with fast-growing, nutrient-dense harvests year-round." },
  { icon: Sprout, title: "3. Shrub Layer", desc: "Curry leaf, drumstick, and coffee bushes — productive woody plants that thrive in dappled canopy light." },
  { icon: Wheat, title: "4. Herbaceous", desc: "Turmeric, ginger, lemongrass, and galangal — the aromatic heart of every meal cooked at erdh." },
  { icon: Layers, title: "5. Ground Cover", desc: "Creeping legumes, sweet potato vines, and mint that protect soil from erosion and fix nitrogen naturally." },
  { icon: Apple, title: "6. Root Layer", desc: "Tapioca, yams, and taro growing underground — calorie-dense staples that require minimal maintenance." },
  { icon: Wind, title: "7. Climbers", desc: "Pepper vines, passion fruit, and betel leaf climbing canopy trees — maximising vertical space and yield." },
];

const FoodForestSection = () => (
  <>
    <ParallaxSection image={foodForestImg} alt="Tropical food forest in Wayanad" reverse>
      <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/30 backdrop-blur-sm flex items-center justify-center">
            <Apple className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
          </div>
          <p className="font-body text-sm tracking-[0.2em] uppercase text-sand">Nourishment</p>
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-medium text-primary-foreground leading-tight mb-6">
          The Food <br /><span className="italic">Forest</span>
        </h2>
        <p className="font-body text-primary-foreground/85 text-base leading-relaxed mb-6">
          Not a farm — a forest that feeds. Modelled on natural ecosystems, the erdh food
          forest layers seven tiers of edible and medicinal plants: tall canopy trees
          (coconut, jackfruit), sub-canopy (banana, papaya), shrubs (curry leaf, turmeric),
          herbaceous layers (ginger, lemongrass), ground covers, root crops, and climbing
          vines (pepper, passion fruit). No pesticides. No monoculture. Just abundance.
        </p>
        <BulletList items={foodBullets} />
      </motion.div>
    </ParallaxSection>

    <section className="py-24 md:py-36 bg-background">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-secondary font-body text-sm tracking-[0.3em] uppercase mb-4">Permaculture</p>
          <h2 className="font-heading text-4xl md:text-6xl font-medium text-foreground leading-tight mb-6">
            Seven <span className="italic text-primary">Living Layers</span>
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {layers.map((item, i) => (
            <PrincipleCard key={item.title} icon={item.icon} title={item.title} description={item.desc} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  </>
);

export default FoodForestSection;
