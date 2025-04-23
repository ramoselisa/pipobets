
import { useState } from "react";
import { PredictionCard, PredictionProps } from "./PredictionCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CalendarDays, Search, UserCheck } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";

/**
 * Order predictions by normalizedDate (ISO string) if present;
 * otherwise, they will be placed at the end.
 */
function sortPredictionsByDate(predictions: PredictionProps[]): PredictionProps[] {
  return [...predictions].sort((a, b) => {
    if (!a.normalizedDate && !b.normalizedDate) return 0;
    if (a.normalizedDate && !b.normalizedDate) return -1;
    if (!a.normalizedDate && b.normalizedDate) return 1;
    return new Date(a.normalizedDate!).getTime() - new Date(b.normalizedDate!).getTime();
  });
}

interface PredictionsGridProps {
  predictions: PredictionProps[];
}

export function PredictionsGrid({ predictions }: PredictionsGridProps) {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useLocale();
  
  // *** NOW SORTED BY DATE ***
  const sortedPredictions = sortPredictionsByDate(predictions);

  const filteredPredictions = sortedPredictions.filter(prediction => {
    // Apply lost filter
    if (filter === "lost" && !prediction.isLost) return false;
    if (filter === "active" && prediction.isLost) return false;
    
    // Apply search filter (name or date)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        (prediction.name?.toLowerCase().includes(term) || 
        prediction.normalizedDate?.toLowerCase().includes(term) ||
        prediction.advice?.toLowerCase().includes(term))
      );
    }
    
    return true;
  });
  
  const lostCount = predictions.filter(p => p.isLost).length;
  
  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold flex items-center">
          <CalendarDays className="h-6 w-6 mr-2 text-primary" />
          <span className="mr-2">{t("currentPredictions")}</span>
          <span className="bg-primary text-primary-foreground text-sm py-0.5 px-2 rounded-full">
            {predictions.length}
          </span>
          {lostCount > 0 && (
            <span className="bg-red-500 text-white text-sm py-0.5 px-2 rounded-full ml-2">
              {lostCount} {t("lostBetsCount")}
            </span>
          )}
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("searchPredictions")}
              className="pl-8 w-full sm:w-[200px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("allPredictions")}</SelectItem>
              <SelectItem value="active">{t("activeBets")}</SelectItem>
              <SelectItem value="lost">{t("lostBets")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPredictions.length > 0 ? (
          filteredPredictions.map((prediction, index) => (
            <PredictionCard key={index} {...prediction} />
          ))
        ) : (
          <div className="col-span-3 text-center py-12 text-muted-foreground">
            <UserCheck className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
            <h3 className="text-lg font-medium mb-1">{t("noMatchingPredictions")}</h3>
            <p>{t("adjustFilters")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
