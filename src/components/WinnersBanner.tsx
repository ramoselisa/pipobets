
import { useLocale } from "@/i18n/useLocale";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { PredictionProps } from "@/components/PredictionCard";
import { Trophy } from "lucide-react";
import { useTranslatedValues } from "@/hooks/useTranslatedValues";

interface WinnersBannerProps {
  dateWinner: PredictionProps | null;
  weightWinner: PredictionProps | null;
  actualDate?: string;
  actualTime?: string;
}

export function WinnersBanner({ 
  dateWinner, 
  weightWinner,
  actualDate,
  actualTime
}: WinnersBannerProps) {
  const { t } = useLocale();
  const { translateDate } = useTranslatedValues();
  
  if (!dateWinner && !weightWinner) return null;
  
  return (
    <Alert className="bg-gradient-to-r from-yellow-50 to-blue-50 border-l-4 border-yellow-500 mb-2 shadow-md">
      <Trophy className="h-5 w-5 text-yellow-500" />
      <AlertTitle className="text-lg font-bold text-foreground">
        {t("winnersAnnouncement") || "Winners Announcement"}
      </AlertTitle>
      <AlertDescription className="mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
          {dateWinner && (
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 px-2 py-1">
                {t("dateTimeWinner") || "Date & Time"}
              </Badge>
              <span className="font-medium">{dateWinner.name}</span>
              <span className="text-sm text-muted-foreground">
                ({actualDate && actualTime ? `${actualDate} ${actualTime}` : translateDate(dateWinner.date)})
              </span>
            </div>
          )}
          
          {weightWinner && (
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300 px-2 py-1">
                {t("weightWinner") || "Weight"}
              </Badge>
              <span className="font-medium">{weightWinner.name}</span>
              <span className="text-sm text-muted-foreground">({weightWinner.weight})</span>
            </div>
          )}
          
          <div className="text-sm ml-auto">
            <a href="#winners-section" className="text-primary hover:underline">
              {t("seeDetails") || "See details"}
            </a>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
}
