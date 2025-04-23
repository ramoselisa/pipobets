
import { Popcorn } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";

export function SubmissionSuccess() {
  const { t } = useLocale();
  
  return (
    <div className="text-center py-6 space-y-4">
      <div className="bg-secondary rounded-full w-16 h-16 mx-auto flex items-center justify-center">
        <Popcorn className="h-8 w-8 text-primary" />
      </div>
      <h3 className="font-semibold text-xl">{t("thankYou")}</h3>
      <p className="text-muted-foreground">{t("thankYouMsg")}</p>
    </div>
  );
}
