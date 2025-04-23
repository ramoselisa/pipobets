
import { Popcorn } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/useLocale";

export function AdminHeader() {
  const { t } = useLocale();
  
  return (
    <div className="relative">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="h-3 w-full bg-gradient-to-r from-[#ea384c] via-white to-[#ea384c] opacity-80"></div>
        <Popcorn size={48} className="absolute left-4 -top-2 text-red-500 rotate-12" />
        <Popcorn size={40} className="absolute right-8 top-0 text-white bg-red-500 rounded-full p-2 rotate-[-12deg]" />
      </div>
      <div className="relative py-8 flex flex-col items-center z-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-red-600 flex items-center gap-2 drop-shadow-lg mb-2">
          <Popcorn size={32} className="text-[#ea384c]" />
          {t("approveNewBets")}
        </h1>
        <p className="text-lg text-white bg-red-500/90 rounded-full px-6 py-2 shadow font-semibold">
          {t("reviewAndApprove")}
        </p>
        <Link to="/" className="mt-4 text-red-600 hover:underline text-sm">
          {t("backToHome")}
        </Link>
      </div>
    </div>
  );
}
