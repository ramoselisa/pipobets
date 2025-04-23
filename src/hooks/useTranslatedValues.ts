
import { useLocale } from "@/i18n/useLocale";

export function useTranslatedValues() {
  const { t, locale } = useLocale();

  const translateHairColor = (color: string) => {
    if (!color) return "";
    const key = `hairColor${color.charAt(0).toUpperCase() + color.slice(1).toLowerCase()}`;
    return t(key) || color;
  };

  const translateEyeColor = (color: string) => {
    if (!color) return "";
    const key = `eyeColor${color.charAt(0).toUpperCase() + color.slice(1).toLowerCase()}`;
    return t(key) || color;
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
    translateDate
  };
}
