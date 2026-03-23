import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const sectionAnim = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const EOIHeader = () => {
  const navigate = useNavigate();
  const topRef = useRef(null);
  const isInView = useInView(topRef, { once: true, margin: "-40px" });

  return (
    <>
      <div className="bg-earth border-b border-earth-foreground/10">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 font-body text-sm text-earth-foreground/60 hover:text-sand transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </div>

      <div ref={topRef} className="max-w-3xl mx-auto px-6 pt-16 md:pt-24 pb-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sectionAnim}
          className="text-center mb-16"
        >
          <p className="font-body text-sand text-sm tracking-[0.3em] uppercase mb-4">Get In Touch</p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6">
            Expression of <span className="italic text-sand">Interest</span>
          </h1>
          <div className="max-w-xl mx-auto space-y-4 font-body text-earth-foreground/70 text-base leading-relaxed">
            <p>
              Thank you for your interest in <span className="font-medium">erdh</span> Natural Living.
            </p>
            <p className="text-earth-foreground/50 text-sm">Fill in your details below and we'll get back to you.</p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default EOIHeader;
