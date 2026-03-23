import { motion } from "framer-motion";
import heroImage from "@/assets/hero-wayanad.jpg";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Lush green landscape of Wayanad, Kerala"
          className="w-full h-full object-cover"
          fetchpriority="high"
          decoding="sync"
          width="1920"
          height="1080"
        />
        
        <div className="absolute inset-0 bg-foreground/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[1200px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sand font-body text-sm tracking-[0.3em] uppercase mb-6 leading-relaxed">
          
          <span className="block sm:inline">Wayanad, Kerala</span>
          <span className="hidden sm:inline"> · </span>
          <span className="block sm:inline"><span className="block sm:inline">15 Families · One Vision</span></span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-medium text-primary-foreground leading-[0.95] mb-8">
          
          Come Back
          <br />
          <span className="italic text-sand">to Your Fitrah</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-body text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          
           <span className="font-medium">erdh</span> is a design-led intentional living community stewarded by its residents, where families return to purpose, simplicity, and a life in harmony with nature and fitrah.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center">
          
          <button
            onClick={() => scrollTo("philosophy")}
            className="inline-block px-8 py-4 bg-primary text-primary-foreground font-body text-sm tracking-wider uppercase rounded-full hover:bg-forest-light transition-colors duration-300">
            
            Discover the Vision
          </button>
          <button
            onClick={() => scrollTo("join")}
            className="inline-block px-8 py-4 border border-primary-foreground/40 text-primary-foreground font-body text-sm tracking-wider uppercase rounded-full hover:bg-primary-foreground/10 transition-colors duration-300">
            
            Begin Your Journey
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2">
        
        <div className="w-px h-16 bg-primary-foreground/30 mx-auto mb-2" />
        <p className="text-primary-foreground/50 font-body text-xs tracking-[0.2em] uppercase">
          Scroll
        </p>
      </motion.div>
    </section>);

};

export default HeroSection;