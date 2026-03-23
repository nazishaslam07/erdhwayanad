import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ExpressInterestCTA from "@/components/ui/ExpressInterestCTA";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Mountain, Droplets, TreePine, MapPin, Compass, Waves,
  Sprout, CloudRain, Users, Sun,
} from "lucide-react";

import erdhLand1 from "@/assets/erdh-land-1.jpg";
import erdhLand2 from "@/assets/erdh-land-2.jpg";
import erdhLand3 from "@/assets/erdh-land-3.jpg";
import erdhLand4 from "@/assets/erdh-land-4.jpg";

const landImages = [
  { src: erdhLand1, alt: "Coffee and areca nut plantation on erdh land" },
  { src: erdhLand2, alt: "Lush tropical vegetation on the erdh site" },
  { src: erdhLand3, alt: "Cleared pathways through the plantation" },
  { src: erdhLand4, alt: "Mixed forest canopy on erdh land" },
];

const stats = [
  { icon: Mountain, stat: "700m+", label: "Elevation", detail: "Nestled in the Western Ghats, blessed with cool mountain air year-round." },
  { icon: Droplets, stat: "3000mm", label: "Annual Rainfall", detail: "One of Kerala's most water-rich regions — perfect for regenerative agriculture." },
  { icon: TreePine, stat: "UNESCO", label: "Biodiversity Hotspot", detail: "Part of the Western Ghats, a globally recognized center of ecological significance." },
];

import { timeline } from "@/lib/timeline-data";

/* ─── Hero + Gallery ─── */
const LandHeroAndGallery = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <section ref={ref} className="py-16 md:py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Hero text */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-12">
          <p className="text-secondary font-body text-sm tracking-[0.3em] uppercase mb-4">The Land</p>
          <h1 className="font-heading text-4xl md:text-6xl font-medium text-foreground leading-tight mb-6">
            Wayanad, <span className="italic text-primary">Kerala</span>
          </h1>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
            Nestled in the Western Ghats at over 700 meters elevation, our land sits in one
            of India's most biodiverse and water-rich regions — a place where the earth
            itself invites you to slow down and live intentionally.
          </p>
          <div className="w-16 h-px bg-secondary mx-auto" />
        </motion.div>

        {/* Gallery carousel directly below */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}>
          <p className="text-secondary font-body text-sm tracking-[0.3em] uppercase mb-2 text-center">Gallery</p>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-foreground text-center mb-2">
            The Land <span className="italic text-primary">Today</span>
          </h2>
          <p className="font-body text-muted-foreground text-sm text-center mb-6">
            Actual photos from the erdh 1.0 site in Vattathani, Poothadi.
          </p>
          <Carousel opts={{ loop: true }} className="w-full">
            <CarouselContent>
              {landImages.map((img, i) => (
                <CarouselItem key={i}>
                  <div className="aspect-[16/9] rounded-lg overflow-hidden">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading={i === 0 ? "eager" : "lazy"} decoding="async" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4 md:-left-12" />
            <CarouselNext className="hidden sm:flex -right-4 md:-right-12" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Stats ─── */
const LandStats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="pb-20 px-6 bg-card py-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {stats.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.15 }} className="text-center">
                <Icon className="w-8 h-8 text-primary mx-auto mb-4" strokeWidth={1.5} />
                <p className="font-heading text-5xl md:text-6xl text-primary font-semibold mb-2">{item.stat}</p>
                <p className="font-body text-secondary text-sm tracking-[0.2em] uppercase mb-4">{item.label}</p>
                <p className="font-body text-muted-foreground leading-relaxed">{item.detail}</p>
              </motion.div>
            );
          })}
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.6 }} className="mt-20 bg-background rounded-lg p-8 md:p-12 text-center">
          <p className="font-heading text-2xl md:text-3xl italic text-foreground leading-relaxed max-w-3xl mx-auto">
            "We didn't choose Wayanad. The land chose us. It whispered what every
            city-weary soul already knows — that the good life is the simple life."
          </p>
          <p className="font-body text-muted-foreground mt-6 text-sm tracking-widest uppercase">— Community Founders</p>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── About the Site (infographic style) ─── */
