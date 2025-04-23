
import { useCallback } from "react";
import { toast } from "@/components/ui/sonner";
import { useLocale } from "@/i18n/useLocale";
import { supabase } from "@/integrations/supabase/client";
import { PendingBet } from "@/types/predictions";

export const useFetchBets = (
  setLoading: (loading: boolean) => void,
  setPendingBets: React.Dispatch<React.SetStateAction<PendingBet[]>>
) => {
  const { t } = useLocale();

  const fetchPendingBets = useCallback(async () => {
    setLoading(true);
    try {
      console.log("Fetching pending bets...");
      const { data, error } = await supabase
        .from("predictions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching bets:", error);
        toast.error(t("fetchFailed") || "Failed to load bets", {
          description: error.message
        });
        return;
      }

      console.log("Raw data from database:", data);

      // Process to determine lost bets
      const currentDate = new Date();
      const transformedData: PendingBet[] = data.map(item => ({
        id: item.id,
        name: item.name,
        date: item.date,
        time: item.time || "",
        weight: item.weight,
        height: item.height,
        eyeColor: item.eye_color,
        hairColor: item.hair_color,
        gender: item.gender,
        hopeMom: item.hope_mom,
        hopeDad: item.hope_dad,
        resemblance: item.resemblance,
        advice: item.advice,
        status: item.status || (item.approved ? "approved" : "pending"),
        created_at: item.created_at,
        isLost: new Date(`${item.date} ${item.time || '00:00'}`) < currentDate
      }));

      console.log("Fetched and transformed data:", transformedData);
      setPendingBets(transformedData);
    } catch (err) {
      console.error("Unexpected error fetching bets:", err);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, [t, setLoading, setPendingBets]);

  return { fetchPendingBets };
};
