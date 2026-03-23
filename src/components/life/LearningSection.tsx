import { motion } from "framer-motion";
import { GraduationCap, Sprout, Lightbulb } from "lucide-react";
import ParallaxSection from "./ParallaxSection";
import BulletList from "./BulletList";
import learningImg from "@/assets/life-learning.jpg";

const learningBullets = [
  "Children's nature-first, curiosity-driven curriculum",
  "Arabic and faith-based studies woven into daily life",
  "Parent-educators rotate as mentors and guides",
  "Adult learning: land management, natural building, herbal medicine",
  "Portfolio-based assessment — no grades, no exams",
  "Access to CBSE-affiliated schools within 15 minutes",
];

const LearningSection = () => (
  <>
    <ParallaxSection image={learningImg} alt="Outdoor learning space in the forest">
      <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/30 backdrop-blur-sm flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
          </div>
          <p className="font-body text-sm tracking-[0.2em] uppercase text-sand">Education</p>
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-medium text-primary-foreground leading-tight mb-6">
          Learning at <br /><span className="italic">erdh</span>
        </h2>
        <p className="font-body text-primary-foreground/85 text-base leading-relaxed mb-6">
          Education here isn't a building — it's a way of being. Children learn through
          nature journaling, farm tending, reflective reading, and project-based
          exploration. Adults never stop growing either — weekly study circles, craft
          apprenticeships, land management courses, and peer-led skill shares ensure that
          learning is lifelong, intergenerational, and deeply practical.
        </p>
        <BulletList items={learningBullets} />
      </motion.div>
    </ParallaxSection>

    {/* Learning Details Cards */}
    <section className="py-24 md:py-36 bg-background">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-secondary font-body text-sm tracking-[0.3em] uppercase mb-4">Two Streams</p>
          <h2 className="font-heading text-4xl md:text-6xl font-medium text-foreground leading-tight mb-6">
            For the <span className="italic text-primary">Young</span> & the{" "}
            <span className="italic text-primary">Wise</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-xl p-8 border border-border"
          >
            <Sprout className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">Children's Circle</h3>
            <p className="font-body text-muted-foreground text-sm leading-relaxed mb-5">
              Mornings begin outdoors — nature journaling, plant identification, and tending the children's garden plot.
              Mid-morning shifts to guided learning: language arts, Arabic, mathematics through real-world problems,
              and creative storytelling. Afternoons are project-based — building birdhouses, mapping the food forest,
              or preparing a community presentation. No screens until age 10.
            </p>
            <div className="space-y-2">
              {["Nature walks & journaling", "Hands-on farming & craft", "Language arts & Arabic", "Project portfolios, not exams"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                  <span className="font-body text-xs text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-card rounded-xl p-8 border border-border"
          >
            <Lightbulb className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">Adult Learning</h3>
            <p className="font-body text-muted-foreground text-sm leading-relaxed mb-5">
              Learning doesn't end at adulthood — it deepens. Weekly study circles explore
              philosophy, history, and community governance. Seasonal intensives teach food forestry,
              composting, and water management. Craft apprenticeships in woodworking, pottery,
              and natural dyeing build livelihoods. Monthly peer-led skill shares let every family teach what they know best.
            </p>
            <div className="space-y-2">
              {["Weekly study circles & community discourse", "Land management & natural building courses", "Craft apprenticeships for livelihood", "Monthly peer-led skill shares"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                  <span className="font-body text-xs text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  </>
);

export default LearningSection;
