const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-foreground text-background">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="font-heading text-2xl mb-4">
              <span className="font-bold">erdh</span> <span className="font-body font-normal text-sm">1.0</span> <span className="font-body font-normal text-sand text-sm italic">wayanad</span>
            </h3>
            <p className="font-body text-background/60 text-sm leading-relaxed">
              <span className="font-medium">erdh</span> is a design-led intentional living community stewarded by its residents, where families return to purpose, simplicity, and a life in harmony with nature and fitrah.
            </p>
          </div>
          <div>
            <h4 className="font-body text-sm tracking-[0.2em] uppercase mb-4 text-background/50">Quick Links</h4>
            <div className="space-y-2">
              {["Philosophy", "Spaces", "Pillars", "The Land", "Join"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(" ", "")}`}
                  className="block font-body text-background/70 hover:text-background transition-colors text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-body text-sm tracking-[0.2em] uppercase mb-4 text-background/50">Connect</h4>
            <p className="font-body text-background/70 text-sm mb-2">connect@erdh.org</p>
            <a href="https://wa.me/919155724621" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-body text-background/70 hover:text-background transition-colors text-sm mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
              +91 91557 24621 <span className="text-background/40 text-xs">(WhatsApp only)</span>
            </a>
            <a href="tel:+919900321798" className="flex items-center gap-2 font-body text-background/70 hover:text-background transition-colors text-sm mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +91 99003 21798
            </a>
            <p className="font-body text-background/70 text-sm">Wayanad, Kerala, India</p>
          </div>
        </div>
        <div className="border-t border-background/10 pt-8 text-center">
          <p className="font-body text-background/40 text-xs tracking-widest uppercase">
            © 2026 erdh 1.0 wayanad · FitrahAligned Living
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
