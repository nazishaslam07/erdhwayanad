import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Quote, Sparkles } from "lucide-react";
import type { Steward } from "./stewardsData";

const StewardModal = ({ steward, onClose }: { steward: Steward | null; onClose: () => void }) => {
  return (
    <Dialog open={!!steward} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl w-[95vw] bg-background max-h-[90vh] overflow-hidden p-0 gap-0">
        {steward && (
          <div className="flex flex-col md:flex-row max-h-[90vh]">
            {/* Left: Portrait Image */}
            <div className="md:w-2/5 relative min-h-[240px] md:min-h-0 shrink-0">
              <img
                src={steward.image}
                alt={steward.name}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-background/10" />

              {steward.isTeam && (
                <div className="absolute top-4 left-4 bg-background/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5">
                  <span className="font-heading text-xs font-bold text-primary-foreground/90">erdh</span>
                  <span className="font-body text-[10px] text-primary-foreground/70 tracking-wide uppercase">team</span>
                </div>
              )}

              {/* Name overlay on mobile */}
              <div className="absolute bottom-6 left-6 md:hidden">
                <DialogTitle className="font-heading text-3xl font-semibold text-primary-foreground">
                  {steward.name}
                </DialogTitle>
                <p className="font-body text-sm text-primary-foreground/70 tracking-wide uppercase mt-1">
                  {steward.role}
                </p>
              </div>
            </div>

            {/* Right: Content */}
            <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-start overflow-y-auto max-h-[60vh] md:max-h-[92vh]">
              {/* Name on desktop */}
              <div className="hidden md:block mb-8">
                <DialogTitle className="font-heading text-3xl font-semibold text-foreground">
                  {steward.name}
                </DialogTitle>
                <p className="font-body text-sm text-secondary tracking-wide uppercase mt-2">
                  {steward.role}
                </p>
              </div>

              {/* Bio with styled paragraphs */}
              <div className="font-body text-muted-foreground text-base leading-relaxed mb-8 space-y-4">
                {steward.fullBio.split("\n\n").map((paragraph, i) => {
                  // Style question paragraphs differently
                  if (paragraph.trim().endsWith("?")) {
                    return (
                      <p key={i} className="text-foreground font-medium italic text-lg flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-primary mt-1.5 shrink-0" strokeWidth={1.5} />
                        {paragraph}
                      </p>
                    );
                  }
                  return <p key={i}>{paragraph}</p>;
                })}
              </div>

              {/* Quranic / Hadith Quotes */}
              {steward.quotes && steward.quotes.length > 0 && (
                <div className="space-y-4 mb-8">
                  {steward.quotes.map((quote, i) => (
                    <div
                      key={i}
                      className="relative bg-primary/5 border-l-2 border-primary/40 rounded-r-xl p-5"
                    >
                      <Quote className="w-4 h-4 text-primary/40 absolute top-3 right-4" strokeWidth={1.5} />
                      <p className="font-heading text-sm italic text-foreground leading-relaxed mb-2">
                        "{quote.text}"
                      </p>
                      <p className="font-body text-xs text-secondary tracking-wide">
                        — {quote.source}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Guiding Philosophy */}
              <div className="border-t border-border pt-6">
                <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  Guiding Philosophy
                </p>
                <p className="font-heading text-xl italic text-foreground leading-relaxed">
                  "{steward.philosophy}"
                </p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StewardModal;
