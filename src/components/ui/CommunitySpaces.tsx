import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/components/ui/use-mobile";
import { useNavigate } from "react-router-dom";
import carouselCircle from "@/assets/carousel-community-circle.jpg";
import carouselKitchen from "@/assets/carousel-community-kitchen.jpg";
import carouselLiving from "@/assets/carousel-community-living.jpg";
import carouselKids from "@/assets/carousel-kids-area.jpg";
import carouselPrayer from "@/assets/carousel-prayer-pavilion.jpg";
import carouselReading from "@/assets/carousel-reading-zones.jpg";
import spacePrayer from "@/assets/space-prayer.jpg";
import spaceKitchen from "@/assets/space-kitchen.jpg";
import spaceKids from "@/assets/space-kids.jpg";
import spaceWomen from "@/assets/space-women.jpg";
import spaceShura from "@/assets/space-shura.jpg";
import spaceLibrary from "@/assets/space-library.jpg";
import spaceCowork from "@/assets/space-cowork.jpg";
import spaceWorkshop from "@/assets/space-workshop.jpg";
import spaceMarketplace from "@/assets/space-marketplace.jpg";
import {
  MoonStar,
  UtensilsCrossed,
  Sprout,
  Moon,
  Handshake,
  BookOpen,
  Laptop,
  Palette,
  Store,
} from "lucide-react";
import SpaceDetailModal from "@/components/ui/SpaceDetailModal";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const heroImages = [
  { src: carouselPrayer, alt: "Prayer Pavilion conceptual design" },
  { src: carouselKitchen, alt: "Community Kitchen conceptual design" },
  { src: carouselLiving, alt: "Community Living conceptual design" },
  { src: carouselCircle, alt: "Community Circle conceptual design" },
  { src: carouselKids, alt: "Kids Learning Area conceptual design" },
  { src: carouselReading, alt: "Reading Zones conceptual design" },
];

