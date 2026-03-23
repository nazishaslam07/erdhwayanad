import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="text-sm text-sand font-body mt-1">{message}</p> : null;

export const RadioOption = ({ name, value, label }: { name: string; value: string; label: string }) => (
  <div className="flex items-center gap-3">
    <RadioGroupItem value={value} id={`${name}-${value}`} className="border-sand/60 text-sand" />
    <Label htmlFor={`${name}-${value}`} className="font-body text-earth-foreground/80 text-sm cursor-pointer">
      {label}
    </Label>
  </div>
);
