import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Bell } from "lucide-react";
import { Country } from "country-state-city";
import { countryCodes, eoiSchema, initialForm, inputClasses, type EOIForm } from "@/lib/eoi-form";
import { FieldError, RadioOption } from "@/lib/eoi-components";
import EOIHeader from "@/components/eoi/EOIHeader";
import LocationField from "@/components/eoi/LocationField";

const sectionAnim = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ExpressionOfInterest = () => {
  const { toast } = useToast();
  const [form, setForm] = useState<EOIForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof EOIForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (field: keyof EOIForm, value: string | boolean) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
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
      window.scrollTo({ top: 0, behavior: "smooth" });
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
      toast({
        title: "Expression Received ✨",
        description: "Thank you for your interest. We'll be in touch soon.",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
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
    <div className="min-h-screen bg-earth text-earth-foreground">
      <EOIHeader />

      <div className="max-w-3xl mx-auto px-6 pb-16 md:pb-24">
        <form onSubmit={handleSubmit} className="space-y-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={sectionAnim}
            className="space-y-6"
          >
            {/* 1. Full Name */}
            <div>
              <Label className="font-body text-earth-foreground/60 text-xs uppercase tracking-wider mb-2 block">
                1. Full Name
              </Label>
              <Input
                value={form.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                placeholder="Your full name"
                className={inputClasses}
              />
              <FieldError message={errors.fullName} />
            </div>

            {/* 2. Email */}
            <div>
              <Label className="font-body text-earth-foreground/60 text-xs uppercase tracking-wider mb-2 block">
                2. Email Address
              </Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="your@email.com"
                className={inputClasses}
              />
              <FieldError message={errors.email} />
            </div>

            {/* 3. Phone */}
            <div>
              <Label className="font-body text-earth-foreground/60 text-xs uppercase tracking-wider mb-2 block">
                3. Phone / WhatsApp Number
              </Label>
              <div className="flex gap-2">
                <Select value={form.countryCode} onValueChange={(v) => set("countryCode", v)}>
                  <SelectTrigger className={`w-[120px] shrink-0 ${inputClasses}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-earth border-earth-foreground/20">
                    {countryCodes.map((c) => (
                      <SelectItem key={c.code} value={c.code} className="text-earth-foreground">
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="00000 00000"
                  className={`flex-1 ${inputClasses}`}
                />
              </div>
              <FieldError message={errors.phone} />
            </div>

            {/* 4. Location */}
            <LocationField form={form} errors={errors} set={set} />

            {/* 5. Moving interest */}
            <div>
              <Label className="font-body text-earth-foreground/60 text-xs uppercase tracking-wider mb-4 block">
                5. Are you exploring moving to Wayanad or nearby areas?
              </Label>
              <RadioGroup value={form.movingInterest} onValueChange={(v) => set("movingInterest", v)} className="space-y-3">
                <RadioOption name="q5" value="yes" label="Yes" />
                <RadioOption name="q5" value="considering" label="Considering" />
                <RadioOption name="q5" value="learning" label="Just learning about the project" />
              </RadioGroup>
              <FieldError message={errors.movingInterest} />
            </div>

            {/* 6. Updates */}
            <div className="mt-8 rounded-xl border border-sand/30 bg-earth-foreground/5 p-5">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sand/20 shrink-0 mt-0.5">
                  <Bell className="w-4 h-4 text-sand" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-body text-earth-foreground text-sm font-medium">Stay updated on erdh</p>
                      <p className="font-body text-earth-foreground/50 text-xs mt-1">Receive occasional project news and milestones</p>
                    </div>
                    <Checkbox
                      id="updates"
                      checked={form.receiveUpdates}
                      onCheckedChange={(checked) => set("receiveUpdates", checked === true)}
                      className="border-sand/60 data-[state=checked]:bg-sand data-[state=checked]:text-earth h-5 w-5"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Submit */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={sectionAnim}
            className="pt-8 border-t border-earth-foreground/10"
          >
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-sand text-foreground font-body text-sm tracking-wider uppercase hover:bg-accent transition-colors duration-300 h-14 rounded-full"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default ExpressionOfInterest;
