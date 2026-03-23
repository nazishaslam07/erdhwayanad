import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import StatusModal from "@/components/ui/StatusModal";
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomepage = location.pathname === "/";
  const showScrolledStyle = scrolled || !isHomepage;

  const menuLinks = [
    { label: "Philosophy", href: "/philosophy" },
    { label: "Spaces", href: "#spaces" },
    { label: "Pillars", href: "#pillars" },
    { label: "The Land", href: "/land" },
    { label: "Stewards of erdh", href: "/stewards" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    if (href.startsWith("/")) {
      navigate(href);
      setMenuOpen(false);
      return;
    }
    if (href === "#") {
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById(href.replace("#", ""));
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const el = document.getElementById(href.replace("#", ""));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          showScrolledStyle
            ? "bg-background/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-16 md:h-20">
          <button
            onClick={() => scrollTo("#")}
            className={`font-heading text-xl md:text-2xl transition-colors ${showScrolledStyle ? "text-foreground" : "text-primary-foreground"}`}
          >
            <span className="font-bold">erdh</span>{" "}
            <span className="font-body font-normal text-sm">1.0</span>{" "}
            <span className={`font-body font-normal text-sm italic transition-colors ${showScrolledStyle ? "text-muted-foreground" : "text-primary-foreground/70"}`}>wayanad</span>
          </button>

          {/* Desktop: Inline expanding menu */}
          <div className="hidden md:flex items-center gap-3">
            <AnimatePresence mode="popLayout">
              {!menuOpen && (
                <motion.button
                  key="life-btn"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  onClick={() => scrollTo("/life")}
                  className="overflow-hidden whitespace-nowrap bg-primary text-primary-foreground font-body text-sm tracking-wide font-semibold px-5 h-9 rounded-full hover:bg-primary/90 transition-colors"
                >
                  Life at erdh
                </motion.button>
              )}
              {!menuOpen && (
                <motion.button
                  key="interest-btn"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut", delay: 0.05 }}
                  onClick={() => scrollTo("#join")}
                  className="overflow-hidden whitespace-nowrap bg-secondary text-secondary-foreground font-body text-sm tracking-wide font-semibold px-5 h-9 rounded-full hover:bg-secondary/90 transition-colors"
                >
                  Express Interest
                </motion.button>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  key="inline-menu"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex items-center gap-1 overflow-hidden"
                >
                  {menuLinks.map((link) => (
                    <button
                      key={link.label}
                      onClick={() => scrollTo(link.href)}
                      className={`whitespace-nowrap font-body text-sm tracking-wide px-4 h-9 rounded-full transition-colors ${
                        showScrolledStyle
                          ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                          : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-foreground text-background font-body text-sm tracking-wide font-semibold px-5 h-9 rounded-full hover:bg-foreground/90 transition-colors"
            >
              {menuOpen ? "Close" : "Explore"}
            </button>
            <button
              onClick={() => setStatusOpen(true)}
              className="relative bg-accent/20 text-accent-foreground font-body text-sm tracking-wide font-semibold px-5 h-9 rounded-full hover:bg-accent/30 transition-colors flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Status
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile: Express Interest top-right — aligned with logo */}
      <div className="md:hidden fixed top-0 right-0 z-50 h-16 flex items-center pr-6">
        <button
          onClick={() => scrollTo("#join")}
          className={`font-body text-xs tracking-wider uppercase px-4 h-8 rounded-full transition-all duration-300 ${
            showScrolledStyle
              ? "bg-secondary text-secondary-foreground"
              : "bg-primary-foreground/20 text-primary-foreground backdrop-blur-sm border border-primary-foreground/30"
          }`}
        >
          Express Interest
        </button>
      </div>

      {/* Mobile Bottom App-like Nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden fixed bottom-[calc(env(safe-area-inset-bottom)+5rem)] left-4 right-4 z-50 bg-foreground text-background rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex flex-col gap-1">
              <button
                onClick={() => scrollTo("#")}
                className="font-body text-sm tracking-wide py-3 rounded-xl text-background/70 hover:text-background hover:bg-background/10 transition-colors text-left px-4"
              >
                Home
              </button>
              {menuLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="font-body text-sm tracking-wide py-3 rounded-xl text-background/70 hover:text-background hover:bg-background/10 transition-colors text-left px-4"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => { setMenuOpen(false); setStatusOpen(true); }}
                className="font-body text-sm tracking-wide py-3 rounded-xl text-background/70 hover:text-background hover:bg-background/10 transition-colors text-left px-4 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Status
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom)]">
        <div className="bg-foreground/95 backdrop-blur-md border-t border-background/10">
          <div className="flex items-center justify-around h-16 px-4">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col items-center gap-1 text-background/70 active:text-background transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {menuOpen ? (
                  <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                ) : (
                  <><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></>
                )}
              </svg>
              <span className="font-body text-[10px] tracking-wider uppercase">{menuOpen ? "Close" : "Explore"}</span>
            </button>
            <button
              onClick={() => { scrollTo("/stewards"); setMenuOpen(false); }}
              className="flex flex-col items-center gap-1 text-background/70 active:text-background transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span className="font-body text-[10px] tracking-wider uppercase">Stewards</span>
            </button>
            <button
              onClick={() => { scrollTo("/life"); setMenuOpen(false); }}
              className="flex flex-col items-center gap-1 text-primary active:text-primary/80 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" opacity="0"/><path d="M7 15c1-2 3-3 5-3s4 1 5 3"/><path d="M12 12c0-3 2-5 2-8"/><path d="M12 12c0-3-2-5-2-8"/><path d="M8 14c-2-1-4-1-6 0"/><path d="M16 14c2-1 4-1 6 0"/><circle cx="12" cy="12" r="10"/>
              </svg>
              <span className="font-body text-[10px] tracking-wider uppercase">Life at erdh</span>
            </button>
          </div>
        </div>
      </div>
      <StatusModal open={statusOpen} onOpenChange={setStatusOpen} />
    </>
  );
};

export default Navbar;
