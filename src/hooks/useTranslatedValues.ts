
import { useLocale } from "@/i18n/useLocale";

// Define constant arrays of standard color values with added tone variations
export const STANDARD_HAIR_COLORS = [
  "black", 
  "darkBrown", 
  "mediumBrown", 
  "lightBrown", 
  "blonde"
];

export const STANDARD_EYE_COLORS = [
  "black", 
  "darkBrown", 
  "mediumBrown", 
  "hazel", 
  "blue", 
  "green"
];

export function useTranslatedValues() {
  const { t, locale } = useLocale();

  const translateHairColor = (color: string) => {
    if (!color) return "";
    
    // Normalize compound colors (like "dark brown" -> "darkBrown")
    if (color.includes(' ')) {
      const parts = color.toLowerCase().split(' ');
      if (parts.length === 2) {
        const [tone, baseColor] = parts;
        if (["dark", "medium", "light"].includes(tone) && baseColor === "brown") {
          return t(`hairColor${tone.charAt(0).toUpperCase() + tone.slice(1)}${baseColor.charAt(0).toUpperCase() + baseColor.slice(1)}`);
        }
      }
      // For any other compound colors
      const formattedParts = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
      const concatenatedKey = formattedParts.join('');
      return t(`hairColor${concatenatedKey}`);
    }
    
    // Handle single word color
    const lowerColor = color.toLowerCase();
    return t(`hairColor${lowerColor.charAt(0).toUpperCase() + lowerColor.slice(1)}`);
  };

  const translateEyeColor = (color: string) => {
    if (!color) return "";
    
    // Normalize compound colors (like "dark brown" -> "darkBrown")
    if (color.includes(' ')) {
      const parts = color.toLowerCase().split(' ');
      if (parts.length === 2) {
        const [tone, baseColor] = parts;
        if (["dark", "medium", "light"].includes(tone) && baseColor === "brown") {
          return t(`eyeColor${tone.charAt(0).toUpperCase() + tone.slice(1)}${baseColor.charAt(0).toUpperCase() + baseColor.slice(1)}`);
        }
      }
      // For any other compound colors
      const formattedParts = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
      const concatenatedKey = formattedParts.join('');
      return t(`eyeColor${concatenatedKey}`);
    }
    
    // Handle single word color
    const lowerColor = color.toLowerCase();
    return t(`eyeColor${lowerColor.charAt(0).toUpperCase() + lowerColor.slice(1)}`);
  };

  const translateResemblance = (key: string) => {
    if (!key) return "";
    const lowerKey = key.toLowerCase();
    return t(`resemblance.${lowerKey}`);
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

  const translateMeasurement = (field: string, value: string) => {
    if (!value) return "";
    
    // If field is weight or height, add units based on locale
    if (field === "weight") {
      return `${value} ${t("weightUnit")}`;
    } else if (field === "height") {
      return `${value} ${t("heightUnit")}`;
    }
    return value;
  };

  return {
    translateHairColor,
    translateEyeColor,
    translateResemblance,
    translateDate,
    translateMeasurement,
    getHairColorOptions,
    getEyeColorOptions,
    getResemblanceOptions,
  };
}
