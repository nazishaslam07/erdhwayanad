import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  TreePine,
  Sun,
  Heart,
  BookOpen,
  Leaf,
  Shield,
} from "lucide-react";

interface DaySegment {
  time: string;
  label: string;
  icon: React.ElementType;
  activities: string[];
  startAngle: number; // degrees on the clock
  color: string;
}

const segments: DaySegment[] = [
  {
    time: "Dawn",
    label: "Stillness & Prayer",
    icon: Moon,
    activities: [
      "Begin with Fajr prayer as the first light appears",
      "Sit with morning adhkar and quiet reflection",
      "Take a short walk through the misty trails",
      "Journal or read before the world wakes",
    ],
    startAngle: -90, // 12 o'clock position
    color: "hsl(var(--primary))",
  },
  {
    time: "6:30 AM",
    label: "Morning Outdoors",
    icon: TreePine,
    activities: [
      "Tend to your family garden plot",
      "Join the children for a nature walk",
      "Harvest herbs and vegetables for breakfast",
      "Feed the compost and check the rainwater tanks",
    ],
    startAngle: -45,
    color: "hsl(var(--primary))",
  },
  {
    time: "8:00 AM",
    label: "Breakfast & Work",
    icon: Sun,
    activities: [
      "Share breakfast with your family at home",
      "Begin remote work from the co-working space",
      "Children start their morning learning circle",
      "Catch up with neighbours on the walking paths",
    ],
    startAngle: 0,
    color: "hsl(var(--secondary))",
  },
  {
    time: "Midday",
    label: "Prayer & Community Lunch",
    icon: Heart,
    activities: [
      "Gather at the prayer pavilion for Dhuhr",
      "Enjoy a communal lunch from shared harvest",
      "Sit with other families and share stories",
      "Help in the kitchen if it's your rotation week",
    ],
    startAngle: 45,
    color: "hsl(var(--secondary))",
  },
  {
    time: "2:00 PM",
    label: "Quiet Hour",
    icon: BookOpen,
    activities: [
      "Rest or nap — the community respects this stillness",
      "Read from the community library",
      "Write, sketch, or reflect in your journal",
      "Spend time with your children in calm play",
    ],
    startAngle: 90,
    color: "hsl(var(--primary))",
  },
  {
    time: "Afternoon",
    label: "Projects & Craft",
    icon: Leaf,
    activities: [
      "Join an apprenticeship session in the workshop",
      "Work on a community project or building task",
      "Attend a skill-share or study circle",
      "Children explore project-based learning",
    ],
    startAngle: 135,
    color: "hsl(var(--primary))",
  },
  {
    time: "Sunset",
    label: "Family & Dinner",
    icon: Moon,
    activities: [
      "Pray Maghrib as the sun dips behind the hills",
      "Prepare dinner together as a family",
      "Storytelling time with children under the trees",
      "Take an evening stroll through the food forest",
    ],
    startAngle: 180,
    color: "hsl(var(--secondary))",
  },
  {
    time: "Night",
    label: "Reflection & Rest",
    icon: Shield,
    activities: [
      "Isha prayer and evening adhkar",
      "Gather with neighbours for tea and conversation",
      "Read together as a family before bed",
      "End the day in gratitude and quiet",
    ],
    startAngle: 225,
    color: "hsl(var(--secondary))",
  },
];

const RADIUS = 160;
const INNER_RADIUS = 90;
const DOT_RADIUS = 140;

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

