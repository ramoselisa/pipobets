import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeInfo, CalendarDays, Clock, Popcorn, Star, UserCheck } from "lucide-react";
import { useTranslatedValues } from "@/hooks/useTranslatedValues";
import { useLocale } from "@/i18n/useLocale";

export interface PredictionProps {
  name: string;
  date: string;
  time?: string;
  weight: string;
  height: string;
  gender?: string;
  hairColor?: string;
  eyeColor?: string;
  hopeMom?: string;
  hopeDad?: string;
  resemblance?: string;
  advice?: string;
  isLost?: boolean;
}

export function PredictionCard({
  name,
  date,
  time,
  weight,
  height,
  gender,
  hairColor,
  eyeColor,
  hopeMom,
  hopeDad,
  resemblance,
  advice,
  isLost,
}: PredictionProps) {
  const { translateHairColor, translateEyeColor, translateDate } = useTranslatedValues();
  const { t } = useLocale();

  // Color based on gender prediction
  const genderColor = gender?.toLowerCase() === "boy" 
    ? "bg-blue-100 text-blue-800" 
    : gender?.toLowerCase() === "girl" 
    ? "bg-pink-100 text-pink-800" 
    : "bg-purple-100 text-purple-800";

  return (
    <Card className={`overflow-hidden transition-all hover:shadow-md group animate-pop ${isLost ? "opacity-60" : ""}`}>
      <CardHeader className={`pb-2 bg-gradient-to-r ${isLost ? "from-gray-200 to-transparent" : "from-secondary/30 to-transparent group-hover:from-secondary/50"} transition-colors`}>
        <CardTitle className="flex items-center justify-between">
          <span className="group-hover:text-primary transition-colors">{name || "Anonymous"}</span>
          {isLost && (
            <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-red-100 text-red-800">
              Lost Bet
            </span>
          )}
          {gender && (
            <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${genderColor}`}>
              {gender}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="absolute top-0 right-0 -mt-8 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Popcorn className="h-6 w-6 text-primary animate-float" />
        </div>
        
        <div className="flex items-center mb-2 text-primary">
          <CalendarDays className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
          <span className="font-medium">{translateDate(date)}</span>
          {time && (
            <>
              <Clock className="ml-2 mr-1 h-4 w-4" />
              <span>{time}</span>
            </>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="rounded-md bg-secondary p-2 text-center group-hover:bg-secondary/80 transition-colors">
            <div className="text-xs text-muted-foreground">{t("weight")} (kg)</div>
            <div className="font-medium">{weight}</div>
          </div>
          <div className="rounded-md bg-secondary p-2 text-center group-hover:bg-secondary/80 transition-colors">
            <div className="text-xs text-muted-foreground">{t("length")} (cm)</div>
            <div className="font-medium">{height}</div>
          </div>
        </div>

        {(hairColor || eyeColor) && (
          <div className="grid grid-cols-2 gap-2 my-2">
            {hairColor && (
              <div className="rounded-md bg-secondary/50 p-2 text-center">
                <div className="text-xs text-muted-foreground">{t("hairColor")}</div>
                <div className="text-sm">{translateHairColor(hairColor)}</div>
              </div>
            )}
            {eyeColor && (
              <div className="rounded-md bg-secondary/50 p-2 text-center">
                <div className="text-xs text-muted-foreground">{t("eyeColor")}</div>
                <div className="text-sm">{translateEyeColor(eyeColor)}</div>
              </div>
            )}
          </div>
        )}

        {resemblance && (
          <div className="flex items-center gap-1 mt-2 text-sm">
            <UserCheck className="h-4 w-4 text-primary" />
            <span className="font-medium">{t("babyWillResemble")}:</span>
            <span className="text-muted-foreground">{resemblance}</span>
          </div>
        )}

        {(hopeMom || hopeDad) && (
          <div className="mt-2 border-t border-dashed border-primary/20 pt-2">
            <p className="text-xs text-muted-foreground mb-1 flex items-center">
              <Star className="h-3 w-3 mr-1 text-primary" />
              <span>{t("hopesAndTraits")}</span>
            </p>
            {hopeMom && (
              <div className="text-sm">
                <span className="text-primary/80 font-medium">{t("hopeBabyGetsMoms")}:</span> {hopeMom}
              </div>
            )}
            {hopeDad && (
              <div className="text-sm">
                <span className="text-primary/80 font-medium">{t("hopeBabyGetsDads")}:</span> {hopeDad}
              </div>
            )}
          </div>
        )}
        
        {advice && (
          <div className="mt-2 text-sm italic text-muted-foreground border-t pt-2 border-dashed border-primary/20 flex items-start">
            <BadgeInfo className="h-4 w-4 mr-1 mt-0.5 text-primary/70" />
            <span>"{advice}"</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
