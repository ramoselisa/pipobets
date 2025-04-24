
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const { locale: urlLocale } = useParams<{ locale: string }>();
  const navigate = useNavigate();
  const [locale, setLocaleState] = useState<Locale>(
    (urlLocale as Locale) || "en"
  );

  useEffect(() => {
    if (urlLocale && ["en", "pt"].includes(urlLocale)) {
      setLocaleState(urlLocale as Locale);
    }
  }, [urlLocale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/\/(en|pt)/, `/${newLocale}`);
    navigate(newPath);
  };

  const t = (key: string) => {
    const strings = locales[locale] || locales.en;
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
