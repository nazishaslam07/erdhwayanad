import { z } from "zod";

export const countryCodes = [
  { code: "+91", label: "🇮🇳 +91" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+971", label: "🇦🇪 +971" },
  { code: "+966", label: "🇸🇦 +966" },
  { code: "+968", label: "🇴🇲 +968" },
  { code: "+974", label: "🇶🇦 +974" },
  { code: "+973", label: "🇧🇭 +973" },
  { code: "+965", label: "🇰🇼 +965" },
  { code: "+60", label: "🇲🇾 +60" },
  { code: "+65", label: "🇸🇬 +65" },
  { code: "+61", label: "🇦🇺 +61" },
  { code: "+49", label: "🇩🇪 +49" },
  { code: "+33", label: "🇫🇷 +33" },
  { code: "+81", label: "🇯🇵 +81" },
  { code: "+82", label: "🇰🇷 +82" },
  { code: "+86", label: "🇨🇳 +86" },
  { code: "+92", label: "🇵🇰 +92" },
  { code: "+880", label: "🇧🇩 +880" },
  { code: "+94", label: "🇱🇰 +94" },
  { code: "+977", label: "🇳🇵 +977" },
];

export const eoiSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(200),
  email: z.string().trim().email("Please enter a valid email").max(255),
  countryCode: z.string().min(1, "Country code is required"),
  phone: z.string().trim().min(1, "Phone number is required").max(20),
  countryIso: z.string().min(1, "Country is required"),
  city: z.string().trim().min(1, "City is required").max(100),
  movingInterest: z.string().min(1, "Please select an option"),
  receiveUpdates: z.boolean().optional(),
});

export type EOIForm = z.infer<typeof eoiSchema>;

export const initialForm: EOIForm = {
  fullName: "",
  email: "",
  countryCode: "+91",
  phone: "",
  countryIso: "",
  city: "",
  movingInterest: "",
  receiveUpdates: false,
};

export const inputClasses =
  "bg-earth-foreground/10 border-earth-foreground/20 text-earth-foreground placeholder:text-earth-foreground/40 focus-visible:ring-sand";