const DailyRhythmCircle = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const cx = 200;
  const cy = 200;

  return (
    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
      {/* SVG Circle */}
      <div className="relative shrink-0">
        <svg
          viewBox="0 0 400 400"
          className="w-[320px] h-[320px] md:w-[400px] md:h-[400px]"
        >
          {/* Outer ring background */}
          <circle cx={cx} cy={cy} r={RADIUS} fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
          <circle cx={cx} cy={cy} r={INNER_RADIUS} fill="none" stroke="hsl(var(--border))" strokeWidth="1" />

          {/* Arc segments */}
          {segments.map((seg, i) => {
            const nextAngle = i < segments.length - 1 ? segments[i + 1].startAngle : segments[0].startAngle + 360;
            const isActive = activeIndex === i;
            return (
              <path
                key={i}
                d={describeArc(cx, cy, DOT_RADIUS, seg.startAngle, nextAngle)}
                fill="none"
                stroke={isActive ? seg.color : "hsl(var(--muted-foreground) / 0.15)"}
                strokeWidth={isActive ? 28 : 20}
                strokeLinecap="round"
                className="transition-all duration-500 cursor-pointer"
                onClick={() => setActiveIndex(isActive ? null : i)}
                style={{ opacity: isActive ? 1 : activeIndex !== null ? 0.3 : 0.6 }}
              />
            );
          })}

          {/* Anchor dots & labels */}
          {segments.map((seg, i) => {
            const pos = polarToCartesian(cx, cy, DOT_RADIUS, seg.startAngle);
            const labelPos = polarToCartesian(cx, cy, RADIUS + 24, seg.startAngle);
            const isActive = activeIndex === i;
            const Icon = seg.icon;

            return (
              <g
                key={i}
                onClick={() => setActiveIndex(isActive ? null : i)}
                className="cursor-pointer"
              >
                {/* Dot */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isActive ? 18 : 14}
                  fill={isActive ? seg.color : "hsl(var(--card))"}
                  stroke={isActive ? seg.color : "hsl(var(--border))"}
                  strokeWidth={isActive ? 0 : 1.5}
                  className="transition-all duration-300"
                />
                {/* Icon inside dot */}
                <foreignObject
                  x={pos.x - 8}
                  y={pos.y - 8}
                  width={16}
                  height={16}
                  className="pointer-events-none"
                >
                  <Icon
                    className="w-4 h-4 transition-colors duration-300"
                    style={{ color: isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--primary))" }}
                    strokeWidth={1.5}
                  />
                </foreignObject>
                {/* Time label */}
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-body transition-all duration-300 select-none pointer-events-none"
                  fill={isActive ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))"}
                  fontSize={isActive ? 11 : 10}
                  fontWeight={isActive ? 600 : 400}
                >
                  {seg.time}
                </text>
              </g>
            );
          })}

          {/* Center text */}
          <text
            x={cx}
            y={cy - 8}
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-heading select-none"
            fill="hsl(var(--foreground))"
            fontSize="16"
            fontWeight="500"
          >
            {activeIndex !== null ? segments[activeIndex].time : "A Day"}
          </text>
          <text
            x={cx}
            y={cy + 12}
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-body select-none"
            fill="hsl(var(--muted-foreground))"
            fontSize="11"
          >
            {activeIndex !== null ? segments[activeIndex].label : "at erdh"}
          </text>
        </svg>
      </div>

      {/* Activity panel */}
      <div className="flex-1 min-h-[200px] w-full lg:w-auto">
        <AnimatePresence mode="wait">
          {activeIndex !== null ? (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div>
                <p className="font-body text-xs text-primary uppercase tracking-[0.2em] mb-1">
                  {segments[activeIndex].time}
                </p>
                <h3 className="font-heading text-2xl md:text-3xl text-foreground">
                  {segments[activeIndex].label}
                </h3>
              </div>
              <p className="font-body text-muted-foreground text-sm">
                Some of the things you might find yourself doing:
              </p>
              <div className="space-y-3">
                {segments[activeIndex].activities.map((activity, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: j * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <p className="font-body text-foreground text-sm leading-relaxed">
                      {activity}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center lg:items-start justify-center h-full text-center lg:text-left"
            >
              <p className="font-body text-muted-foreground text-base leading-relaxed max-w-sm">
                Tap any time on the circle to see what a moment at erdh might look like.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DailyRhythmCircle;
