import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Home, Factory, TreePine, Clock,
  HandHeart, Sun, Users, Minimize2, BookOpen,
  LandPlot, Shrub, Footprints, Heart, Wheat, LayoutGrid
} from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Footer from "@/components/ui/Footer";
import ExpressInterestCTA from "@/components/ui/ExpressInterestCTA";

const sectionAnim = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const Philosophy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Breadcrumbs />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-44 md:pb-24 px-6 bg-primary text-primary-foreground text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionAnim}
          transition={{ duration: 0.8 }}
          className="max-w-[800px] mx-auto">
          
          <p className="font-body text-sm tracking-[0.3em] uppercase mb-4 text-primary-foreground/70">
            erdh Framework
          </p>
          <h1 className="font-heading text-4xl md:text-6xl mb-4">
            FitrahAligned Living
          </h1>
        </motion.div>
      </section>

      <div className="max-w-[800px] mx-auto px-6">
        {/* Intro — FitrahAligned Living */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionAnim}
          transition={{ duration: 0.7 }}
          className="py-20 md:py-28">
          
          <div className="font-body text-muted-foreground text-lg leading-relaxed space-y-6">
            <p>
              Imagine a life that feels calm, grounded, and in tune with the way human beings were created to live.
            </p>
            <p>
              A life where your days follow a natural rhythm. Where time outdoors feels normal, not rare. Where your surroundings, your work, and your community support a simpler and more meaningful way of living.
            </p>
            <p>
              Not a life driven by constant speed, consumption, and artificial systems, but one that moves closer to nature, purpose, and balance.
            </p>
            <p>
              This is what we call <span className="text-foreground font-medium">FitrahAligned Living</span>.
            </p>
          </div>
        </motion.section>

        {/* What is Fitrah */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionAnim}
          transition={{ duration: 0.7 }}
          className="pb-20 md:pb-28">
          
          <h2 className="font-heading text-3xl md:text-4xl text-foreground text-center mb-4">
            But first — what is <span className="italic text-primary">Fitrah</span>?
          </h2>
          <p className="font-body text-secondary text-base italic mb-10 text-center">
            The idea that shapes life at erdh.
          </p>
          <div className="space-y-6">
            <p className="font-body text-muted-foreground text-lg leading-relaxed">
              Have you ever wondered why you feel calm in nature?
            </p>
            <p className="font-body text-muted-foreground text-lg leading-relaxed">
              Human beings and the natural world share the same basic blueprint.
            </p>
            <p className="font-body text-muted-foreground text-lg leading-relaxed">
              This original nature is called <span className="text-foreground font-medium">Fitrah</span> (فطرة) — the inner compass that draws us toward truth, goodness, and harmony with the natural world.
            </p>
            <p className="font-body text-muted-foreground text-lg leading-relaxed">
              Not something we learn. Something we <span className="text-foreground font-medium">remember</span>.
            </p>
          </div>
        </motion.section>

        <div className="w-12 h-px bg-secondary mx-auto" />

        {/* 1. The Philosophy */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionAnim}
          transition={{ duration: 0.7 }}
          className="py-20 md:py-28">
          
          <p className="text-secondary font-body text-sm tracking-[0.3em] uppercase mb-4">01</p>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-8">
            The Philosophy
          </h2>
          <div className="font-body text-muted-foreground text-lg leading-relaxed space-y-6">
            <p>
              <span className="font-medium">erdh</span> is built on a simple belief:
            </p>
            <p className="text-foreground font-medium text-xl leading-relaxed">
              Life flourishes when it aligns with fitrah, the natural order upon which all creation is brought into being.
            </p>
            <p>
              Modern life has gradually separated people from the foundations that nurture human well-being: land, community, meaningful work, and remembrance of Allah.
            </p>
            <div className="space-y-4 pl-6 border-l-2 border-secondary">
              <p className="flex items-start gap-3"><Home className="w-5 h-5 text-secondary mt-0.5 shrink-0" /> Homes have become isolated boxes.</p>
              <p className="flex items-start gap-3"><Factory className="w-5 h-5 text-secondary mt-0.5 shrink-0" /> Food comes from distant industrial systems.</p>
              <p className="flex items-start gap-3"><TreePine className="w-5 h-5 text-secondary mt-0.5 shrink-0" /> Children grow up disconnected from nature and community.</p>
              <p className="flex items-start gap-3"><Clock className="w-5 h-5 text-secondary mt-0.5 shrink-0" /> Daily life is driven by urgency rather than purpose.</p>
            </div>
            <p>
              <span className="text-foreground font-medium">FitrahAligned Living</span> is an attempt to restore balance.
            </p>
            <p>It seeks to realign life with:</p>
            <ul className="space-y-3 pl-6">
              <li className="flex items-center gap-3">
                <Sun className="w-5 h-5 text-secondary shrink-0" />
                the rhythms of worship
              </li>
              <li className="flex items-center gap-3">
                <HandHeart className="w-5 h-5 text-secondary shrink-0" />
                the stewardship of land
              </li>
              <li className="flex items-center gap-3">
                <Users className="w-5 h-5 text-secondary shrink-0" />
                the strength of community
              </li>
              <li className="flex items-center gap-3">
                <Minimize2 className="w-5 h-5 text-secondary shrink-0" />
                the simplicity of living within natural limits
              </li>
            </ul>
            <div className="pt-4 space-y-2">
              <p><span className="font-medium">erdh</span> is not an escape from the modern world.</p>
              <p className="text-foreground font-medium">It is an effort to rebuild a healthier pattern of life within it.</p>
            </div>
          </div>
        </motion.section>

        <div className="w-12 h-px bg-secondary mx-auto" />

        {/* 2. Core Principles */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionAnim}
          transition={{ duration: 0.7 }}
          className="py-20 md:py-28">
          
          <p className="text-secondary font-body text-sm tracking-[0.3em] uppercase mb-4">02</p>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
            Core Principles of <span className="font-medium">erdh</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg leading-relaxed mb-12">
            These principles translate the philosophy into lived reality.
          </p>

          <div className="space-y-16">
            {[
            {
              icon: HandHeart,
              title: "Land as Amanah",
              content: [
              "Land is not a commodity to exploit but a trust to care for.",
              "Every family becomes a steward of their land. Food production, soil health, water conservation, and biodiversity become part of daily life.",
              "The goal is not profit from land, but barakah from responsible stewardship."]
            },
            {
              icon: Home,
              title: "Homes that Serve Life",
              content: [
              "Homes should support family life, reflection, and hospitality.",
              "Architecture must prioritize natural light, airflow, human scale, and simplicity.",
              "The house becomes a place where life unfolds, not merely a place to sleep between workdays."]
            },
            {
              icon: Sun,
              title: "Worship as the Anchor",
              content: [
              "The rhythm of life revolves around salah.",
              "Prayer becomes the organizing structure of the day.",
              "Instead of life revolving around work schedules, the community's daily flow is naturally anchored around moments of remembrance."]
            },
            {
              icon: Users,
              title: "Community before Individualism",
              content: [
              "Humans are not designed to live in isolation. Healthy life grows within community.",
              "Neighbors support each other. Children grow up together. Knowledge and skills circulate within the community.",
              "The aim is to cultivate interdependence without dependency."]
            },
            {
              icon: Minimize2,
              title: "Simplicity over Excess",
              content: [
              "Fitrah thrives in moderation.",
              "Homes remain modest. Consumption remains conscious. Space is used intentionally.",
              "Simplicity is not deprivation. It is clarity about what truly matters."]
            },
            {
              icon: BookOpen,
              title: "Learning through Life",
              content: [
              "Education is not confined to classrooms.",
              "Children grow up learning through nature, craft, farming, mentorship, and faith.",
              "Learning becomes integrated into daily life rather than separated from it."]
            }].
            map((principle, i) =>
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={sectionAnim}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="border-l-2 border-secondary pl-8">
              
                <div className="flex items-center gap-3 mb-4">
                  <principle.icon className="w-6 h-6 text-secondary shrink-0" />
                  <h3 className="font-heading text-2xl md:text-3xl text-foreground">{principle.title}</h3>
                </div>
                <div className="font-body text-muted-foreground text-lg leading-relaxed space-y-4">
                  {principle.content.map((p, j) =>
                <p key={j}>{p}</p>
                )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>

        <div className="w-12 h-px bg-secondary mx-auto" />

        {/* 3. Design Rules */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionAnim}
          transition={{ duration: 0.7 }}
          className="py-20 md:py-28">
          
          <p className="text-secondary font-body text-sm tracking-[0.3em] uppercase mb-4">03</p>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
            Design Rules for <span className="font-medium">erdh</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg leading-relaxed mb-12">
            These principles must translate into physical systems and spatial design. Otherwise the philosophy remains theoretical.
          </p>

          <div className="space-y-12">
            {[
            {
              icon: LandPlot,
              title: "Land Structure",
              desc: "Plots are designed to support homes, food production, small livestock, trees and orchards. Every household participates in some form of food cultivation. Larger agricultural areas support staple crops for the community."
            },
            {
              icon: Shrub,
              title: "Limited Built Footprint",
              desc: "Homes occupy a small percentage of the land. The majority of land remains productive, green, and alive. Built structures should not dominate the landscape."
            },
            {
              icon: Footprints,
              title: "Walkable Community",
              desc: "Movement within the community should be primarily on foot. Paths connect homes, farms, gathering spaces, and the masjid. Walking becomes the natural mode of movement."
            },
            {
              icon: Heart,
              title: "A Shared Spiritual Center",
              desc: "Every community benefits from a place that brings people together for reflection, learning, and collective prayer. At erdh, a central gathering space serves as the heart of the community. It anchors daily rhythm, learning, and social connection."
            },
            {
              icon: Wheat,
              title: "Food Sovereignty",
              desc: "The community should aim to produce a large portion of its food locally — vegetables, fruits, grains, dairy, and eggs. Food becomes part of community life rather than a distant supply chain."
            },
            {
              icon: LayoutGrid,
              title: "Spaces for Gathering",
              desc: "Community life needs physical places to happen. Shared spaces may include courtyards, learning spaces, workshops, and community kitchens. These spaces strengthen social bonds."
            }].
            map((rule, i) =>
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={sectionAnim}
              transition={{ duration: 0.6, delay: 0.05 }}>
              
                <div className="flex items-center gap-3 mb-3">
                  <rule.icon className="w-5 h-5 text-secondary shrink-0" />
                  <h3 className="font-heading text-2xl text-foreground">{rule.title}</h3>
                </div>
                <p className="font-body text-muted-foreground text-lg leading-relaxed">{rule.desc}</p>
              </motion.div>
            )}
          </div>
        </motion.section>

        <div className="w-12 h-px bg-secondary mx-auto" />

        {/* Closing */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionAnim}
          transition={{ duration: 0.7 }}
          className="py-20 md:py-28 text-center">
          
          <p className="font-body text-muted-foreground text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
            If someone asks in one line:
          </p>
          <p className="font-heading text-2xl md:text-3xl text-foreground leading-relaxed max-w-3xl mx-auto italic">
            "<span className="font-medium not-italic">erdh</span> is a community designed to help people live closer to their fitrah — through land stewardship, faith-centered rhythms, and simple living in community."
          </p>
          <button
            onClick={() => navigate("/express-interest")}
            className="mt-12 bg-secondary text-secondary-foreground font-body text-sm tracking-wider uppercase px-10 py-4 rounded-full hover:bg-secondary/90 transition-colors">
            
            Join the Community
          </button>
        </motion.section>
      </div>

      <ExpressInterestCTA />
      <Footer />
    </div>);

};

export default Philosophy;