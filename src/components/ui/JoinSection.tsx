import { motion, useInView, AnimatePresence } from "framer-motion";
import { forwardRef, useRef, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Bell, ChevronDown } from "lucide-react";
import { Country, City, State } from "country-state-city";
import { countryCodes, eoiSchema, initialForm, inputClasses, type EOIForm } from "@/lib/eoi-form";
import { FieldError, RadioOption } from "@/components/ui/eoi-components";

const JoinSection = forwardRef<HTMLElement>((_, ref) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [form, setForm] = useState<EOIForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof EOIForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const allCountries = useMemo(() => Country.getAllCountries(), []);
  const priorityCountryCodes = useMemo(() => new Set([
    "IN", "AE", "US", "SA", "GB", "CA", "AU", "SG", "MY", "QA", "KW", "OM", "BH", "NZ", "DE"
  ]), []);

  const sortedCountries = useMemo(() => {
    const priority = allCountries.filter((c) => priorityCountryCodes.has(c.isoCode));
    const rest = allCountries.filter((c) => !priorityCountryCodes.has(c.isoCode));
    return [...priority, ...rest];
  }, [allCountries, priorityCountryCodes]);

  const filteredCountries = useMemo(() => {
    if (!countrySearch) return sortedCountries;
    const q = countrySearch.toLowerCase();
    return sortedCountries.filter((c) => c.name.toLowerCase().includes(q));
  }, [sortedCountries, countrySearch]);

  const citiesForCountry = useMemo(() => {
    if (!form.countryIso) return [];
    const states = State.getStatesOfCountry(form.countryIso);
    const citySet = new Map();
    for (const state of states) {
      for (const city of City.getCitiesOfState(form.countryIso, state.isoCode)) {
        citySet.set(city.name, city);
      }
    }
    const directCities = City.getCitiesOfCountry(form.countryIso);
    if (directCities) {
      for (const city of directCities) citySet.set(city.name, city);
    }
    return Array.from(citySet.values()).sort((a: any, b: any) => a.name.localeCompare(b.name));
  }, [form.countryIso]);

  const filteredCities = useMemo(() => {
    if (!citySearch) return citiesForCountry.slice(0, 100);
    const q = citySearch.toLowerCase();
    return citiesForCountry.filter((c: any) => c.name.toLowerCase().includes(q)).slice(0, 100);
  }, [citiesForCountry, citySearch]);

  const selectedCountryName = useMemo(() => {
    if (!form.countryIso) return "";
    return Country.getCountryByCode(form.countryIso)?.name ?? "";
  }, [form.countryIso]);

  const setSectionRefs = (node: HTMLElement | null) => {
    sectionRef.current = node;
    if (typeof ref === "function") {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  const set = (field: keyof EOIForm, value: string | boolean) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const handleCountrySelect = (isoCode: string) => {
    set("countryIso", isoCode);
    set("city", "");
    setCitySearch("");
    setCountrySearch("");
    setCountryDropdownOpen(false);
  };

  const handleCitySelect = (cityName: string) => {
    set("city", cityName);
    setCitySearch("");
    setCityDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = eoiSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof EOIForm, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof EOIForm;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      const countryName = Country.getCountryByCode(result.data.countryIso)?.name ?? result.data.countryIso;
      const { error } = await supabase.from("expression_of_interest").insert({
        full_name: result.data.fullName,
        email: result.data.email,
        country_code: result.data.countryCode,
        phone: result.data.phone,
        country: countryName,
        city: result.data.city,
        moving_interest: result.data.movingInterest,
        receive_updates: result.data.receiveUpdates ?? false,
      });
      if (error) throw error;
      setForm(initialForm);
      setExpanded(false);
      toast({
        title: "Expression Received ✨",
        description: "Thank you for your interest. We'll be in touch soon.",
      });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={setSectionRefs} id="join" className="py-24 md:py-36 px-6 bg-earth text-earth-foreground">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-sand text-sm tracking-[0.3em] uppercase mb-4">Your Invitation</p>
          <h2 className="font-heading text-4xl md:text-6xl font-medium leading-tight mb-8">
            Ready to <span className="italic text-sand">Come Home</span>?
          </h2>
          <p className="font-body text-earth-foreground/80 text-lg max-w-2xl mx-auto leading-relaxed">
            We're looking for 15 founding families who feel the pull —
            professionals, creatives, educators, and builders who want to raise
            their families on purpose, not autopilot.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="font-heading text-2xl md:text-3xl mb-8">
              How It <span className="italic text-sand">Works</span>
            </h3>
            {[
              { step: "01", title: "Express Interest", desc: "Fill out a thoughtful expression of interest form." },
              { step: "02", title: "Alignment Conversation", desc: "We explore alignment on values and vision in a 1:1 call." },
              { step: "03", title: "Visit the Land", desc: "Experience Wayanad. Feel the fitrah." },
            ].map((item, i) => (
              <div key={i} className="flex gap-5 items-start">
                <span className="font-heading text-4xl text-sand/40 leading-none">{item.step}</span>
                <div>
                  <h4 className="font-heading text-xl mb-1">{item.title}</h4>
                  <p className="font-body text-earth-foreground/60 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA Card with inline form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-earth-foreground/10 backdrop-blur-sm rounded-lg p-10 space-y-6"
          >
            <h3 className="font-heading text-2xl md:text-3xl text-center">
              Begin Your <span className="italic text-sand">Journey</span>
            </h3>
            <p className="font-body text-earth-foreground/60 text-sm leading-relaxed text-center">
              Phase 1 is limited to 15 founding families. Share your story
              and intention — the first step toward coming home.
            </p>

            <AnimatePresence mode="wait">
              {!expanded ? (
                <motion.div
                  key="cta-btn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <Button
                    onClick={() => setExpanded(true)}
                    className="bg-sand text-foreground font-body text-sm tracking-wider uppercase hover:bg-accent transition-colors duration-300 h-14 px-10 rounded-full gap-3"
                  >
                    Express Your Interest
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="eoi-form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Full Name */}
                  <div>
                    <Label className="font-body text-earth-foreground/60 text-xs uppercase tracking-wider mb-2 block">Full Name</Label>
                    <Input value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Your full name" className={inputClasses} />
                    <FieldError message={errors.fullName} />
                  </div>

                  {/* Email */}
                  <div>
                    <Label className="font-body text-earth-foreground/60 text-xs uppercase tracking-wider mb-2 block">Email Address</Label>
                    <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="your@email.com" className={inputClasses} />
                    <FieldError message={errors.email} />
                  </div>

                  {/* Phone */}
                  <div>
                    <Label className="font-body text-earth-foreground/60 text-xs uppercase tracking-wider mb-2 block">Phone / WhatsApp</Label>
                    <div className="flex gap-2">
                      <Select value={form.countryCode} onValueChange={(v) => set("countryCode", v)}>
                        <SelectTrigger className={`w-[120px] shrink-0 ${inputClasses}`}><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-earth border-earth-foreground/20">
                          {countryCodes.map((c) => (
                            <SelectItem key={c.code} value={c.code} className="text-earth-foreground">{c.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="00000 00000" className={`flex-1 ${inputClasses}`} />
                    </div>
                    <FieldError message={errors.phone} />
                  </div>

                  {/* Location */}
                  <div>
                    <Label className="font-body text-earth-foreground/60 text-xs uppercase tracking-wider mb-2 block">Where are you based?</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="relative">
                        <Input
                          value={countryDropdownOpen ? countrySearch : (selectedCountryName || countrySearch)}
                          onChange={(e) => { setCountrySearch(e.target.value); setCountryDropdownOpen(true); if (form.countryIso) { set("countryIso", ""); set("city", ""); } }}
                          onFocus={() => { setCountryDropdownOpen(true); setCountrySearch(""); }}
                          onBlur={() => setTimeout(() => setCountryDropdownOpen(false), 200)}
                          placeholder="Search country..."
                          className={inputClasses}
                          autoComplete="off"
                        />
                        {countryDropdownOpen && (
                          <div className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto rounded-md border border-earth-foreground/20 bg-earth shadow-lg">
                            {filteredCountries.slice(0, 50).map((c) => (
                              <button key={c.isoCode} type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => handleCountrySelect(c.isoCode)}
                                className="w-full text-left px-3 py-2 text-sm text-earth-foreground hover:bg-earth-foreground/10 transition-colors">
                                {c.flag} {c.name}
                              </button>
                            ))}
                            {filteredCountries.length === 0 && <p className="px-3 py-2 text-sm text-earth-foreground/50">No countries found</p>}
                          </div>
                        )}
                        <FieldError message={errors.countryIso} />
                      </div>

                      <div className="relative">
                        <Input
                          value={cityDropdownOpen ? citySearch : (form.city || citySearch)}
                          onChange={(e) => { setCitySearch(e.target.value); setCityDropdownOpen(true); if (form.city) set("city", ""); }}
                          onFocus={() => { setCityDropdownOpen(true); setCitySearch(""); }}
                          onBlur={() => setTimeout(() => setCityDropdownOpen(false), 200)}
                          placeholder={form.countryIso ? "Search city..." : "Select country first"}
                          disabled={!form.countryIso}
                          className={inputClasses}
                          autoComplete="off"
                        />
                        {cityDropdownOpen && form.countryIso && (
                          <div className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto rounded-md border border-earth-foreground/20 bg-earth shadow-lg">
                            {filteredCities.map((c: any) => (
                              <button key={`${c.name}-${c.stateCode}`} type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => handleCitySelect(c.name)}
                                className="w-full text-left px-3 py-2 text-sm text-earth-foreground hover:bg-earth-foreground/10 transition-colors">
                                {c.name}{c.stateCode ? `, ${c.stateCode}` : ""}
                              </button>
                            ))}
                            {filteredCities.length === 0 && <p className="px-3 py-2 text-sm text-earth-foreground/50">No cities found</p>}
                          </div>
                        )}
                        <FieldError message={errors.city} />
                      </div>
                    </div>
                  </div>

                  {/* Moving interest */}
                  <div>
                    <Label className="font-body text-earth-foreground/60 text-xs uppercase tracking-wider mb-3 block">Exploring moving to Wayanad?</Label>
                    <RadioGroup value={form.movingInterest} onValueChange={(v) => set("movingInterest", v)} className="space-y-2">
                      <RadioOption name="q5" value="yes" label="Yes" />
                      <RadioOption name="q5" value="considering" label="Considering" />
                      <RadioOption name="q5" value="learning" label="Just learning about the project" />
                    </RadioGroup>
                    <FieldError message={errors.movingInterest} />
                  </div>

                  {/* Updates */}
                  <label
                    htmlFor="updates-inline"
                    className="rounded-xl border border-sand/30 bg-earth-foreground/5 p-4 cursor-pointer block hover:bg-earth-foreground/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Bell className="w-4 h-4 text-sand shrink-0" />
                      <div className="flex-1">
                        <p className="font-body text-earth-foreground text-sm font-medium">Stay updated on erdh</p>
                        <p className="font-body text-earth-foreground/50 text-xs">Occasional project news</p>
                      </div>
                      <Checkbox
                        id="updates-inline"
                        checked={form.receiveUpdates}
                        onCheckedChange={(checked) => set("receiveUpdates", checked === true)}
                        className="border-sand/60 data-[state=checked]:bg-sand data-[state=checked]:text-earth h-5 w-5"
                      />
                    </div>
                  </label>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-sand text-foreground font-body text-sm tracking-wider uppercase hover:bg-accent transition-colors duration-300 h-12 rounded-full"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

JoinSection.displayName = "JoinSection";

export default JoinSection;
