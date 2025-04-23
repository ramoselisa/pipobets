
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
import { PredictionProps } from "@/components/PredictionCard";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const Index = () => {
  const { t } = useLocale();
  const [predictions, setPredictions] = useState<PredictionProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPredictions() {
      setLoading(true);
      
      // First, log the request to check what we're requesting
      console.log("Fetching predictions with approved=true");
      
      const { data, error } = await supabase
        .from("predictions")
        .select("*")
        .eq("approved", true)
        .order("normalized_date", { ascending: true });
        
      if (error) {
        console.error("Error fetching predictions:", error);
        toast.error("Failed to load predictions");
        setLoading(false);
        return;
      }
      
      // Log the response to see what we got back
      console.log("Predictions fetched:", data);
      
      if (!data || data.length === 0) {
        console.log("No approved predictions found in the database");
        setLoading(false);
        return;
      }
      
      // Transform database format to component props format
      const formattedPredictions: PredictionProps[] = data.map((item: any) => ({
        name: item.name,
        date: item.date,
        time: item.time,
        weight: item.weight,
        height: item.height,
        gender: item.gender,
        hairColor: item.hair_color,
        eyeColor: item.eye_color,
        hopeMom: item.hope_mom,
        hopeDad: item.hope_dad,
        resemblance: item.resemblance,
        advice: item.advice,
        normalizedDate: item.normalized_date,
        normalizedTime: item.normalized_time,
        isLost: item.is_lost
      }));
      
      console.log("Formatted predictions:", formattedPredictions);
      setPredictions(formattedPredictions);
      setLoading(false);
    }
    
    fetchPredictions();
  }, []);

  // Check if we have predictions after loading
  useEffect(() => {
    if (!loading && predictions.length === 0) {
      console.log("No predictions available after loading");
    }
  }, [loading, predictions]);

  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      {/* Decorative popcorn background */}
      <PopcornDecoration />

      {/* Language Switcher */}
      <LanguageSwitcher />

      {/* Main content */}
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

        <PredictionStats />

        <Separator className="max-w-[50%] mx-auto my-6 border-red-300" />

        {loading ? (
          <div className="container py-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="mt-2 text-muted-foreground">{t("loadingPredictions")}</p>
          </div>
        ) : predictions.length > 0 ? (
          <PredictionsGrid predictions={predictions} />
        ) : (
          <div className="container py-12 text-center">
            <p className="text-muted-foreground">No approved predictions found. Submit your prediction below!</p>
          </div>
        )}
        
        <PredictionForm />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