const spaces = [
  {
    title: "Prayer Pavilion",
    description: "An open-air sanctuary for daily salah and contemplation, surrounded by fragrant gardens.",
    icon: MoonStar,
    image: spacePrayer,
    details: "The Prayer Pavilion is the spiritual heart of erdh — an open-air structure oriented towards the Qibla, built with locally sourced timber and stone. Surrounded by jasmine and neem gardens, it offers a serene environment for the five daily prayers, Friday gatherings, and quiet dhikr. Natural cross-ventilation and dappled sunlight through lattice screens create a space where worship feels effortless and connected to creation.",
    howItWorks: "Each day begins and ends here. The adhan echoes across the valley five times daily, anchoring community rhythm. On Fridays, families gather for Jumu'ah followed by a shared meal. During Ramadan, the pavilion transforms into a taraweeh space under the stars. A wudu area with natural stone and flowing water sits adjacent, and a small covered section allows prayer during monsoon. The space is maintained collectively — each family takes a weekly rotation.",
    highlights: ["Qibla-oriented open-air design", "Natural stone wudu area", "Friday Jumu'ah gatherings", "Ramadan taraweeh under the stars"],
  },
  {
    title: "Community Kitchen",
    description: "Farm-to-table meals where families cook together, preserving traditions and building bonds.",
    icon: UtensilsCrossed,
    image: spaceKitchen,
    details: "More than a place to cook — it's where culture is preserved. The Community Kitchen features wood-fired ovens, shared prep stations, and a large communal dining area. Families take turns preparing meals from produce harvested on-site.",
    howItWorks: "Three families rotate cooking duties each week, preparing lunch and dinner from the community's own harvest — spices, rice, vegetables, and fruits grown on-site. Breakfast is individual, but lunch is communal. Every Thursday evening is a full community feast where a different family shares a recipe from their heritage. Children have their own prep corner where they learn to cook, preserve food, and understand where meals come from. A zero-waste policy means compost goes back to the food forest.",
    highlights: ["Weekly cooking rotations", "Thursday heritage feasts", "Children's cooking corner", "Zero-waste compost cycle"],
  },
  {
    title: "Kids Learning Circle",
    description: "Nature-based, curiosity-driven education through exploration, storytelling, and hands-on craft.",
    icon: Sprout,
    image: spaceKids,
    details: "Education at erdh isn't confined to four walls. The Kids Learning Circle is an outdoor-first, curiosity-driven space where children learn through nature walks, storytelling under banyan trees, hands-on farming, art, and guided Quranic reflection.",
    howItWorks: "Mornings start with outdoor exploration — nature journaling, plant identification, or tending the children's garden plot. Mid-morning shifts to guided learning: Quranic recitation, Arabic, mathematics through real-world problems (measuring land, counting harvest), and creative writing. Afternoons are project-based — building a birdhouse, mapping the food forest, or preparing a community presentation. Parent-educators take turns leading sessions based on their expertise. No exams, no grades — just portfolios, curiosity, and mentorship.",
    highlights: ["Morning nature exploration", "Project-based afternoons", "Parent-educator rotations", "Portfolio-based assessment"],
  },
  {
    title: "Women's Circle",
    description: "A sacred space for women to gather, share wisdom, practice crafts, and support each other.",
    icon: Moon,
    image: spaceWomen,
    details: "A private, beautifully appointed space dedicated to the women of the community. The Women's Circle hosts weekly gatherings for halaqa, textile arts, herbal medicine workshops, and candid conversation.",
    howItWorks: "Every Tuesday morning, women gather for a guided halaqa — rotating between Quranic reflection, seerah study, and personal development. Wednesday afternoons are craft sessions: natural dyeing, hand-stitching, herbal remedy preparation, or candle-making. Monthly, a visiting practitioner leads workshops on midwifery, holistic health, or financial literacy. The circle also serves as a support network — new mothers receive meal trains, and experienced mothers mentor younger ones. It's a place where vulnerability is welcomed and sisterhood is practiced, not just preached.",
    highlights: ["Tuesday morning halaqas", "Wednesday craft sessions", "Monthly wellness workshops", "New mother meal trains"],
  },
  {
    title: "Shura Circle",
    description: "Community decisions made collectively through consultation, transparency, and mutual respect.",
    icon: Handshake,
    image: spaceShura,
    details: "Governance at erdh follows the prophetic model of Shura — mutual consultation. The Shura Circle is a purpose-built meeting space where founding families gather monthly to discuss community matters.",
    howItWorks: "On the first Saturday of each month, one representative from each family sits in the Shura Circle. An agenda is circulated 48 hours prior. Discussions cover land maintenance, financial transparency, conflict mediation, upcoming events, and long-term planning. Decisions require 75% consensus. A rotating facilitator ensures fairness. Minutes are documented and shared with all families within 24 hours. Sub-committees (education, agriculture, infrastructure) report quarterly. No single family holds veto power — the community governs itself through mutual respect and accountability.",
    highlights: ["Monthly Saturday gatherings", "75% consensus decisions", "Rotating facilitator model", "Quarterly sub-committee reports"],
  },
  {
    title: "Community Library",
    description: "A curated collection for deep reading and reflection — a sanctuary for the curious mind.",
    icon: BookOpen,
    image: spaceLibrary,
    details: "A sanctuary for the mind. The Community Library houses a carefully curated collection spanning Islamic sciences, permaculture, philosophy, children's literature, and practical skills.",
    howItWorks: "The library operates on a trust-based borrow system — take a book, return it when done, leave a brief note about what resonated. Each family contributes at least 5 books upon joining. Bi-weekly reading circles discuss a shared book — alternating between adults and children's sessions. A quiet reading hour is observed daily from 2–3 PM. The library also archives community records: Shura minutes, seasonal harvest logs, children's portfolios, and oral histories from visiting elders. A strict no-screen policy keeps the space sacred for deep, focused thought.",
    highlights: ["Trust-based borrow system", "Bi-weekly reading circles", "Daily quiet hour (2–3 PM)", "Community oral history archive"],
  },
  {
    title: "Co-Working Space",
    description: "Remote work with valley views — designed to support earning while limiting screen dependency.",
    icon: Laptop,
    image: spaceCowork,
    details: "For families who earn remotely, the Co-Working Space offers high-speed internet, ergonomic workstations, and private call booths — all within a timber-framed structure overlooking the valley.",
    howItWorks: "The co-working space operates in structured blocks: 8 AM–12 PM and 2–5 PM. Outside these hours, the space closes to encourage presence with family and land. High-speed fiber internet (100 Mbps) serves 8 hot desks and 3 private call booths. A shared printer, scanner, and whiteboard room support collaborative projects. Monthly 'digital fasting' days are encouraged — one full day offline per week. Revenue from co-working day passes (for visiting professionals or retreaters) flows into the community maintenance fund. The view of the valley from every desk is a constant reminder: earn to live, don't live to earn.",
    highlights: ["Structured work blocks", "100 Mbps fiber internet", "Monthly digital fasting days", "Revenue supports community fund"],
  },
  {
    title: "Creative Workshop",
    description: "Woodwork, pottery, textile arts — traditional crafts meeting modern purpose and livelihood.",
    icon: Palette,
    image: spaceWorkshop,
    details: "The Creative Workshop is a hands-on maker space equipped for woodworking, pottery, natural dyeing, calligraphy, and textile arts.",
    howItWorks: "The workshop runs daily open hours from 9 AM–6 PM. Resident artisans — a woodworker, potter, and textile artist — anchor the space, offering apprenticeship-style mentoring to interested families. Children have dedicated Wednesday and Saturday craft mornings. Monthly markets let families sell their creations: handcrafted furniture, pottery, natural soaps, woven baskets, and Arabic calligraphy prints. An online cooperative storefront (launching Phase 2) will sell products nationally. 30% of market revenue goes to the maker, 10% to the community fund, and workshop materials are collectively purchased. Skills learned here become livelihoods — not just hobbies.",
    highlights: ["Daily open hours 9 AM–6 PM", "Apprenticeship-style mentoring", "Monthly craft markets", "Online cooperative storefront"],
  },
  {
    title: "erdh Marketplace",
    description: "A weekly farmers market, permanent co-op store, and online storefront — where community meets commerce.",
    icon: Store,
    image: spaceMarketplace,
    details: "The erdh Marketplace is the economic heartbeat of the community — a space where families sell their harvest, crafts, and artisan goods to each other, to visitors, and eventually to the world. It combines a vibrant weekly open-air market with a permanent cooperative store stocked with organic produce, natural soaps, handwoven textiles, pottery, and spices grown on-site.",
    howItWorks: "Every Saturday morning, the open-air market comes alive. Families set up timber stalls under a large canopy, displaying the week's harvest — fresh vegetables, fruits, herbs, honey, and preserves — alongside handcrafted goods from the Creative Workshop. The permanent co-op store operates daily from 9 AM–5 PM, stocked with community products and curated essentials. An online cooperative storefront (Phase 2) will extend reach nationally, shipping organic spices, artisan crafts, and natural products. Revenue follows a transparent model: 70% to the maker/grower, 20% to the community fund, and 10% to marketplace operations. Every transaction is logged and shared at the monthly Shura.",
    highlights: ["Saturday open-air farmers market", "Daily co-op store (9 AM–5 PM)", "Online storefront (Phase 2)", "Transparent 70/20/10 revenue split"],
  },
];

