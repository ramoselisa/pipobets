
import { HeroSection } from "@/components/HeroSection";
import { PredictionsGrid } from "@/components/PredictionsGrid";
import { PredictionForm } from "@/components/PredictionForm";
import { PopcornDecoration } from "@/components/PopcornDecoration";
import { Footer } from "@/components/Footer";
import { PredictionStats } from "@/components/PredictionStats";
import { Separator } from "@/components/ui/separator";
import { CountdownTimer } from "@/components/CountdownTimer";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale } from "@/i18n/useLocale";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { PredictionProps } from "@/components/PredictionCard";

const Index = () => {
  const { t } = useLocale();
  const [loading, setLoading] = useState(true);
  const [predictions, setPredictions] = useState<PredictionProps[]>([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("predictions")
          .select("*")
          .eq("approved", true)
          .order("date", { ascending: true });
          
        if (error) {
          console.error("Error fetching predictions:", error);
          toast.error(t("fetchFailed") || "Failed to load predictions");
          return;
        } 
        
        // Process predictions to determine if they're lost based on current date/time
        const currentDate = new Date();
        const processedData = (data || []).map(pred => ({
          id: pred.id,
          name: pred.name,
          date: pred.date,
          time: pred.time,
          weight: pred.weight,
          height: pred.height,
          eyeColor: pred.eye_color,
          hairColor: pred.hair_color,
          gender: pred.gender,
          hopeMom: pred.hope_mom,
          hopeDad: pred.hope_dad,
          resemblance: pred.resemblance,
          advice: pred.advice,
          isLost: pred.is_lost || (pred.date && new Date(`${pred.date} ${pred.time || '00:00'}`) < currentDate)
        }));
        
        // Extra sort to ensure dates are properly ordered (in case the database sort isn't working as expected)
        const sortedData = processedData.sort((a, b) => {
          const dateA = new Date(`${a.date} ${a.time || '00:00'}`);
          const dateB = new Date(`${b.date} ${b.time || '00:00'}`);
          return dateA.getTime() - dateB.getTime();
        });
        
        setPredictions(sortedData);
      } catch (error) {
        console.error("Error fetching predictions:", error);
        toast.error(t("fetchFailed") || "Failed to load predictions");
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, [t]);

  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      <PopcornDecoration />
      <LanguageSwitcher />
      <main className="flex-grow">
        <CountdownTimer />
        <HeroSection />

        <div className="py-8">
          <div className="container">
            <div className="relative mx-auto max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-red-100/60 to-red-200/60 blur-3xl opacity-30 rounded-full"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-red-200/50">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-center text-2xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
                    <span>{t("aboutTitle")}</span>
                  </h2>
                  <p className="text-center text-muted-foreground">
                    {t("aboutText")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <PredictionStats predictions={predictions} />

        <Separator className="max-w-[50%] mx-auto my-6 border-red-300" />

        {loading ? (
          <div className="container py-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="mt-2 text-muted-foreground">{t("loadingPredictions")}</p>
          </div>
        ) : (
          <div className="container py-12">
            <PredictionsGrid predictions={predictions} />
          </div>
        )}
        
        <PredictionForm />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
