import { useState, useMemo, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Salad, TreePine, Tractor, Laptop,
  CookingPot, GraduationCap, BookOpen,
  Flower2, Users, X, Car, TreeDeciduous, ShieldCheck,
  Egg, Beef, Footprints
} from "lucide-react";

/* Mosque icon – no lucide equivalent */
const MosqueIcon = ({ className, strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2C9 5 7 7 7 10v10h10V10c0-3-2-5-5-8z" />
    <path d="M7 20H5v-6a2 2 0 0 1 2-2" />
    <path d="M17 20h2v-6a2 2 0 0 0-2-2" />
    <circle cx="12" cy="10" r="1.5" />
    <path d="M7 20h10" />
  </svg>
);
import { useIsMobile } from "@/components/ui/use-mobile";

/* ─── Types ─── */
type ActiveView = null | "plot" | "commons" | "community" | "house" | "periphery" | "walkways" | "clusterCommons";

/* ─── Cluster definitions ─── */
interface ClusterDef {
  cx: number; cy: number;
  plots: { cx: number; cy: number }[];
  label: string;
}

/* Horizontal (desktop) — more spread, center (80,42) */
const CLUSTERS_H: ClusterDef[] = [
  {
    cx: 36, cy: 26, label: "Circle A",
    plots: [
      { cx: 16, cy: 14 }, { cx: 36, cy: 10 }, { cx: 54, cy: 16 },
      { cx: 20, cy: 38 }, { cx: 50, cy: 38 },
    ],
  },
  {
    cx: 124, cy: 26, label: "Circle B",
    plots: [
      { cx: 106, cy: 14 }, { cx: 124, cy: 10 }, { cx: 144, cy: 16 },
      { cx: 108, cy: 38 }, { cx: 140, cy: 38 },
    ],
  },
  {
    cx: 80, cy: 60, label: "Circle C",
    plots: [
      { cx: 62, cy: 68 }, { cx: 80, cy: 70 }, { cx: 98, cy: 68 },
      { cx: 60, cy: 50 }, { cx: 100, cy: 50 },
    ],
  },
];

/* Vertical (mobile) — 120° arrangement, openings face center (50,54) */
const CLUSTERS_V: ClusterDef[] = [
  {
    cx: 50, cy: 18, label: "Circle A",
    plots: [
      // Arc (away from CC, at top)
      { cx: 30, cy: 6 }, { cx: 50, cy: 2 }, { cx: 70, cy: 6 },
      // Open side (toward CC, at bottom)
      { cx: 36, cy: 28 }, { cx: 64, cy: 28 },
    ],
  },
  {
    cx: 23, cy: 81, label: "Circle B",
    plots: [
      // Arc (away from CC, rotated 60° CW)
      { cx: 16, cy: 93 }, { cx: 32, cy: 90 }, { cx: 43, cy: 79 },
      // Open side (toward CC, rotated 60° CW)
      { cx: 6, cy: 78 }, { cx: 20, cy: 63 },
    ],
  },
  {
    cx: 77, cy: 81, label: "Circle C",
    plots: [
      // Arc (away from CC, rotated 60° CCW)
      { cx: 84, cy: 93 }, { cx: 68, cy: 90 }, { cx: 57, cy: 79 },
      // Open side (toward CC, rotated 60° CCW)
      { cx: 94, cy: 78 }, { cx: 80, cy: 63 },
    ],
  },
];

/* Community commons spaces — positions only */
const CC_SPACES_H = [
  { x: 68, y: 30 }, { x: 80, y: 26 }, { x: 92, y: 30 },
  { x: 72, y: 38 }, { x: 88, y: 38 }, { x: 80, y: 34 },
];
const CC_SPACES_V = [
  { x: 38, y: 50 }, { x: 50, y: 46 }, { x: 62, y: 50 },
  { x: 42, y: 60 }, { x: 58, y: 60 }, { x: 50, y: 55 },
];

const CENTER_H = { cx: 80, cy: 33 };
const CENTER_V = { cx: 50, cy: 54 };

/* ─── Organic plot shapes ─── */
const PLOT_SHAPES = [
  "M-7,-5.5 C-4,-8 6,-7 7,-5.5 C8.5,-3 8,5.5 6,7 C4,8 -5.5,7 -6.5,5.5 C-8,4 -9,-3 -7,-5.5Z",
  "M-6.5,-6 C-3.5,-8.5 6.5,-6 7,-4.5 C8,-2 7,6 5.5,7 C4,8 -5.5,6.5 -6.5,5 C-8,3 -8,-3.5 -6.5,-6Z",
  "M-7,-5 C-4,-7.5 6.5,-5.5 7.5,-4 C9,-1.5 6.5,6.5 5.5,7 C3,8 -5.5,6.5 -6.5,5 C-8,3.5 -9,-2.5 -7,-5Z",
  "M-5.5,-7 C-3,-9 6.5,-6.5 7,-5 C8,-2.5 6.5,6.5 5,7 C3,8.5 -5.5,6.5 -7,5 C-8,3.5 -7.5,-4.5 -5.5,-7Z",
  "M-6.5,-5.5 C-4,-8 5.5,-6.5 7,-5 C8.5,-2.5 7.5,5.5 5.5,7 C4,8.5 -6.5,6.5 -7,5 C-8,3 -8,-3 -6.5,-5.5Z",
];

/* Organic irregular boundaries */
const BOUNDARY_H = "M 28,2 C 42,-3 60,-4 80,-3 C 100,-4 118,-3 132,2 C 148,8 157,18 160,32 C 162,46 158,58 150,68 C 140,76 120,82 80,83 C 40,82 20,76 10,68 C 2,58 -2,46 0,32 C 3,18 12,8 28,2 Z";
const BOUNDARY_V = "M 50,-2 C 68,-4 85,2 94,14 C 102,28 104,46 102,64 C 100,80 96,94 88,104 C 78,112 64,118 50,118 C 36,118 22,112 12,104 C 4,94 0,80 -2,64 C -4,46 -2,28 6,14 C 15,2 32,-4 50,-2 Z";

/* ─── Dense tree positions ─── */
const FILL_TREES_H = [
  // Boundary ring
  {x:6,y:6},{x:14,y:2},{x:28,y:-1},{x:42,y:-2},{x:58,y:-3},{x:72,y:-2},{x:88,y:-2},{x:102,y:-3},{x:118,y:-2},{x:132,y:-1},{x:146,y:2},{x:154,y:6},
  {x:158,y:16},{x:160,y:28},{x:161,y:40},{x:160,y:52},{x:158,y:62},{x:152,y:72},{x:142,y:78},{x:128,y:82},{x:112,y:83},{x:96,y:84},{x:80,y:84},
  {x:64,y:84},{x:48,y:83},{x:32,y:82},{x:18,y:78},{x:8,y:72},{x:2,y:62},{x:0,y:52},{x:-1,y:40},{x:0,y:28},{x:2,y:16},
  // Between clusters – dense infill
  {x:68,y:20},{x:92,y:20},{x:74,y:18},{x:86,y:18},{x:80,y:16},
  {x:56,y:48},{x:104,y:48},{x:48,y:52},{x:112,y:52},
  {x:38,y:50},{x:122,y:50},{x:64,y:44},{x:96,y:44},
  // Around plots extra
  {x:10,y:24},{x:150,y:24},{x:12,y:48},{x:148,y:48},{x:30,y:58},{x:130,y:58},
  {x:70,y:8},{x:90,y:8},{x:44,y:20},{x:116,y:20},
  // Interior fill
  {x:60,y:32},{x:100,y:32},{x:70,y:56},{x:90,y:56},{x:80,y:28},{x:76,y:62},{x:84,y:62},
  {x:24,y:28},{x:136,y:28},{x:30,y:44},{x:130,y:44},
  {x:46,y:68},{x:114,y:68},{x:68,y:78},{x:92,y:78},
];
const FILL_TREES_V = [
  // Boundary ring
  {x:10,y:3},{x:22,y:-1},{x:36,y:-3},{x:50,y:-3},{x:64,y:-3},{x:78,y:-1},{x:90,y:3},
  {x:96,y:12},{x:100,y:24},{x:102,y:38},{x:103,y:52},{x:102,y:66},{x:100,y:80},{x:96,y:92},{x:90,y:102},{x:80,y:110},{x:66,y:116},{x:50,y:118},
  {x:34,y:116},{x:20,y:110},{x:10,y:102},{x:4,y:92},{x:0,y:80},{x:-2,y:66},{x:-2,y:52},{x:0,y:38},{x:0,y:24},{x:4,y:12},
  // Between clusters dense
  {x:50,y:40},{x:38,y:44},{x:62,y:44},{x:50,y:46},
  {x:20,y:56},{x:80,y:56},{x:30,y:50},{x:70,y:50},
  // Around plots
  {x:16,y:20},{x:84,y:20},{x:50,y:20},{x:14,y:80},{x:86,y:80},
  {x:26,y:104},{x:74,y:104},{x:50,y:100},{x:50,y:76},
  // Interior
  {x:40,y:36},{x:60,y:36},{x:34,y:76},{x:66,y:76},{x:50,y:70},{x:50,y:86},
  {x:18,y:50},{x:82,y:50},{x:46,y:108},{x:54,y:108},
];

/* ─── SVG Symbols ─── */
const TreeSymbol = ({ x, y, size = 3 }: { x: number; y: number; size?: number }) => (
  <g transform={`translate(${x},${y})`} opacity={0.3}>
    <circle r={size} fill="hsl(var(--primary))" opacity={0.25} />
    <circle r={size * 0.6} fill="hsl(var(--primary))" opacity={0.15} />
    <line x1={0} y1={size * 0.5} x2={0} y2={size * 1.4} stroke="hsl(var(--primary))" strokeWidth={0.5} opacity={0.3} />
  </g>
);

const PlantSymbol = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x},${y})`} opacity={0.2}>
    <ellipse rx={1.5} ry={1} fill="hsl(var(--primary))" opacity={0.25} />
  </g>
);

const CarSymbol = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x},${y})`} opacity={0.22}>
    <rect x={-2} y={-1.1} width={4} height={2.2} rx={0.7} fill="hsl(var(--foreground) / 0.1)" stroke="hsl(var(--foreground) / 0.18)" strokeWidth={0.25} />
    <circle cx={-0.8} cy={1.3} r={0.4} fill="hsl(var(--foreground) / 0.15)" />
    <circle cx={0.8} cy={1.3} r={0.4} fill="hsl(var(--foreground) / 0.15)" />
  </g>
);

