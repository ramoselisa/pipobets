
import { useLocale } from "@/i18n/useLocale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PredictionProps } from "@/components/PredictionCard";
import { Trophy, Calendar, Clock, Scale, Sparkles } from "lucide-react";
import { useTranslatedValues } from "@/hooks/useTranslatedValues";

interface BetWinnersProps {
  dateWinner: PredictionProps | null;
  dateTimeDifferenceMinutes: number;
  weightWinner: PredictionProps | null;
  weightDifferenceGrams: number;
  actualDate: string;
  actualTime: string;
  actualWeight: string;
  actualHairColor?: string;
  actualEyeColor?: string;
}

export function BetWinners({
  dateWinner,
  dateTimeDifferenceMinutes,
  weightWinner,
  weightDifferenceGrams,
  actualDate,
  actualTime,
  actualWeight,
  actualHairColor,
  actualEyeColor
}: BetWinnersProps) {
  const { t } = useLocale();
  const { translateDate } = useTranslatedValues();
  
  const formatTimeDifference = (minutes: number) => {
    if (minutes === Infinity) return t("noTimeProvided");
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}min`;
    } else {
      return `${mins} min`;
    }
  };
  
  const formatWeightDifference = (grams: number) => {
    if (grams < 1000) {
      return `${grams}g`;
    } else {
      return `${(grams / 1000).toFixed(3)} kg`;
    }
  };
  
  return (
    <section className="py-8 bg-gradient-to-b from-primary/5 to-secondary/10">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
          <Trophy className="h-8 w-8 text-yellow-500 animate-pulse" />
          <span>{t("winners") || "Winners"}</span>
        </h2>
        
        <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-primary/20">
          <h3 className="text-xl font-medium mb-4 text-center text-primary">
            <Sparkles className="inline-block mr-2 h-5 w-5" />
            {t("actualBirthDetails") || "Actual Birth Details"}
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-secondary/20 p-4 rounded-lg text-center">
              <Calendar className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-sm text-muted-foreground">{t("date") || "Date"}</div>
              <div className="font-medium">{translateDate(actualDate)}</div>
            </div>
            
            <div className="bg-secondary/20 p-4 rounded-lg text-center">
              <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-sm text-muted-foreground">{t("time") || "Time"}</div>
              <div className="font-medium">{actualTime}</div>
            </div>
            
            <div className="bg-secondary/20 p-4 rounded-lg text-center">
              <Scale className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-sm text-muted-foreground">{t("weight") || "Weight"}</div>
              <div className="font-medium">{actualWeight}</div>
            </div>
            
            {(actualHairColor || actualEyeColor) && (
              <div className="col-span-2 sm:col-span-3 grid grid-cols-2 gap-4">
                {actualHairColor && (
                  <div className="bg-secondary/20 p-4 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground">{t("hairColor") || "Hair Color"}</div>
                    <div className="font-medium">{actualHairColor}</div>
                  </div>
                )}
                
                {actualEyeColor && (
                  <div className="bg-secondary/20 p-4 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground">{t("eyeColor") || "Eye Color"}</div>
                    <div className="font-medium">{actualEyeColor}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Date & Time Winner Card */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-yellow-100 to-yellow-50">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-yellow-600" />
                {t("dateTimeWinner") || "Date & Time Winner"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {dateWinner ? (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                    <Trophy className="h-12 w-12 text-yellow-500" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-center mb-2">{dateWinner.name}</h3>
                  
                  <p className="text-center text-muted-foreground mb-4">
                    {t("predictedDate") || "Predicted"}: {translateDate(dateWinner.date)} 
                    {dateWinner.time && ` ${dateWinner.time}`}
                  </p>
                  
                  <div className="bg-yellow-50 p-3 rounded-lg text-center w-full">
                    <p className="font-medium">
                      {t("offByTime") || "Off by"}: {formatTimeDifference(dateTimeDifferenceMinutes)}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  {t("noWinnerFound") || "No winner found"}
                </p>
              )}
            </CardContent>
          </Card>
          
          {/* Weight Winner Card */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-blue-600" />
                {t("weightWinner") || "Weight Winner"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {weightWinner ? (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Trophy className="h-12 w-12 text-blue-500" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-center mb-2">{weightWinner.name}</h3>
                  
                  <p className="text-center text-muted-foreground mb-4">
                    {t("predictedWeight") || "Predicted"}: {weightWinner.weight}
                  </p>
                  
                  <div className="bg-blue-50 p-3 rounded-lg text-center w-full">
                    <p className="font-medium">
                      {t("offByWeight") || "Off by"}: {formatWeightDifference(weightDifferenceGrams)}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  {t("noWinnerFound") || "No winner found"}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
