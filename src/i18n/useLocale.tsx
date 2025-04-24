
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { locales } from "./locales";
import { useLocation, useNavigate } from "react-router-dom";

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
  const [locale, setLocaleState] = useState<Locale>("en");
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize locale from URL or localStorage on mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlLocale = searchParams.get("lang") as Locale;
    
    // Check if we have a valid locale in the URL
    if (urlLocale && (urlLocale === "en" || urlLocale === "pt")) {
      setLocaleState(urlLocale);
    } else {
      // Try to get from localStorage
      const savedLocale = localStorage.getItem("pipobet-locale") as Locale;
      if (savedLocale && (savedLocale === "en" || savedLocale === "pt")) {
        setLocaleState(savedLocale);
        
        // Update URL with the saved locale
        const params = new URLSearchParams(location.search);
        params.set("lang", savedLocale);
        navigate({
          pathname: location.pathname,
          search: params.toString()
        }, { replace: true });
      }
    }
  }, []);

  // Update URL and localStorage when locale changes
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("pipobet-locale", newLocale);
    
    const params = new URLSearchParams(location.search);
    params.set("lang", newLocale);
    navigate({
      pathname: location.pathname,
      search: params.toString()
    }, { replace: true });
  };

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
