import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

const InviteCard = ({ index }: { index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const navigate = useNavigate();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-primary/5 border-2 border-dashed border-primary/30 flex flex-col items-center justify-center p-8 text-center hover:border-primary/50 hover:bg-primary/10 transition-all duration-500">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
          <Heart className="w-7 h-7 text-primary" strokeWidth={1.5} />
        </div>

        <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
          Could this be <span className="italic text-primary">you</span>?
        </h3>
        <p className="font-body text-muted-foreground text-sm leading-relaxed mb-8">
          We're looking for families and individuals who share this vision. 
          Become a steward of erdh — help shape a community rooted in faith, nature, and intentional living.
        </p>
        <button
          onClick={() => navigate("/express-interest")}
          className="font-body text-sm tracking-wider uppercase text-primary-foreground bg-primary px-8 py-3 rounded-full hover:bg-primary/90 transition-colors"
        >
          Express Interest →
        </button>
      </div>
    </motion.div>
  );
};

export default InviteCard;