/* Commons building — no labels */
const CommonsBuilding = ({ x, y, onClick, isHovered }: {
  x: number; y: number; onClick: () => void; isHovered: boolean;
}) => (
  <g transform={`translate(${x},${y})`} className="cursor-pointer" onClick={onClick}>
    <rect x={-3} y={-2} width={6} height={4} rx={0.6}
      fill={isHovered ? "hsl(var(--secondary) / 0.25)" : "hsl(var(--secondary) / 0.08)"}
      stroke={isHovered ? "hsl(var(--secondary) / 0.5)" : "hsl(var(--secondary) / 0.2)"}
      strokeWidth={0.3} strokeDasharray="1.5 0.8"
      style={{ transition: "fill 0.3s, stroke 0.3s" }} />
  </g>
);

function curvePath(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = b.x - a.x, dy = b.y - a.y;
  const mx = (a.x + b.x) / 2 + dy * 0.15, my = (a.y + b.y) / 2 - dx * 0.15;
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
}

/* meandering path with two control points */
function meanderPath(a: { x: number; y: number }, b: { x: number; y: number }, seed: number) {
  const dx = b.x - a.x, dy = b.y - a.y;
  const offset1 = ((seed * 7) % 5 - 2.5) * 0.15;
  const offset2 = ((seed * 13) % 5 - 2.5) * 0.12;
  const c1x = a.x + dx * 0.33 + dy * offset1;
  const c1y = a.y + dy * 0.33 - dx * offset1;
  const c2x = a.x + dx * 0.66 + dy * offset2;
  const c2y = a.y + dy * 0.66 - dx * offset2;
  return `M ${a.x} ${a.y} C ${c1x} ${c1y} ${c2x} ${c2y} ${b.x} ${b.y}`;
}