const CommunitySpaces = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedSpace, setSelectedSpace] = useState<typeof spaces[0] | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const nudgeControls = useAnimation();
  const hasNudged = useRef(false);

  useEffect(() => {
    if (isMobile && isInView && !hasNudged.current) {
      hasNudged.current = true;
      const timer = setTimeout(() => {
        nudgeControls.start({
          x: [0, -40, 0],
          transition: { duration: 0.8, ease: "easeInOut" },
        });
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isMobile, isInView, nudgeControls]);

  return (
    <section id="spaces" className="py-24 md:py-36 bg-card">
      <div ref={ref} className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <p className="text-secondary font-body text-sm tracking-[0.3em] uppercase mb-4">
            Shared Spaces
          </p>
          <h2 className="font-heading text-4xl md:text-6xl font-medium text-foreground leading-tight mb-6">
            Designed for <span className="italic text-primary">Togetherness</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
            Every space in the community is crafted to bring people closer — to each other, 
            to the earth, and to their purpose.
          </p>
          <div className="w-16 h-px bg-secondary mx-auto" />
        </motion.div>

        {/* Hero Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="my-16 relative overflow-hidden rounded-lg"
        >
          <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}>
            <CarouselContent>
              {heroImages.map((img, i) => (
                <CarouselItem key={i}>
                  <div className="relative aspect-[2/3] sm:aspect-[16/10]">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading={i === 0 ? "eager" : "lazy"} decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-foreground/30" />
                    {/* Top-right logo */}
                    <div className="absolute top-4 right-5 z-10">
                      <span className="font-heading text-lg font-bold text-primary-foreground/90">erdh</span>{" "}
                      <span className="font-body text-sm text-primary-foreground/70">1.0 wayanad</span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-background/30 backdrop-blur-sm border-0 text-primary-foreground hover:bg-background/50" />
            <CarouselNext className="right-4 bg-background/30 backdrop-blur-sm border-0 text-primary-foreground hover:bg-background/50" />
          </Carousel>
          <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
            <p className="font-heading text-2xl md:text-3xl text-primary-foreground italic mb-2">
              erdh's vision visualised.
            </p>
            <p className="font-body text-sm text-primary-foreground/80 max-w-md">
              Conceptual designs of the envisioned erdh 1.0 Wayanad community.
            </p>
          </div>
        </motion.div>

        {/* Spaces — swipeable on mobile, grid on desktop */}
        {isMobile ? (
          <div className="overflow-hidden -mx-6">
            <motion.div
              className="flex gap-4 px-6"
              drag="x"
              dragConstraints={{ left: -(spaces.length * 260 - window.innerWidth + 48), right: 0 }}
              animate={nudgeControls}
            >
              {spaces.map((space, i) => {
                const Icon = space.icon;
                return (
                  <motion.div
                    key={space.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                    className="bg-background rounded-lg overflow-hidden shadow-sm shrink-0 cursor-pointer"
                    style={{ width: "75vw", maxWidth: 300 }}
                    onClick={() => setSelectedSpace(space)}
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={space.image} alt={space.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-5 h-5 text-primary shrink-0" strokeWidth={1.5} />
                        <h3 className="font-heading text-lg font-semibold text-foreground">{space.title}</h3>
                      </div>
                      <p className="font-body text-muted-foreground text-sm leading-relaxed">{space.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map((space, i) => {
              const Icon = space.icon;
              return (
                <motion.div
                  key={space.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                  className="bg-background rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
                  onClick={() => setSelectedSpace(space)}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={space.image} alt={space.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-5 h-5 text-primary shrink-0" strokeWidth={1.5} />
                      <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{space.title}</h3>
                    </div>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed">{space.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-16"
        >
          <button
            onClick={() => navigate("/stewards")}
            className="inline-block font-body text-sm tracking-wider uppercase text-primary border border-primary px-10 py-4 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Meet the People →
          </button>
        </motion.div>
      </div>

      <SpaceDetailModal space={selectedSpace} onClose={() => setSelectedSpace(null)} />
    </section>
  );
};

export default CommunitySpaces;
