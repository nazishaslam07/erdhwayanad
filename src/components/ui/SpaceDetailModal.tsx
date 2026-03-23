import { motion, AnimatePresence } from "framer-motion";
import { forwardRef, type ElementRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Clock,
  Users,
  Leaf,
  CheckCircle2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

export interface SpaceData {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  details: string;
  howItWorks: string;
  highlights: string[];
  rhythm?: { time: string; activity: string }[];
  principles?: { icon: LucideIcon; label: string }[];
}

interface SpaceDetailModalProps {
  space: SpaceData | null;
  onClose: () => void;
}

const SpaceDetailModal = forwardRef<ElementRef<typeof DialogContent>, SpaceDetailModalProps>(
  ({ space, onClose }, ref) => {
    return (
      <Dialog open={!!space} onOpenChange={(open) => !open && onClose()}>
        <DialogContent ref={ref} className="sm:max-w-5xl w-[95vw] bg-background max-h-[92vh] overflow-y-auto p-0 gap-0">
          {space && (
            <AnimatePresence mode="wait">
              <motion.div
                key={space.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Hero Banner */}
                <div className="relative aspect-[21/9] sm:aspect-[3/1] overflow-hidden">
                  <img
                    src={space.image}
                    alt={space.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                        <space.icon className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
                      </div>
                      <DialogTitle className="font-heading text-3xl sm:text-4xl text-primary-foreground font-medium tracking-tight">
                        {space.title}
                      </DialogTitle>
                    </div>
                    <p className="font-body text-primary-foreground/80 text-sm sm:text-base max-w-2xl">
                      {space.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-10 space-y-10">
                  {/* Overview */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <SectionLabel icon={Leaf} label="Overview" />
                    <p className="font-body text-muted-foreground text-base sm:text-lg leading-relaxed mt-4">
                      {space.details}
                    </p>
                  </motion.div>

                  {/* How It Works + Daily Rhythm */}
                  <div className="grid md:grid-cols-5 gap-8">
                    {/* How It Works — wider column */}
                    <motion.div
                      className="md:col-span-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <SectionLabel icon={Users} label="How It Works" />
                      <div className="bg-card rounded-xl p-6 mt-4">
                        <p className="font-body text-muted-foreground text-sm sm:text-base leading-relaxed">
                          {space.howItWorks}
                        </p>
                      </div>
                    </motion.div>

                    {/* Daily Rhythm / Schedule */}
                    <motion.div
                      className="md:col-span-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <SectionLabel icon={Clock} label="Daily Rhythm" />
                      <div className="mt-4 space-y-0">
                        {(space.rhythm ?? getDefaultRhythm(space.title)).map((item, i, arr) => (
                          <div key={i} className="flex gap-4 items-start group">
                            {/* Timeline line */}
                            <div className="flex flex-col items-center">
                              <div className="w-2.5 h-2.5 rounded-full bg-primary border-2 border-primary shrink-0 mt-1.5" />
                              {i < arr.length - 1 && (
                                <div className="w-px flex-1 bg-border min-h-[28px]" />
                              )}
                            </div>
                            <div className="pb-4">
                              <span className="font-body text-xs font-semibold text-primary uppercase tracking-wider">
                                {item.time}
                              </span>
                              <p className="font-body text-sm text-muted-foreground mt-0.5">
                                {item.activity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Highlights */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <SectionLabel icon={CheckCircle2} label="Key Highlights" />
                    <div className="grid sm:grid-cols-2 gap-3 mt-4">
                      {space.highlights.map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.45 + i * 0.06 }}
                          className="flex items-center gap-3 bg-card rounded-lg px-4 py-3"
                        >
                          <ArrowRight className="w-4 h-4 text-primary shrink-0" strokeWidth={2} />
                          <span className="font-body text-sm text-foreground">{h}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Guiding Principles */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="border-t border-border pt-6">
                      <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground text-center mb-4">
                        Guiding Principles
                      </p>
                      <div className="flex flex-wrap justify-center gap-3">
                        {(space.principles ?? getDefaultPrinciples(space.title)).map((p, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 bg-card rounded-full px-4 py-2"
                          >
                            <p.icon className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                            <span className="font-body text-xs font-medium text-foreground">
                              {p.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </DialogContent>
      </Dialog>
    );
  },
);

SpaceDetailModal.displayName = "SpaceDetailModal";

/* Section label component */
const SectionLabel = ({ icon: Icon, label }: { icon: LucideIcon; label: string }) => (
  <div className="flex items-center gap-2">
    <Icon className="w-4 h-4 text-secondary" strokeWidth={1.5} />
    <span className="font-heading text-lg text-foreground font-medium">
      {label}
    </span>
  </div>
);

/* Default rhythms per space */
import {
  Heart,
  TreePine,
  HandHeart,
  BookOpenCheck,
  Lightbulb,
  Wheat,
  Shield,
  Sparkles,
  Eye,
  Scale,
  Hammer,
} from "lucide-react";

function getDefaultRhythm(title: string): { time: string; activity: string }[] {
  const rhythms: Record<string, { time: string; activity: string }[]> = {
    "Prayer Pavilion": [
      { time: "Dawn", activity: "Morning prayer & quiet reflection" },
      { time: "Midday", activity: "Congregational prayer" },
      { time: "Afternoon", activity: "Prayer & reflection" },
      { time: "Sunset", activity: "Evening prayer in community" },
      { time: "Night", activity: "Night prayer & contemplation" },
    ],
    "Community Kitchen": [
      { time: "Morning", activity: "Harvest fresh produce from gardens" },
      { time: "Midday", activity: "Communal lunch preparation" },
      { time: "Afternoon", activity: "Preservation & fermentation" },
      { time: "Evening", activity: "Family dinner service" },
      { time: "Thursday", activity: "Heritage feast night" },
    ],
    "Kids Learning Circle": [
      { time: "8 AM", activity: "Nature walk & journaling" },
      { time: "10 AM", activity: "Guided learning sessions" },
      { time: "12 PM", activity: "Communal lunch & free play" },
      { time: "2 PM", activity: "Project-based activities" },
      { time: "4 PM", activity: "Storytelling & reflection" },
    ],
    "Women's Circle": [
      { time: "Tuesday AM", activity: "Weekly study circle" },
      { time: "Wednesday PM", activity: "Craft & textile sessions" },
      { time: "Monthly", activity: "Wellness workshop" },
      { time: "As needed", activity: "New mother support & mentoring" },
    ],
    "Shura Circle": [
      { time: "1st Saturday", activity: "Monthly community assembly" },
      { time: "48h prior", activity: "Agenda circulation" },
      { time: "During", activity: "Discussion & 75% consensus vote" },
      { time: "Within 24h", activity: "Minutes shared with all families" },
    ],
    "Community Library": [
      { time: "Morning", activity: "Open browsing & borrow" },
      { time: "2–3 PM", activity: "Quiet reading hour" },
      { time: "Bi-weekly", activity: "Adult reading circle" },
      { time: "Bi-weekly", activity: "Children's book club" },
    ],
    "Co-Working Space": [
      { time: "8 AM–12 PM", activity: "Morning focus block" },
      { time: "12–2 PM", activity: "Break — lunch & family time" },
      { time: "2–5 PM", activity: "Afternoon work session" },
      { time: "Monthly", activity: "Digital fasting day" },
    ],
    "Creative Workshop": [
      { time: "9 AM", activity: "Workshop opens — open making" },
      { time: "Wed & Sat AM", activity: "Children's craft mornings" },
      { time: "Afternoon", activity: "Apprenticeship sessions" },
      { time: "Monthly", activity: "Community craft market" },
    ],
    "erdh Marketplace": [
      { time: "Saturday AM", activity: "Weekly open-air market setup" },
      { time: "9 AM–1 PM", activity: "Market day — produce & crafts" },
      { time: "Daily 9–5", activity: "Co-op store open" },
      { time: "Monthly", activity: "Revenue report at Shura" },
    ],
  };
  return rhythms[title] ?? [
    { time: "Morning", activity: "Community gathering" },
    { time: "Afternoon", activity: "Structured activities" },
    { time: "Evening", activity: "Reflection & rest" },
  ];
}

function getDefaultPrinciples(title: string): { icon: LucideIcon; label: string }[] {
  const principles: Record<string, { icon: LucideIcon; label: string }[]> = {
    "Prayer Pavilion": [
      { icon: Heart, label: "Spiritual anchor" },
      { icon: TreePine, label: "Nature-connected" },
      { icon: Users, label: "Congregational" },
      { icon: Sparkles, label: "Sacred simplicity" },
    ],
    "Community Kitchen": [
      { icon: Wheat, label: "Farm-to-table" },
      { icon: HandHeart, label: "Shared labor" },
      { icon: Leaf, label: "Zero waste" },
      { icon: Heart, label: "Heritage preservation" },
    ],
    "Kids Learning Circle": [
      { icon: Eye, label: "Curiosity-driven" },
      { icon: TreePine, label: "Nature-first" },
      { icon: Lightbulb, label: "Project-based" },
      { icon: HandHeart, label: "Mentorship" },
    ],
    "Women's Circle": [
      { icon: Shield, label: "Safe space" },
      { icon: Heart, label: "Sisterhood" },
      { icon: Sparkles, label: "Empowerment" },
      { icon: HandHeart, label: "Mutual support" },
    ],
    "Shura Circle": [
      { icon: Scale, label: "Equity" },
      { icon: Eye, label: "Transparency" },
      { icon: Users, label: "Consensus" },
      { icon: Shield, label: "Accountability" },
    ],
    "Community Library": [
      { icon: BookOpenCheck, label: "Deep reading" },
      { icon: Sparkles, label: "Trust-based" },
      { icon: Heart, label: "Oral history" },
      { icon: Eye, label: "Screen-free" },
    ],
    "Co-Working Space": [
      { icon: Lightbulb, label: "Focused work" },
      { icon: TreePine, label: "Forest views" },
      { icon: Scale, label: "Work-life balance" },
      { icon: Users, label: "Community fund" },
    ],
    "Creative Workshop": [
      { icon: Hammer, label: "Hands-on making" },
      { icon: HandHeart, label: "Apprenticeship" },
      { icon: Wheat, label: "Livelihood" },
      { icon: Heart, label: "Cooperative" },
    ],
    "erdh Marketplace": [
      { icon: Scale, label: "Fair trade" },
      { icon: Eye, label: "Transparency" },
      { icon: Wheat, label: "Farm-to-market" },
      { icon: Users, label: "Cooperative" },
    ],
  };
  return principles[title] ?? [
    { icon: Heart, label: "Community-first" },
    { icon: Leaf, label: "Earth-responsive" },
    { icon: Users, label: "Collaborative" },
  ];
}

export default SpaceDetailModal;
