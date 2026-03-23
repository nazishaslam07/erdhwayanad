import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ParallaxSection = ({
  image,
  alt,
  children,
  reverse = false,
}: {
  image: string;
  alt: string;
  children: React.ReactNode;
  reverse?: boolean;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0 h-[130%] -top-[15%]"
      >
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </motion.div>
      <div
        className={`absolute inset-0 ${
          reverse
            ? "bg-gradient-to-l from-foreground/80 via-foreground/60 to-foreground/30"
            : "bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30"
        }`}
      />
      <div className="relative z-10 flex items-center min-h-screen">
        <div
          className={`max-w-[1200px] mx-auto px-6 py-24 w-full ${
            reverse ? "flex justify-end" : ""
          }`}
        >
          <div className="max-w-xl">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
