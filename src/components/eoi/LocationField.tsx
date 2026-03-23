import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Country, State, City, type ICity } from "country-state-city";
import { inputClasses, type EOIForm } from "@/lib/eoi-form";
import { FieldError } from "@/lib/eoi-components";

interface LocationFieldProps {
  form: EOIForm;
  errors: Partial<Record<keyof EOIForm, string>>;
  set: (field: keyof EOIForm, value: string | boolean) => void;
}

const LocationField = ({ form, errors, set }: LocationFieldProps) => {
  const [countrySearch, setCountrySearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const allCountries = useMemo(() => Country.getAllCountries(), []);

  const filteredCountries = useMemo(() => {
    if (!countrySearch) return allCountries;
    const q = countrySearch.toLowerCase();
    return allCountries.filter((c) => c.name.toLowerCase().includes(q));
  }, [allCountries, countrySearch]);

  const citiesForCountry = useMemo(() => {
    if (!form.countryIso) return [];
    const states = State.getStatesOfCountry(form.countryIso);
    const citySet = new Map<string, ICity>();
    for (const state of states) {
      for (const city of City.getCitiesOfState(form.countryIso, state.isoCode)) {
        citySet.set(city.name, city);
      }
    }
    const directCities = City.getCitiesOfCountry(form.countryIso);
    if (directCities) {
      for (const city of directCities) citySet.set(city.name, city);
    }
    return Array.from(citySet.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [form.countryIso]);

  const filteredCities = useMemo(() => {
    if (!citySearch) return citiesForCountry.slice(0, 100);
    const q = citySearch.toLowerCase();
    return citiesForCountry.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 100);
  }, [citiesForCountry, citySearch]);

  const selectedCountryName = useMemo(() => {
    if (!form.countryIso) return "";
    return Country.getCountryByCode(form.countryIso)?.name ?? "";
  }, [form.countryIso]);

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

  return (
    <div>
      <Label className="font-body text-earth-foreground/60 text-xs uppercase tracking-wider mb-2 block">
        4. Where are you currently based?
      </Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Country */}
        <div className="relative">
          <Input
            value={countryDropdownOpen ? countrySearch : (selectedCountryName || countrySearch)}
            onChange={(e) => {
              setCountrySearch(e.target.value);
              setCountryDropdownOpen(true);
              if (form.countryIso) { set("countryIso", ""); set("city", ""); }
            }}
            onFocus={() => { setCountryDropdownOpen(true); setCountrySearch(""); }}
            onBlur={() => setTimeout(() => setCountryDropdownOpen(false), 200)}
            placeholder="Search country..."
            className={inputClasses}
            autoComplete="off"
          />
          {countryDropdownOpen && (
            <div className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto rounded-md border border-earth-foreground/20 bg-earth shadow-lg">
              {filteredCountries.slice(0, 50).map((c) => (
                <button
                  key={c.isoCode}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleCountrySelect(c.isoCode)}
                  className="w-full text-left px-3 py-2 text-sm text-earth-foreground hover:bg-earth-foreground/10 transition-colors"
                >
                  {c.flag} {c.name}
                </button>
              ))}
              {filteredCountries.length === 0 && (
                <p className="px-3 py-2 text-sm text-earth-foreground/50">No countries found</p>
              )}
            </div>
          )}
          <FieldError message={errors.countryIso} />
        </div>

        {/* City */}
        <div className="relative">
          <Input
            value={cityDropdownOpen ? citySearch : (form.city || citySearch)}
            onChange={(e) => {
              setCitySearch(e.target.value);
              setCityDropdownOpen(true);
              if (form.city) set("city", "");
            }}
            onFocus={() => { setCityDropdownOpen(true); setCitySearch(""); }}
            onBlur={() => setTimeout(() => setCityDropdownOpen(false), 200)}
            placeholder={form.countryIso ? "Search city..." : "Select a country first"}
            disabled={!form.countryIso}
            className={inputClasses}
            autoComplete="off"
          />
          {cityDropdownOpen && form.countryIso && (
            <div className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto rounded-md border border-earth-foreground/20 bg-earth shadow-lg">
              {filteredCities.map((c) => (
                <button
                  key={`${c.name}-${c.stateCode}`}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleCitySelect(c.name)}
                  className="w-full text-left px-3 py-2 text-sm text-earth-foreground hover:bg-earth-foreground/10 transition-colors"
                >
                  {c.name}{c.stateCode ? `, ${c.stateCode}` : ""}
                </button>
              ))}
              {filteredCities.length === 0 && (
                <p className="px-3 py-2 text-sm text-earth-foreground/50">No cities found</p>
              )}
            </div>
          )}
          <FieldError message={errors.city} />
        </div>
      </div>
    </div>
  );
};

export default LocationField;