/* ─── Modal ─── */
const ExpandedCard = forwardRef<HTMLDivElement, { onClose: () => void; children: React.ReactNode }>(
  ({ onClose, children }, ref) => (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 pb-6 md:p-4 bg-foreground/10 backdrop-blur-[2px]" onClick={onClose}>
      <div className="relative w-full max-w-sm flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full bg-background border border-border rounded-xl shadow-xl p-5 md:p-7"
          style={{ backgroundImage: "radial-gradient(circle at 20% 80%, hsl(var(--primary) / 0.03) 0%, transparent 50%)" }}>
          {children}
        </motion.div>
        <button onClick={onClose} className="mt-3 w-10 h-10 rounded-full bg-foreground/80 backdrop-blur-sm flex items-center justify-center hover:bg-foreground/90 transition-colors z-30 shrink-0">
          <X className="w-4 h-4 text-background" />
        </button>
      </div>
    </motion.div>
  )
);
ExpandedCard.displayName = "ExpandedCard";

const SketchIcon = ({ icon: Icon, label, delay }: { icon: React.ElementType; label: string; delay: number }) => (
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay }} className="flex items-center gap-2.5">
    <div className="w-8 h-8 rounded-lg border border-dashed border-primary/30 bg-primary/5 flex items-center justify-center shrink-0">
      <Icon className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
    </div>
    <span className="font-body text-xs text-muted-foreground">{label}</span>
  </motion.div>
);

const PhaseCard = ({ phase, title, description, items, delay }: { phase: number; title: string; description: string; items: string[]; delay: number }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay }} className="border border-border/60 rounded-lg p-3 bg-background/50">
    <div className="flex items-center gap-2 mb-1.5">
      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-medium flex items-center justify-center">{phase}</span>
      <h4 className="font-heading text-sm font-medium text-foreground">{title}</h4>
    </div>
    <p className="font-body text-xs text-muted-foreground mb-1.5">{description}</p>
    <div className="flex flex-wrap gap-1">
      {items.map((item, i) => (
        <span key={i} className="text-[10px] font-body px-2 py-0.5 rounded-full bg-primary/5 text-primary/80 border border-primary/10">{item}</span>
      ))}
    </div>
  </motion.div>
);

