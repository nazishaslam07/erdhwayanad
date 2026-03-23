import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ParallaxHero = ({
  image,
  alt,
  children,
}: {
  image: string;
  alt: string;
  children: React.ReactNode;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0 h-[140%] -top-[10%]"
      >
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/30 to-background" />
      <div className="relative z-10 flex items-center justify-center h-full">
        {children}
      </div>
    </div>
  );
};

export default ParallaxHero;
