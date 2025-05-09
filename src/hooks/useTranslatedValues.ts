import { useLocale } from "@/i18n/useLocale";

// Define constant arrays of standard color values with added tone variations
export const STANDARD_HAIR_COLORS = [
  "black", 
  "brown", 
  "LightBrown", 
  "MediumBrown", 
  "DarkBrown", 
  "blonde", 
  "red", 
  "dark", 
  "light"
];

export const STANDARD_EYE_COLORS = [
  "brown", 
  "lightBrown", 
  "mediumBrown", 
  "darkBrown", 
  "blue", 
  "green", 
  "hazel", 
  "black", 
  "dark"
];

export function useTranslatedValues() {
  const { t, locale } = useLocale();

  const translateHairColor = (color: string) => {
    if (!color) return "";
    const normalizedColor = color.toLowerCase();
    
    // Check if it's a compound color (like "light brown")
    if (normalizedColor.includes(' ')) {
      const parts = normalizedColor.split(' ');
      const formattedParts = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
      const concatenatedKey = formattedParts.join('');
      return t(`hairColor${concatenatedKey}`) || formattedParts.join(' '); // Fallback
    }
    
    // Handle single word color
    const key = `hairColor${normalizedColor.charAt(0).toUpperCase() + normalizedColor.slice(1)}`;
    return t(key) || normalizedColor.charAt(0).toUpperCase() + normalizedColor.slice(1); // Fallback
  };

  const translateEyeColor = (color: string) => {
    if (!color) return "";
    const normalizedColor = color.toLowerCase();
    
    // Check if it's a compound color (like "light brown")
    if (normalizedColor.includes(' ')) {
      const parts = normalizedColor.split(' ');
      const formattedParts = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
      const concatenatedKey = formattedParts.join('');
      return t(`eyeColor${concatenatedKey}`) || formattedParts.join(' '); // Fallback
    }
    
    // Handle single word color
    const key = `eyeColor${normalizedColor.charAt(0).toUpperCase() + normalizedColor.slice(1)}`;
    return t(key) || normalizedColor.charAt(0).toUpperCase() + normalizedColor.slice(1); // Fallback
  };

  const translateResemblance = (key: string) => {
    if (!key) return "";
    const normalizedKey = key.toLowerCase();
    return t(`resemblance_${normalizedKey}`) || key; // Using the direct key format from locales.ts
  };

  const getHairColorOptions = () => {
    return STANDARD_HAIR_COLORS.map(color => ({
      value: color,
      label: translateHairColor(color)
    }));
  };

  const getEyeColorOptions = () => {
    return STANDARD_EYE_COLORS.map(color => ({
      value: color,
      label: translateEyeColor(color)
    }));
  };

  const getResemblanceOptions = () => {
    return ["mommy", "daddy", "other"].map(type => ({
      value: type,
      label: translateResemblance(type)
    }));
  };

  const translateDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      const month = date.toLocaleString(locale === 'pt' ? 'pt-BR' : 'en-US', { month: 'long' });
      const day = date.getDate();
      const year = date.getFullYear();
      
      return locale === 'pt' 
        ? `${day} de ${month} de ${year}`
        : `${month} ${day}, ${year}`;
    } catch {
      return dateStr;
    }
  };

  return {
    translateHairColor,
    translateEyeColor,
    translateResemblance,
    translateDate,
    getHairColorOptions,
    getEyeColorOptions,
    getResemblanceOptions,
  };
}