/* ═══════════════════════════════════════════════════ */

const MasterplanDiagram = () => {
  const [active, setActive] = useState<ActiveView>(null);
  const [highlightPlot, setHighlightPlot] = useState<string | null>(null);
  const [highlightHouse, setHighlightHouse] = useState<string | null>(null);
  const [commonsHover, setCommonsHover] = useState(false);
  const [clusterHover, setClusterHover] = useState<number | null>(null);
  const [pathHover, setPathHover] = useState(false);
  const [boundaryHover, setBoundaryHover] = useState(false);
  const isMobile = useIsMobile();

  const isVertical = isMobile;
  const viewBox = isVertical ? "-8 -8 116 134" : "-8 -8 176 98";
  const center = isVertical ? CENTER_V : CENTER_H;
  const clusters = isVertical ? CLUSTERS_V : CLUSTERS_H;
  const ccSpaces = isVertical ? CC_SPACES_V : CC_SPACES_H;
  const fillTrees = isVertical ? FILL_TREES_V : FILL_TREES_H;
  const boundaryPath = isVertical ? BOUNDARY_V : BOUNDARY_H;

  // Car positions
  const allCarPositions = useMemo(() => {
    const cars: { x: number; y: number }[] = [];
    clusters.forEach((cl) => {
      cl.plots.forEach((p) => {
        const dx = p.cx - cl.cx, dy = p.cy - cl.cy;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        cars.push({ x: p.cx + (dx / dist) * 11, y: p.cy + (dy / dist) * 11 });
      });
    });
    return cars;
  }, [clusters]);

  // Walkway segments — comprehensive network
  const walkwaySegments = useMemo(() => {
    const segs: { a: { x: number; y: number }; b: { x: number; y: number }; seed: number }[] = [];
    let idx = 0;
    clusters.forEach((cl) => {
      // Plots to cluster commons
      cl.plots.forEach((p) => {
        segs.push({ a: { x: p.cx, y: p.cy }, b: { x: cl.cx, y: cl.cy }, seed: idx++ });
      });
      // Between adjacent plots
      for (let i = 0; i < cl.plots.length; i++) {
        const next = cl.plots[(i + 1) % cl.plots.length];
        segs.push({ a: { x: cl.plots[i].cx, y: cl.plots[i].cy }, b: { x: next.cx, y: next.cy }, seed: idx++ });
      }
      // Cluster commons to community commons
      segs.push({ a: { x: cl.cx, y: cl.cy }, b: { x: center.cx, y: center.cy }, seed: idx++ });
    });
    // Cross-landscape paths between clusters
    for (let i = 0; i < clusters.length; i++) {
      const next = clusters[(i + 1) % clusters.length];
      segs.push({ a: { x: clusters[i].cx, y: clusters[i].cy }, b: { x: next.cx, y: next.cy }, seed: idx++ });
    }
    // Internal community commons paths
    for (let i = 0; i < ccSpaces.length - 1; i++) {
      segs.push({ a: ccSpaces[i], b: ccSpaces[i + 1], seed: idx++ });
    }
    segs.push({ a: ccSpaces[ccSpaces.length - 1], b: ccSpaces[0], seed: idx++ });
    // Radial paths from center to each commons space
    ccSpaces.forEach((s) => {
      segs.push({ a: { x: center.cx, y: center.cy }, b: s, seed: idx++ });
    });
    return segs;
  }, [clusters, center, ccSpaces]);

  let plotNum = 0;

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-2xl md:max-w-5xl lg:max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-secondary mb-3">Schematic Diagram</p>
          <h2 className="font-heading text-2xl md:text-4xl font-medium text-foreground leading-tight mb-2">
            Explore the <span className="italic text-primary">Concept</span>
          </h2>
          <p className="font-body text-sm text-muted-foreground">Home → Circle → Community</p>
          <p className="font-body text-xs text-muted-foreground/50 mt-2">Tap or hover on elements to explore the community</p>
          <p className="font-body text-[10px] text-muted-foreground/40 mt-1 italic">* Schematic representation, not the actual site layout</p>
        </div>

        <div className="relative mx-auto w-full" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, hsl(var(--muted) / 0.3) 0%, transparent 70%)" }}>
          <svg viewBox={viewBox} className="w-full h-auto" role="img" aria-label="Interactive community masterplan showing 15 family plots organized in 3 circles around a central community commons" style={{ filter: "url(#sketch)" }}>
            <defs>
              <filter id="sketch">
                <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="3" result="turbulence" />
                <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="0.5" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>

            {/* Organic boundary — visible */}
            <path d={boundaryPath} fill="none"
              stroke={boundaryHover ? "hsl(var(--primary) / 0.4)" : "hsl(var(--primary) / 0.18)"}
              strokeWidth={boundaryHover ? 0.8 : 0.5} strokeDasharray="3 2"
              style={{ transition: "stroke 0.3s, stroke-width 0.3s" }} />
            {/* Boundary hit area */}
            <path d={boundaryPath} fill="none" stroke="transparent" strokeWidth={8}
              className="cursor-pointer"
              onMouseEnter={() => setBoundaryHover(true)}
              onMouseLeave={() => setBoundaryHover(false)}
              onClick={() => setActive("periphery")} />

            {/* Dense trees — lush landscape */}
            {fillTrees.map((t, i) => (
              <g key={`ft${i}`}>
                <TreeSymbol x={t.x} y={t.y} size={i % 4 === 0 ? 3 : i % 3 === 0 ? 2.2 : 1.5} />
                {i % 2 === 0 && <PlantSymbol x={t.x + 2} y={t.y + 1.2} />}
                {i % 3 === 0 && <PlantSymbol x={t.x - 1.5} y={t.y + 2} />}
              </g>
            ))}

            {/* All walkways — meandering paths */}
            {walkwaySegments.map((w, i) => (
              <g key={`w${i}`}>
                <path d={meanderPath(w.a, w.b, w.seed)} fill="none"
                  stroke={pathHover ? "hsl(var(--foreground) / 0.18)" : "hsl(var(--foreground) / 0.07)"}
                  strokeWidth={pathHover ? 0.6 : 0.4} strokeDasharray="1.5 2"
                  style={{ transition: "stroke 0.3s, stroke-width 0.3s" }} />
                {/* Hit area */}
                <path d={meanderPath(w.a, w.b, w.seed)} fill="none" stroke="transparent" strokeWidth={4}
                  className="cursor-pointer"
                  onMouseEnter={() => setPathHover(true)}
                  onMouseLeave={() => setPathHover(false)}
                  onClick={() => setActive("walkways")} />
              </g>
            ))}

            {/* Community Commons — organic boundary */}
            <path
              d={isVertical
                ? `M 34,46 C 38,42 46,40 50,40 C 54,40 62,42 66,46 C 70,50 72,56 70,62 C 68,66 62,70 50,70 C 38,70 32,66 30,62 C 28,56 30,50 34,46 Z`
                : `M 62,24 C 68,20 76,18 80,18 C 84,18 92,20 98,24 C 102,28 104,33 102,38 C 100,42 94,46 80,46 C 66,46 60,42 58,38 C 56,33 58,28 62,24 Z`
              }
              fill={commonsHover ? "hsl(var(--secondary) / 0.08)" : "transparent"}
              stroke={commonsHover ? "hsl(var(--secondary) / 0.35)" : "hsl(var(--secondary) / 0.18)"}
              strokeWidth={commonsHover ? 0.6 : 0.4} strokeDasharray="2 1.5"
              className="cursor-pointer"
              style={{ transition: "fill 0.3s, stroke 0.3s, stroke-width 0.3s" }}
              onMouseEnter={() => setCommonsHover(true)}
              onMouseLeave={() => setCommonsHover(false)}
              onClick={() => setActive("commons")}
            />
            {/* CC label on two lines */}
            <text x={center.cx} y={center.cy - (isVertical ? 12 : 9.5)} textAnchor="middle"
              style={{ fontFamily: "var(--font-body)" }}
              className="pointer-events-none" fontSize={isVertical ? 3.2 : 2.6}
              fill="hsl(var(--foreground) / 0.55)" fontWeight={500}>
              <tspan x={center.cx} dy="0">Community</tspan>
              <tspan x={center.cx} dy={isVertical ? 3.8 : 3.2}>Commons</tspan>
            </text>

            {/* CC Spaces — no sub-labels */}
            {ccSpaces.map((s, i) => (
              <CommonsBuilding key={`cc${i}`} x={s.x} y={s.y}
                onClick={() => setActive("commons")} isHovered={commonsHover} />
            ))}

            {/* Clusters */}
            {clusters.map((cl, ci) => {
              const clusterPlotStart = plotNum;
              return (
                <g key={`cl${ci}`}>
                  {/* Cluster commons — hover highlight */}
                  <g className="cursor-pointer"
                    onMouseEnter={() => setClusterHover(ci)}
                    onMouseLeave={() => setClusterHover(null)}
                    onClick={() => setActive("clusterCommons")}>
                    <ellipse cx={cl.cx} cy={cl.cy} rx={6} ry={4.5}
                      fill={clusterHover === ci ? "hsl(var(--primary) / 0.15)" : "hsl(var(--primary) / 0.04)"}
                      stroke={clusterHover === ci ? "hsl(var(--primary) / 0.5)" : "hsl(var(--primary) / 0.2)"}
                      strokeWidth={clusterHover === ci ? 0.5 : 0.3} strokeDasharray="1.5 1"
                      style={{ transition: "fill 0.3s, stroke 0.3s, stroke-width 0.3s" }} />
                    <text x={cl.cx} y={cl.cy + 1} textAnchor="middle" fontSize={isVertical ? 2.8 : 2.2}
                      fill={clusterHover === ci ? "hsl(var(--foreground) / 0.75)" : "hsl(var(--foreground) / 0.55)"}
                      style={{ fontFamily: "var(--font-body)", transition: "fill 0.3s" }}
                      className="pointer-events-none" fontWeight={500}>
                      {cl.label}
                    </text>
                  </g>

                  {/* Plots */}
                  {cl.plots.map((pos, pi) => {
                    const globalIdx = clusterPlotStart + pi;
                    plotNum++;
                    const plotKey = `${ci}-${pi}`;
                    const shape = PLOT_SHAPES[(ci * 5 + pi) % PLOT_SHAPES.length];
                    const isPlotHovered = highlightPlot === plotKey && highlightHouse !== plotKey;
                    const isHouseHovered = highlightHouse === plotKey;
                    return (
                      <g key={plotKey} transform={`translate(${pos.cx}, ${pos.cy})`}>
                        <motion.path d={shape}
                          fill={isPlotHovered ? "hsl(var(--primary) / 0.22)" : "hsl(var(--primary) / 0.06)"}
                          stroke={isPlotHovered ? "hsl(var(--primary) / 0.6)" : "hsl(var(--primary) / 0.4)"}
                          strokeWidth={isPlotHovered ? 0.7 : 0.4}
                          strokeDasharray={isPlotHovered ? "none" : "2 1"}
                          className="cursor-pointer"
                          onClick={() => setActive("plot")}
                          onMouseEnter={() => setHighlightPlot(plotKey)}
                          onMouseLeave={() => setHighlightPlot(null)}
                          animate={{ fill: isPlotHovered ? "hsl(var(--primary) / 0.22)" : "hsl(var(--primary) / 0.06)" }}
                          transition={{ duration: 0.3 }}
                        />
                        {/* In-plot trees */}
                        <TreeSymbol x={3.5} y={-3} size={1.2} />
                        <TreeSymbol x={-4} y={-1.5} size={0.9} />
                        <TreeSymbol x={4} y={4} size={0.7} />
                        <PlantSymbol x={-3.5} y={3.5} />
                        <PlantSymbol x={5} y={1} />
                        {/* Garden dot */}
                        <g transform="translate(-3.5, 4.5)" opacity={0.2}><circle r={0.6} fill="hsl(var(--secondary))" opacity={0.4} /></g>
                        {/* House */}
                        <rect x={-1.8} y={0.3} width={3} height={2.2} rx={0.3}
                          fill={isHouseHovered ? "hsl(var(--foreground) / 0.4)" : "hsl(var(--foreground) / 0.2)"}
                          stroke={isHouseHovered ? "hsl(var(--foreground) / 0.65)" : "hsl(var(--foreground) / 0.35)"}
                          strokeWidth={isHouseHovered ? 0.5 : 0.25}
                          className="cursor-pointer"
                          style={{ transition: "fill 0.3s, stroke 0.3s" }}
                          onMouseEnter={(e) => { e.stopPropagation(); setHighlightHouse(plotKey); setHighlightPlot(null); }}
                          onMouseLeave={() => setHighlightHouse(null)}
                          onClick={(e) => { e.stopPropagation(); setActive("house"); }}
                        />
                        {/* Plot number */}
                        <text x={0} y={-5} textAnchor="middle" fontSize={2.2}
                          fill="hsl(var(--foreground) / 0.55)"
                          style={{ fontFamily: "var(--font-body)" }}
                          className="pointer-events-none" fontWeight={500}>
                          {globalIdx + 1}
                        </text>
                      </g>
                    );
                  })}
                </g>
              );
            })}

            {/* Cars outside */}
            {allCarPositions.map((c, i) => (
              <g key={`car${i}`} className="cursor-pointer" onClick={() => setActive("periphery")}>
                <CarSymbol x={c.x} y={c.y} />
              </g>
            ))}
          </svg>
          
        </div>

        {/* Modals */}
        <AnimatePresence>
          {active === "plot" && (
            <ExpandedCard onClose={() => setActive(null)}>
              <div className="space-y-3">
                <div>
                  <p className="font-body text-[10px] tracking-[0.25em] uppercase text-secondary mb-1">Family Plot</p>
                  <h3 className="font-heading text-xl md:text-2xl font-medium text-foreground">Your Family Plot</h3>
                  <p className="font-heading text-lg text-primary italic mt-0.5">20,000 sq ft of land</p>
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">A space to build a home, grow food, and steward the land naturally.</p>
                <div className="grid grid-cols-1 gap-2 pt-1">
                  <SketchIcon icon={Home} label="Home" delay={0.1} />
                  <SketchIcon icon={Salad} label="Kitchen Garden" delay={0.15} />
                  <SketchIcon icon={TreePine} label="Fruit Trees" delay={0.2} />
                  <SketchIcon icon={Tractor} label="Small Farming Area" delay={0.25} />
                  <SketchIcon icon={Laptop} label="Personal Workspace" delay={0.3} />
                  <SketchIcon icon={Egg} label="Chickens / Poultry" delay={0.35} />
                  <SketchIcon icon={Beef} label="Small Livestock" delay={0.4} />
                </div>
              </div>
            </ExpandedCard>
          )}
          {active === "house" && (
            <ExpandedCard onClose={() => setActive(null)}>
              <div className="space-y-3">
                <div>
                  <p className="font-body text-[10px] tracking-[0.25em] uppercase text-secondary mb-1">Home Design</p>
                  <h3 className="font-heading text-xl md:text-2xl font-medium text-foreground">Modular Home</h3>
                  <p className="font-body text-xs text-muted-foreground mt-0.5">Built in 3 phases, growing with your family</p>
                </div>
                <div className="space-y-2 pt-1">
                  <PhaseCard phase={1} title="Foundation" description="Core living space — move in and start." items={["2 Bedrooms", "Kitchen", "Living Area", "Bathroom"]} delay={0.1} />
                  <PhaseCard phase={2} title="Expansion" description="Add rooms as your family grows." items={["Additional Bedroom", "Study / Office", "Extended Kitchen", "Storage"]} delay={0.2} />
                  <PhaseCard phase={3} title="Integration" description="Connect your home to the land." items={["Veranda", "Workshop", "Guest Room", "Rainwater System"]} delay={0.3} />
                </div>
                <p className="font-body text-[11px] text-muted-foreground/70 italic">Homes use natural materials and blend with the landscape.</p>
              </div>
            </ExpandedCard>
          )}
          {active === "clusterCommons" && (
            <ExpandedCard onClose={() => setActive(null)}>
              <div className="space-y-3">
                <div>
                  <p className="font-body text-[10px] tracking-[0.25em] uppercase text-secondary mb-1">Neighbourhood</p>
                  <h3 className="font-heading text-xl md:text-2xl font-medium text-foreground">Circle Commons</h3>
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  Each circle of 5 families shares a small commons — a place for daily connection between closest neighbours.
                </p>
                <div className="grid grid-cols-1 gap-2 pt-1">
                  <SketchIcon icon={Users} label="Neighbour gathering spot" delay={0.1} />
                  <SketchIcon icon={Flower2} label="Shared garden patch" delay={0.15} />
                  <SketchIcon icon={GraduationCap} label="Children's play area" delay={0.2} />
                  <SketchIcon icon={CookingPot} label="Outdoor cooking space" delay={0.25} />
                </div>
                <p className="font-body text-[11px] text-muted-foreground/70 italic pt-1">
                  The circle is your immediate neighbourhood — families who share daily life most closely.
                </p>
              </div>
            </ExpandedCard>
          )}
          {active === "commons" && (
            <ExpandedCard onClose={() => setActive(null)}>
              <div className="space-y-3">
                <div>
                  <p className="font-body text-[10px] tracking-[0.25em] uppercase text-secondary mb-1">Shared Spaces</p>
                  <h3 className="font-heading text-xl md:text-2xl font-medium text-foreground">Community Commons</h3>
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">The heart of the community — shared by all 15 families.</p>
                <div className="grid grid-cols-1 gap-2 pt-1">
                  <SketchIcon icon={MosqueIcon} label="Prayer Pavilion" delay={0.1} />
                  <SketchIcon icon={Users} label="Women Area" delay={0.15} />
                  <SketchIcon icon={CookingPot} label="Community Kitchen" delay={0.2} />
                  <SketchIcon icon={GraduationCap} label="Children's Learning Space" delay={0.25} />
                  <SketchIcon icon={BookOpen} label="Library" delay={0.3} />
                  <SketchIcon icon={Flower2} label="Gardens & Food Forest" delay={0.35} />
                  <SketchIcon icon={Users} label="Gathering Areas" delay={0.4} />
                  <SketchIcon icon={Beef} label="Livestock Area" delay={0.45} />
                </div>
              </div>
            </ExpandedCard>
          )}
          {active === "walkways" && (
            <ExpandedCard onClose={() => setActive(null)}>
              <div className="space-y-3">
                <div>
                  <p className="font-body text-[10px] tracking-[0.25em] uppercase text-secondary mb-1">Movement</p>
                  <h3 className="font-heading text-xl md:text-2xl font-medium text-foreground">Walkable Community</h3>
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  Every home, circle commons, and community space is connected by gentle footpaths.
                </p>
                <div className="space-y-3 pt-1">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg border border-dashed border-primary/30 bg-primary/5 flex items-center justify-center shrink-0 mt-0.5">
                      <Footprints className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-medium text-foreground">Car-Free Living</h4>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed mt-0.5">Vehicles stay on the periphery. Children play freely between homes.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg border border-dashed border-primary/30 bg-primary/5 flex items-center justify-center shrink-0 mt-0.5">
                      <Users className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-medium text-foreground">Nested Connection</h4>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed mt-0.5">Paths connect homes to circle commons, and circles to the community heart.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg border border-dashed border-primary/30 bg-primary/5 flex items-center justify-center shrink-0 mt-0.5">
                      <TreeDeciduous className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-medium text-foreground">Nature-Embedded</h4>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed mt-0.5">Paths wind through trees and gardens — every walk is restorative.</p>
                    </div>
                  </div>
                </div>
              </div>
            </ExpandedCard>
          )}
          {active === "community" && (
            <ExpandedCard onClose={() => setActive(null)}>
              <div className="space-y-3">
                <div>
                  <p className="font-body text-[10px] tracking-[0.25em] uppercase text-secondary mb-1">Community</p>
                  <h3 className="font-heading text-xl md:text-2xl font-medium text-foreground">A Small Community</h3>
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  erdh brings together <span className="text-primary font-medium">15 families</span> in 3 circles of 5, choosing a simpler life rooted in land, food, and community.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
                      className={`w-7 h-7 rounded border flex items-center justify-center ${i < 5 ? "border-primary bg-primary/15 border-solid" : "border-primary/30 bg-primary/5 border-dashed"}`}>
                      <span className="text-[9px] font-body text-primary/60">{i + 1}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="font-body text-[11px] text-muted-foreground/70 italic">
                  <span className="inline-block w-3 h-3 rounded border border-primary bg-primary/15 mr-1 align-middle" /> 5 confirmed ·{" "}
                  <span className="inline-block w-3 h-3 rounded border border-dashed border-primary/30 bg-primary/5 mr-1 align-middle" /> 10 open
                </p>

                <div className="border-t border-border/40 pt-3 mt-1 space-y-2.5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg border border-dashed border-primary/30 bg-primary/5 flex items-center justify-center shrink-0 mt-0.5">
                      <Footprints className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-medium text-foreground">Walkable & Car-Free</h4>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed mt-0.5">All homes, shared spaces, and commons are connected by gentle footpaths. Cars stay on the periphery — children play freely everywhere.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg border border-dashed border-primary/30 bg-primary/5 flex items-center justify-center shrink-0 mt-0.5">
                      <Users className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-medium text-foreground">Three Circles</h4>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed mt-0.5">Families are grouped into 3 circles of 5. Each circle shares a small commons for daily connection — cooking, play, and gathering with your closest neighbours.</p>
                    </div>
                  </div>
                </div>
              </div>
            </ExpandedCard>
          )}
          {active === "periphery" && (
            <ExpandedCard onClose={() => setActive(null)}>
              <div className="space-y-3">
                <div>
                  <p className="font-body text-[10px] tracking-[0.25em] uppercase text-secondary mb-1">Site Periphery</p>
                  <h3 className="font-heading text-xl md:text-2xl font-medium text-foreground">Buffer & Parking</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg border border-dashed border-primary/30 bg-primary/5 flex items-center justify-center shrink-0 mt-0.5">
                      <TreeDeciduous className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-medium text-foreground">Green Buffer Zone</h4>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed mt-0.5">Native tree-lined boundary providing privacy and biodiversity.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg border border-dashed border-primary/30 bg-primary/5 flex items-center justify-center shrink-0 mt-0.5">
                      <Car className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-medium text-foreground">Peripheral Parking</h4>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed mt-0.5">Each family parks on the outer edge. Internal paths are pedestrian-only.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg border border-dashed border-primary/30 bg-primary/5 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-medium text-foreground">Privacy & Safety</h4>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed mt-0.5">Buffer and parking create a safe, car-free inner community.</p>
                    </div>
                  </div>
                </div>
              </div>
            </ExpandedCard>
          )}
        </AnimatePresence>

        <div className="text-center mt-6">
          <button onClick={() => setActive("community")}
            className="font-body text-[11px] tracking-wider uppercase text-secondary/70 hover:text-secondary transition-colors bg-background/60 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 inline-flex items-center gap-1.5">
            <Users className="w-3 h-3" /> About the Community
          </button>
        </div>
      </div>
    </section>
  );
};

export default MasterplanDiagram;
