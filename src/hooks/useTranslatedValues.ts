
import { useLocale } from "@/i18n/useLocale";

// Define constant arrays of standard color values
export const STANDARD_HAIR_COLORS = ["black", "brown", "blonde", "red", "dark", "light"];
export const STANDARD_EYE_COLORS = ["brown", "blue", "green", "hazel", "black", "dark"];

export function useTranslatedValues() {
  const { t, locale } = useLocale();

  const translateHairColor = (color: string) => {
    if (!color) return "";
    const lowerColor = color.toLowerCase();
    return t(`hairColor${lowerColor.charAt(0).toUpperCase() + lowerColor.slice(1)}`);
  };

  const translateEyeColor = (color: string) => {
    if (!color) return "";
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
