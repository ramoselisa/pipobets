
import { useState, useEffect } from "react";
import { PredictionCard, PredictionProps } from "./PredictionCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CalendarDays, Search, UserCheck } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface PredictionsGridProps {
  predictions?: PredictionProps[];
}

export function PredictionsGrid({ predictions: propPredictions }: PredictionsGridProps) {
  const [predictions, setPredictions] = useState<PredictionProps[]>([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { t } = useLocale();
  
  useEffect(() => {
    if (propPredictions) {
      setPredictions(propPredictions);
      setLoading(false);
    } else {
      fetchPredictions();
    }
  }, [propPredictions]);

  const fetchPredictions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("predictions")
      .select("*")
      .eq("status", "approved")
      .order("normalized_date", { ascending: true });

    if (error) {
      console.error("Error fetching predictions:", error);
      setLoading(false);
      return;
    }

    // Transform database format to component props format
    const transformedPredictions: PredictionProps[] = data.map((pred: any) => ({
      name: pred.name,
      date: pred.date,
      time: pred.time,
      weight: pred.weight,
      height: pred.height,
      gender: pred.gender,
      hairColor: pred.hair_color,
      eyeColor: pred.eye_color,
      hopeMom: pred.hope_mom,
      hopeDad: pred.hope_dad,
      resemblance: pred.resemblance,
      advice: pred.advice,
      normalizedDate: pred.normalized_date,
      normalizedTime: pred.normalized_time,
      isLost: pred.is_lost
    }));

    setPredictions(transformedPredictions);
    setLoading(false);
  };

  const filteredPredictions = predictions.filter(prediction => {
    if (filter === "lost" && !prediction.isLost) return false;
    if (filter === "active" && prediction.isLost) return false;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        prediction.name?.toLowerCase().includes(term) || 
        prediction.normalizedDate?.toLowerCase().includes(term) ||
        prediction.advice?.toLowerCase().includes(term)
      );
    }
    
    return true;
  });

  const lostCount = predictions.filter(p => p.isLost).length;
  
  return (
    <>
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
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredPredictions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPredictions.map((prediction, index) => (
            <PredictionCard key={index} {...prediction} />
          ))}
        </div>
      ) : (
        <div className="col-span-3 text-center py-12 text-muted-foreground">
          <UserCheck className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
          <h3 className="text-lg font-medium mb-1">{t("noMatchingPredictions")}</h3>
          <p>{t("adjustFilters")}</p>
        </div>
      )}
    </>
  );
}
