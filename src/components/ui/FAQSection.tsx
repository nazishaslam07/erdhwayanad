import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Coins,
  CalendarClock,
  GraduationCap,
  Briefcase,
  DoorOpen,
  Info,
} from "lucide-react";

type RichBullet = {
  text: string;
  tooltip: { term: string; description: string };
  suffix?: string;
};

type BulletItem = string | RichBullet;

type FaqItem = {
  question: string;
  icon: React.ReactNode;
  sections: {
    heading?: string;
    text?: string;
    bullets?: BulletItem[];
    note?: string;
  }[];
};

const faqs: FaqItem[] = [
  {
    question: "What does it cost to join the erdh community?",
    icon: <Coins className="w-5 h-5" />,
    sections: [
      {
        text: "erdh is being developed as a steward-led initiative guided by the erdh team, not as a luxury real estate project. The intention is to make it possible for families to live simply, close to nature, and aligned with faith.",
      },
      {
        heading: "What Your Contribution Covers",
        text: "Your contribution of ₹25 lakhs, goes toward creating the essential foundation of the settlement:",
        bullets: [
          { text: "Your plot (close to half acre, ", tooltip: { term: "Jenmam Dry Land", description: "We intentionally chose Kara land (dry garden land) with Jenmam ownership. This type of land is naturally suited for homes, trees, and small-scale regenerative farming. Jenmam ownership means it is privately held freehold land, providing stewards with clear and secure title." }, suffix: ")" },
          "Internal site roads, pathways and essential common spaces",
        ],
      },
      {
        heading: "Home Construction",
        text: "Homes are built separately.",
      },
      {
        text: "Detailed plans and cost breakdowns are shared during the Deep Dive Call, once families understand the vision and wish to explore the journey further.",
      },
      {
        note: "The combined cost of the land contribution and the starter home is expected to be roughly comparable to a modest apartment in many Indian cities.",
      },
    ],
  },
  {
    question: "What's the timeline? When can we move in?",
    icon: <CalendarClock className="w-5 h-5" />,
    sections: [
      {
        text: "Phase 1 — land acquisition and master planning is underway. We aim to welcome you within 6–12 months.",
      },
      {
        text: "Construction will happen in waves, allowing early families to help shape the community from the ground up. In most cases, families could begin weekend visits within 6 months, with the possibility of fully transitioning within about two years.",
      },
    ],
  },
  {
    question: "How do I earn a living here?",
    icon: <Briefcase className="w-5 h-5" />,
    sections: [
      {
        text: "Most founding families will continue remote work, and the homes are designed to support focused work from home. A dedicated community workspace is also envisioned as the community grows.",
      },
      {
        text: "Beyond remote work, opportunities may emerge through organic farming (spices, coffee, fruits), value-added products (cold-pressed oils, honey, herbal blends), creative workshops and retreats, and freelance consulting. Some families may also explore micro-enterprises around regenerative farming and nature-based tourism.",
      },
    ],
  },
  {
    question: "What about my children's education?",
    icon: <GraduationCap className="w-5 h-5" />,
    sections: [
      {
        text: "Many of the families drawn to erdh are already homeschooling or exploring alternatives to conventional schooling. The intention here is not to replace that, but to support and give structure to it within a shared learning environment.",
      },
      {
        text: "Over time, we hope to nurture a small learning ecosystem within the community where children can learn together while still being guided primarily by their families.",
      },
      {
        text: "The Kids Learning Circle is envisioned to bring together elements such as:",
        bullets: [
          "Nature-based learning and time outdoors",
          "Mentorship from elders and professionals within the community",
          "Project-based exploration and collaborative learning",
          "Practical life skills like farming, carpentry, craft, and storytelling",
        ],
      },
      {
        text: "The aim is to create a learning environment that is rooted in real life, curiosity, and character, rather than confined to a conventional classroom.",
      },
    ],
  },
  {
    question: "What if it doesn't work out? Can I leave?",
    icon: <DoorOpen className="w-5 h-5" />,
    sections: [
      {
        text: "Absolutely. We're building a community, not a commune with exit barriers.",
      },
      {
        text: "Your plot and home remain your asset. They can be transferred within the community network or sold, with a community right of first refusal.",
      },
      {
        text: "There will be a few guidelines to protect the shared vision and the collective effort invested by the stewards in building the community.",
      },
    ],
  },
];

const FAQAnswer = ({ sections }: { sections: FaqItem["sections"] }) => (
  <div className="space-y-4">
    {sections.map((section, i) => (
      <div key={i}>
        {section.heading && (
          <h4 className="font-heading text-sm font-semibold tracking-wide uppercase text-foreground/80 mb-1.5">
            {section.heading}
          </h4>
        )}
        {section.text && (
          <p className="font-body text-muted-foreground leading-relaxed text-base">
            {section.text}
          </p>
        )}
        {section.bullets && (
          <ul className="mt-2 space-y-1.5 pl-1">
            {section.bullets.map((bullet, j) => (
              <li key={j} className="flex items-start gap-2.5 text-muted-foreground text-base font-body">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {typeof bullet === "string" ? (
                  bullet
                ) : (
                  <span>
                    {bullet.text}
                    <TooltipProvider delayDuration={200}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="inline-flex items-center gap-1 border-b border-dotted border-primary/50 cursor-help text-foreground/80 font-medium">
                            {bullet.tooltip.term}
                            <Info className="w-3.5 h-3.5 text-primary inline" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs text-sm leading-relaxed">
                          {bullet.tooltip.description}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {bullet.suffix}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
        {section.note && (
          <div className="mt-3 px-4 py-3 bg-primary/5 border-l-2 border-primary rounded-r-md">
            <p className="font-body text-sm text-foreground/70 italic">
              {section.note}
            </p>
          </div>
        )}
      </div>
    ))}
  </div>
);

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="py-24 md:py-36 px-6 bg-background">
      <div ref={ref} className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-clay text-sm tracking-[0.3em] uppercase mb-4">
            Your Questions, Answered
          </p>
          <h2 className="font-heading text-4xl md:text-6xl font-medium leading-tight mb-6 text-foreground">
            Frequently Asked <span className="italic text-primary">Questions</span>
          </h2>
          <div className="w-16 h-px bg-clay mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="font-heading text-lg md:text-xl text-foreground hover:no-underline hover:text-primary transition-colors py-5">
                  <span className="flex items-center gap-3">
                    <span className="text-primary">{faq.icon}</span>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <FAQAnswer sections={faq.sections} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
