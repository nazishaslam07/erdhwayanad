import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface StatusModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

import { timeline } from "@/lib/timeline-data";

const StatusModal = ({ open, onOpenChange }: StatusModalProps) => {
  const navigate = useNavigate();
  const familiesOnboard = 4;
  const totalFamilies = 15;
  const remaining = totalFamilies - familiesOnboard;
  const progress = (familiesOnboard / totalFamilies) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">
            Current <span className="italic text-primary">Status</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 pt-2">
          {/* Family progress */}
          <div className="space-y-4">
            <p className="font-body text-sm text-muted-foreground tracking-wide uppercase">Families</p>
            <div className="flex items-end gap-3 mb-2">
              <span className="font-heading text-5xl text-primary font-semibold">{familiesOnboard}</span>
              <span className="font-body text-muted-foreground text-lg mb-1">/ {totalFamilies} families onboard</span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-primary rounded-full"
              />
            </div>
            <p className="font-body text-sm text-muted-foreground">
              <span className="text-foreground font-medium">{remaining} spots remaining</span> for founding families.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <p className="font-body text-sm text-muted-foreground tracking-wide uppercase">Progress</p>
            <div className="space-y-0">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full shrink-0 mt-1.5 ${item.status === "In Progress" ? "bg-primary" : "bg-border"}`} />
                    {i < timeline.length - 1 && <div className="w-px flex-1 bg-border min-h-[24px]" />}
                  </div>
                  <div className="pb-5">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-body text-xs font-semibold text-primary uppercase tracking-wider">{item.phase}</span>
                      {item.status === "In Progress" && (
                        <span className="font-body text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">In Progress</span>
                      )}
                    </div>
                    <h3 className="font-heading text-base font-semibold text-foreground">{item.title}</h3>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => {
              onOpenChange(false);
              navigate("/express-interest");
            }}
            className="w-full font-body text-sm tracking-wider uppercase bg-primary text-primary-foreground px-6 py-4 rounded-full hover:bg-primary/90 transition-colors font-semibold"
          >
            Express Interest →
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatusModal;
