export interface CountryCode {
  code: string;
  country: string;
  flag: string;
}

export const countryCodes: CountryCode[] = [
  { code: "+32", country: "Belgium", flag: "🇧🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+352", country: "Luxembourg", flag: "🇱🇺" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+351", country: "Portugal", flag: "🇵🇹" },
  { code: "+48", country: "Poland", flag: "🇵🇱" },
  { code: "+43", country: "Austria", flag: "🇦🇹" },
  { code: "+1", country: "USA/Canada", flag: "🇺🇸" },
  { code: "+212", country: "Morocco", flag: "🇲🇦" },
  { code: "+90", country: "Turkey", flag: "🇹🇷" },
];

export const defaultCountryCode = "+32"; // Belgium as default