const aboutSections = [
  {
    icon: MapPin,
    title: "Location",
    bullets: [
      "~14 km from Sulthan Bathery via a scenic route through Beenachi and Valavayal",
      "Within Poothadi Grama Panchayat — a recognized coffee–pepper cultivation zone",
      "Near the Vattathani Sree Mahavishnu Temple, reflecting a long-standing settled community",
    ],
  },
  {
    icon: Compass,
    title: "The Landscape",
    bullets: [
      "Gentle, undulating plateau-like terrain — unlike the steeper slopes of Vythiri",
      "Stable ground ideal for small clusters of homes, pathways, and community spaces",
      "Site spans approximately 8.5 acres for homes, cultivation, and shared ecological systems",
    ],
  },
  {
    icon: Waves,
    title: "Water & Ecology",
    bullets: [
      "Within the Kabani River Basin — an important regional watershed system",
      "Streams and rivulets flow through the landscape, feeding larger tributaries",
      "Local ground-level service reservoir (GLSR) supplies water to the settlement",
      "Long-term focus: contour-based water harvesting, swales, and rainwater collection",
    ],
  },
  {
    icon: Sprout,
    title: "Soil & Growing Systems",
    bullets: [
      "Fertile lateritic clay — rich in organic matter, suited for diverse agriculture",
      "Traditional crops: Robusta coffee, black pepper, areca nut, coconut",
      "Layered regenerative farming: fruit tree canopy → coffee & spices → tubers & herbs",
      "Systems mirror natural forest structure while remaining productive",
    ],
  },
  {
    icon: CloudRain,
    title: "Climate",
    bullets: [
      "Slightly east of Wayanad's highest rainfall zones — balanced climate",
      "Abundant rain supports lush vegetation without extended torrential spells",
      "Ideal for diversified cultivation and long-term ecological restoration",
    ],
  },
  {
    icon: Users,
    title: "Community Context",
    bullets: [
      "Surrounded by traditional agrarian families and settler farmers",
      "Strong local culture of farming knowledge, land care, and community networks",
      "erdh grows in conversation with the land and the people who already belong to it",
    ],
  },
  {
    icon: Sun,
    title: "Energy & Self-Reliance",
    bullets: [
      "Better sunlight exposure compared to Wayanad's mist-heavy western hills",
      "Strong potential for solar-based energy systems",
      "Supports erdh's vision of low-energy, resilient living",
    ],
  },
];

const LandDetails = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 md:py-28 px-6">
      <div className="max-w-[900px] mx-auto">
        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-secondary font-body text-sm tracking-[0.3em] uppercase mb-4">About the Site</p>
          <h2 className="font-heading text-3xl md:text-5xl font-medium text-foreground">
            The Land: <span className="italic text-primary">erdh 1.0</span> — Wayanad
          </h2>
          <p className="font-body text-muted-foreground text-lg mt-6 leading-relaxed max-w-2xl mx-auto">
            erdh 1.0 is located in Vattathani, Poothadi, in the eastern part of Wayanad — within one of the district's most fertile agricultural belts, long known for coffee plantations and black pepper cultivation.
          </p>
          <p className="font-body text-muted-foreground mt-4 leading-relaxed max-w-2xl mx-auto">
            For generations, the landscape has supported small farmers and mixed plantations. Shade trees, spices, and seasonal crops grow together in layered ecosystems — forming the natural foundation for the first erdh community.
          </p>
        </motion.div>

        {/* Infographic cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {aboutSections.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                className="bg-card rounded-lg p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground">
                    {section.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {section.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                      <span className="font-body text-sm text-muted-foreground leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 bg-card rounded-lg p-8 md:p-12 text-center"
        >
          <p className="font-heading text-xl md:text-2xl italic text-foreground leading-relaxed max-w-2xl mx-auto">
            erdh 1.0 begins here — on a piece of fertile land shaped by water, soil, and generations of cultivation.
          </p>
          <p className="font-body text-muted-foreground mt-6 leading-relaxed max-w-xl mx-auto">
            The goal is simple: to build a community that lives with the land, learns from it, and helps restore its natural balance.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Timeline ─── */
const LandTimeline = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-20 md:py-28 bg-card px-6">
      <div className="max-w-[800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-12">
          <p className="text-secondary font-body text-sm tracking-[0.3em] uppercase mb-4">Progress</p>
          <h2 className="font-heading text-3xl md:text-5xl font-medium text-foreground">
            Current <span className="italic text-primary">Status</span>
          </h2>
        </motion.div>
        <div className="space-y-0">
          {timeline.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full shrink-0 mt-1.5 ${item.status === "In Progress" ? "bg-primary" : "bg-border"}`} />
                {i < timeline.length - 1 && <div className="w-px flex-1 bg-border min-h-[40px]" />}
              </div>
              <div className="pb-8">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-body text-xs font-semibold text-primary uppercase tracking-wider">{item.phase}</span>
                  {item.status === "In Progress" && (
                    <span className="font-body text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">In Progress</span>
                  )}
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Page ─── */
const Land = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 md:pt-24">
        <Breadcrumbs />
      </div>
      <LandHeroAndGallery />
      <LandStats />
      <LandDetails />
      <LandTimeline />
      <ExpressInterestCTA />
      <Footer />
    </div>
  );
};

export default Land;
