import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Steward } from "./stewardsData";

const StewardCard = ({ steward, index, onClick }: { steward: Steward; index: number; onClick: () => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
        {/* Background Image — B&W by default, color on hover */}
        <img
          src={steward.image}
          alt={steward.name}
          className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
          loading="lazy"
          decoding="async"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />

        {/* erdh team badge */}
        {steward.isTeam && (
          <div className="absolute top-4 right-4 bg-background/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5">
            <span className="font-heading text-xs font-bold text-primary-foreground/90">erdh</span>
            <span className="font-body text-[10px] text-primary-foreground/70 tracking-wide uppercase">team</span>
          </div>
        )}

        {/* Text Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="font-body text-xs text-primary-foreground/70 tracking-wider uppercase mb-1">
            {steward.role}
          </p>
          <h3 className="font-heading text-2xl font-semibold text-primary-foreground mb-2">
            {steward.name}
          </h3>
          <p className="font-body text-primary-foreground/80 text-sm leading-relaxed line-clamp-2">
            {steward.shortBio}
          </p>
          <p className="font-body text-xs text-primary-foreground/60 mt-4 tracking-wide uppercase group-hover:text-primary-foreground/90 transition-colors">
            Read their story →
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default StewardCard;
