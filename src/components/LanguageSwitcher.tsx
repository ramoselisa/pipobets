
import { useLocale } from "@/i18n/useLocale";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className="flex gap-2 items-center justify-end p-2 bg-gradient-to-r from-[#ea384c] via-white to-[#ea384c] rounded-b-md shadow mb-4">
      <span className="text-xs mr-2">{t("language")}:</span>
      <button
        className={`px-3 py-1 rounded text-xs font-bold transition ${
          locale === "en"
            ? "bg-[#ea384c] text-white shadow"
            : "bg-white text-[#ea384c]"
        }`}
        onClick={() => setLocale("en")}
      >
        {t("english")}
      </button>
      <button
        className={`px-3 py-1 rounded text-xs font-bold transition ${
          locale === "pt"
            ? "bg-[#ea384c] text-white shadow"
            : "bg-white text-[#ea384c]"
        }`}
        onClick={() => setLocale("pt")}
      >
        {t("brazilianPortuguese")}
      </button>
    </div>
  );
}
