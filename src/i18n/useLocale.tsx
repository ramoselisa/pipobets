
import { createContext, useContext, useState, ReactNode } from "react";
import { locales } from "./locales";

type Locale = "en" | "pt";
type LocaleContextValue = {
  locale: Locale;
  t: (key: string) => string;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  t: (key) => locales.en[key as keyof typeof locales.en] || key,
  setLocale: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const t = (key: string) => {
    const strings = locales[locale] || locales.en;
    // allow nested keys like resemblance.mommy etc.
    const value = key.split(".").reduce((o, k) => (o ? o[k] : undefined), strings as any);
    return value || key;
  };

  return (
    <LocaleContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
